'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import { researchStrategy as cs } from '@/lib/case-studies/research-strategy'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DARK   = '#0B0B0B'
const ACCENT = '#E75175'

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: ACCENT }}>
      {children}
    </p>
  )
}

function ProcessImage({ src, alt, dark = false }: {
  src?: string | null; alt: string; aspect?: string; dark?: boolean
}) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="w-full rounded-2xl overflow-hidden shadow-sm"
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
    </motion.div>
  )
}

// ─── STICKY SIDE NAV ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview'      },
  { id: 'step-0',       label: 'Site Audit'    },
  { id: 'step-1',       label: 'Competitive'   },
  { id: 'step-2',       label: 'Segmentation'  },
  { id: 'step-3',       label: 'IA & Wires'    },
  { id: 'findings',     label: 'Findings'      },
  { id: 'reflect',      label: 'Reflection'    },
  { id: 'team',         label: 'Team'          },
]

function StickyNav() {
  const [active, setActive] = useState(NAV_ITEMS[0].id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
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
          className="text-left text-xs font-medium transition-all duration-200"
          style={{ color: active === item.id ? ACCENT : '#71717a' }}
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
    <section className="overflow-hidden" style={{ backgroundColor: DARK }}>
      {/* Subtle grid texture */}
      <div className="absolute inset-x-0 top-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        height: '100%',
      }} />

      {/* Row 1: Back + Tags */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-16 md:pt-20 pb-6 md:pb-8 flex-wrap gap-3">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-zinc-400 text-xs transition-colors hover:text-orange-400"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to work
        </Link>
        <div className="flex gap-2 flex-wrap justify-end">
          {cs.tags.map(t => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 rounded-full border font-medium"
              style={{ borderColor: `${ACCENT}50`, background: `${ACCENT}18`, color: '#e8a07a' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Headline + subline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 px-8 md:px-16 lg:px-24 pb-8 md:pb-12"
      >
        <p className="text-xs tracking-[0.22em] uppercase font-medium mb-3" style={{ color: ACCENT }}>
          {cs.client}
        </p>
        <h1 className="text-white font-bold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
          {cs.hero.headline}
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
          {cs.hero.subline}
        </p>
      </motion.div>

      {/* NDA strip */}
      <div style={{ background: '#E75175', padding: '12px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffffff', margin: 0 }}>
          ⚠ Sharing only snippets as per NDA
        </p>
      </div>

      {/* Row 3: Banner */}
      <div className="relative overflow-hidden aspect-video bg-zinc-900">
        {cs.hero.banner && (
          cs.hero.banner.type === 'video' ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover block">
              <source src={cs.hero.banner.src!} type="video/mp4" />
            </video>
          ) : (
            <img src={cs.hero.banner.src!} alt={cs.hero.headline} className="w-full h-full object-cover block" />
          )
        )}
      </div>

      {/* Row 4: Meta strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center gap-8 px-8 md:px-16 lg:px-24 py-6 md:py-10 border-t border-zinc-800"
      >
        {[
          { label: 'Client',   value: cs.client },
          { label: 'Role',     value: cs.role },
          { label: 'Timeline', value: cs.timeline },
          { label: 'Year',     value: cs.year },
        ].map(m => (
          <div key={m.label}>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{m.label}</p>
            <p className="text-zinc-200 text-sm font-medium">{m.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ResearchStrategyPage() {
  return (
    <main className="bg-white">
      {/* <Nav /> */}
      <StickyNav />

      <Hero />

      {/* ══════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════ */}
      <section id="team" className="px-8 md:px-16 lg:px-24 py-20 bg-white border-t border-zinc-100">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

          <SectionLabel light>Team</SectionLabel>

          <div className="border border-zinc-100 rounded-2xl overflow-hidden divide-y divide-zinc-100 mt-2">
            {cs.team.map(m => (
              <div key={m.name} className="grid grid-cols-3 items-center px-6 py-4">
                <p className="text-zinc-800 text-sm font-medium">{m.name}</p>
                <p className="text-zinc-400 text-sm">{m.role}</p>
                <a href={m.url} target="_blank" rel="noreferrer" className="justify-self-end flex items-center gap-1.5 text-xs border border-zinc-200 rounded-full px-3 py-1.5 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section id="overview" className="px-8 md:px-16 lg:px-24 py-10 md:py-16 lg:py-20 bg-white">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <SectionLabel light>01 — Overview</SectionLabel>
          <h2 className="text-zinc-900 font-bold mb-10 leading-tight max-w-3xl" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            {cs.title}
          </h2>

          {/* Context / Problem / Solution */}
          <div className="grid md:grid-cols-3 border border-zinc-200 rounded-2xl overflow-hidden mb-12">
            {[
              { head: 'Context',  body: cs.overview.context },
              { head: 'Problem',  body: cs.overview.problem },
              { head: cs.overview.directionLabel ?? 'Solution', body: cs.overview.direction },
            ].map((col, i, arr) => (
              <div key={col.head} className={`p-7 ${i < arr.length - 1 ? 'border-b md:border-b-0 md:border-r border-zinc-200' : ''}`}>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">{col.head}</p>
                <p className="text-zinc-700 text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 rounded-2xl overflow-hidden">
            {cs.metrics.map(m => (
              <div key={m.label} className="bg-white p-7">
                <div className="font-bold mb-1 leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: ACCENT }}>
                  {m.value}
                </div>
                <div className="text-zinc-800 text-sm font-medium mb-0.5">{m.label}</div>
                {m.sub && <div className="text-zinc-400 text-xs">{m.sub}</div>}
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════════════════════ */}
      {cs.process.map((step, i) => {
        const isDark = i % 2 === 1
        const isLeft = step.imagePosition === 'left'
        const sectionNum = String(i + 2).padStart(2, '0')
        return (
          <>
            <section
              key={step.num}
              id={`step-${i}`}
              className={`px-8 md:px-16 lg:px-24 py-24 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}
            >
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

                <SectionLabel light={!isDark}>{sectionNum} — {step.num}</SectionLabel>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                  <div className={isLeft ? 'md:order-2' : ''}>
                    <h3 className={`font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`} style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
                      {step.title}
                    </h3>
                    <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {step.body}
                    </p>
                    {step.tags && step.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full border font-medium ${
                              isDark
                                ? 'border-zinc-700 text-zinc-400 bg-zinc-800/60'
                                : 'border-zinc-200 text-zinc-500 bg-white'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={isLeft ? 'md:order-1' : ''}>
                    <ProcessImage src={step.image.src} alt={step.image.alt} aspect={step.image.aspect} dark={isDark} />
                  </div>
                </div>

              </motion.div>
            </section>

            {/* Strategy overview banner — inserted before Step 04 (last step) */}
            {i === cs.process.length - 2 && cs.processMidBanner?.src && (
              <div className="w-full overflow-hidden">
                <img src={cs.processMidBanner.src} alt={cs.processMidBanner.alt} className="w-full h-auto block" />
              </div>
            )}
          </>
        )
      })}

      {cs.preFindingsBanner?.src && (
        <div className="w-full overflow-hidden">
          <img src={cs.preFindingsBanner.src} alt={cs.preFindingsBanner.alt} className="w-full h-auto block" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          FINDINGS
      ══════════════════════════════════════════════════════ */}
      <section id="findings" className="px-8 md:px-16 lg:px-24 py-10 md:py-16 lg:py-20 bg-white">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <SectionLabel light>06 — Key Findings</SectionLabel>
          <h2 className="text-zinc-900 font-bold mb-12 leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            What the research surfaced
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {cs.findings.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-zinc-100 rounded-2xl p-7"
                style={{ borderLeft: `3px solid ${ACCENT}` }}
              >
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">{f.num}</p>
                <h4 className="text-zinc-900 text-base font-semibold mb-3 leading-snug">{f.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {cs.preConclusionBanner?.src && (
        <div className="w-full overflow-hidden">
          <img src={cs.preConclusionBanner.src} alt={cs.preConclusionBanner.alt} className="w-full h-auto block" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          REFLECTION
      ══════════════════════════════════════════════════════ */}
      <section id="reflect" className="px-8 md:px-16 lg:px-24 py-10 md:py-16 lg:py-20 bg-zinc-950">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <SectionLabel>07 — {cs.conclusion.heading}</SectionLabel>
          <h2 className="text-white font-bold mb-12 leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            Learnings & Reflections
          </h2>

          <div className="max-w-3xl flex flex-col gap-6">
            {cs.conclusion.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${i === 0 ? 'text-zinc-200 text-lg border-l-2 pl-6' : 'text-zinc-500 text-sm'}`}
                style={i === 0 ? { borderColor: ACCENT } : {}}
              >
                {p}
              </p>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER / CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK }} className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-medium mb-4" style={{ color: ACCENT }}>
              {cs.client}
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Onkar Lanke<br />
              <span className="text-zinc-500">{cs.role}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-zinc-500 hover:text-white transition-all no-underline"
            >
              ← Back to all work
            </Link>
            <a
              href="https://www.linkedin.com/in/onkarlanke/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all no-underline"
              style={{ backgroundColor: ACCENT }}
            >
              Connect on LinkedIn →
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
