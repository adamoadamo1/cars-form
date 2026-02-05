'use client';

import { CarSilhouetteProps } from './Sedan';

export function Hatchback({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
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

        {/* Body fill - compact hatchback shape */}
        <path
          d="M50 112C50 106 55 65 95 55L165 48C180 46 195 46 210 48L285 55C320 60 340 80 345 112Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Roof fill - sloped back hatchback style */}
        <path
          d="M115 55C120 30 135 20 160 18L220 18C250 20 275 35 295 55Z"
          fill={fillColor}
          opacity={fillOpacity * 0.82}
          className="transition-car"
        />

        {/* Body outline */}
        <path
          d="M50 112C50 106 55 65 95 55L165 48C180 46 195 46 210 48L285 55C320 60 340 80 345 112"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Roof outline - characteristic hatchback slope */}
        <path
          d="M115 55C120 30 135 20 160 18L220 18C250 20 275 35 295 55"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Window pillars */}
        <line x1="155" y1="55" x2="150" y2="22" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />
        <line x1="230" y1="55" x2="235" y2="25" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Front window */}
        <path d="M120 54L148 22 153 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Side window */}
        <path d="M158 54L152 22 232 24 233 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Rear window - angled for hatchback */}
        <path d="M238 54L238 26 258 32C272 42 282 50 290 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Headlight */}
        <ellipse cx="62" cy="95" rx="10" ry="9" fill={pct > 0.35 ? '#f5e8a0' : 'none'} opacity={pct > 0.35 ? 0.8 : 0} />
        <ellipse cx="62" cy="95" rx="10" ry="9" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Taillight - vertical hatchback style */}
        <path
          d="M332 65L340 68L340 95L332 98Z"
          fill={pct > 0.35 ? '#e05050' : 'none'}
          opacity={pct > 0.35 ? 0.7 : 0}
        />
        <path
          d="M332 65L340 68L340 95L332 98Z"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeDasharray={dashArray}
        />

        {/* Bottom line */}
        <path d="M45 116L350 116" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Door handle */}
        <line x1="185" y1="72" x2="207" y2="72" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity={pct > 0.3 ? 0.5 : 0} />

        {/* Rear hatch line */}
        <path
          d="M295 55L330 72"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray={dashArray}
          opacity={pct > 0.3 ? 0.4 : 0}
        />

        {/* Side mirror */}
        <path d="M110 55L100 48 100 58Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Front wheel */}
        <circle cx="108" cy="120" r="26" fill="#222" opacity={tireOpacity} />
        <circle cx="108" cy="120" r="26" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="120" r="15" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="108" cy="120" r="15" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="120" r="4" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="288" cy="120" r="26" fill="#222" opacity={tireOpacity} />
        <circle cx="288" cy="120" r="26" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="288" cy="120" r="15" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="288" cy="120" r="15" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="288" cy="120" r="4" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="195" cy="154" rx="145" ry="7" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
