'use client';

interface SubTextProps {
  children: React.ReactNode;
}

export function SubText({ children }: SubTextProps) {
  return (
    <p className="text-[15px] text-[#9a8e7e] leading-[1.5] mb-6 font-sans">
      {children}
    </p>
  );
}
