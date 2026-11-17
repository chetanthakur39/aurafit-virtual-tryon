import os

garments_dir = r"C:\Users\cheta\.gemini\antigravity\scratch\virtual-tryon-ar\public\garments"
os.makedirs(garments_dir, exist_ok=True)

# 1. Cyberpunk Black Graphic Tee
cyber_tee = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720">
  <defs>
    <linearGradient id="teeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="50%" stop-color="#141418"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#4facfe"/>
    </linearGradient>
    <linearGradient id="purpleGlow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f857a6"/>
      <stop offset="100%" stop-color="#ff5858"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Main T-Shirt Body & Sleeves -->
  <path d="M 210,50 
           C 250,90 350,90 390,50 
           L 470,85 
           L 570,180 
           L 510,240 
           L 450,195 
           L 445,630 
           C 445,650 430,660 410,660 
           L 190,660 
           C 170,660 155,650 155,630 
           L 150,195 
           L 90,240 
           L 30,180 
           L 130,85 Z" 
        fill="url(#teeGrad)" 
        stroke="#2d2d35" 
        stroke-width="3"
        filter="url(#dropShadow)" />

  <!-- Collar Neck Ribbing -->
  <path d="M 210,50 C 250,90 350,90 390,50 C 360,110 240,110 210,50 Z" 
        fill="#2a2a32" 
        stroke="#3f3f4d" 
        stroke-width="2"/>
  <path d="M 225,56 C 260,86 340,86 375,56" 
        fill="none" 
        stroke="#1a1a20" 
        stroke-width="2" 
        stroke-dasharray="4,3"/>

  <!-- Sleeve Seams -->
  <path d="M 130,85 L 150,195" stroke="#2a2a34" stroke-width="2"/>
  <path d="M 470,85 L 450,195" stroke="#2a2a34" stroke-width="2"/>
  <!-- Sleeve Cuffs Hem -->
  <path d="M 30,180 L 90,240" stroke="#353540" stroke-width="2"/>
  <path d="M 570,180 L 510,240" stroke="#353540" stroke-width="2"/>
  <!-- Bottom Hem -->
  <path d="M 155,640 L 445,640" stroke="#2a2a34" stroke-width="2" stroke-dasharray="5,4"/>

  <!-- Modern Graphic Print (Chest) -->
  <g transform="translate(200, 210)">
    <!-- Tech Frame -->
    <rect x="0" y="0" width="200" height="230" rx="14" fill="#0d0d12" stroke="url(#neonGlow)" stroke-width="2"/>
    <circle cx="100" cy="85" r="50" fill="none" stroke="url(#purpleGlow)" stroke-width="3" stroke-dasharray="6,4"/>
    <polygon points="100,50 130,105 70,105" fill="url(#neonGlow)" opacity="0.85"/>
    <!-- Typography -->
    <text x="100" y="165" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" fill="#ffffff" letter-spacing="4" text-anchor="middle">CYBER//TECH</text>
    <text x="100" y="185" font-family="'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="10" fill="#00f2fe" letter-spacing="3" text-anchor="middle">SYSTEM PROTOCOL 01</text>
    <line x1="30" y1="205" x2="170" y2="205" stroke="#333344" stroke-width="1"/>
    <text x="100" y="218" font-family="monospace" font-size="8" fill="#888899" text-anchor="middle">COORD: 35.6895° N, 139.6917° E</text>
  </g>

  <!-- Fabric Highlights and Shadow lines -->
  <path d="M 165,220 C 175,340 170,480 165,630" stroke="#ffffff" stroke-width="1.5" opacity="0.06"/>
  <path d="M 435,220 C 425,340 430,480 435,630" stroke="#000000" stroke-width="3" opacity="0.3"/>
