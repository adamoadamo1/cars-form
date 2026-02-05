'use client';

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { value: string; label: string }>;
  className?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  className = '',
}: SelectProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold text-[#a09484] uppercase tracking-[1.2px] mb-1.5 font-sans">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-[13px] px-[14px] bg-white border-2 border-[#e4ddd2] rounded-[14px] text-[15px] font-sans outline-none cursor-pointer appearance-none box-border transition-interaction hover:border-[#c0a88a] focus:border-[#c0a88a]"
        style={{
          color: value ? '#1a1612' : '#bbb',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23a09484' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
      >
        <option value="">Select...</option>
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          return (
            <option key={val} value={val}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
