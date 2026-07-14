'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = ['👋', '👤', '💼', '⚡', '🤝'];

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  rotation: number;
  delay: number;
}

export default function IdleEmojis() {
  const [isIdle, setIsIdle] = useState(false);
  const [fallingEmojis, setFallingEmojis] = useState<FallingEmoji[]>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setIsIdle(false);
      setFallingEmojis([]);
      clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 180000); // 3 minutes of inactivity
    };

    const handleActivity = () => {
      resetIdleTimer();
    };

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Initial timer
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  useEffect(() => {
    let spawnInterval: NodeJS.Timeout;

    if (isIdle) {
      spawnInterval = setInterval(() => {
        const newEmoji: FallingEmoji = {
          id: Date.now() + Math.random(),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * window.innerWidth,
          rotation: Math.random() * 360 - 180,
          delay: Math.random() * 0.5,
        };

        setFallingEmojis(prev => [...prev, newEmoji]);
        setEmojiCounter(prev => prev + 1);

        // Remove emoji after animation completes to prevent memory leak
        setTimeout(() => {
          setFallingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
        }, 4500);
      }, 150); // Spawn a new emoji every 150ms
    }

    return () => clearInterval(spawnInterval);
  }, [isIdle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {fallingEmojis.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              x: item.x,
              y: -200,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: item.rotation,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              ease: 'linear',
            }}
            className="absolute text-[80px]"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
