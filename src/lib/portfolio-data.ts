// ─── Shared listing data ────────────────────────────────────────────────────────
// Edit here — changes reflect on both the landing page and /projects page.

export type ProjectMetric = { v: string; l: string }

export type Project = {
  slug: string
  directPath: string
  banner: string
  company: string
  year: string
  title: string
  description: string
  tags: string[]
  metrics: [ProjectMetric, ProjectMetric]
  extraImages?: [string, string]
}

export type ArchProject = {
  title: string
  label: string
  tag: string
  image?: string
}

// ─── Digital design case studies ───────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: 'dil-kyc',
    directPath: 'https://light-candidate-173446.framer.app/dil',
    banner: '/case-studies/dil-kyc/dil-dashboard-banner.png',
    company: 'Diamond India Ltd.',
    year: '2024',
    title: "KYC, onboarding & customer management for India's largest bullion supplier",
    description:
      'Digitisation of extensive offline onboarding reducing time (4 to 2 weeks), reduced paperwork and employee fatigue.',
    tags: ['B2B', 'UX Design', 'Fintech', 'Digital Transformation'],
    metrics: [
      { v: '55%', l: 'Onboarding time' },
      { v: '40%', l: 'Efficiency' },
    ],
    extraImages: [
      '/case-studies/dil-kyc/kyc-basic-info.png',
      '/case-studies/dil-kyc/kyc-renewal.png',
    ],
  },
  {
    slug: 'fintech-gamification',
    directPath: 'https://light-candidate-173446.framer.app/frankie-one',
    banner: '/case-studies/fintech-gamification/frankieone-banner.png',
    company: 'Frankieone',
    year: '2023',
    title: "Gamified, canvas based, puzzle styled platform for financial KYC & onboarding",
    description:
      'A no-code KYC & onboarding builder for financial institutions, inspired by puzzle pieces and board game mechanics.',
    tags: ['Fintech', 'Gamification', 'Board Games'],
    metrics: [
      { v: '33%', l: 'Engagement & focus' },
      { v: '25%', l: 'Faster build rate' },
    ],
    extraImages: [
      '/case-studies/fintech-gamification/frankieone-playground.png',
      '/case-studies/fintech-gamification/frankieone-backtesting.png',
    ],
  },
  {
    slug: 'research-strategy',
    directPath: 'https://light-candidate-173446.framer.app/munk-pack',
    banner: '/case-studies/research-strategy/munk-pack-banner.png',
    company: 'Commongood, USA',
    year: '2023',
    title: 'Design for growth, trust, repetition, and accessibilty',
    description:
      'UX evaluation, communication strategy, positioning, storytelling & information architecture mapping',
    tags: ['UX Evaluation', 'Strategy', 'Behavioral Mapping', 'Storytelling'],
    metrics: [
      { v: '43%', l: 'Engagement' },
      { v: '11%', l: 'Checkout vol.' },
    ],
    extraImages: [
      '/case-studies/research-strategy/munk-pack-accessibility.png',
      '/case-studies/research-strategy/munk-pack-ia.png',
    ],
  },
  {
    slug: 'deckup',
    directPath: '/work/deckup-detail',
    banner: '/case-studies/deck-up/deckup-banner.png',
    company: 'SlideXpress',
    year: '2024',
    title: 'Deckup: Product development, subscription based service design (SaaS)',
    description:
      'Deckup is a SaaS based design companion for consultants, increasing their productivity, aesthetics, and impact.',
    tags: ['B2B & D2C', 'Product Development', 'SaaS'],
    metrics: [
      { v: '40–60%', l: 'Productivity gain' },
      { v: '3X',     l: 'Impact' },
    ],
    extraImages: [
      '/case-studies/deck-up/deckup-pricing.png',
      '/case-studies/deck-up/deckup-dashboard.png',
    ],
  },
]

// ─── Arch + industrial projects ─────────────────────────────────────────────────
export const archProjects: ArchProject[] = [
  {
    title: 'Spatial Design: Villa in Tundla, UP',
    label: '// spatial project — replace',
    tag: 'Space + Arch',
    image: '/arch/arch-design.png',
  },
  {
    title: 'Interactive Lighting Design',
    label: '// lighting project — replace',
    tag: 'Lighting Products',
  },
  {
    title: 'Consumer Electronics',
    label: '// sound/arch project — replace',
    tag: 'Consumer Electronics',
  },
]

// ─── Article thumbnail helpers ──────────────────────────────────────────────────
export const ARTICLE_QUADRANT_POS = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'] as const

export function getArticleThumbnail(title: string): string | null {
  const t = title.toLowerCase()
  if (t.includes('squircle')) return '/article-squircle.png'
  if (t.includes('tools') || t.includes('claude') || t.includes('productivity')) return '/article-tools.png'
  if (t.includes('credibility') || t.includes('design credibility')) return '/article-design-credibility.png'
  if (t.includes('boeing')) return '/article-boeing.png'
  return null
}
