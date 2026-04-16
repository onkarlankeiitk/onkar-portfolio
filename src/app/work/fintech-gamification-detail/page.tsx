'use client'

// app/work/fintech-gamification-detail/page.tsx
// Full custom detail page — frankieOne · No-Code KYC Rule Builder
// Brand: near-black (#0F0F12) + frankieOne purple (#4B4ACF) + white

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DARK   = '#0F0F12'
const PURPLE = '#4B4ACF'
const PURPLE_MUTED = '#7B7BE0'

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Pill({ children, purple }: { children: React.ReactNode; purple?: boolean }) {
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full border font-medium ${
      purple
        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
    }`}>
      {children}
    </span>
  )
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.2em] uppercase font-semibold mb-4 ${light ? 'text-indigo-400' : 'text-indigo-500'}`}>
      {children}
    </p>
  )
}

function Divider({ dark }: { dark?: boolean }) {
  return <div className={`border-t my-16 ${dark ? 'border-zinc-800' : 'border-zinc-100'}`} />
}

// ProcessImage — activate by setting src to a real path
// Place images in public/case-studies/fintech-gamification/
function ProcessImage({
  src, label, hint, aspect = 'aspect-video', dark = false,
}: {
  src?: string | null; label: string; hint: string; aspect?: string; dark?: boolean
}) {
  if (src) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className={`${aspect} w-full rounded-2xl overflow-hidden shadow-sm`}
      >
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={`${aspect} w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-8 text-center ${
        dark ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <div className="text-3xl opacity-20">🖼</div>
      <p className={`text-sm font-medium ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{label}</p>
      <p className={`text-xs max-w-sm leading-relaxed ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{hint}</p>
      <p className={`text-xs mt-1 font-mono ${dark ? 'text-zinc-700' : 'text-zinc-300'}`}>
        → public/case-studies/fintech-gamification/
      </p>
    </motion.div>
  )
}

function ImageCaption({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs mt-3 text-center ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{children}</p>
  )
}

// ─── STICKY NAV ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'brief',     label: 'Brief' },
  { id: 'strategy',  label: 'Strategy' },
  { id: 'research',  label: 'Research' },
  { id: 'benchmark', label: 'Benchmarking' },
  { id: 'system',    label: 'Design System' },
  { id: 'canvas',    label: 'Canvas' },
  { id: 'hifi',      label: 'Hi-Fi' },
  { id: 'govern',    label: 'Governance' },
  { id: 'reflect',   label: 'Reflection' },
]

function StickyNav() {
  const [active, setActive] = useState('brief')
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
            active === item.id ? 'text-indigo-400 translate-x-1' : 'text-zinc-600 hover:text-zinc-400'
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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: DARK }}>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${PURPLE} 1px, transparent 1px), linear-gradient(90deg, ${PURPLE} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Purple radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${PURPLE} 0%, transparent 70%)` }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-500 text-xs hover:text-indigo-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to work
        </Link>
        <div className="flex gap-2">
          {['B2B SaaS', 'RegTech', 'Compliance'].map(t => (
            <Pill key={t} purple>{t}</Pill>
          ))}
        </div>
      </div>

      {/* Centre content */}
      <motion.div style={{ y }} className="relative z-10 px-8 md:px-16 lg:px-24 py-16 flex-1 flex flex-col justify-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            {/* frankieOne mark */}
            <div className="px-3 py-1.5 rounded-lg text-white text-xs font-bold tracking-wider"
              style={{ backgroundColor: PURPLE }}>
              f1
            </div>
            <div className="h-px flex-1 max-w-xs" style={{ backgroundColor: PURPLE, opacity: 0.3 }} />
          </div>
          <p className="text-indigo-400 text-xs tracking-[0.25em] uppercase mb-4 font-medium">
            frankieOne · 2024
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tight leading-none mb-6"
        >
          No-Code<br />
          <span style={{ color: PURPLE_MUTED }}>KYC Builder</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          className="text-zinc-400 text-xl md:text-2xl font-light max-w-2xl mb-12 leading-relaxed"
        >
          A visual rule builder that gives compliance teams full ownership of identity
          verification pipelines — without writing a line of code.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-8"
        >
          {[
            { label: 'Client',    value: 'frankieOne' },
            { label: 'Role',      value: 'Senior Product Designer' },
            { label: 'Timeline',  value: '3 Months' },
            { label: 'Year',      value: '2024' },
          ].map(m => (
            <div key={m.label}>
              <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">{m.label}</p>
              <p className="text-zinc-200 text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="relative z-10 px-8 md:px-16 pb-10 flex items-center justify-between"
      >
        <p className="text-zinc-700 text-xs italic max-w-xs">
          "Compliance managers need ownership, not workarounds."
        </p>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-zinc-600 text-xs">
          Scroll ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── SECTION: BRIEF ───────────────────────────────────────────────────────────
function Brief() {
  return (
    <section id="brief" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>01 — The Brief</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          KYC configuration was an engineering problem.<br />It shouldn't be.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              head: 'Who is frankieOne?',
              body: 'frankieOne is a B2B2C compliance infrastructure platform powering KYC, AML, and fraud checks for banks, NBFCs, and fintechs across Asia-Pacific. Their platform sits between regulated institutions and their end customers — every financial product configured on frankieOne determines how identities are verified, how risks are scored, and how fraudsters are caught.',
            },
            {
              head: 'The problem',
              body: 'Every financial institution must configure its own verification rules based on jurisdiction, risk appetite, and product type. That configuration lived entirely in engineering. A compliance manager who needed to add a sanctions check to a new customer segment had to raise a ticket, wait for a sprint cycle, review code they couldn\'t read, and hope the logic matched what they intended. Testing was manual. Audit trails were nonexistent.',
            },
            {
              head: 'The ask',
              body: 'Design a no-code rule builder — a visual canvas where compliance and product teams can assemble KYC flows, test them against real or sample data, and push to production through an approval-gated pipeline. The tool needed to serve three very different user types without becoming three different products.',
            },
          ].map(col => (
            <div key={col.head}>
              <h3 className="text-zinc-900 font-semibold text-base mb-3">{col.head}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>

        {/* Impact strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden mb-16">
          {[
            { v: '3',    l: 'User types',           s: 'Compliance, Product, Dev' },
            { v: '10+',  l: 'Screens designed',     s: 'End-to-end system' },
            { v: '4',    l: 'Tools benchmarked',    s: 'CIBIL, Scratch, Zapier, Miro' },
            { v: '6',    l: 'Rule block types',     s: 'Atom-level components' },
          ].map(m => (
            <div key={m.l} className="bg-white px-6 py-8">
              <div className="text-4xl font-bold mb-1" style={{ color: PURPLE }}>{m.v}</div>
              <div className="text-zinc-700 text-sm font-medium mb-0.5">{m.l}</div>
              <div className="text-zinc-400 text-xs">{m.s}</div>
            </div>
          ))}
        </div>

        {/* B2B2C model diagram slot */}
        <ProcessImage
          src={null}
          label="frankieOne B2B2C model — platform architecture"
          hint="3-tier diagram: frankieOne platform (top layer, purple) → Financial customers / Banks / NBFCs (middle, dark) → End customers (bottom, grey). Connector lines showing data and rule flow. Below: horizontal KYC lifecycle — Personal Info → Identity Verification → Background Checks → Ongoing Monitoring. Clean, dark background."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>frankieOne's B2B2C model — the platform sits between regulated institutions and their end customers, configuring how identities are verified at every stage.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: STRATEGY ────────────────────────────────────────────────────────
function Strategy() {
  const phases = [
    {
      week: 'Weeks 1–3',
      phase: 'Discovery & Domain Research',
      deliverables: ['Stakeholder interviews (compliance, product, dev)', 'KYC/AML regulation landscape', 'B2B2C model analysis', 'Jobs-to-be-done interviews'],
    },
    {
      week: 'Weeks 4–6',
      phase: 'Research Synthesis & Strategy',
      deliverables: ['Persona development — 3 user types', 'Journey mapping per user type', 'Benchmarking: 4 analogue tools', 'Design principles definition'],
    },
    {
      week: 'Weeks 7–10',
      phase: 'Design System & Wireframing',
      deliverables: ['Block architecture (atom → organism)', 'Shape language exploration', 'Canvas model — 2 concepts iterated', 'Low-fidelity wireframes with annotation'],
    },
    {
      week: 'Weeks 11–13',
      phase: 'Hi-Fi, Testing & Handoff',
      deliverables: ['10+ pixel-perfect screens', 'Usability review with compliance team', 'Governance layer design', 'Dev handoff documentation'],
    },
  ]

  return (
    <section id="strategy" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel light>02 — Product Strategy</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          This was a design problem wearing an engineering costume
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          Before any wireframes, three weeks were spent understanding the domain, the users, and the failure modes
          of every analogous tool. A compliance canvas isn't a flowchart builder — the stakes of getting the logic
          wrong are regulatory. That context drove every structural decision in the design.
        </p>

        {/* Engagement timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 rounded-2xl overflow-hidden mb-16">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.week}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8"
              style={{ backgroundColor: i === 0 ? '#1a1a2e' : '#0F0F12' }}
            >
              <p className="text-indigo-400 text-xs font-bold tracking-widest mb-3">{phase.week}</p>
              <p className="text-white text-sm font-semibold mb-5 leading-snug">{phase.phase}</p>
              <ul className="space-y-2">
                {phase.deliverables.map(d => (
                  <li key={d} className="flex items-start gap-2 text-zinc-500 text-xs leading-snug">
                    <span style={{ color: PURPLE }} className="mt-0.5 shrink-0">›</span> {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Strategic framing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'The ownership gap',
              body: 'Compliance managers carry regulatory accountability but have zero control over the logic that executes their intent. This isn\'t a UX problem — it\'s an organisational power structure problem that design can fix.',
            },
            {
              title: 'The trust problem',
              body: 'In regulated industries, "deploy" isn\'t a button press — it\'s a sign-off. Any tool that treats deployment as a simple action will fail enterprise adoption. Governance had to be a first-class design concern.',
            },
            {
              title: 'The abstraction level',
              body: 'The tool needed to speak compliance language (KYC, AML, sanctions) not engineering language (API calls, boolean logic). Every label, every concept, every flow name was tested against the mental model of a Compliance Manager, not a developer.',
            },
          ].map(card => (
            <div key={card.title} className="border border-zinc-800 rounded-2xl p-7"
              style={{ borderLeftWidth: 4, borderLeftColor: PURPLE }}>
              <p className="text-white text-sm font-semibold mb-3">{card.title}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: RESEARCH ────────────────────────────────────────────────────────
function Research() {
  const userTypes = [
    {
      type: 'Compliance Manager',
      example: 'Pravin · Bank of India · Strategic Planning & Technology',
      owns: 'Regulatory logic — knows what checks must run, in what order, for which customer segment',
      blocked: 'Cannot modify rules without an engineering ticket. No way to validate that deployed logic matches intent.',
      need: 'Own the rule logic end-to-end, test before deploying, get sign-off from risk officer.',
      primary: true,
    },
    {
      type: 'Product Manager',
      example: 'Product / Digital Banking teams',
      owns: 'Product-level risk thresholds — defines acceptable pass rates, false positive tolerance, onboarding drop-off limits',
      blocked: 'No visibility into what the current rules actually do. Can\'t test "what if" scenarios without dev involvement.',
      need: 'See the current flow, model changes, and validate impact before raising a ticket.',
      primary: false,
    },
    {
      type: 'Developer / Integrations',
      example: 'Backend engineers, solutions engineers',
      owns: 'The actual rule configuration and frankieOne API integration',
      blocked: 'Every change involves translating a compliance requirement from a Word document or email into working config — with high ambiguity and frequent corrections.',
      need: 'A single source of truth for rule logic that is machine-readable but authored by the compliance team.',
      primary: false,
    },
  ]

  const jtbd = [
    { step: 'Define', pain: 'Done in Word or email — no standard format', ok: false },
    { step: 'Configure', pain: 'Requires engineering ticket and sprint cycle', ok: false },
    { step: 'Validate', pain: 'Manual review against sample data or skipped entirely', ok: false },
    { step: 'Approve', pain: 'Tracked in email chain — no audit trail', ok: false },
    { step: 'Deploy', pain: 'Engineering deployment — compliance team has no visibility', ok: false },
    { step: 'Monitor', pain: 'No dashboard — post-deploy issues found reactively', ok: false },
  ]

  return (
    <section id="research" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>03 — User Research</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Three users, one broken workflow
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Stakeholder interviews and job-mapping sessions uncovered a common thread: all three user types
          were working around the same absence of a shared, visual source of truth for KYC rule logic.
        </p>

        {/* 3 user types */}
        <div className="space-y-5 mb-20">
          {userTypes.map((u, i) => (
            <motion.div
              key={u.type}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border overflow-hidden ${u.primary ? 'border-indigo-200' : 'border-zinc-200'}`}
            >
              <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${u.primary ? 'bg-indigo-50' : 'bg-zinc-50'}`}>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest mr-3 ${u.primary ? 'text-indigo-500' : 'text-zinc-400'}`}>
                    {u.primary ? 'Primary user' : 'Secondary user'}
                  </span>
                  <span className="text-zinc-800 font-semibold text-base">{u.type}</span>
                </div>
                <p className="text-zinc-500 text-xs italic">{u.example}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
                <div className="px-8 py-6">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Owns</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">{u.owns}</p>
                </div>
                <div className="px-8 py-6">
                  <p className="text-xs text-red-400 uppercase tracking-widest mb-2">Blocked by</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">{u.blocked}</p>
                </div>
                <div className="px-8 py-6">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: PURPLE }}>Needs</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">{u.need}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Persona image slot */}
        <div className="mb-20">
          <ProcessImage
            src={null}
            label="Persona card — Pravin, Compliance Manager (primary user)"
            hint="Clean persona card: photo/avatar placeholder, name, role (Manager – Strategic Planning & Technology, Bank of India), 6+ years experience, 3 goals, 3 frustrations, defining quote. Indigo/purple accent on left border. White card, dark text."
            aspect="aspect-[16/7]"
          />
          <ImageCaption>Primary persona — Pravin, Compliance Manager. Owns the regulatory logic but has no control over how it's configured or deployed.</ImageCaption>
        </div>

        {/* JTBD journey — all broken */}
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-8">
            Pravin's current workflow — every step is broken
          </p>
          <div className="flex flex-wrap items-stretch gap-0">
            {jtbd.map((step, i) => (
              <div key={step.step} className="flex items-stretch flex-1 min-w-[140px]">
                <div className="flex-1 border border-red-100 bg-red-50 rounded-xl p-5 mr-2 last:mr-0">
                  <div className="w-7 h-7 rounded-full border-2 border-red-300 flex items-center justify-center text-xs font-bold text-red-400 mb-3">
                    {i + 1}
                  </div>
                  <p className="text-zinc-800 text-sm font-semibold mb-2">{step.step}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{step.pain}</p>
                </div>
                {i < jtbd.length - 1 && (
                  <div className="flex items-center text-red-200 text-lg shrink-0 mr-2">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-red-400 text-xs mt-4 font-medium">All 6 steps rely on engineering or manual workarounds — the compliance manager owns none of them.</p>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: BENCHMARKING ────────────────────────────────────────────────────
function Benchmarking() {
  const tools = [
    {
      name: 'CIBIL Credit Score',
      category: 'Compliance mental model',
      observations: [
        'Multi-factor risk score decomposed into discrete, understandable components',
        'Payment History, Credit Mix, Enquiries, Utilisation — each a "rule" with a weight',
        'Users understand complex scores because the inputs are visible and named',
      ],
      takeaway: 'Compliance logic should be decomposable into named, weighted components — not a black box score.',
      color: 'border-emerald-200 bg-emerald-50',
      accent: 'text-emerald-600',
    },
    {
      name: 'Scratch (MIT)',
      category: 'Block interaction model',
      observations: [
        'Snap-together blocks with constrained attachment points remove ambiguity',
        'Logic feels constructive not written — building vs coding',
        'Block shape communicates what can connect where',
      ],
      takeaway: 'Constraining where blocks can connect paradoxically makes users feel more in control, not less.',
      color: 'border-amber-200 bg-amber-50',
      accent: 'text-amber-600',
    },
    {
      name: 'Zapier / Make.com',
      category: 'Flow pattern model',
      observations: [
        'Trigger → Action → Condition is the native mental model for automation',
        'Compliance workflows mirror this exactly: event → check → outcome',
        'Modular steps with clear pass/fail branching are universally understood',
      ],
      takeaway: 'A compliance rule set is an automation workflow — design the canvas to feel like one.',
      color: 'border-blue-200 bg-blue-50',
      accent: 'text-blue-600',
    },
    {
      name: 'Miro',
      category: 'Collaborative canvas model',
      observations: [
        'Spatial organisation and persistent state allow async collaboration',
        'Panel + canvas layout is learnable without onboarding',
        'Toolbar density is the primary usability risk on large canvases',
      ],
      takeaway: 'A panel-and-canvas layout works for structured work; unconstrained canvases create paralysis for task-completion contexts.',
      color: 'border-rose-200 bg-rose-50',
      accent: 'text-rose-600',
    },
  ]

  return (
    <section id="benchmark" style={{ backgroundColor: '#f9f9f7' }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>04 — Benchmarking</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          No-code compliance tools didn't exist. Adjacent ones did.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          With no direct analogues, four tools were studied across two axes: how they decompose complex logic
          visually, and how they manage structured, task-completion canvases. Each yielded a concrete design principle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`border rounded-2xl overflow-hidden ${tool.color}`}
            >
              <div className="px-7 pt-7 pb-5 border-b border-white/60">
                <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${tool.accent}`}>{tool.category}</p>
                <p className="text-zinc-900 font-bold text-lg">{tool.name}</p>
              </div>
              <div className="px-7 py-5">
                <ul className="space-y-2 mb-5">
                  {tool.observations.map(o => (
                    <li key={o} className="flex items-start gap-2 text-zinc-600 text-sm">
                      <span className={`mt-0.5 shrink-0 ${tool.accent}`}>›</span> {o}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl bg-white/60 border border-white px-5 py-4">
                  <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Design takeaway</p>
                  <p className="text-zinc-700 text-sm font-medium leading-relaxed">{tool.takeaway}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ProcessImage
          src={null}
          label="Benchmarking grid — 4 tools, key observations and design takeaways"
          hint="2×2 grid showing CIBIL / Scratch / Zapier / Miro. Each cell: tool logo or UI screenshot, 2-3 bullet observations, one 'design takeaway' insight box. Bottom row: how each takeaway maps to a frankieOne design principle. Clean white/grey background, indigo accent for takeaway boxes."
          aspect="aspect-[16/9]"
        />
        <ImageCaption>Four tools, four design principles — none were compliance tools, all informed the canvas architecture.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: DESIGN SYSTEM ───────────────────────────────────────────────────
function DesignSystem() {
  const atoms = [
    { name: 'Duplicate Check',    category: 'Identity', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: '⊕' },
    { name: 'Identity Match',     category: 'Identity', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: '◈' },
    { name: 'Blocklist',          category: 'Risk',     color: 'bg-red-100 text-red-700 border-red-200',         icon: '⊘' },
    { name: 'Shared Blocklist',   category: 'Risk',     color: 'bg-red-100 text-red-700 border-red-200',         icon: '⊗' },
    { name: 'Sanctions Screen',   category: 'AML',      color: 'bg-amber-100 text-amber-700 border-amber-200',   icon: '◉' },
    { name: 'PEP Check',          category: 'AML',      color: 'bg-amber-100 text-amber-700 border-amber-200',   icon: '◎' },
  ]

  const shapes = [
    { name: 'Rounded rectangle', verdict: 'Rejected', reason: 'Reads as a data card. Static. Doesn\'t communicate interactivity or direction.', icon: '▬' },
    { name: 'Kite / diamond',    verdict: 'Rejected', reason: 'Dynamic and directional, but unfamiliar. Tested poorly — users weren\'t sure what the shape meant.', icon: '◆' },
    { name: 'Puzzle piece',      verdict: 'Chosen',   reason: 'Communicates "fits together" before any instruction. Users instinctively tried to attach blocks to each other.', icon: '🧩' },
  ]

  return (
    <section id="system" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel light>05 — Design System</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          The block architecture — atom to organism
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          The entire builder rests on a three-level hierarchy. An individual rule is an Atom. A logical
          grouping (onboarding checks) is a Molecule. The complete deployable programme is an Organism.
          This structure became a shared language for design, product, and engineering.
        </p>

        {/* Hierarchy visual */}
        <div className="grid grid-cols-3 gap-px bg-zinc-800 rounded-2xl overflow-hidden mb-16">
          {[
            {
              level: 'Atom',
              desc: 'A single check or rule — the smallest unit of compliance logic',
              example: 'Sanctions Screen: "Is this person on a government sanctions list?"',
              bg: '#1a1a2e',
            },
            {
              level: 'Molecule',
              desc: 'A logical grouping of atoms — all checks for a specific stage',
              example: 'Onboarding checks: Duplicate + Identity Match + Blocklist + Sanctions',
              bg: '#16162a',
            },
            {
              level: 'Organism',
              desc: 'The full deployable compliance programme',
              example: 'Personal Info Collection → Onboarding Checks → Ongoing Monitoring',
              bg: '#0F0F12',
            },
          ].map((tier, i) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8"
              style={{ backgroundColor: tier.bg }}
            >
              <div className="text-xs font-bold tracking-widest mb-2" style={{ color: PURPLE_MUTED }}>
                {['01', '02', '03'][i]} / {tier.level}
              </div>
              <p className="text-white text-sm font-semibold mb-4 leading-snug">{tier.desc}</p>
              <div className="border border-zinc-700 rounded-xl px-4 py-3">
                <p className="text-zinc-500 text-xs leading-relaxed italic">{tier.example}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shape exploration */}
        <div className="mb-16">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8">Block shape exploration — 3 candidates, 1 decision</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shapes.map(shape => (
              <div
                key={shape.name}
                className={`rounded-2xl border p-7 ${
                  shape.verdict === 'Chosen'
                    ? 'border-indigo-500/50 bg-indigo-950/40'
                    : 'border-zinc-800 bg-zinc-900/40'
                }`}
              >
                <div className="text-4xl mb-4 opacity-60">{shape.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-white text-sm font-semibold">{shape.name}</p>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    shape.verdict === 'Chosen'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {shape.verdict}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{shape.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 atom blocks */}
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8">The 6 atom block types — colour-coded by category</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {atoms.map(atom => (
              <div key={atom.name}
                className={`rounded-2xl border p-5 flex flex-col gap-3 ${atom.color}`}>
                <span className="text-2xl">{atom.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide opacity-60 mb-1">{atom.category}</p>
                  <p className="font-semibold text-sm leading-tight">{atom.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <ProcessImage
            src={null}
            label="Block design system sheet — hierarchy + shape exploration + 6 atom blocks"
            hint="Full design system sheet: top section — Atom/Molecule/Organism with example blocks at each level. Middle — shape exploration (rounded rect, kite, puzzle piece) side by side with verdict labels. Bottom — 6 atom block types as puzzle-piece cards, colour-coded: purple for identity, red for risk/blocklist, amber for AML. Dark background."
            aspect="aspect-[4/3]"
            dark
          />
          <ImageCaption dark>The complete block design system — from the smallest atom check to the full organism programme.</ImageCaption>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: CANVAS DESIGN ───────────────────────────────────────────────────
function CanvasDesign() {
  return (
    <section id="canvas" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>06 — Canvas Design</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Two models, one clear winner
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Two fundamentally different canvas approaches were prototyped and evaluated against the
          compliance manager's actual task: building a specific, correct flow — not exploring possibilities.
        </p>

        {/* Model comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Model 1 */}
          <div className="rounded-2xl border border-red-200 overflow-hidden">
            <div className="bg-red-50 px-8 py-6 border-b border-red-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-800 font-bold text-base">Model 1 — Open Canvas</p>
                <span className="text-xs font-bold text-red-500 bg-red-100 px-3 py-1 rounded-full">Rejected</span>
              </div>
              <p className="text-zinc-500 text-sm">Full spatial freedom — place any rule block anywhere, floating toolbar, free-form collaboration</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-4">Pain points</p>
              <ul className="space-y-3">
                {[
                  'Blank canvas paralysis — no clear starting point for new users',
                  'Floating toolbar buried on large flows',
                  'No guidance on valid block connections — wrong flows built silently',
                  'Test run was a separate mode, breaking the build–validate loop',
                  'Compliance managers aren\'t brainstorming — open canvas added cognitive load before any work started',
                ].map(p => (
                  <li key={p} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model 2 */}
          <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: PURPLE }}>
            <div className="px-8 py-6 border-b" style={{ backgroundColor: '#F0EFFE', borderColor: '#d4d0fb' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-800 font-bold text-base">Model 2 — Structured Canvas</p>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: PURPLE }}>Chosen</span>
              </div>
              <p className="text-zinc-500 text-sm">Persistent left-panel block library, Auto Configure, directional connections, inline validation</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: PURPLE }}>Improvements</p>
              <ul className="space-y-3">
                {[
                  'Left panel organises blocks by category — no blank canvas, instant starting point',
                  '"Auto Configure" generates a baseline flow from entity type — eliminates cold start',
                  'Blocks snap only to valid positions — wrong connections impossible',
                  'Inline validation per block — pass rate visible without leaving the canvas',
                  'Persistent top bar: flow name, Validate, Deploy — always accessible regardless of canvas state',
                ].map(p => (
                  <li key={p} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <span className="mt-0.5 shrink-0" style={{ color: PURPLE }}>✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Wireframe comparison image slot */}
        <ProcessImage
          src={null}
          label="Wireframe comparison — Model 1 (open canvas) vs Model 2 (structured canvas)"
          hint="Side-by-side low-fidelity wireframes. Left: Model 1 — sparse canvas, floating toolbar, no panel, red annotations marking pain points. Right: Model 2 — left block library panel, canvas with connected blocks, top action bar, inline validation badges. Green annotations on Model 2 improvements. Grey fills, minimal detail."
          aspect="aspect-[16/9]"
        />
        <ImageCaption>Model 1 vs Model 2 — the structured canvas won because compliance work is task-completion, not exploration.</ImageCaption>

        <Divider />

        {/* Auto Configure detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: PURPLE }}>Auto Configure — the cold start solution</p>
            <h3 className="text-zinc-900 text-2xl font-bold mb-5">The hardest part of building a flow is the first block</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Auto Configure addresses blank-canvas paralysis head-on. Selecting an entity type
              (Individual, Business, Minor) generates a recommended baseline flow — a starter set
              of rule blocks based on standard compliance requirements for that entity. Users can
              then modify, extend, or replace from there. Most compliance managers working with
              a new product segment want to start from a best-practice baseline, not from zero.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-2">Design decision</p>
              <p className="text-indigo-800 text-xs leading-relaxed">
                Auto Configure doesn't lock the user in — it generates a flow that is immediately editable.
                The label "Auto Configure" was chosen over "Templates" or "Quick Start" because it implies
                the system is doing intelligent work, not providing a starting-point document.
              </p>
            </div>
          </div>
          <div>
            <ProcessImage
              src={null}
              label="Auto Configure modal — entity type selector with baseline flow preview"
              hint="Modal dialog: entity type selector (Individual / Business / Minor) with radio buttons. Below: a preview of the auto-generated rule flow for the selected entity type — 4-5 connected blocks shown in miniature. CTA: 'Apply to canvas'. Dark background modal on top of dimmed canvas."
              aspect="aspect-[4/3]"
            />
            <ImageCaption>Auto Configure modal — generating a best-practice baseline from entity type, eliminating blank-canvas paralysis.</ImageCaption>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: HIGH-FIDELITY ───────────────────────────────────────────────────
function HiFi() {
  const screens = [
    {
      num: '01',
      title: 'Rule Builder Canvas',
      desc: 'The main workspace. Left panel: categorised block library (Identity, Risk, AML, Custom). Centre canvas: connected puzzle-piece blocks forming an onboarding flow — each block showing inline pass rate data. Top bar: flow name, Validate, and Deploy CTA. One block in selected state opens the configuration drawer on the right.',
      details: ['Dark background (#0F0F12)', 'Purple connector lines between blocks', 'Per-block pass rate badge (e.g. 98.2%)', 'Right drawer: threshold slider + data source dropdown'],
    },
    {
      num: '02',
      title: 'Block Configuration Drawer',
      desc: 'Clicking any rule block opens a right-side drawer without leaving the canvas. Houses all parameters for that block: data source selection, pass/fail threshold, output routing (pass → next block / fail → flag / fail → reject). Shows historical performance data for the block in isolation.',
      details: ['Slide-in animation — canvas stays visible', 'Threshold slider with live pass rate preview', 'Output routing — 3 paths configurable', 'Collapse to return to full canvas'],
    },
    {
      num: '03',
      title: 'Validation & Test Run',
      desc: 'Running a test executes the current rule flow against a sample data set and shows results per block — pass count, flag count, and error count displayed as a badge on each block. A summary bar at the top shows overall flow health. Blocks with high error rates are highlighted in amber; failing blocks in red.',
      details: ['Per-block pass/flag/error badge', 'Summary bar: overall health score', 'Amber warning for high flag rates', 'Sample vs live data toggle'],
    },
    {
      num: '04',
      title: 'Deployment & Approval Screen',
      desc: 'Submitting for deployment triggers an approval workflow. The compliance manager sees a diff view of what changed vs the current production rule set. The risk officer receives a notification with the same diff — they can approve or reject with comments. Only after sign-off does the deployment proceed.',
      details: ['Diff view: current production vs proposed', 'Approval gate: risk officer sign-off required', 'Full audit trail — approver name + timestamp', 'Deployment confirmation with rollback option'],
    },
    {
      num: '05',
      title: 'Deployment Log & Monitoring',
      desc: 'Post-deployment, the canvas shifts to a monitoring view. Each block shows live operational data — daily volume, current pass rate, flag rate trend. Deviation from baseline triggers an amber alert on the block. The deployment log shows a history of all changes, who approved them, and what changed.',
      details: ['Live operational metrics per block', 'Trend sparkline per block', 'Amber alert on deviation from baseline', 'Full deployment history with diff access'],
    },
  ]

  return (
    <section id="hifi" style={{ backgroundColor: '#f9f9f7' }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>07 — High-Fidelity UI</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          5 core screens, one complete compliance workflow
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Every screen was executed at 1440px desktop, dark-mode-first, with frankieOne purple as the sole
          primary action colour. The design language is intentionally restrained — in a compliance context,
          visual noise undermines confidence.
        </p>

        {/* Hero canvas image */}
        <div className="mb-16">
          <ProcessImage
            src={null}
            label="Rule builder canvas — full pixel-perfect UI (main screen)"
            hint="Dark background (#0F0F12). Left panel: block library — Identity, Risk, AML sections, each block as puzzle-piece card with icon + label. Centre canvas: 5-6 connected blocks (Personal Info → Duplicate Check → Identity Match → Blocklist → Sanctions Screen → Approve/Flag). Purple connector lines. One block selected/highlighted with config drawer visible on right (threshold slider, data source). Top bar: frankieOne logo, flow name (editable), Auto Configure, Validate, Deploy (purple CTA). Per-block pass rate badges."
            aspect="aspect-[16/9]"
          />
          <ImageCaption>The rule builder canvas — the primary workspace where compliance teams assemble, configure, and validate KYC flows.</ImageCaption>
        </div>

        {/* Per-screen breakdown */}
        <div className="space-y-0 divide-y divide-zinc-200">
          {screens.map((screen, i) => (
            <div key={screen.num}>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 py-14"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: PURPLE }}>
                      {screen.num}
                    </div>
                    <h3 className="text-zinc-900 text-xl font-bold">{screen.title}</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{screen.desc}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Screen specifications</p>
                  <ul className="space-y-2">
                    {screen.details.map(d => (
                      <li key={d} className="flex items-start gap-3 text-zinc-600 text-sm">
                        <span className="mt-0.5 shrink-0" style={{ color: PURPLE }}>—</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              {/* Per-screen image slot */}
              <div className="pb-12">
                <ProcessImage
                  src={null}
                  label={`Screen ${screen.num} — ${screen.title}`}
                  hint={`High-fidelity UI for ${screen.title}. Dark background, purple accents, Inter typeface. See screen specifications above for exact content requirements. Use MacBook Pro 14_ PNG from Downloads/Frankieone/ as device frame if needed.`}
                  aspect="aspect-[16/9]"
                />
                <ImageCaption>Screen {screen.num}: {screen.title}</ImageCaption>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: GOVERNANCE ──────────────────────────────────────────────────────
function Governance() {
  return (
    <section id="govern" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel light>08 — Governance Layer</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          In regulated industries, deploy is a sign-off — not a button
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          The approval gate was the feature compliance managers responded to most strongly.
          It gave the tool enterprise credibility: a junior compliance analyst could build a rule change
          knowing it could never go live without a risk officer's explicit sign-off.
        </p>

        {/* Approval pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {[
            {
              step: '01', label: 'Build & Validate',
              desc: 'Compliance manager builds the rule change on canvas and runs a test against sample data. Pass rates and flag rates validated before submission.',
              icon: '◈',
            },
            {
              step: '02', label: 'Submit for Review',
              desc: 'Submitting generates a diff view — current production rules vs proposed changes. Diff is human-readable, not a code comparison.',
              icon: '→',
            },
            {
              step: '03', label: 'Risk Officer Sign-off',
              desc: 'Risk officer receives the diff with full context — who built it, when, what changed, and what the test results showed. Approve or reject with comments.',
              icon: '✓',
            },
            {
              step: '04', label: 'Deploy + Audit Trail',
              desc: 'On approval, the change deploys automatically. A full audit log records every change, approver, timestamp, and diff — meeting regulatory record-keeping requirements.',
              icon: '📋',
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-800 p-7 bg-zinc-900/50"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl opacity-40">{item.icon}</span>
                <span className="text-xs font-bold tracking-widest" style={{ color: PURPLE_MUTED }}>{item.step}</span>
              </div>
              <p className="text-white font-semibold text-sm mb-3">{item.label}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why this matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border border-zinc-800 rounded-2xl p-8">
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: PURPLE_MUTED }}>Why it earns enterprise trust</p>
            <div className="space-y-5">
              {[
                { t: 'Junior analysts can now build', b: 'The approval gate means junior team members can contribute rule changes knowing they can\'t accidentally push to production.' },
                { t: 'Compliance ≠ bottleneck', b: 'Previously, a compliance manager had to review code. Now they review a human-readable diff of their own logic. Review time dropped significantly.' },
                { t: 'Audit trail = regulatory evidence', b: 'Every change is timestamped, attributed, and preserved. This is not a nice-to-have in financial services — it\'s a regulatory requirement.' },
              ].map(item => (
                <div key={item.t} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: PURPLE }} />
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{item.t}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ProcessImage
              src={null}
              label="Deployment approval screen — diff view + risk officer sign-off"
              hint="Split-screen or card layout: left shows current production rule set (greyed out), right shows proposed changes (highlighted in indigo for additions, red for removals). Below: approver details, test run summary, Approve (indigo) / Reject (outline) buttons. Clean, structured — looks like a PR review, not a UI. Dark background."
              aspect="aspect-[4/3]"
              dark
            />
            <ImageCaption dark>The deployment approval screen — a diff of what changes, reviewed and signed off by a risk officer before anything goes live.</ImageCaption>
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
      title: 'Constrained canvases outperform open ones for task-completion work',
      body: 'Compliance managers aren\'t brainstorming — they have a specific flow to build. Model 1\'s open canvas created blank-canvas paralysis. Model 2\'s structured panel-and-canvas layout with Auto Configure eliminated cold-start friction and matched the compliance manager\'s mental model far more closely.',
    },
    {
      n: '02',
      title: 'Block shape is a UX decision, not a visual one',
      body: 'Puzzle-piece blocks communicated directionality and connection before any instruction — users instinctively tried to attach blocks to each other. Rounded rectangles read as data cards, not interactive components. Shape carried meaning that copy and icons couldn\'t.',
    },
    {
      n: '03',
      title: 'Inline validation changes how users build',
      body: 'When pass rate and flag rate appeared per block during test runs, compliance managers started tuning rules iteratively rather than building the whole flow first and testing at the end. Real-time feedback transformed the building behaviour from waterfall to iterative.',
    },
    {
      n: '04',
      title: 'Approval gates create organisational trust',
      body: 'The deployment approval step — a risk officer signs off on a human-readable diff before anything goes live — was the feature compliance managers reacted to most positively. It gave them accountability visibility and made the tool safe enough to delegate to junior team members.',
    },
  ]

  return (
    <section id="reflect" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>09 — Findings & Reflection</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          What this project taught me about designing for regulated industries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {findings.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-zinc-200 rounded-2xl p-7 border-l-4"
              style={{ borderLeftColor: PURPLE }}
            >
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: PURPLE }}>Finding {f.n}</p>
              <h4 className="text-zinc-900 font-semibold text-base mb-3">{f.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Divider />

        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold mb-8" style={{ color: PURPLE }}>What I learnt</p>
          {[
            'The most important design decision was choosing to constrain the canvas. Every instinct in product design says "give users more power" — but power without structure is friction wearing a different mask. Compliance managers needed a tool that matched their mental model, not a blank playground.',
            'The atom → molecule → organism hierarchy turned out to be more than an architectural choice — it became a shared language between design, product, and engineering. When everyone could say "this is an atom-level check inside the onboarding molecule," conversations about scope, testing, and versioning became dramatically clearer. Naming your design system properly is a product strategy decision.',
            'Designing for governance — the approval gate, the diff view, the deployment log — was where this tool became genuinely enterprise-grade. Most SaaS tools treat deployment as a button. In regulated industries, deployment is a sign-off process with legal consequences. That distinction drove the most consequential design decisions in this project, and it\'s something no amount of design system work alone could have surfaced. It required understanding the regulatory environment the product lived in.',
          ].map((p, i) => (
            <p key={i} className={`leading-relaxed mb-6 last:mb-0 ${i === 0 ? 'text-zinc-700 text-lg' : 'text-zinc-500 text-base'}`}>
              {p}
            </p>
          ))}
        </div>

      </motion.div>
    </section>
  )
}

// ─── FOOTER / CTA ─────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
      >
        <div>
          <p className="text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">frankieOne · 2024</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Onkar Lanke<br />
            <span style={{ color: PURPLE_MUTED }}>Senior Product Designer</span>
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">OL</div>
            <a
              href="https://www.linkedin.com/in/onkarlanke/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 text-xs hover:text-indigo-400 transition-colors"
            >
              linkedin.com/in/onkarlanke →
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-indigo-400 hover:text-indigo-400 transition-all"
          >
            ← Back to all work
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function FrankieOneDetail() {
  return (
    <main className="antialiased" style={{ backgroundColor: DARK }}>
      <StickyNav />
      <Hero />
      <Brief />
      <Strategy />
      <Research />
      <Benchmarking />
      <DesignSystem />
      <CanvasDesign />
      <HiFi />
      <Governance />
      <Reflection />
      <FooterCTA />
    </main>
  )
}
