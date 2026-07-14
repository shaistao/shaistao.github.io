'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'welcome', label: 'Welcome', emoji: '👋' },
  { id: 'about', label: 'About me', emoji: '👤' },
  { id: 'work', label: 'My work', emoji: '💼' },
  { id: 'skills', label: 'Skills', emoji: '⚡' },
  { id: 'connect', label: 'Connect', emoji: '🤝' },
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        backgroundColor: '#f5fcf7',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="mb-auto">
        <h2 className="text-2xl font-black text-black leading-tight">
          Shaista (Shay)<br />Obaidullah
        </h2>
        <p className="text-sm text-gray-600 mt-2">Design Portfolio</p>
      </div>

      <ul className="space-y-6 flex-1 flex flex-col justify-center">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`text-left transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-green-900 font-semibold'
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
