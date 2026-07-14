'use client';

import { motion } from 'framer-motion';
import { Project } from './ProjectModal';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  featured?: boolean;
}

export default function ProjectCard({ project, onClick, featured }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-48 bg-gray-200 relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image placeholder
          </div>
        )}
        {featured && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
            You'll want to check this one out 👀
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>

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

        <div className="flex items-center text-sm font-medium pt-2">
          View <span className="ml-2">→</span>
        </div>
      </div>
    </motion.div>
  );
}