</svg>'''

# 2. Classic Denim Jacket
denim_jacket = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720">
  <defs>
    <linearGradient id="denimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#244263"/>
      <stop offset="50%" stop-color="#1d3550"/>
      <stop offset="100%" stop-color="#132437"/>
    </linearGradient>
    <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2f547c"/>
      <stop offset="100%" stop-color="#1d3550"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Main Body & Sleeves -->
  <path d="M 200,45 
           L 400,45 
           L 490,85 
           L 580,220 
           L 515,265 
           L 460,205 
           L 455,620 
           L 145,620 
           L 140,205 
           L 85,265 
           L 20,220 
           L 110,85 Z" 
        fill="url(#denimGrad)" 
        stroke="#416b99" 
        stroke-width="2.5"
        filter="url(#shadow)"/>

  <!-- Front Center Placket / Button Seam -->
  <rect x="288" y="100" width="24" height="520" fill="#182c42" stroke="#d49b43" stroke-width="1.5"/>

  <!-- Golden Brass Buttons -->
  <g fill="#d49b43" stroke="#875b1c" stroke-width="1.5">
    <circle cx="300" cy="140" r="7"/>
    <circle cx="300" cy="220" r="7"/>
    <circle cx="300" cy="300" r="7"/>
    <circle cx="300" cy="380" r="7"/>
    <circle cx="300" cy="460" r="7"/>
    <circle cx="300" cy="540" r="7"/>
    <circle cx="300" cy="600" r="7"/>
  </g>

  <!-- Denim Flap Chest Pockets -->
  <!-- Left Pocket -->
  <path d="M 190,220 L 265,220 L 265,290 L 227,315 L 190,290 Z" fill="#1a3047" stroke="#d49b43" stroke-width="1.5"/>
  <path d="M 185,220 L 270,220 L 227,245 Z" fill="#244263" stroke="#d49b43" stroke-width="1.5"/>
  <circle cx="227" cy="235" r="4.5" fill="#d49b43"/>

  <!-- Right Pocket -->
  <path d="M 335,220 L 410,220 L 410,290 L 372,315 L 335,290 Z" fill="#1a3047" stroke="#d49b43" stroke-width="1.5"/>
  <path d="M 330,220 L 415,220 L 372,245 Z" fill="#244263" stroke="#d49b43" stroke-width="1.5"/>
  <circle cx="372" cy="235" r="4.5" fill="#d49b43"/>

  <!-- Distinctive Denim Jacket Yoke Seams -->
  <path d="M 145,170 L 455,170" stroke="#d49b43" stroke-width="1.5" stroke-dasharray="4,2"/>
  <path d="M 227,170 L 227,620" stroke="#d49b43" stroke-width="1.2" stroke-dasharray="5,3"/>
  <path d="M 372,170 L 372,620" stroke="#d49b43" stroke-width="1.2" stroke-dasharray="5,3"/>

  <!-- Wide Folded Denim Collar -->
  <path d="M 200,45 L 300,105 L 230,135 L 180,75 Z" fill="url(#collarGrad)" stroke="#4a7cb0" stroke-width="2"/>
  <path d="M 400,45 L 300,105 L 370,135 L 420,75 Z" fill="url(#collarGrad)" stroke="#4a7cb0" stroke-width="2"/>
  <path d="M 200,45 C 240,65 360,65 400,45 L 300,105 Z" fill="#132437"/>

  <!-- Bottom Waistband -->
  <rect x="145" y="585" width="310" height="35" fill="#182c42" stroke="#d49b43" stroke-width="1.5"/>
</svg>'''

# 3. Varsity Crimson Hoodie
varsity_hoodie = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="740" viewBox="0 0 600 740">
  <defs>
    <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#991b1b"/>
      <stop offset="50%" stop-color="#7f1d1d"/>
      <stop offset="100%" stop-color="#450a0a"/>
    </linearGradient>
    <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#580b20"/>
    </linearGradient>
    <filter id="hoodieShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Main Torso & Sleeves -->
  <path d="M 195,65 
           C 250,95 350,95 405,65 
           L 490,95 
           L 580,240 
           L 510,290 
           L 455,220 
           L 450,650 
           L 150,650 
           L 145,220 
           L 90,290 
           L 20,240 
           L 110,95 Z" 
        fill="url(#hoodieGrad)" 
        stroke="#b91c1c" 
        stroke-width="2.5"
        filter="url(#hoodieShadow)"/>

  <!-- Voluminous Overlapping Hood at Collar -->
  <path d="M 195,65 C 220,12 380,12 405,65 C 370,120 230,120 195,65 Z" 
        fill="#5b0a0a" 
        stroke="#ef4444" 
        stroke-width="2"/>
  <path d="M 230,75 C 270,125 330,125 370,75" fill="none" stroke="#2a0505" stroke-width="4"/>

  <!-- Thick White Drawstrings -->
  <path d="M 260,95 C 255,160 250,220 255,270" fill="none" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round"/>
  <circle cx="255" cy="272" r="5" fill="#cbd5e1"/>
  
  <path d="M 340,95 C 345,150 350,210 345,255" fill="none" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round"/>
  <circle cx="345" cy="257" r="5" fill="#cbd5e1"/>

  <!-- Athletic Front Kangaroo Pocket -->
  <path d="M 200,450 L 400,450 L 435,590 L 165,590 Z" 
        fill="url(#pocketGrad)" 
        stroke="#991b1b" 
        stroke-width="2.5"/>
  <!-- Pocket Openings -->
  <path d="M 200,450 L 165,590" stroke="#fca5a5" stroke-width="2"/>
  <path d="M 400,450 L 435,590" stroke="#fca5a5" stroke-width="2"/>

  <!-- Varsity Emblem / Typography -->
  <g transform="translate(300, 260)" text-anchor="middle">
    <text y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="64" fill="#f8fafc" stroke="#1e293b" stroke-width="2">ATHLETIC</text>
    <text y="45" font-family="'Arial Black', sans-serif" font-weight="900" font-size="42" fill="#fbbf24">98</text>
    <text y="70" font-family="sans-serif" font-size="12" font-weight="700" fill="#fecaca" letter-spacing="4">CHAMPIONSHIP DIVISION</text>
  </g>

  <!-- Ribbed Waistband & Cuffs -->
  <rect x="150" y="615" width="300" height="35" fill="#3b0707" stroke="#7f1d1d" stroke-width="2"/>
  <!-- Sleeve Cuffs -->
  <path d="M 20,240 L 90,290" stroke="#fca5a5" stroke-width="4"/>
  <path d="M 580,240 L 510,290" stroke="#fca5a5" stroke-width="4"/>
