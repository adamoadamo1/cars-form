'use client';

export interface CarSilhouetteProps {
  fillColor: string;
  fillPercent: number;
  className?: string;
}

export function Sedan({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
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

        {/* Body fill */}
        <path
          d="M52 112C52 108 56 68 102 58L172 47C187 45 197 45 212 47L292 60C332 68 352 82 356 112Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Roof fill */}
        <path
          d="M122 57C126 32 142 22 167 20L237 20C262 22 277 32 282 57Z"
          fill={fillColor}
          opacity={fillOpacity * 0.82}
          className="transition-car"
        />

        {/* Body outline */}
        <path
          d="M52 112C53 106 58 70 102 58L172 47C187 45 197 45 212 47L292 60C330 67 351 83 356 112"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Roof outline */}
        <path
          d="M122 57C126 32 142 22 167 20L237 20C262 22 277 32 282 57"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Window pillars */}
        <line x1="157" y1="57" x2="152" y2="24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />
        <line x1="250" y1="57" x2="254" y2="26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Windows */}
        <path d="M127 54L150 24 153 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />
        <path d="M159 54L154 24 250 26 255 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />
        <path d="M260 54L256 26 278 34C280 44 278 52 274 54Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Headlight */}
        <ellipse cx="64" cy="96" rx="10" ry="8" fill={pct > 0.35 ? '#f5e8a0' : 'none'} opacity={pct > 0.35 ? 0.8 : 0} />
        <ellipse cx="64" cy="96" rx="10" ry="8" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Taillight */}
        <ellipse cx="348" cy="96" rx="8" ry="7" fill={pct > 0.35 ? '#e05050' : 'none'} opacity={pct > 0.35 ? 0.7 : 0} />
        <ellipse cx="348" cy="96" rx="8" ry="7" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Bottom line */}
        <path d="M46 116L358 116" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Door handle */}
        <line x1="196" y1="74" x2="218" y2="74" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity={pct > 0.3 ? 0.5 : 0} />

        {/* Side mirror */}
        <path d="M117 57L107 50 107 60Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Front wheel */}
        <circle cx="112" cy="122" r="28" fill="#222" opacity={tireOpacity} />
        <circle cx="112" cy="122" r="28" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="112" cy="122" r="16" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="112" cy="122" r="16" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="112" cy="122" r="4" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="297" cy="122" r="28" fill="#222" opacity={tireOpacity} />
        <circle cx="297" cy="122" r="28" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="297" cy="122" r="16" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="297" cy="122" r="16" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="297" cy="122" r="4" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="200" cy="157" rx="150" ry="7" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
