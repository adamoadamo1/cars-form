'use client';

interface HeaderProps {
  children: React.ReactNode;
  color?: string;
}

export function Header({ children, color = '#1a1612' }: HeaderProps) {
  return (
    <h2
      className="font-serif text-[clamp(24px,5vw,34px)] font-black leading-[1.2] mb-2"
      style={{ color }}
    >
      {children}
    </h2>
  );
}
