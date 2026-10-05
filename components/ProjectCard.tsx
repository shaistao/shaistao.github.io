'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({ project, onClick, featured }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const placeholder = 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1400&q=80';

  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer flex flex-col"
    >
      <div className="relative mb-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <motion.h3
          layoutId={`title-${project.title}`}
          className="text-xl font-bold absolute inset-0 pointer-events-none"
        >
          {project.title}
        </motion.h3>
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col"
        style={{ height: 380 }}
      >
        <motion.div
          layoutId={`image-${project.title}`}
          animate={{ height: hovered ? 310 : 380 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full overflow-hidden rounded-2xl bg-gray-200 flex-shrink-0"
        >
          <motion.img
            src={project.image || placeholder}
            alt={project.title}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
              You'll want to check out this one 👀
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {hovered && project.description && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gray-600 text-sm leading-relaxed mt-4 overflow-hidden"
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.div
          layoutId={`tags-${project.title}`}
          className="flex flex-wrap gap-2 absolute inset-0 pointer-events-none"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
