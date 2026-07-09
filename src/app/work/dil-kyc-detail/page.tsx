'use client'

// app/work/dil-kyc-detail/page.tsx
// Full custom detail page — Diamond India Limited · KYC & Onboarding Platform
// Brand: dark navy (#0D1B2A) + green (#0fa475) + white

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NAVY  = '#0D1B2A'
const AMBER = '#0fa475'

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Pill({ children, amber }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full border font-medium ${
      amber
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
    }`}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase font-semibold text-amber-500 mb-4">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="border-t border-zinc-100 my-20 md:my-28" />
}

// ProcessImage — shows real image at its natural dimensions
function ProcessImage({ src, label }: {
  src?: string | null; label: string; hint?: string; aspect?: string; dark?: boolean
}) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="w-full rounded-2xl overflow-hidden shadow-sm"
    >
      <img src={src} alt={label} className="w-full h-auto block" />
    </motion.div>
  )
}

function ImageCaption({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs mt-3 text-center ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{children}</p>
  )
}

// ─── STICKY NAV ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'moment',    label: 'The Moment' },
  { id: 'brief',     label: 'Brief' },
  { id: 'strategy',  label: 'Strategy' },
  { id: 'research',  label: 'Research' },
  { id: 'personas',  label: 'Personas' },
  { id: 'journey',   label: 'Journey' },
  { id: 'ia',        label: 'IA' },
  { id: 'kyc',       label: 'KYC Flow' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'renewal',   label: 'Renewal' },
  { id: 'comms',     label: 'Emails' },
  { id: 'qa',        label: 'QA' },
  { id: 'reflect',   label: 'Reflection' },
  { id: 'team',      label: 'Team' },
]

function StickyNav() {
  const [active, setActive] = useState(NAV_ITEMS[0].id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={`text-left text-xs font-medium transition-all duration-200 ${
            active === item.id
              ? 'text-green-400 translate-x-1'
              : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          {active === item.id && <span className="mr-1.5">—</span>}
          {item.label}
        </button>
      ))}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="overflow-hidden" style={{ backgroundColor: NAVY }}>

      {/* Grid texture */}
      <div className="absolute inset-x-0 top-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#0fa475 1px, transparent 1px), linear-gradient(90deg, #0fa475 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        height: '100%',
      }} />

      {/* Row 1: Back + Tags */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-16 md:pt-20 pb-6 md:pb-8 flex-wrap gap-3">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-400 text-xs hover:text-green-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to work
        </Link>
        <div className="flex gap-2 flex-wrap justify-end">
          {['UX Design', 'Enterprise', 'Bullion'].map(t => (
            <span key={t} className="inline-block text-xs px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 font-medium">{t}</span>
          ))}
        </div>
      </div>

      {/* Row 2: Headline + description */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 px-8 md:px-16 lg:px-24 pb-8 md:pb-12"
      >
        <p className="text-green-400 text-xs tracking-[0.22em] uppercase font-medium mb-3">Diamond India Limited</p>
        <h1 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight">
          KYC, Onboarding & <span style={{ color: '#0fa475' }}>Customer management portal design</span>
        </h1>
      </motion.div>

      {/* Row 3: Banner */}
      <div className="relative overflow-hidden aspect-video">
        <video
          src="/dil-hero-banner.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Row 4: Meta */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-8 md:px-16 lg:px-24 py-6 md:py-10 border-t border-zinc-800"
      >
        <div className="flex flex-wrap gap-8">
          {[
            { label: 'Client',    value: 'Diamond India Limited' },
            { label: 'Role',      value: 'Senior UX Designer' },
            { label: 'Timeline',  value: '8 Months' },
            { label: 'Year',      value: '2024' },
          ].map(m => (
            <div key={m.label}>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{m.label}</p>
              <p className="text-zinc-200 text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-600 text-xs italic max-w-xs hidden md:block">
          "For banks, KYC is a filtering-out process. For DIL, KYC is a welcoming-in process."
        </p>
      </motion.div>
    </section>
  )
}

// ─── SECTION: THE MOMENT ──────────────────────────────────────────────────────
function TheMoment() {
  return (
    <section id="moment" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>00 — The Moment</SectionLabel>

        <div className="max-w-3xl">
          <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-10 leading-tight">
            A stack of paper forms on a desk in Mumbai
          </h2>

          <p className="text-zinc-700 text-xl leading-relaxed mb-8">
            There was a desk in DIL's Mumbai office with a literal stack of physical KYC applications on it. Each one represented a small jewellery exporter — somewhere in Surat, Jaipur, Kolkata — waiting to find out if they were approved. Waiting to find out anything, actually. No one had told them the application had even arrived.
          </p>

          <p className="text-zinc-500 text-base leading-relaxed mb-6">
            The stack moved slowly. Each application went through 6+ manual handoffs. A reviewer would look at it, write a query on a sticky note, pass it to someone else who would call the customer. The customer would courier new documents. The documents would arrive and join the bottom of a different pile. Two weeks, minimum. Often three.
          </p>

          <p className="text-zinc-500 text-base leading-relaxed mb-6">
            The thing that made this strange: DIL's entire competitive pitch against the banks was speed, access, and a welcoming KYC. They would say this to prospective customers at trade events. GJEPC conferences. Industry dinners. "We get you onboarded fast. We don't make it hard." And then send someone a paper form.
          </p>

          <p className="text-zinc-800 text-lg font-medium leading-relaxed mb-6">
            The process was contradicting the brand. Every week it ran like that, it was eroding exactly the trust DIL was trying to build.
          </p>

          <p className="text-zinc-500 text-base leading-relaxed">
            That desk — and what it represented — was where this project started. Not from a product roadmap. From a real observation about a real gap between what a company promised and what it delivered.
          </p>
        </div>

        <div className="mt-16 border-l-4 border-green-400 pl-8 max-w-2xl">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">What the data showed</p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { v: '5 weeks → 2 weeks', l: 'Average onboarding time' },
              { v: '6+',      l: 'Manual handoffs per application' },
              { v: '0',       l: 'Status updates a customer received' },
            ].map(m => (
              <div key={m.l}>
                <div className="text-3xl font-bold text-green-500 mb-1">{m.v}</div>
                <div className="text-zinc-500 text-xs leading-snug">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: BRIEF ───────────────────────────────────────────────────────────
function Brief() {
  return (
    <section id="brief" className="px-8 md:px-16 lg:px-24 py-10 md:py-16 lg:py-20 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>01 — The Brief</SectionLabel>

        <div className="relative mb-20 pl-8 pr-8 mt-12">
          {/* Left bracket */}
          <div className="absolute left-0 top-0 bottom-0 w-4 border-l-2 border-t-2 border-b-2 border-zinc-300" />
          {/* Right bracket */}
          <div className="absolute right-0 top-0 bottom-0 w-4 border-r-2 border-t-2 border-b-2 border-zinc-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-6">
            {[
              {
                head: 'Context',
                body: 'Diamond India Limited is India\'s only govt nominated private bullion supplier, with a clear motive of supporting small jewellery exporters. Established in 2009 by members of the GJEPC council, located in the finance hub of BKC, Mumbai, it serves more than 800+ customers all over India — the largest base for any bullion supplier.',
              },
              {
                head: 'The situation',
                body: 'Every new customer from all over India had to go through a tedious paper-based KYC with only phone call & email based status updates. DIL staff had to manage a lot of paperwork, queries, communication to customers and manual data management — reducing their efficiency and increasing onboarding time.',
              },
              {
                head: 'Solution',
                body: 'KYC online application portal for customers with tracking and minute updates via automated mail & SMS system. A multi-layered approval system for DIL staff for reviewing department-wise tasks and allocations and subsequent contracting for customer onboarding and orderbook.',
              },
            ].map(col => (
              <div key={col.head}>
                <h3 className="text-zinc-900 font-semibold text-base mb-3">{col.head}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project phases */}
        <div className="mt-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400 mb-6">Project phases</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-8" style={{ backgroundColor: NAVY }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: AMBER }}>Phase I</p>
              <h3 className="text-white text-xl font-bold">KYC & customer management</h3>
            </div>
            <div className="rounded-2xl p-8 border-2 border-dashed border-zinc-200">
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold mb-3">Phase II</p>
              <h3 className="text-zinc-400 text-xl font-bold">Order management, delivery</h3>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: BRAND STRATEGY ──────────────────────────────────────────────────
function Strategy() {
  const keywords = ['Professionalism', 'Service', 'Trust', 'Transparency', 'Efficiency', 'Reputation', 'Credibility', 'Commercially Viable']

  return (
    <section id="strategy" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>02 — Brand Strategy</SectionLabel>

        {/* Overall strategy map */}
        <div className="mb-16">
          <img
            src="/str_DIL.png"
            alt="Overall strategy map"
            className="w-full rounded-2xl"
          />
        </div>

        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Competition mapping & why DIL is better
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          We analysed DIL&apos;s market position and identified core offerings that made DIL different, to make it as a core strategy for direction.
        </p>

        {/* Banks vs DIL comparison */}
        <div className="mb-20">
          <p className="text-zinc-500 text-xs tracking-widest uppercase mb-6">The competitive differential</p>
          <img src="/TCD_DIL.png" alt="The competitive differential" className="w-full rounded-2xl" />
        </div>

        {/* Brand keywords */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: AMBER }}>8 brand value keywords</p>
          <div className="flex flex-wrap gap-3">
            {keywords.map(k => (
              <span key={k} className="border text-sm px-5 py-3 rounded-xl font-medium text-zinc-300 border-zinc-700 hover:border-green-500 hover:text-green-400 transition-colors">
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Value proposition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 rounded-2xl overflow-hidden mb-16">
          <div className="bg-zinc-900 p-10">
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">We are Unique</p>
            <p className="text-white text-3xl font-bold leading-tight">One in a million.<br />One in a bullion.</p>
          </div>
          <div className="p-10" style={{ backgroundColor: AMBER }}>
            <p className="text-zinc-900 text-xs uppercase tracking-widest mb-4 font-semibold">We are the Perfect Match</p>
            <p className="text-zinc-900 text-3xl font-bold leading-tight">What you need is what we offer.<br />Faster. Better. Safer.</p>
          </div>
        </div>

        {/* Design constraint acknowledgement */}
        <div className="rounded-2xl p-8" style={{ border: '2px solid #F59E0B' }}>
          <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: '#F59E0B' }}>Constraints</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { head: 'No decoration', body: 'Minimal brand colors, functional design. No visual complexity to reduce usability for less tech savvy customers.' },
              { head: 'Internal tech team in the loop', body: 'Every technical decision reviewed jointly. No surprise handoffs. No specs that couldn\'t be built by the team that existed.' },
              { head: 'Design limits acknowledged', body: 'AI-powered onboarding was discussed and deliberately deprioritised for v1. Constraints are real, and that\'s what makes design truthful.' },
            ].map(c => (
              <div key={c.head}>
                <p className="text-zinc-200 text-sm font-medium mb-2">{c.head}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: RESEARCH ────────────────────────────────────────────────────────
function Research() {
  const hmwQuestions = [
    'Give customers real-time status visibility?',
    'Let reviewers query one section without blocking others?',
    'Show only fields relevant to each entity type?',
    'Complete KYC from anywhere — no travel, no courier?',
    'Surface a document checklist before the form starts?',
    'Make KYC renewal feel relational, not bureaucratic?',
    'Make 3-step KYC feel like tasks, not one huge form?',
    'Turn a rejection into a specific, actionable message?',
    'Eliminate paper handoffs without changing approval authority?',
    'Make DIL discoverable to small exporters earlier?',
  ]

  return (
    <section id="research" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>03 — User Research</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          The 2 sides of the process
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          We ran simultaneous inquiries into both sides, customer applying for KYC and DIL staff reviewing it, as problems weren&apos;t different but 2 sides of the same coin, connected.
        </p>

        {/* Research methods */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {[
            { method: 'Stakeholder sessions', detail: 'DIL management, admin, director — internal workflow mapping' },
            { method: 'Contextual inquiry', detail: 'Observed the paper review process as-is — where it stalled' },
            { method: 'Concept testing', detail: 'Wireframes tested with staff and customers before high-fidelity' },
          ].map(m => (
            <div key={m.method} className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
              <p className="text-zinc-800 text-sm font-semibold mb-2">{m.method}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>

        {/* Stakeholders & insights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden mb-10 border border-zinc-100"
        >
          <img src="/case-studies/dil-kyc/stakeholders-insights.png" alt="Primary stakeholders map and early insights" className="w-full h-auto block" />
        </motion.div>

        {/* Pain points */}
        <div className="mb-20">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-8">7 core pain points — evidenced, not assumed</p>
          <img src="/PP_DIL.png" alt="8 core pain points" className="w-full rounded-2xl" />
        </div>

        {/* HMW */}
        <div className="mb-20">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-8">How might we questions — 10 of them</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hmwQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-4 bg-zinc-50 border border-zinc-100 rounded-xl px-5 py-4"
              >
                <span className="shrink-0 text-xs font-bold text-green-500 mt-0.5 w-4">{i + 1}</span>
                <p className="text-zinc-600 text-sm leading-relaxed">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: PERSONAS ────────────────────────────────────────────────────────
function Personas() {
  return (
    <section id="personas" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>04 — Personas & Empathy Maps</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Two people. One process. Completely different problems.
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          Designing a two-sided platform means sitting with both sides seriously. Harish is trying to get approved. Priya is trying to approve correctly. Their problems look different on the surface. Underneath, they're caused by the same thing: a process that doesn't communicate.
        </p>

        {/* Harish */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5">

            {/* Left — identity */}
            <div className="md:col-span-2 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800">
              <div>
                <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold mb-6" style={{ color: AMBER }}>
                  HG
                </div>
                <h3 className="text-white text-2xl font-bold mb-1">Harish Gupta</h3>
                <p className="text-green-400 text-sm mb-2">Age 38 · Export Division Head</p>
                <p className="text-zinc-500 text-xs mb-6">Fourth-generation jeweller, Surat. Tech-comfortable. Growth-oriented.</p>
                <blockquote className="border-l-2 border-green-400 pl-4 text-zinc-300 text-sm italic leading-relaxed">
                  "I need bullions as and when required, as per my export orders in minimum time and hassle-free process."
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs leading-relaxed">Devices: Android + Windows laptop. Uses WhatsApp Business, Tally, GJEPC portal. Submits forms in evenings after the office quiets down.</p>
              </div>
            </div>

            {/* Right — empathy map */}
            <div className="md:col-span-3 grid grid-cols-2 divide-x divide-y divide-zinc-800">
              {[
                {
                  label: 'Says',
                  items: [
                    '"Just tell me what documents I need upfront."',
                    '"Do I need to come to Mumbai for this?"',
                    '"I already sent everything. Why is there still a problem?"',
                  ],
                },
                {
                  label: 'Thinks',
                  items: [
                    'What if I fill something wrong and they reject everything?',
                    'Is this company real? Government-nominated sounds legitimate but I\'ve never heard of them.',
                    'The bank KYC took 2 years. Please don\'t be like that.',
                  ],
                },
                {
                  label: 'Does',
                  items: [
                    'Screenshots every confirmation screen on his phone.',
                    'Calls a contact before starting — "Is this how it works?"',
                    'Completes forms in 2–3 sittings, not one continuous session.',
                  ],
                },
                {
                  label: 'Feels',
                  items: [
                    'Anxious when there\'s no acknowledgement after submission.',
                    'Relieved when a step says "completed" visually and clearly.',
                    'Embarrassed about having to ask what a field means.',
                  ],
                },
              ].map(quad => (
                <div key={quad.label} className="p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-4">{quad.label}</p>
                  <ul className="space-y-3">
                    {quad.items.map(item => (
                      <li key={item} className="text-zinc-400 text-xs leading-relaxed flex gap-2">
                        <span className="text-green-500 shrink-0 mt-0.5">›</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priya */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-5">

            {/* Left — identity */}
            <div className="md:col-span-2 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800">
              <div>
                <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold mb-6" style={{ color: AMBER }}>
                  PN
                </div>
                <h3 className="text-white text-2xl font-bold mb-1">Priya Nair</h3>
                <p className="text-green-400 text-sm mb-2">Age 31 · DIL Compliance Reviewer</p>
                <p className="text-zinc-500 text-xs mb-6">4 years at DIL. Ex-banking compliance. Methodical, precise, accountable.</p>
                <blockquote className="border-l-2 border-green-400 pl-4 text-zinc-300 text-sm italic leading-relaxed">
                  "If I approve something I shouldn't have, the director asks me. If I hold things up, the sales team asks me. There's no good side to get it wrong."
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs leading-relaxed">Reviews 8–12 applications simultaneously. Keeps a personal notebook of queries before raising them — she wants to be specific before she types anything official.</p>
              </div>
            </div>

            {/* Right — empathy map */}
            <div className="md:col-span-3 grid grid-cols-2 divide-x divide-y divide-zinc-800">
              {[
                {
                  label: 'Says',
                  items: [
                    '"I need to flag one section, not reject the whole thing."',
                    '"The query has to be specific. Vague queries get wrong resubmissions."',
                    '"How many applications came in this week? I\'ve lost track."',
                  ],
                },
                {
                  label: 'Thinks',
                  items: [
                    'If I reject a whole app for one bad section, the customer has to redo everything. That\'s not fair or efficient.',
                    'I need to see the document date, not just the name. The date is what matters for compliance.',
                    'Why is a Proprietor showing Director fields? The form logic is wrong.',
                  ],
                },
                {
                  label: 'Does',
                  items: [
                    'Reads every PDF carefully — looks for dates and signatures, not just presence.',
                    'Sorts applications by submission date and works oldest-first.',
                    'Escalates unusual entity types to manager before approving.',
                  ],
                },
                {
                  label: 'Feels',
                  items: [
                    'Accountable — if she misses a compliance gap, it\'s on her.',
                    'Overwhelmed on high-volume weeks when 5+ applications arrive at once.',
                    'Satisfied when a clean application moves to Approved with no back-and-forth.',
                  ],
                },
              ].map(quad => (
                <div key={quad.label} className="p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-4">{quad.label}</p>
                  <ul className="space-y-3">
                    {quad.items.map(item => (
                      <li key={item} className="text-zinc-400 text-xs leading-relaxed flex gap-2">
                        <span className="text-green-500 shrink-0 mt-0.5">›</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: JOURNEY MAPS ─────────────────────────────────────────────────────
function JourneyMaps() {
  const currentStateSteps = [
    { stage: 'Inquiry', emotion: 'Curious', pain: 'No digital discovery. Word-of-mouth only.' },
    { stage: 'Form collection', emotion: 'Uncertain', pain: 'Verbal instructions only. No written checklist.' },
    { stage: 'Document gathering', emotion: 'Mild stress', pain: 'Takes days. No single reference.' },
    { stage: '6 manual handoffs', emotion: 'Helpless', pain: 'No visibility. Applications sit on desks.' },
    { stage: 'Physical signature', emotion: 'Effort + cost', pain: 'Travel to Mumbai or courier required.' },
    { stage: 'Filing', emotion: 'Limbo', pain: 'Physical file. No audit trail.' },
    { stage: 'Status tracking', emotion: 'Anxious', pain: 'Calls to DIL staff. 5–10 per day answered.' },
    { stage: 'Query resolution', emotion: 'Frustrated', pain: 'One query stops entire application.' },
    { stage: 'Approval/Rejection', emotion: 'Relief or defeat', pain: 'No reason given. No clear next step.' },
  ]

  const futureStateSteps = [
    { stage: 'Website discovery', emotion: 'Informed', improvement: 'Site IA educates before form starts.' },
    { stage: 'Checklist download', emotion: 'Prepared', improvement: 'Document list available before Step 1.' },
    { stage: 'Step 1: Basic Info', emotion: 'Fast + clear', improvement: 'Progress stepper. 7 fields. Contextual help.' },
    { stage: 'Step 2: Application', emotion: 'Guided', improvement: 'Entity branching. Only relevant fields shown.' },
    { stage: 'Preview + submit', emotion: 'In control', improvement: 'Review all entries before final submission.' },
    { stage: 'Staff review', emotion: '[Staff: calm]', improvement: 'Section-level dashboard. Partial progress possible.' },
    { stage: 'Query (if needed)', emotion: 'Directed', improvement: 'Specific field flagged. Targeted resubmission.' },
    { stage: 'Step 3: Agreement', emotion: 'Accomplished', improvement: 'All steps green. Agreement to download. Done.' },
    { stage: 'Account activated', emotion: 'Trusted', improvement: 'Portal: orders, status, tracking, renewal.' },
  ]

  return (
    <section id="journey" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>05 — Journey Maps</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          The same process. Before and after.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Mapping both states side by side made visible what the numbers alone couldn't: the emotional curve of the experience. The paper process had two frustration peaks — the handoffs, and the query resolution. Both were caused by the same thing: a process that couldn't communicate its own status.
        </p>

        {/* Current state */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <p className="text-zinc-700 text-sm font-semibold">Current state — paper-based KYC</p>
            <span className="text-zinc-400 text-xs ml-auto">Average: 2 weeks minimum</span>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-0 min-w-max">
              {currentStateSteps.map((step, i) => (
                <div key={step.stage} className="flex items-stretch">
                  <div className="w-32 flex flex-col">
                    {/* Stage name */}
                    <div className="bg-zinc-900 text-zinc-300 text-xs font-medium px-3 py-2.5 text-center leading-tight min-h-[44px] flex items-center justify-center">
                      {step.stage}
                    </div>
                    {/* Emotion */}
                    <div className="bg-red-50 border-t border-red-100 text-red-600 text-xs px-3 py-2 text-center">
                      {step.emotion}
                    </div>
                    {/* Pain point */}
                    <div className="bg-zinc-50 border-t border-zinc-100 text-zinc-400 text-xs px-3 py-3 leading-snug flex-1">
                      {step.pain}
                    </div>
                  </div>
                  {i < currentStateSteps.length - 1 && (
                    <div className="flex items-start pt-[22px]">
                      <div className="w-4 h-px bg-zinc-300 mt-2.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future state */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <p className="text-zinc-700 text-sm font-semibold">Future state — digital KYC platform</p>
            <span className="text-zinc-400 text-xs ml-auto">Target: 5–7 days</span>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-0 min-w-max">
              {futureStateSteps.map((step, i) => (
                <div key={step.stage} className="flex items-stretch">
                  <div className="w-32 flex flex-col">
                    {/* Stage name */}
                    <div className="text-zinc-200 text-xs font-medium px-3 py-2.5 text-center leading-tight min-h-[44px] flex items-center justify-center" style={{ backgroundColor: NAVY }}>
                      {step.stage}
                    </div>
                    {/* Emotion */}
                    <div className="bg-green-50 border-t border-green-100 text-green-700 text-xs px-3 py-2 text-center">
                      {step.emotion}
                    </div>
                    {/* Improvement */}
                    <div className="bg-zinc-50 border-t border-zinc-100 text-zinc-400 text-xs px-3 py-3 leading-snug flex-1">
                      {step.improvement}
                    </div>
                  </div>
                  {i < futureStateSteps.length - 1 && (
                    <div className="flex items-start pt-[22px]">
                      <div className="w-4 h-px bg-green-200 mt-2.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key insight callout */}
        <div className="bg-zinc-900 rounded-2xl p-8 mb-16">
          <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold mb-4">The insight that changed the design</p>
          <p className="text-white text-xl font-medium leading-relaxed max-w-2xl">
            Customers weren't abandoning because the process was hard. They were abandoning because they didn't know if anything was happening. Status visibility wasn't a nice-to-have — it was the trust mechanism.
          </p>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: IA ──────────────────────────────────────────────────────────────
function IA() {
  const sections = [
    { name: 'Home',           children: ['Brand statement & visuals', 'History & mission', 'Credibility metrics', 'Bullion schemes', 'DIL USPs', '"Let\'s begin with KYC" CTA'] },
    { name: 'Services',       children: ['Bullion — What it is, Offerings, How it works', 'Rough Diamonds — Offerings, How it works'] },
    { name: 'KYC for Bullion',children: ['Bullion banner', 'How it works (onboarding video)', 'Registration form'] },
    { name: 'About Us',       children: ['History', 'Core values', 'Service commitment (govt. nominated)', 'Credibility by years of service'] },
    { name: 'Login',          children: ['Account info', 'Your orders', 'Order status & tracking', 'Order history'] },
    { name: 'Support',        children: ['Contact us', 'FAQs'] },
    { name: 'Resources',      children: ['Operational reports', 'Financial statements'] },
  ]

  return (
    <section id="ia" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>06 — Information Architecture</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          The site's job: close the gap between discovery and trust
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Harish didn't know DIL existed until someone told him. When he went looking, the site told him almost nothing. The information architecture was built around one insight: a first-time visitor needs to understand why DIL is better than a bank before they'll hand over their business documents. Every section earns the next one.
        </p>

        {/* Site map */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {sections.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl overflow-hidden border border-zinc-200"
            >
              <div className="px-4 py-3 text-white text-xs font-semibold" style={{ backgroundColor: NAVY }}>
                {s.name}
              </div>
              <div className="px-4 py-4 bg-white space-y-2">
                {s.children.map(c => (
                  <p key={c} className="text-zinc-500 text-xs leading-snug flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5 shrink-0">›</span> {c}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* IA logic callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 rounded-2xl overflow-hidden mb-16">
          <div className="bg-white p-10">
            <p className="text-green-500 text-xs uppercase tracking-widest font-semibold mb-6">KYC as simple as ABC</p>
            <div className="space-y-5">
              {[
                { l: 'A', t: 'Gather mandatory documents' },
                { l: 'B', t: 'Visit the DIL website' },
                { l: 'C', t: 'Submit the application' },
              ].map(item => (
                <div key={item.l} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shrink-0" style={{ backgroundColor: NAVY, color: AMBER }}>
                    {item.l}
                  </div>
                  <p className="text-zinc-700 text-sm font-medium">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-10">
            <p className="text-green-500 text-xs uppercase tracking-widest font-semibold mb-6">Onboarding as easy as 1–2–3</p>
            <div className="space-y-5">
              {[
                { l: '1', t: 'Vetting the application' },
                { l: '2', t: 'Approval based on submitted documents' },
                { l: '3', t: 'Documentation processed for onboarding' },
              ].map(item => (
                <div key={item.l} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shrink-0" style={{ backgroundColor: AMBER, color: NAVY }}>
                    {item.l}
                  </div>
                  <p className="text-zinc-700 text-sm font-medium">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: KYC FLOW ────────────────────────────────────────────────────────
function KYCFlow() {
  const steps = [
    {
      num: '01',
      label: 'Basic Information',
      desc: 'Designed to feel fast. The first contact with the portal shouldn\'t feel like a form — it should feel like a conversation starting. Seven fields: firm name, owner name, contact details, monthly requirement in Kgs, nature of business, exporter type, jewellery type. A contextual guidelines panel sits alongside with document hints. Submit triggers the Step 2 unlock.',
      fields: ['Firm name', 'Owner name', 'Contact person + Reference', 'Email + Phone', 'Monthly requirement (Kgs)', 'Nature of business', 'Exporter type — New / Existing', 'Type of jewellery — Plain / Studded / Diamond'],
      decision: 'The guidelines panel on the right was added after concept testing showed customers stopping to call and ask what documents they\'d need before Step 2. Putting it in the same view eliminated that interruption.',
    },
    {
      num: '02',
      label: 'Application Form',
      desc: 'The substantive section. Entity-type branching happens here — a Sole Proprietor sees personal details, a Corporate sees Director details with an "Add director" repeat. Both complete the shared core: Firm Details, Registration Details (7 document types, each with download), Bank Details (3-month statements), Chief Executive details, and Declarations. A preview state lets the applicant review everything before final submission.',
      fields: ['Firm Details — constitution, name, incorporation date, registered office', 'Registration Details — PAN, GST, LOA, GJEPC/FIEO, IEC, Municipal, Customs OTC', 'Bank Details — bank, branch, account type, MICR, 3-month statements', 'Chief Executive details', 'Declarations — signature with rubber stamp'],
      decision: 'The preview state before submission was added after concept testing. Step 2 is long. Users made errors. Catching those errors yourself, before a reviewer sees them, feels better than being queried. It puts the applicant in control of the outcome.',
    },
    {
      num: '03',
      label: 'Agreement',
      desc: 'All three stepper nodes turn green. No input required. The agreement is there to download. The customer\'s job is done. DIL countersigns and returns the document via the portal. The visual completion state communicates more than any confirmation copy could — the process ended.',
      fields: ['Final agreement signed by DIL', 'Download button'],
      decision: 'The decision to require zero input at Step 3 was intentional. The form was already long. The agreement download is a receiving moment, not a filling-in moment. Three green checkmarks do the communicative work.',
    },
  ]

  return (
    <section id="kyc" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>07 — KYC Portal Design</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Three steps. Each one feels like a distinct, completable task.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          The customer-facing portal was built as a strict 3-step linear flow with a persistent progress stepper. Not one long form. Not one overwhelming page. Three tasks. You complete one, you move to the next. Simple things are actually difficult to arrive at.
        </p>

        {/* 3-step stepper */}
        <div className="flex items-center mb-16">
          {['Basic Information', 'Application Form', 'Agreement'].map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  i === 0 ? 'border-green-400 text-green-500 bg-green-50' : 'border-zinc-200 text-zinc-400 bg-white'
                }`}>
                  {i + 1}
                </div>
                <p className={`text-xs mt-2 font-medium ${i === 0 ? 'text-green-600' : 'text-zinc-400'}`}>{label}</p>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-zinc-200 mx-3 mb-5" />}
            </div>
          ))}
        </div>

        {/* Step breakdowns */}
        <div className="space-y-0 divide-y divide-zinc-100">
          {steps.map((step, i) => {
            const stepImages: Record<string, { label: string; hint: string; file: string; src: string | null }> = {
              '01': {
                label: 'Step 1 — Basic Information screen',
                hint: 'Form with Firm name, Owner name, Contact, Monthly requirement (Kgs), Nature of business, Jewellery type. Right panel: document guidelines. Top: green progress stepper showing Step 1 active.',
                file: 'kyc-step-01.png',
                src: '/dil/kyc-step-01.png',
              },
              '02': {
                label: 'Step 2 — Application Form (Sole Proprietor + Corporate)',
                hint: 'Accordion form: Firm Details → Registration Details (7 doc types) → Bank Details → Chief Executive → Declarations. Show corporate entity with "Add director" repeat. Stepper Step 2 active.',
                file: 'Wireframe-11.png or Wireframe-12.png',
                src: null,
              },
              '03': {
                label: 'Step 3 — Agreement (all steps green)',
                hint: 'All 3 stepper nodes are green checkmarks. Agreement document visible with Download button. Clean completion state.',
                file: 'Wireframe-15.png or Wireframe-16.png',
                src: null,
              },
            }
            const img = stepImages[step.num]
            return (
              <div key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: NAVY, color: AMBER }}>
                        {step.num}
                      </div>
                      <h3 className="text-zinc-900 text-2xl font-bold">{step.label}</h3>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">{step.desc}</p>
                    <div className="bg-zinc-900 rounded-xl p-4">
                      <p className="text-green-400 text-xs font-medium uppercase tracking-wide mb-2">Why this decision</p>
                      <p className="text-zinc-400 text-xs leading-relaxed">{step.decision}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Fields in this step</p>
                    <ul className="space-y-2">
                      {step.fields.map(f => (
                        <li key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                          <span className="text-green-400 mt-0.5 shrink-0">—</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                {img.src && (
                  <div className="pb-12">
                    <ProcessImage
                      src={img.src}
                      label={img.label}
                      hint={img.hint}
                    />
                    <ImageCaption>{img.label}</ImageCaption>
                  </div>
                )}
              </div>
            )
          })}
        </div>


      </motion.div>
    </section>
  )
}

// ─── SECTION: DASHBOARD ───────────────────────────────────────────────────────
function Dashboard() {
  const actions = [
    { label: 'Approve', style: 'bg-green-400 text-zinc-900', desc: 'Section complete — all documents verified' },
    { label: 'Reject',  style: 'border border-red-300 text-red-600 bg-white', desc: 'Section fails — customer must resubmit this section' },
    { label: 'Query',   style: 'text-zinc-500 underline bg-white', desc: 'Clarification needed — reviewer types specific query, email sent automatically' },
  ]

  const sections = [
    { label: 'Basic Information', sub: 'Firm name, contact details, business type, jewellery category' },
    { label: 'Application Form A', sub: 'Firm Details + Registration Details (7 document types) + Bank Details + Chief Executive + Declarations' },
    { label: 'Application Form B', sub: 'Sole Proprietor personal details OR Director details (per entity type)' },
    { label: 'Agreement',          sub: 'Final DIL-signed agreement — available once all prior sections approved' },
  ]

  return (
    <section id="dashboard" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>08 — Staff Dashboard</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Built for Priya. Section by section.
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          The internal dashboard lets DIL's compliance team review, query, approve, or reject each KYC section independently. This was the non-obvious design decision. Early drafts used application-level approve/reject. Testing revealed that applications rarely fail entirely. One section needs a query while the rest is clean. Section-level actions let reviewers progress applications partially — and that changed everything.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* Section navigator */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">4 application sections — each independently reviewable</p>
            <div className="space-y-3">
              {sections.map((s, i) => (
                <div key={s.label} className={`rounded-xl border p-5 ${i === 0 ? 'border-green-400/40 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-400' : 'bg-zinc-700'}`} />
                    <p className={`text-sm font-medium ${i === 0 ? 'text-white' : 'text-zinc-500'}`}>{s.label}</p>
                    <span className="ml-auto text-zinc-600 text-xs">{i === 0 ? '▲' : '▼'}</span>
                  </div>
                  {i === 0 && <p className="text-zinc-400 text-xs leading-relaxed ml-5">{s.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons + rationale */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">3 actions per section — not per application</p>
            <div className="space-y-5 mb-10">
              {actions.map(a => (
                <div key={a.label} className="flex items-center gap-5">
                  <button className={`px-6 py-2.5 rounded-full text-sm font-semibold shrink-0 ${a.style}`}>
                    {a.label}
                  </button>
                  <p className="text-zinc-500 text-sm">{a.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-zinc-800 rounded-xl p-6">
              <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">The specific insight</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                When Priya raises a Query, she types the specific section and field in the dashboard. That text goes directly into the automated email to the customer. The customer receives: "Your IEC certificate has expired — please upload a valid certificate dated within the last 12 months." Not "updates needed." The specificity is what makes resubmissions work the first time.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: KYC RENEWAL ────────────────────────────────────────────────────
function Renewal() {
  return (
    <section id="renewal" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>09 — KYC Renewal</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          An annual compliance task reframed as a relationship moment
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Internally, KYC renewal was treated as admin — a mandatory annual update handled entirely by phone. Staff called customers to prompt renewal. Some customers missed the call. Some were confused about what they were confirming. The renewal experience had no UX consideration whatsoever. We designed it as a first-class touchpoint, because it is one. An existing customer being asked to renew is a retention moment. It deserved to look like one.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Renewal flow */}
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">The renewal screen</p>
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">

              {/* Stepper — all complete */}
              <div className="border-b border-zinc-100 px-8 py-5">
                <div className="flex items-center gap-2">
                  {['Basic Information', 'Application Form', 'Agreement'].map((label, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-zinc-500 text-xs">{label}</p>
                      {i < 2 && <div className="w-6 h-px bg-green-300" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert banner */}
              <div className="mx-6 mt-6 rounded-xl flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200">
                <span className="text-lg">📋</span>
                <p className="text-amber-800 text-sm font-medium">KYC is due for update!</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-zinc-500 text-xs mb-4">Onboarded on: 23 January, 2023</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  Your KYC is due for update. If you have any changes in your application,
                  please update for smooth functioning of trades. If there are no changes,
                  kindly confirm here.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl text-sm font-semibold text-zinc-900" style={{ backgroundColor: AMBER }}>
                    Update details of the KYC
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-medium text-zinc-600 border border-zinc-200">
                    I confirm, there are no changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Design decisions */}
          <div className="space-y-5">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Four decisions that made this work</p>
            {[
              {
                title: 'All 3 steps shown as complete',
                body: 'The renewal screen opens with three green checkmarks — not a blank form. It acknowledges the customer\'s existing relationship. They\'re not starting over. Context before action.',
              },
              {
                title: 'Two equally prominent paths',
                body: '"Update" and "No changes" have equal visual weight. No dark pattern. Most returning customers genuinely don\'t have changes. They deserve the easy path as much as the update path.',
              },
              {
                title: 'Onboarding date visible',
                body: 'The customer\'s original onboarding date grounds the screen in history. "You\'ve been with us since January 2023" — personal, not transactional. A number that means something.',
              },
              {
                title: 'Zero phone calls required',
                body: 'Renewal was previously 100% phone-based. This screen eliminated that touchpoint for the majority of customers who have no changes. Staff time freed up. Customer time respected.',
              },
            ].map(d => (
              <div key={d.title} className="bg-white border border-zinc-200 rounded-xl p-5">
                <p className="text-zinc-800 text-sm font-semibold mb-1.5">{d.title}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account section */}
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Post-onboarding account section</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '👤', label: 'Account Info',             desc: 'Profile, business details, contact' },
              { icon: '📦', label: 'Your Orders',              desc: 'Active orders with status badges' },
              { icon: '📍', label: 'Order Status & Tracking',  desc: 'Live timeline for active order' },
              { icon: '📋', label: 'Order History',            desc: 'Completed orders, sortable table' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-zinc-200 rounded-2xl p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-zinc-800 text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: COMMUNICATIONS DESIGN ──────────────────────────────────────────
const EMAILS = [
  { trigger: 'After 1st approval (Basic Info)', subject: 'Welcome to DIL! Your Account is Now Approved', body: 'Login credentials delivered — email + temporary password. CTA to portal login.', tone: 'Warm welcome', state: 'approved', icon: '✉' },
  { trigger: 'Application queried by staff', subject: 'Update needed in your DIL application', body: 'Specific query listed inline (e.g. "Financial statements are old — need latest 3 months"). Direct link back to portal.', tone: 'Actionable & specific', state: 'query', icon: '?' },
  { trigger: 'Application rejected', subject: 'Status of your DIL application', body: 'Rejection reasons listed explicitly. Empathetic tone. Support contact offered. Door left open for future applications.', tone: 'Empathetic & clear', state: 'rejected', icon: '✕' },
  { trigger: 'Full application approved', subject: 'DIL application approved', body: 'Application approved — Zoom call next. Team will reach out to schedule. Support contact included.', tone: 'Celebratory + next step', state: 'approved', icon: '✔' },
  { trigger: 'Zoom call scheduled', subject: 'DIL application Zoom call', body: 'Full meeting details: date, time, timezone, meeting link, ID, passcode. No ambiguity in joining.', tone: 'Structured & precise', state: 'neutral', icon: '📹' },
  { trigger: 'Agreement stage reached', subject: 'Action Required: Sign and Submit DIL Agreement', body: 'Download agreement → sign → courier to DIL Mumbai address. DIL countersigns and uploads to portal.', tone: 'Action-oriented', state: 'neutral', icon: '📋' },
  { trigger: 'Onboarding complete', subject: 'Congratulations, you are onboard with DIL!', body: 'Final agreement download link. Ready to transact. Commitment to best service.', tone: 'Celebratory milestone', state: 'approved', icon: '★' },
]

function Communications() {
  const stateColors: Record<string, string> = {
    approved: 'border-green-200 bg-green-50',
    query:    'border-amber-200 bg-amber-50',
    rejected: 'border-red-100 bg-red-50',
    neutral:  'border-zinc-200 bg-white',
  }
  const toneColors: Record<string, string> = {
    approved: 'text-green-600',
    query:    'text-amber-600',
    rejected: 'text-red-500',
    neutral:  'text-zinc-500',
  }

  return (
    <section id="comms" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>10 — Communications Design</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          7 emails that make the process feel human
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-6 leading-relaxed">
          Every status change in the KYC flow triggers an automated email. Before the platform, this was done manually — or not at all. We wrote every email from scratch: subject line, body, tone, CTA. No system-generated boilerplate. No generic "your application is being processed." Every message reads like it came from a person who understands what the customer is waiting for.
        </p>
        <div className="flex flex-wrap gap-3 mb-16">
          {['Problem briefing', 'Copy direction', 'Tone design', 'Dev integration'].map(tag => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        {/* Timeline + email cards */}
        <div className="relative">
          <div className="absolute left-5 top-6 bottom-6 w-px bg-zinc-100 hidden md:block" />
          <div className="space-y-5">
            {EMAILS.map((email, i) => (
              <motion.div
                key={email.subject}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`relative md:ml-16 border rounded-2xl p-6 ${stateColors[email.state]}`}
              >
                <div className="absolute -left-[3.25rem] top-6 hidden md:flex w-6 h-6 rounded-full border-2 border-zinc-200 bg-white items-center justify-center text-xs">
                  {i + 1}
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">{email.trigger}</p>
                    <p className="text-zinc-800 text-sm font-semibold">
                      <span className="mr-2">{email.icon}</span>
                      {email.subject}
                    </p>
                  </div>
                  <span className={`shrink-0 text-xs font-medium italic ${toneColors[email.state]}`}>
                    {email.tone}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{email.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: QA & DELIVERY ───────────────────────────────────────────────────
const FUNCTIONAL_ISSUES = [
  { issue: 'Progress bar not showing current stage in customer portal', status: 'Done' },
  { issue: 'Zoom call invitation email not triggering on approval', status: 'Done' },
  { issue: 'New application opening Zoom call section directly — should start at Basic Info', status: 'Done' },
  { issue: 'Questions not getting submitted on form', status: 'Done' },
  { issue: 'Date stamps absent from admin dashboard table', status: 'Verified' },
  { issue: 'System not auto-logging out after session — security gap', status: 'Done' },
  { issue: 'Rejection email not triggering for Basic Info rejection', status: 'Done' },
  { issue: 'Pincode field accepting text — must restrict to 6 digits', status: 'Done' },
  { issue: 'Phone field not enforcing 10-digit limit', status: 'Done' },
  { issue: 'Approval status showing after rejection — state logic error', status: 'Done' },
]

const VISUAL_ISSUES = [
  { issue: 'Buttons inconsistent — padding, stroke size, and colour across portal and dashboard', status: 'Done' },
  { issue: 'Font weight and colour variations not matching Figma — all text same weight', status: 'Done' },
  { issue: 'Dashboard overscaled — needs 75% browser zoom to feel proportional to design', status: 'Done' },
  { issue: 'Table borders not removed — design calls for borderless rows', status: 'Done' },
  { issue: 'Calendar plugin too heavy — needs cleaner alternative', status: 'Done' },
  { issue: 'New form submissions not highlighted in grey as per design', status: 'Pending in Application form B' },
  { issue: 'Address file upload box resizing with filename — should stay fixed', status: 'Done' },
  { issue: 'Form section spacing too tight — Firm Details and Registration Details need breathing room', status: 'Done' },
  { issue: 'Search icon and input block are separate — should be integrated as per design', status: 'Done' },
  { issue: '+Add factory/godown button text not bold; icon mismatched to design', status: 'Done' },
]

const STATUS_STYLE: Record<string, string> = {
  'Done':     'bg-green-100 text-green-700',
  'Verified': 'bg-blue-100 text-blue-700',
  'Pending in Application form B': 'bg-amber-100 text-amber-700',
}

function QADelivery() {
  return (
    <section id="qa" style={{ backgroundColor: '#f9f9f7' }} className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>11 — QA & Delivery</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          End-to-end. Problem briefing to signed-off product.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-6 leading-relaxed">
          This project ran the full distance — problem briefing, brand strategy, IA, wireframes, high-fidelity, email copy, dev collaboration, and structured QA with a shared tracker. Every issue was documented, assigned, and resolved before sign-off. The internal DIL tech team was in the loop on every technical decision. No siloing. No handoff gap.
        </p>

        {/* Delivery ownership */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {[
            { step: '01', label: 'Problem Briefing', desc: 'Scoped from DIL discovery sessions and stakeholder interviews' },
            { step: '02', label: 'Design Direction', desc: 'Brand strategy → IA → wireframes → high-fidelity' },
            { step: '03', label: 'Solution Delivery', desc: 'Figma files, email copy, annotation specs' },
            { step: '04', label: 'Dev Collaboration', desc: 'Daily handoff reviews with the internal DIL tech team' },
            { step: '05', label: 'QA & Sign-off', desc: 'Shared tracker with DIL, all issues closed before delivery' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-zinc-200 rounded-2xl p-5"
            >
              <div className="text-green-500 text-xs font-bold tracking-widest mb-3">{item.step}</div>
              <p className="text-zinc-800 text-sm font-semibold mb-2">{item.label}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* QA tracker screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden mb-10 border border-zinc-200"
        >
          <img src="/case-studies/dil-kyc/qa-tracker.png" alt="QA issue tracker — shared spreadsheet used during delivery" className="w-full h-auto block" />
        </motion.div>

        {/* Issue tracker — two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-zinc-700 text-sm font-semibold">Functional issues</p>
              <span className="text-zinc-400 text-xs ml-auto">Customer form + Dashboard</span>
            </div>
            <div className="space-y-2">
              {FUNCTIONAL_ISSUES.map(item => (
                <div key={item.issue} className="flex items-start gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-3">
                  <p className="text-zinc-600 text-xs leading-relaxed flex-1">{item.issue}</p>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status] ?? 'bg-zinc-100 text-zinc-500'}`}>
                    {item.status === 'Pending in Application form B' ? 'Pending' : item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4B4ACF' }} />
              <p className="text-zinc-700 text-sm font-semibold">Visual issues</p>
              <span className="text-zinc-400 text-xs ml-auto">Portal + Dashboard UI</span>
            </div>
            <div className="space-y-2">
              {VISUAL_ISSUES.map(item => (
                <div key={item.issue} className="flex items-start gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-3">
                  <p className="text-zinc-600 text-xs leading-relaxed flex-1">{item.issue}</p>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status] ?? 'bg-zinc-100 text-zinc-500'}`}>
                    {item.status === 'Pending in Application form B' ? 'Pending' : item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: REFLECTION ─────────────────────────────────────────────────────
function Reflection() {
  const findings = [
    {
      n: '01',
      title: 'The brand promise was the design brief',
      body: 'DIL\'s edge over banks — speed, access, transparency — was being contradicted by the paper process. Every design decision was evaluated against that brief.',
    },
    {
      n: '02',
      title: 'Section-level approval was the key unlock',
      body: 'Applications rarely fail entirely. Section-level Approve / Reject / Query let reviewers make partial progress instead of blocking entire submissions.',
    },
    {
      n: '03',
      title: 'Entity-type branching reduced perceived complexity',
      body: 'Progressive disclosure by entity type cut perceived form length by ~40% without removing a single required field.',
    },
    {
      n: '04',
      title: 'KYC renewal is a retention moment',
      body: 'A clear "no changes" confirmation path and onboarding date reframed an annual obligation into a signal that DIL valued the customer\'s time.',
    },
    {
      n: '05',
      title: 'Specific query emails fixed resubmissions',
      body: 'When queries named the exact section, field, and issue, customers knew what to fix. The cycle of vague queries and vague resubmissions broke almost entirely.',
    },
  ]

  return (
    <section id="reflect" className="px-8 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>12 — Findings & Reflection</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          What this project taught me about compliance UX
        </h2>

        {/* Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {findings.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-zinc-200 rounded-2xl p-7 border-l-4"
              style={{ borderLeftColor: AMBER }}
            >
              <p className="text-green-500 text-xs uppercase tracking-widest font-semibold mb-3">Finding {f.n}</p>
              <h4 className="text-zinc-900 font-semibold text-base mb-3">{f.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Divider />

        {/* What I learnt */}
        <div className="max-w-3xl">
          <p className="text-green-500 text-xs uppercase tracking-widest font-semibold mb-8">What I learnt</p>
          <p className="text-zinc-700 text-lg leading-relaxed mb-6">
            The design work wasn't about making a form look good — it was about making the brand credible. Every interaction had to deliver what DIL was promising.
          </p>
          <p className="text-zinc-500 text-base leading-relaxed">
            Building a two-sided platform exposed a core tension: what felt simplest for the customer was hardest for staff, and vice versa. Resolving that — cleanly, on both sides — was the real design challenge.
          </p>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: TEAM ────────────────────────────────────────────────────────────
const TEAM = [
  { initials: 'OL', name: 'Onkar Lanke',       role: 'Senior UX Designer', url: 'https://www.linkedin.com/in/onkarlanke/' },
  { initials: 'MG', name: 'Mansi Goregaonkar', role: 'Visual Designer',    url: 'https://www.linkedin.com/in/mansi-goregaonkar-76b044214/' },
  { initials: 'PC', name: 'Pratik Chavan',      role: 'Visual Designer',    url: 'https://www.linkedin.com/in/prchavan/' },
  { initials: 'PM', name: 'Priyanka',           role: 'Project Manager',    url: 'https://www.linkedin.com/in/tatzope/' },
]

function Team() {
  return (
    <section id="team" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
      >
        <SectionLabel>Team</SectionLabel>

        <div className="border border-zinc-700 rounded-2xl overflow-hidden divide-y divide-zinc-800">
          {TEAM.map((member) => (
            <div key={member.name} className="grid grid-cols-3 items-center px-6 py-4">
              <p className="text-white text-sm font-medium">{member.name}</p>
              <p className="text-zinc-500 text-sm">{member.role}</p>
              <a href={member.url} target="_blank" rel="noreferrer" className="justify-self-end flex items-center gap-1.5 text-xs border border-zinc-700 rounded-full px-3 py-1.5 text-zinc-500 hover:border-green-500/50 hover:text-green-400 transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── SECTION: IMPACT ──────────────────────────────────────────────────────────
function Impact() {
  return (
    <section style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 pb-24">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <SectionLabel>Impact</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-zinc-800 rounded-2xl overflow-hidden mt-8">
          {[
            { v: '55%',  l: 'Onboarding time cut',  s: '5 weeks → 2 weeks' },
            { v: '800+', l: 'Customers served',      s: 'Largest private agency base' },
            { v: '3',    l: 'KYC form types',        s: 'Proprietor, Corporate, Bullion' },
          ].map(m => (
            <div key={m.l} className="px-6 py-8" style={{ backgroundColor: NAVY }}>
              <div className="text-4xl font-bold mb-1" style={{ color: AMBER }}>{m.v}</div>
              <div className="text-white text-sm font-medium mb-0.5">{m.l}</div>
              <div className="text-zinc-500 text-xs">{m.s}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── FOOTER / CTA ─────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
      >
        <div>
          <p className="text-green-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">Diamond India Limited</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Onkar Lanke<br />
            <span style={{ color: AMBER }}>Senior UX Designer</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-green-400 hover:text-green-400 transition-all"
          >
            ← Back to all work
          </Link>
          <a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-zinc-900 px-8 py-4 rounded-full text-sm font-semibold transition-all"
            style={{ backgroundColor: AMBER }}
          >
            Connect on LinkedIn →
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DILKYCDetail() {
  return (
    <main className="bg-white text-zinc-900 antialiased">
      {/* <Nav /> */}
      <StickyNav />
      <Hero />
      <Team />
      <Impact />
      {/* HIDDEN — restore by changing false to true */}
      {false && <TheMoment />}
      <Brief />
      <Strategy />
      <Research />
      <Personas />
      <JourneyMaps />
      <IA />
      <KYCFlow />
      <Dashboard />
      <Renewal />
      <Communications />
      <QADelivery />
      <Reflection />
      <FooterCTA />
    </main>
  )
}
