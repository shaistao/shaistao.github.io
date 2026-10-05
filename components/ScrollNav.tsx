'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'welcome', label: 'Welcome', emoji: '👋' },
  { id: 'work', label: 'My work', emoji: '💼' },
  { id: 'skills', label: 'Skills', emoji: '⚡' },
  { id: 'about', label: 'About me', emoji: '👤' },
  { id: 'connect', label: 'Connect', emoji: '🤝' },
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = 'welcome';
        let topRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        if (topRatio > 0) setActiveSection(topId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      if (document.documentElement.style.overflow === 'hidden') return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

      const elements = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => !!el);
      if (!elements.length) return;

      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;
      const tolerance = 4;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        let current = elements[0];
        for (const el of elements) {
          if (el.offsetTop <= scrollY + tolerance) current = el;
        }
        const currentBottom = current.offsetTop + current.offsetHeight;
        const viewportBottom = scrollY + viewportH;
        if (currentBottom > viewportBottom + tolerance) {
          const targetTop = currentBottom - viewportH;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        } else {
          const idx = elements.indexOf(current);
          const next = elements[idx + 1];
          if (next) window.scrollTo({ top: next.offsetTop, behavior: 'smooth' });
        }
      } else {
        e.preventDefault();
        let current = elements[0];
        for (const el of elements) {
          if (el.offsetTop <= scrollY + tolerance) current = el;
        }
        if (current.offsetTop < scrollY - tolerance) {
          window.scrollTo({ top: current.offsetTop, behavior: 'smooth' });
        } else {
          const idx = elements.indexOf(current);
          const prev = elements[idx - 1];
          if (prev) {
            const prevBottom = prev.offsetTop + prev.offsetHeight;
            const target = Math.max(prev.offsetTop, prevBottom - viewportH);
            window.scrollTo({ top: target, behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed left-0 top-0 bottom-0 z-50 hidden lg:flex flex-col backdrop-blur-md pl-8 pr-6 py-12 shadow-lg"
      style={{
        backgroundColor: '#dde8f5',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="mb-auto">
        <h2 className="text-2xl font-black text-sky-800 leading-tight">
          Shaista (Shay)<br />Obaidullah
        </h2>
        <p className="text-sm text-gray-600 mt-2">Design Portfolio</p>
      </div>

      <ul className="space-y-6 flex-1 flex flex-col justify-center">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`text-left cursor-pointer py-3 -my-3 pr-8 -mr-8 transition-colors duration-200 ${
                activeSection === section.id
                  ? 'text-black font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeSection === section.id && (
                <span className="inline-block mr-2">{section.emoji}</span>
              )}
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
