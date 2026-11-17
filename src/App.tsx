import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CameraView } from './components/CameraView';
import { GarmentSelector } from './components/GarmentSelector';
import { ControlPanel } from './components/ControlPanel';
import { SnapshotModal } from './components/SnapshotModal';
import { PlacementPitchModal } from './components/PlacementPitchModal';
import { INITIAL_GARMENTS } from './data/garments';
import type { Garment, FittingConfig } from './types';

export const App: React.FC = () => {
  const [garments, setGarments] = useState<Garment[]>(INITIAL_GARMENTS);
  const [selectedGarment, setSelectedGarment] = useState<Garment>(INITIAL_GARMENTS[0]);
  
  const [config, setConfig] = useState<FittingConfig>({
    scale: 1.0,
    widthFactor: 1.0,
    lengthFactor: 1.0,
    offsetY: 0,
    opacity: 0.98,
    blendMode: 'source-over',
    showLandmarks: false,
    smoothing: 0.45,
    mirror: true,
  });

  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(0);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showSpecsModal, setShowSpecsModal] = useState<boolean>(false);

  const handleUpdateConfig = (newConfig: Partial<FittingConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleResetConfig = () => {
    setConfig({
      scale: 1.0,
      widthFactor: 1.0,
      lengthFactor: 1.0,
      offsetY: 0,
      opacity: 0.98,
      blendMode: 'source-over',
      showLandmarks: false,
      smoothing: 0.45,
      mirror: true,
    });
  };

  const handleAddCustomGarment = (customGarment: Garment) => {
    setGarments((prev) => [customGarment, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        isModelLoaded={isModelLoaded}
        isCameraActive={isCameraActive}
        fps={fps}
        onOpenSpecs={() => setShowSpecsModal(true)}
        onToggleControls={() => setShowControls((prev) => !prev)}
        showControls={showControls}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Top Interactive Area (Camera Viewport + Floating Calibration Sidebar) */}
        <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
          <CameraView
            selectedGarment={selectedGarment}
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onCaptureSnapshot={(url) => setSnapshotUrl(url)}
            onModelStatusChange={setIsModelLoaded}
            onFpsUpdate={setFps}
            onCameraStatusChange={setIsCameraActive}
          />

          {/* Collapsible Calibration Drawer (Right side) */}
          {showControls && (
            <div className="absolute top-4 right-4 animate-fade-in z-30">
              <ControlPanel
                config={config}
                onUpdateConfig={handleUpdateConfig}
                onResetConfig={handleResetConfig}
                onClose={() => setShowControls(false)}
              />
            </div>
          )}
        </div>

        {/* Bottom Wardrobe & Apparel Selector */}
        <section className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>Select Apparel to Try On</span>
                <span className="text-xs font-normal text-cyan-400 font-mono">({garments.length} Available)</span>
              </h2>
              <p className="text-xs text-slate-400">Click any garment or upload your own PNG shirt to instantly fit onto your body</p>
            </div>
          </div>

          <GarmentSelector
            garments={garments}
            selectedGarment={selectedGarment}
            onSelectGarment={setSelectedGarment}
            onAddCustomGarment={handleAddCustomGarment}
          />
        </section>
      </main>

      {/* Captured Snapshot Modal */}
      <SnapshotModal
        dataUrl={snapshotUrl}
        garment={selectedGarment}
        onClose={() => setSnapshotUrl(null)}
      />

      {/* Technical Placement Brief Modal */}
      <PlacementPitchModal
        isOpen={showSpecsModal}
        onClose={() => setShowSpecsModal(false)}
      />
    </div>
  );
};

export default App;
