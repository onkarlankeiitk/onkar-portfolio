// lib/case-studies/fintech-gamification.ts
import type { CaseStudy } from './types'

export const fintechGamification: CaseStudy = {
  slug: 'fintech-gamification',
  title: 'Gamification in Fintech — Board Game Inspired',
  tags: ['Gamification', 'Fintech', 'UX Design'],
  year: '2023',
  timeline: '6 Weeks',
  role: 'UX Designer',
  client: 'Mindseye Creative',
  passwordEnvKey: 'FINTECH_GAMIFICATION_PASSWORD',
  detailPath: '/work/fintech-gamification-detail',

  hero: {
    banner: null, // replace with: { src: '/case-studies/fintech-gamification/banner.mp4', type: 'video', poster: '/case-studies/fintech-gamification/poster.jpg' }
    headline: 'Fintech × Gamification',
    subline: 'Making complex financial products approachable through board game interaction patterns.',
  },

  overview: {
    context:
      'Financial products — investments, insurance, savings plans — are inherently complex and anxiety-inducing for most users. This project explored how board game mechanics could be applied to a fintech interface to reduce cognitive load and make financial decision-making feel approachable and even enjoyable.',
    problem:
      'Traditional fintech UIs present users with walls of numbers, legal text, and product options they don\'t understand. Drop-off rates during onboarding and product selection are high. Users disengage before completing any meaningful financial action.',
    direction:
      'Designed a fintech interface borrowing mechanics from board games — progress tracks, milestone rewards, simplified choice architecture, and spatial navigation — that guided users through complex financial decisions without overwhelming them.',
    directionLabel: 'Design Direction',
  },

  metrics: [
    { value: '85%',  label: 'Usability score',       sub: 'Post-testing SUS score' },
    { value: '70%',  label: 'User retention',         sub: 'Task completion rate' },
    { value: '3×',   label: 'Engagement vs baseline', sub: 'Time on key screens' },
    { value: '6',    label: 'Board game mechanics',   sub: 'Applied to fintech flows' },
  ],

  processIntro: 'Designing delight into complexity',

  process: [
    {
      num: 'Step 01',
      title: 'Research — why people avoid financial products',
      body: 'Conducted secondary research and user interviews exploring financial anxiety, decision fatigue, and the emotional barriers to engaging with financial products. Mapped the emotional journey of a first-time investor.',
      tags: ['User interviews', 'Emotional journey mapping', 'Financial anxiety research'],
      image: {
        src: null, // replace with: '/case-studies/fintech-gamification/research.png'
        alt: 'Research and emotional journey mapping',
        hint: 'Replace with your research synthesis, emotional journey map, or interview insights diagram',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'Gamification framework — mapping board game mechanics to fintech',
      body: 'Analysed board game mechanics across 15 popular games — Monopoly, Catan, Ticket to Ride, etc. — and identified 6 transferable patterns: progress tracks, milestone rewards, simplified choice sets, spatial navigation, risk visualisation, and cooperative goal setting.',
      tags: ['15 games analysed', '6 mechanics identified', 'Mechanics-to-UX mapping'],
      image: {
        src: null, // replace with: '/case-studies/fintech-gamification/mechanics-map.png'
        alt: 'Gamification mechanics mapping framework',
        hint: 'Replace with your board game mechanics to fintech UX mapping diagram',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'Interface design — the gamified fintech UI',
      body: 'Designed the core interface: a visual progress track replacing the traditional stepper, milestone celebration moments at key decisions, a simplified product selection board replacing dropdown menus, and a risk slider visualised as a game dial.',
      tags: ['Progress track system', 'Milestone moments', 'Visual product board', 'Risk dial'],
      image: {
        src: null, // replace with: '/case-studies/fintech-gamification/ui-design.png'
        alt: 'Gamified fintech interface design',
        hint: 'Replace with your final UI screens showing the gamified fintech interface',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'Usability testing — measuring delight vs anxiety',
      body: 'Tested with 12 participants across two groups — financially anxious first-timers and experienced investors. Measured task completion, time-on-task, SUS score, and a custom anxiety scale. Iterated on language, visual complexity, and interaction density.',
      tags: ['12 test participants', 'SUS score 85%', 'Anxiety scale measurement', '2 user groups'],
      image: {
        src: null, // replace with: '/case-studies/fintech-gamification/testing.png'
        alt: 'Usability testing results and iteration',
        hint: 'Replace with usability testing charts, before/after comparisons, or SUS score breakdown',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Progress visibility reduces abandonment',
      desc: 'Showing users exactly where they were in the financial decision journey — via the progress track — reduced mid-flow abandonment by making the end feel achievable. "I can see the finish line" was the most common testing feedback.',
    },
    {
      num: 'Finding 02',
      title: 'Celebration moments build confidence',
      desc: 'Brief milestone animations when users completed a key step (choosing their first product, setting a goal) measurably increased confidence scores. These "small wins" lowered anxiety for the next decision.',
    },
    {
      num: 'Finding 03',
      title: 'Spatial choice beats dropdowns',
      desc: 'Replacing the product selection dropdown with a visual "board" of 4–6 options that users could inspect spatially increased time spent comparing products by 3× — and increased selection confidence significantly.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'Gamification works when it reduces cognitive load — not when it adds points and badges on top of a confusing interface. The mechanics that worked best were the ones that simplified choices, not the ones that added rewards.',
      'Financial anxiety is real and designing for it requires empathy first. The most impactful design decisions weren\'t visual — they were about language: replacing "investment vehicle" with "savings path", "portfolio allocation" with "how you want to spread your money".',
      'Testing with two distinct user groups — anxious first-timers vs experienced investors — revealed that the same interface design can read very differently. Features that delighted novices felt patronising to experts, requiring careful personalisation in the final design.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke', role: 'UX Designer', url: 'https://www.linkedin.com/in/onkarlanke/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers the full gamification research, mechanics mapping framework, all UI screens, usability testing data, and the anxiety scale methodology.',
  },
}
