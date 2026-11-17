import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';
import { Camera, RefreshCw, Eye, EyeOff, Aperture, AlertCircle, Sparkles } from 'lucide-react';
import type { Garment, FittingConfig } from '../types';
import { drawGarment, drawDebugSkeleton, extractPoseData, PoseSmoother } from '../utils/poseFitting';

interface CameraViewProps {
  selectedGarment: Garment;
  config: FittingConfig;
  onUpdateConfig: (newConfig: Partial<FittingConfig>) => void;
  onCaptureSnapshot: (dataUrl: string) => void;
  onModelStatusChange: (loaded: boolean) => void;
  onFpsUpdate: (fps: number) => void;
  onCameraStatusChange: (active: boolean) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  selectedGarment,
  config,
  onUpdateConfig,
  onCaptureSnapshot,
  onModelStatusChange,
  onFpsUpdate,
  onCameraStatusChange,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const smootherRef = useRef<PoseSmoother>(new PoseSmoother());
  const garmentImageRef = useRef<HTMLImageElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [isCameraRunning, setIsCameraRunning] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPersonDetected, setIsPersonDetected] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Performance tracking
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const fpsTimerRef = useRef<number>(performance.now());

  // 1. Preload Garment Image whenever selectedGarment changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedGarment.imageSrc;
    img.onload = () => {
      garmentImageRef.current = img;
    };
    img.onerror = () => {
      console.warn(`Failed to load garment image: ${selectedGarment.imageSrc}`);
    };
  }, [selectedGarment]);

  // 2. Initialize MediaPipe PoseLandmarker
  useEffect(() => {
    let isCancelled = false;

    async function initMediaPipe() {
      try {
        setIsLoadingModel(true);
        setModelError(null);

        // Try local wasm first, then CDN fallback
        let vision;
        try {
          vision = await FilesetResolver.forVisionTasks('/wasm');
        } catch (e) {
          console.warn('Local WASM failed, attempting CDN fallback...', e);
          vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
          );
        }

        // Try local model first, then CDN fallback
        let modelPath = '/models/pose_landmarker_lite.task';
        try {
          const testResp = await fetch(modelPath, { method: 'HEAD' });
          if (!testResp.ok) throw new Error('Local model not found');
        } catch {
          modelPath =
            'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
        }

        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelPath,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numPoses: 1,
        });

        if (!isCancelled) {
          poseLandmarkerRef.current = landmarker;
          setIsLoadingModel(false);
          onModelStatusChange(true);
        }
      } catch (err: unknown) {
        console.error('PoseLandmarker initialization error:', err);
        if (!isCancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setModelError(msg || 'Failed to initialize computer vision model');
          setIsLoadingModel(false);
          onModelStatusChange(false);
        }
      }
    }

    initMediaPipe();

    return () => {
      isCancelled = true;
      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close();
        poseLandmarkerRef.current = null;
      }
    };
  }, [onModelStatusChange]);

  // 3. Start Camera Stream
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsCameraRunning(true);
          onCameraStatusChange(true);
        };
      }
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setCameraError(msg || 'Webcam access denied. Please grant camera permission.');
      setIsCameraRunning(false);
      onCameraStatusChange(false);
    }
  }, [onCameraStatusChange]);

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  // 4. Main Real-Time Render Loop
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = poseLandmarkerRef.current;

      if (
        video &&
        canvas &&
        video.readyState >= 2 &&
        landmarker &&
        !video.paused &&
        !video.ended
      ) {
        // Match canvas dimensions to video feed
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 1280;
          canvas.height = video.videoHeight || 720;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const now = performance.now();

          // Calculate FPS every 500ms
          frameCountRef.current++;
          if (now - fpsTimerRef.current >= 500) {
            const calculatedFps = Math.round(
              (frameCountRef.current * 1000) / (now - fpsTimerRef.current)
            );
            onFpsUpdate(calculatedFps);
            frameCountRef.current = 0;
            fpsTimerRef.current = now;
          }

          // 1. Draw webcam video (Mirrored horizontally for natural mirror feel)
          ctx.save();
          if (config.mirror) {
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
          } else {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          ctx.restore();

          // 2. Perform Pose Detection
          try {
            const results = landmarker.detectForVideo(video, now);

            if (results.landmarks && results.landmarks.length > 0) {
              const rawLandmarks = results.landmarks[0];
              const rawPose = extractPoseData(
                rawLandmarks,
                canvas.width,
                canvas.height,
                config.mirror
              );

              if (rawPose) {
                setIsPersonDetected(true);
                // Apply smoothing filter to eliminate jitter
                const smoothedPose = smootherRef.current.update(rawPose, config.smoothing);

                // 3. Render Virtual Garment
                if (garmentImageRef.current) {
                  drawGarment(
                    ctx,
                    garmentImageRef.current,
                    selectedGarment,
                    smoothedPose,
                    config
                  );
                }

                // 4. Render CV Skeleton Landmarks if toggled on
                if (config.showLandmarks) {
                  drawDebugSkeleton(
                    ctx,
                    rawLandmarks,
                    canvas.width,
                    canvas.height,
                    config.mirror
                  );
                }
              } else {
                setIsPersonDetected(false);
              }
            } else {
              setIsPersonDetected(false);
              smootherRef.current.reset();
            }
          } catch (detectionErr) {
            console.error('Detection frame error:', detectionErr);
          }

          lastTimeRef.current = now;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    animFrameIdRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [config, selectedGarment, onFpsUpdate]);

  // 5. Trigger Snapshot with optional 3s countdown
  const triggerSnapshot = () => {
    if (countdown !== null) return;
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          // Capture current canvas frame
          if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL('image/png', 0.95);
            onCaptureSnapshot(dataUrl);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      {/* Hidden real video feed for MediaPipe processing */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className="hidden"
      />

      {/* Primary High-Performance WebGL/2D Canvas Display */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain max-h-[80vh] rounded-xl"
      />

      {/* Loading Model Overlay */}
      {isLoadingModel && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-white tracking-wide">Initializing Vision Model</h3>
          <p className="text-sm text-slate-400 mt-1">Loading Google MediaPipe WASM & Pose Topology...</p>
        </div>
      )}

      {/* Model Error Fallback */}
      {modelError && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
          <AlertCircle className="w-12 h-12 text-rose-400 mb-3" />
          <h3 className="text-lg font-bold text-white">Model Loading Issue</h3>
          <p className="text-sm text-slate-400 max-w-md mt-1 mb-4">{modelError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition"
          >
            Reload Application
          </button>
        </div>
      )}

      {/* Camera Error Fallback */}
      {cameraError && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
          <Camera className="w-12 h-12 text-amber-400 mb-3" />
          <h3 className="text-lg font-bold text-white">Webcam Access Required</h3>
          <p className="text-sm text-slate-400 max-w-md mt-1 mb-4">
            AuraFit AR requires webcam permissions to detect your body pose in real-time. Please allow camera access in your browser.
          </p>
          <button
            onClick={startCamera}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/30 transition hover:brightness-110"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Enable Camera</span>
          </button>
        </div>
      )}

      {/* Countdown Flash Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-30 pointer-events-none">
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-pink-400 to-amber-300 animate-ping">
            {countdown}
          </div>
        </div>
      )}

      {/* Guidance Banner (When no person is detected) */}
      {!isLoadingModel && isCameraRunning && !isPersonDetected && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xl shadow-cyan-950/50 z-10 animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Step in front of the camera so your shoulders & chest are visible</span>
        </div>
      )}

      {/* Floating HUD Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl z-10">
        {/* Toggle Skeleton */}
        <button
          onClick={() => onUpdateConfig({ showLandmarks: !config.showLandmarks })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
            config.showLandmarks
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Pose Skeleton Tracking Points"
        >
          {config.showLandmarks ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="hidden sm:inline">AI Skeleton</span>
        </button>

        {/* Shutter Snapshot Button */}
        <button
          onClick={triggerSnapshot}
          disabled={countdown !== null}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:brightness-110 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 transition-all"
        >
          <Aperture className="w-4 h-4 animate-spin-slow" />
          <span>Snap Photo</span>
        </button>

        {/* Mirror Mode Toggle */}
        <button
          onClick={() => onUpdateConfig({ mirror: !config.mirror })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
            config.mirror
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Camera Mirror View"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">{config.mirror ? 'Mirror: ON' : 'Mirror: OFF'}</span>
        </button>
      </div>
    </div>
  );
};
