'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, SectionBlock } from '@/lib/projects';

let currentlyPlaying: HTMLVideoElement | null = null;

interface Props {
  project: Project | null;
  onClose: () => void;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isExternal = /^https?:\/\//i.test(linkMatch[2]);
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-black font-bold underline hover:opacity-70 transition-opacity"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Placeholder({ aspect = '16/9', label, maxHeight = 300 }: { aspect?: string; label?: string; maxHeight?: number }) {
  return (
    <div
      className="w-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm"
      style={{ aspectRatio: aspect, maxHeight }}
    >
      {label ? `Placeholder — ${label}` : 'Placeholder'}
    </div>
  );
}

function isVideoSrc(src: string) {
  return /\.(mp4|mov|webm|m4v)($|\?)/i.test(src);
}

function ViewportVideo({ src, alt, scale, cropTop }: { src: string; alt?: string; scale?: number; cropTop?: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            if (currentlyPlaying && currentlyPlaying !== el) {
              currentlyPlaying.pause();
            }
            currentlyPlaying = el;
            el.play().catch(() => {});
          } else {
            if (currentlyPlaying === el) currentlyPlaying = null;
            el.pause();
          }
        });
      },
      { threshold: [0, 0.3, 0.6, 1] }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (currentlyPlaying === el) currentlyPlaying = null;
    };
  }, []);

  const videoEl = (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className="rounded-2xl"
      style={{ width: '100%', display: 'block', marginTop: cropTop ? `-${cropTop}px` : undefined }}
    />
  );

  if (scale && scale !== 1) {
    const useWidth = scale < 1;
    return (
      <div className={`w-full flex justify-center ${cropTop || !useWidth ? 'overflow-hidden rounded-2xl' : ''}`}>
        <div
          style={{
            width: useWidth ? `${scale * 100}%` : '100%',
            transform: !useWidth ? `scale(${scale})` : undefined,
            transformOrigin: 'center',
          }}
        >
          {videoEl}
        </div>
      </div>
    );
  }
  if (cropTop) {
    return <div className="w-full overflow-hidden rounded-2xl">{videoEl}</div>;
  }
  return videoEl;
}

function Media({
  src,
  alt,
  aspect = '16/9',
  maxHeight = 300,
  scale,
  cropTop,
}: {
  src: string;
  alt?: string;
  aspect?: string;
  maxHeight?: number;
  scale?: number;
  cropTop?: number;
}) {
  if (isVideoSrc(src)) {
    return <ViewportVideo src={src} alt={alt} scale={scale} cropTop={cropTop} />;
  }
  return (
    <img
      src={src}
      alt={alt || ''}
      className="w-full rounded-2xl object-cover"
      style={{ aspectRatio: aspect, maxHeight }}
    />
  );
}

function Block({ block }: { block: SectionBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-gray-700 leading-relaxed">{renderInline(block.text)}</p>;
    case 'bullets': {
      return (
        <div className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {renderInline(item)}
            </p>
          ))}
        </div>
      );
    }
    case 'group':
      return (
        <div className="flex flex-col gap-3">
          {block.heading && (
            <p className="text-gray-700 leading-relaxed">{renderInline(block.heading)}</p>
          )}
          {block.items.map((item, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {renderInline(item)}
            </p>
          ))}
        </div>
      );
    case 'image':
      return block.src ? (
        <Media
          src={block.src}
          alt={block.alt}
          aspect={block.aspect || '16/9'}
          maxHeight={block.maxHeight ?? 300}
          scale={block.scale}
          cropTop={block.cropTop}
        />
      ) : (
        <Placeholder aspect={block.aspect} label={block.alt} maxHeight={block.maxHeight} />
      );
  }
}

function Column({ blocks }: { blocks: SectionBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

export default function CaseStudyView({ project, onClose }: Props) {
  useEffect(() => {
    if (project) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#f8fbfe] overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 relative">
            {/* Sticky close, aligned in-line with title on scroll */}
            <div className="sticky top-16 md:top-24 z-10 h-0 w-full pointer-events-none">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
                onClick={onClose}
                aria-label="Close case study"
                className="group pointer-events-auto absolute top-0 left-full ml-4 md:ml-6 text-gray-700 hover:text-white hover:bg-gray-900 active:bg-gray-900 active:text-white bg-white border border-gray-200 rounded-full h-11 w-11 hover:w-auto active:w-auto hover:px-4 active:px-4 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span className="text-2xl leading-none font-normal">×</span>
                <span className="hidden group-hover:inline group-active:inline whitespace-nowrap text-sm font-medium">
                  Close case
                </span>
              </motion.button>
            </div>
            {/* Title */}
            <div className="mb-12 md:mb-16 pr-16">
              <motion.h1
                layoutId={`title-${project.title}`}
                className="text-2xl md:text-4xl font-bold max-w-4xl"
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Intro */}
            {project.intro && (
              <div className="flex flex-col md:flex-row md:gap-16 gap-6 mb-12">
                <div className="md:w-[400px] md:flex-shrink-0">
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="text-base md:text-lg font-bold text-gray-900 leading-snug"
                  >
                    {renderInline(project.intro.heading)}
                  </motion.h2>
                </div>
                {project.intro.body && (
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-gray-700 leading-relaxed"
                    >
                      {project.intro.body}
                    </motion.p>
                  </div>
                )}
              </div>
            )}

            {/* Hero */}
            {project.hero && (
              <motion.div layoutId={`image-${project.title}`} className="mb-[140px]">
                {project.hero.src ? (
                  project.hero.type === 'image' && !project.hero.aspect ? (
                    <img
                      src={project.hero.src}
                      alt={project.hero.alt || ''}
                      className="w-full h-auto rounded-2xl"
                    />
                  ) : (
                    <Media
                      src={project.hero.src}
                      alt={project.hero.alt}
                      aspect={project.hero.aspect || '16/9'}
                      maxHeight={600}
                    />
                  )
                ) : (
                  <div
                    className="w-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm"
                    style={{ aspectRatio: project.hero.aspect || '16/9', maxHeight: 600 }}
                  >
                    {project.hero.type === 'video' ? 'Placeholder — Big Video' : 'Placeholder — Hero image'}
                  </div>
                )}
              </motion.div>
            )}

            {/* Sections */}
            {project.sections && (
              <div className="flex flex-col gap-[140px]">
                {project.sections.map((section, i) => {
                  if (section.fullWidth) {
                    return (
                      <div key={i}>
                        <Column blocks={section.content} />
                      </div>
                    );
                  }
                  const hasLeftExtras = !!section.leftExtras?.length;
                  const alignContentToExtras = hasLeftExtras && section.contentAlign !== 'top';
                  return (
                    <div
                      key={i}
                      className="grid gap-6 md:gap-x-16 md:gap-y-6 md:grid-cols-[400px_1fr]"
                    >
                      {section.heading && (
                        <h2 className="text-base md:text-lg font-bold text-gray-900 leading-snug md:col-start-1 md:row-start-1">
                          {section.heading}
                        </h2>
                      )}
                      {hasLeftExtras && (
                        <div className="md:col-start-1 md:row-start-2">
                          <Column blocks={section.leftExtras!} />
                        </div>
                      )}
                      <div className={`md:col-start-2 ${alignContentToExtras ? 'md:row-start-2' : 'md:row-start-1'}`}>
                        <Column blocks={section.content} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
