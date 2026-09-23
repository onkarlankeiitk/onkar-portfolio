'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import PasswordGate from '@/components/PasswordGate'
import { researchStrategy as cs } from '@/lib/case-studies/research-strategy'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DARK   = '#0B0B0B'
const ACCENT = '#53B5B9'
const BG     = '#F4F2EC'

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setPct(total > 0 ? (doc.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <div style={{ width: `${pct}%`, backgroundColor: ACCENT, height: '100%', transition: 'width 0.08s linear' }} />
    </div>
  )
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: ACCENT }}>
      {children}
    </p>
  )
}

function ProcessImage({ src, alt }: {
  src?: string | null; alt: string; aspect?: string
}) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4 }}
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
    <section
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: BG }}
    >
      {/* Back arrow */}
      <div className="flex items-center px-8 md:px-16 pt-5 pb-0 shrink-0">
        <Link href="/#work" className="flex items-center text-zinc-500 transition-colors hover:text-orange-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="px-8 md:px-16 lg:px-24 pt-5 pb-4 shrink-0"
      >
        <h1 className="text-zinc-900 font-bold leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>
          {cs.hero.headline}
        </h1>
      </motion.div>

      {/* 16:7 Banner placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-8 md:mx-16 lg:mx-24 mb-6 overflow-hidden rounded-2xl flex items-center justify-center"
        style={{ aspectRatio: '16/8', backgroundColor: '#E2DFDA' }}
      >
        <p className="text-zinc-400 text-sm tracking-widest uppercase">Banner image</p>
      </motion.div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ResearchStrategyPage() {
  return (
    <main style={{ backgroundColor: BG, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <PasswordGate accentColor="#53B5B9" />
      <ScrollProgress />
      {/* <Nav /> */}
      <StickyNav />

      <Hero />

      {/* ══════════════════════════════════════════════════════
          CONTEXT + PROBLEM
      ══════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200">
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
        >
          <div>
            <h2 className="text-zinc-900 font-bold mb-6" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Context</h2>
            <p className="text-zinc-800 font-medium leading-relaxed" style={{ fontSize: '20px' }}>
              {'Munk Pack is a US-based snacking company specializing in '}
                <span style={{ backgroundColor: '#FDE68A', borderRadius: '2px', padding: '0 2px' }}>healthy, convenient, and delicious snack bars.</span>
                {' Their products are designed for health-conscious consumers seeking '}
                <span style={{ backgroundColor: '#FDE68A', borderRadius: '2px', padding: '0 2px' }}>high-protein, low-sugar, and keto-friendly options.</span>
                {' The brand emphasizes '}
                <span style={{ backgroundColor: '#FDE68A', borderRadius: '2px', padding: '0 2px' }}>clean ingredients, great taste, and on-the-go nutrition,</span>
                {' making their bars ideal for busy professionals, fitness enthusiasts, and anyone looking for a guilt-free snack.'}
            </p>
          </div>
          <div>
            <h2 className="text-zinc-900 font-bold mb-6" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Problem</h2>
            <p className="text-zinc-800 font-medium leading-relaxed" style={{ fontSize: '20px' }}>
              {'Growth stagnation. Munk Pack was '}
                <span style={{ backgroundColor: '#FDE68A', borderRadius: '2px', padding: '0 2px' }}>not able to connect their product offerings to its audience,</span>
                {' as primary audience, was '}
                <span style={{ backgroundColor: '#FDE68A', borderRadius: '2px', padding: '0 2px' }}>never mapped precisely.</span>
                {" People couldn't connect with stories they tell, drop offs were high and thus low conversion rates."}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Statement strip */}
      <div className="px-8 md:px-16 lg:px-24 py-8">
      <div className="relative overflow-hidden px-8 md:px-16 lg:px-24 py-16 rounded-2xl" style={{ backgroundColor: '#D4A017' }}>
        {/* Noise overlay */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.45, pointerEvents: 'none' }}>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="relative text-zinc-900 font-bold leading-snug w-full"
          style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}
        >
          "Munk Pack's storytelling wasn't convincing enough despite having built good product range"
        </motion.h2>
      </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW (Role + Team + Impact)
      ══════════════════════════════════════════════════════ */}
      <section id="overview" className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200">

        <h2 className="text-zinc-900 font-bold mb-14" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Overview</h2>

        {/* My Role + Team */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: ACCENT }}>My Role</p>
            <p className="text-zinc-800 font-medium leading-snug" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}>
              Senior Ux'er & project lead: Led the research and strategy in collaboration with Commongood USA, running heuristic evaluation, competitive benchmarking, user segmentation & behavior mapping, IA redesign, wireframes and visual design. 
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: ACCENT }}>Team</p>
            <div className="flex flex-col gap-4">
              {cs.team.map(m => (
                <a key={m.name} href={m.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-zinc-200 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-zinc-900 font-semibold" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>{m.name}</p>
                    <p className="text-zinc-400 text-sm mt-0.5">{m.role}</p>
                  </div>
                  <svg className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quantitative */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-20">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: ACCENT }}>Impact — Quantitative</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {cs.metrics.slice(0, -1).map(m => (
              <div key={m.label}>
                <p className="font-bold leading-none mb-3 text-zinc-800" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>{m.value}</p>
                <p className="text-zinc-800 font-medium text-base mb-1">{m.label}</p>
                {m.sub && <p className="text-zinc-400 text-sm">{m.sub}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Qualitative */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: ACCENT }}>Impact — Qualitative</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              'Shifted site communication from transactional product listing to lifestyle storytelling — giving the 1g sugar USP a clear visual and content home.',
              'Every artifact — heuristic audit, competitive matrix, journey maps — was structured so Commongood\'s design team could act on it without additional briefing.',
              'The Net Carbs Calculator and Store Locator were buried; we re-architected the IA to give both tools prominent, discoverable entry points.',
              'Established a clean separation between research deliverables and design execution — a reusable workflow for multi-agency engagements.',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 self-center" />
                  <p className="text-zinc-500 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}>{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collaboration Partner */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mt-36">
          <h2 className="text-zinc-900 font-bold mb-6" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Collaboration Partner</h2>
          <img
            src="/case-studies/research-strategy/commongood.png"
            alt="Commongood — Collaboration Partner"
            className="w-full h-auto block mb-6"
          />
          <p className="text-zinc-500 text-sm mb-3">Important links:</p>
          <div className="flex gap-3">
            <a
              href="https://www.commongood.co/work/munk-pack/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-12 px-5 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 font-bold hover:border-zinc-600 hover:text-zinc-900 transition-all underline underline-offset-2" style={{ fontSize: '18px' }}
            >
              Commongood work
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a
              href="https://munkpack.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-12 px-5 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 font-bold hover:border-zinc-600 hover:text-zinc-900 transition-all underline underline-offset-2" style={{ fontSize: '18px' }}
            >
              Munk Pack site
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* How we solved it */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mt-20">
          <h2 className="text-zinc-900 font-bold mb-10" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>How we solved it?</h2>

          {/* Category 1: How we solved it */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: ACCENT }}>How we solved it?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                { num: '01', body: 'Conducted a 14-point heuristic evaluation of the existing site, rating every issue from critical to low severity to establish a clear priority order for redesign.' },
                { num: '02', body: 'Benchmarked 6 competitor brands — Kind, Magic Spoon, GoMacro, IQ Bar, Ratio, and High Key — across 17 UX parameters to identify gaps and opportunities.' },
                { num: '03', body: 'Mapped 4 user segments (kids, students, working adults, seniors) with distinct journeys, frustrations, and entry points to anchor the IA in real behaviour.' },
                { num: '04', body: 'Redesigned the full information architecture with circular navigation, a single filterable shop, and surfaced high-value tools — Net Carbs Calculator and Store Locator.' },
                { num: '05', body: 'Delivered Figma wireframes for all 10 pages, each annotated for direct handoff to the visual design team without additional interpretation.' },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 self-center" />
                    <p className="text-zinc-600 leading-relaxed" style={{ fontSize: '20px' }}>{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category 2: Constraints */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: ACCENT }}>Constraints</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                { num: '01', body: 'Placeholder constraint 1 — to be filled in.' },
                { num: '02', body: 'Placeholder constraint 2 — to be filled in.' },
                { num: '03', body: 'Placeholder constraint 3 — to be filled in.' },
                { num: '04', body: 'Placeholder constraint 4 — to be filled in.' },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 self-center" />
                    <p className="text-zinc-600 leading-relaxed" style={{ fontSize: '20px' }}>{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════════════════════ */}
      {cs.process.map((step, i) => (
        <section
          key={step.num}
          id={`step-${i}`}
          className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
        >
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>

            <p className="text-zinc-300 font-normal mb-2" style={{ fontSize: 'clamp(37px, 4.12vw, 56px)' }}>{step.num.replace(/^Step\s*/i, '')}/</p>
            <h2 className="text-zinc-900 font-bold leading-snug mb-5" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>
              {step.title}
            </h2>

            <p className="text-zinc-500 leading-relaxed mb-8 max-w-2xl" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}>
              {step.body}
            </p>

            {step.tags && step.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {step.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border border-zinc-300 text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {step.image.src && (
              <ProcessImage src={step.image.src} alt={step.image.alt} aspect={step.image.aspect} />
            )}

          </motion.div>

          {i === cs.process.length - 2 && cs.processMidBanner?.src && (
            <div className="w-full overflow-hidden mt-12 -mx-0 rounded-2xl">
              <img src={cs.processMidBanner.src} alt={cs.processMidBanner.alt} className="w-full h-auto block" />
            </div>
          )}
        </section>
      ))}

      {cs.preFindingsBanner?.src && (
        <div className="w-full overflow-hidden">
          <img src={cs.preFindingsBanner.src} alt={cs.preFindingsBanner.alt} className="w-full h-auto block" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          FINDINGS
      ══════════════════════════════════════════════════════ */}
      <section id="findings" className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: ACCENT }}>Key Findings</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {cs.findings.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <h4 className="text-zinc-900 font-semibold leading-snug mb-3" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}>{f.title}</h4>
                <p className="text-zinc-400 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>{f.desc}</p>
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
      <section id="reflect" className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: ACCENT }}>{cs.conclusion.heading}</p>

          <div className="max-w-3xl flex flex-col gap-8">
            {cs.conclusion.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-zinc-700 leading-relaxed"
                style={{ fontSize: i === 0 ? 'clamp(18px, 1.8vw, 24px)' : 'clamp(15px, 1.4vw, 17px)' }}
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
      <section className="px-8 md:px-16 lg:px-24 py-16 border-t border-zinc-300">
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: ACCENT }}>{cs.client}</p>
            <h2 className="text-zinc-900 font-bold leading-tight" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
              Onkar Lanke<br />
              <span className="text-zinc-400 font-normal">{cs.role}</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 border border-zinc-400 text-zinc-600 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-700 hover:text-zinc-900 transition-all no-underline"
            >
              ← Back to all work
            </Link>
            <a
              href="https://www.linkedin.com/in/onkarlanke/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all no-underline"
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
