'use client'

// app/work/dil-kyc-detail/page.tsx
// Full custom detail page — Diamond India Limited · KYC & Onboarding Platform
// Brand: dark navy (#0D1B2A) + amber (#F5A623) + white

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NAVY  = '#0D1B2A'
const AMBER = '#F5A623'

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
  return <div className="border-t border-zinc-100 my-16" />
}

// ProcessImage — shows real image when src is set, placeholder otherwise
// To activate: copy image into public/case-studies/dil-kyc/ and set src="/case-studies/dil-kyc/filename.png"
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
        dark
          ? 'border-zinc-700 bg-zinc-900/40'
          : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <div className="text-3xl opacity-20">🖼</div>
      <p className={`text-sm font-medium ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{label}</p>
      <p className={`text-xs max-w-sm leading-relaxed ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{hint}</p>
      <p className={`text-xs mt-1 font-mono ${dark ? 'text-zinc-700' : 'text-zinc-300'}`}>
        → public/case-studies/dil-kyc/
      </p>
    </motion.div>
  )
}

// ImageCaption — label shown below an image slot
function ImageCaption({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs mt-3 text-center ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{children}</p>
  )
}

// ─── STICKY NAV ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'brief',     label: 'Brief' },
  { id: 'strategy',  label: 'Strategy' },
  { id: 'research',  label: 'Research' },
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
            active === item.id
              ? 'text-amber-500 translate-x-1'
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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: NAVY }}>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-400 text-xs hover:text-amber-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to work
        </Link>
        <div className="flex gap-2">
          {['UX Design', 'Enterprise', 'Bullion'].map(t => (
            <Pill key={t} amber>{t}</Pill>
          ))}
        </div>
      </div>

      {/* Centre content */}
      <motion.div style={{ y }} className="relative z-10 px-8 md:px-16 lg:px-24 py-16 flex-1 flex flex-col justify-center">

        {/* DIL wordmark area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            {/* DIL diamond-ish mark */}
            <div className="w-10 h-10 border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
              <span className="text-amber-400 font-bold text-sm tracking-widest">DIL</span>
            </div>
            <div className="h-px flex-1 max-w-xs" style={{ backgroundColor: AMBER, opacity: 0.3 }} />
          </div>

          <p className="text-amber-400 text-xs tracking-[0.25em] uppercase mb-4 font-medium">
            Diamond India Limited · 2023
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-none mb-6"
        >
          KYC &<br />
          <span style={{ color: AMBER }}>Onboarding</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          className="text-zinc-400 text-xl md:text-2xl font-light max-w-2xl mb-12 leading-relaxed"
        >
          Digitising India's only government-nominated bullion supplier —
          turning a 2-week paper process into a week-long digital one.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-6"
        >
          {[
            { label: 'Client',    value: 'Diamond India Limited' },
            { label: 'Role',      value: 'Senior UX Designer' },
            { label: 'Timeline',  value: '3 Months' },
            { label: 'Year',      value: '2023' },
          ].map(m => (
            <div key={m.label}>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{m.label}</p>
              <p className="text-zinc-200 text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="relative z-10 px-8 md:px-16 pb-10 flex items-center justify-between"
      >
        <p className="text-zinc-600 text-xs italic max-w-xs">
          "For banks, KYC is a filtering-out process. For DIL, KYC is a welcoming-in process."
        </p>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-zinc-500 text-xs flex items-center gap-2">
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
          The brand promise was being undermined by the process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              head: 'Who is DIL?',
              body: 'Diamond India Limited is the only private-sector company in India with a Central Government nomination and licence to procure bullion — a distinction held since 2009. With 800 customers and the largest base of any private agency, 98% of whom are small jewellery exporters, DIL\'s mission is to be the trusted, transparent, service-first trade body for India\'s gem and jewellery industry.',
            },
            {
              head: 'The problem',
              body: 'Every new customer went through a fully paper-based KYC process — 6+ manual handoffs, no status visibility, no audit trail, no online submission. It took 2 weeks per customer. Internal staff spent hours on data re-entry and chasing physical signatures. The process directly contradicted the brand\'s core promise of speed, access, and transparency.',
            },
            {
              head: 'The ask',
              body: 'Design a two-sided digital platform: a customer-facing KYC portal for online application and a staff-facing dashboard for review and approval. Also design the KYC renewal flow for existing customers and a full website IA to close the discovery-to-onboarding gap.',
            },
          ].map(col => (
            <div key={col.head}>
              <h3 className="text-zinc-900 font-semibold text-base mb-3">{col.head}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>

        {/* Impact numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden mb-16">
          {[
            { v: '55%',  l: 'Onboarding time cut',  s: '2 weeks → 5–7 days' },
            { v: '800+', l: 'Customers served',      s: 'Largest private agency base' },
            { v: '3',    l: 'KYC form types',        s: 'Proprietor, corporate, bullion' },
            { v: '7',    l: 'Site sections',         s: 'Home to Resources' },
          ].map(m => (
            <div key={m.l} className="bg-white px-6 py-8">
              <div className="text-4xl font-bold text-amber-500 mb-1">{m.v}</div>
              <div className="text-zinc-700 text-sm font-medium mb-0.5">{m.l}</div>
              <div className="text-zinc-400 text-xs">{m.s}</div>
            </div>
          ))}
        </div>

        {/* As-is paper process image */}
        <ProcessImage
          src={null}
          label="As-is paper-based KYC process — flow diagram"
          hint="Show the original 6-step manual process: Customer inquiry → Physical form → 6 manual handoffs → Physical signature → Filing → No status visibility. Annotate pain points in red. Can use a rough whiteboard photo or a clean swim-lane diagram."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>The paper-based process DIL was running before the digital platform — 2 weeks, 6 handoffs, zero visibility.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: BRAND STRATEGY ──────────────────────────────────────────────────
function Strategy() {
  const keywords = ['Professionalism', 'Service', 'Trust', 'Transparency', 'Efficiency', 'Reputation', 'Credibility', 'Commercially Viable']

  const diff = [
    { dim: 'KYC speed',        bank: 'Up to 2 years',           dil: '1 week' },
    { dim: 'Minimum order',    bank: '₹5 crore minimum',        dil: 'Even 1 kg' },
    { dim: 'KYC philosophy',   bank: 'Filtering-out process',   dil: 'Welcoming-in process' },
    { dim: 'Client size',      bank: 'Large clients preferred', dil: 'All sizes welcome' },
    { dim: 'Process clarity',  bank: 'Complex & opaque',        dil: 'Simple & transparent' },
  ]

  return (
    <section id="strategy" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>02 — Brand Strategy</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Crafting the DIL differential
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          Before designing any screen, we ran a full brand strategy session to understand exactly why DIL was better than banks —
          and how to make that tangible in every interaction.
        </p>

        {/* Banks vs DIL comparison */}
        <div className="mb-20">
          <p className="text-zinc-500 text-xs tracking-widest uppercase mb-6">The competitive differential</p>
          <div className="rounded-2xl overflow-hidden border border-zinc-800">

            {/* Header row */}
            <div className="grid grid-cols-3 bg-zinc-900">
              <div className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest"></div>
              <div className="px-6 py-4 text-zinc-400 text-sm font-medium border-l border-zinc-800">Banks (HDFC, ICICI, SBI)</div>
              <div className="px-6 py-4 font-semibold text-sm border-l border-zinc-800" style={{ color: AMBER }}>DIL</div>
            </div>

            {diff.map((row, i) => (
              <div key={row.dim} className={`grid grid-cols-3 border-t border-zinc-800 ${i % 2 === 0 ? 'bg-zinc-900/40' : ''}`}>
                <div className="px-6 py-5 text-zinc-400 text-sm font-medium">{row.dim}</div>
                <div className="px-6 py-5 text-zinc-500 text-sm border-l border-zinc-800">{row.bank}</div>
                <div className="px-6 py-5 text-sm font-medium border-l border-zinc-800" style={{ color: AMBER }}>{row.dil}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand keywords */}
        <div className="mb-16">
          <p className="text-zinc-500 text-xs tracking-widest uppercase mb-6">8 brand value keywords</p>
          <div className="flex flex-wrap gap-3">
            {keywords.map(k => (
              <span key={k} className="border text-sm px-5 py-3 rounded-xl font-medium text-zinc-300 border-zinc-700 hover:border-amber-500 hover:text-amber-400 transition-colors">
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
            <p className="text-amber-900 text-xs uppercase tracking-widest mb-4">We are the Perfect Match</p>
            <p className="text-zinc-900 text-3xl font-bold leading-tight">What you need is what we offer.<br />Faster. Better. Safer.</p>
          </div>
        </div>

        {/* Brand strategy workshop output */}
        <ProcessImage
          src={null}
          label="Brand strategy session output — keyword mapping & positioning"
          hint="Workshop whiteboard or slide showing the 8 brand keywords radiating from the DIL brand core. Alternatively: the brand positioning map (X axis: accessibility, Y axis: speed) showing DIL vs competitor banks. From the DIL Brand Strategy PDF."
          aspect="aspect-[16/8]"
          dark
        />
        <ImageCaption dark>Brand strategy output — mapping DIL's 8 core values against the competitive landscape.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: RESEARCH ────────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>03 — User Research</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          Understanding who we were actually designing for
        </h2>

        {/* Persona */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-zinc-200 mb-16">

          {/* Left — identity */}
          <div className="md:col-span-2 p-10 flex flex-col justify-between" style={{ backgroundColor: NAVY }}>
            <div>
              <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center text-2xl mb-6">👤</div>
              <h3 className="text-white text-2xl font-bold mb-1">Harish Gupta</h3>
              <p className="text-amber-400 text-sm mb-6">Age 38 · Export Division, Family Jewellery Business</p>
              <blockquote className="border-l-2 border-amber-400 pl-4 text-zinc-300 text-sm italic leading-relaxed">
                "I need bullions as and when required, as per my export orders in minimum time and hassle-free process."
              </blockquote>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-700">
              <p className="text-zinc-500 text-xs">Fourth-generation jeweller. Tech-comfortable. Growth-oriented.</p>
            </div>
          </div>

          {/* Right — goals + frustrations */}
          <div className="md:col-span-3 grid grid-cols-1 divide-y divide-zinc-100">
            <div className="p-8">
              <p className="text-amber-500 text-xs uppercase tracking-widest font-semibold mb-4">Goals</p>
              <ul className="space-y-3">
                {[
                  'Increase exports 2× in next 2–3 years',
                  'Use technology in logistics for better reach and tracking',
                  'Connect with top suppliers for continuous, assured supply',
                ].map(g => (
                  <li key={g} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <span className="text-amber-400 mt-0.5">→</span> {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-4">Frustrations</p>
              <ul className="space-y-3">
                {[
                  'Lag in deliveries causing harm to reputation and business',
                  'Supply agencies insisting on large orders — small requirements ignored',
                  'Low working capital limits flexibility',
                  'No knowledge-base for navigating bullion procurement',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <span className="text-red-400 mt-0.5">✕</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Persona image */}
        <div className="mb-16">
          <ProcessImage
            src={null}
            label="User persona — Harish Gupta (full card)"
            hint="Persona card from the DIL research phase: photo/avatar, demographics, goals, frustrations, a quote. Rough sketch, PDF export, or Figma screenshot are all fine. Shows the small jewellery exporter archetype."
            aspect="aspect-[16/7]"
          />
          <ImageCaption>Primary persona — Harish Gupta, 38, fourth-generation jeweller and DIL's core customer archetype.</ImageCaption>
        </div>

        {/* Customer journeys */}
        <div className="space-y-12 mb-16">
          {[
            {
              title: 'Onboarding journey',
              steps: ['Website Portal', 'KYC Application', 'Preliminary Verification', 'Successful Verification', 'Agreement for Purchase'],
            },
            {
              title: 'Gold buying journey',
              steps: ['Order by Customer', 'DIL Confirms Order', 'DIL Places to Int. Suppliers', 'Bullion to Secure Vault', 'DIL Communicates', 'Release Order', 'Customer Receives'],
            },
          ].map(journey => (
            <div key={journey.title}>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-5">{journey.title}</p>
              <div className="flex items-center gap-0 overflow-x-auto pb-2">
                {journey.steps.map((step, i) => (
                  <div key={step} className="flex items-center shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-amber-400 bg-white mb-2" />
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-4 py-2.5 rounded-xl text-center max-w-[120px] leading-tight">
                        {step}
                      </div>
                    </div>
                    {i < journey.steps.length - 1 && (
                      <div className="w-8 h-px bg-amber-200 mx-1 shrink-0 -mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Journey map image */}
        <ProcessImage
          src={null}
          label="Customer journey map — onboarding + gold buying (full diagram)"
          hint="Full journey map showing both journeys with emotions, touchpoints, and pain points annotated. Rough Figma frame, PDF page, or whiteboard photo. Shows where the paper process created friction points."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>Journey map capturing all touchpoints across onboarding and post-onboarding gold procurement.</ImageCaption>

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
    <section id="ia" className="px-8 md:px-16 lg:px-24 py-28 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>04 — Information Architecture</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Bridging the discovery-to-onboarding gap
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          Most potential DIL customers either don't know DIL exists, or don't understand what it offers
          that banks can't. The site's primary job: bridge that information gap. Every section was
          designed to move a visitor one step closer to submitting a KYC.
        </p>

        {/* Wireframe sitemap image */}
        <div className="mb-16">
          <ProcessImage
            src={null}
            label="Wireframe sitemap — 7-section site structure"
            hint="Wireframe or annotated diagram showing the full DIL site IA: Home → Services → KYC for Bullion → About → Login → Support → Resources. Use Wireframe-05.png or Wireframe-06.png from the extracted DIL folder. Shows page hierarchy and interlinking."
            aspect="aspect-[16/8]"
          />
          <ImageCaption>Site map wireframe — 7 primary sections designed to guide visitors from discovery to KYC submission.</ImageCaption>
        </div>

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
                    <span className="text-amber-400 mt-0.5 shrink-0">›</span> {c}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* KYC as ABC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 rounded-2xl overflow-hidden mb-16">
          <div className="bg-white p-10">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-semibold mb-6">KYC as simple as ABC</p>
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
            <p className="text-amber-500 text-xs uppercase tracking-widest font-semibold mb-6">Onboarding as easy as 1–2–3</p>
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

        {/* Home page wireframe */}
        <ProcessImage
          src={null}
          label="Homepage wireframe — information architecture in practice"
          hint="Wireframe of the DIL homepage showing: brand statement header, credibility metrics row, services section (Bullion + Rough Diamonds), and KYC CTA. Use Wireframe-07.png or MacBook Air - 4.png from the extracted DIL folder."
          aspect="aspect-[16/9]"
        />
        <ImageCaption>Homepage wireframe — brand story first, KYC CTA last, every section building trust incrementally.</ImageCaption>

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
      desc: 'First contact with the portal. Designed to feel light and fast — only essential fields needed to initiate a KYC. Firm name, owner, contact details, monthly requirement in Kgs, nature of business, and jewellery type (Plain / Studded / Diamond). A guidelines panel sits alongside with contextual help.',
      fields: ['Firm name', 'Owner name', 'Contact person + Reference', 'Email + Phone', 'Monthly requirement (Kgs)', 'Nature of business', 'Exporter type — New / Existing', 'Type of jewellery — Plain / Studded / Diamond'],
      decision: '"Submit" → triggers Step 2 based on entity type',
    },
    {
      num: '02',
      label: 'Application Form',
      desc: 'The substantive section — split by entity type using progressive disclosure. A Sole Proprietor sees their personal details form. A Corporate sees the Director details module with an "Add director" repeat. Both then complete Firm Details, Registration Details (PAN, GST, LOA, GJEPC/FIEO, IEC, Municipal, Customs OTC), Bank Details (with document downloads), and Declarations & Signature.',
      fields: ['Firm Details — constitution, name, incorporation date, registered office', 'Registration Details — 7 document numbers each with Download', 'Bank Details — bank, branch, account type, MICR, 3-month statements', 'Chief Executive details', 'Declarations — signature with rubber stamp'],
      decision: '"Preview form" before submitting — catch errors before final submission',
    },
    {
      num: '03',
      label: 'Agreement',
      desc: 'All 3 stepper nodes turn green. DIL\'s final agreement is ready to download. No input required at this stage — the customer\'s job is done. The agreement is signed by DIL and returned here for download, completing the digital paper trail.',
      fields: ['Final agreement signed by DIL', 'Download button'],
      decision: 'KYC complete → account activated → agreement stored',
    },
  ]

  return (
    <section id="kyc" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>05 — KYC Portal Design</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          A 3-step application that respects the customer's time
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          The customer-facing KYC portal was built as a strict 3-step linear flow with a persistent progress stepper.
          Each step was designed to feel like a distinct, completable task — not one long overwhelming form.
        </p>

        {/* 3-step stepper visual */}
        <div className="flex items-center mb-16">
          {['Basic Information', 'Application Form', 'Agreement'].map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  i === 0 ? 'border-amber-400 text-amber-500 bg-amber-50' : 'border-zinc-200 text-zinc-400 bg-white'
                }`}>
                  {i + 1}
                </div>
                <p className={`text-xs mt-2 font-medium ${i === 0 ? 'text-amber-600' : 'text-zinc-400'}`}>{label}</p>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-zinc-200 mx-3 mb-5" />}
            </div>
          ))}
        </div>

        {/* Step breakdowns */}
        <div className="space-y-0 divide-y divide-zinc-100">
          {steps.map((step, i) => {
            const stepImages: Record<string, { label: string; hint: string; file: string }> = {
              '01': {
                label: 'Step 1 — Basic Information screen',
                hint: 'Form with Firm name, Owner name, Contact, Monthly requirement (Kgs), Nature of business, Jewellery type. Right panel: document guidelines checklist. Top: amber progress stepper showing Step 1 active. Use Online KYC-Basic Information.pdf or Wireframe-09.png / Wireframe-10.png.',
                file: 'Wireframe-09.png or Wireframe-10.png',
              },
              '02': {
                label: 'Step 2 — Application Form (Sole Proprietor + Corporate tabs)',
                hint: 'Accordion form: Firm Details → Registration Details (7 doc numbers) → Bank Details → Chief Executive → Declarations. Show corporate entity with "Add director" repeat. Progress stepper Step 2 active. Use Online KYC-Corporate.pdf or Wireframe-11.png / Wireframe-12.png.',
                file: 'Wireframe-11.png or Wireframe-12.png',
              },
              '03': {
                label: 'Step 3 — Agreement (all steps green)',
                hint: 'All 3 stepper nodes are green checkmarks. Agreement document visible with Download button. Clean completion state — no input needed. Use Wireframe-15.png or Wireframe-16.png from extracted DIL folder.',
                file: 'Wireframe-15.png or Wireframe-16.png',
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
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-amber-700 text-xs font-medium uppercase tracking-wide mb-2">Design decision</p>
                      <p className="text-amber-800 text-xs leading-relaxed">{step.decision}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Fields in this step</p>
                    <ul className="space-y-2">
                      {step.fields.map(f => (
                        <li key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                          <span className="text-amber-400 mt-0.5 shrink-0">—</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                {/* Per-step screen */}
                <div className="pb-12">
                  <ProcessImage
                    src={null}
                    label={img.label}
                    hint={img.hint}
                    aspect="aspect-[16/9]"
                  />
                  <ImageCaption>{img.label} — use {img.file}</ImageCaption>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3-step composite overview */}
        <div className="mt-4">
          <ProcessImage
            src={null}
            label="KYC portal — 3-step composite overview"
            hint="Single wide image showing all 3 steps side-by-side: Basic Info → Application Form → Agreement complete. Optionally shown on a MacBook Air mockup. Use MacBook Air - 7.png or MacBook Air - 8.png from the extracted DIL folder."
            aspect="aspect-[16/7]"
          />
          <ImageCaption>The complete 3-step KYC portal — from first contact to signed agreement.</ImageCaption>
        </div>

      </motion.div>
    </section>
  )
}

// ─── SECTION: DASHBOARD ───────────────────────────────────────────────────────
function Dashboard() {
  const actions = [
    { label: 'Approve', style: 'bg-amber-400 text-zinc-900', desc: 'Section complete — all documents verified' },
    { label: 'Reject',  style: 'border border-red-300 text-red-600 bg-white', desc: 'Section fails — customer must resubmit' },
    { label: 'Query',   style: 'text-zinc-500 underline bg-white', desc: 'Clarification needed — sends message to customer' },
  ]

  const sections = [
    { label: 'Basic Information', sub: 'Firm name, contact details, business type, jewellery category' },
    { label: 'Application Form A', sub: 'Firm Details + Registration Details (7 document types) + Bank Details + Chief Executive + Declarations' },
    { label: 'Application Form B', sub: 'Sole Proprietor personal details OR Director details (per entity type)' },
    { label: 'Agreement',          sub: 'Final DIL-signed agreement — available for download once all sections approved' },
  ]

  return (
    <section id="dashboard" style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>06 — Staff Dashboard</SectionLabel>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          The other side of the platform — built for reviewers
        </h2>
        <p className="text-zinc-400 text-base max-w-2xl mb-16 leading-relaxed">
          The internal staff dashboard lets DIL's compliance team review, query, approve, or reject each incoming
          KYC application — section by section, without leaving the screen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* Section navigator */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Application sections (collapsible)</p>
            <div className="space-y-3">
              {sections.map((s, i) => (
                <div key={s.label} className={`rounded-xl border p-5 ${i === 0 ? 'border-amber-400/40 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-amber-400' : 'bg-zinc-700'}`} />
                    <p className={`text-sm font-medium ${i === 0 ? 'text-white' : 'text-zinc-500'}`}>{s.label}</p>
                    <span className="ml-auto text-zinc-600 text-xs">{i === 0 ? '▲' : '▼'}</span>
                  </div>
                  {i === 0 && <p className="text-zinc-400 text-xs leading-relaxed ml-5">{s.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Section-level actions (per section, not per application)</p>
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
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Why section-level?</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Early drafts used a single Approve/Reject per application. Testing revealed that
                applications rarely fail entirely — typically one section (e.g. bank details) needs
                a query while the rest is fine. Section-level actions let reviewers progress
                applications partially, dramatically reducing back-and-forth with customers.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard wireframe — overview */}
        <div className="mb-8">
          <ProcessImage
            src={null}
            label="Staff approval dashboard — overview screen"
            hint="Pending applications list view: table with Applicant name, KYC type, Submission date, Status badge (Pending / In Review / Queried). Dark navy header, amber action buttons. Use Dashboard-Approval forms 1.pdf screenshots or Wireframe-17.png / Wireframe-19.png from extracted DIL folder."
            aspect="aspect-[16/9]"
            dark
          />
          <ImageCaption dark>Dashboard overview — all pending KYC applications, sortable by date and status.</ImageCaption>
        </div>

        {/* Dashboard wireframe — section-level review */}
        <ProcessImage
          src={null}
          label="Staff dashboard — section-level review (application open)"
          hint="Individual application expanded: left panel = section navigator (Basic Info, Application Form A, Form B, Agreement — 4 accordion items). Right panel = field grid with submitted values + Approve / Reject / Query buttons per section. Registration fields each have Download doc button inline. Use MacBook Air - 9.png or Wireframe-19.png."
          aspect="aspect-[16/9]"
          dark
        />
        <ImageCaption dark>Section-level review interface — approve, reject, or query each form section independently.</ImageCaption>

      </motion.div>
    </section>
  )
}

// ─── SECTION: KYC RENEWAL ────────────────────────────────────────────────────
function Renewal() {
  return (
    <section id="renewal" className="px-8 md:px-16 lg:px-24 py-28 bg-[#f9f9f7]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>07 — KYC Renewal & Post-Onboarding</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Turning an annual compliance task into a relationship moment
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-16 leading-relaxed">
          KYC renewal was treated internally as a compliance formality — a mandatory annual update with no
          UX consideration. Designing it as a first-class, status-visible touchpoint reframed it
          as a signal that DIL valued the customer's time.
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
              <div className="mx-6 mt-6 rounded-xl flex items-center gap-3 px-5 py-4" style={{ backgroundColor: '#FFF8E7', border: `1px solid ${AMBER}` }}>
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
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Design decisions in the renewal flow</p>
            {[
              {
                title: 'All 3 steps shown as complete',
                body: 'Visually acknowledges the customer\'s existing relationship — they\'re not starting over. Context before action.',
              },
              {
                title: 'Two equally prominent paths',
                body: '"Update" and "No changes" are given equal visual weight. No dark pattern — most returning customers genuinely don\'t have changes.',
              },
              {
                title: 'Onboarding date visible',
                body: 'Showing the original onboarding date grounds the renewal in the customer\'s history with DIL. Personal, not transactional.',
              },
              {
                title: 'Zero phone calls required',
                body: 'The renewal was previously handled entirely by phone or email. This screen eliminated that touchpoint entirely for the majority of customers.',
              },
            ].map(d => (
              <div key={d.title} className="bg-white border border-zinc-200 rounded-xl p-5">
                <p className="text-zinc-800 text-sm font-semibold mb-1.5">{d.title}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal screen image */}
        <div className="mb-16">
          <ProcessImage
            src={null}
            label="KYC renewal screen — returning customer view"
            hint="All 3 stepper nodes shown as green checkmarks (completed state). Amber alert banner: 'KYC is due for update!' Below: onboarding date, body copy, two equal-weight CTAs — 'Update details' (amber fill) and 'I confirm, no changes' (outline). Use KYC renewal.pdf screenshots or Wireframe-16.png from extracted DIL folder."
            aspect="aspect-[4/3]"
          />
          <ImageCaption>Renewal screen — positioned as a relationship moment, not a compliance form. Two equally prominent paths.</ImageCaption>
        </div>

        {/* Account section */}
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Post-onboarding account section</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '👤', label: 'Account Info',          desc: 'Profile details, business info, contact' },
              { icon: '📦', label: 'Your Orders',           desc: 'Active orders with status badges' },
              { icon: '📍', label: 'Order Status & Tracking', desc: 'Live timeline for active order' },
              { icon: '📋', label: 'Order History',         desc: 'Completed orders, sortable table' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-zinc-200 rounded-2xl p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-zinc-800 text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Account / order tracking screen image */}
          <ProcessImage
            src={null}
            label="Post-onboarding account — order status & tracking"
            hint="Account dashboard screen: left nav with Account Info, Your Orders, Order Status, Order History tabs. Main panel: active order card with progress timeline (Order Placed → Confirmed → Dispatched → Delivered). Use MacBook Air - 4.png or Wireframe-05.png from extracted DIL folder."
            aspect="aspect-[16/9]"
          />
          <ImageCaption>Customer account — order tracking section, giving full visibility into active bullion orders.</ImageCaption>
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
      body: 'DIL\'s entire competitive advantage over banks rested on speed, access, and a welcoming KYC. Every design decision — from the 3-step flow to the "Preview before submit" option — was evaluated against this brief. The interface had to deliver what the brand was promising.',
    },
    {
      n: '02',
      title: 'Section-level approval beats all-or-nothing',
      body: 'Applications rarely fail entirely. One section needs a query while the rest is fine. Section-level Approve/Reject/Query let reviewers progress applications partially, cutting back-and-forth significantly.',
    },
    {
      n: '03',
      title: 'Entity type branching is the hardest UX problem in compliance forms',
      body: 'A sole proprietor, a corporate with 3 directors, and a bullion dealer have substantially different requirements. Progressive disclosure by entity type cut perceived form length by ~40% without removing any required fields.',
    },
    {
      n: '04',
      title: 'KYC renewal is a retention moment, not an admin task',
      body: 'Designing it as a prominent, status-visible touchpoint — with a clear "no changes" path — made renewals frictionless and signalled to customers that DIL valued their time. An obligation reframed as a relationship moment.',
    },
  ]

  return (
    <section id="reflect" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>10 — Findings & Reflection</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">
          What this project taught me about enterprise UX
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
              <p className="text-amber-500 text-xs uppercase tracking-widest font-semibold mb-3">Finding {f.n}</p>
              <h4 className="text-zinc-900 font-semibold text-base mb-3">{f.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Divider />

        {/* What I learnt */}
        <div className="max-w-3xl">
          <p className="text-amber-500 text-xs uppercase tracking-widest font-semibold mb-8">What I learnt</p>
          {[
            'The most important insight was that DIL\'s competitive advantage — speed, access, transparency — was being actively undermined by the paper-based process. The design work wasn\'t about making a form look good. It was about making the brand credible.',
            'Designing for a document-heavy regulated domain taught me that form design is a discipline of its own. Field order, conditional visibility, progressive disclosure, inline guidance, and clear error states each carry real consequences when the information is legally required and users are small business owners who can\'t afford mistakes.',
            'Building a two-sided platform revealed a tension between customer experience and internal process. What felt simplest for the customer (one submit, all decisions at the end) was hardest for staff. What felt most efficient for staff (section-level actions, query per field) required careful design to avoid surfacing internal complexity to the applicant. Resolving that tension — cleanly, on both sides — was the central challenge.',
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

// ─── SECTION: COMMUNICATIONS DESIGN ──────────────────────────────────────────
const EMAILS = [
  {
    trigger: 'After 1st approval (Basic Info)',
    subject: 'Welcome to DIL! Your Account is Now Approved',
    body: 'Login credentials delivered — email + temporary password. CTA to portal login.',
    tone: 'Warm welcome',
    state: 'approved',
    icon: '✉',
  },
  {
    trigger: 'Application queried by staff',
    subject: 'Update needed in your DIL application',
    body: 'Specific query listed inline (e.g. "Financial statements are old — need latest 3 months"). Direct link back to portal.',
    tone: 'Actionable & specific',
    state: 'query',
    icon: '❓',
  },
  {
    trigger: 'Application rejected',
    subject: 'Status of your DIL application',
    body: 'Rejection reasons listed explicitly. Empathetic tone. Support contact offered. Door left open for future.',
    tone: 'Empathetic & clear',
    state: 'rejected',
    icon: '✕',
  },
  {
    trigger: 'Full application approved',
    subject: 'DIL application approved',
    body: 'Application approved — Zoom call next. Team will reach out to schedule. Support contact included.',
    tone: 'Celebratory + next step',
    state: 'approved',
    icon: '✔',
  },
  {
    trigger: 'Zoom call scheduled',
    subject: 'DIL application Zoom call',
    body: 'Full meeting details: date, time, timezone, meeting link, ID, passcode. No ambiguity in joining.',
    tone: 'Structured & precise',
    state: 'neutral',
    icon: '📹',
  },
  {
    trigger: 'Agreement stage reached',
    subject: 'Action Required: Sign and Submit DIL Agreement',
    body: 'Download agreement → sign → courier to DIL Mumbai address. DIL countersigns and uploads to portal.',
    tone: 'Action-oriented',
    state: 'neutral',
    icon: '📋',
  },
  {
    trigger: 'Onboarding complete',
    subject: 'Congratulations, you are onboard with DIL!',
    body: 'Final agreement download link. Ready to transact. Commitment to best service.',
    tone: 'Celebratory milestone',
    state: 'approved',
    icon: '🎉',
  },
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
    <section id="comms" className="px-8 md:px-16 lg:px-24 py-28 bg-white">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>08 — Communications Design</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          7 emails that make the process feel human
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-6 leading-relaxed">
          Every status change in the KYC flow triggers an automated email to the customer. Designed from scratch —
          subject lines, body copy, tone, and CTA — to match DIL's brand voice: professional, transparent, and welcoming.
          No system-generated boilerplate; every message reads like it came from a person.
        </p>
        <div className="flex flex-wrap gap-3 mb-16">
          {['Problem briefing', 'Copy direction', 'Tone design', 'Dev integration'].map(tag => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        {/* Timeline + email cards */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-zinc-100 hidden md:block" />

          <div className="space-y-5">
            {EMAILS.map((email, i) => (
              <motion.div
                key={email.subject}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`relative md:ml-16 border rounded-2xl p-6 ${stateColors[email.state]}`}
              >
                {/* Step dot on timeline */}
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

        {/* Email design image slot */}
        <div className="mt-16">
          <ProcessImage
            src={null}
            label="Automated email designs — full set of 7 templates"
            hint="Show all 7 email templates side by side or stacked. Each email: DIL header branding, subject, body, CTA button. Can be screenshots from the docx, Figma email mockups, or rendered in a browser. Arrange as a 2-column grid or vertical strip."
            aspect="aspect-[16/9]"
          />
          <ImageCaption>Full set of 7 transactional emails — each triggered by a KYC stage change, each maintaining DIL's brand voice.</ImageCaption>
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
    <section id="qa" style={{ backgroundColor: '#f9f9f7' }} className="px-8 md:px-16 lg:px-24 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

        <SectionLabel>09 — QA & Delivery</SectionLabel>
        <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          From design file to delivered product
        </h2>
        <p className="text-zinc-500 text-base max-w-2xl mb-6 leading-relaxed">
          This project ran end-to-end — problem briefing, design direction, Figma delivery, dev collaboration,
          and structured QA with the DIL team using a shared tracker. Every issue was documented, assigned, and
          resolved before sign-off. No siloing, no handoff gap.
        </p>

        {/* Delivery ownership */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {[
            { step: '01', label: 'Problem Briefing', desc: 'Scoped the platform from DIL discovery sessions' },
            { step: '02', label: 'Design Direction', desc: 'Brand strategy → IA → wireframes → high-fi' },
            { step: '03', label: 'Solution Delivery', desc: 'Figma files, email copy, annotation specs' },
            { step: '04', label: 'Dev Collaboration', desc: 'Daily handoff reviews with development team' },
            { step: '05', label: 'QA & Sign-off', desc: 'Shared tracker with DIL, all issues closed' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-zinc-200 rounded-2xl p-5"
            >
              <div className="text-amber-400 text-xs font-bold tracking-widest mb-3">{item.step}</div>
              <p className="text-zinc-800 text-sm font-semibold mb-2">{item.label}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Issue tracker — two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

          {/* Functional */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
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

          {/* Visual */}
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

        {/* QA tracker image slot */}
        <ProcessImage
          src={null}
          label="QA tracking sheet — collaborative bug tracker with DIL team"
          hint="Screenshot of the DIL_testing.xlsx spreadsheet: columns for Date, Customer form issues, Dashboard issues, status (Done / Verified / Pending). Shows the live tracker maintained with the client through dev. Crop to show a representative set of rows."
          aspect="aspect-[16/7]"
        />
        <ImageCaption>Shared QA tracker maintained with the DIL team — functional and visual issues logged, resolved, and signed off before delivery.</ImageCaption>

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
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
          Who built this
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.a
              key={member.name}
              href={member.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-200"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-4 border-2 border-zinc-700 group-hover:border-amber-400 transition-colors"
                style={{ backgroundColor: '#1a2a3a', color: AMBER }}
              >
                {member.initials}
              </div>

              {/* Name + role */}
              <p className="text-white text-sm font-semibold mb-1 group-hover:text-amber-400 transition-colors">
                {member.name}
              </p>
              <p className="text-zinc-500 text-xs mb-4">{member.role}</p>

              {/* LinkedIn chip */}
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 border border-zinc-700 rounded-full px-3 py-1 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
                LinkedIn
              </span>
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
    <section style={{ backgroundColor: NAVY }} className="px-8 md:px-16 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
      >
        <div>
          <p className="text-amber-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">Diamond India Limited · 2023</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Onkar Lanke<br />
            <span style={{ color: AMBER }}>Senior UX Designer</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-amber-400 hover:text-amber-400 transition-all"
          >
            ← Back to all work
          </Link>
          <a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all"
            style={{ backgroundColor: AMBER, color: NAVY }}
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
      <StickyNav />
      <Hero />
      <Brief />
      <Strategy />
      <Research />
      <IA />
      <KYCFlow />
      <Dashboard />
      <Renewal />
      <Communications />
      <QADelivery />
      <Reflection />
      <Team />
      <FooterCTA />
    </main>
  )
}
