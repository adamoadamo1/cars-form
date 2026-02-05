'use client';

import { CarSilhouetteProps } from './Sedan';

export function Convertible({ fillColor, fillPercent, className = '' }: CarSilhouetteProps) {
  const pct = fillPercent;
  const strokeColor = pct < 0.15 ? '#c0b5a5' : '#3a342a';
  const fillOpacity = Math.min(pct * 1.3, 1);
  const tireOpacity = pct > 0.15 ? Math.min((pct - 0.1) * 1.8, 1) : 0;
  const dashArray = pct < 0.1 ? '8 5' : pct < 0.25 ? '14 3' : 'none';
  const glowFilter = pct > 0.4 ? `drop-shadow(0 6px 20px ${fillColor}44)` : 'none';
  const seatOpacity = pct > 0.3 ? Math.min((pct - 0.3) * 2, 0.6) : 0;

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

        {/* Low sports car body */}
        <path
          d="M45 108C45 102 50 62 100 55L180 50C200 48 215 48 235 50L320 58C355 64 362 80 365 108Z"
          fill={fillColor}
          opacity={fillOpacity}
          className="transition-car"
        />

        {/* Windshield frame - low angle */}
        <path
          d="M130 55L125 40L160 35L180 50Z"
          fill={fillColor}
          opacity={fillOpacity * 0.7}
          className="transition-car"
        />

        {/* Windshield glass */}
        <path
          d="M132 53L127 42L158 37L175 50Z"
          fill="#8ec5d6"
          opacity={pct > 0.4 ? 0.5 : 0}
          className="transition-car"
        />

        {/* Body outline */}
        <path
          d="M45 108C45 102 50 62 100 55L180 50C200 48 215 48 235 50L320 58C355 64 362 80 365 108"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          className="transition-car"
        />

        {/* Windshield frame outline */}
        <path
          d="M130 55L125 40L160 35"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />

        {/* Seats - visible since convertible top is down */}
        <ellipse cx="185" cy="58" rx="18" ry="10" fill="#4a4440" opacity={seatOpacity} />
        <ellipse cx="240" cy="60" rx="16" ry="9" fill="#4a4440" opacity={seatOpacity} />

        {/* Headrests */}
        <ellipse cx="185" cy="48" rx="8" ry="6" fill="#3a3632" opacity={seatOpacity} />
        <ellipse cx="240" cy="50" rx="7" ry="5" fill="#3a3632" opacity={seatOpacity} />

        {/* Rear trunk line - low sporty angle */}
        <path
          d="M290 55L330 60C345 65 355 78 360 100"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          opacity={0.7}
        />

        {/* Headlight - aggressive sports car style */}
        <path
          d="M52 92L68 88L70 100L54 102Z"
          fill={pct > 0.35 ? '#f5e8a0' : 'none'}
          opacity={pct > 0.35 ? 0.8 : 0}
        />
        <path
          d="M52 92L68 88L70 100L54 102Z"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeDasharray={dashArray}
        />

        {/* Taillight */}
        <ellipse cx="355" cy="92" rx="7" ry="8" fill={pct > 0.35 ? '#e05050' : 'none'} opacity={pct > 0.35 ? 0.7 : 0} />
        <ellipse cx="355" cy="92" rx="7" ry="8" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashArray} />

        {/* Bottom line */}
        <path d="M40 112L368 112" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={dashArray} />

        {/* Door line */}
        <line x1="200" y1="52" x2="195" y2="105" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} opacity={pct > 0.25 ? 0.4 : 0} />

        {/* Side mirror */}
        <path d="M120 56L112 50 112 58Z" fill={fillColor} opacity={fillOpacity * 0.6} stroke={strokeColor} strokeWidth="1.5" />

        {/* Side vent/scoop */}
        <path
          d="M270 70L285 72L282 85L268 83Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray={dashArray}
          opacity={pct > 0.4 ? 0.5 : 0}
        />

        {/* Front wheel - low profile sports wheels */}
        <circle cx="108" cy="118" r="26" fill="#222" opacity={tireOpacity} />
        <circle cx="108" cy="118" r="26" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="118" r="15" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="108" cy="118" r="15" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="108" cy="118" r="4" fill="#444" opacity={tireOpacity} />

        {/* Rear wheel */}
        <circle cx="302" cy="118" r="26" fill="#222" opacity={tireOpacity} />
        <circle cx="302" cy="118" r="26" stroke={strokeColor} strokeWidth="2.5" strokeDasharray={dashArray} />
        <circle cx="302" cy="118" r="15" fill="#666" opacity={tireOpacity * 0.7} />
        <circle cx="302" cy="118" r="15" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dashArray} />
        <circle cx="302" cy="118" r="4" fill="#444" opacity={tireOpacity} />

        {/* Ground shadow */}
        <ellipse cx="200" cy="152" rx="155" ry="6" fill="#1a1612" opacity={pct * 0.06} />
      </svg>
    </div>
  );
}
