'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sedan, SUV, Truck, Convertible, Van, Hatchback } from './silhouettes';
import type { BodyType } from '@/lib/constants';

interface CarVisualProps {
  bodyType: BodyType | '';
  fillColor: string;
  fillPercent: number;
  nickname?: string;
  year?: string;
  make?: string;
  model?: string;
}

const silhouettes = {
  sedan: Sedan,
  suv: SUV,
  truck: Truck,
  convertible: Convertible,
  van: Van,
  hatchback: Hatchback,
};

export function CarVisual({
  bodyType,
  fillColor,
  fillPercent,
  nickname,
  year,
  make,
  model,
}: CarVisualProps) {
  // Default to sedan if no body type selected
  const CarComponent = bodyType ? silhouettes[bodyType] : Sedan;
  const actualColor = fillColor || '#d4cdc2';

  const showLabel = year || make || model || nickname;

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={bodyType || 'default'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <CarComponent
            fillColor={actualColor}
            fillPercent={fillPercent}
          />
        </motion.div>
      </AnimatePresence>

      {showLabel && (
        <p className="text-center font-serif text-[15px] font-bold text-[#1a1612] opacity-60 mt-4 mb-2">
          {nickname ? `"${nickname}"` : ''}
          {nickname && (year || make) ? ' — ' : ''}
          {year} {make} {model}
        </p>
      )}
    </div>
  );
}
