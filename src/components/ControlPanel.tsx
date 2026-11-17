import React from 'react';
import type { FittingConfig } from '../types';
import { Sliders, RotateCcw, X, Activity, Layers, MoveVertical, Maximize2 } from 'lucide-react';

interface ControlPanelProps {
  config: FittingConfig;
  onUpdateConfig: (newConfig: Partial<FittingConfig>) => void;
  onResetConfig: () => void;
  onClose: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
  onClose,
}) => {
  return (
    <div className="w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-slate-200 z-30">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">Fitting & CV Calibration</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sliders Container */}
      <div className="flex flex-col gap-4 text-xs">
        {/* Width Scale */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Shoulder Width
            </span>
            <span className="font-mono text-cyan-400">{(config.widthFactor * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.45"
            step="0.02"
            value={config.widthFactor}
            onChange={(e) => onUpdateConfig({ widthFactor: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Torso Length */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <MoveVertical className="w-3.5 h-3.5 text-indigo-400" /> Torso Length
            </span>
            <span className="font-mono text-indigo-400">{(config.lengthFactor * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.45"
            step="0.02"
            value={config.lengthFactor}
            onChange={(e) => onUpdateConfig({ lengthFactor: parseFloat(e.target.value) })}
            className="w-full accent-indigo-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Vertical Neckline Offset */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Neckline Vertical Offset</span>
            <span className="font-mono text-slate-400">{config.offsetY}px</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="2"
            value={config.offsetY}
            onChange={(e) => onUpdateConfig({ offsetY: parseInt(e.target.value, 10) })}
            className="w-full accent-pink-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Fabric Opacity */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Fabric Blend Opacity
            </span>
            <span className="font-mono text-emerald-400">{(config.opacity * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="1.0"
            step="0.05"
            value={config.opacity}
            onChange={(e) => onUpdateConfig({ opacity: parseFloat(e.target.value) })}
            className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Motion Smoothing (EMA Filter) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Jitter Filter Smoothing
            </span>
            <span className="font-mono text-amber-400">{config.smoothing}</span>
          </div>
          <input
            type="range"
            min="0.15"
            max="0.85"
            step="0.05"
            value={config.smoothing}
            onChange={(e) => onUpdateConfig({ smoothing: parseFloat(e.target.value) })}
            className="w-full accent-amber-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Lower = smoother, Higher = instant reaction</span>
        </div>

        {/* Blend Mode Selection */}
        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-slate-300">Composition Blend Mode</span>
          <div className="grid grid-cols-3 gap-1.5">
            {(['source-over', 'multiply', 'hard-light'] as GlobalCompositeOperation[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onUpdateConfig({ blendMode: mode })}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono capitalize transition ${
                  config.blendMode === mode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {mode === 'source-over' ? 'Normal' : mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Defaults */}
      <button
        onClick={onResetConfig}
        className="mt-2 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition"
      >
        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
        <span>Reset Calibration</span>
      </button>
    </div>
  );
};
