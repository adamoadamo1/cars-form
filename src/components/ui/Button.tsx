'use client';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
}

export function Button({
  onClick,
  children,
  disabled = false,
  color = '#3b7d8c',
  variant = 'primary',
  className = '',
}: ButtonProps) {
  if (variant === 'text') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-3 bg-transparent border-none text-[#c0b5a5] text-sm font-sans cursor-pointer underline underline-offset-[3px] transition-interaction hover:text-[#9a8e7e] ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`font-sans cursor-pointer transition-interaction disabled:opacity-35 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] ${className}`}
          style={{
            background: '#fff',
            border: `2px solid ${color}`,
            color: color,
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '0.3px',
            borderRadius: '16px',
            padding: '18px 40px',
            minWidth: '200px',
            maxWidth: '360px',
          }}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`font-sans cursor-pointer transition-interaction disabled:opacity-35 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] ${className}`}
        style={{
          background: color,
          boxShadow: `0 6px 24px ${color}40`,
          color: '#fff',
          fontSize: '17px',
          fontWeight: 700,
          letterSpacing: '0.3px',
          border: 'none',
          borderRadius: '16px',
          padding: '20px 40px',
          minWidth: '200px',
          maxWidth: '360px',
        }}
      >
        {children}
      </button>
    </div>
  );
}
