'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'welcome', label: 'Welcome', emoji: '👋' },
  { id: 'work', label: 'My work', emoji: '💼' },
  { id: 'skills', label: 'Skills', emoji: '⚡' },
  { id: 'about', label: 'About me', emoji: '👤' },
  { id: 'connect', label: 'Connect', emoji: '🤝' },
];

export default function MobileNav({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const [showLabel, setShowLabel] = useState(false);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set(['welcome']));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (section.id !== activeSection) {
              setActiveSection(section.id);
              if (!visitedSections.has(section.id)) {
                setVisitedSections(prev => new Set(prev).add(section.id));
                setShowLabel(true);
                setTimeout(() => setShowLabel(false), 2000);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, visitedSections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <>
      {/* Mobile Hamburger Button - Sticky */}
      <motion.div
        className="lg:hidden fixed top-6 right-4 z-10"
        animate={{
          width: showLabel ? 'auto' : '48px',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 w-full"
          aria-label="Menu"
        >
          <div className="flex flex-col items-center justify-center gap-1.5 w-6">
            <span className={`w-6 h-0.5 bg-sky-800 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-sky-800 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-sky-800 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
          <AnimatePresence>
            {showLabel && currentSection && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-semibold text-sky-800 whitespace-nowrap overflow-hidden"
              >
                {currentSection.emoji} {currentSection.label}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl"
            style={{
              backgroundColor: '#dde8f5',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
            }}
          >
            <div className="p-8">
              <div className="mb-12">
                <h2 className="text-xl font-black text-sky-800 leading-tight">
                  Shaista (Shay)<br />Obaidullah
                </h2>
                <p className="text-sm text-gray-600 mt-2">Design Portfolio</p>
              </div>

              <ul className="space-y-6">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left text-lg transition-all duration-300 w-full ${
                        activeSection === section.id
                          ? 'text-sky-800 font-semibold'
                          : 'text-gray-500'
                      }`}
                    >
                      {activeSection === section.id && (
                        <span className="inline-block mr-3">{section.emoji}</span>
                      )}
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
