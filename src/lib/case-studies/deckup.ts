// lib/case-studies/deckup.ts
import type { CaseStudy } from './types'

export const deckup: CaseStudy = {
  slug: 'deckup',
  title: 'DeckUp — SaaS for Consultants',
  tags: ['Product Design', 'SaaS', 'B2B'],
  year: '2024',
  timeline: 'Ongoing',
  role: 'Product Design Specialist',
  client: 'SlideXpress',
  passwordEnvKey: 'DECKUP_PASSWORD',
  detailPath: '/work/deckup-detail',

  hero: {
    banner: null, // replace with: { src: '/case-studies/deckup/banner.mp4', type: 'video', poster: '/case-studies/deckup/poster.jpg' }
    headline: 'DeckUp',
    subline: 'A SaaS toolbar that increases consultant productivity by 45–60% — built from scratch at SlideXpress.',
  },

  overview: {
    context:
      'SlideXpress serves power PowerPoint users — consultants, strategy teams, and agencies who live inside decks all day. DeckUp is a purpose-built toolbar for these users, designed to eliminate the repetitive friction points they hit dozens of times per session.',
    problem:
      'Power users were spending a disproportionate amount of time on formatting, consistency checks, and repetitive slide tasks that native PowerPoint didn\'t solve well. There was no dedicated tool that understood the consultant workflow end-to-end.',
    direction:
      'Led end-to-end product design from research to delivery — user interviews with consultants, competitive analysis of existing tools, information architecture, interaction design, and a full design system. Phase 2 integrates AI for personalised deck generation.',
    directionLabel: 'My Approach',
  },

  metrics: [
    { value: '45–60%', label: 'Productivity gain',    sub: 'For daily power users' },
    { value: '40%',    label: 'User comfort score',   sub: 'Post-usability testing' },
    { value: '2',      label: 'Phases delivered',     sub: 'Toolbar + AI roadmap' },
    { value: '1',      label: 'Design system built',  sub: 'From scratch' },
  ],

  processIntro: 'From zero to shipped product',

  process: [
    {
      num: 'Step 01',
      title: 'User research — understanding the consultant workflow',
      body: 'Conducted in-depth interviews with consultants and strategy professionals to map their exact pain points inside PowerPoint. Identified the top 12 repetitive tasks that consumed the most time per session.',
      tags: ['User interviews', 'Workflow mapping', 'Pain point prioritisation'],
      image: {
        src: null, // replace with: '/case-studies/deckup/research.png'
        alt: 'User research and workflow mapping',
        hint: 'Replace with your research notes, affinity map, or interview synthesis diagram',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'Competitive analysis & feature prioritisation',
      body: 'Benchmarked existing PowerPoint add-ins and productivity tools. Used the RICE framework to prioritise features for the MVP toolbar — focusing on tasks with highest frequency and lowest implementation complexity first.',
      tags: ['RICE framework', 'Competitive benchmarking', 'MVP scoping'],
      image: {
        src: null, // replace with: '/case-studies/deckup/competitive.png'
        alt: 'Competitive analysis and RICE prioritisation',
        hint: 'Replace with your competitive benchmarking table or RICE scoring sheet',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'Design system & component library',
      body: 'Built a full design system from scratch in Figma — covering typography, colour tokens, spacing, iconography, and a component library of 60+ reusable elements. This became the single source of truth for the product.',
      tags: ['Figma design system', '60+ components', 'Colour tokens', 'Iconography'],
      image: {
        src: null, // replace with: '/case-studies/deckup/design-system.png'
        alt: 'Design system and component library',
        hint: 'Replace with a screenshot of your Figma design system — component overview or token structure',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'Toolbar design & usability testing',
      body: 'Designed the full toolbar interface across 3 rounds of usability testing with real consultants. Iterated on task flows, keyboard shortcuts, and panel layouts based on session recordings and think-aloud protocols.',
      tags: ['3 rounds of usability testing', 'Task flow iterations', 'Keyboard shortcut design'],
      image: {
        src: null, // replace with: '/case-studies/deckup/toolbar-ui.png'
        alt: 'DeckUp toolbar UI and usability testing',
        hint: 'Replace with your final toolbar design screenshot or usability testing session capture',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Formatting is the biggest time sink',
      desc: 'Consultants spent 30–40% of their deck time on formatting alignment, font consistency, and colour fixes — tasks that should take seconds but required navigating buried menus repeatedly.',
    },
    {
      num: 'Finding 02',
      title: 'Context switching kills flow',
      desc: 'Switching between PowerPoint\'s native ribbon and a task required an average of 4–6 clicks. DeckUp reduced this to 1–2 for the top 12 tasks, directly driving the productivity gain.',
    },
    {
      num: 'Finding 03',
      title: 'AI is the natural next step',
      desc: 'Post-launch user feedback consistently asked for slide generation and personalisation. Phase 2 integrates Claude-powered deck generation — users describe the deck, AI builds the structure.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'Building a product from scratch taught me that the hardest part isn\'t designing the interface — it\'s deciding what not to build. The RICE framework was essential for keeping the MVP focused and shippable.',
      'Working directly with end users through 3 rounds of usability testing changed the product significantly each time. Features I thought were obvious were confusing; things I thought were complex were intuitive.',
      'The 45–60% productivity gain validated the core hypothesis — that a purpose-built tool for a specific professional workflow will always outperform a general-purpose one, even if the general-purpose tool has more features.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke', role: 'Product Design Specialist', url: 'https://www.linkedin.com/in/onkarlanke/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers user research synthesis, RICE scoring, full design system documentation, all 3 rounds of usability testing, and the Phase 2 AI roadmap.',
  },
}
