'use client';

import { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 8;

export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [visible, setVisible] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<{ x: number; y: number }[]>([]);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    positions.current = Array.from({ length: TRAIL_LENGTH }, () => ({ ...target.current }));

    const isInteractive = (el: Element | null) => {
      while (el && el !== document.body) {
        if (el instanceof HTMLElement) {
          if (el.dataset.noPulse === 'true') return false;
          const tag = el.tagName;
          if (tag === 'A' || tag === 'BUTTON') return true;
          if (el.getAttribute('role') === 'button') return true;
          if (el.classList.contains('cursor-pointer')) return true;
          if (el.onclick) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const updateHover = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      setPulsing(isInteractive(el));
    };

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      updateHover(e.clientX, e.clientY);
      setVisible(true);
    };
    const handleLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e as unknown as { toElement?: EventTarget }).toElement) {
        setVisible(false);
      }
    };
    const handleEnter = () => setVisible(true);
    const handleBlur = () => setVisible(false);
    const handleFocus = () => setVisible(true);
    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    let raf = 0;
    const tick = () => {
      const head = positions.current[0];
      head.x += (target.current.x - head.x) * 0.35;
      head.y += (target.current.y - head.y) * 0.35;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = positions.current[i - 1];
        const curr = positions.current[i];
        curr.x += (prev.x - curr.x) * 0.35;
        curr.y += (prev.y - curr.y) * 0.35;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${head.x}px, ${head.y}px, 0) translate(-50%, -50%)`;
      }
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = positions.current[i + 1];
        const prev = positions.current[i];
        const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
        const moveOpacity = Math.min(1, dist / 6);
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        el.style.opacity = String(Number(el.dataset.baseOpacity ?? 0) * moveOpacity);
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 120ms linear' }}
    >
      {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => {
        const size = 10 - i * 0.9;
        const opacity = 0.45 * (1 - i / (TRAIL_LENGTH - 1));
        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            data-base-opacity={opacity}
            className="fixed top-0 left-0 rounded-full bg-sky-800"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0,
              willChange: 'transform, opacity',
              transition: 'opacity 150ms linear',
            }}
          />
        );
      })}
      <div
        ref={dotRef}
        className="fixed top-0 left-0"
        style={{ width: '22px', height: '22px', willChange: 'transform' }}
      >
        <svg width="22" height="22" viewBox="0 0 16 16" style={{ display: 'block', overflow: 'visible' }}>
          <path d="M2 2 L13 7.5 L7.5 9 L6 14 Z" fill="none" stroke="#faf3e3" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M2 2 L13 7.5 L7.5 9 L6 14 Z" fill="#075985" />
        </svg>
        {pulsing && (
          <div
            className="absolute rounded-full cursor-pulse"
            style={{ width: '4px', height: '4px', top: '6px', left: '6px' }}
          />
        )}
      </div>
    </div>
  );
}
