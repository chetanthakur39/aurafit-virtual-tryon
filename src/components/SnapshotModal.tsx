import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, X, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Garment } from '../types';

interface SnapshotModalProps {
  dataUrl: string | null;
  garment: Garment;
  onClose: () => void;
}

export const SnapshotModal: React.FC<SnapshotModalProps> = ({
  dataUrl,
  garment,
  onClose,
}) => {
  useEffect(() => {
    if (dataUrl) {
      // Fire celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#f857a6', '#ff5858', '#fbbf24'],
      });
    }
  }, [dataUrl]);

  if (!dataUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `aurafit-${garment.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Your Virtual Try-On Look</h3>
              <p className="text-xs text-slate-400">Captured with {garment.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshot Image Preview */}
        <div className="w-full max-h-[60vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
          <img
            src={dataUrl}
            alt="Virtual Try-On Result"
            className="w-full h-full object-contain max-h-[60vh]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>High-Res Photo Ready</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Try Another Outfit
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
