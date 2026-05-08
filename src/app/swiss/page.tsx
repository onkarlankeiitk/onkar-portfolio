'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const INK    = '#0A0A0A'
const PAPER  = '#F2F0EA'
const RED    = '#C8272A'
const MID    = '#7A7A72'
const LIGHT  = '#C4C0B4'
const HV     = '"Helvetica Neue", Helvetica, Arial, sans-serif'
const MONO   = 'var(--font-geist-mono)'

const lbl = (txt: React.ReactNode, color = MID) => (
  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', color, textTransform: 'uppercase' as const }}>{txt}</span>
)

// ─── DATA ─────────────────────────────────────────────────────────────────────
const tools = [
  { name: 'Figma', category: 'Design' }, { name: 'Webflow', category: 'Design' },
  { name: 'Framer', category: 'Design' }, { name: 'Hotjar', category: 'Research' },
  { name: 'Amplitude', category: 'Analytics' }, { name: 'Notion', category: 'Strategy' },
  { name: 'Miro', category: 'Strategy' }, { name: 'MS Clarity', category: 'Analytics' },
  { name: 'GitHub', category: 'Dev' }, { name: 'Vercel', category: 'Dev' },
  { name: 'Claude', category: 'AI' }, { name: 'VS Code', category: 'Dev' },
]

const projects = [
  { index: '01', slug: 'deckup', title: 'Deck-Up — SaaS for Consultants', company: 'SlideXpress', year: '2024', tags: ['Product Design', 'SaaS', 'B2B'], metrics: [{ value: '45–60%', label: 'Productivity gain' }, { value: '40%', label: 'User comfort' }], description: 'DeckUp increases the productivity of daily power users by 45–60% by providing a toolbar specifically created for power users. Phase 2 integrates AI for personalisation and quick deck generation.' },
  { index: '02', slug: 'dil-kyc', title: 'Digitisation of KYC & Customer Management', company: 'Diamond India Limited', year: '2024', tags: ['UX Design', 'Fintech', 'Research'], metrics: [{ value: '55%', label: 'Onboarding time reduced' }, { value: '40%', label: 'Employee efficiency' }], description: "DIL is India's largest bullion supplier. We digitised their extensive offline KYC and customer management system, reducing onboarding from 2 weeks to 5–7 days." },
  { index: '03', slug: 'research-strategy', title: 'Research & Strategy for Growth', company: 'Commongood, USA', year: '2023', tags: ['UX Research', 'Strategy', 'E-commerce'], metrics: [{ value: '43%', label: 'Content engagement' }, { value: '11%', label: 'Cart checkout volume' }], description: 'UX evaluation and research-based strategies for a US-based snacking company specializing in healthy, convenient and delicious snack bars.' },
  { index: '04', slug: 'fintech-gamification', title: 'Gamification in Fintech — Board Game Inspired', company: 'Mindseye Creative', year: '2023', tags: ['Gamification', 'Fintech', 'UX Design'], metrics: [{ value: '85%', label: 'Usability score' }, { value: '70%', label: 'User retention' }], description: 'Designed a user-friendly fintech interface inspired by board game mechanics, simplifying access to complex financial products through familiar interaction patterns.' },
]

const sites = [
  { name: 'Reevo CRM', description: 'Austin, Texas-based Salesforce Summit Partner specializing in implementations, customizations, AI integrations, and adoption services.', url: 'https://www.reevocrm.com', tags: ['Webflow', 'CRM', 'B2B'], location: 'Austin, Texas' },
  { name: 'Catalyst Healthcare Consulting', description: 'Dynamic, hands-on regulatory policy dedicated to helping clients advance innovative healthcare solutions that benefit patients.', url: 'https://catalysthcc.com', tags: ['Webflow', 'Healthcare', 'Consulting'], location: 'USA' },
]

