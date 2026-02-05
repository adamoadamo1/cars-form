'use client';

interface ColorDotProps {
  color: { name: string; hex: string };
  selected: boolean;
  onClick: () => void;
}

export function ColorDot({ color, selected, onClick }: ColorDotProps) {
  return (
    <button
      onClick={onClick}
      title={color.name}
      className="w-11 h-11 rounded-[14px] cursor-pointer transition-interaction"
      style={{
        background: color.hex,
        border: selected ? '3px solid #1a1612' : '3px solid transparent',
        outline: selected ? '2px solid #fff' : 'none',
        transform: selected ? 'scale(1.15)' : 'scale(1)',
        boxShadow: color.name === 'White'
          ? 'inset 0 0 0 1px #ddd'
          : '0 2px 6px rgba(0,0,0,0.08)',
      }}
    />
  );
}
