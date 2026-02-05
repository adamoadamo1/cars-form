'use client';

import { CarSilhouetteProps } from './Sedan';

export function Van({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
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

        {/* Van body - tall and boxy */}
        <path
          d="M42 118C42 110 48 35 80 25L130 18C150 15 175 14 195 14L345 14C360 14 365 25 365 45L365 118Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Body outline */}
        <path
          d="M42 118C42 110 48 35 80 25L130 18C150 15 175 14 195 14L345 14C360 14 365 25 365 45L365 118"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Roof line */}
        <line x1="100" y1="14" x2="355" y2="14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Front windshield */}
        <path d="M85 28L128 18 148 18 148 50 88 50Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Side windows - row 1 */}
        <path d="M155 18L155 55L220 55L220 18Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Side windows - row 2 */}
        <path d="M230 18L230 55L295 55L295 18Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Side windows - row 3 (rear) */}
        <path d="M305 18L305 55L345 55L350 25C352 20 348 18 345 18Z" fill="#8ec5d6" opacity={windowOpacity} className="transition-car" />

        {/* Window dividers */}
        <line x1="150" y1="18" x2="150" y2="58" stroke={strokeColor} strokeWidth="2" strokeDasharray={dashArray} />
        <line x1="225" y1="18" x2="225" y2="58" stroke={strokeColor} strokeWidth="2" strokeDasharray={dashArray} />
        <line x1="300" y1="18" x2="300" y2="58" stroke={strokeColor} strokeWidth="2" strokeDasharray={dashArray} />

        {/* Windshield outline */}
        <path
          d="M85 28L128 18 148 18"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Belt line */}
        <line x1="85" y1="55" x2="355" y2="55" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} opacity={pct > 0.25 ? 0.5 : 0} />

        {/* Headlight */}
        <rect x="48" y="55" width="16" height="20" rx="3" fill={pct > 0.35 ? '#f5e8a0' : 'none'} opacity={pct > 0.35 ? 0.8 : 0} />
        <rect x="48" y="55" width="16" height="20" rx="3" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Taillight */}
        <rect x="355" y="40" width="8" height="25" rx="2" fill={pct > 0.35 ? '#e05050' : 'none'} opacity={pct > 0.35 ? 0.7 : 0} />
        <rect x="355" y="40" width="8" height="25" rx="2" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Bottom line */}
        <path d="M38 122L370 122" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Sliding door track */}
        <line x1="180" y1="60" x2="180" y2="115" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} opacity={pct > 0.3 ? 0.4 : 0} />

        {/* Door handle */}
        <line x1="190" y1="80" x2="210" y2="80" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" opacity={pct > 0.3 ? 0.5 : 0} />

        {/* Side mirror */}
        <path d="M82 32L72 26 72 38Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Front wheel */}
        <circle cx="100" cy="128" r="30" fill="#222" opacity={tireOpacity} />
        <circle cx="100" cy="128" r="30" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="100" cy="128" r="17" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="100" cy="128" r="17" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="100" cy="128" r="5" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="310" cy="128" r="30" fill="#222" opacity={tireOpacity} />
        <circle cx="310" cy="128" r="30" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="310" cy="128" r="17" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="310" cy="128" r="17" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="310" cy="128" r="5" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="200" cy="164" rx="160" ry="8" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
