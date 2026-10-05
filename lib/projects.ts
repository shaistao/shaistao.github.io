export type SectionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[]; ordered?: boolean }
  | { type: 'group'; heading?: string; items: string[] }
  | { type: 'image'; src?: string; alt?: string; aspect?: string; maxHeight?: number; scale?: number; cropTop?: number };

export interface Section {
  heading?: string;
  content: SectionBlock[];
  leftExtras?: SectionBlock[];
  contentAlign?: 'top' | 'extras';
  fullWidth?: boolean;
}

export interface HeroBlock {
  type: 'image' | 'video';
  src?: string;
  alt?: string;
  aspect?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  hidden?: boolean;
  featured?: boolean;
  intro?: { heading: string; body?: string };
  hero?: HeroBlock;
  sections?: Section[];
}

export const projects: Project[] = [
  {
    slug: 'hellochef-customer-experience',
    title: 'HelloChef — Customer Experience',
    description:
      'Creating a marketplace to purchase influencer made recipes as meal kits, fulfilled by HelloFresh.',
    tags: ['Product', 'UX/UI', 'Information Architecture', 'Research'],
    image: '/hc-customer-exp-thumb.png',
    intro: {
      heading:
        'Creating a marketplace to purchase influencer made recipes as meal kits, fulfilled by HelloFresh. Check it out at [eathellochef.ca](https://eathellochef.ca)',
    },
    hero: { type: 'video', src: '/hc-customer-exp-hero.mov' },
    sections: [
      {
        heading: 'We found 77% of consumers "save" social media recipes, but most are never cooked.',
        leftExtras: [{ type: 'image', src: '/hc-customer-exp-recipe-save.mov', alt: 'Recipe save loop', scale: 1.02 }],
        content: [
          {
            type: 'paragraph',
            text: 'The path from screen to stove is too complex. Consumers save endless recipes online, but the logistical friction (sourcing niche ingredients, meal planning fatigue, and lack of confidence in viral videos) creates a massive **Inspiration-Execution Gap**.',
          },
        ],
      },
      {
        heading: 'Closing the Inspiration-Execution Gap using HelloFresh.',
        leftExtras: [{ type: 'image', src: '/hc-customer-exp-social-example.mov', alt: 'Social example' }],
        content: [
          {
            type: 'paragraph',
            text: 'HelloChef bridges this gap by converting viral social content into home-cooked reality through low-friction fulfillment. By pairing creator-driven inspiration with HelloFresh’s global logistics network, we eliminate the ingredient waste and sourcing barriers that hold home cooks back.',
          },
        ],
      },
      {
        heading: 'Balancing research, technical constraints, and rapid iteration',
        content: [
          {
            type: 'paragraph',
            text: 'As design lead of the HelloChef project, my role was to align customer desires, creator incentives, and HelloFresh’s operational boundaries into a seamless commercial experience.',
          },
          {
            type: 'bullets',
            items: [
              '**Establishing the marketplace model through competitive analysis:** Analyzed existing creator-commerce models to define how a food-first marketplace should function while leveraging HelloFresh\'s core design language.',
              '**Designing for two distinct user types:** Partnered closely with UX Researchers to uncover the baseline expectations of both shoppers (intent to cook) and creators (intent to publish and monetize).',
              '**Developer co-creation from the start:** Embedded engineering early in the conceptual phase to navigate existing technical backend limitations, ensuring zero friction during developer handoff.',
            ],
          },
        ],
      },
      {
        heading: 'Notable Outcomes & Target Criteria',
        content: [
          {
            type: 'group',
            heading: '**Engineered for high-volume conversion (Targeting $17K/mo projected revenue)**',
            items: [
              '**2.5% Target Conversion & 80% Creator Retention**',
              'The marketplace experience was designed to convert saved-recipe intent into box orders, targeting a 2.5% conversion rate across 20 macro creators.',
              'Creators spend substantial time producing high-demand recipe content but face low financial returns and conversion due to algorithm instability. HelloChef mitigates algorithm risk through a transparent compensation model, turning engagement into high-retention creator partnerships. Read more in the [Creator Toolkit case study](/work/hellochef-creator-toolkit).',
            ],
          },
          {
            type: 'group',
            heading: '**Scaled from "Created by" to "Fulfilled by" HelloFresh**',
            items: [
              '**0-to-1 Ecosystem Built for 200+ National Recipes**',
              'Shifted HelloFresh from internal menu creation to an agile, infrastructure-driven marketplace model. Designed end-to-end self-serve workflows for creators and customers to scale national recipe coverage without increasing internal QA overhead.',
            ],
          },
        ],
      },
      {
        heading: 'Creators shared enthusiasm for the concept from the start.',
        content: [
          {
            type: 'paragraph',
            text: 'Creators are highly enthusiastic about bridging the "inspiration-execution gap," as they would normally spend large amounts of time creating high-demand content (recipes) but see low financial return and low audience conversion due to algorithm instability and logistical hurdles, but with the HelloChef platform, the risks of algorithm volatility are mitigated with a new compensation model. You can find more on the creators side of this project here.',
          },
        ],
      },
      {
        heading: 'Many ways to go and grow from here.',
        content: [
          {
            type: 'bullets',
            items: [
              '**User-Generated Creator Storefronts:** Expanding the platform to allow everyday home cooks to upload, share, and monetize their own recipes for friends and family.',
              '**Global Expansion:** Leveraging HelloFresh’s presence across 18 countries to launch regionalized creator storefronts worldwide.',
              '**Subscriber Cross-Pollination:** Integrating creator recipes directly into active HelloFresh subscription boxes, unlocking a massive existing customer base without adding on standalone purchases.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'hellochef-creator-toolkit',
    title: 'HelloChef — Creator Toolkit',
    description:
      'Creating an AI-enabled portal for creators to publish, monetize, and track their recipes as meal kits fulfilled by HelloFresh.',
    tags: ['Product', 'UX/UI', 'Information Architecture', 'Internal Tool'],
    image: '/hc-creator-toolkit-thumb.png',
    intro: {
      heading:
        'Creating an AI-enabled portal for creators to publish, monetize, and track their recipes as meal kits fulfilled by HelloFresh.',
    },
    hero: { type: 'video', src: '/hc-creator-toolkit-hero.mov' },
    sections: [
      {
        heading: 'Creators spend hours making viral recipes, but see low, unpredictable returns.',
        content: [
          {
            type: 'paragraph',
            text: 'Creators are spending large amounts of time creating high-demand recipe content but are seeing low and unpredictable returns. Content creators face severe algorithm volatility, low audience conversion, and unstable ad-payout structures. While their recipe content drives massive consumer engagement, creators lack a direct, scalable way to monetize that inspiration without managing complex logistics themselves.',
          },
        ],
      },
      {
        heading: 'A reliable way for creators to monetize their recipes',
        leftExtras: [{ type: 'image', src: '/hc-creator-toolkit-analytics.mov', alt: 'Toolkit analytics' }],
        content: [
          {
            type: 'paragraph',
            text: 'The HelloChef Creator Toolkit transforms recipe creation into a predictable revenue stream. By providing an automated self-serve platform backed by HelloFresh\'s fulfillment network, creators can monetize their existing audiences through a transparent compensation model without administrative overhead.',
          },
        ],
      },
      {
        heading: 'Balancing Research, Technical Boundaries, and AI Speed',
        leftExtras: [{ type: 'image', src: '/hc-creator-toolkit-profile.mov', alt: 'Toolkit profile edit' }],
        content: [
          {
            type: 'paragraph',
            text: 'As design lead, my focus was to eliminate administrative friction for creators while protecting their personal brand identities and satisfying HelloFresh’s culinary standards.',
          },
          {
            type: 'bullets',
            items: [
              '**Deep Creator Research & Benchmarking:** Conducted creator interviews and analyzed publishing tools to map out workflow friction points, ensuring the portal felt familiar, high-trust, and low-effort.',
              '**Cross-Product Alignment with the HelloFresh Cookbook Team:** Co-designed the architecture alongside internal teams to ensure recipe assets can seamlessly power both discoverable in HelloFresh app content.',
              '**AI-Accelerated Design & Documentation:** Leveraged AI tools to rapidly explore edge cases, map complex system states, and deliver comprehensive engineering documentation for a seamless handoff.',
            ],
          },
        ],
      },
      {
        heading: 'Notable Outcomes & Target Criteria',
        content: [
          {
            type: 'group',
            heading: '**100% Self-Serve Recipe Onboarding**',
            items: [
              '**Eliminating Technical Support Overhead.** Designed end-to-end automated workflows for creators to independently upload recipes, high-res photography, and marketing assets, ensuring the platform scales without requiring dedicated developer intervention.',
            ],
          },
        ],
      },
      {
        heading: 'Scaling the Creator Ecosystem',
        content: [
          {
            type: 'bullets',
            items: [
              '**Unified Content Management System:** Expanding the toolkit into a comprehensive portal where creators manage both discoverable recipes within the HelloFresh platform and direct-to-consumer sellable meal kits on HelloChef or HelloFresh to subscribers.',
              '**Global Distribution:** Unlocking HelloFresh’s 18-country logistics network to let creators sell their signature recipes to international audiences.',
              '**In-App Subscriber Integration:** Allowing top-performing creator recipes to be featured directly within standard HelloFresh subscription menus.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'factor-programs-dashboard',
    title: "Factor — Program's Dashboard",
    description:
      'Transforming Factor from meal delivery into a holistic weight management ecosystem.',
    tags: ['Product', 'UX/UI', 'Research'],
    image: '/factor-programs-thumb.png',
    intro: {
      heading:
        'Transforming Factor from meal delivery into a holistic weight management ecosystem.',
      body: 'Factor needed to expand beyond traditional ready-to-eat meal delivery into structured, goal-oriented programs. The challenge was building an end-to-end UX architecture capable of translating complex health data like caloric targets, dietitian support, and progress markers into an intuitive interface that scaled across multiple future program verticals.',
    },
    hero: { type: 'image', src: '/factor-programs-thumb.png' },
    sections: [
      {
        heading: 'A dynamic "Command Centre" built for contextual adaptation',
        leftExtras: [{ type: 'image', src: '/factor-programs-box-notifications.mov', alt: 'Box notifications' }],
        content: [
          {
            type: 'paragraph',
            text: 'Rather than a static portal, the Factor Programs dashboard was architected as a living hub. The interface dynamically recalibrates its visual hierarchy based on three intersecting axes:',
          },
          {
            type: 'bullets',
            items: [
              '**Logistical Deadlines:** Prioritizes immediate, time-sensitive actions like box tracking and upcoming weekly meal selection cutoffs.',
              '**User Lifecycle & Goal State:** Adapts content based on whether a user is in early onboarding or actively progressing through specialized tracks.',
              '**Progress & Reflection:** Surfaces personal health milestones and nutritional tracking data to reinforce positive long-term habits.',
            ],
          },
        ],
      },
      {
        heading: 'Designing a flexible UX architecture for multi-program scale',
        leftExtras: [
          {
            type: 'paragraph',
            text: 'As Lead Product Designer for the Customer Dashboard and Meal Tracking workflows, my role was to architect the central hub that brought the program experience together—focusing on state-aware guidance, habit logging, and reducing cognitive load for nutrition tracking.',
          },
          {
            type: 'bullets',
            items: [
              '**State-Aware Guidance & Next-Step Calls to Action:** Designed intelligent UI modules that surface high-priority prompts, from rating recent meals to scheduling dietitian check-ins.',
              '**Multi-Dimensional Success Metrics:** Built "non-scale" progress tracking frameworks (such as transformation photo logs and "clothes fit" indicators) alongside quantitative caloric metrics to support holistic health journeys.',
              '**End-to-End System Integration:** Connected the core dashboard hub seamlessly with newly designed Meal Tracking workflows, bridging the gap between daily habit logging and weekly box fulfillment.',
            ],
          },
        ],
        content: [
          { type: 'image', src: '/factor-programs-meal-tracking.mov', alt: 'Meal Tracking and non-scale progress', scale: 0.7, cropTop: 5 },
        ],
      },
      {
        heading: 'Notable Outcomes & Strategic Value',
        content: [
          {
            type: 'group',
            items: [
              '**Pioneered Factor’s First Health & Weight Management Vertical.** Defined the end-to-end UX standards for integrated health services at Factor, establishing the foundational architecture for scalable, multi-program offerings across the brand.',
            ],
          },
          {
            type: 'group',
            items: [
              '**From Deprioritized Concept to Corporate Product Blueprint.** Navigated shifting corporate priorities over a multi-year effort to launch the MVP. The resulting design framework serves as the core internal benchmark for future integrated health initiatives across Factor.',
            ],
          },
        ],
      },
      {
        heading: 'Scaling our health services',
        content: [
          {
            type: 'bullets',
            items: [
              '**Multi-Program Expansion:** Scaling the dashboard architecture beyond weight management to support specialized fitness, medical nutrition, and longevity tracks.',
              '**Biometric & Wearable Integration:** Connecting native meal tracking with wearable health data (e.g., Apple Health, Fitbit) to automate calorie and macro adjustments in real time.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'factor-meal-filtering',
    hidden: true,
    title: 'Factor — Meal Filtering',
    description:
      'Improving the meal selection experience by allowing users to filter and navigate using collections. Design geared towards how customers think of food.',
    tags: ['Product', 'UX/UI', 'Research', 'Strategy'],
    image: '/card display.png',
  },
  {
    slug: 'factor-personalization',
    hidden: true,
    title: 'Factor — Personalization',
    description:
      'Offering customers more control over their meal subscription preferences.',
    tags: ['Product', 'UX/UI', 'Information Architecture'],
    image: '/personalization-display.png',
  },
  {
    slug: 'hellofresh-multibrand-design-system',
    hidden: true,
    title: 'HelloFresh — Multibrand Design System',
    description:
      'Creating and collaborating on a multi-brand design system to streamline workflows and maintain consistency.',
    tags: ['Design Systems', 'Collaboration'],
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
