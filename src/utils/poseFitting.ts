import type { FittingConfig, Garment, PoseFrameData } from '../types';

export class PoseSmoother {
  private current: PoseFrameData | null = null;

  reset() {
    this.current = null;
  }

  update(raw: PoseFrameData, alpha: number = 0.45): PoseFrameData {
    if (!this.current) {
      this.current = { ...raw };
      return this.current;
    }

    // Smooth linear values
    this.current.neckX += (raw.neckX - this.current.neckX) * alpha;
    this.current.neckY += (raw.neckY - this.current.neckY) * alpha;
    this.current.shoulderWidth += (raw.shoulderWidth - this.current.shoulderWidth) * alpha;
    this.current.torsoHeight += (raw.torsoHeight - this.current.torsoHeight) * alpha;
    this.current.confidence += (raw.confidence - this.current.confidence) * alpha;

    // Angle smoothing with angle wrap-around protection
    let diff = raw.angle - this.current.angle;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    this.current.angle += diff * alpha;

    return { ...this.current };
  }

  getCurrent(): PoseFrameData | null {
    return this.current;
  }
}

/**
 * Calculates torso pose geometry from 33 MediaPipe pose landmarks.
 * Landmarks used:
 * 11: left_shoulder
 * 12: right_shoulder
 * 23: left_hip
 * 24: right_hip
 */
export function extractPoseData(
  landmarks: { x: number; y: number; z: number; visibility?: number }[],
  canvasWidth: number,
  canvasHeight: number,
  mirror: boolean = true
): PoseFrameData | null {
  if (!landmarks || landmarks.length < 25) return null;

  const lsRaw = landmarks[11];
  const rsRaw = landmarks[12];
  const lhRaw = landmarks[23];
  const rhRaw = landmarks[24];

  // Check landmark detection confidence
  const confLs = lsRaw.visibility ?? 1.0;
  const confRs = rsRaw.visibility ?? 1.0;
  if (confLs < 0.4 || confRs < 0.4) {
    return null;
  }

  // Coordinate mapping (mirroring horizontally for natural webcam mirror feel)
  const ls = {
    x: (mirror ? (1 - lsRaw.x) : lsRaw.x) * canvasWidth,
    y: lsRaw.y * canvasHeight,
  };
  const rs = {
    x: (mirror ? (1 - rsRaw.x) : rsRaw.x) * canvasWidth,
    y: rsRaw.y * canvasHeight,
  };

  const lh = {
    x: (mirror ? (1 - lhRaw.x) : lhRaw.x) * canvasWidth,
    y: lhRaw.y * canvasHeight,
  };
  const rh = {
    x: (mirror ? (1 - rhRaw.x) : rhRaw.x) * canvasWidth,
    y: rhRaw.y * canvasHeight,
  };

  // Shoulder width & rotation angle
  // Note: in mirrored mode, user's left shoulder appears on screen left, right on screen right
  const screenLeft = mirror ? ls : rs;
  const screenRight = mirror ? rs : ls;

  const dx = screenRight.x - screenLeft.x;
  const dy = screenRight.y - screenLeft.y;
  const shoulderWidth = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);

  // Neck center point (midpoint of shoulders)
  const neckX = (screenLeft.x + screenRight.x) / 2;
  const neckY = (screenLeft.y + screenRight.y) / 2;

  // Hip midpoint to determine torso height
  const hipX = (lh.x + rh.x) / 2;
  const hipY = (lh.y + rh.y) / 2;
  const torsoHeight = Math.hypot(hipX - neckX, hipY - neckY);

  const confidence = (confLs + confRs) / 2;

  return {
    neckX,
    neckY,
    shoulderWidth,
    torsoHeight: torsoHeight > 20 ? torsoHeight : shoulderWidth * 1.2,
    angle,
    confidence
  };
}

/**
 * Renders the chosen garment image onto the canvas, anchored and scaled to the body.
 */
export function drawGarment(
  ctx: CanvasRenderingContext2D,
  garmentImg: HTMLImageElement,
  garment: Garment,
  pose: PoseFrameData,
  config: FittingConfig
) {
  if (!garmentImg.complete || garmentImg.naturalWidth === 0) return;

  const garmentWidth = pose.shoulderWidth * garment.widthFactor * config.scale * config.widthFactor;
  // Natural aspect ratio preservation or torso height alignment
  const imgAspect = garmentImg.naturalHeight / garmentImg.naturalWidth;
  const computedHeight = garmentWidth * (imgAspect > 0 ? imgAspect : 1.25) * config.lengthFactor;

  ctx.save();
  ctx.globalAlpha = Math.max(0.1, Math.min(1.0, config.opacity));
  ctx.globalCompositeOperation = config.blendMode || 'source-over';

  // Translate to neck midpoint with fine-tune vertical offset
  ctx.translate(pose.neckX, pose.neckY + config.offsetY);
  ctx.rotate(pose.angle);

  // The collar top of standard t-shirts sits ~10% from top of garment image
  const collarOffsetY = computedHeight * 0.10;

  ctx.drawImage(
    garmentImg,
    -garmentWidth / 2,
    -collarOffsetY,
    garmentWidth,
    computedHeight
  );

  ctx.restore();
}

/**
 * Renders technical CV pose landmarks and connection skeleton for recruiter demo
 */
export function drawDebugSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: { x: number; y: number; z: number; visibility?: number }[],
  canvasWidth: number,
  canvasHeight: number,
  mirror: boolean = true
) {
  // Key upper body connections: [from, to]
  const connections: [number, number][] = [
    [11, 12], // shoulders
    [11, 13], // left shoulder to left elbow
    [13, 15], // left elbow to left wrist
    [12, 14], // right shoulder to right elbow
    [14, 16], // right elbow to right wrist
    [11, 23], // left shoulder to left hip
    [12, 24], // right shoulder to right hip
    [23, 24], // hip bridge
  ];

  ctx.save();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#00f2fe';
  ctx.fillStyle = '#f857a6';

  // Draw connecting bones
  connections.forEach(([i, j]) => {
    const a = landmarks[i];
    const b = landmarks[j];
    if (!a || !b) return;
    if ((a.visibility ?? 1) < 0.4 || (b.visibility ?? 1) < 0.4) return;

    const ax = (mirror ? (1 - a.x) : a.x) * canvasWidth;
    const ay = a.y * canvasHeight;
    const bx = (mirror ? (1 - b.x) : b.x) * canvasWidth;
    const by = b.y * canvasHeight;

    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  });

  // Draw joints
  [11, 12, 13, 14, 15, 16, 23, 24].forEach((idx) => {
    const lm = landmarks[idx];
    if (!lm || (lm.visibility ?? 1) < 0.4) return;
    const x = (mirror ? (1 - lm.x) : lm.x) * canvasWidth;
    const y = lm.y * canvasHeight;

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#00f2fe';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  });

  ctx.restore();
}
