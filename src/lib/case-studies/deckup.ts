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
    banner: null,
    headline: 'DeckUp',
    subline: 'A PowerPoint productivity plugin that cuts repetitive formatting time by up to 60% — built end-to-end for consultants, strategy teams, and agencies.',
  },

  overview: {
    context:
      'SlideXpress serves power PowerPoint users — consultants, strategy teams, and agencies who live inside decks all day. DeckUp is a purpose-built toolbar and management platform for these users, eliminating the repetitive friction points they hit dozens of times per session.',
    problem:
      'Power users were spending 30–40% of their deck time on formatting, consistency checks, and repetitive slide tasks that native PowerPoint doesn\'t solve well. Everything from table formatting to agenda generation required 4–6 clicks through buried menus — every time.',
    direction:
      'Led end-to-end product design across 4 interconnected platforms: a marketing website, subscription dashboard, the PowerPoint plugin itself, and an installer. Built from user research and competitive benchmarking through a 60+ component design system, complete user flows, and 4 rounds of usability testing.',
    directionLabel: 'My Approach',
  },

  metrics: [
    { value: '60%',  label: 'Productivity gain',      sub: 'For daily power users' },
    { value: '7',    label: 'Competitors analysed',   sub: 'Onboarding + feature benchmarking' },
    { value: '4',    label: 'Platforms designed',     sub: 'Website · Dashboard · Plugin · Installer' },
    { value: '60+',  label: 'Design system components', sub: 'Built from scratch in Figma' },
  ],

  processIntro: 'From zero to shipped product',

  process: [
    {
      num: 'Step 01',
      title: 'User research — mapping the consultant workflow',
      body: 'Conducted in-depth research across 5 user segments: Consultants, Corporate managers, Presentation specialists, Educators, and IT Admins. Identified the top 12 repetitive PowerPoint tasks consuming the most time per session — from table formatting to consistency checks and agenda generation.',
      tags: ['User interviews', '5 segments mapped', 'Workflow analysis', 'Pain point prioritisation'],
      image: {
        src: null,
        alt: 'User research — 5 segment persona map',
        hint: 'Replace with the persona/user segment diagram from the research phase — showing Product users (Consultants, Corporate, Individual, Presentation specialists, Education) vs Platform users (IT admins)',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'Competitive analysis — 7 tools benchmarked',
      body: 'Benchmarked 7 existing PowerPoint plugins and productivity tools: PPT Productivity, Power-User, Efficient Elements, think-cell, Grammarly, Macabacus, and Lucidchart. Also ran a detailed onboarding flow comparison across DeckUp, Microsoft, Grammarly, think-cell, and Powtoon to identify best-in-class patterns.',
      tags: ['7 tools benchmarked', 'Onboarding comparison', 'Pricing analysis', 'Feature matrix'],
      image: {
        src: null,
        alt: 'Competitive benchmarking — 7 tools and onboarding comparison',
        hint: 'Replace with the competitive comparison table or onboarding flow comparison document',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'Architecture & flows — 4 platforms, 6 core journeys',
      body: 'Designed the full service map across Website, Dashboard, Plugin, and Installer. Then mapped 6 user journeys: Free Trial onboarding, Buy Now onboarding, Enterprise (get-a-quote), Renewal (manual + automatic), and the Installer activation flow — including all edge cases and email trigger points.',
      tags: ['Service map', '4 platforms', '6 user flows', 'Email trigger design'],
      image: {
        src: null,
        alt: 'Service map and user flows across 4 platforms',
        hint: 'Replace with the service map or combined flow diagram showing Website → Dashboard → Plugin → Installer relationships',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'Design system & toolbar UI — 60+ components, 4 test rounds',
      body: 'Built a full design system from scratch — typography, colour tokens, spacing, and 60+ components with default, hover, and active states. Then designed all toolbar features (Quick Tools, Table formatting, Agendas, Infographics, Labels, Identical Select) and iterated through 4 rounds of usability testing with real users.',
      tags: ['60+ Figma components', 'State design (Default / Hover / Active)', '4 usability test rounds', 'Toolbar feature specs'],
      image: {
        src: null,
        alt: 'Toolbar UI and design system components',
        hint: 'Replace with a screenshot of the DeckUp toolbar in PowerPoint — showing the plugin panel with Quick Tools, Table, and other features visible',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Formatting is the biggest time sink — and it\'s invisible',
      desc: 'Consultants spent 30–40% of deck time on formatting, alignment, and consistency fixes. Because each individual task felt small, the aggregate cost was invisible to them — until we mapped session recordings. The solution had to save time without requiring users to think about saving time.',
    },
    {
      num: 'Finding 02',
      title: '4–6 clicks for every common task is too many',
      desc: 'Switching between native PowerPoint ribbon menus for common tasks averaged 4–6 clicks per action. DeckUp reduced the top 12 tasks to 1–2 clicks. That reduction, multiplied across hundreds of actions per session, accounts for the 60% productivity gain.',
    },
    {
      num: 'Finding 03',
      title: 'IT Admins are the real purchase decision-maker',
      desc: 'In enterprise contexts, the end user (consultant) and the buyer (IT admin) are different people with completely different needs. The dashboard and enterprise flow had to satisfy both — ease of use for the consultant, licence control and bulk management for the admin.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'Building a product from scratch across 4 connected platforms taught me that consistency is a design problem before it\'s a technical one. Every flow — from the marketing website to the installer to the plugin itself — had to feel like one product. The design system was the thing that made that possible.',
      'Working directly with consultants through 4 rounds of usability testing changed the product significantly each time. Features I thought were obvious were confusing; shortcuts I thought were complex became the most-used interactions. There is no substitute for watching a real user try to do a real task.',
      'The 60% productivity gain validated the core hypothesis: a purpose-built tool for a specific professional workflow will always outperform a general-purpose one. The win wasn\'t in adding features — it was in removing clicks.',
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
    body: 'The detailed breakdown covers user research synthesis, all 7 competitor analyses, complete service map, all 6 user flows, the full design system, every toolbar feature, and all 4 rounds of usability testing.',
  },
}
