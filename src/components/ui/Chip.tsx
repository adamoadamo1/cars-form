'use client';

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
}

export function Chip({
  selected,
  onClick,
  children,
  className = '',
  style = {},
  accentColor,
}: ChipProps) {
  const selectedBg = accentColor || '#1a1612';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 py-[15px] px-[18px] w-full border-2 rounded-[16px] text-[15px] font-sans cursor-pointer transition-interaction text-left ${className}`}
      style={{
        background: selected ? selectedBg : '#fff',
        color: selected ? '#fff' : '#1a1612',
        borderColor: selected ? selectedBg : '#e4ddd2',
        fontWeight: selected ? 700 : 500,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
