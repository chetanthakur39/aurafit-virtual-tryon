import React from 'react';
import { X, Cpu, Zap, Shield, Sparkles, Code, Layers } from 'lucide-react';

interface PlacementPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlacementPitchModal: React.FC<PlacementPitchModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Project Architecture & Technical Brief</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">For Placement / Interview</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Real-Time AR Clothing Try-On using Computer Vision & WebAssembly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Problem Statement & Objective</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Traditional online apparel shopping suffers from a 30-40% return rate due to sizing and visual fit uncertainty. Existing diffusion-based AI try-ons take 10-20 seconds per image on expensive GPUs, making real-time mirror interaction impossible. 
            <strong className="text-white"> AuraFit AR</strong> solves this by running real-time 33-point body tracking and dynamic affine transformation entirely on the user's browser at <strong className="text-cyan-300">30-60 FPS with zero server GPU overhead</strong>.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Edge Computer Vision</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google MediaPipe PoseLandmarker compiled to WebAssembly (WASM SIMD) with WebGL GPU acceleration.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Mathematical Fitting</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates Euclidean shoulder distance, planar tilt angle, and anchors garment collar to sternum/clavicle midpoint.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Zero-Server Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% of camera frames stay local in the client browser. No video is ever uploaded or stored externally.
            </p>
          </div>
        </div>

        {/* Algorithm Breakdown */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            <span>Mathematical & Engineering Pipeline</span>
          </h4>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">1.</span>
              <span><strong>Landmark Extraction:</strong> Samples Keypoints #11 (L-Shoulder), #12 (R-Shoulder), #23 (L-Hip), #24 (R-Hip).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">2.</span>
              <span><strong>Rotation Calculation:</strong> Angle &theta; = atan2(dy, dx) accounts for upper-body head/shoulder tilt in 2D plane.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">3.</span>
              <span><strong>Jitter Attenuation:</strong> Exponential Moving Average (EMA) filter &alpha; = 0.45 eliminates optical tracking noise while preserving responsive motion.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">4.</span>
              <span><strong>Matrix Composition:</strong> Canvas 2D transforms execute translate(neckX, neckY), rotate(&theta;), drawImage(garment) at 60 FPS.</span>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <span className="text-xs text-slate-400 mr-2">Tech Stack:</span>
          {['React 19', 'TypeScript', 'MediaPipe PoseLandmarker', 'WebAssembly (WASM)', 'HTML5 Canvas 2D', 'Tailwind CSS', 'Vite'].map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition"
          >
            Back to Live Demo
          </button>
        </div>
      </div>
    </div>
  );
};
