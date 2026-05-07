// lib/case-studies/deckup.ts
import type { CaseStudy } from './types'

export const deckup: CaseStudy = {
  slug: 'deckup',
  title: 'DeckUp — PowerPoint Productivity SaaS',
  tags: ['Product Design', 'SaaS', 'B2B', 'PowerPoint Plugin'],
  year: '2024',
  timeline: 'Ongoing',
  role: 'Product Design Specialist',
  client: 'SlideXpress',
  passwordEnvKey: 'DECKUP_PASSWORD',
  detailPath: '/work/deckup-detail',

  hero: {
    banner: { type: 'video', src: '/hero-video.mp4' },
    headline: 'DeckUp',
    subline: 'From SlideXpress internal expertise to a 4-platform SaaS — a PowerPoint productivity plugin built end-to-end for consultants, strategy teams, and agencies.',
  },

  overview: {
    context:
      'SlideXpress, a creative deck design studio, had spent years building internal techniques and tools for faster, higher-quality work. The team asked a simple question: why not turn that expertise into a product? DeckUp was born from that moment — Phase I focusing on core plugin and platform, Phase II planned to integrate AI for personalisation and deck generation.',
    problem:
      'Power PowerPoint users — consultants, agencies, corporate managers — spent 30–40% of deck time on repetitive formatting, consistency fixes, agenda management, and creative data visualisation. Every common task required 4–6 clicks through buried menus, and building compelling charts or infographics from scratch consumed even more. These inefficiencies compounded into hours lost per week.',
    direction:
      'Led end-to-end product design across 4 platforms: website, subscription dashboard, PowerPoint plugin, and installer. Drove research, competitive benchmarking, a pricing model, 6 user flows, a 60+ component design system, Chargebee-based subscription engine, and a phased prelaunch strategy with existing SlideXpress customers.',
    directionLabel: 'My Approach',
  },

  metrics: [
    { value: '60%',  label: 'Productivity gain',        sub: 'For daily power users' },
    { value: '4',    label: 'Platforms designed',        sub: 'Website · Dashboard · Plugin · Installer' },
    { value: '60+',  label: 'Design system components',  sub: 'Built from scratch in Figma' },
    { value: '4',    label: 'Test rounds',               sub: 'Onboarding · Plugin · Admin · Visual QA' },
  ],

  processIntro: 'From internal knowledge to shipped product',

  process: [
    {
      num: 'Origin',
      title: 'The idea — turning internal expertise into a product',
      body: 'SlideXpress had spent years developing techniques, shortcuts, and tools for faster, higher-quality deck delivery. That knowledge lived in training sessions and internal workshops. The team questioned: why not package this as a product for the world? DeckUp was the answer. Development was scoped into two phases — Phase I focusing on the core plugin and subscription platform, Phase II planned to layer in AI for personalisation, smart deck generation from a library, and data-driven content creation.',
      tags: ['Product vision', 'Phase I: Core plugin + platform', 'Phase II: AI personalisation', 'Internal → commercial'],
      image: {
        src: null,
        alt: 'DeckUp product vision — Phase I and Phase II roadmap',
        hint: 'Roadmap visual: Phase I (Core Plugin + Platform) and Phase II (AI personalisation, deck generation from library, data-driven content). Could show a simple two-phase timeline or product vision diagram.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 01',
      title: 'Research — pain points, personas, competitor study & pricing model',
      body: 'Studied the real pain points of power PowerPoint users across 5 segments: Consultants, Corporate Managers, Presentation Specialists, Educators, and IT Admins. Identified the top recurring tasks eating the most time. Ran a full competitor study across 7 tools for features, onboarding, and pricing. Developed a pricing model with a critical financial planning lens — balancing product sustainability with competitive positioning. Personas and user journeys were mapped to anchor design decisions in real user goals.',
      tags: ['5 user segments', '7 competitors analysed', 'Pricing model & financial planning', 'Personas & journey maps'],
      image: {
        src: null,
        alt: 'User segments, personas, and competitor benchmarking overview',
        hint: 'Show the two user tracks: Product users (Consultants, Corporate Managers, Individual Professionals, Presentation Specialists, Educators) vs Platform users (IT Admins). Optionally overlay the competitor matrix.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 02',
      title: 'Plugin design — hierarchy, behaviours, use cases & iterations',
      body: 'Designed the plugin toolbar from the ground up: defining information hierarchy, user behaviours within PowerPoint\'s constrained panel environment, and every use case for Quick Tools, Table Formatting, Agendas, Infographics, and Labels. Went through multiple rounds of testing and reiteration with the SlideXpress team — always focused on maximum value creation per click. The goal was not features, it was removing friction.',
      tags: ['Toolbar hierarchy', 'Use case mapping', 'State design (Default / Hover / Active)', '60+ Figma components', 'Iterative testing'],
      image: {
        src: null,
        alt: 'DeckUp toolbar UI — plugin panel inside PowerPoint',
        hint: 'Screenshot of the DeckUp toolbar in PowerPoint showing the plugin panel: Quick Tools, Table Formatting, Agendas, Labels feature. Show the compact, accessible layout.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 03',
      title: 'Subscription platform — user management, plan types & cross-team alignment',
      body: 'While the plugin was being built, the design team worked in parallel on the subscription platform — covering user management for Single, Teams, and Enterprise accounts. Each plan type had distinct flows and admin needs. Both teams ran weekly alignment sessions to sync on goals, match development timelines, and ensure the plugin and platform stayed coherent as one product — not two separate tools.',
      tags: ['Single · Teams · Enterprise flows', 'User management dashboard', 'Weekly cross-team alignment', 'IT Admin experience'],
      image: {
        src: null,
        alt: 'Subscription platform — user management dashboard',
        hint: 'Show the subscription dashboard: user list, licence management, plan status, add/remove users. Highlight the three plan types (Single, Teams, Enterprise) in the UI.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 04',
      title: 'Cross-functional onboarding — 4 plan flows, installer & renewals',
      body: 'DeckUp is a standalone PC/laptop installer — not a browser extension. This makes onboarding genuinely cross-functional: it starts on the website with account creation and validation, moves through plan selection and payment, then installer download and plugin activation. Four distinct plan flows were designed: Free Trial, Buy Now (Single), Teams, and Enterprise (get-a-quote). Renewal flows covered both automatic and manual paths with 30/15/7-day email reminders for each scenario.',
      tags: ['Free Trial · Buy Now · Teams · Enterprise', 'Installer activation flow', 'Renewal strategies', 'Email trigger design', '6 complete user journeys'],
      image: {
        src: null,
        alt: 'Cross-functional onboarding flows — website to plugin activation',
        hint: 'Flow diagram showing the full onboarding path: Website → Account creation → Plan selection → Payment → Installer download → Plugin activation → 30-day trial / Paid plan. Show multiple plan paths branching.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 05',
      title: 'Tech stack, testing & prelaunch — Chargebee, 4 test rounds & limited rollout',
      body: 'To reduce Phase I development time, Chargebee was adopted as the subscription engine — handling billing, licence management, and renewals. Its dashboard also served as the internal analytics and growth metrics platform, providing data visualisation, reports, and user management in one place without building custom analytics from scratch. Testing ran across 4 structured rounds: plugin core flows, onboarding, dashboard and enterprise, and visual QA. The prelaunch strategy launched with a limited cohort of existing SlideXpress customers — gaining an outside perspective and catching early issues before a wider rollout.',
      tags: ['Chargebee subscription engine', 'Growth analytics & reporting', '4 QA rounds', 'Limited prelaunch with existing customers'],
      image: {
        src: null,
        alt: 'QA tracking and prelaunch framework',
        hint: 'Could show the QA tracking sheet (Deckup_testing.xlsx) with columns for issue type, status (Done/Verified/Pending), or a prelaunch rollout framework diagram.',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Internal expertise is the best product foundation',
      desc: 'DeckUp was not a hypothesis — it came from years of SlideXpress building and refining techniques for real clients. The research phase validated this: the pain points the team had solved internally were exactly what the wider market struggled with. Starting with genuine domain knowledge compressed the research-to-design cycle significantly.',
    },
    {
      num: 'Finding 02',
      title: 'Cross-functional onboarding is as much a design problem as the plugin itself',
      desc: 'Because DeckUp is a standalone installer — not a web app — the onboarding spans website, payment, download, installation, and activation across multiple contexts. Each transition point was a potential drop-off. Designing these handoffs with the same rigour as the plugin UI was essential for launch-readiness.',
    },
    {
      num: 'Finding 03',
      title: 'Smart tech choices accelerate design — Chargebee removed months of build time',
      desc: 'Choosing Chargebee as the subscription engine for Phase I meant the team didn\'t need to design or build a custom billing and analytics stack. This freed up design and dev capacity to focus on what mattered: the plugin experience and onboarding flows. The prelaunch with existing customers provided real feedback before full market exposure.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'Building DeckUp from scratch taught me that the best products come from solving real, lived-in problems. SlideXpress didn\'t guess at what consultants needed — they had been living those needs for years. My job was to translate that domain knowledge into a coherent, scalable product across 4 platforms.',
      'The parallel workstreams — plugin and subscription platform — required constant cross-team alignment. Weekly syncs weren\'t just a project management ritual; they were the mechanism that kept both surfaces coherent. When they slipped, inconsistencies crept in. When they held, the product felt like one thing.',
      'Phase II remains ahead: AI-powered personalisation, smart deck generation from a content library, and data-driven creation flows. The foundation built in Phase I — the design system, the subscription infrastructure, the user research — was designed to support that expansion without rebuilding from scratch.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke',           role: 'Product Design Specialist', url: 'https://www.linkedin.com/in/onkarlanke/' },
    { initials: 'KI', name: 'Krithika Iyer',         role: 'Visual Designer',           url: 'https://www.linkedin.com/in/krithika-iyer-596a3a1b0/' },
    { initials: 'SW', name: 'Swapnil',               role: 'UX Designer',               url: '#' },
    { initials: 'PM', name: 'Priyanka',              role: 'Project Manager',           url: 'https://www.linkedin.com/in/tatzope/' },
    { initials: 'HJ', name: 'Harsh Jain',            role: 'Frontend Developer',        url: 'https://www.linkedin.com/in/harshjain4204/' },
    { initials: 'HK', name: 'Haris Kumar',           role: 'QA Engineer',               url: 'https://www.linkedin.com/in/hariskumar-p/' },
    { initials: 'NB', name: 'Naveen Ben',            role: 'Backend Engineer',          url: 'https://www.linkedin.com/in/naveen-ben/' },
    { initials: 'PJ', name: 'Ponmalar Jagannathan',  role: 'Director',                  url: 'https://www.linkedin.com/in/ponmalar-jagannathan-a32566a/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers the origin story, user research synthesis, all 7 competitor analyses, the pricing model, complete service map, all 6 user flows, the full design system, every toolbar feature, Chargebee tech stack decisions, all 4 rounds of usability testing, and the prelaunch strategy.',
  },
}