</svg>'''

# 4. Executive Formal Suit & Blazer
formal_blazer = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="740" viewBox="0 0 600 740">
  <defs>
    <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f242d"/>
      <stop offset="50%" stop-color="#14171d"/>
      <stop offset="100%" stop-color="#0a0c0f"/>
    </linearGradient>
    <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
    <filter id="suitShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Blazer Body & Sleeves -->
  <path d="M 190,45 
           L 410,45 
           L 490,75 
           L 570,240 
           L 505,280 
           L 455,200 
           L 450,670 
           L 150,670 
           L 145,200 
           L 95,280 
           L 30,240 
           L 110,75 Z" 
        fill="url(#blazerGrad)" 
        stroke="#2e3543" 
        stroke-width="2"
        filter="url(#suitShadow)"/>

  <!-- Inner Crisp White Shirt -->
  <polygon points="260,45 340,45 355,240 245,240" fill="#f8fafc"/>
  <!-- Shirt Collar Points -->
  <polygon points="255,45 295,120 280,125 250,55" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <polygon points="345,45 305,120 320,125 350,55" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Red Silk Tie -->
  <!-- Knot -->
  <polygon points="290,110 310,110 306,128 294,128" fill="#b91c1c"/>
  <!-- Body -->
  <polygon points="294,128 306,128 318,340 300,365 282,340" fill="url(#tieGrad)" stroke="#991b1b" stroke-width="1"/>
  <!-- Tie diagonal micro-stripes -->
  <line x1="292" y1="160" x2="308" y2="175" stroke="#fca5a5" stroke-width="1.5" opacity="0.6"/>
  <line x1="290" y1="200" x2="310" y2="215" stroke="#fca5a5" stroke-width="1.5" opacity="0.6"/>
  <line x1="288" y1="240" x2="312" y2="255" stroke="#fca5a5" stroke-width="1.5" opacity="0.6"/>

  <!-- Left Lapel -->
  <path d="M 190,45 L 260,190 L 225,210 L 300,390 L 270,395 L 175,190 Z" fill="#242a35" stroke="#3b4455" stroke-width="1.5"/>
  <!-- Right Lapel -->
  <path d="M 410,45 L 340,190 L 375,210 L 300,390 L 330,395 L 425,190 Z" fill="#1b2028" stroke="#3b4455" stroke-width="1.5"/>

  <!-- Chest Pocket with White Pocket Square -->
  <line x1="185" y1="260" x2="235" y2="255" stroke="#374151" stroke-width="3"/>
  <polygon points="195,255 210,235 220,255" fill="#ffffff"/>

  <!-- Front Closure & Single Dark Horn Button -->
  <line x1="300" y1="390" x2="300" y2="670" stroke="#0a0c0f" stroke-width="2.5"/>
  <circle cx="300" cy="425" r="7" fill="#0f1115" stroke="#475569" stroke-width="1.5"/>
  <circle cx="300" cy="495" r="7" fill="#0f1115" stroke="#475569" stroke-width="1.5"/>

  <!-- Flap Waist Pockets -->
  <rect x="160" y="480" width="85" height="24" rx="3" fill="#1a1e26" stroke="#374151" stroke-width="1.5"/>
  <rect x="355" y="480" width="85" height="24" rx="3" fill="#14171e" stroke="#374151" stroke-width="1.5"/>
</svg>'''

