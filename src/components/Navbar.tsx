import React from 'react';
import { Sparkles, Info, Sliders, ShieldCheck, Camera } from 'lucide-react';

interface NavbarProps {
  isModelLoaded: boolean;
  isCameraActive: boolean;
  fps: number;
  onOpenSpecs: () => void;
  onToggleControls: () => void;
  showControls: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isModelLoaded,
  isCameraActive,
  fps,
  onOpenSpecs,
  onToggleControls,
  showControls,
}) => {
  return (
    <header className="h-16 px-4 md:px-8 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 p-[1.5px] shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-white font-sans">AuraFit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">AR</span></h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-medium">v1.0 Live</span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">Real-Time Computer Vision Virtual Try-On System</p>
        </div>
      </div>

      {/* Live System Diagnostics */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
          <span className={`w-2 h-2 rounded-full ${isModelLoaded ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-spin'}`} />
          <span>{isModelLoaded ? 'MediaPipe Pose (WASM)' : 'Loading Model...'}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
          <Camera className={`w-3.5 h-3.5 ${isCameraActive ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>{isCameraActive ? `${fps} FPS` : 'Camera Inactive'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px]">100% Client-Side Privacy</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleControls}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showControls
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Fit Controls</span>
        </button>

        <button
          onClick={onOpenSpecs}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Info className="w-4 h-4" />
          <span>Placement Brief</span>
        </button>
      </div>
    </header>
  );
};
