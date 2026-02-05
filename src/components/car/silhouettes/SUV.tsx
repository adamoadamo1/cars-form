'use client';

import { CarSilhouetteProps } from './Sedan';

export function SUV({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
  const pct = fillPercent;
  const strokeColor = pct < 0.15 ? '#c0b5a5' : '#3a342a';
  const fillOpacity = Math.min(pct * 1.3, 1);
  const windowOpacity = pct > 0.4 ? Math.min((pct - 0.4) * 2.5, 0.65) : 0;
  const tireOpacity = pct > 0.15 ? Math.min((pct - 0.1) * 1.8, 1) : 0;
  const dashArray = pct < 0.1 ? '8 5' : pct < 0.25 ? '14 3' : 'none';
  const glowFilter = pct > 0.4 ? `drop-shadow(0 6px 20px ${fillColor}44)` : 'none';

  return (
    <div className={`relative w-full max-w-[280px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 400 180"
        fill="none"
        className="w-full transition-car"
        style={{ filter: glowFilter }}
      >
        {/* Ground line */}
        <line
          x1="30" y1="112" x2="370" y2="112"
          stroke="#d4cdc2" strokeWidth="0.5"
          opacity={Math.max(0, 0.5 - pct)}
          strokeDasharray="4 8"
        />

        {/* Body fill - taller, boxier SUV shape */}
        <path
          d="M48 115C48 108 52 60 90 50L160 44C175 42 185 42 200 44L310 52C345 58 358 75 362 115Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Roof fill - more boxy */}
        <path
          d="M100 50C104 24 118 12 150 10L260 10C290 12 304 24 308 50Z"
          fill={fillColor}
          opacity={fillOpacity * 0.82}
          className="transition-car"
        />

        {/* Body outline */}
        <path
          d="M48 115C48 108 52 60 90 50L160 44C175 42 185 42 200 44L310 52C345 58 358 75 362 115"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Roof outline */}
        <path
          d="M100 50C104 24 118 12 150 10L260 10C290 12 304 24 308 50"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Window pillars */}
        <line x1="145" y1="50" x2="140" y2="14" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />
        <line x1="220" y1="50" x2="220" y2="14" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Windows */}
        <path d="M105 48L138 14 143 48Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />
        <path d="M150 48L144 14 216 14 218 48Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />
        <path d="M225 48L222 14 260 14C275 20 285 32 290 48Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Headlight */}
        <rect x="52" y="86" width="16" height="12" rx="3" fill={pct > 0.35 ? '#f5e8a0' : 'none'} opacity={pct > 0.35 ? 0.8 : 0} />
        <rect x="52" y="86" width="16" height="12" rx="3" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Taillight */}
        <rect x="348" y="88" width="12" height="16" rx="2" fill={pct > 0.35 ? '#e05050' : 'none'} opacity={pct > 0.35 ? 0.7 : 0} />
        <rect x="348" y="88" width="12" height="16" rx="2" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Bottom line */}
        <path d="M42 118L368 118" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Door handle */}
        <line x1="180" y1="70" x2="205" y2="70" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity={pct > 0.3 ? 0.5 : 0} />

        {/* Roof rails */}
        <line x1="110" y1="8" x2="298" y2="8" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} opacity={pct > 0.4 ? 0.6 : 0} />

        {/* Side mirror */}
        <path d="M95 50L85 42 85 54Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Front wheel - larger for SUV */}
        <circle cx="108" cy="125" r="32" fill="#222" opacity={tireOpacity} />
        <circle cx="108" cy="125" r="32" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="125" r="18" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="108" cy="125" r="18" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="125" r="5" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="302" cy="125" r="32" fill="#222" opacity={tireOpacity} />
        <circle cx="302" cy="125" r="32" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="302" cy="125" r="18" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="302" cy="125" r="18" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="302" cy="125" r="5" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="200" cy="162" rx="155" ry="8" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
