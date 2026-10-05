'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  '/playground/factor-programs/1-ftu.png',
  '/playground/factor-programs/2-delivery-coming-up.png',
  '/playground/factor-programs/3-delivered.png',
  '/playground/factor-programs/4-skipped.png',
  '/playground/factor-programs/5-deactivated.png',
];

const CREAM = '#F1EDE4';

const SLIDE_WIDTH = 220; // px, uniform for every slide
const STEP = 260;        // px between slide centers (leaves a 40px gap)
const TOP_INSET = 48;    // px from top of frame

export default function FactorProgramsHero() {
  const [index, setIndex] = useState(0);
  const advance = () => setIndex((i) => (i + 1) % IMAGES.length);

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: CREAM }}
    >
      <div
        className="w-full rounded-2xl overflow-hidden relative cursor-pointer select-none"
        style={{
          maxWidth: 992,
          aspectRatio: '16 / 9',
          maxHeight: 600,
          backgroundColor: CREAM,
        }}
        onClick={advance}
      >
        {IMAGES.map((src, i) => {
          const offset = i - index;
          const abs = Math.abs(offset);
          const blur = abs === 0 ? 0 : abs === 1 ? 4 : abs === 2 ? 10 : 16;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : abs === 2 ? 0.35 : 0;
          return (
            <motion.img
              key={src}
              src={src}
              alt=""
              draggable={false}
              initial={false}
              animate={{
                x: `calc(-50% + ${offset * STEP}px)`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: 10 - abs,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.9 }}
              className="absolute pointer-events-none h-auto"
              style={{
                top: TOP_INSET,
                left: '50%',
                width: SLIDE_WIDTH,
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
