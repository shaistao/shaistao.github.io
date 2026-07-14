'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollNav from '@/components/ScrollNav';
import MobileNav from '@/components/MobileNav';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal, { Project } from '@/components/ProjectModal';
import SectionSpacer from '@/components/SectionSpacer';
import IdleEmojis from '@/components/IdleEmojis';

const projects: Project[] = [
  {
    title: 'Factor Programs',
    description: 'Curated offerings under the Factor brand aimed at helping customers achieve specific goals.',
    tags: ['Product', 'UX', 'UI'],
    details: `## The Challenge

The primary objective was to pioneer a new digital vertical for Factor, **moving beyond standard meal delivery into a holistic weight management space.** The challenge lay in creating a specialized dashboard that could handle complex health data—like caloric targets and professional dietitian support—while remaining intuitive for a user base that had never seen this type of integrated offering from the brand before. Though this first focus was weight management, we knew other goals were to come and moved forward with Factor Programs where we would **scale to multiple programs.**

## My Role

As the **Lead Product Designer on the Customer Dashboard,** I was responsible for how the end-to-end UX architecture related to this central user hub. My focus was on **reducing the cognitive load of nutrition tracking and meal selection** while creating a dynamic interface that could intelligently guide users through this brand-new service model. In addition to the customer dashboard, I had a big impact on designs that were created for **Meal Tracking.**

## The Approach

To build this solution from the ground up, the approach focused on contextual adaptation. I treated the dashboard not as a static landing page, but as a **living "Command Center" that evolved based on three intersecting data points.**

The interface needed to prioritize immediate needs based on **logistical status, such as tracking** a box in transit or alerting the user to an upcoming selection deadline. The dashboard was designed to adapt its information hierarchy based on **user lifecycle**—whether the user was in their first week of onboarding or a seasoned participant in a specialized track like "Factor Form". The goal was to make the dashboard a space for reflection, surfacing **personal progression** through health milestones and nutritional data.

## The Solution

We developed a dynamic dashboard that served as the **primary touchpoint for the user's journey,** designed to be responsive to the specific state of a user's account. The interface pivoted based on the **user's status through state-aware guidance**—whether they were a "Factor Form" participant, a new user, or an existing customer.

The dashboard acted as a guide through next-step navigation, surfacing specific "calls to action" such as prompting users to rate their recent meals or alerting them if they had not yet selected their meals for the week. Beyond health data, the dashboard became the go-to space for logistics, providing critical status updates on box deliveries to ensure a seamless service experience. **Users knew at a glance what was most important for their current week.**

We designed "non-scale" progress markers—like transformation photos and "clothes fit" logs—to provide a comprehensive, multi-dimensional view of the user's success through a holistic health hub.

## The Impact

**Successfully defined the UX standards for Factor's first foray into structured weight management programs,** creating a new product vertical. By surfacing feedback surveys on the program, we achieved high-volume operational intelligence into user preferences on how they would follow this type of program.

## Key Takeaways

**The Power of Persistence:** This project followed a long road from initial concept research to end-to-end design. Despite being deprioritized multiple times, the strength of the vision I had part in allowed it to eventually find the right team and launch as an MVP.

**Design as a Blueprint:** Even though the project was deprioritized post-launch due to shifting business focuses, the framework remains a high-interest concept within the company. It stands as a blueprint for the future of integrated health services at Factor.`,
  },
  {
    title: 'Filtering Meals',
    description: 'Improving the meal selection experience by allowing users to filter and navigate using collections. Design geared towards how customers think of food.',
    tags: ['Product', 'UX', 'UI', 'Research', 'Strategy'],
    image: '/card display.png',
    details: `## The Challenge

Factor customers have specific dietary needs and preferences, but struggled to find meals that fit during meal selection. With only Collections available (Keto, Calorie Smart, Protein Plus, etc.), users resorted to clicking through meals one-by-one to find nutritional information—a tedious process. **Meal selection took significantly longer for Factor than other brands**, in part because Factor customers were selecting up to 36 meals per week compared to just 6 for HelloFresh users, making the lack of filtering tools even more painful. Research showed that **over one-third of loyal customers** experienced challenges during meal selection, and users consistently expressed a desire to filter by exclusions and things they don't eat.

![](/The challenge.png)

## My Role

As the lead designer, I owned the end-to-end UX and UI design for both the Collections revamp and the new Filtering feature. I collaborated closely with researchers, a PM, a copywriter, and engineers throughout the process—from concept testing through to final handoff.

## The Approach

Working from research insights that showed users wanted more control and granularity, I designed two complementary solutions that separated discovery from filtering:

1. **Revamped Collections** – Shifted to **discovery-based** categories to help users explore the menu
2. **Filtering Panel** – Focused on **dietary needs** with granular filtering across multiple dimensions

This strategic separation was key: Collections became about exploration and inspiration, while Filters handled the practical need of finding meals that fit specific dietary requirements. I made all design decisions around layout, categorization, and interaction patterns. A key decision was choosing a panel design over a dropdown—testing showed the panel made Sort & Filter features highly discoverable while giving users clear visibility into all available options. I organized filters into logical groups (Sort by, Diets, Restrictions, Spice level, Main Protein) to match how customers naturally think about food choices.

![](/Approach.png)

## The Solution

The final design gave customers two complementary ways to navigate meals:

- **Collections as discovery chips** at the top for exploring the menu (Featured, New, Top Rated, Stay Balanced, Fuel Your Fitness, etc.)
- **Sort & Filter panel** focused on dietary needs:
  - Sorting by macros (calories, carbs, protein - both directions)
  - Diet filters (Keto, Calorie Smart, Protein Plus, Carb Conscious, Flexitarian, Vegan & Veggie)
  - Restriction filters (Dairy-free, Pork-free)
  - Spice level preferences
  - Main protein type

By separating discovery (Collections) from dietary filtering (Sort & Filter), the design gave customers both inspiration and control—not forcing them to scroll through dozens of meals to find what fits their needs.

![](/Solution.png)

## The Impact

- **Collections:** +0.55% increase in Not ADV (not significant), **-2.3% reduction in cancellation** (significant)
- **Filters:** Positive results on web, successfully rolled out across platforms
- Gave customers the flexibility and control they needed to find meals faster, improving the overall meal selection experience

## Key Takeaways

Users had vastly different preferences for what they wanted to sort and filter by—some prioritized macros, others focused on restrictions or protein types. Since personalization wasn't an option at the time, I had to design a filtering system flexible enough to work for all possible combinations and needs. This meant carefully organizing filters into logical groups and ensuring users could apply multiple filters simultaneously to narrow down meals in whatever way made sense for their unique dietary goals.

Another surprising finding: users didn't mind if filtering resulted in only a few meal options—which had been a major concern when designing the feature. Customers preferred seeing a small set of highly relevant meals they actually wanted to eat over a larger selection filled with options they'd never choose. **Quality over quantity** resonated strongly with Factor's dietary-focused customer base.`,
  },
  {
    title: 'Preselection Personalization',
    description: 'Offering customers more control over their meal subscription preferences.',
    tags: ['Product', 'UX', 'UI', 'Information Architecture'],
    image: '/personalization-display.png',
    details: `## The Challenge

Factor added new meal restrictions (pork-free and spice-free options) to the signup funnel based on customer demand, but **active customers had no way to access or edit these preferences**. The existing Plan Settings page only showed dietary preference and meals per week—there was nowhere to manage restrictions. We needed to integrate this new personalization capability into the active customer experience while making it discoverable for users who would benefit from it.

![](/personalization-challenge.png)

## My Role

As the lead designer for the active customer experience, I owned the end-to-end design for integrating meal restrictions into settings. I designed the information architecture, UI for editing restrictions, and the awareness strategy to drive adoption among existing customers.

## The Approach

I designed a scalable solution that could grow beyond the initial pork and spicy restrictions:

1. **Nested page structure** – Kept the main Plan Settings page as a review/summary view, with an "Edit" button leading to a nested modal for making changes
2. **Awareness prompt** – Created a targeted notification for active users who had indicated pork-free preferences in the funnel, explaining the new feature and driving them to add restrictions
3. **Scalable design** – Built a flexible restrictions system that started with two options but could easily accommodate more

The key decision was separating review from edit. This kept the main settings page clean while giving users a dedicated space to manage their growing list of preferences.

![](/personalization-approach.png)

## The Solution

The final design included:

- **Plan Settings overview** showing dietary preference summary (e.g., "Chef's Choice, No pork")
- **Edit modal** with clear sections for Dietary Preference and Restrictions
- **Restrictions dropdown** with checkboxes for multiple selections (No pork, No spice, No shellfish, No fish, No mushrooms)
- **In-context prompt** with "New" badge to introduce the feature: "We noticed you prefer pork-free meals. Add meal restrictions to let us know what to avoid when preselecting your meals."

The design successfully scaled from 2 restrictions to 5+ while maintaining clarity and ease of use.

![](/personalization-solution.png)

## The Impact

The experiment showed positive results and the design changes were shipped to production. Active customers now have the same level of control as new signups, allowing them to fine-tune their meal preselections and reduce unwanted items in their boxes.

## Key Takeaways

Building for scale from day one was critical. Even though we started with just pork and spicy restrictions, designing a flexible system that could accommodate more options saved significant rework later. The nested page pattern (review on main page, edit in modal) proved to be an effective way to add complexity without overwhelming users.`,
  },
  {
    title: 'Design System',
    description: 'Creating and collaborating on a multi-brand design system to streamline workflows and maintain consistency.',
    tags: ['Design Systems', 'Collaboration'],
    details: 'Detailed case study content goes here...',
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ScrollNav />
      <MobileNav />
      <IdleEmojis />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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
              <div className="w-full md:w-[45%] md:max-w-[476px] h-[400px] md:h-auto md:aspect-[476/640] bg-gray-200 flex-shrink-0 overflow-hidden rounded-2xl border-4 md:border-8 border-green-900">
                <img src="/welcome.png" alt="Shaista Obaidullah" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center md:h-[640px] relative">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-8 md:mb-12" style={{ fontWeight: 900, WebkitTextStroke: '0.5px #14532d' }}>
                    Shaista (Shay) Obaidullah
                  </h1>
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Into good design, good people, and good energy.
                  </p>
                  <hr className="border-green-900 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Product designer blending craft and empathy to create digital experiences that feel effortless and human.
                  </p>
                  <hr className="border-green-900 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <p className="text-base text-black leading-relaxed mt-8 mb-4">
                    Driven by collaboration, challenge, and the pursuit of thoughtful innovation.
                  </p>
                  <hr className="border-green-900 border-t-[3px] relative -left-[40px] w-[calc(100%+40px)]" />
                  <button
                    onClick={() => {
                      const element = document.getElementById('connect');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-black hover:opacity-70 transition-opacity font-bold"
                  >
                    <span className="underline">Jump to connect with me</span> ↓
                  </button>
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
              className="text-2xl md:text-4xl font-bold mb-8 md:mb-12"
            >
              My 5 years in the industry have flown by with plenty of successes and learnings.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 p-4 bg-white border border-gray-200 rounded-2xl"
              >
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                <p className="text-gray-700">
                  Passionate about creating <strong>human-centered experiences</strong>. I focus on designing interfaces and systems that <strong>feel intuitive and work seamlessly</strong>.
                </p>
                <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  See an example <span>→</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 p-4 bg-white border border-gray-200 rounded-2xl"
              >
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                <p className="text-gray-700">
                  Currently at HelloFresh, I've been <strong>focused on start-up-like ventures</strong> within the company. <strong>Thinking far ahead</strong> about what a product could become, and <strong>leading design in that direction</strong> step by step.
                </p>
                <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  See an example <span>→</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 p-4 bg-white border border-gray-200 rounded-2xl"
              >
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                <p className="text-gray-700">
                  I <strong>move quickly and deliberately</strong>, turning requirements into designs that are <strong>testable</strong> and grounded in <strong>clear reasoning</strong>. Skilled at <strong>balancing multiple projects</strong> at once, I maintain quality while keeping teams <strong>aligned and collaboration flowing</strong>.
                </p>
                <button
                  onClick={() => {
                    const element = document.getElementById('work');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
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
              Outside of work, I teach yoga 🧘, make jewellery 💎, and backpack Canada 🎒.
            </motion.p>
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
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Enough talk, check out my work.</h2>
            <p className="text-gray-600 mb-8 md:mb-12">Showing you a few key items I've worked on.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onClick={() => setSelectedProject(project)}
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
              {/* Mobile: 4 rows with horizontal scroll */}
              <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex flex-col gap-3 min-w-max">
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤔 User Research</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧩 Design Operations</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🔒 Accessibility</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">📱 Responsive Design</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">⚡ Rapid Prototyping</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤖 AI Prototyping</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">📄 Documentation</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤝 Handoff</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">💭 Strategic Thinking</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">👥 Cross Functional Collaboration</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧠 Growth Mindset</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">😊 Good energy</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🗣️ Stakeholder Management</span>
                    <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧭 Information Architecture</span>
                  </div>
                </div>
              </div>

              {/* Desktop: wrap naturally */}
              <div className="hidden md:flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤔 User Research</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧩 Design Operations</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🔒 Accessibility</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">📱 Responsive Design</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">⚡ Rapid Prototyping</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤖 AI Prototyping</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">📄 Documentation</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🤝 Handoff</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">💭 Strategic Thinking</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">👥 Cross Functional Collaboration</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧠 Growth Mindset</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">😊 Good energy</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🗣️ Stakeholder Management</span>
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-medium border border-green-800 whitespace-nowrap">🧭 Information Architecture</span>
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

              <div>
                <h3 className="font-bold mb-2">Phone</h3>
                <a
                  href="tel:6473906979"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  (647) 390-6979
                </a>
              </div>
            </div>

            <p className="text-xl pt-8">Thanks for taking a look.</p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
