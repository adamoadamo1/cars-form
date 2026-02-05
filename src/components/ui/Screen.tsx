'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ScreenProps {
  active: boolean;
  children: React.ReactNode;
}

export function Screen({ active, children }: ScreenProps) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-start pt-7 px-6 pb-28 overflow-y-auto"
        >
          <div className="w-full max-w-[480px]">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
