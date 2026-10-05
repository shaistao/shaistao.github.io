'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollNav from '@/components/ScrollNav';
import MobileNav from '@/components/MobileNav';
import ProjectCard from '@/components/ProjectCard';
import CaseStudyView from '@/components/CaseStudyView';
import SectionSpacer from '@/components/SectionSpacer';
import IdleEmojis from '@/components/IdleEmojis';
import CursorFollower from '@/components/CursorFollower';
import { projects, findProject, type Project } from '@/lib/projects';


const skills = [
  '🤖 AI Prototyping',
  '🚀 Design-to-Code Shipping',
  '🤔 User Research',
  '🧩 Design Operations',
  '🔒 Accessibility',
  '📱 Responsive Design',
  '⚡ Rapid Prototyping',
  '📄 Documentation',
  '🤝 Handoff',
  '💭 Strategic Thinking',
  '👥 Cross Functional Collaboration',
  '🧠 Growth Mindset',
  '🗣️ Stakeholder Management',
  '🧭 Information Architecture',
  '😊 Good energy',
];

export default function Home() {
  const [selectedProject, setSelectedProjectState] = useState<Project | null>(null);
  const [hoverImage, setHoverImage] = useState<'peace' | 'laugh' | null>(null);

  const openProject = (project: Project) => {
    setSelectedProjectState(project);
    if (typeof window !== 'undefined') {
      window.history.pushState({ slug: project.slug }, '', `/work/${project.slug}`);
    }
  };

  const closeProject = () => {
    setSelectedProjectState(null);
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/work/')) {
      window.history.pushState({}, '', '/#work');
    }
  };


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const match = window.location.pathname.match(/^\/work\/([^/]+)/);
    if (match) {
      const project = findProject(match[1]);
      if (project) setSelectedProjectState(project);
    }
    const handlePop = () => {
      const m = window.location.pathname.match(/^\/work\/([^/]+)/);
      if (m) {
        const p = findProject(m[1]);
        setSelectedProjectState(p || null);
      } else {
        setSelectedProjectState(null);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  return (
    <>
      <CursorFollower />
      <ScrollNav />
      <MobileNav />
      <IdleEmojis />
      <CaseStudyView project={selectedProject} onClose={closeProject} />
      <SectionSpacer />

      <main className="lg:pl-64 relative">
        {/* Welcome Section */}
        <section id="welcome" className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-20 pt-8 md:pt-0 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl w-full"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-[45%] md:max-w-[476px] flex-shrink-0 relative">
                <div className="relative w-full h-[400px] md:h-auto md:aspect-[476/640] bg-gray-200 overflow-hidden rounded-2xl border-4 md:border-8 border-sky-800">
                  <img src="/welcome.png" alt="Shaista Obaidullah" className={`absolute inset-0 w-full h-full object-cover object-center md:object-bottom transition-opacity duration-300 ${hoverImage === null ? 'opacity-100' : 'opacity-0'}`} />
                  <img src="/welcome-peace.jpg" alt="Shaista peace" aria-hidden="true" className={`absolute inset-0 w-full h-full object-cover object-center md:object-bottom transition-opacity duration-300 ${hoverImage === 'peace' ? 'opacity-100' : 'opacity-0'}`} />
                  <img src="/welcome-laugh.jpg" alt="Shaista laughing" aria-hidden="true" className={`absolute inset-0 w-full h-full object-cover object-center md:object-bottom transition-opacity duration-300 ${hoverImage === 'laugh' ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <button
                  type="button"
                  aria-label="Peace"
                  onMouseEnter={() => setHoverImage('peace')}
                  onMouseLeave={() => setHoverImage(null)}
                  onFocus={() => setHoverImage('peace')}
                  onBlur={() => setHoverImage(null)}
                  onTouchStart={() => setHoverImage('peace')}
                  onTouchEnd={() => setHoverImage(null)}
                  data-no-pulse="true"
                  className="absolute -bottom-4 left-6 hidden md:flex w-12 h-12 rounded-full bg-white items-center justify-center text-3xl leading-none shadow-md -rotate-12 hover:rotate-0 hover:scale-110 transition-transform"
                >
                  ✌️
                </button>
                <button
                  type="button"
                  aria-label="Laugh"
                  onMouseEnter={() => setHoverImage('laugh')}
                  onMouseLeave={() => setHoverImage(null)}
                  onFocus={() => setHoverImage('laugh')}
                  onBlur={() => setHoverImage(null)}
                  onTouchStart={() => setHoverImage('laugh')}
                  onTouchEnd={() => setHoverImage(null)}
                  data-no-pulse="true"
                  className="absolute -bottom-4 right-6 hidden md:flex w-12 h-12 rounded-full bg-white items-center justify-center text-3xl leading-none shadow-md rotate-12 hover:rotate-0 hover:scale-110 transition-transform"
                >
                  😆
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center md:h-[640px] relative">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-black text-sky-800 mb-8 md:mb-12" style={{ fontWeight: 900, WebkitTextStroke: '0.5px #075985' }}>
                    Shaista (Shay) Obaidullah
                  </h1>
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Into good design, good people, and good energy.
                  </p>
                  <hr className="border-sky-800 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Creating digital experiences that feel effortless and human.
                  </p>
                  <hr className="border-sky-800 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Driven by collaboration, challenge, and the pursuit of thoughtful innovation.
                  </p>
                  <hr className="border-sky-800 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <button
                    onClick={() => {
                      const element = document.getElementById('work');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-black hover:opacity-70 transition-opacity font-bold cursor-pointer"
                  >
                    <span className="underline">Jump to my work</span> ↓
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Work Section */}
        <section id="work" className="min-h-screen flex items-start justify-center px-4 md:px-8 lg:px-20 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl w-full"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Check out my work.</h2>
            <p className="text-gray-600 mb-8 md:mb-12">Here's a few of my projects.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {projects.filter((p) => !p.hidden).map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  project={project}
                  onClick={() => openProject(project)}
                  featured={index === 0}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-20 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl w-full space-y-8 md:space-y-16"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Some skills I regularly use.</h2>
              <div
                className="md:hidden -mx-4 overflow-x-auto skill-marquee-group no-scrollbar"
                onMouseLeave={(e) => e.currentTarget.scrollTo({ left: 0, behavior: 'smooth' })}
                onTouchEnd={(e) => e.currentTarget.scrollTo({ left: 0, behavior: 'smooth' })}
              >
                <div className="flex flex-col gap-3 min-w-max">
                  {[0, 1, 2].map((row) => {
                    const rowSkills = skills.filter((_, i) => i % 3 === row);
                    const durations = ['32s', '38s', '28s'];
                    const directions = [false, true, false];
                    return (
                      <div
                        key={row}
                        className="flex gap-3 pr-3 skill-marquee"
                        style={{
                          animationDuration: durations[row],
                          animationDirection: directions[row] ? 'reverse' : 'normal',
                        }}
                      >
                        {[...rowSkills, ...rowSkills, ...rowSkills].map((skill, i) => (
                          <span key={`${skill}-${i}`} className="px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium border border-sky-700 whitespace-nowrap">{skill}</span>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden md:flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium border border-sky-700 whitespace-nowrap">{skill}</span>
                ))}
              </div>
            </div>

            <hr className="border-gray-300" />

            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Where I learnt these skills.</h2>
              <div className="flex flex-col md:flex-row md:flex-wrap gap-10">
                  <div className="flex md:flex-col gap-4 md:gap-0 md:space-y-3 md:w-64">
                    <div className="w-16 h-16 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                      <img src="/image-3.png" alt="HelloFresh" className="h-full w-auto object-contain" />
                    </div>
                    <div className="flex flex-col justify-center md:block">
                      <h3 className="text-xl font-bold">HelloFresh</h3>
                      <p className="text-gray-600 text-sm">Learning from the great<br />designers who surround me</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-4 md:gap-0 md:space-y-3 md:w-64">
                    <div className="h-16 md:h-12 flex items-center flex-shrink-0">
                      <img src="/image-1.png" alt="Mohawk College" className="h-full w-auto object-contain" />
                    </div>
                    <div className="flex flex-col justify-center md:block">
                      <h3 className="text-xl font-bold">Mohawk College</h3>
                      <p className="text-gray-600 text-sm">Graphic Design<br />UX/UI Specialization</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-4 md:gap-0 md:space-y-3 md:w-64">
                    <div className="h-16 md:h-12 flex items-center flex-shrink-0">
                      <img src="/image-2.png" alt="Memorisely" className="h-full w-auto object-contain" />
                    </div>
                    <div className="flex flex-col justify-center md:block">
                      <h3 className="text-xl font-bold">Memorisely</h3>
                      <p className="text-gray-600 text-sm">Design Systems<br />Bootcamp</p>
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-20 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold mb-4"
            >
              My 5+ years in the industry have flown by with plenty of successes and learnings.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 mb-8 md:mb-12"
            >
              Here's a little about how I work.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl h-full"
              >
                <div className="relative w-full h-40 rounded-xl bg-pink-50/50 flex items-center justify-center overflow-hidden">
                  <span className="absolute w-24 h-24 rounded-full bg-pink-200/40 orb-pulse" aria-hidden="true"></span>
                  <span className="relative text-6xl heart-beat" aria-hidden="true">💗</span>
                </div>
                <p className="text-gray-700">
                  Passionate about creating <strong>human-centered experiences</strong>. I focus on designing interfaces and systems that <strong>feel intuitive and work seamlessly</strong>.
                </p>
                <button
                  onClick={() => {
                    const target = projects.find((p) => p.title === 'Factor — Program\'s Dashboard');
                    const workEl = document.getElementById('work');
                    workEl?.scrollIntoView({ behavior: 'smooth' });
                    if (target) {
                      setTimeout(() => openProject(target), 700);
                    }
                  }}
                  className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mt-auto"
                >
                  See an example <span>→</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl h-full"
              >
                <div className="relative w-full h-40 rounded-xl bg-sky-50 flex items-center justify-center overflow-hidden">
                  <span className="absolute w-24 h-24 rounded-full bg-sky-200/50 orb-pulse" aria-hidden="true"></span>
                  <span className="relative text-6xl rocket-shiver" aria-hidden="true">🚀</span>
                </div>
                <p className="text-gray-700">
                  Currently at HelloFresh, I've been <strong>focused on start-up-like ventures</strong> within the company. <strong>Thinking far ahead</strong> about what a product could become, and <strong>leading design in that direction</strong> step by step.
                </p>
                <button
                  onClick={() => {
                    const target = projects.find((p) => p.title === 'HelloChef — Customer Experience');
                    const workEl = document.getElementById('work');
                    workEl?.scrollIntoView({ behavior: 'smooth' });
                    if (target) {
                      setTimeout(() => openProject(target), 700);
                    }
                  }}
                  className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mt-auto"
                >
                  See an example <span>→</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl h-full"
              >
                <div className="relative w-full h-40 rounded-xl bg-amber-50 flex items-center justify-center overflow-hidden">
                  <span className="absolute w-24 h-24 rounded-full bg-amber-200/50 orb-pulse" aria-hidden="true"></span>
                  <span className="relative text-6xl bolt-bounce" aria-hidden="true">⚡</span>
                </div>
                <p className="text-gray-700">
                  I <strong>move quickly and deliberately</strong>, <strong>pairing AI with craft</strong> to turn requirements into <strong>testable, well-reasoned designs</strong>. I balance <strong>multiple projects</strong> while keeping teams <strong>aligned and collaboration flowing</strong>.
                </p>
                <button
                  onClick={() => {
                    const element = document.getElementById('work');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mt-auto"
                >
                  See all work <span>→</span>
                </button>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600 mt-12 text-center"
            >
              Outside of work, I teach yoga 🧘🏽‍♀️, make jewellery 🪡, and backpack Canada 🥾.
            </motion.p>
          </motion.div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-20 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl w-full space-y-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold">Let's chat! I'd love to hear from you.</h2>

            <div className="flex flex-col md:flex-row gap-10">
              <div>
                <h3 className="font-bold mb-2">Email</h3>
                <a
                  href="mailto:obaidullahshaista@gmail.com"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  obaidullahshaista@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-bold mb-2">Social</h3>
                <a
                  href="https://www.linkedin.com/in/shayobai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black transition-colors inline-flex items-center gap-2"
                >
                  <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" /> LinkedIn
                </a>
              </div>

            </div>

          </motion.div>
        </section>
      </main>
    </>
  );
}
