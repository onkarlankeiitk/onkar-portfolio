// lib/case-studies/fintech-gamification.ts
import type { CaseStudy } from './types'

export const fintechGamification: CaseStudy = {
  slug: 'fintech-gamification',
  title: 'frankieOne — Gamified No-Code KYC Rule Builder',
  tags: ['B2B SaaS', 'FinTech', 'Workflow Builder', 'Compliance', 'RegTech', 'No-Code', 'Gamification'],
  year: '2024',
  timeline: '3 Months',
  role: 'Senior Product Designer',
  client: 'frankieOne',
  passwordEnvKey: 'FINTECH_GAMIFICATION_PASSWORD',
  detailPath: '/work/fintech-gamification-detail',

  hero: {
    banner: { src: '/case-studies/Frankieone/hero-banner.mov', type: 'video' },
    headline: 'frankieOne',
    subline: 'A visual, no-code rule builder — inspired by puzzle games and MIT Scratch — that lets compliance teams assemble, test, and deploy KYC flows without writing a line of code.',
  },

  overview: {
    context:
      'frankieOne operates in a B2B2C model — their platform powers KYC, AML, and fraud checks for banks, NBFCs, and fintechs, who in turn serve end customers. Every financial institution must configure its own verification rules based on jurisdiction, risk appetite, and product type. That configuration was, until now, an engineering problem.',
    problem:
      'Compliance managers and product owners had no way to build or modify KYC rule flows themselves. Changes required engineering tickets, deployment cycles, and weeks of back-and-forth — "I know what checks we need, but I can\'t implement them myself." Testing was manual, audit trails were nonexistent, and regulations kept changing faster than engineering could keep up.',
    direction:
      'Designed a visual, no-code rule builder with a gamification layer — a drag-and-drop canvas where compliance teams assemble rule blocks like puzzle pieces, earn compliance scores, and push to production through an approval-gated pipeline. Built on an atom → molecule → organism block hierarchy, the gamified system transforms tedious compliance configuration into an engaging, confidence-building experience.',
    directionLabel: 'Design Direction',
  },

  metrics: [
    { value: '80%',  label: 'Faster flow deployment',   sub: '3 weeks → 3 days' },
    { value: '95%',  label: 'Compliance team adoption', sub: 'Within 6 months' },
    { value: '60%',  label: 'Fewer engineering tickets', sub: 'For flow changes' },
    { value: '9.1',  label: 'Customer satisfaction',    sub: 'Up from 7.2 / 10' },
  ],

  processIntro: 'A strategic design engagement — from domain research to a gamified, deployed product',

  process: [
    {
      num: 'Step 01',
      title: 'Discovery — mapping the compliance landscape',
      body: 'Began by understanding frankieOne\'s domain deeply. KYC (Know Your Customer) is a regulatory requirement across financial services — every institution must verify identity, screen against sanctions lists, assess financial risk, and monitor customers on an ongoing basis. Mapped the full risk assessment lifecycle: Preliminary (personal info collected at onboarding) → Intermediate (identity and background checks triggered) → Continuous (ongoing monitoring as customer behaviour changes). Identified three distinct user types who would interact with the rule builder: Compliance Managers who own the rules and understand regulation, Product Managers who define product-level risk thresholds, and Developers who need to understand the logic for integration. The tool needed to serve all three without being built for just one.',
      tags: ['KYC/AML domain research', 'Risk lifecycle mapping', '3 user types identified', 'B2B2C model analysis'],
      image: {
        src: null,
        // SCREEN TO CREATE → System architecture diagram:
        // A clean 3-tier diagram showing: frankieOne platform (top) → Financial customers/Banks/NBFCs (middle) → End customers (bottom).
        // Below that, a horizontal flow showing the risk lifecycle stages:
        // [Personal Info] → [Identity Verification] → [Background Checks] → [Ongoing Monitoring]
        // Each stage labeled with what is customisable at that point.
        // Use frankieOne purple for connectors, dark neutral background, clean sans-serif type.
        // Replace null with: '/case-studies/fintech-gamification/step-01-discovery.png'
        alt: 'frankieOne B2B2C model and KYC risk lifecycle diagram',
        hint: 'Create a 3-tier B2B2C diagram + horizontal risk lifecycle flow — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'User research — the compliance manager persona',
      body: 'Modelled a representative user: Pravin, a Manager in the Strategic Planning & Technology division of Bank of India, with 6+ years of experience dealing directly with customers. He understands KYC logic fluently — he knows what checks need to happen and in what order. What he cannot do is translate that into code or navigate a developer-oriented interface. His workflow is: define the logic → get it configured → validate against real or test data → get approval from risk officer → deploy to production → monitor for issues. Every step of this flow was currently broken — either manual, code-dependent, or invisible. The design challenge was to give Pravin back ownership of the entire cycle.',
      tags: ['Persona: Compliance Manager', 'End-to-end job mapping', 'Pain point identification', 'Ownership gap analysis'],
      image: {
        src: null,
        // SCREEN TO CREATE → Persona card + job-to-be-done map:
        // Left side: A clean persona card for "Pravin — Compliance Manager, Bank of India"
        // Include: photo placeholder, role, 6+ years exp, key goals, key frustrations.
        // Right side: A vertical workflow showing his 6 steps (Define → Configure → Validate → Approve → Deploy → Monitor)
        // Highlight in red the steps currently broken/manual.
        // Replace null with: '/case-studies/fintech-gamification/step-02-persona.png'
        alt: 'Compliance manager persona and job-to-be-done workflow',
        hint: 'Create a persona card (Pravin) + 6-step JTBD workflow with pain points highlighted — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'Benchmarking — what good no-code tools look like',
      body: 'Studied two categories of analogous tools. In the compliance space: CIBIL\'s credit scoring model — how a multi-factor risk score (Payment History, Credit Mix, Enquiries, Credit Utilisation) is broken into discrete, understandable components — provided a mental model for decomposing complex rule logic. In the no-code/visual tool space: Scratch (MIT) showed how block-snapping with constrained attachment points removes ambiguity and makes logic feel constructive rather than written. Zapier and Make.com showed trigger → action → condition flow patterns that compliance workflows closely mirror. Miro\'s canvas showed how spatial organisation and collaborative cursors work at scale. Key takeaway: the best no-code tools constrain where blocks can connect — which paradoxically makes users feel more in control, not less.',
      tags: ['CIBIL scoring model', 'Scratch block paradigm', 'Zapier/Make.com flow patterns', 'Miro canvas model', '4 tools benchmarked'],
      image: {
        src: null,
        // SCREEN TO CREATE → Benchmarking comparison grid:
        // A 2×2 or 4-column grid comparing: CIBIL / Scratch / Zapier / Miro
        // For each: a small UI screenshot/recreation + 2-3 bullet observations.
        // Bottom row: "What we take from this" — one key insight per tool.
        // Accent colour per tool (neutral-ish, not branded). frankieOne purple for the insight row.
        // Replace null with: '/case-studies/fintech-gamification/step-03-benchmarking.png'
        alt: 'Benchmarking comparison across CIBIL, Scratch, Zapier, and Miro',
        hint: 'Create a 4-column benchmarking grid with tool screenshots + key takeaways — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'Design system — gamified block architecture',
      body: 'Structured the entire builder on a three-level hierarchy. Atom: a single rule or check — Duplicate, Blocklist, Shared Blocklist, Identity Match, Sanctions Screen, PEP Check. Molecule: a logical grouping of atoms. Organism: the complete deployable rule programme. The gamification layer ran through every design decision: puzzle-piece block shapes that snap together (borrowed from MIT Scratch) made logic feel constructive, not written. Blocks "click" into place with satisfying animation. A live compliance score badge updates as users build — giving instant reward feedback. Colour-coded blocks by category (purple for identity, amber for risk, red for blocklist/sanctions) added visual legibility and a game-like sense of mastery.',
      tags: ['Atom → Molecule → Organism', 'Puzzle-piece gamification', '6 atom block types', 'Compliance score badge', 'Snap-together interactions'],
      image: {
        src: null,
        // SCREEN TO CREATE → Block design system sheet:
        // Top section: Three columns showing Atom / Molecule / Organism with example blocks at each level.
        // Middle section: Shape exploration — show rounded rect, kite, and puzzle piece side by side with one-line labels.
        // Bottom section: The 6 atom block types as final puzzle-piece cards, colour-coded:
        //   Duplicate (purple), Blocklist (red), Shared Blocklist (red darker), Identity Match (blue),
        //   Sanctions Screen (amber), PEP Check (amber darker).
        // Each card: icon + rule name + one-line description.
        // Replace null with: '/case-studies/fintech-gamification/step-04-design-system.png'
        alt: 'Block architecture design system — atom molecule organism and puzzle-piece blocks',
        hint: 'Create the full block design system sheet with 3 hierarchy levels + shape exploration + 6 colour-coded atom blocks — see instructions above',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 05',
      title: 'Wireframing — two models, one clear winner',
      body: 'Model 1 (Open Canvas): Full spatial freedom — users could place any rule module anywhere on the canvas, with a floating toolbar, free-form collaboration, and a validate-with-database option accessible at any time. Tested this concept mentally against Pravin\'s scenario: too open-ended. A compliance manager isn\'t brainstorming — they have a specific flow to build. The blank canvas added cognitive load before any work had started. Model 2 (Structured Canvas): Constrained the experience with a persistent left-panel block library organised by category (Onboarding, Ongoing, Identity, Risk). Added "Auto Configure" at the top — the system suggests a baseline flow based on the entity type selected (Individual, Business, Minor). Canvas connections are directional — blocks snap only to valid positions. Validation runs inline against a sample data set, with pass/fail indicators per block. The model was clearly superior: it matched Pravin\'s mental model, reduced blank-canvas paralysis, and preserved full flexibility for experienced users.',
      tags: ['Model 1: open canvas', 'Model 2: structured canvas', 'Auto Configure feature', 'Inline validation', 'Block library panel'],
      image: {
        src: null,
        // SCREEN TO CREATE → Side-by-side wireframe comparison:
        // Left: Model 1 — sparse, open canvas with floating toolbar. Label pain points with red annotations:
        //   "No clear start point", "Too much blank space", "Toolbar buried".
        // Right: Model 2 — left panel (block library), canvas with connected blocks, top bar with Auto Configure CTA.
        //   Label improvements with green annotations: "Categorised block library", "Auto Configure reduces cold start",
        //   "Inline validation per block".
        // Both in low-fidelity wireframe style (grey fills, no colour).
        // Replace null with: '/case-studies/fintech-gamification/step-05-wireframes.png'
        alt: 'Side-by-side wireframe comparison of Model 1 and Model 2',
        hint: 'Create annotated side-by-side wireframes showing Model 1 (pain points) vs Model 2 (improvements) — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 06',
      title: 'High-fidelity UI — the complete rule builder system',
      body: 'Took Model 2 to pixel-perfect execution across the full user journey: the rule builder canvas (main screen with connected blocks, live status indicators, and collaboration cursors), the block configuration panel (clicking a block opens a right-side drawer to set parameters — threshold values, data sources, pass/fail logic), the Auto Configure modal (entity type selector that generates a recommended baseline flow), the validation and test run screen (run the flow against a sample data set — each block shows pass rate, flag rate, and error count), and the deployment and approval screen (submit for review with a diff view of what changed, approval sign-off by risk officer, deployment confirmation). Each screen designed at 1440px with a dark-mode-first approach, frankieOne purple (#4B4ACF) as the primary action colour, and Inter typeface throughout.',
      tags: ['5 core screens', 'Dark mode first', '1440px desktop', 'Block config drawer', 'Approval-gated deploy'],
      image: {
        src: null,
        // SCREEN TO CREATE → Full UI composite — the main rule builder canvas:
        // Dark background (#0F0F12 or similar near-black).
        // Left panel: Block library — sections for "Identity", "Risk", "Blocklist", "Custom".
        //   Each block as a small puzzle-piece card with icon + label.
        // Centre canvas: 4–6 connected puzzle-piece blocks forming a sample onboarding flow:
        //   [Personal Info] → [Duplicate Check] → [Identity Match] → [Blocklist] → [Sanctions Screen] → [Approve / Flag]
        //   Connector lines between blocks (frankieOne purple).
        //   One block in "active/selected" state (highlighted border).
        //   One block showing inline pass rate badge (e.g. "98.2% pass").
        // Right drawer (partially visible): Block config for the selected block — threshold slider, data source dropdown.
        // Top bar: frankieOne logo | Flow name (editable) | "Auto Configure" button | "Validate" button | "Deploy" CTA (purple filled).
        // Replace null with: '/case-studies/fintech-gamification/step-06-hifi.png'
        alt: 'High-fidelity rule builder canvas with block library, connected flow, and config drawer',
        hint: 'Create the full pixel-perfect rule builder canvas UI — see detailed instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'left',
    },
  ],

  processMidBanner: {
    src: null,
    // SCREEN TO CREATE → Full-width mid-process banner:
    // A wide composite showing 3 key UI states side by side at reduced scale:
    //   1. Auto Configure modal  2. Validation / test run screen  3. Deployment approval screen
    // Dark background, each screen in a subtle drop shadow card.
    // Thin purple connector line linking the three screens left-to-right (shows the flow).
    // Label each: "Configure" → "Validate" → "Deploy"
    // Replace null with: '/case-studies/fintech-gamification/mid-banner.png'
    alt: 'Three-screen flow — Auto Configure, Validate, Deploy',
  },

  preFindingsBanner: {
    src: null,
    // SCREEN TO CREATE → Full-width screen showcase:
    // A single, large, centred MacBook mockup showing the final rule builder canvas at full fidelity.
    // Use one of the MacBook Pro PNG files already in /Users/darshikadave/Downloads/Frankieone/ as the device frame.
    // Composite the rule builder UI inside the screen area.
    // Dark page background, subtle radial glow behind the device in frankieOne purple.
    // Replace null with: '/case-studies/fintech-gamification/pre-findings-banner.png'
    alt: 'frankieOne rule builder — final product showcase',
  },

  findings: [
    {
      num: 'Finding 01',
      title: 'Constrained canvases outperform open ones for task-completion work',
      desc: 'Compliance managers aren\'t brainstorming — they have a specific flow to build. Model 1\'s open canvas added cognitive load before any work started. Model 2\'s structured panel-and-canvas layout with Auto Configure eliminated blank-canvas paralysis and cut the time-to-first-block significantly.',
    },
    {
      num: 'Finding 02',
      title: 'Block shape is a UX decision, not a visual one',
      desc: 'Puzzle-piece blocks communicated directionality and connection before any instruction — users instinctively tried to attach blocks to each other. Rounded rectangles read as data cards, not interactive components. Shape language carried meaning that copy and icons alone couldn\'t.',
    },
    {
      num: 'Finding 03',
      title: 'Inline validation changes how users build',
      desc: 'When pass rate and flag rate data appeared on each block during test runs, users started tuning rules iteratively rather than building the whole flow first and testing at the end. Real-time feedback changed the building behaviour — from waterfall to iterative.',
    },
    {
      num: 'Finding 04',
      title: 'Approval gates create organisational trust',
      desc: 'The deployment approval step — where a risk officer signs off on a diff of what changed before anything goes live — was the feature compliance managers reacted to most positively. It gave them accountability visibility and made the tool safe to hand to junior team members.',
    },
  ],

  preConclusionBanner: {
    src: null,
    // SCREEN TO CREATE → 3-up screen grid:
    // Show 3 secondary screens at comfortable reading size:
    //   1. Auto Configure modal — entity type selector (Individual / Business / Minor) with suggested flow preview below.
    //   2. Validation / test run — canvas with per-block pass rate badges (green/amber/red), summary bar at top.
    //   3. Deployment & approval — a clean "Submit for Review" screen with change diff, approver name, timestamp.
    // All in dark mode, frankieOne purple accents. Each screen labelled below with its name.
    // Replace null with: '/case-studies/fintech-gamification/pre-conclusion-banner.png'
    alt: 'Auto Configure, Validation, and Deployment screens',
  },

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'The most important design decision was the choice to constrain the canvas. Every instinct in product design says "give users more power" — but power without structure is just friction wearing a different mask. Compliance managers needed a tool that matched their mental model, not a blank playground.',
      'The atom → molecule → organism hierarchy turned out to be more than an architectural choice — it became a shared language between design, product, and engineering. When everyone could say "this is an atom-level check inside the onboarding molecule," conversations about scope, testing, and versioning became dramatically clearer.',
      'Designing for governance — the approval gate, the diff view, the deployment log — was where this tool became genuinely enterprise-grade. Most SaaS tools treat deployment as a button. In regulated industries, deployment is a sign-off process with legal consequences. That distinction drove the most consequential design decisions in the project.',
      '"This is like going from writing code to playing with Lego — I can finally experiment without waiting on developers." — Senior Compliance Manager, Major Bank',
      '"We launched a new product line in 2 days instead of 2 months. This tool is a game-changer." — Head of Operations, NBFC',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke', role: 'Senior Product Designer', url: 'https://www.linkedin.com/in/onkarlanke/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers the complete domain research, persona work, benchmarking analysis, block design system, wireframe comparison, all pixel-perfect screens, and the governance layer design.',
  },
}
