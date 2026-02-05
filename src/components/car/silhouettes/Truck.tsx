'use client';

import { CarSilhouetteProps } from './Sedan';

export function Truck({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
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
          x1="30" y1="115" x2="370" y2="115"
          stroke="#d4cdc2" strokeWidth="0.5"
          opacity={Math.max(0, 0.5 - pct)}
          strokeDasharray="4 8"
        />

        {/* Truck bed */}
        <path
          d="M170 45L170 118L362 118L362 55L180 50Z"
          fill={fillColor}
          opacity={fillOpacity * 0.9}
          className="transition-car"
        />

        {/* Cab body */}
        <path
          d="M45 118C45 110 50 58 85 48L160 42C170 41 175 42 175 45L175 118Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Cab roof */}
        <path
          d="M80 48C84 22 98 12 125 10L165 10C170 12 172 18 172 45Z"
          fill={fillColor}
          opacity={fillOpacity * 0.82}
          className="transition-car"
        />

        {/* Truck bed outline */}
        <path
          d="M170 45L170 118L362 118L362 55L180 50"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
        />

        {/* Bed inner line */}
        <line x1="175" y1="52" x2="175" y2="115" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} opacity={pct > 0.3 ? 0.6 : 0} />

        {/* Cab body outline */}
        <path
          d="M45 118C45 110 50 58 85 48L160 42C170 41 175 42 175 45L175 118"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Cab roof outline */}
        <path
          d="M80 48C84 22 98 12 125 10L165 10C170 12 172 18 172 45"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Window pillars */}
        <line x1="120" y1="45" x2="115" y2="14" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Windows */}
        <path d="M85 46L113 14 118 46Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />
        <path d="M125 46L120 14 162 12 168 46Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Headlight */}
        <rect x="48" y="88" width="14" height="14" rx="3" fill={pct > 0.35 ? '#f5e8a0' : 'none'} opacity={pct > 0.35 ? 0.8 : 0} />
        <rect x="48" y="88" width="14" height="14" rx="3" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Taillight */}
        <rect x="352" y="70" width="8" height="12" rx="2" fill={pct > 0.35 ? '#e05050' : 'none'} opacity={pct > 0.35 ? 0.7 : 0} />
        <rect x="352" y="70" width="8" height="12" rx="2" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Bottom line */}
        <path d="M40 122L368 122" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Door handle */}
        <line x1="100" y1="72" x2="125" y2="72" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity={pct > 0.3 ? 0.5 : 0} />

        {/* Side mirror */}
        <path d="M76 48L66 40 66 52Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Front wheel - large truck wheels */}
        <circle cx="100" cy="130" r="34" fill="#222" opacity={tireOpacity} />
        <circle cx="100" cy="130" r="34" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="100" cy="130" r="20" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="100" cy="130" r="20" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="100" cy="130" r="6" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="310" cy="130" r="34" fill="#222" opacity={tireOpacity} />
        <circle cx="310" cy="130" r="34" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="310" cy="130" r="20" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="310" cy="130" r="20" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="310" cy="130" r="6" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="200" cy="168" rx="160" ry="8" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
