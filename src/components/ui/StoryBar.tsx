'use client';

import { REASONS } from '@/lib/constants';
import { PartnerConfig } from '@/components/partners/types';

interface StoryBarProps {
  data: {
    year: string;
    color: string;
    make: string;
    model: string;
    nickname: string;
    reason: string;
  };
  step: number;
  partner: PartnerConfig | null;
}

export function StoryBar({ data, step, partner }: StoryBarProps) {
  const { year, color, make, model, nickname, reason } = data;

  const parts: string[] = [];

  if (step >= 4) {
    const carDesc = [year, color, make, model].filter(Boolean).join(' ');
    parts.push(nickname ? `"${nickname}" — a ${carDesc || 'car'}` : `My ${carDesc || 'car'}`);
  }

  if (step >= 6 && reason) {
    const reasonObj = REASONS.find((r) => r.id === reason);
    if (reasonObj) {
      parts.push(`because ${reasonObj.text}`);
    }
  }

  if (step >= 10 && partner) {
    parts.push(partner.story);
  }

  if (parts.length === 0) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[80] bg-white/92 backdrop-blur-[16px] py-3 px-6 md:rounded-b-[32px]"
      style={{
        borderTop: `2px solid ${partner?.colorMid || '#ede7dd'}`,
      }}
    >
      <div className="max-w-[480px] mx-auto">
        <p
          className="font-sans text-[10px] font-bold uppercase tracking-[1.5px] m-0 mb-0.5"
          style={{ color: partner?.color || '#c0b5a5' }}
        >
          Your story
        </p>
        <p className="font-serif text-[13px] font-bold text-[#1a1612] leading-[1.4] m-0">
          {parts.join(' — ')}.
        </p>
      </div>
    </div>
  );
}
