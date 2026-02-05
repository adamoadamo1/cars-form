'use client';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-5 left-5 z-[90] bg-white/85 backdrop-blur-[10px] border border-[#e4ddd2] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-lg text-[#8a7e70] transition-interaction hover:bg-white hover:border-[#c0a88a]"
    >
      ←
    </button>
  );
}
