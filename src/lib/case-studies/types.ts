// lib/case-studies/types.ts

export type Metric = {
  value: string
  label: string
  sub?: string
}

export type ProcessStep = {
  num: string         // e.g. 'Step 01'
  title: string
  body: string
  tags?: string[]     // optional pill tags below the body
  image: {
    src: string | null  // null = show placeholder
    alt: string
    hint: string        // placeholder hint text
    aspect?: string     // e.g. 'aspect-[4/3]', defaults to 'aspect-video'
  }
  imagePosition?: 'left' | 'right'  // defaults to 'right'
}

export type FindingCard = {
  num: string         // e.g. 'Finding 01'
  title: string
  desc: string
}

export type TeamMember = {
  initials: string
  name: string
  role: string
  url: string
}

export type CaseStudy = {
  slug: string
  title: string
  tags: string[]
  year: string
  timeline: string
  role: string
  client: string
  passwordEnvKey: string  // e.g. 'MUNK_PACK_PASSWORD' — never the value itself
  detailPath: string      // e.g. '/work/munk-pack-detail'

  hero: {
    // Set src to the asset path once you have it, null shows placeholder
    banner: { src: string | null; type: 'video' | 'image'; poster?: string } | null
    headline: string
    subline: string
  }

  overview: {
    context: string
    problem: string
    direction: string   // 'solution' for research, 'direction' for product — label set per project
    directionLabel?: string  // defaults to 'Solution'
  }

  metrics: Metric[]

  processIntro?: string   // optional subtitle above the process section
  process: ProcessStep[]

  /** Full-bleed banner image injected between process step 2 and step 3 */
  processMidBanner?: { src: string | null; alt: string }

  findings: FindingCard[]

  /** Full-bleed banner image shown immediately before the Key Findings section */
  preFindingsBanner?: { src: string | null; alt: string }

  /** Full-bleed banner image shown immediately before the Conclusion section */
  preConclusionBanner?: { src: string | null; alt: string }

  conclusion: {
    heading: string     // e.g. 'What I learnt'
    paragraphs: string[]
  }

  team: TeamMember[]

  cta: {
    heading: string     // e.g. 'Want the full deep dive?'
    body: string        // description above the button
  }
}
