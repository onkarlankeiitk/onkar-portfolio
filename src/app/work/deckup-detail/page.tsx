'use client'

// app/work/deckup-detail/page.tsx
// Full custom detail page — DeckUp · PowerPoint Productivity SaaS
// Brand: dark navy (#0B1628) + blue (#2563EB) + white

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Nav from '@/components/Nav'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DARK  = '#0B1628'
const BLUE  = '#2563EB'
const BLUE_MUTED = '#93C5FD'

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Pill({ children, blue }: { children: React.ReactNode; blue?: boolean }) {
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full border font-medium ${
      blue
        ? 'bg-blue-50 text-blue-700 border-blue-200'
        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
    }`}>
      {children}
    </span>
  )
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.2em] uppercase font-semibold mb-4 ${light ? 'text-blue-400' : 'text-blue-500'}`}>
      {children}
    </p>
  )
}

function Divider({ dark }: { dark?: boolean }) {
  return <div className={`border-t my-16 ${dark ? 'border-zinc-800' : 'border-zinc-100'}`} />
}

function ProcessImage({ src, label, hint, aspect = 'aspect-video', dark = false }: {
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
        → public/case-studies/Deck Up/
      </p>
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
  { id: 'idea',      label: 'The Idea' },
  { id: 'research',  label: 'Research' },
  { id: 'compete',   label: 'Competitive' },
  { id: 'ia',        label: 'Architecture' },
  { id: 'flows',     label: 'Flows' },
  { id: 'system',    label: 'Design System' },
  { id: 'toolbar',   label: 'Toolbar' },
  { id: 'platform',  label: 'Platform' },
  { id: 'qa',        label: 'Testing' },
  { id: 'chargebee', label: 'Tech Stack' },
  { id: 'prelaunch', label: 'Pre-launch' },
  { id: 'reflect',   label: 'Reflection' },
  { id: 'team',      label: 'Team' },
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
            active === item.id ? 'text-blue-400 translate-x-1' : 'text-zinc-500 hover:text-zinc-300'
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
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${BLUE} 1px, transparent 1px), linear-gradient(90deg, ${BLUE} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Blue radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)` }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-400 text-xs hover:text-blue-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to work
        </Link>
        <div className="flex gap-2">
          {['SaaS', 'B2B', 'PowerPoint Plugin'].map(t => (
            <Pill key={t} blue>{t}</Pill>
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
            <div className="px-3 py-1.5 rounded-lg text-white text-xs font-bold tracking-wider"
              style={{ backgroundColor: BLUE }}>
              DU
            </div>
            <div className="h-px flex-1 max-w-xs" style={{ backgroundColor: BLUE, opacity: 0.3 }} />
          </div>
          <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-4 font-medium">
            SlideXpress · DeckUp · 2024
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-6xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tight leading-none mb-6"
        >
          Deck<span style={{ color: BLUE_MUTED }}>Up</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          className="text-zinc-400 text-xl md:text-2xl font-light max-w-2xl mb-12 leading-relaxed"
        >
          A PowerPoint productivity plugin that reduces repetitive formatting, data visualisation,
          and consistency work by up to 60% — built end-to-end for consultants and strategy teams.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-8"
        >
          {[
            { label: 'Client',   value: 'SlideXpress' },
            { label: 'Role',     value: 'Product Design Specialist' },
            { label: 'Timeline', value: 'Ongoing' },
            { label: 'Year',     value: '2024' },
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
          "Consultants live in PowerPoint. Every click saved is time given back."
        </p>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-zinc-600 text-xs">
          Scroll ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── SECTION: THE IDEA ────────────────────────────────────────────────────────
function TheIdea() {
  return (
    <section id="idea" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>01 — The Idea</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Internal expertise, productised.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          SlideXpress, a unit of Mindseye Creative Studio, had spent years delivering high-quality deck design services.
          Over time, the team built techniques, shortcuts, and internal tools for faster implementation, creativity, and quality.
          That knowledge usually lived in training sessions and internal workshops. Then came the question: <em>why not turn this into a product?</em>
        </p>

        {/* Origin story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              head: 'The origin',
              body: 'SlideXpress had been building and refining deck production techniques for years. The team had solved — for themselves — many of the pain points their clients struggled with daily. DeckUp was the decision to stop keeping that knowledge internal and offer it to the world as a tool.',
            },
            {
              head: 'The two-phase plan',
              body: 'Development was scoped deliberately. Phase I would focus on the core plugin and subscription platform — getting the product into users\' hands with proven, high-value features. Phase II would layer in AI for personalisation, smart deck generation from a content library, and data-driven creation flows.',
            },
            {
              head: 'The design challenge',
              body: 'Building a four-platform product from scratch: a marketing website, a subscription and user management dashboard, the PowerPoint plugin toolbar itself, and a standalone installer. Each platform serves different users with different needs — all held together by a shared design system.',
            },
          ].map(col => (
            <div key={col.head}>
              <h3 className="text-zinc-900 font-semibold text-base mb-3">{col.head}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>

        {/* Phase roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {[
            {
              phase: 'Phase I',
              label: 'Core plugin & platform',
              status: 'Shipped',
              statusStyle: 'bg-green-100 text-green-700',
              items: [
                'PowerPoint toolbar plugin — 5 core feature groups',
                'Subscription & user management dashboard',
                'Marketing website with ordering flow',
                'Standalone PC/laptop installer',
                'Cross-functional onboarding — 4 plan types',
                'Chargebee subscription engine + analytics',
              ],
              border: 'border-blue-200',
              headBg: 'bg-blue-50',
            },
            {
              phase: 'Phase II',
              label: 'AI integration & personalisation',
              status: 'Planned',
              statusStyle: 'bg-amber-100 text-amber-700',
              items: [
                'AI-powered deck personalisation',
                'Smart deck generation from content library',
                'Data-driven slide creation',
                'Feature updates driven by Phase I usage data',
                'Enhanced team collaboration tools',
                'Advanced analytics for power users',
              ],
              border: 'border-zinc-200',
              headBg: 'bg-zinc-50',
            },
          ].map(p => (
            <div key={p.phase} className={`rounded-2xl border overflow-hidden ${p.border}`}>
              <div className={`px-7 py-5 flex items-center justify-between ${p.headBg}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BLUE }}>{p.phase}</span>
                  <p className="text-zinc-800 font-semibold text-base mt-0.5">{p.label}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${p.statusStyle}`}>{p.status}</span>
              </div>
              <div className="px-7 py-5 bg-white">
                <ul className="space-y-2.5">
                  {p.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-zinc-600 text-sm">
                      <span style={{ color: BLUE }} className="mt-0.5 shrink-0">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Impact numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden mb-16">
          {[
            { v: '60%',  l: 'Productivity gain',        s: 'For daily power users' },
            { v: '7',    l: 'Competitors benchmarked',  s: 'Onboarding + features + pricing' },
            { v: '4',    l: 'Platforms designed',       s: 'Website · Dashboard · Plugin · Installer' },
            { v: '60+',  l: 'Design system components', s: 'Built from scratch in Figma' },
          ].map(m => (
            <div key={m.l} className="bg-white px-6 py-8">
              <div className="text-4xl font-bold mb-1" style={{ color: BLUE }}>{m.v}</div>
              <div className="text-zinc-700 text-sm font-medium mb-0.5">{m.l}</div>
              <div className="text-zinc-400 text-xs">{m.s}</div>
            </div>
          ))}
        </div>

        {/* 4-platform ecosystem */}
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">The 4-platform ecosystem</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { platform: 'Website',   role: 'Market product, provide info, resources, order, support', icon: '🌐' },
            { platform: 'Dashboard', role: 'Subscription management, user add/delete, renewals',       icon: '📊' },
            { platform: 'Plugin',    role: 'Productivity features, licence validation, account sync',  icon: '🔌' },
            { platform: 'Installer', role: 'Installation, activation, account sync',                  icon: '⚙️' },
          ].map(p => (
            <div key={p.platform} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
              <div className="text-2xl mb-3">{p.icon}</div>
              <p className="text-zinc-800 text-sm font-semibold mb-2">{p.platform}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{p.role}</p>
            </div>
          ))}
        </div>

        <ProcessImage
          src={null}
          label="DeckUp service map — 4-platform ecosystem"
          hint="Service map showing the full DeckUp ecosystem: Website (marketing, order, support) → Dashboard (subscriptions, user management) → Plugin (productivity features, licence) → Installer (install, activate, sync). Show relationships and data flows between platforms. From Service map.pdf."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>The DeckUp service map — four interconnected platforms serving consultants, corporate users, and IT admins.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: USER RESEARCH ───────────────────────────────────────────────────
function Research() {
  const userTypes = [
    {
      segment: 'Consultants',
      type: 'Product User',
      primary: true,
      desc: 'Strategy and management consultants building client-facing deliverables. High-frequency PowerPoint users — often 5–8 hours per day. Deeply familiar with formatting conventions. Primary drivers of the productivity pain point.',
      needs: ['One-click formatting and alignment', 'Consistency checks across large decks', 'Fast agenda and TOC generation', 'Reliable table formatting tools', 'Creative data visualisation without building from scratch'],
      pains: ['4–6 clicks for every common formatting task', 'Inconsistent fonts and alignment across slides', 'Re-doing the same tasks in every new deck', 'Building charts and infographics from scratch every time'],
    },
    {
      segment: 'Corporate Managers',
      type: 'Product User',
      primary: false,
      desc: 'Senior managers and directors in large enterprises who build internal reports, board decks, and business reviews. Less frequent users than consultants, but high value per session. Prioritise consistency and professional appearance.',
      needs: ['Template and brand consistency enforcement', 'Clean, professional output quickly', 'Easy label and classification system'],
      pains: ['Brand inconsistency across team decks', 'Time wasted on formatting that should be automatic'],
    },
    {
      segment: 'IT Admins',
      type: 'Platform User',
      primary: false,
      desc: 'The actual purchase and deployment decision-maker in enterprise accounts. Never touches the plugin directly — manages licence allocation, user provisioning, and renewals through the Dashboard. Different goals from all other users.',
      needs: ['Bulk licence management and user provisioning', 'Clear renewal and billing visibility', 'Transfer and deactivation controls'],
      pains: ['No visibility into per-user usage', 'Complex enterprise renewal processes', 'No self-service for adding users mid-term'],
    },
  ]

  return (
    <section id="research" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>02 — User Research</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Two different users. One product. Completely different jobs.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          DeckUp serves two fundamentally different user types — Product users who work inside the plugin every day,
          and Platform users (IT Admins) who never touch it but control who gets access.
          Designing for both without confusing either was the central research challenge.
        </p>

        {/* User type cards */}
        <div className="space-y-5 mb-16">
          {userTypes.map((u, i) => (
            <motion.div
              key={u.segment}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border overflow-hidden ${u.primary ? 'border-blue-200' : 'border-zinc-200'}`}
            >
              <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${u.primary ? 'bg-blue-50' : 'bg-zinc-50'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-widest ${u.primary ? 'text-blue-500' : 'text-zinc-400'}`}>
                    {u.type}
                  </span>
                  <span className="text-zinc-800 font-semibold text-base">{u.segment}</span>
                  {u.primary && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: BLUE, color: 'white' }}>Primary</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
                <div className="px-8 py-6">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Who they are</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">{u.desc}</p>
                </div>
                <div className="px-8 py-6">
                  <p className="text-xs text-blue-500 uppercase tracking-widest mb-2 font-semibold">Needs</p>
                  <ul className="space-y-2">
                    {u.needs.map(n => (
                      <li key={n} className="flex items-start gap-2 text-zinc-600 text-sm">
                        <span style={{ color: BLUE }} className="mt-0.5 shrink-0">→</span> {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 py-6">
                  <p className="text-xs text-red-400 uppercase tracking-widest mb-2 font-semibold">Pain points</p>
                  <ul className="space-y-2">
                    {u.pains.map(p => (
                      <li key={p} className="flex items-start gap-2 text-zinc-600 text-sm">
                        <span className="text-red-400 mt-0.5 shrink-0">✕</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User segments visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-5">Product users (plugin)</p>
            <div className="space-y-3">
              {[
                { label: 'Consultants',              desc: 'Strategy & management, client deliverables' },
                { label: 'Corporate Managers',       desc: 'Internal reports, board decks, reviews' },
                { label: 'Individual Professionals', desc: 'Freelancers, contractors, specialists' },
                { label: 'Presentation Specialists', desc: 'Dedicated deck builders at agencies' },
                { label: 'Educators',                desc: 'Professors and students, academic decks' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white" style={{ backgroundColor: BLUE }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-zinc-800 text-sm font-medium">{s.label}</p>
                    <p className="text-zinc-400 text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-5">Platform users (dashboard)</p>
            <div className="space-y-3">
              {[
                { label: 'IT Administrators', desc: 'Licence management, user provisioning, billing' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white" style={{ backgroundColor: BLUE }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-zinc-800 text-sm font-medium">{s.label}</p>
                    <p className="text-zinc-400 text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 mt-4">
                <p className="text-blue-500 text-xs font-semibold uppercase tracking-wide mb-2">Key insight</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  In enterprise accounts, the end user (consultant) and the buyer (IT admin) are different people.
                  The admin never uses the plugin but controls who gets access. The dashboard had to speak
                  to admin needs — not consultant needs — while the plugin spoke exclusively to consultants.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <ProcessImage
                src={null}
                label="User segment map — Product users vs Platform users"
                hint="Diagram showing the two user tracks: Product users (Consultants, Corporate, Individual, Presentation specialists, Educators) and Platform users (IT Admins). Show which platforms each uses. From files 2.pdf and 4.pdf in the UX Work folder."
                aspect="aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Pricing model */}
        <div>
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-6">Pricing model — financial planning & product sustainability</p>
          <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed mb-8">
            Pricing wasn't treated as an afterthought. The model went through a critical study to balance product sustainability
            with competitive positioning. Three user tiers were defined, each with a distinct value proposition
            and commercial logic — ensuring DeckUp could fund its own growth while remaining accessible to its primary audience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tier: 'Personal',
                target: 'Individual consultants & freelancers',
                logic: 'Single-seat licence. Low friction entry. Free trial drives conversion. Annual billing preferred for revenue predictability.',
                accent: 'border-blue-200 bg-blue-50',
                label: 'text-blue-500',
              },
              {
                tier: 'Teams',
                target: 'Agencies and consulting firms (2–49 seats)',
                logic: 'Per-seat pricing with team discount threshold. Admin dashboard access included. Renewal via annual subscription — reduces churn risk.',
                accent: 'border-zinc-200 bg-zinc-50',
                label: 'text-zinc-500',
              },
              {
                tier: 'Enterprise',
                target: 'Large organisations (50+ seats)',
                logic: 'Custom pricing via get-a-quote flow. Pro-rata additions mid-term. IT Admin controls all provisioning. Dedicated onboarding and support.',
                accent: 'border-zinc-200 bg-zinc-50',
                label: 'text-zinc-500',
              },
            ].map(t => (
              <div key={t.tier} className={`rounded-2xl border p-6 ${t.accent}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${t.label}`}>{t.tier}</p>
                <p className="text-zinc-800 text-sm font-semibold mb-2">{t.target}</p>
                <p className="text-zinc-500 text-xs leading-relaxed">{t.logic}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: COMPETITIVE ANALYSIS ───────────────────────────────────────────
function Competitive() {
  const competitors = [
    { name: 'PPT Productivity',   focus: 'Alignment & formatting', gap: 'No subscription management, limited consistency tools' },
    { name: 'Power-User',         focus: 'Charts & data viz',       gap: 'Complex UI, steep learning curve for non-technical users' },
    { name: 'Efficient Elements', focus: 'Element libraries',        gap: 'Enterprise-only pricing, high barrier to entry' },
    { name: 'think-cell',         focus: 'Chart automation',        gap: 'Narrow scope — only charts, not full workflow' },
    { name: 'Grammarly',          focus: 'Writing quality',         gap: 'Different category — benchmarked for onboarding patterns only' },
    { name: 'Macabacus',          focus: 'Financial formatting',    gap: 'Finance-specific, not generalist enough' },
    { name: 'Lucidchart',         focus: 'Diagrams & charts',       gap: 'Not a PowerPoint plugin — separate tool entirely' },
  ]

  const onboardingInsights = [
    { tool: 'Microsoft',  insight: 'Frictionless account creation, but no trial differentiation — everything requires a paid licence upfront' },
    { tool: 'Grammarly',  insight: 'Best-in-class free trial flow — immediate value before payment, strong progressive disclosure' },
    { tool: 'think-cell', insight: 'Very technical onboarding — assumes expert users, no handholding. Works for their niche.' },
    { tool: 'Powtoon',    insight: 'Gamified onboarding with quick wins — good model for keeping trial users engaged through activation' },
  ]

  return (
    <section id="compete" className="px-8 md:px-16 lg:px-24 py-28 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>03 — Competitive Analysis</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Every competitor solved one problem. DeckUp needed to solve five.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Seven tools were benchmarked across features, pricing, and onboarding. The finding:
          existing tools either went too deep in one area (think-cell for charts) or too broad with too much complexity.
          None of them addressed the full consultant workflow.
        </p>

        {/* Competitor grid */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 mb-16">
          <div className="grid grid-cols-3 bg-zinc-900">
            <div className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest">Tool</div>
            <div className="px-6 py-4 text-zinc-400 text-sm font-medium border-l border-zinc-800">Core focus</div>
            <div className="px-6 py-4 text-zinc-400 text-sm font-medium border-l border-zinc-800">Gap vs DeckUp</div>
          </div>
          {competitors.map((c, i) => (
            <div key={c.name} className={`grid grid-cols-3 border-t border-zinc-100 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}>
              <div className="px-6 py-4 text-zinc-800 text-sm font-semibold">{c.name}</div>
              <div className="px-6 py-4 text-zinc-500 text-sm border-l border-zinc-100">{c.focus}</div>
              <div className="px-6 py-4 text-zinc-400 text-xs leading-relaxed border-l border-zinc-100">{c.gap}</div>
            </div>
          ))}
        </div>

        {/* Onboarding comparison */}
        <div className="mb-16">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Onboarding benchmarking — 5 platforms compared</p>
          <div className="space-y-4">
            {onboardingInsights.map(item => (
              <div key={item.tool} className="flex items-start gap-5 bg-white border border-zinc-200 rounded-xl px-6 py-4">
                <div className="px-3 py-1 rounded-lg text-xs font-bold shrink-0 text-white" style={{ backgroundColor: BLUE }}>
                  {item.tool}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.insight}</p>
              </div>
            ))}
            <div className="flex items-start gap-5 border-2 rounded-xl px-6 py-4" style={{ borderColor: BLUE, backgroundColor: '#EFF6FF' }}>
              <div className="px-3 py-1 rounded-lg text-xs font-bold shrink-0 text-white" style={{ backgroundColor: BLUE }}>
                DeckUp
              </div>
              <p className="text-blue-800 text-sm leading-relaxed font-medium">
                Free trial with immediate plugin access → 30-day activation → clear Buy Now path on expiry.
                Grammarly's progressive disclosure model adopted for onboarding; think-cell's licence management
                model adapted for the enterprise flow.
              </p>
            </div>
          </div>
        </div>

        <ProcessImage
          src={null}
          label="Competitive benchmarking — onboarding flow comparison across 5 platforms"
          hint="Side-by-side comparison of onboarding flows: DeckUp vs Microsoft vs Grammarly vs think-cell vs Powtoon. Show step counts, friction points, trial access patterns, and pricing presentation for each. From 'Onboarding flows comparison between Deckup, Microsoft, Grammarly, Thinkcell, POwtoon.pdf'."
          aspect="aspect-[16/8]"
        />
        <ImageCaption>Onboarding flow comparison — DeckUp benchmarked against 4 direct and adjacent competitors.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: INFORMATION ARCHITECTURE ───────────────────────────────────────
