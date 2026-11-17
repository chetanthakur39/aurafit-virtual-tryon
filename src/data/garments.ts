import type { Garment } from '../types';

export const INITIAL_GARMENTS: Garment[] = [
  {
    id: 'cyber-tee',
    name: 'Cyber//Tech Streetwear Tee',
    category: 'tshirt',
    imageSrc: '/garments/cyber-tee.svg',
    defaultScale: 1.05,
    defaultOffsetY: -8,
    widthFactor: 2.1,
    heightFactor: 1.35,
    description: 'Black oversized technical graphic tee with cyan and magenta accents.'
  },
  {
    id: 'denim-jacket',
    name: 'Classic Indigo Denim Jacket',
    category: 'jacket',
    imageSrc: '/garments/denim-jacket.svg',
    defaultScale: 1.1,
    defaultOffsetY: -12,
    widthFactor: 2.15,
    heightFactor: 1.38,
    description: 'Heavyweight trucker jacket with contrast brass buttons and structured collar.'
  },
  {
    id: 'varsity-hoodie',
    name: 'Varsity Crimson 98 Hoodie',
    category: 'hoodie',
    imageSrc: '/garments/varsity-hoodie.svg',
    defaultScale: 1.12,
    defaultOffsetY: -18,
    widthFactor: 2.2,
    heightFactor: 1.4,
    description: 'Relaxed fit athletic heavyweight hoodie with kangaroo pocket & hood collar.'
  },
  {
    id: 'formal-blazer',
    name: 'Executive Tailored Blazer',
    category: 'formal',
    imageSrc: '/garments/formal-blazer.svg',
    defaultScale: 1.1,
    defaultOffsetY: -14,
    widthFactor: 2.15,
    heightFactor: 1.42,
    description: 'Midnight black slim-cut blazer over crisp white shirt and silk tie.'
  },
  {
    id: 'white-minimalist-tee',
    name: 'Essentials Minimal White Tee',
    category: 'tshirt',
    imageSrc: '/garments/white-minimalist-tee.svg',
    defaultScale: 1.02,
    defaultOffsetY: -6,
    widthFactor: 2.05,
    heightFactor: 1.32,
    description: 'Clean modern crewneck t-shirt with soft fabric drape & chest pocket.'
  },
  {
    id: 'sports-jersey',
    name: 'All-Stars Pro Jersey 07',
    category: 'sports',
    imageSrc: '/garments/sports-jersey.svg',
    defaultScale: 1.0,
    defaultOffsetY: -5,
    widthFactor: 1.95,
    heightFactor: 1.32,
    description: 'Electric blue and gold mesh sleeveless jersey with bold athletic typography.'
  }
];
