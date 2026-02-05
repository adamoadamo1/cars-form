'use client';

import { useState } from 'react';

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  big?: boolean;
  className?: string;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  big = false,
  className = '',
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold text-[#a09484] uppercase tracking-[1.2px] mb-1.5 font-sans">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white border-2 rounded-[14px] outline-none transition-interaction box-border ${
          big
            ? 'py-[18px] px-4 text-xl font-serif font-bold'
            : 'py-[13px] px-[14px] text-[15px] font-sans'
        }`}
        style={{
          borderColor: focused ? '#c0a88a' : '#e4ddd2',
          color: '#1a1612',
        }}
      />
    </div>
  );
}