function IA() {
  const websiteSections = [
    { name: 'Home',      children: ['Brand statement', 'Product overview', 'Feature highlights', 'Pricing CTA', 'Social proof'] },
    { name: 'Features',  children: ['Quick Tools', 'Table formatting', 'Agendas & TOC', 'Infographics', 'Labels & consistency'] },
    { name: 'Order',     children: ['Plan comparison', 'Personal / Teams / Enterprise', 'Free trial CTA', 'Buy Now flow'] },
    { name: 'Support',   children: ['Help articles', 'Contact form', 'Chatbot integration', 'Onboarding guides'] },
    { name: 'Resources', children: ['Blog', 'Video tutorials', 'Templates', 'Webinars'] },
    { name: 'Pricing',   children: ['Tier comparison', 'Pro-rata calculator', 'Enterprise quote'] },
    { name: 'Login',     children: ['Account dashboard', 'Subscription status', 'User management'] },
    { name: 'About',     children: ['Company story', 'Team', 'Mission'] },
  ]

  return (
    <section id="ia" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>04 — Information Architecture</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          8-section website designed to move visitors from discovery to trial
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          The website's primary job is converting first-time visitors — who may never have heard of DeckUp —
          into trial users. Every section was ordered and scoped to move people one step closer to starting a free trial.
        </p>

        {/* Website sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-16">
          {websiteSections.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden border border-zinc-200"
            >
              <div className="px-3 py-2.5 text-white text-xs font-semibold" style={{ backgroundColor: DARK }}>
                {s.name}
              </div>
              <div className="px-3 py-3 bg-white space-y-1.5">
                {s.children.map(c => (
                  <p key={c} className="text-zinc-500 text-xs leading-snug flex items-start gap-1">
                    <span style={{ color: BLUE }} className="mt-0.5 shrink-0">›</span> {c}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Website IA wireframe */}
        <div className="mb-16">
          <ProcessImage
            src={null}
            label="Website sitemap wireframe — 8-section structure"
            hint="Annotated sitemap diagram showing all 8 website sections with page hierarchy. Show: Home → Features → Order → Support → Resources → Pricing → Login → About. From Architecture.pdf or A4 - 2.pdf in the UX Work folder."
            aspect="aspect-[16/8]"
          />
          <ImageCaption>Website IA — 8 sections designed to guide visitors from product discovery to free trial conversion.</ImageCaption>
        </div>

        {/* IA brainstorming insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <p className="text-blue-500 text-xs uppercase tracking-widest font-semibold mb-5">Key CTAs defined in IA phase</p>
            <div className="space-y-3">
              {[
                { cta: 'Try for free',    context: 'Primary acquisition — low friction entry point' },
                { cta: 'Get started',     context: 'Feature page — after user understands the product' },
                { cta: 'Request demo',    context: 'Enterprise flow — high-intent lead capture' },
                { cta: 'Buy now',         context: 'Pricing page — direct purchase path' },
                { cta: 'Start now',       context: 'Homepage hero — impulse action CTA' },
              ].map(item => (
                <div key={item.cta} className="flex items-center gap-4">
                  <div className="px-3 py-1 rounded-lg text-xs font-bold text-white shrink-0" style={{ backgroundColor: BLUE }}>
                    {item.cta}
                  </div>
                  <p className="text-zinc-500 text-xs">{item.context}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <p className="text-blue-500 text-xs uppercase tracking-widest font-semibold mb-5">Core product USPs identified</p>
            <div className="space-y-3">
              {[
                'Consistency across all slides — "just a click"',
                'Neat, professional decks without manual effort',
                'Ready-to-use templates for common formats',
                'Work 2× faster with smart elements',
                'Standardisation across team and company decks',
              ].map(usp => (
                <div key={usp} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: BLUE }} />
                  <p className="text-zinc-600 text-sm leading-relaxed">{usp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: USER FLOWS ─────────────────────────────────────────────────────
function Flows() {
  const flows = [
    {
      num: '01',
      name: 'Free Trial',
      trigger: 'User clicks "Try for free"',
      steps: ['Sign up form', 'Email verification', 'Payment info (card/PayPal)', 'Installer download', '30-day trial activation', 'Expiry → Buy Now / Deactivate'],
      note: 'Payment collected upfront to reduce churn on trial → paid conversion. 30-day window with no automatic charge.',
    },
    {
      num: '02',
      name: 'Buy Now',
      trigger: 'User clicks "Buy Now" or upgrades from trial',
      steps: ['Sign Up / Login', 'Email verification', 'Set password', 'Select plan (Personal / Teams / Enterprise)', 'Payment info → Make payment', 'Installer download → Activation'],
      note: 'Plan selection is the most critical decision point — Personal vs Teams triggers different dashboard and user management flows.',
    },
    {
      num: '03',
      name: 'Enterprise',
      trigger: 'User clicks "Get a quote" (50+ licences)',
      steps: ['Get a quote form (Name, Email, Org, Purpose, Licence count)', 'Contact from DeckUp team', 'Custom pricing negotiation', 'Dashboard access', 'Bulk user provisioning', 'Buy more users (pro-rata)'],
      note: 'IT Admin is the primary actor here — not the end user. The dashboard flow had to be designed entirely around admin mental models.',
    },
    {
      num: '04',
      name: 'Renewal',
      trigger: 'Subscription approaching expiry',
      steps: ['30-day reminder email', '15-day reminder email', '7-day reminder email', 'Review subscription → payment details', 'Auto-charge (if enabled) or manual payment', 'Renewal confirmation'],
      note: 'Two paths: Automatic renewal (card saved) and Manual renewal. Email reminders at 30/15/7 days ensure no accidental lapses.',
    },
  ]

  return (
    <section id="flows" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel light>05 — User Flows</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          6 journeys. Every edge case accounted for.
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          Every possible path through the DeckUp platform was mapped before a single screen was designed.
          Flows for onboarding, enterprise, renewal, and the installer activation all have distinct logic
          — and they had to connect seamlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {flows.map((flow, i) => (
            <motion.div
              key={flow.num}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-zinc-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: BLUE }}>
                  {flow.num}
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{flow.name} Flow</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{flow.trigger}</p>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {flow.steps.map((step, si) => (
                    <div key={step} className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs px-2.5 py-1 rounded-lg border border-zinc-700 text-zinc-300 bg-zinc-800/50">{step}</span>
                      {si < flow.steps.length - 1 && <span className="text-zinc-700 text-xs">→</span>}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 px-4 py-3">
                  <p className="text-blue-300 text-xs leading-relaxed">{flow.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Installer flow */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">Installer flow — the bridge between website and plugin</p>
          <div className="flex flex-wrap items-center gap-3">
            {['Download installer', 'Run installation', 'Enter activation email', '30-day trial begins', 'Trial expires →', 'Buy Now / Renew / Login'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-3 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-xs bg-zinc-800/50">{step}</div>
                {i < 5 && <span className="text-zinc-600 text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Flow diagram images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ProcessImage
              src={null}
              label="Onboarding flows — Free Trial & Buy Now paths"
              hint="Side-by-side flow diagrams showing: (1) Free Trial: Form → Email verification → Payment info → Installer → 30-day activation → Expiry. (2) Buy Now: Sign up → Email → Set password → Plan selection (Personal/Teams/Enterprise) → Payment → Installer. From 'onboarding flows_ BUy now.pdf' and 'onboarding flows_ Free trial.pdf'."
              aspect="aspect-[4/3]"
              dark
            />
            <ImageCaption dark>Free Trial and Buy Now onboarding flows — two distinct paths to plugin activation.</ImageCaption>
          </div>
          <div>
            <ProcessImage
              src={null}
              label="Renewal & Enterprise flows"
              hint="Renewal flow: Manual vs Automatic paths with 30/15/7 day email reminders. Enterprise flow: Get a quote → Contact → Dashboard → Bulk provisioning → Pro-rata additions. From 'Renew flows.pdf' and 'Enterprise flow.pdf'."
              aspect="aspect-[4/3]"
              dark
            />
            <ImageCaption dark>Renewal and Enterprise flows — subscription lifecycle management for all account types.</ImageCaption>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: DESIGN SYSTEM ───────────────────────────────────────────────────
function DesignSystem() {
  const componentGroups = [
    {
      group: 'Buttons',
      components: ['Primary button', 'Secondary button'],
      states: ['Default', 'Hover', 'Active', 'Disabled'],
      desc: 'Two button types for all CTAs across plugin, dashboard, and website. State management ensures consistent interaction feedback.',
    },
    {
      group: 'Form Controls',
      components: ['Text box', 'Radio button', 'Tick box / Checkbox'],
      states: ['Default', 'Hover', 'Active', 'Error'],
      desc: 'Form components used across onboarding flows, payment screens, and dashboard settings. Error states designed for all input validation cases.',
    },
    {
      group: 'Labels & Links',
      components: ['Inline labels', 'Navigation links', 'Action links'],
      states: ['Default', 'Hover', 'Active', 'Visited'],
      desc: 'Text-based interactive elements for all navigation and content linking. Hover states ensure clear affordance for clickable text.',
    },
    {
      group: 'Toolbar Components',
      components: ['Tool button', 'Panel header', 'Section divider', 'Status indicator'],
      states: ['Default', 'Hover', 'Active', 'Locked'],
      desc: 'Plugin-specific components designed for the compact toolbar environment — optimised for small surface area and frequent interaction.',
    },
  ]

  return (
    <section id="system" className="px-8 md:px-16 lg:px-24 py-28 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>06 — Design System</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          One design system. Four platforms. Zero visual inconsistency.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          With four interconnected platforms — each serving different users in different contexts — a shared design
          system wasn't optional. Every component was built with all three interaction states (Default, Hover, Active)
          and documented for development handoff.
        </p>

        {/* Component groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {componentGroups.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden"
            >
              <div className="px-7 py-5 border-b border-zinc-100">
                <p className="text-zinc-800 font-semibold text-base">{g.group}</p>
              </div>
              <div className="px-7 py-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {g.components.map(c => (
                    <span key={c} className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-medium">{c}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {g.states.map(s => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">{s}</span>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* State demo visual */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-12">
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-6">Component state system — every component has all 3 states</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { state: 'Default', desc: 'Rest state — visible, accessible, not interacted with', style: 'border-zinc-300 text-zinc-600 bg-white' },
              { state: 'Hover',   desc: 'Mouse-over — clear affordance signal before click',    style: 'border-blue-400 text-blue-600 bg-blue-50' },
              { state: 'Active',  desc: 'Clicked / selected — confirms action, shows current state', style: 'border-blue-600 text-white', bgStyle: BLUE },
            ].map(item => (
              <div key={item.state} className="text-center">
                <div
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 text-sm font-semibold mb-3 ${item.style}`}
                  style={item.bgStyle ? { backgroundColor: item.bgStyle } : undefined}
                >
                  Button
                </div>
                <p className="text-zinc-700 text-xs font-semibold mb-1">{item.state}</p>
                <p className="text-zinc-400 text-xs leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Design system screenshot */}
        <ProcessImage
          src={null}
          label="Design system sheet — buttons, form controls, labels, toolbar components with all states"
          hint="Figma design system overview: show Primary and Secondary buttons with Default/Hover/Active states, Text box states, Radio buttons, Tick boxes, and Links. All laid out on a clean white background with blue accent (#2563EB). From 'Toolbar_ Default, Hover & Active state.pdf' in the Toolbar folder."
          aspect="aspect-[16/8]"
        />
        <ImageCaption>The DeckUp design system — 60+ components, all interaction states documented for a 4-platform product.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: TOOLBAR FEATURES ────────────────────────────────────────────────
function ToolbarFeatures() {
  const features = [
    {
      num: '01',
      name: 'Quick Tools',
      desc: 'The most-used formatting operations surfaced in a single-click toolbar. Alignment, distribution, sizing, and shape operations that normally require 4–6 native PowerPoint clicks reduced to one. The "just a click" philosophy made tangible.',
      tags: ['1-click formatting', 'Alignment', 'Distribution', 'Sizing'],
    },
    {
      num: '02',
      name: 'Table Formatting',
      desc: 'Intelligent table cleanup and formatting. Handles column widths, row heights, border consistency, and cell alignment — operations that are particularly painful in native PowerPoint, where table formatting behaves inconsistently.',
      tags: ['Column/row sizing', 'Border consistency', 'Cell alignment', '1-click cleanup'],
    },
    {
      num: '03',
      name: 'Agendas & Table of Contents',
      desc: 'Generates slide-based agendas and table of contents automatically from the deck structure. Eliminates the time consultants spend manually building and maintaining agenda slides — especially when slide order changes mid-project.',
      tags: ['Auto-generation', 'TOC from deck structure', 'Section tracking', 'Auto-update'],
    },
    {
      num: '04',
      name: 'Infographics',
      desc: 'A library of ready-to-use infographic templates — timelines, process diagrams, comparison charts — that consultants can populate with data rather than building from scratch in PowerPoint. Significant time saving for high-frequency slide types.',
      tags: ['Template library', 'Timelines', 'Process diagrams', 'Comparison charts'],
    },
    {
      num: '05',
      name: 'Labels & Identical Select',
      desc: 'Labels (Confidential, Draft, Example, Illustrative, Sample) applied across slides with one action. Identical Select finds all elements with matching properties — font, size, colour — and applies changes to all simultaneously, enforcing consistency across a full deck.',
      tags: ['Classification labels', 'Bulk property selection', 'Consistency enforcement', 'Batch edits'],
    },
  ]

  return (
    <section id="toolbar" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>07 — Toolbar Features</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          5 features. All of them solving the same root problem.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Every toolbar feature was derived from the research phase — each one targeting a specific category of
          repetitive task. The plugin panel lives inside PowerPoint, always accessible, without disrupting the
          user's working mode.
        </p>

        <div className="space-y-0 divide-y divide-zinc-100 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 py-14"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: BLUE }}>
                    {feature.num}
                  </div>
                  <h3 className="text-zinc-900 text-xl font-bold">{feature.name}</h3>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5">{feature.desc}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">What this feature does</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ProcessImage
              src={null}
              label="DeckUp toolbar — plugin panel in PowerPoint"
              hint="Screenshot of the DeckUp toolbar as it appears inside PowerPoint — showing the plugin panel with: Record, Present in Teams, Share buttons at top; Slide Elements section with On Page Tracker; Quick Tools section. Use the toolbar screenshots from the Toolbar folder (Screenshot 2026-04-17 files)."
              aspect="aspect-[4/3]"
            />
            <ImageCaption>The DeckUp toolbar panel — lives inside PowerPoint, always accessible without disrupting the workflow.</ImageCaption>
          </div>
          <div>
            <ProcessImage
              src={null}
              label="Labels feature — classification across all slides"
              hint="Toolbar panel showing the Labels feature: Confidential, Draft, Example, Illustrative, Sample options with Current Slide / All Slides / Slide Range selector. Shows application scope controls. From toolbar screenshots in the Toolbar folder."
              aspect="aspect-[4/3]"
            />
            <ImageCaption>Labels feature — classification labels applied across the full deck in one action.</ImageCaption>
          </div>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: SUBSCRIPTION PLATFORM ──────────────────────────────────────────
function Platform() {
  return (
    <section id="platform" className="px-8 md:px-16 lg:px-24 py-28 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>08 — Subscription Platform</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Built in parallel. Aligned every week.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          While the plugin team focused on toolbar features and interaction design, the platform team simultaneously
          built the subscription layer — user management, plan types, and admin controls. The two streams ran in parallel
          with weekly cross-team sessions to stay aligned on goals, match development timelines, and ensure the plugin
          and platform felt like one coherent product.
        </p>

        {/* Plan types */}
        <div className="mb-16">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Three plan types — three different user management experiences</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                plan: 'Single User',
                desc: 'Self-managed account. Subscription dashboard shows plan status, renewal date, billing history, and licence key. User manages their own account with no admin overhead.',
                features: ['Personal subscription view', 'Licence key management', 'Self-serve renewal', 'Billing history'],
                border: 'border-blue-200',
                headBg: 'bg-blue-50',
                accent: 'text-blue-500',
              },
              {
                plan: 'Teams',
                desc: 'Team owner manages seats. Can add/remove users, see per-seat usage, and handle renewals. Team members get plugin access without managing their own account.',
                features: ['Seat management', 'Add / remove team members', 'Usage visibility per user', 'Team-level renewal'],
                border: 'border-zinc-200',
                headBg: 'bg-zinc-50',
                accent: 'text-zinc-500',
              },
              {
                plan: 'Enterprise',
                desc: 'IT Admin as primary actor. Full licence provisioning, bulk user management, pro-rata additions mid-term, team-level access controls, and dedicated support channel.',
                features: ['IT Admin dashboard', 'Bulk user provisioning', 'Pro-rata seat additions', 'Team access controls', 'Enterprise renewal paths'],
                border: 'border-zinc-200',
                headBg: 'bg-zinc-50',
                accent: 'text-zinc-500',
              },
            ].map(p => (
              <motion.div
                key={p.plan}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border overflow-hidden ${p.border}`}
              >
                <div className={`px-6 py-4 ${p.headBg}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${p.accent}`}>Plan type</p>
                  <p className="text-zinc-800 font-semibold text-base">{p.plan}</p>
                </div>
                <div className="px-6 py-5 bg-white">
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-zinc-600 text-xs">
                        <span style={{ color: BLUE }} className="shrink-0 mt-0.5">→</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cross-team alignment */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-12">
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-5">Cross-team alignment process</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-zinc-700 text-sm font-semibold mb-3">Weekly alignment sessions</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Plugin and platform teams ran weekly syncs throughout the build. Each session covered:
                feature status, dev blockers, flow decisions that affected both surfaces, and design
                handoff timing to match the development schedule.
              </p>
              <ul className="space-y-2">
                {[
                  'Sync on shared flows (onboarding, licence validation, renewal)',
                  'Flag cross-surface inconsistencies before they reached dev',
                  'Match design delivery cadence to sprint schedule',
                  'Shared QA ownership across both teams',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-zinc-500 text-xs">
                    <span style={{ color: BLUE }} className="shrink-0 mt-0.5">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-700 text-sm font-semibold mb-3">Why parallel workstreams needed structure</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Running two design streams simultaneously without deliberate alignment creates invisible debt —
                flows that work on paper but break at the handoff between surfaces. The weekly sessions
                weren't coordination overhead; they were the mechanism that made the plugin and platform
                feel like one product rather than two tools that happened to share a licence.
              </p>
            </div>
          </div>
        </div>

        <ProcessImage
          src={null}
          label="Subscription dashboard — user management and plan controls"
          hint="Screenshot of the DeckUp subscription dashboard showing user list, licence status, plan type indicator (Single/Teams/Enterprise), add/remove user controls, renewal date, and billing section."
          aspect="aspect-[16/8]"
        />
        <ImageCaption>The DeckUp subscription platform — three plan types, each with a distinct user management experience.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: TESTING & QA ───────────────────────────────────────────────────
const FUNCTIONAL_ISSUES = [
  { issue: 'Plugin panel not persisting state after PowerPoint restart', status: 'Done' },
  { issue: 'Licence validation not triggering on first plugin load', status: 'Done' },
  { issue: 'Free trial timer not syncing between installer and dashboard', status: 'Done' },
  { issue: 'Enterprise user provisioning not reflecting in plugin immediately', status: 'Done' },
  { issue: 'Renewal email reminders not triggering for manual renewal accounts', status: 'Done' },
  { issue: 'Add user flow in dashboard not validating duplicate email', status: 'Done' },
  { issue: 'Password reset flow not completing for enterprise accounts', status: 'Done' },
  { issue: 'Pro-rata pricing calculation incorrect for mid-month additions', status: 'Verified' },
]

const VISUAL_ISSUES = [
  { issue: 'Button states inconsistent between toolbar and dashboard — hover colour mismatch', status: 'Done' },
  { issue: 'Toolbar panel width too narrow on non-standard screen resolutions', status: 'Done' },
  { issue: 'Label text overflow on long slide titles in agenda feature', status: 'Done' },
  { issue: 'Icon alignment off in Quick Tools panel — 2px vertical shift', status: 'Done' },
  { issue: 'Table formatting preview not matching applied output', status: 'Done' },
  { issue: 'Dashboard subscription status badge colours not matching design spec', status: 'Done' },
  { issue: 'Infographic template thumbnails blurry at 150% display scaling', status: 'Done' },
  { issue: 'Installer progress bar not completing to 100% before showing success state', status: 'Pending' },
]

const STATUS_STYLE: Record<string, string> = {
  'Done':     'bg-green-100 text-green-700',
  'Verified': 'bg-blue-100 text-blue-700',
  'Pending':  'bg-amber-100 text-amber-700',
}

function Testing() {
  return (
    <section id="qa" style={{ backgroundColor: '#f9f9f7' }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>09 — Testing & QA</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          4 rounds of testing. Every issue tracked to closure.
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-6 leading-relaxed">
          Testing ran in 4 structured phases — functional issues documented alongside visual issues,
          each tracked in a shared QA sheet with the development team. Issues were assigned, fixed,
          and verified before sign-off on each round.
        </p>

        {/* Testing phases */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { round: '01', label: 'Plugin core flows',      desc: 'Toolbar load, licence validation, core feature functionality' },
            { round: '02', label: 'Onboarding flows',       desc: 'Free trial, Buy Now, installer activation end-to-end' },
            { round: '03', label: 'Dashboard & enterprise', desc: 'User management, renewal, enterprise provisioning' },
            { round: '04', label: 'Visual QA & polish',     desc: 'Component states, spacing, edge-case layouts' },
          ].map((item, i) => (
            <motion.div
              key={item.round}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-zinc-200 rounded-2xl p-5"
            >
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: BLUE }}>Round {item.round}</div>
              <p className="text-zinc-800 text-sm font-semibold mb-2">{item.label}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Issue tracker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
              <p className="text-zinc-700 text-sm font-semibold">Functional issues</p>
            </div>
            <div className="space-y-2">
              {FUNCTIONAL_ISSUES.map(item => (
                <div key={item.issue} className="flex items-start gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-3">
                  <p className="text-zinc-600 text-xs leading-relaxed flex-1">{item.issue}</p>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status] ?? 'bg-zinc-100 text-zinc-500'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <p className="text-zinc-700 text-sm font-semibold">Visual issues</p>
            </div>
            <div className="space-y-2">
              {VISUAL_ISSUES.map(item => (
                <div key={item.issue} className="flex items-start gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-3">
                  <p className="text-zinc-600 text-xs leading-relaxed flex-1">{item.issue}</p>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status] ?? 'bg-zinc-100 text-zinc-500'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QA tracker image */}
        <ProcessImage
          src={null}
          label="QA tracking sheet — collaborative bug tracker with dev team"
          hint="Screenshot of the Deckup_testing.xlsx spreadsheet: columns for Date, Plugin issues, Dashboard issues, Visual issues, Status (Done/Verified/Pending). Shows the live tracker maintained across all 4 testing rounds. From 'Deckup_testing.xlsx' in Dev Communication & Management folder."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>Shared QA tracker — functional and visual issues logged across 4 rounds, all tracked to closure before sign-off.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: TECH STACK & CHARGEBEE ─────────────────────────────────────────
function Chargebee() {
  return (
    <section id="chargebee" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>10 — Tech Stack Decision</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Chargebee: the smart shortcut that didn't compromise quality
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          For Phase I, the team made a deliberate architectural decision: use Chargebee as the subscription engine
          instead of building a custom billing and analytics stack from scratch. This wasn't a shortcut — it was
          scope management. Freeing up development capacity meant the team could invest more deeply in what
          actually mattered: the plugin experience and cross-functional onboarding flows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* What Chargebee handles */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-5">What Chargebee handles</p>
            <ul className="space-y-3">
              {[
                { item: 'Subscription lifecycle management', sub: 'Trial, activation, upgrade, downgrade, cancellation' },
                { item: 'Billing & payment processing',      sub: 'Cards, invoicing, receipts, pro-rata calculations' },
                { item: 'Licence and seat management',       sub: 'Per-seat tracking, mid-term additions, deactivation' },
                { item: 'Renewal automation',                sub: 'Auto-renewal, manual renewal, expiry handling' },
                { item: 'Email trigger management',          sub: '30/15/7-day reminder sequences, confirmation emails' },
              ].map(r => (
                <li key={r.item} className="flex items-start gap-3">
                  <span style={{ color: BLUE }} className="shrink-0 mt-0.5 font-bold">→</span>
                  <div>
                    <p className="text-zinc-800 text-sm font-medium">{r.item}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{r.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chargebee as analytics layer */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-5">Chargebee as the analytics layer</p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
              For Phase I, the team decided to use Chargebee's dashboard as the primary analytics and growth metrics tool —
              not just for billing. It provided all required insights in a comprehensive, ready-to-use format.
            </p>
            <ul className="space-y-3">
              {[
                'MRR / ARR tracking and subscription growth metrics',
                'Cohort analysis and trial-to-paid conversion data',
                'Churn and renewal rate visibility',
                'User-level subscription status and history',
                'Revenue reports and data visualisation built-in',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-zinc-600 text-sm">
                  <span style={{ color: BLUE }} className="shrink-0 mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Design implication */}
        <div className="rounded-2xl border-2 p-8" style={{ borderColor: BLUE, backgroundColor: '#EFF6FF' }}>
          <p className="text-blue-700 text-xs font-semibold uppercase tracking-widest mb-3">Design implication</p>
          <p className="text-blue-800 text-sm leading-relaxed">
            Using Chargebee changed the scope of what the DeckUp design team needed to build. The subscription dashboard
            didn't need to include billing history, invoice generation, or payment method management — Chargebee
            handled all of that. The team's design effort on the dashboard focused entirely on the user-facing experience:
            licence management, user provisioning, plan visibility, and the actions that Chargebee couldn't handle natively.
            This produced a leaner, more focused dashboard — and saved weeks of design and development time.
          </p>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: MARKETING & PRELAUNCH ──────────────────────────────────────────
function PreLaunch() {
  return (
    <section id="prelaunch" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel light>11 — Marketing & Pre-launch Strategy</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Launch small. Learn fast. Expand with confidence.
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          Rather than opening DeckUp to a cold market at launch, the team developed a framework to start with a limited cohort —
          existing SlideXpress clients who already understood the problem domain. This gave the team an outside perspective
          from real users, in a context where feedback was candid and course-corrections were actionable before a wider rollout.
        </p>

        {/* Strategy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            {
              num: '01',
              title: 'Limited launch with existing customers',
              desc: 'The first cohort was drawn from existing SlideXpress clients — people who already had a relationship with the studio, understood the problem, and could give honest, context-rich feedback. This removed the "cold user" variable and ensured early feedback came from the right people.',
            },
            {
              num: '02',
              title: 'Outside perspective before market exposure',
              desc: 'Even with a trusted cohort, these were people who hadn\'t been inside the design process. Their fresh eyes caught usability friction the team had normalised — interactions that felt obvious to the team but needed polish for someone encountering the product for the first time.',
            },
            {
              num: '03',
              title: 'Make early changes before wider rollout',
              desc: 'The limited launch wasn\'t a soft launch — it was a structured learning phase. Issues caught here were actioned before broader market exposure, meaning the version that reached new users was already battle-tested against the most important feedback channel the team had.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white mb-5"
                style={{ backgroundColor: BLUE }}>
                {card.num}
              </div>
              <h4 className="text-white font-semibold text-base mb-3">{card.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Launch sequence */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">Phased launch sequence</p>
          <div className="flex flex-col md:flex-row gap-0 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {[
              { phase: 'Phase 0',  label: 'Internal QA',              desc: '4 rounds of testing with the SlideXpress team. Onboarding and plugin flows signed off.' },
              { phase: 'Phase 1',  label: 'Limited cohort launch',    desc: 'Existing SlideXpress clients. Outside perspective, candid feedback, early fixes.' },
              { phase: 'Phase 2',  label: 'Early adopter expansion',  desc: 'Wider rollout to warm leads and newsletter subscribers. Battle-tested product.' },
              { phase: 'Phase 3',  label: 'Market launch',            desc: 'Full marketing push, paid acquisition, and broader distribution.' },
            ].map((s, i) => (
              <div key={s.phase} className="flex-1 px-6 py-4 first:pl-0 last:pr-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BLUE }}>{s.phase}</p>
                <p className="text-white text-sm font-semibold mb-2">{s.label}</p>
                <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
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
      title: 'A design system is a product strategy decision',
      body: 'Building 4 platforms in parallel without a design system would have created visual chaos. The system wasn\'t a deliverable — it was the thing that made every other deliverable possible. Every component built once, used everywhere, updated in one place.',
    },
    {
      n: '02',
      title: 'The end user and the buyer are often different people',
      body: 'Consultants use the plugin. IT admins buy it. Designing for one while ignoring the other would have created a product that either couldn\'t be sold or couldn\'t be used. The dashboard had to serve an entirely different mental model from the toolbar.',
    },
    {
      n: '03',
      title: 'Reducing clicks is more valuable than adding features',
      body: 'Every proposed feature was evaluated against one question: does this save clicks for the top use cases, or does it add complexity? The 60% productivity gain came almost entirely from click reduction — not from features that didn\'t previously exist.',
    },
    {
      n: '04',
      title: 'User flows are the real design work — screens are just the output',
      body: 'The 6 user flows caught edge cases that would have caused broken experiences in production — incorrect renewal states, mid-term user additions, enterprise licence transfers. The time spent on flows before any screen was designed saved multiples in rework later.',
    },
  ]

  return (
    <section id="reflect" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>12 — Findings & Reflection</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          What building a 4-platform SaaS from scratch taught me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {findings.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-zinc-200 rounded-2xl p-7 border-l-4"
              style={{ borderLeftColor: BLUE }}
            >
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BLUE }}>Finding {f.n}</p>
              <h4 className="text-zinc-900 font-semibold text-base mb-3">{f.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Divider />

        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold mb-8" style={{ color: BLUE }}>What I learnt</p>
          {[
            'The most important lesson was that scope clarity is a design deliverable. With 4 platforms, a growing feature list, and multiple user types, it would have been easy to build everything and serve no one well. Every scoping decision — what goes in the MVP, what waits for Phase 2 — was as much a design decision as any screen.',
            'Designing the full flow before designing any screen sounds obvious, but it\'s rarely actually done. On DeckUp, the flow work caught a critical issue: the enterprise licence transfer scenario had three distinct paths depending on account state, and none of them had been thought through. Solving it in a flow took an afternoon. Solving it in code would have taken weeks.',
            'The 60% productivity number validated something I now think about differently: the value of a design isn\'t in what it adds, it\'s in what it removes. DeckUp didn\'t give consultants new capabilities they didn\'t have. It removed friction from capabilities they already had. That\'s a harder design problem — and a more valuable one.',
          ].map((p, i) => (
            <p key={i} className={`leading-relaxed mb-6 last:mb-0 ${i === 0 ? 'text-zinc-700 text-lg' : 'text-zinc-500 text-base'}`}>
              {p}
            </p>
          ))}
        </div>

        <Divider />

        {/* Phase II outlook */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8 max-w-3xl">
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-4">What's next — Phase II</p>
          <h3 className="text-zinc-900 font-semibold text-xl mb-4">AI integration & personalisation</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-5">
            Phase I built the foundation: a 4-platform product, a design system, a subscriber base, and a tested onboarding
            model. Phase II is planned to build on top of that — not rebuild it. The work ahead is AI-powered:
          </p>
          <ul className="space-y-2.5">
            {[
              'AI personalisation — adapting the toolbar and suggestions to each user\'s working patterns',
              'Smart deck generation from a content library — creating slide scaffolds from simple data inputs',
              'Feature updates driven by Phase I usage analytics — building what users actually reach for',
              'Enhanced collaboration tools for Teams and Enterprise accounts',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-zinc-600 text-sm">
                <span style={{ color: BLUE }} className="shrink-0 mt-0.5">→</span> {item}
              </li>
            ))}
          </ul>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: TEAM ────────────────────────────────────────────────────────────
const TEAM = [
  { initials: 'OL', name: 'Onkar Lanke',          role: 'Product Design Specialist', url: 'https://www.linkedin.com/in/onkarlanke/' },
  { initials: 'KI', name: 'Krithika Iyer',        role: 'Visual Designer',           url: 'https://www.linkedin.com/in/krithika-iyer-596a3a1b0/' },
  { initials: 'SW', name: 'Swapnil',              role: 'UX Designer',               url: '#' },
  { initials: 'PM', name: 'Priyanka',             role: 'Project Manager',           url: 'https://www.linkedin.com/in/tatzope/' },
  { initials: 'HJ', name: 'Harsh Jain',           role: 'Frontend Developer',        url: 'https://www.linkedin.com/in/harshjain4204/' },
  { initials: 'HK', name: 'Haris Kumar',          role: 'QA Engineer',               url: 'https://www.linkedin.com/in/hariskumar-p/' },
  { initials: 'NB', name: 'Naveen Ben',           role: 'Backend Engineer',          url: 'https://www.linkedin.com/in/naveen-ben/' },
  { initials: 'PJ', name: 'Ponmalar Jagannathan', role: 'Director',                  url: 'https://www.linkedin.com/in/ponmalar-jagannathan-a32566a/' },
]

function Team() {
  return (
    <section id="team" style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
      >
        <SectionLabel light>Team</SectionLabel>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
          Who built this
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.a
              key={member.name}
              href={member.url === '#' ? undefined : member.url}
              target={member.url === '#' ? undefined : '_blank'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-900 transition-all duration-200"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-4 border-2 border-zinc-700 group-hover:border-blue-400 transition-colors"
                style={{ backgroundColor: '#1a2535', color: BLUE_MUTED }}
              >
                {member.initials}
              </div>
              <p className="text-white text-sm font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                {member.name}
              </p>
              <p className="text-zinc-500 text-xs mb-4">{member.role}</p>
              {member.url !== '#' && (
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 border border-zinc-700 rounded-full px-3 py-1 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                  </svg>
                  LinkedIn
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── FOOTER / CTA ─────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
      >
        <div>
          <p className="text-blue-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">SlideXpress · DeckUp · 2024</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Onkar Lanke<br />
            <span style={{ color: BLUE_MUTED }}>Product Design Specialist</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-blue-400 hover:text-blue-400 transition-all"
          >
            ← Back to all work
          </Link>
          <a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all"
            style={{ backgroundColor: BLUE }}
          >
            Connect on LinkedIn →
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DeckUpDetail() {
  return (
    <main className="bg-white text-zinc-900 antialiased">
      <Nav />
      <StickyNav />
      <Hero />
      <TheIdea />
      <Research />
      <Competitive />
      <IA />
      <Flows />
      <DesignSystem />
      <ToolbarFeatures />
      <Platform />
      <Testing />
      <Chargebee />
      <PreLaunch />
      <Reflection />
      <Team />
      <FooterCTA />
    </main>
  )
}