const behanceProjects = [
  { title: 'IndiGo Go Next Experience Design', url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design', year: '2020', domain: 'Aviation · Experience Design' },
  { title: 'Designing for Last Mile Reach — Financial Inclusion', url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion', year: '2020', domain: 'Fintech · Social Impact' },
  { title: 'Delivering Better Experience — A Redesign', url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN', year: '2020', domain: 'E-commerce · Redesign' },
  { title: 'Icons Design Planner', url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner', year: '2019', domain: 'Visual Design · Icons' },
]

const experience = [
  { role: 'Senior UX Designer', company: 'SlideXpress - A unit of Mindseye Creative', period: 'Dec 2024 — Dec 2025', description: 'Building DeckUp SaaS from scratch. Led research, design and cross-functional team. Defined product roadmap, conceptualised GTM strategy and conversion funnels.' },
  { role: 'Senior UX Designer', company: 'Mindseye Creative', period: 'Apr 2023 — Dec 2024', description: 'Managed end-to-end client projects from briefs to delivery. Built complex Webflow sites. Led tech and design teams. Leveraged Hotjar, Amplitude and Microsoft Clarity for data-informed decisions.' },
  { role: 'UX Designer', company: 'Tata Consultancy Services', period: 'Sept 2020 — Mar 2022', description: 'Contributed to TCS Vision 2025. Heuristic evaluation of Tata Neu app resulting in 13% more engagement. Collaborated on Air Asia flight booking UX. Designed hybrid work booking system.' },
  { role: 'Instructional Designer: (Course Designer) Product Design & Innovation - Part time', company: 'LearningMate', period: 'Nov 2022 — Feb 2023', description: 'Designed course structure & sample lessons & assessment criteria for Introduction to Manufacturing: Product Design and Innovation for grades 9-12 in Pennsylvania.' },
  { role: 'Product Designer — Internship', company: 'Kritsnam Technologies', period: 'Oct 2019 — Dec 2019', description: 'Designed interactive dashboard for water sensors. Data visualization, device management and calibration. Reduced service time by 50% from 47 to 23 minutes.' },
  { role: 'UX Researcher — Internship', company: 'TeamLease', period: 'May 2019 — July 2019', description: 'Primary and secondary research including on-ground interviews, social listening and diary studies for platform revamp. Engagement grew by 126% after redesign.' },
]

const skillSections = [
  { label: 'Design', skills: ['UX Research & Testing', 'Wireframing & Prototyping', 'Visual Design', 'Design Systems & Components', 'Information Architecture', 'Interaction Design', 'Accessibility (WCAG)', 'Inclusive Design', 'Heuristic Evaluation', 'Experience Mapping', 'Figma', 'Webflow', 'Framer'] },
  { label: 'Technical', skills: ['HTML & CSS', 'SQL', 'Python for Analytics', 'A/B Testing & Experimentation', 'Behavioral Analytics', 'Growth Analytics', 'Microsoft Clarity', 'Hotjar', 'Amplitude', 'GitHub', 'Vercel', 'No-code / Low-code'] },
  { label: 'Management', skills: ['Product Strategy & Roadmapping', 'RICE Framework', 'Efforts vs Impact Studies', 'Agile & Design Thinking', 'Cross-functional Leadership', 'Stakeholder Management', 'Go-to-market Strategy', 'Conversion Funnel Design', 'Feature Prioritization', 'Storytelling Frameworks', 'Primary & Secondary Research', 'Delivery Frameworks'] },
]

const sketchLabels = [
  'Sketch 01', 'Sketch 02', 'Sketch 03', 'Sketch 04',
  'Sketch 05', 'Sketch 06', 'Sketch 07', 'Sketch 08',
]
const sketchRotations = [-2, 1.5, -1, 2.5, -1.8, 0.8, -2.2, 1.2]

// ─── NAV ──────────────────────────────────────────────────────────────────────
function SwissNav() {
  return (
    <nav style={{ background: PAPER, borderBottom: `2px solid ${INK}` }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-4 flex justify-between items-center"
    >
      <span style={{ fontFamily: HV, fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', color: INK, textTransform: 'uppercase' as const }}>
        Onkar Lanke
      </span>
      <div className="flex items-center gap-8">
        {[['Work', '#work'], ['About', '#about'], ['Contact', '#contact']].map(([l, h]) => (
          <a key={l} href={h}>{lbl(l)}</a>
        ))}
        <a href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing"
          target="_blank" rel="noreferrer"
          style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: PAPER, background: INK, padding: '7px 16px', textTransform: 'uppercase' as const }}
        >Resume ↗</a>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
// Layout: full-bleed oversized headline pinned left; meta columns anchored bottom-right
function SwissHero() {
  return (
    <section id="hero" style={{ background: PAPER, borderBottom: `2px solid ${INK}` }} className="min-h-screen pt-[57px] flex flex-col">

      {/* Top strip */}
      <div style={{ borderBottom: `1px solid ${LIGHT}` }} className="px-8 md:px-16 py-2.5 flex justify-between">
        {lbl('Portfolio — Issue 01 — 2026')}
        {lbl('● Available for opportunities', RED)}
      </div>

      {/* Giant headline — left-anchored, runs off page intentionally */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-between px-8 md:px-16 py-12 md:py-16">

        {/* Decorative folio — top-right */}
        <div className="absolute top-10 right-8 md:right-16 text-right hidden md:block">
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: LIGHT, textTransform: 'uppercase' as const }}>Folio</div>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 72, color: LIGHT, lineHeight: 1, marginTop: -4 }}>001</div>
        </div>

        {/* Main headline */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <h1 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(52px, 12vw, 172px)', lineHeight: 0.88, letterSpacing: '-0.045em', color: INK }}>
            Connecting<br />
            dots,<br />
            bridging<br />
            <span style={{ color: RED }}>Tech</span><br />
            &amp; Design
          </h1>
        </motion.div>

        {/* Bottom meta strip — sits below headline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderTop: `1px solid ${LIGHT}`, paddingTop: 24 }}
        >
          {/* Col 1 — descriptor */}
          <div style={{ borderRight: `1px solid ${LIGHT}`, paddingRight: 32 }}>
            {lbl('Role')}
            <p style={{ fontFamily: HV, fontWeight: 400, fontSize: 18, color: INK, marginTop: 8, lineHeight: 1.4 }}>
              Designer. Researcher.<br />Strategist. Storyteller.
            </p>
          </div>

          {/* Col 2 — bio line */}
          <div style={{ borderRight: `1px solid ${LIGHT}`, padding: '0 32px' }}>
            {lbl('About')}
            <p style={{ fontFamily: HV, fontSize: 13, color: MID, marginTop: 8, lineHeight: 1.75 }}>
              5+ years crafting end-to-end experiences &amp; research based product strategies!
            </p>
          </div>

          {/* Col 3 — CTAs */}
          <div style={{ paddingLeft: 32 }}>
            {lbl('Get in touch')}
            <div className="flex flex-col gap-3 mt-3">
              <a href="mailto:onkarlanke.iitk@gmail.com"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: PAPER, background: INK, padding: '10px 20px', textTransform: 'uppercase' as const, display: 'inline-block', width: 'fit-content' }}
              >Contact Me ↗</a>
              <a href="https://www.linkedin.com/in/onkarlanke/" target="_blank" rel="noreferrer"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: INK, borderBottom: `1px solid ${INK}`, paddingBottom: 2, textTransform: 'uppercase' as const, width: 'fit-content' }}
              >Connect on LinkedIn ↗</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tools strip — typographic, no icons */}
      <div style={{ borderTop: `2px solid ${INK}` }}>
        <div style={{ borderBottom: `1px solid ${LIGHT}` }} className="px-8 md:px-16 py-2">{lbl('Tools I use')}</div>
        <div className="px-8 md:px-16 py-4 flex flex-wrap gap-x-0 gap-y-0">
          {tools.map((t, i) => (
            <span key={t.name} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.07em', color: INK }}>
              {t.name}
              <span style={{ color: LIGHT }}> / {t.category}</span>
              {i < tools.length - 1 && <span style={{ color: LIGHT, margin: '0 10px' }}>—</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
// Layout: running numbers punched large on the left, title flows right
interface Article { title: string; url: string; publication: string; tags: string[]; pubDate: string }

function SwissArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/medium').then(r => r.json())
      .then(d => { if (Array.isArray(d.articles)) setArticles(d.articles) })
      .catch(console.error).finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: PAPER, borderBottom: `2px solid ${INK}` }}>

      {/* Header */}
      <div style={{ borderBottom: `2px solid ${INK}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <div>
          <div className="mb-1">{lbl('Writing')}</div>
          <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 4vw, 52px)', letterSpacing: '-0.03em', color: INK }}>
            Latest pen-downs on medium
          </h2>
        </div>
        <a href="https://medium.com/@onkarlanke" target="_blank" rel="noreferrer">{lbl('All articles ↗')}</a>
      </div>

      {/* Article rows */}
      <div>
        {loading ? (
          [0, 1, 2].map(i => (
            <div key={i} style={{ borderBottom: `1px solid ${LIGHT}` }} className="px-8 md:px-16 py-6 animate-pulse">
              <div style={{ height: 12, background: LIGHT, borderRadius: 1, width: '55%', marginBottom: 8 }} />
              <div style={{ height: 9, background: LIGHT, borderRadius: 1, width: '20%' }} />
            </div>
          ))
        ) : articles.length === 0 ? (
          <div className="px-8 md:px-16 py-6">{lbl('No articles found.')}</div>
        ) : (
          articles.map((a, i) => (
            <motion.a key={a.url} href={a.url} target="_blank" rel="noreferrer"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              style={{ borderBottom: `1px solid ${i < articles.length - 1 ? LIGHT : INK}`, display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 24, alignItems: 'center', transition: 'background 0.15s' }}
              className="px-8 md:px-16 py-5 group hover:bg-stone-100"
            >
              {/* Large index */}
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', color: LIGHT }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Title */}
              <span style={{ fontFamily: HV, fontWeight: 500, fontSize: 'clamp(14px, 1.5vw, 18px)', color: INK, lineHeight: 1.4 }}
                className="group-hover:underline">
                {a.title}
              </span>
              {/* Meta */}
              <div className="flex items-center gap-6 shrink-0 hidden md:flex">
                {a.tags[0] && lbl(a.tags[0])}
                {a.pubDate && lbl(new Date(a.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                <span style={{ fontFamily: HV, fontSize: 16, color: MID }}>↗</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </section>
  )
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
// Layout: giant index number bleeds behind, project info sits over it; alternating sides
function SwissWork() {
  return (
    <section id="work" style={{ background: PAPER, borderBottom: `2px solid ${INK}` }}>
      <div style={{ borderBottom: `2px solid ${INK}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <div>
          <div className="mb-1">{lbl('Selected Work')}</div>
          <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 4vw, 52px)', letterSpacing: '-0.03em', color: INK }}>Case Studies</h2>
        </div>
        {lbl('2023 — 2024')}
      </div>

      {projects.map((p, i) => {
        const isEven = i % 2 === 0
        return (
          <Link href={`/work/${p.slug}`} key={p.slug}>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              style={{ borderBottom: `1px solid ${i < projects.length - 1 ? LIGHT : INK}`, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              className="group"
            >
              {/* Giant ghost index number — decorative */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  [isEven ? 'right' : 'left']: -16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: HV,
                  fontWeight: 900,
                  fontSize: 'clamp(120px, 18vw, 260px)',
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  color: 'transparent',
                  WebkitTextStroke: `1px ${LIGHT}`,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  transition: 'WebkitTextStrokeColor 0.2s',
                }}
                className="group-hover:[--stroke:var(--light)]"
              >{p.index}</div>

              <div
                style={{ padding: 'clamp(28px, 5vw, 56px) clamp(32px, 8vw, 128px)', display: 'grid', gridTemplateColumns: isEven ? '1fr auto' : 'auto 1fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'start' }}
              >
                {/* Info block */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                    {lbl(p.company)}<span style={{ color: LIGHT, fontFamily: MONO, fontSize: 9 }}>—</span>{lbl(p.year)}
                  </div>
                  <h3 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(20px, 2.8vw, 36px)', letterSpacing: '-0.03em', color: INK, lineHeight: 1.1, marginBottom: 16 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: HV, fontSize: 14, color: MID, lineHeight: 1.8, maxWidth: 520, marginBottom: 20 }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                    {p.tags.map(t => lbl(t))}
                  </div>
                </div>

                {/* Metrics block */}
                <div style={{ order: isEven ? 1 : 0, display: 'flex', flexDirection: 'column', gap: 20, alignItems: isEven ? 'flex-end' : 'flex-start' }}>
                  {p.metrics.map(m => (
                    <div key={m.label} style={{ textAlign: isEven ? 'right' : 'left' }}>
                      <div style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.04em', color: RED, lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: MID, textTransform: 'uppercase' as const, marginTop: 4 }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                  <div style={{ fontFamily: HV, fontWeight: 700, fontSize: 22, color: INK, marginTop: 8 }}>
                    View →
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        )
      })}
    </section>
  )
}

// ─── WEBFLOW BUILDS ───────────────────────────────────────────────────────────
// Layout: two large typographic cards — URL displayed as headline, no iframes
function SwissWebBuilds() {
  return (
    <section style={{ background: INK, borderBottom: `2px solid ${PAPER}` }}>
      <div style={{ borderBottom: `2px solid ${PAPER}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <div>
          <div className="mb-1">{lbl('No / Low Code', '#5A5A52')}</div>
          <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 4vw, 52px)', letterSpacing: '-0.03em', color: PAPER }}>Webflow Builds</h2>
        </div>
        {lbl('Production', '#5A5A52')}
      </div>
      <p style={{ fontFamily: HV, fontSize: 14, color: MID, padding: '16px 64px 0', maxWidth: 560 }}>
        Production websites crafted using figma, brewed using webflow &amp; fine-tuned with HTML and CSS.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ marginTop: 24 }}>
        {sites.map((site, i) => (
          <motion.a
            key={site.name} href={site.url} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{
              borderTop: `1px solid #1E1E1E`,
              borderRight: i === 0 ? `1px solid #1E1E1E` : 'none',
              padding: 'clamp(28px, 5vw, 56px)',
              display: 'block',
              transition: 'background 0.2s',
            }}
            className="group hover:bg-zinc-900"
          >
            {/* URL as mini label */}
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: '#3A3A32', textTransform: 'uppercase' as const, marginBottom: 20 }}>
              {site.url.replace('https://', '')}
            </div>

            {/* Site name — big */}
            <h3 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 3vw, 40px)', letterSpacing: '-0.03em', color: PAPER, lineHeight: 1.1, marginBottom: 20 }}>
              {site.name}
            </h3>

            {/* Divider rule */}
            <div style={{ width: '100%', height: 1, background: '#1E1E1E', marginBottom: 20 }} />

            <p style={{ fontFamily: HV, fontSize: 13, color: '#8A8A82', lineHeight: 1.75, marginBottom: 24 }}>
              {site.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                {site.tags.map(t => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: '#4A4A42', textTransform: 'uppercase' as const }}>{t}</span>
                ))}
              </div>
              <span style={{ fontFamily: HV, fontWeight: 700, fontSize: 24, color: PAPER }}
                className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
            </div>

            {/* Location */}
            <div style={{ marginTop: 16, borderTop: `1px solid #1E1E1E`, paddingTop: 12 }}>
              {lbl(site.location, '#3A3A32')}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

// ─── BEHANCE ──────────────────────────────────────────────────────────────────
// Layout: staggered typographic list — large year number + project title + domain tag
function SwissBehance() {
  return (
    <section style={{ background: PAPER, borderBottom: `2px solid ${INK}` }}>
      <div style={{ borderBottom: `2px solid ${INK}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <div>
          <div className="mb-1">{lbl('Archive')}</div>
          <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(20px, 3vw, 40px)', letterSpacing: '-0.03em', color: INK }}>Behance 2020</h2>
          <p style={{ fontFamily: HV, fontSize: 13, color: MID, marginTop: 4 }}>Earlier work and explorations.</p>
        </div>
        <a href="https://www.behance.net/lankeonkar" target="_blank" rel="noreferrer">
          {lbl('Explore more on Behance ↗')}
        </a>
      </div>

      {behanceProjects.map((p, i) => (
        <motion.a
          key={p.url} href={p.url} target="_blank" rel="noreferrer"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.07 }}
          style={{
            borderBottom: `1px solid ${i < behanceProjects.length - 1 ? LIGHT : INK}`,
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto',
            gap: 24,
            alignItems: 'center',
            padding: '20px 64px',
            transition: 'background 0.15s',
          }}
          className="group hover:bg-stone-100"
        >
          {/* Year as bold accent */}
          <span style={{ fontFamily: HV, fontWeight: 900, fontSize: 28, letterSpacing: '-0.03em', color: LIGHT }}>{p.year}</span>

          <div>
            <p style={{ fontFamily: HV, fontWeight: 700, fontSize: 'clamp(14px, 1.6vw, 20px)', color: INK, lineHeight: 1.3, marginBottom: 4 }}
              className="group-hover:underline">{p.title}</p>
            {lbl(p.domain)}
          </div>

          <div className="flex items-center gap-4 hidden md:flex">
            <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.14em', color: MID, border: `1px solid ${LIGHT}`, padding: '3px 8px', textTransform: 'uppercase' as const }}>Behance</span>
            <span style={{ fontFamily: HV, fontWeight: 700, fontSize: 18, color: MID }}>↗</span>
          </div>
        </motion.a>
      ))}
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
// Layout: 3-zone — (A) large pull quote full width, (B) two-col bio, (C) experience as dated list, (D) skills as inline prose
function SwissAbout() {
  return (
    <section id="about" style={{ background: PAPER, borderBottom: `2px solid ${INK}` }}>

      {/* Header */}
      <div style={{ borderBottom: `2px solid ${INK}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <div>
          <div className="mb-1">{lbl('About')}</div>
          <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 4vw, 52px)', letterSpacing: '-0.03em', color: INK }}>
            Craftsmanship + Tech + Amazing folks
          </h2>
        </div>
        {lbl('Background')}
      </div>

      {/* A — Full-width pull quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ borderBottom: `1px solid ${LIGHT}`, padding: 'clamp(32px, 6vw, 80px) clamp(32px, 8vw, 128px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}
        className="grid-cols-1 md:grid"
      >
        <div>
          <h3 style={{ fontFamily: HV, fontWeight: 300, fontSize: 'clamp(18px, 2.5vw, 30px)', color: MID, marginBottom: 24 }}>
            Hey! Thanks for stopping by.
          </h3>
          <blockquote style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 44px)', letterSpacing: '-0.03em', color: INK, lineHeight: 1.1 }}>
            "Designing and building with Intent."
          </blockquote>
          <div style={{ width: 40, height: 3, background: RED, marginTop: 24 }} />
        </div>
        <div>
          <p style={{ fontFamily: HV, fontSize: 14, lineHeight: 1.9, color: INK, marginBottom: 16 }}>
            I'm an engineer turned Designer with utmost fascination for Tech. Design &amp; Tech interplay with each other, leading to tech inspired Design and vice versa.
          </p>
          <p style={{ fontFamily: HV, fontSize: 14, lineHeight: 1.9, color: MID }}>
            Over the years, my love for intentional design practices has grown tremendously. It is said that "Good design shapes you" and I have literally experienced that, specially in last 2 years. My design passion not only built pixel products but also architecture for space design, lighting design and sound design. Connect with me if you've any collabs or just chats!
          </p>
        </div>
      </motion.div>

      {/* B — Experience: year punched large, role + description beside */}
      <div>
        <div style={{ borderBottom: `1px solid ${LIGHT}` }} className="px-8 md:px-16 py-3">{lbl('Experience')}</div>
        {experience.map((exp, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            style={{ borderBottom: `1px solid ${LIGHT}`, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0 }}
            className="grid-cols-1 md:grid"
          >
            {/* Period column */}
            <div style={{ borderRight: `1px solid ${LIGHT}`, padding: 'clamp(16px, 3vw, 32px)' }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: MID }}>{exp.period}</span>
            </div>
            {/* Content */}
            <div style={{ padding: 'clamp(16px, 3vw, 32px)' }}>
              <div style={{ fontFamily: HV, fontWeight: 700, fontSize: 15, color: INK, marginBottom: 2 }}>{exp.role}</div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: MID, textTransform: 'uppercase' as const, marginBottom: 8 }}>{exp.company}</div>
              <p style={{ fontFamily: HV, fontSize: 13, color: MID, lineHeight: 1.8 }}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* C — Skills: category label on left, skills flow as prose */}
      <div>
        <div style={{ borderBottom: `1px solid ${LIGHT}`, borderTop: `1px solid ${LIGHT}` }} className="px-8 md:px-16 py-3">{lbl('Skills')}</div>
        {skillSections.map((s, si) => (
          <motion.div key={s.label}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: si * 0.1 }}
            style={{ borderBottom: `1px solid ${si < skillSections.length - 1 ? LIGHT : 'transparent'}`, display: 'grid', gridTemplateColumns: '120px 1fr' }}
          >
            <div style={{ borderRight: `1px solid ${LIGHT}`, padding: '20px 24px' }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: RED, textTransform: 'uppercase' as const }}>{s.label}</span>
            </div>
            <div style={{ padding: '20px 32px' }}>
              <p style={{ fontFamily: HV, fontSize: 13, lineHeight: 2.1, color: INK }}>
                {s.skills.join('  ·  ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── SKETCHES ─────────────────────────────────────────────────────────────────
// No images — typographic composition: each sketch label rendered as a physical card
// using rotation, weight, and border to evoke the feel of scattered paper
function SwissSketches() {
  return (
    <section style={{ background: PAPER, borderBottom: `2px solid ${INK}`, overflow: 'hidden' }}>
      <div style={{ borderBottom: `2px solid ${INK}` }} className="px-8 md:px-16 py-6">
        <div className="mb-1">{lbl('Thinking out loud')}</div>
        <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(18px, 3vw, 36px)', letterSpacing: '-0.025em', color: INK }}>
          Design breaks: pen strokes in between design sprints
        </h2>
        <p style={{ fontFamily: HV, fontSize: 13, color: MID, marginTop: 6, maxWidth: 480 }}>
          Raw sketches and explorations — My love for sketching &amp; early concepts keep me going.
        </p>
      </div>

      {/* Typographic sketch cards — scattered layout */}
      <div style={{ padding: '48px 64px 64px', position: 'relative', minHeight: 320 }}>
        {/* Background grid lines — ruled paper feel */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25,
          backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${LIGHT} 27px, ${LIGHT} 28px)`,
          backgroundSize: '100% 28px',
        }} />

        <div className="relative flex flex-wrap gap-6 justify-center">
          {sketchLabels.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20, rotate: sketchRotations[i] }}
              whileInView={{ opacity: 1, y: 0, rotate: sketchRotations[i] }}
              whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                width: 160,
                height: 210,
                border: `1px solid ${LIGHT}`,
                background: i % 3 === 0 ? '#EEECe4' : i % 3 === 1 ? '#F6F4EC' : PAPER,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 16,
                cursor: 'default',
                position: 'relative',
                boxShadow: '2px 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              {/* Pencil lines simulation */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', paddingTop: 8 }}>
                {[0.6, 0.9, 0.4, 0.75, 0.5, 0.85, 0.3, 0.65].slice(0, 5 + (i % 3)).map((w, j) => (
                  <div key={j} style={{ height: 1, background: LIGHT, width: `${w * 100}%`, opacity: 0.7 + j * 0.04 }} />
                ))}
                {/* One "sketch mark" diagonal */}
                <div style={{ height: 1, background: LIGHT, width: '40%', transform: `rotate(${-5 + i * 2}deg)`, marginTop: 8 }} />
              </div>
              {/* Label */}
              <div>
                <div style={{ width: '100%', height: 1, background: LIGHT, marginBottom: 8 }} />
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.14em', color: MID, textTransform: 'uppercase' as const }}>
                  {label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function SwissContact() {
  return (
    <section id="contact" style={{ background: INK }}>
      <div style={{ borderBottom: `2px solid ${PAPER}` }} className="px-8 md:px-16 py-6 flex justify-between items-baseline">
        <h2 style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(22px, 4vw, 52px)', letterSpacing: '-0.03em', color: PAPER }}>
          Connect with me.
        </h2>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', color: '#4A4A42', textTransform: 'uppercase' as const }}>Contact</span>
      </div>

      <div className="px-8 md:px-16 py-20 md:py-28 flex flex-col gap-12">
        <motion.a href="mailto:onkarlanke.iitk@gmail.com"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: HV, fontWeight: 900, fontSize: 'clamp(20px, 4vw, 58px)', letterSpacing: '-0.03em', color: PAPER, textDecoration: 'underline', textDecorationColor: RED, textUnderlineOffset: 10, display: 'block' }}
          className="hover:opacity-60 transition-opacity"
        >
          onkarlanke.iitk@gmail.com ↗
        </motion.a>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="flex gap-8 flex-wrap">
            <a href="https://www.linkedin.com/in/onkarlanke/" target="_blank" rel="noreferrer"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: PAPER, borderBottom: `1px solid ${PAPER}`, paddingBottom: 2, textTransform: 'uppercase' as const }}
              className="hover:opacity-40 transition-opacity"
            >LinkedIn ↗</a>
            <a href="tel:+918669882810"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: PAPER, borderBottom: `1px solid ${PAPER}`, paddingBottom: 2, textTransform: 'uppercase' as const }}
              className="hover:opacity-40 transition-opacity"
            >+91 86698 82810</a>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: '#4A4A42', textTransform: 'uppercase' as const }}>© {new Date().getFullYear()} Onkar Lanke. All rights reserved.</span>
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: '#4A4A42', textTransform: 'uppercase' as const }}>Designed &amp; built with intent.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SwissPage() {
  return (
    <div style={{ background: PAPER }}>
      <SwissNav />
      <SwissHero />
      <SwissArticles />
      <SwissWork />
      <SwissWebBuilds />
      <SwissBehance />
      <SwissAbout />
      <SwissSketches />
      <SwissContact />
    </div>
  )
}
