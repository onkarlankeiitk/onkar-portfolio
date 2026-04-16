// lib/case-studies/dil-kyc.ts
import type { CaseStudy } from './types'

export const dilKyc: CaseStudy = {
  slug: 'dil-kyc',
  title: 'Diamond India Limited — KYC & Customer Onboarding Platform',
  tags: ['UX Design', 'Enterprise', 'FinTech', 'Bullion', 'Brand Strategy', 'Two-Sided Platform'],
  year: '2024',
  timeline: '6 Months',
  role: 'Senior UX Designer',
  client: 'Diamond India Limited',
  passwordEnvKey: 'DIL_KYC_PASSWORD',
  detailPath: '/work/dil-kyc-detail',

  hero: {
    banner: { src: '/case-studies/dil-kyc/hero-banner.png', type: 'image' },
    // SCREEN TO CREATE → Full-width hero banner:
    // DIL brand colours: black (#1C1C1C) background, gold/amber (#F5A623) accents.
    // Show the KYC portal interface on a dark navy background — the 3-step progress bar
    // (Basic Information → Application Form → Agreement) prominently centred.
    // DIL diamond logo top left. "ONLINE KYC" highlighted in amber in the nav.
    // Subtle texture or grid pattern behind the UI for depth.
    // Replace null with: { src: '/case-studies/dil-kyc/hero-banner.png', type: 'image' }
    headline: 'Diamond India Limited',
    subline: 'Digitising KYC and customer onboarding for India\'s only government-nominated private bullion supplier — cutting onboarding from 2 weeks to 5–7 days.',
  },

  overview: {
    context:
      'Diamond India Limited (DIL) is the only private-sector company in India with a Central Government nomination and licence to procure bullion — a distinction held since 2009. With 800 customers (the largest base of any private agency), 98% of whom are small jewellery exporters, DIL\'s core mission is to be the trusted, transparent, service-first trade body for India\'s gem and jewellery industry. Banks could take up to 2 years to onboard a bullion client and required a minimum order of ₹5 crores. DIL could onboard in a week and supply even 1 kg. The brand\'s entire differential rested on speed, access, and transparency — none of which were reflected in their paper-based KYC process.',
    problem:
      'Every new customer underwent a fully paper-based KYC and onboarding process involving 6+ manual handoffs across departments, no status visibility, no audit trail, and no way to submit or track an application without physically visiting DIL\'s office. The process took up to 2 weeks — undermining the very speed advantage DIL was promising to customers. Internal staff spent hours on data re-entry, chasing signatures, and managing physical document folders. The brand was promising "KYC as simple as ABC" but delivering the opposite.',
    direction:
      'Designed a two-sided digital platform: a customer-facing KYC portal (3-step online application covering Basic Information, Application Form with Firm/Proprietor/Director details, and a final Agreement) and an internal staff dashboard for reviewing, approving, querying, and managing applications. Also designed the KYC renewal flow for existing customers and a 7-section website IA to bridge the discovery-to-onboarding gap.',
    directionLabel: 'Solution',
  },

  metrics: [
    { value: '55%',  label: 'Onboarding time cut',      sub: '2 weeks → 5–7 days' },
    { value: '800+', label: 'Customers served',          sub: 'Largest private agency base' },
    { value: '3',    label: 'KYC form types designed',   sub: 'Sole proprietor, corporate, bullion' },
    { value: '7',    label: 'Site sections architected', sub: 'Home to Resources' },
  ],

  processIntro: 'From paper-based chaos to a platform that matches the brand promise',

  process: [
    {
      num: 'Step 01',
      title: 'Discovery — understanding DIL\'s market position and the brand differential',
      body: 'Began with a deep brand and business analysis. DIL operates in a highly regulated space — bullion banking — where competitors are HDFC Bank, ICICI Bank, SBI, PEC Limited, and MMTC-PAMP. All are large institutions run by professional bankers with opaque, slow, high-minimum KYC processes. DIL\'s real edge was structural: government-nominated status (since 2009), best-nominated agency 6 consecutive years, no minimum order size (vs. banks\' ₹5 crore minimum), and a philosophy where "KYC is a welcoming-in process" — not a filtering-out one. Mapped the brand around 8 core values: Professionalism, Service, Trust, Transparency, Efficiency, Reputation, Credibility, and Commercial Viability. The design brief was clear — every interface had to make these values tangible, not just claimed.',
      tags: ['Brand strategy audit', 'Competitive analysis (HDFC, ICICI, SBI, PEC, MMTC)', '8 brand value keywords', 'DIL differential mapping'],
      image: {
        src: null,
        // SCREEN TO CREATE → Competitive landscape + brand differential matrix:
        // Left panel: A comparison table — Banks vs DIL across 5 dimensions:
        //   KYC speed (2 years vs 1 week), Minimum order (₹5 cr vs 1 kg),
        //   KYC philosophy (filtering-out vs welcoming-in), Client size (large only vs all),
        //   Process (opaque vs transparent).
        // Right panel: The 8 brand value keywords in a tight grid layout using DIL amber (#F5A623).
        // Bottom: "One in a million. One in a bullion." — DIL's value proposition in large type.
        // Replace null with: '/case-studies/dil-kyc/step-01-discovery.png'
        alt: 'Competitive landscape and DIL brand differential matrix',
        hint: 'Create a Banks vs DIL comparison table + 8 brand keywords grid + value proposition — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'User research — the bullion customer persona and their journey',
      body: 'Built a detailed primary persona: Harish Gupta, 38, a fourth-generation jeweller handling the export division of a family business in Mumbai. Harish is tech-comfortable and growth-oriented — he wants to increase exports 2× in 2–3 years, use digital tools for logistics tracking, and access a reliable bullion supplier without being dependent on a bank that doesn\'t see value in his order size. His frustrations: lag in deliveries damaging his reputation, agencies that insist on large minimum orders, low working capital limiting flexibility, and no knowledge-base for navigating bullion procurement. Mapped two end-to-end customer journeys: the onboarding journey (Website Portal → KYC → Verification → Agreement → Purchase) and the gold buying journey (Order → DIL places order to int. suppliers → Bullion to vault → DIL communicates → Release order → Customer receives bullion). The journeys revealed three critical pain points: zero online touchpoint for KYC initiation, no visibility after submission, and no mechanism for renewal.',
      tags: ['Persona: Harish Gupta', 'Onboarding journey mapped', 'Gold buying journey mapped', '3 critical pain points identified'],
      image: {
        src: null,
        // SCREEN TO CREATE → Persona card + two journey flows:
        // Top: Harish Gupta persona card — photo placeholder, age 38, "Export Division, Family Jewellery Business".
        //   Left column: Goals (Increase exports 2x, use tech for logistics, reliable supplier).
        //   Right column: Frustrations (lag, minimum orders, low capital, no knowledge-base).
        //   Pull quote in amber: "I need bullions as and when required, in minimum time and hassle-free process."
        // Bottom: Two horizontal journey flows side by side:
        //   Journey 1 — Onboarding: [Website Portal] → [KYC] → [Verification] → [Agreement] → [Purchase]
        //   Journey 2 — Gold Buying: [Order] → [DIL places order] → [Vault] → [Communicate] → [Release] → [Receive]
        //   Pain points marked in red above the current (offline) version.
        // Replace null with: '/case-studies/dil-kyc/step-02-research.png'
        alt: 'Harish Gupta persona card and two customer journey flows',
        hint: 'Create persona card with goals/frustrations + two journey flows with pain points — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'Brand strategy & IA — designing the website to bridge the discovery gap',
      body: 'The core strategic insight: most potential DIL customers either don\'t know DIL exists, or know of DIL but don\'t understand what it offers that banks can\'t. The website\'s primary job is to bridge that information gap — converting visitors to applicants. Designed a 7-section site map: Home (brand statement, 25-year history, credibility metrics, bullion schemes, DIL USPs, and a "Let\'s begin with KYC" CTA), Services (Bullion — what it is, offerings, how it works / Rough Diamonds — offerings, how it works), KYC for Bullion (banner, onboarding explainer video, registration form), About Us (history, core values, government-nominated service commitment, credibility by years), Login (account info, orders, status tracking, order history), Support (Contact, FAQs), and Resources (Operational reports, Financial statements). The KYC section was framed around DIL\'s brand mantra: "KYC as simple as ABC. Onboarding as easy as 1-2-3."',
      tags: ['7-section site map', '"KYC as ABC" framing', 'Discovery → conversion IA', 'Content strategy'],
      image: {
        src: null,
        // SCREEN TO CREATE → Full site map diagram:
        // A clean tree-structure IA map showing all 7 top-level sections:
        //   Home | Services | KYC for Bullion | About Us | Login | Support | Resources
        // Each section expands downward with its child pages (see content above for exact nodes).
        // Use DIL amber for section headers, dark navy for child nodes, clean sans-serif type.
        // Bottom left: the "KYC as ABC / Onboarding as 123" two-column explainer in smaller type.
        // Replace null with: '/case-studies/dil-kyc/step-03-ia.png'
        alt: 'DIL website site map — 7-section information architecture',
        hint: 'Create a full IA tree diagram with all 7 sections and their children — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'KYC portal design — the 3-step customer application flow',
      body: 'Designed the customer-facing online KYC portal as a 3-step linear flow with a persistent progress stepper: Step 1 Basic Information (Firm name, Owner name, Contact person, Reference, Email, Phone, Monthly requirement in Kgs, Present supplier, Nature of business, Exporter type New/Existing, Type of jewellery Plain/Studded/Diamond) with contextual guidelines panel alongside. Step 2 Application Form — split by entity type: For Sole Proprietors: Full name, Father\'s name, DOB, PAN, Aadhaar, Passport, Residential address, Photograph with signature. For Corporates: Director details (Name, Designation, Father\'s name, DOB, PAN, Aadhaar, DIN, Passport, Address, Photo) with an "Add director" repeat module. For all: Firm Details (Constitution, Name, Incorporation date, Registered office, Phone, Email), Registration Details (PAN, GST, LOA, GJEPC/FIEO, Importer Exporter Code, Municipal registration, Customs OTC), Bank Details (Bank, Branch, Account type, Account number, MICR, 3-month statements, last audited financials), Chief Executive details, and Declarations & Signature. Step 3 Agreement — final agreement signed by DIL for download. A "Preview form" option before submission allowed customers to catch errors before submitting.',
      tags: ['3-step linear flow', 'Sole proprietor + corporate + bullion entity types', 'Guidelines sidebar', '"Preview before submit" pattern', 'Progressive disclosure'],
      image: {
        src: null,
        // SCREEN TO CREATE → 3-step KYC flow composite:
        // Show all 3 steps as separate screen panels arranged left to right or in a diagonal cascade:
        //   Screen 1 — Basic Information: DIL dark navy nav, "KYC process" heading, 3-node progress stepper
        //     (Step 1 active/green, Steps 2–3 grey), Guidelines sidebar on left, form fields on right.
        //     Fields: Firm name, Owner name, Contact, Reference, Email, Phone, Requirement (Kgs),
        //     Nature of business (dropdown), Exporter type (radio), Jewellery type (checkboxes). Amber "Submit" CTA.
        //   Screen 2 — Application Form (Sole Proprietor): Step 2 active. Accordion sections:
        //     Firm Details (open), Registration Details (collapsed), Bank Details (collapsed),
        //     Director / Proprietor details, Declarations.
        //   Screen 3 — Agreement: All 3 steps green/checked. Final agreement card with amber "Download" button.
        // Use Wireframe - 05.png or Wireframe - 06.png from the extracted DIL folder if they match.
        // Replace null with: '/case-studies/dil-kyc/step-04-kyc-flow.png'
        alt: '3-step KYC application flow — Basic Info, Application Form, Agreement',
        hint: 'Create 3-panel composite of the KYC flow screens — see detailed field-level instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 05',
      title: 'Staff dashboard — the internal approval and case management system',
      body: 'Designed the internal staff-facing dashboard for DIL\'s compliance and operations team. Each incoming KYC application appears as a named case (e.g. "Blueberry Diamonds India Limited") with a left-hand section navigator (Basic Information → Application Form A → Application Form B → Agreement) allowing reviewers to navigate the full application without losing context. Each section is collapsible. At the bottom of each section, three action buttons: Approve (amber filled), Reject (outline), Query (text link) — allowing section-level decisions rather than forcing a single all-or-nothing approval. Document downloads are inline ("Download doc" per registration field) so reviewers can verify documents without leaving the screen. The Agreement section shows the final DIL-signed agreement ready for download once all preceding sections are approved. The breadcrumb (DIL > Dashboard > Applicant Name) maintains spatial orientation across a long scrollable review page.',
      tags: ['Two-sided platform', 'Section-level Approve / Reject / Query', 'Collapsible accordion sections', 'Inline document download', 'Breadcrumb navigation'],
      image: {
        src: null,
        // SCREEN TO CREATE → Staff dashboard — full application review view:
        // Show the dashboard at a comfortable reading scale (not thumbnail).
        // Left sidebar (narrow): Section navigator with dots/steps:
        //   ● Basic Information (active/green)  ○ Application Form A  ○ Application Form B  ○ Agreement
        // Main content (wide): Currently showing Basic Information section (expanded):
        //   Applicant name header: "Blueberry Diamonds India Limited"
        //   Two-column field grid showing all Basic Info fields with filled-in values.
        //   Bottom: [Approve] (amber) | [Reject] (outline) | Query (text)
        //   Below that, Application Form A section (collapsed, with chevron to expand):
        //     Sub-sections: Firm Details, Registration Details, Bank Details, Chief Executive, Declarations
        //     Each registration field has value + "Download doc" button.
        //   Application Form B (collapsed): Sole Proprietor personal details + signature/stamp uploads.
        //   Agreement (collapsed): Final agreement download.
        // Top bar: DIL logo | breadcrumb "DIL > Dashboard > Blueberry Diamonds" | User avatar (Glenne Headly)
        // Replace null with: '/case-studies/dil-kyc/step-05-dashboard.png'
        alt: 'Staff approval dashboard — full application review with section-level actions',
        hint: 'Create the full staff dashboard showing all 4 sections with section-level Approve/Reject/Query actions — see detailed instructions above',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 06',
      title: 'KYC renewal & post-onboarding states',
      body: 'Designed the KYC renewal flow for existing customers — a post-onboarding touchpoint that most platforms neglect. When a customer\'s KYC is due for update, the KYC portal shows all 3 steps as completed (green checkmarks) with a prominent amber banner: "KYC is due for update!" The customer sees their original onboarding date and is presented with two clear paths: "Update details of the KYC" (amber CTA, takes them back into the form) or "I confirm, there are no changes in KYC" (outline CTA, one-click confirmation). This design eliminated the need for a phone call or email to DIL for routine renewals — a task that was previously entirely manual. Also designed the authenticated customer account section: account information, your orders, order status & tracking, and order history — creating a complete post-onboarding relationship layer.',
      tags: ['KYC renewal flow', 'Two-path confirmation design', 'Post-onboarding account section', 'Order tracking', 'Proactive status visibility'],
      image: {
        src: null,
        // SCREEN TO CREATE → KYC renewal screen + account section:
        // Left: KYC renewal screen — full 3-step stepper with all steps green (completed).
        //   Amber banner below: "KYC is due for update!" with bell/warning icon.
        //   Card below banner: "Onboarded on: 23 January, 2023" + explanatory paragraph.
        //   Two CTA buttons: [Update details of the KYC] (amber filled) | [I confirm, there are no changes] (outline)
        // Right: Authenticated account dashboard — show 4 sections:
        //   Account info (profile details), Your orders (list with status badges),
        //   Order status & tracking (timeline view for active order), Order history (table).
        //   Use the same dark navy + amber brand palette.
        // Replace null with: '/case-studies/dil-kyc/step-06-renewal.png'
        alt: 'KYC renewal flow and authenticated customer account dashboard',
        hint: 'Create the KYC renewal screen (all steps complete + amber banner + two CTAs) alongside the account dashboard — see instructions above',
        aspect: 'aspect-[16/9]',
      },
      imagePosition: 'left',
    },
  ],

  processMidBanner: {
    src: null,
    // SCREEN TO CREATE → Full-width platform overview banner:
    // A side-by-side composite at reduced scale showing the two sides of the platform:
    //   Left label: "Customer Portal" — shows the KYC Basic Information form screen.
    //   Right label: "Staff Dashboard" — shows the approval review screen.
    //   A vertical dividing line between them with a double-headed arrow and label "Two-sided platform".
    // Dark navy background, DIL logo top centre, amber accents on labels.
    // Replace null with: '/case-studies/dil-kyc/mid-banner.png'
    alt: 'Two-sided platform overview — customer portal vs staff dashboard',
  },

  preFindingsBanner: {
    src: null,
    // SCREEN TO CREATE → MacBook/browser mockup showcase:
    // Use one of the Wireframe PNG files from /Users/darshikadave/Downloads/DIL_extracted/DIL/
    // as the screen content inside a browser or MacBook frame.
    // Recommended: show the KYC Basic Information form (step 1) at full fidelity inside the device.
    // Dark navy page background, subtle amber glow or gradient behind the device.
    // DIL wordmark bottom left of the banner.
    // Replace null with: '/case-studies/dil-kyc/pre-findings-banner.png'
    alt: 'DIL KYC portal — final product showcase',
  },

  findings: [
    {
      num: 'Finding 01',
      title: 'The brand promise was the design brief',
      desc: 'DIL\'s entire competitive advantage over banks rested on three things: speed, accessibility, and a welcoming KYC process. Every design decision — from the 3-step linear flow to the "Preview before submit" option — was evaluated against this brief. The interface had to feel as approachable as DIL claimed its process was.',
    },
    {
      num: 'Finding 02',
      title: 'Section-level approval beats all-or-nothing decisions',
      desc: 'Early dashboard concepts used a single Approve/Reject action per application. Testing with staff revealed that applications rarely fail entirely — typically one section (e.g. bank details) needs a query while the rest is fine. Section-level Approve/Reject/Query actions allowed reviewers to process applications progressively, significantly reducing back-and-forth with customers.',
    },
    {
      num: 'Finding 03',
      title: 'Entity type branching is the hardest UX problem in compliance forms',
      desc: 'A sole proprietor, a corporate with 3 directors, and a bullion dealer have substantially different documentation requirements. Showing all fields to all users created overwhelming forms. Progressive disclosure by entity type — revealing only the relevant form modules — cut perceived form length by ~40% without removing any required fields.',
    },
    {
      num: 'Finding 04',
      title: 'KYC renewal is a retention moment, not an admin task',
      desc: 'The annual KYC renewal was treated internally as a compliance formality. Designing it as a prominent, status-visible touchpoint — with a clear "no changes" confirmation path — made renewals frictionless for existing customers and signalled to them that DIL valued their time. It reframed an obligation as a relationship moment.',
    },
  ],

  preConclusionBanner: {
    src: null,
    // SCREEN TO CREATE → 3-up screen grid:
    // Three screens at comfortable reading size, labelled below:
    //   1. "KYC Application Form — Sole Proprietor" — Step 2 screen showing Proprietor details section.
    //   2. "Staff Dashboard — Registration Details" — showing the registration numbers + Download doc buttons.
    //   3. "KYC Renewal" — showing the "KYC is due for update!" banner with two CTA buttons.
    // All in the dark navy + amber DIL palette. Each screen in a subtle shadow card.
    // Replace null with: '/case-studies/dil-kyc/pre-conclusion-banner.png'
    alt: 'Application Form, Staff Dashboard, and KYC Renewal screens',
  },

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'The most important insight on this project was that DIL\'s competitive advantage — speed, access, transparency — was being actively undermined by the paper-based process. The design work wasn\'t about making a form look good. It was about making the brand credible. Every interaction had to deliver what the brand was promising.',
      'Designing for a highly regulated, document-heavy domain taught me that form design is a discipline of its own. Field order, conditional visibility, progressive disclosure, inline guidance, and clear error states each carry real consequences when the information being collected is legally required and the users are small business owners who can\'t afford to make mistakes.',
      'Building a two-sided platform revealed a fundamental tension between customer experience and internal process. What felt simplest for the customer (one submit button, all decisions at the end) was hardest for the staff. What felt most efficient for staff (section-level actions, query per field) required careful design to avoid surfacing internal complexity to the applicant. Resolving that tension — cleanly, on both sides — was the central design challenge of the project.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke',        role: 'Senior UX Designer', url: 'https://www.linkedin.com/in/onkarlanke/' },
    { initials: 'MG', name: 'Mansi Goregaonkar',  role: 'Visual Designer',    url: 'https://www.linkedin.com/in/mansi-goregaonkar-76b044214/' },
    { initials: 'PC', name: 'Pratik Chavan',       role: 'Visual Designer',    url: 'https://www.linkedin.com/in/prchavan/' },
    { initials: 'PM', name: 'Priyanka',            role: 'Project Manager',    url: 'https://www.linkedin.com/in/tatzope/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers the full brand strategy document, competitive analysis, persona research, complete site map, all KYC form screens across entity types, the staff dashboard design, and the KYC renewal flow.',
  },
}
