'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  details?: string;
  image?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl max-w-3xl w-[90%] max-h-[85vh] z-50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-8 pt-8 pb-6">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-700 hover:text-white hover:bg-gray-900 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all text-2xl font-normal"
                aria-label="Close modal"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold pr-8">{project.title}</h2>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-8 pb-8">
              <div>

              {project.details && (
                <div className="pt-4">
                  {(() => {
                    const lines = project.details.split('\n');
                    const elements: JSX.Element[] = [];
                    let currentList: Array<string | { text: string; children?: { text: string }[] }> = [];
                    let currentListType: 'bullet' | 'number' | null = null;
                    let headerCount = 0;

                    const renderListItem = (item: { text: string; children?: { text: string }[] }, i: number) => {
                      const parts = item.text.split(/(\*\*.*?\*\*)/g);
                      return (
                        <li key={i} className="text-gray-700 leading-relaxed list-disc pl-2">
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-gray-900">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                          {item.children && item.children.length > 0 && (
                            <ul className="space-y-2 ml-6 mt-2">
                              {item.children.map((child, ci) => {
                                const childParts = child.text.split(/(\*\*.*?\*\*)/g);
                                return (
                                  <li key={ci} className="text-gray-700 leading-relaxed list-disc pl-2">
                                    {childParts.map((part, cj) => {
                                      if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={cj} className="text-gray-900">{part.slice(2, -2)}</strong>;
                                      }
                                      return part;
                                    })}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    };

                    const flushList = () => {
                      if (currentList.length > 0) {
                        const ListTag = currentListType === 'number' ? 'ol' : 'ul';
                        // Process list to handle nesting
                        const processedList: { text: string; children?: { text: string }[] }[] = [];
                        currentList.forEach((item) => {
                          if (typeof item === 'object' && 'text' in item) {
                            processedList.push(item);
                          } else {
                            processedList.push({ text: item as string });
                          }
                        });

                        elements.push(
                          <ListTag key={`list-${elements.length}`} className="space-y-3 ml-6 mb-6">
                            {processedList.map((item, i) => renderListItem(item, i))}
                          </ListTag>
                        );
                        currentList = [];
                        currentListType = null;
                      }
                    };

                    lines.forEach((line, index) => {
                      // Check if line is an image markdown: ![alt](image.png)
                      const imageMatch = line.match(/^!\[.*?\]\((.*?)\)$/);
                      if (imageMatch) {
                        flushList();
                        const imagePath = imageMatch[1].toLowerCase();
                        const isChallengeImage = imagePath.includes('challenge');
                        const isApproachImage = imagePath.includes('approach');
                        const imageWidth = isChallengeImage ? 'w-1/3' : isApproachImage ? 'w-1/2' : 'w-3/4';
                        elements.push(
                          <div key={index} className={`${imageWidth} mx-auto rounded-xl overflow-hidden mb-8`}>
                            <img
                              src={imageMatch[1]}
                              alt="Case study visual"
                              className="w-full h-auto"
                            />
                          </div>
                        );
                        return;
                      }

                      // Check if line is a heading: ## Heading
                      if (line.startsWith('## ')) {
                        flushList();
                        const currentZ = 10 + headerCount;
                        headerCount++;
                        elements.push(
                          <h3 key={index} className="text-2xl font-bold mb-6 text-gray-900 sticky top-[-1px] bg-white py-4 -mx-8 px-8 border-b border-gray-200" style={{ zIndex: currentZ }}>
                            {line.replace('## ', '')}
                          </h3>
                        );
                        return;
                      }

                      // Check if line is a bullet point
                      const bulletMatch = line.match(/^(\s*)-\s+(.+)/);
                      if (bulletMatch) {
                        const indent = bulletMatch[1].length;
                        const text = bulletMatch[2];

                        if (currentListType !== 'bullet') {
                          flushList();
                          currentListType = 'bullet';
                        }

                        // If indented (nested), add as child of last item
                        if (indent > 0 && currentList.length > 0) {
                          const lastItem = currentList[currentList.length - 1];
                          if (typeof lastItem === 'object' && 'text' in lastItem) {
                            if (!lastItem.children) {
                              lastItem.children = [];
                            }
                            lastItem.children.push({ text });
                          } else {
                            // Convert string to object and add child
                            const newItem = { text: lastItem as string, children: [{ text }] };
                            currentList[currentList.length - 1] = newItem;
                          }
                        } else {
                          // Top-level bullet
                          currentList.push({ text });
                        }
                        return;
                      }

                      // Check if line is a numbered list
                      const numberMatch = line.match(/^(\s*)\d+\.\s+(.+)/);
                      if (numberMatch) {
                        const text = numberMatch[2];

                        if (currentListType !== 'number') {
                          flushList();
                          currentListType = 'number';
                        }
                        currentList.push({ text });
                        return;
                      }

                      // Regular paragraph
                      if (line.trim()) {
                        flushList();
                        // Parse bold text: **text** -> <strong>text</strong>
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        elements.push(
                          <p key={index} className="text-gray-700 leading-relaxed text-base mb-6">
                            {parts.map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i} className="text-gray-900 font-semibold">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      }
                    });

                    flushList(); // Flush any remaining list items
                    return elements;
                  })()}
                </div>
              )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
