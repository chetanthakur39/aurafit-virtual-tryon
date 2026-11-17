export interface Garment {
  id: string;
  name: string;
  category: 'all' | 'tshirt' | 'jacket' | 'hoodie' | 'formal' | 'sports' | 'custom';
  imageSrc: string;
  defaultScale: number;
  defaultOffsetY: number;
  widthFactor: number;
  heightFactor: number;
  description: string;
  isCustom?: boolean;
}

export interface FittingConfig {
  scale: number;        // overall scale (0.7 - 1.5)
  widthFactor: number;  // horizontal expansion (0.7 - 1.6)
  lengthFactor: number; // vertical length expansion (0.7 - 1.6)
  offsetY: number;      // vertical shift in px (-80 to +80)
  opacity: number;      // 0.4 to 1.0
  blendMode: GlobalCompositeOperation;
  showLandmarks: boolean;
  smoothing: number;    // EMA factor (0.1 = heavy smooth, 0.9 = fast follow)
  mirror: boolean;
}

export interface SmoothedLandmark {
  x: number;
  y: number;
  visibility: number;
}

export interface PoseFrameData {
  neckX: number;
  neckY: number;
  shoulderWidth: number;
  torsoHeight: number;
  angle: number;
  confidence: number;
}
