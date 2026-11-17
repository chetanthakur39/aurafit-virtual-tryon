# 👕 AuraFit AR: Real-Time Virtual Garment Try-On System

> **A real-time, client-side Augmented Reality apparel fitting engine powered by Google MediaPipe Computer Vision, WebAssembly, and Canvas 2D matrix transformations.**

[![Built with Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-PoseLandmarker-0097A7?logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 🌟 Live Demo & Video Showcase
- **Live Demo Link:** `[Deploy with 1-click on Vercel/Netlify using instructions below]`
- **Placement Demo Target:** E-Commerce, Virtual Mirror Retail, Computer Vision & Edge AI.

---

## 🚀 Key Highlights & Engineering Features

### 1. Zero-Cloud-Latency Edge Computer Vision
Traditional AI virtual try-on models (e.g. IDM-VTON, OOTDiffusion) run large diffusion pipelines requiring cloud GPUs, costing substantial hosting fees and taking 10–20 seconds per frame. **AuraFit AR** runs **100% on the client's browser** at **30–60 FPS** using Google MediaPipe PoseLandmarker compiled to **WebAssembly SIMD** with WebGL acceleration.

### 2. Anatomical Clavicle Anchoring & Dynamic Affine Warping
- Samples **33 3D body keypoints** in real-time.
- Tracks **Keypoint #11 (Left Shoulder)** and **Keypoint #12 (Right Shoulder)** to calculate Euclidean shoulder span and planar rotation angle $\theta$.
- Tracks **Keypoints #23 & #24 (Hips)** to calculate dynamic torso length.
- Anchors garment collar directly at the suprasternal notch / clavicle midpoint.

### 3. Jitter Attenuation via EMA Filter
Applies an **Exponential Moving Average (EMA)** filter ($\alpha = 0.45$) to coordinate transitions, ensuring butter-smooth clothing drape and eliminating sensor micro-jitters without introducing latency.

### 4. Interactive Calibration Dock
- **Shoulder Width & Torso Length Scaling:** Fine-tune garment sizing dynamically.
- **Vertical Offset:** Adjust collar height.
- **Fabric Blend Modes:** Test `Normal`, `Multiply`, and `Hard-Light` composition for realistic lighting integration.
- **AI Skeleton Debugger:** Toggle real-time visualization of CV joints and skeleton bones.

### 5. Wardrobe Carousel & Custom Upload
- Includes 6 pre-calibrated apparel models (Cyberpunk Graphic Tee, Classic Denim Jacket, Varsity Crimson Hoodie, Formal Blazer & Tie, Minimalist White Tee, Athletic Jersey).
- **Custom PNG Upload:** Drag and drop any transparent PNG garment to instantly try it on.
- **Photo Booth Mode:** 3-second countdown snapshot with automatic high-res PNG download and celebration effects.

---

## 📐 Mathematical Formulation

$$\Delta x = x_{\text{right}} - x_{\text{left}}, \quad \Delta y = y_{\text{right}} - y_{\text{left}}$$

$$\theta = \text{atan2}(\Delta y, \Delta x)$$

$$\text{ShoulderSpan} = \sqrt{\Delta x^2 + \Delta y^2}$$

$$\text{GarmentWidth} = \text{ShoulderSpan} \times k_{\text{width}} \times \text{Scale}$$

$$\text{GarmentHeight} = \text{GarmentWidth} \times \text{AspectRatio} \times k_{\text{length}}$$

$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} \cos\theta & -\sin\theta & x_{\text{neck}} \\ \sin\theta & \cos\theta & y_{\text{neck}} + \delta_{\text{offset}} \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x_{\text{local}} \\ y_{\text{local}} \\ 1 \end{bmatrix}$$

---

## 🛠️ Tech Stack & Architecture

```
[Webcam Stream] ──> [HTML5 Video Element]
                           │
                           ▼
             [MediaPipe PoseLandmarker (WASM)]
                           │
                           ▼ (33 3D Landmarks)
             [Pose Normalizer & EMA Filter]
                           │
                           ▼
             [Canvas 2D Matrix Engine] ─── [Garment Asset Cache]
                           │
                           ▼
             [Real-Time 60 FPS Viewport]
```

- **Frontend:** React 19, TypeScript, Vite
- **Computer Vision:** Google MediaPipe `@mediapipe/tasks-vision`
- **Graphics Pipeline:** HTML5 Canvas 2D Transform Matrix, WebGL
- **Styling:** Tailwind CSS (Modern Glassmorphic Dark UI)
- **Icons & Effects:** Lucide React, Canvas Confetti

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd virtual-tryon-ar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```
   The self-contained, optimized bundle is generated in `dist/`.

---

## 🌐 How to Make It Live (1-Click Deployment)

Modern browsers strictly require **HTTPS** to access the user's webcam. Any of the free options below automatically provision HTTPS:

### Option A: Deploy with Vercel (Recommended - 30 seconds)
1. Run in terminal:
   ```bash
   npx vercel
   ```
2. Accept the defaults. Your live URL will be ready immediately (e.g., `https://aurafit-tryon.vercel.app`).

### Option B: Deploy with Netlify Drop (Drag & Drop - 0 terminal commands)
1. Build the production folder: `npm run build`.
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder. Netlify provides an instant live HTTPS link!

### Option C: GitHub Pages
1. Push your repository to GitHub.
2. Under Repository **Settings > Pages**, select **GitHub Actions** or deploy from the `dist` branch.

---

## ✉️ Placement Email Template (Ready to Send to Recruiters)

```text
Subject: Project Submission: AuraFit AR - Real-Time Virtual Garment Try-On System | [Your Name]

Dear [Recruiter / Hiring Team],

I am excited to share a demonstration of my latest computer vision and frontend engineering project: AuraFit AR.

🔗 Live Application: [Paste your Vercel/Netlify URL here]
📁 GitHub Repository: [Paste your GitHub URL here]

Project Overview:
AuraFit AR is a real-time, client-side Augmented Reality clothing try-on system designed to eliminate e-commerce sizing friction. Rather than relying on expensive cloud GPUs and high-latency diffusion models, AuraFit runs entirely in the browser at 30–60 FPS.

Key Technical Accomplishments:
• Edge Computer Vision: Leveraged Google MediaPipe PoseLandmarker compiled to WebAssembly (WASM SIMD) with WebGL acceleration to track 33 3D body keypoints in real-time.
• Mathematical Fitting: Derived planar torso rotation angles and Euclidean shoulder spans to dynamically warp, anchor, and scale 2D garments directly onto the user's clavicle midpoint.
• Motion Stabilization: Engineered an Exponential Moving Average (EMA) smoothing filter to dampen optical sensor noise while maintaining low tracking latency.
• Complete UX: Built an interactive calibration dock, curated apparel wardrobe, custom transparent PNG file uploader, and high-res snapshot capture.

I would love the opportunity to walk you through the codebase and discuss how my skills align with your engineering team.

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn Profile]
```
