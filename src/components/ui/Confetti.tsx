'use client';

import { useRef } from 'react';

interface ConfettiProps {
  active: boolean;
}

const CONFETTI_COLORS = ['#e07a5f', '#81b29a', '#f4a261', '#e9c46a', '#3d5a80', '#588157'];

export function Confetti({ active }: ConfettiProps) {
  const particlesRef = useRef(
    Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2 + Math.random() * 2,
      size: 5 + Math.random() * 9,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 80,
    }))
  );

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            // @ts-expect-error CSS custom property
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