# 5. Clean White Minimalist T-Shirt
white_tee = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720">
  <defs>
    <linearGradient id="whiteTeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <filter id="whiteShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Main T-Shirt Body & Sleeves -->
  <path d="M 210,50 
           C 250,90 350,90 390,50 
           L 470,85 
           L 570,180 
           L 510,240 
           L 450,195 
           L 445,630 
           C 445,650 430,660 410,660 
           L 190,660 
           C 170,660 155,650 155,630 
           L 150,195 
           L 90,240 
           L 30,180 
           L 130,85 Z" 
        fill="url(#whiteTeeGrad)" 
        stroke="#cbd5e1" 
        stroke-width="2.5"
        filter="url(#whiteShadow)"/>

  <!-- Crewneck Collar Ribbing -->
  <path d="M 210,50 C 250,90 350,90 390,50 C 360,110 240,110 210,50 Z" 
        fill="#e2e8f0" 
        stroke="#94a3b8" 
        stroke-width="1.5"/>

  <!-- Chest Patch Pocket -->
  <path d="M 350,210 L 410,210 L 410,270 L 380,290 L 350,270 Z" 
        fill="#f8fafc" 
        stroke="#cbd5e1" 
        stroke-width="1.5"/>

  <!-- Sleeve & Hem Stitching Details -->
  <path d="M 130,85 L 150,195" stroke="#cbd5e1" stroke-width="1.5"/>
  <path d="M 470,85 L 450,195" stroke="#cbd5e1" stroke-width="1.5"/>
  <path d="M 155,645 L 445,645" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M 35,185 L 90,238" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M 565,185 L 510,238" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Subtle Minimalist Typography on Chest -->
  <text x="210" y="240" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="700" font-size="14" fill="#64748b" letter-spacing="4">ESSENTIALS</text>
  <text x="210" y="258" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="400" font-size="10" fill="#94a3b8" letter-spacing="2">STUDIO EDITION</text>
</svg>'''

# 6. Neon Athletic Jersey
sports_jersey = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720">
  <defs>
    <linearGradient id="jerseyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="50%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="jerseyShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Sleeveless Athletic Jersey Silhouette -->
  <path d="M 210,50 
           C 250,90 350,90 390,50 
           L 460,80 
           C 430,160 435,220 445,230 
           L 440,650 
           L 160,650 
           L 155,230 
           C 165,220 170,160 140,80 Z" 
        fill="url(#jerseyGrad)" 
        stroke="#3b82f6" 
        stroke-width="2.5"
        filter="url(#jerseyShadow)"/>

  <!-- Gold Armhole & Neck Trim -->
  <path d="M 210,50 C 250,90 350,90 390,50 C 360,105 240,105 210,50 Z" 
        fill="#f59e0b" 
        stroke="#d97706" 
        stroke-width="1.5"/>
  <path d="M 140,80 C 170,160 165,220 155,230" stroke="#f59e0b" stroke-width="6"/>
  <path d="M 460,80 C 430,160 435,220 445,230" stroke="#f59e0b" stroke-width="6"/>

  <!-- Dynamic Side Ventilation Panels -->
  <polygon points="160,240 185,250 185,630 160,630" fill="#0f172a" opacity="0.6"/>
  <polygon points="440,240 415,250 415,630 440,630" fill="#0f172a" opacity="0.6"/>

  <!-- Bold Athletic Center Number & Team Name -->
  <g transform="translate(300, 210)" text-anchor="middle">
    <text y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="34" fill="#fbbf24" letter-spacing="6">ALL-STARS</text>
    <text y="140" font-family="'Impact', 'Arial Black', sans-serif" font-size="140" fill="#ffffff" stroke="#f59e0b" stroke-width="4">07</text>
    <text y="200" font-family="'Segoe UI', sans-serif" font-weight="800" font-size="16" fill="#93c5fd" letter-spacing="8">CHAMPION</text>
  </g>

  <!-- Bottom Hem Details -->
  <rect x="160" y="635" width="280" height="15" fill="#f59e0b"/>
</svg>'''

files = {
    "cyber-tee.svg": cyber_tee,
    "denim-jacket.svg": denim_jacket,
    "varsity-hoodie.svg": varsity_hoodie,
    "formal-blazer.svg": formal_blazer,
    "white-minimalist-tee.svg": white_tee,
    "sports-jersey.svg": sports_jersey
}

for name, content in files.items():
    with open(os.path.join(garments_dir, name), "w", encoding="utf-8") as f:
        f.write(content.strip())
print(f"Successfully generated {len(files)} garment SVGs in {garments_dir}")
