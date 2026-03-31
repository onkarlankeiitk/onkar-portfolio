// lib/case-studies/dil-kyc.ts
import type { CaseStudy } from './types'

export const dilKyc: CaseStudy = {
  slug: 'dil-kyc',
  title: 'Digitisation of KYC & Customer Management',
  tags: ['UX Design', 'Fintech', 'Research'],
  year: '2024',
  timeline: '3 Months',
  role: 'Senior UX Designer',
  client: 'Diamond India Limited',
  passwordEnvKey: 'DIL_KYC_PASSWORD',
  detailPath: '/work/dil-kyc-detail',

  hero: {
    banner: null, // replace with: { src: '/case-studies/dil-kyc/banner.mp4', type: 'video', poster: '/case-studies/dil-kyc/poster.jpg' }
    headline: 'KYC & Onboarding',
    subline: 'Digitising India\'s largest bullion operator — cutting onboarding from 2 weeks to 5–7 days.',
  },

  overview: {
    context:
      'Diamond India Limited (DIL) is India\'s largest bullion supplier, handling thousands of KYC verifications and customer onboarding processes that were entirely paper-based. Every new customer required physical document submission, manual verification, and in-person approval across multiple departments.',
    problem:
      'The offline process took 2 weeks per customer, involved 6+ manual handoffs, had no audit trail, and created significant friction for both customers and internal staff. Errors were common and hard to trace. Staff spent hours on tasks that could be automated.',
    direction:
      'Digitised the entire KYC and customer management workflow into a web platform — reducing onboarding to 5–7 days, cutting employee processing time by 40%, and introducing full digital audit trails for compliance.',
    directionLabel: 'Solution',
  },

  metrics: [
    { value: '55%',    label: 'Onboarding time reduced',  sub: '2 weeks → 5–7 days' },
    { value: '40%',    label: 'Employee efficiency gain',  sub: 'Processing time cut' },
    { value: '6+',     label: 'Manual handoffs eliminated', sub: 'Full digital workflow' },
    { value: '100%',   label: 'Audit trail coverage',       sub: 'Compliance ready' },
  ],

  processIntro: 'From paper to platform',

  process: [
    {
      num: 'Step 01',
      title: 'Process mapping — understanding the existing workflow',
      body: 'Spent the first two weeks shadowing DIL\'s operations team, interviewing relationship managers and compliance staff, and mapping the full as-is KYC process. Identified 14 distinct touchpoints across 4 departments.',
      tags: ['Staff interviews', 'Process mapping', 'Pain point identification', '14 touchpoints mapped'],
      image: {
        src: null, // replace with: '/case-studies/dil-kyc/process-map.png'
        alt: 'As-is process mapping',
        hint: 'Replace with your as-is process map or service blueprint diagram',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 02',
      title: 'Information architecture — redesigning the flow',
      body: 'Redesigned the KYC flow from scratch — defining the minimum required fields, removing redundant steps, introducing parallel processing where verification could happen simultaneously, and building in automated status notifications.',
      tags: ['IA redesign', 'Parallel processing flows', 'Automated notifications', 'Field reduction'],
      image: {
        src: null, // replace with: '/case-studies/dil-kyc/ia-flow.png'
        alt: 'Redesigned KYC information architecture',
        hint: 'Replace with your redesigned flow diagram or IA document',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
    {
      num: 'Step 03',
      title: 'UI design — the customer & staff interfaces',
      body: 'Designed two interfaces: a customer-facing document submission portal (mobile-first) and an internal staff dashboard for verification, approval, and case management. Both built around the same design system for visual consistency.',
      tags: ['Customer portal', 'Staff dashboard', 'Mobile-first', 'Design system'],
      image: {
        src: null, // replace with: '/case-studies/dil-kyc/ui-screens.png'
        alt: 'Customer portal and staff dashboard UI',
        hint: 'Replace with your UI screens — customer portal and/or staff dashboard designs',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'right',
    },
    {
      num: 'Step 04',
      title: 'Usability testing & handoff',
      body: 'Conducted usability testing with 8 relationship managers and 6 pilot customers across 2 rounds. Iterated on form structure, error handling, and the approval workflow before handoff to the development team.',
      tags: ['2 rounds of testing', '8 staff participants', '6 customer participants', 'Dev handoff'],
      image: {
        src: null, // replace with: '/case-studies/dil-kyc/testing.png'
        alt: 'Usability testing sessions',
        hint: 'Replace with usability testing photos, session notes, or iteration comparison screenshots',
        aspect: 'aspect-[4/3]',
      },
      imagePosition: 'left',
    },
  ],

  findings: [
    {
      num: 'Finding 01',
      title: 'Paper creates invisible bottlenecks',
      desc: 'Documents would sit on a desk for days waiting for a signature that took 30 seconds. Digitising the approval step and adding status visibility cut average wait time per handoff from 2.5 days to 4 hours.',
    },
    {
      num: 'Finding 02',
      title: 'Staff trust needs to be designed for',
      desc: 'Relationship managers initially resisted the digital system — they worried about accountability and errors. Building in a full audit trail and "undo" capability at every step was the turning point in adoption.',
    },
    {
      num: 'Finding 03',
      title: 'Mobile-first was non-negotiable',
      desc: 'Over 70% of customers submitted documents from mobile. The original brief assumed desktop — reorienting to mobile-first mid-project was the right call and significantly improved completion rates.',
    },
  ],

  conclusion: {
    heading: 'What I learnt',
    paragraphs: [
      'This project taught me that enterprise UX is as much about change management as it is about interface design. The best-designed screen in the world fails if the people using it don\'t trust it or understand why it\'s better.',
      'Shadowing the operations team for two weeks before touching Figma was the most valuable investment in the project. The insights that came from watching real workflows — not just asking about them — shaped every major design decision.',
      'The 55% reduction in onboarding time came less from clever UI and more from eliminating unnecessary process steps. The design work was in figuring out what to remove, not what to add.',
    ],
  },

  team: [
    { initials: 'OL', name: 'Onkar Lanke', role: 'Senior UX Designer', url: 'https://www.linkedin.com/in/onkarlanke/' },
  ],

  cta: {
    heading: 'Want the full\ncase study?',
    body: 'The detailed breakdown covers the full as-is process map, IA redesign documentation, all UI screens, usability testing findings, and the before/after workflow comparison.',
  },
}
