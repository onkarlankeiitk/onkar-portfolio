// lib/case-studies/munk-pack.ts
import type { CaseStudy } from './types'

export const munkPack: CaseStudy = {
  slug: 'munk-pack',
  title: 'Munk Pack',
  tags: ['UX Research', 'Strategy', 'E-commerce', 'CPG'],
  year: '2023',
  timeline: '2 Weeks',
  role: 'Researcher & Lead',
  client: 'Munk Pack × Commongood',
  passwordEnvKey: 'MUNK_PACK_PASSWORD',
  detailPath: '/work/munk-pack-detail',

  hero: {
    banner: null, // replace with: { src: '/case-studies/munk-pack/banner.mp4', type: 'video', poster: '/case-studies/munk-pack/banner-poster.jpg' }
    headline: 'Munk Pack',
    subline: 'Research & UX strategy for a US health snacking brand — driving 24% sales growth in 90 days.',
  },

  overview: {
    context:
      'Munk Pack is a US-based snacking brand selling low-sugar, high-protein keto bars across 25,000+ retail stores (Kroger, Sprouts, Walmart) and online DTC. In collaboration with Commongood USA, we were tasked with evaluating the existing site and redesigning it from the ground up.',
    problem:
      'The site had navigation dead-ends with no onward CTAs, USPs buried below the fold, three redundant category pages, and zero lifestyle storytelling — making it purely transactional. Visitors weren't connecting with the brand or converting to repeat buyers.',
    direction:
      'A two-phase engagement: Phase I delivered a 14-point heuristic evaluation and competitive benchmarking across 6 CPG brands. Phase II produced user segmentation, journey maps, a full IA redesign, and Figma wireframes for all 10 pages — shifting the site from e-com to lifestyle storytelling.',
    directionLabel: 'Solution',
  },

  metrics: [
    { value: '24%',  label: 'Sales growth',           sub: 'Post-launch ~90 days' },
    { value: '130%', label: 'Engagement growth',       sub: 'Session depth & CTR' },
    { value: '32%',  label: 'Repeat orders',           sub: 'Via Subscribe & Save' },
    { value: '6',    label: 'CPG brands benchmarked',  sub: 'Across 17 UX parameters' },
  ],

  processIntro: 'How we got there',

  process: [
    {
      num: 'Step 01',
      title: 'Site audit — broad & structural',
      body: 'Reviewed the full existing site for information architecture, hierarchy, navigation flow, page interlinking, and storytelling. Mapped the entire site structure to identify dead-ends and content gaps before any qualitative work began.',
      tags: [
        'Mapped full IA and navigation structure',
        'Identified 14 UX heuristic issues across all pages',
        'Severity-rated each issue (Critical → Low)',
      ],
      image: {
        src: null, // replace with: '/case-studies/munk-pack/site-audit.png'
        alt: 'Site audit diagram',
        hint: 'Replace with your original sitemap diagram or site audit screenshot from Phase I PDF',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'Competitive analysis — 6 brands, 17 parameters',
      body: 'Benchmarked Kind, Magic Spoon, GoMacro, IQ Bar, Ratio, and High Key across 17 parameters jointly defined with Commongood — covering content hierarchy, navigation, social proof, lead gen, storytelling, filters, and mobile experience.',
      tags: [
        'Kind & Magic Spoon lead through lifestyle-first storytelling',
        'Munk Pack\'s 1g sugar USP is a competitive edge — but the site fails to communicate it',
      ],
      image: {
        src: null, // replace with: '/case-studies/munk-pack/competitive-bench.png'
        alt: 'Competitive benchmarking',
        hint: 'Replace with competitor website screenshots or the benchmarking table from Phase I',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'User segmentation & journey mapping',
      body: 'Mapped 4 audience segments — kids, students, working adults, seniors — each with distinct context, frustrations, and use-cases. Built customer journey flows identifying the critical connection point where most users were dropping off the existing site.',
      tags: ['Students 15–28', 'Working Adults 25–55', 'Seniors 60+', 'Kids (parents decide)'],
      image: {
        src: null, // replace with: '/case-studies/munk-pack/segmentation-map.png'
        alt: 'User segmentation and journey map',
        hint: 'Replace with the User Map: Segmentation & Behaviour Mapping diagram from Sitemap PDF',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'IA redesign & wireframes',
      body: 'Delivered a full IA overhaul and Figma wireframes for all 10 pages — homepage, shop, product detail, learn/nutrition (with Allulose explainer), rewards, about, contact, store locator, blog, and legal.',
      tags: [
        'Circular navigation',
        'Single filterable shop',
        'Subscribe & Save',
        'Net Carbs Calculator',
        'Lifestyle content per segment',
        'Prominent store locator',
      ],
      image: {
        src: null, // replace with: '/case-studies/munk-pack/figma-wireframes.png'
        alt: 'Figma wireframes — all 10 pages',
        hint: 'Replace with a full Figma canvas screenshot showing all page wireframes tiled together',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Navigation kills retention',
      desc: 'Dead-end pages with no onward CTAs meant users who landed on nutrition or blog content had no path back to products — the funnel leaked at every content touchpoint.',
    },
    {
      num: 'Finding 02',
      title: 'A content problem, not a product one',
      desc: 'Kind and Magic Spoon lead through lifestyle storytelling. Munk Pack\'s 1g sugar USP is a genuine competitive edge — the site just failed to communicate it visually or interactively.',
    },
    {
      num: 'Finding 03',
      title: 'Two buried conversion tools',
      desc: 'The Net Carbs Calculator and Store Locator — two uniquely high-value tools — had near-zero discoverability. Surfacing them drove significant engagement gains post-launch.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'The biggest shift in this project was reframing the brief — from "improve the website" to "shift the narrative from transaction to lifestyle." Munk Pack didn\'t have a product problem; they had a storytelling problem.',
      'Working across two agencies taught me how to clearly separate research deliverables from design execution — every artifact I produced had to be immediately actionable for Commongood\'s copywriters and visual designers without further interpretation.',
      'The 24% sales growth and 130% engagement increase within 90 days validated that research-led IA and content strategy — not visual redesign alone — is the highest-leverage intervention for underperforming DTC sites.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke',   role: 'Researcher & Project Lead', url: 'https://www.linkedin.com/in/onkarlanke/' },
    { initials: 'KI', name: 'Krithika Iyer', role: 'Visual Designer',           url: 'https://www.linkedin.com/in/krithika-iyer-596a3a1b0/' },
    { initials: 'PM', name: 'Priyanka',       role: 'Project Manager',           url: 'https://www.linkedin.com/in/tatzope/' },
  ],

  cta: {
    heading: 'Want the full\ndeep dive?',
    body: 'The detailed case study has everything — 14-point heuristic report, full competitive scoring, IA diagrams, user journey maps, all wireframes and annotated deliverables.',
  },
}
