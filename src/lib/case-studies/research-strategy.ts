// lib/case-studies/research-strategy.ts
// This is the Munk Pack project — slug matches the homepage card link
import type { CaseStudy } from './types'

export const researchStrategy: CaseStudy = {
  slug: 'research-strategy',
  title: 'Research & Strategy for Growth',
  tags: ['UX Research', 'Strategy', 'E-commerce', 'CPG'],
  year: '2023',
  timeline: '2 Weeks',
  role: 'Researcher & Project Lead',
  client: 'Munk Pack × Commongood USA',
  passwordEnvKey: 'RESEARCH_STRATEGY_PASSWORD',
  detailPath: '/work/research-strategy-detail',

  hero: {
    // Once you have an asset, replace null with:
    // { src: '/case-studies/research-strategy/banner.mp4', type: 'video', poster: '/case-studies/research-strategy/poster.jpg' }
    // or for an image/gif:
    // { src: '/case-studies/research-strategy/banner.gif', type: 'image' }
    banner: { src: '/case-studies/research-strategy/hero-banner.png', type: 'image' },
    headline: 'Munk Pack - UX Evaluation, brand communication & strategy',
    subline: 'Research & UX strategy for a US health snacking brand — driving 24% sales growth in 90 days.',
  },

  overview: {
    context:
      'Munk Pack is a US-based snacking brand selling low-sugar, high-protein keto bars across 25,000+ retail stores (Kroger, Sprouts, Walmart) and online DTC. In collaboration with Commongood USA, we evaluated the existing site and delivered a research-backed redesign strategy.',
    problem:
      'Design intervention for strengthening brand positioning, strategic communication for growth',
    direction:
      'A two-phase engagement: Phase I delivered a 14-point heuristic evaluation and competitive benchmarking across 6 CPG brands. Phase II produced user segmentation, journey maps, a full IA redesign, and Figma wireframes for all 10 pages.',
    directionLabel: 'Solution',
  },

  metrics: [
    { value: '24%',  label: 'Sales growth',          sub: 'Post-launch ~90 days' },
    { value: '130%', label: 'Engagement growth',      sub: 'Session depth & CTR' },
    { value: '32%',  label: 'Repeat orders',          sub: 'Via Subscribe & Save' },
    { value: '6',    label: 'Brands benchmarked',     sub: 'Across 17 UX parameters' },
  ],

  processIntro: 'How we got there',

  process: [
    {
      num: 'Step 01',
      title: "Key Persona's, user segmentation and Behavior mapping",
      body: '',
      bodyPoints: [
        'We mapped the user\'s key personas, their lifestyle & habits, use cases in order to understand how the products serve them and in what contexts.',
        'We found primary decision makers who are responsible for final decisions.',
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-01-research.png', // replace with: '/case-studies/research-strategy/site-audit.png'
        alt: 'Original site audit diagram',
        hint: 'Replace with your original sitemap or site audit screenshot from Phase I PDF',
        aspect: 'aspect-[7/4]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'User Journey/Customer acquisition',
      body: '',
      bodyPoints: [
        'Physical stores nearby are an important factor in customer acquisition to build trust, even if they are buying online. Hybrid journeys are more common.',
        'People like to try sample packs consisting variety of products before committing to a single one or their favourite 1 or 2 packs.',
        'Closed social circles like gym-goers, athletes, or fitness influencers have more impact during the product research phase.',
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-02-journey.png',
        alt: 'User journey and product acquisition pipeline',
        hint: 'Add user journey / pipeline diagram here',
        aspect: 'aspect-[16/7]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 03',
      title: 'Competition mapping: 6 brands across 17 parameters',
      body: '',
      bodyPoints: [
        'Product line differentiation from other brands, helping in drafting unique content and storyline.',
        'Cross-channel integrations.',
        'Tone of voice and product language.',
        'Served as a base for new architecture.',
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-03-competition.png',
        alt: 'Competition mapping — 6 brands across 17 parameters',
        hint: 'Add competitive mapping diagram or table here',
        aspect: 'aspect-[16/7]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 04',
      title: 'Heuristic evaluation',
      body: 'A simple heuristic evaluation helped us in finding out some critical misleads and structural opportunities for improvements',
      bodyPoints: [],
      labeledPoints: [
        {
          label: 'Match between system and real world',
          body: 'The shop is organized the way the brand thinks, not the way customers shop. Categories follow product lines (Nut & Seed, Granola). Buyers shop by goal or occasion: pre-workout, dessert swap, low-carb travel snack.',
        },
        {
          label: 'Recognition rather than recall',
          body: 'The proof isn\'t where the decision happens. Keto buyers decide on net carbs and ingredients, but those facts sit below the CTA or on a separate Learn page. Users have to go looking for the reason to buy, or remember it, at the moment they commit.',
        },
        {
          label: 'Aesthetic and minimalist design',
          body: 'The wrong trust signal is taking up prime space. Generic press logos compete with the USP strip and mean little to a niche diet audience, which trusts peers (lifters, keto creators, diabetic parents) over publications. The logos add noise to the above-the-fold area without adding credibility.',
        },
        {
          label: 'Flexibility and efficiency of use',
          body: 'Repeat buyers get no shortcut. Snack bars are a habit purchase, yet reordering takes the same path as a first visit. Subscribe & Save is a small radio button, and there\'s no quick-reorder route for the customers who bring in the recurring revenue.',
        },
        {
          label: 'Consistency and standards',
          body: 'Product cards break e-commerce conventions. Price, pack size, and the subscription option shift position from card to card. Users arrive expecting the Amazon or Shopify pattern, so every inconsistency adds friction at checkout intent.',
        },
        {
          label: 'Help and documentation',
          body: 'The educational content is written to be read, but users only scan it. The Learn page runs on paragraphs and lists. People open it to confirm a decision they\'ve nearly made, so it needs direct comparisons, like "2g net carbs vs 20g in a regular granola bar."',
        },
        {
          label: 'Visibility and affordance',
          body: 'Interactive elements don\'t look interactive. The bar-type filters on the Shop page and the Contact Us options read as labels. Users can\'t tell at a glance what they can click.',
        },
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-04-heuristic.png',
        alt: 'Heuristic evaluation — annotated site screenshots',
        hint: 'Heuristic evaluation diagram',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 05',
      title: 'Mapping Information Design: Structure, hierarchy',
      body: '',
      bodyPoints: [],
      labeledPoints: [
        {
          label: 'Dynamic content Structure',
          body: 'The website does not have a circular navigation structure — users should not come to a dead end while going through the site. Proper CTAs and redirection links should be inserted so that the user is continuously engaged on different pages and content. For example: after giving nutrition info, show Products again and redirect to Products on Shop page.',
        },
        {
          label: 'USPs for Marketing',
          body: 'Nutrition and ingredients are great value-proposing info and have a good USP from a marketing perspective. Show a glance of the info on the home page and interlink to detail internal pages.',
        },
        {
          label: 'Highlight More Products',
          body: 'We prioritize these opportunities and integrate them into our product development and improvement processes.',
        },
        {
          label: 'Tools',
          body: 'Net Carbs Calculator and Store Locator both are important interactive tool elements and can be positioned on top of the site or shown on the home page with proper CTA.',
        },
        {
          label: 'Simplify shop page',
          body: 'Shop page can be a single page, with a category and filters. Filters should help segregate required items and thus should be obvious and visually prioritized. This will further simplify the page. Repetition of testimonials and FAQs on each category page is not necessary — instead, link stores, blog posts, etc.',
        },
        {
          label: 'Include genuine stories of impact',
          body: 'One or two stories from blog should be highlighted on home page.',
        },
        {
          label: 'Value add using offline stores',
          body: 'Offline stores should be highlighted on home.',
        },
        {
          label: 'Restructuring',
          body: 'The Learn page needs rethinking — similar things should be grouped for easy understanding. Our Mission should be put into the Our Story section. The Nutrition section should be broader and more detailed. Add a separate section for ingredients or if combining with Nutrition section, rewrite the headline as "Ingredients and Nutrition".',
        },
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-05-ia.png',
        alt: 'Information architecture — structure and hierarchy mapping',
        hint: 'IA structure and hierarchy diagram',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 06',
      title: 'Direction & strategy',
      body: '',
      bodyPoints: [],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-06-direction.png',
        alt: 'Context & direction — Primary USPs, product offerings and strategic direction',
        hint: 'Direction and strategy diagram',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 07',
      title: 'Communication strategy',
      body: '',
      bodyPoints: [],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-07-comms.png',
        alt: 'Communication strategy — messaging pillars and brand positioning',
        hint: 'Communication strategy diagram',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 08',
      title: 'New architecture: Information Design',
      body: '',
      bodyPoints: [
        'Structuring by customer behavior during shopping by goal, occasion, lifestyle, rather than internal product line categories.',
        'Addition of tools like net carbs calculator, store locator at the top of hierarchy, making them discoverable.',
        'Circular navigation for more connecting dots and tell more engaging cohesive story across content, product & conversion touchpoints.',
        'Unified product, nutrition, and storytelling content into a single coherent flow, reducing the cognitive load of switching between separate Learn and Shop sections.',
      ],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-08-new-ia.png',
        alt: 'New information architecture — full site structure redesign',
        hint: 'New IA diagram',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },

    {
      num: 'Step 09',
      title: 'Wireframes & visual Design',
      body: '',
      bodyPoints: [],
      tags: [],
      image: {
        src: '/case-studies/research-strategy/step-09-wireframes.png',
        alt: 'Wireframes and visual design',
        hint: 'Add wireframes & visual design assets here',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
      subSections: [
        {
          headline: '3D pack styling',
          body: 'Animated 3D pack styling to actually match real world packaging.',
          image: { src: '/case-studies/research-strategy/step-09-sub-01.png', alt: '3D pack styling' },
        },
        {
          headline: 'Active ingredients',
          body: 'Hover action shows active ingredients, bringing in transparency.',
          image: { src: '/case-studies/research-strategy/step-09-sub-02.png', alt: 'Active ingredients' },
        },
        {
          headline: 'Physical store locator',
          body: 'Bridging the digital and physical channels of product journey.',
          image: { src: '/case-studies/research-strategy/step-09-sub-03.png', alt: 'Physical store locator' },
        },
        {
          headline: 'Nutrition info at forefront',
          body: 'Nutritional info section to educate users on the real ingredients that go in the bar.',
          image: { src: '/case-studies/research-strategy/step-09-sub-04.png', alt: 'Nutrition info at forefront' },
        },
        {
          headline: 'Real ingredients, real stories',
          body: 'Real stories across social channels to match with behavioral habits of buyers.',
          image: { src: '/case-studies/research-strategy/step-09-sub-05.png', alt: 'Real ingredients, real stories' },
        },
      ],
    },

  ],

  processMidBanner: { src: null, alt: 'Strategy overview' },

  preFindingsBanner: { src: null, alt: 'IA and wireframes overview' },

  preConclusionBanner: { src: '/case-studies/research-strategy/conclusion.banner.png', alt: 'conclusion' },

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
      'Working across 2 studios with top experts, made sure every artifact produced, had to be immediately actionable.',
      'Aligning general behaviour into digital ecosystem workflows does wonders for the impact.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke',   role: 'UX & Project Lead', url: 'https://www.linkedin.com/in/onkarlanke/' },
    { initials: 'KI', name: 'Krithika Iyer', role: 'Visual Designer',           url: 'https://www.linkedin.com/in/krithika-iyer-596a3a1b0/' },
    { initials: 'PM', name: 'Priyanka',       role: 'Project Manager',           url: 'https://www.linkedin.com/in/tatzope/' },
  ],

  cta: {
    heading: 'Want the full\ndeep dive?',
    body: 'The detailed case study has everything — 14-point heuristic report, full competitive scoring, IA diagrams, user journey maps, all wireframes and annotated deliverables.',
  },
}
