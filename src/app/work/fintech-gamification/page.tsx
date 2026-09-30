'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fintechGamification as cs } from '@/lib/case-studies/fintech-gamification'
import Nav from '@/components/Nav'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const BG     = '#F4F2EC'
const ACCENT = '#6D28D9'

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

// ─── PROCESS IMAGE ────────────────────────────────────────────────────────────

function ProcessImage({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl overflow-hidden shadow-sm"
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
    </motion.div>
  )
}

// ─── STICKY SIDE NAV ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview'      },
  { id: 'step-0',    label: 'Discovery'     },
  { id: 'step-1',    label: 'Research'      },
  { id: 'step-2',    label: 'Benchmarking'  },
  { id: 'step-3',    label: 'Design System' },
  { id: 'step-4',    label: 'Wireframes'    },
  { id: 'step-5',    label: 'High-Fidelity' },
  { id: 'findings',  label: 'Findings'      },
  { id: 'reflect',   label: 'Reflection'    },
  { id: 'team',      label: 'Team'          },
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

// ─── PASSWORD MODAL ───────────────────────────────────────────────────────────

function PasswordModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  async function attempt() {
    const res = await fetch(`/api/auth/${cs.slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: value }),
    })
    if (res.ok) { onSuccess() }
    else { setError(true); setShake(true); setValue(''); setTimeout(() => setShake(false), 400) }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white text-sm font-bold" style={{ backgroundColor: ACCENT }}>f1</div>
        <h3 className="text-zinc-900 text-lg font-semibold mb-1">Full Case Study</h3>
        <p className="text-zinc-500 text-sm mb-6">Enter the access code to view the complete rule builder design and all deliverables.</p>
        <motion.input
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          type="password" value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Enter password" autoFocus
          className={`w-full border rounded-xl px-4 py-3 text-zinc-900 text-sm outline-none mb-4 transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-zinc-200 bg-zinc-50'
          }`}
        />
        {error && <p className="text-red-500 text-xs mb-3 -mt-2">Incorrect password. Try again.</p>}
        <div className="flex gap-3">
          <button onClick={attempt} className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80" style={{ backgroundColor: ACCENT }}>Unlock →</button>
          <button onClick={onClose} className="px-5 py-3 border border-zinc-200 text-zinc-500 text-sm rounded-full hover:border-zinc-400 transition-colors">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FintechGamificationPage() {
  const [modalOpen, setModalOpen] = useState(false)
  function handleUnlock() { setModalOpen(false); window.location.href = cs.detailPath }

  return (
    <main style={{ backgroundColor: BG, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <Nav alwaysVisible />
      <ScrollProgress />
      <StickyNav />

      <AnimatePresence>
        {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} onSuccess={handleUnlock} />}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col" style={{ backgroundColor: BG }}>
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
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="px-8 md:px-16 lg:px-24 pt-5 pb-4 shrink-0"
        >
          <h1 className="text-zinc-900 font-bold leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>
            {cs.hero.headline}
          </h1>
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-8 md:mx-16 lg:mx-24 mb-6 overflow-hidden rounded-2xl flex items-center justify-center"
          style={{ aspectRatio: '16/8', backgroundColor: '#E2DFDA' }}
        >
          {cs.hero.banner?.src
            ? <img src={cs.hero.banner.src} alt={cs.hero.headline} className="w-full h-full object-cover block" />
            : <p className="text-zinc-400 text-sm tracking-widest uppercase">Banner image</p>
          }
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTEXT + PROBLEM
      ══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-zinc-900 font-bold mb-6" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Context</h2>
            <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>
              {cs.overview.context}
            </p>
          </div>
          <div>
            <h2 className="text-zinc-900 font-bold mb-6" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Problem</h2>
            <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>
              {cs.overview.problem}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Statement strip */}
      <div className="px-8 md:px-16 lg:px-24 py-8">
        <div style={{ background: 'rgba(225, 217, 214, 0.50)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid #DBDBDB', borderRadius: '12px', padding: '40px 36px', overflow: 'hidden' }}>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-900 font-bold leading-snug w-full"
            style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}
          >
            "Compliance managers knew exactly what checks they needed — but couldn't implement them without an engineering ticket"
          </motion.h2>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW (Role + Team + Impact)
      ══════════════════════════════════════════════════════ */}
      <motion.section
        id="overview"
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
      >
        <h2 className="text-zinc-900 font-bold mb-14" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Overview</h2>

        {/* Design Direction + Team */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: '#71717a' }}>Design Direction</p>
            <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '20px', fontWeight: 400 }}>
              {cs.overview.direction}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: '#71717a' }}>Team</p>
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
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: '#71717a' }}>Impact — Quantitative</p>
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
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: '#71717a' }}>Impact — Qualitative</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              'Constrained canvases outperform open ones for task-completion work.',
              'Block shape is a UX decision — puzzle pieces communicated directionality before any instruction.',
              'Inline validation changes how users build — from waterfall to iterative.',
              'Approval gates create organisational trust in regulated industries.',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
              >
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 mt-[12px]" />
                  <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════════════════════ */}
      {cs.process.map((step, i) => (
        <motion.section
          key={step.num}
          id={`step-${i}`}
          className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
          initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

            <p className="text-zinc-300 font-normal mb-2" style={{ fontSize: 'clamp(37px, 4.12vw, 56px)' }}>{i + 1}/</p>
            <h2 className="text-zinc-900 font-bold leading-snug mb-5" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>
              {step.title}
            </h2>

            {step.bodyPoints && step.bodyPoints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-8">
                {step.bodyPoints.map((pt, pi) => (
                  <div key={pi} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 mt-[11px]" />
                    <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>{pt}</p>
                  </div>
                ))}
              </div>
            ) : step.body ? (
              <p className="text-zinc-800 leading-relaxed mb-8 max-w-2xl" style={{ fontSize: '18px', fontWeight: 400 }}>
                {step.body}
              </p>
            ) : null}

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
              <ProcessImage src={step.image.src} alt={step.image.alt} />
            )}

            {step.labeledPoints && step.labeledPoints.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mt-10">
                {step.labeledPoints.map((pt, pi) => (
                  <motion.div
                    key={pi}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: pi * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0 mt-[11px]" />
                    <p className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>
                      <span style={{ fontWeight: 600 }}>{pt.label}: </span>{pt.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

          </motion.div>

          {i === cs.process.length - 2 && cs.processMidBanner?.src && (
            <div className="w-full overflow-hidden mt-12 rounded-2xl">
              <img src={cs.processMidBanner.src} alt={cs.processMidBanner.alt} className="w-full h-auto block" />
            </div>
          )}
        </motion.section>
      ))}

      {cs.preFindingsBanner?.src && (
        <div className="w-full overflow-hidden">
          <img src={cs.preFindingsBanner.src} alt={cs.preFindingsBanner.alt} className="w-full h-auto block" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          FINDINGS
      ══════════════════════════════════════════════════════ */}
      <motion.section
        id="findings"
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
      >
        <h2 className="text-zinc-900 font-bold mb-12" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Key Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {cs.findings.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
            >
              <h4 className="text-zinc-900 font-bold mb-3" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}>{f.title}</h4>
              <p className="text-zinc-400 leading-relaxed" style={{ fontSize: '16px' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          REFLECTION
      ══════════════════════════════════════════════════════ */}
      <motion.section
        id="reflect"
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
      >
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: '#71717a' }}>{cs.conclusion.heading}</p>
          <div className="max-w-3xl flex flex-col gap-8">
            {cs.conclusion.paragraphs.map((p, i) => (
              <p key={i} className="text-zinc-800 leading-relaxed" style={{ fontSize: '18px', fontWeight: 400 }}>{p}</p>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════ */}
      <motion.section
        id="team"
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-b border-zinc-200"
      >
        <h2 className="text-zinc-900 font-bold mb-10" style={{ fontSize: 'clamp(24px, 2.94vw, 41px)' }}>Team</h2>
        <div className="flex flex-col gap-4 max-w-lg">
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
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          FOOTER / CTA
      ══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 70, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-16 lg:px-24 py-16 border-t border-zinc-300"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: '#71717a' }}>{cs.client}</p>
            <h2 className="text-zinc-900 font-bold leading-tight" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
              Onkar Lanke<br />
              <span className="text-zinc-400 font-normal">UX lead and strategist</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all no-underline"
              style={{ backgroundColor: ACCENT }}
            >
              View full case study →
            </button>
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
      </motion.section>

    </main>
  )
}
