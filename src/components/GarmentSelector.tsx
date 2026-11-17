import React, { useRef, useState } from 'react';
import type { Garment } from '../types';
import { Upload, Check } from 'lucide-react';

interface GarmentSelectorProps {
  garments: Garment[];
  selectedGarment: Garment;
  onSelectGarment: (garment: Garment) => void;
  onAddCustomGarment: (garment: Garment) => void;
}

export const GarmentSelector: React.FC<GarmentSelectorProps> = ({
  garments,
  selectedGarment,
  onSelectGarment,
  onAddCustomGarment,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'tshirt', label: 'T-Shirts' },
    { id: 'jacket', label: 'Jackets' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'formal', label: 'Formal' },
    { id: 'sports', label: 'Athletic' },
  ];

  const filteredGarments = activeCategory === 'all'
    ? garments
    : garments.filter((g) => g.category === activeCategory || (g.isCustom && activeCategory === 'all'));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newCustomGarment: Garment = {
        id: `custom-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').slice(0, 20),
        category: 'custom',
        imageSrc: dataUrl,
        defaultScale: 1.05,
        defaultOffsetY: -10,
        widthFactor: 2.1,
        heightFactor: 1.35,
        description: 'User uploaded custom garment asset.',
        isCustom: true,
      };

      onAddCustomGarment(newCustomGarment);
      onSelectGarment(newCustomGarment);
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Category Filter Pills & Upload Trigger */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Upload Custom Garment Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/svg+xml, image/webp, image/jpeg"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 shadow-sm transition-all whitespace-nowrap"
            title="Upload any transparent PNG shirt/apparel from your computer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PNG</span>
          </button>
        </div>
      </div>

      {/* Garment Grid / Cards Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {filteredGarments.map((garment) => {
          const isSelected = selectedGarment.id === garment.id;

          return (
            <div
              key={garment.id}
              onClick={() => onSelectGarment(garment)}
              className={`group relative flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/40 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Garment Image Preview */}
              <div className="w-full h-28 flex items-center justify-center p-2 rounded-xl bg-black/30 border border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={garment.imageSrc}
                  alt={garment.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Garment Details */}
              <div className="w-full mt-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                    {garment.category}
                  </span>
                  {garment.isCustom && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      Custom
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                  {garment.name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
