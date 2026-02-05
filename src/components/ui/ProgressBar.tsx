'use client';

interface ProgressBarProps {
  step: number;
  total: number;
  color?: string;
}

export function ProgressBar({ step, total, color = '#1a1612' }: ProgressBarProps) {
  const percentage = (step / total) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-[#ede7dd] z-[100] md:rounded-t-[32px] overflow-hidden">
      <div
        className="h-full rounded-r-[4px] transition-all duration-500"
        style={{
          width: `${percentage}%`,
          background: color,
        }}
      />
    </div>
  );
}
