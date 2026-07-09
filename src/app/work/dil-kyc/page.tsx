'use client'

// app/work/dil-kyc/page.tsx
// DIL KYC Summary — light theme, data-driven, image slots like other case studies

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { dilKyc as cs } from '@/lib/case-studies/dil-kyc'

const NAVY  = '#0D1B2A'
const GREEN = '#0fa475'

// ─── SHARED ATOMS ────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 font-medium">
      {children}
    </span>
  )
}

function StepImage({ src, alt, hint, aspect = 'aspect-[4/3]' }: {
  src: string | null; alt: string; hint: string; aspect?: string
}) {
  if (src) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className={`${aspect} w-full rounded-2xl overflow-hidden shadow-sm`}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={`${aspect} w-full rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center gap-3 p-8 text-center`}
    >
      <div className="text-3xl opacity-20">🖼</div>
      <p className="text-zinc-500 text-sm font-medium">{alt}</p>
      <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">{hint}</p>
    </motion.div>
  )
}

function BannerImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
      className="w-full overflow-hidden"
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
    </motion.div>
  )
}

// ─── PASSWORD MODAL ───────────────────────────────────────────────────────────

function PasswordModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  async function attempt() {
    const res = await fetch('/api/auth/dil-kyc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: value }),
    })
    if (res.ok) { onSuccess() }
    else {
      setError(true); setShake(true); setValue('')
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(13,27,42,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border-2 border-green-400">
          <span className="text-green-600 font-bold text-sm tracking-widest">DIL</span>
        </div>
        <h3 className="text-zinc-900 text-lg font-semibold mb-1">Full Case Study</h3>
        <p className="text-zinc-500 text-sm mb-6">Enter the access code to view the full process, wireframes, and all deliverables.</p>
        <motion.input
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Enter password"
          autoFocus
          className={`w-full border rounded-xl px-4 py-3 text-zinc-900 text-sm outline-none mb-4 transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-zinc-200 bg-zinc-50 focus:border-green-400'
          }`}
        />
        {error && <p className="text-red-500 text-xs mb-3 -mt-2">Incorrect password. Try again.</p>}
        <div className="flex gap-3">
          <button
            onClick={attempt}
            className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: GREEN }}
          >
            Unlock →
          </button>
          <button onClick={onClose} className="px-5 py-3 border border-zinc-200 text-zinc-500 text-sm rounded-full hover:border-zinc-400 transition-colors">
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DILKYCSummary() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleUnlock() {
    setModalOpen(false)
    window.location.href = '/work/dil-kyc-detail'
  }

  return (
    <main className="bg-white text-zinc-900 antialiased">
      <AnimatePresence>
        {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} onSuccess={handleUnlock} />}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="overflow-hidden" style={{ backgroundColor: NAVY }}>

        {/* Row 1: Back + Tags */}
        <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8 pb-5">
          <Link href="/#work" className="flex items-center gap-2 text-zinc-400 text-xs hover:text-green-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to work
          </Link>
          <div className="flex flex-wrap gap-2 justify-end">
            {cs.tags.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Row 2: Headline + description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10 px-8 md:px-16 lg:px-24 pb-5"
        >
          <p className="text-green-400 text-xs tracking-[0.22em] uppercase font-medium mb-3">{cs.client}</p>
          <h1 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-3">
            KYC & <span style={{ color: GREEN }}>Onboarding</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">{cs.hero.subline}</p>
        </motion.div>

        {/* Row 3: Banner — 16:9 */}
        {cs.hero.banner?.src ? (
          <div className="overflow-hidden aspect-video">
            {cs.hero.banner.type === 'video' ? (
              <video autoPlay muted loop playsInline className="w-full h-full object-cover block">
                <source src={cs.hero.banner.src} type="video/mp4" />
              </video>
            ) : (
              <img src={cs.hero.banner.src} alt={cs.hero.headline} className="w-full h-full object-cover block" />
            )}
          </div>
        ) : (
          <div className="relative overflow-hidden py-36 md:py-48" style={{ backgroundColor: '#0a1a0a' }}>
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: 'linear-gradient(#0fa475 1px, transparent 1px), linear-gradient(90deg, #0fa475 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
            <div className="relative flex items-center justify-center">
              <div className="flex items-center gap-6 opacity-20">
                <div className="w-16 h-16 border-2 border-green-400 flex items-center justify-center">
                  <span className="text-green-400 font-bold text-lg tracking-widest">DIL</span>
                </div>
                <div className="text-green-400 text-4xl font-bold tracking-tight opacity-60">KYC Platform</div>
              </div>
            </div>
          </div>
        )}

        {/* Row 4: Meta */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-8 md:px-16 lg:px-24 py-5 border-t border-zinc-800">
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Client',   value: cs.client },
              { label: 'Role',     value: cs.role },
              { label: 'Timeline', value: cs.timeline },
              { label: 'Year',     value: cs.year },
            ].map(m => (
              <div key={m.label}>
                <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-zinc-200 text-sm font-medium">{m.value}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs italic max-w-xs hidden md:block">
            "For banks, KYC is a filtering-out process. For DIL, KYC is a welcoming-in process."
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: GREEN }}>Overview</p>
          <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">{cs.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {[
              { head: 'Context', body: cs.overview.context },
              { head: 'Problem', body: cs.overview.problem },
              { head: cs.overview.directionLabel ?? 'Solution', body: cs.overview.direction },
            ].map(col => (
              <div key={col.head}>
                <h3 className="text-zinc-800 font-semibold text-base mb-3">{col.head}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden">
            {cs.metrics.map(m => (
              <div key={m.label} className="bg-white px-6 py-8">
                <div className="text-4xl font-bold mb-1" style={{ color: GREEN }}>{m.value}</div>
                <div className="text-zinc-800 text-sm font-medium mb-0.5">{m.label}</div>
                {m.sub && <div className="text-zinc-400 text-xs">{m.sub}</div>}
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-14 bg-[#f9f9f7]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: GREEN }}>Process</p>
          {cs.processIntro && (
            <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-20 max-w-3xl leading-tight">{cs.processIntro}</h2>
          )}

          <div className="space-y-14">
            {cs.process.map((step) => {
              const isLeft = step.imagePosition === 'left'
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className={isLeft ? 'order-1 md:order-2' : ''}>
                    <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: GREEN }}>{step.num}</p>
                    <h3 className="text-zinc-900 font-bold text-2xl mb-4">{step.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-5">{step.body}</p>
                    {step.tags && step.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                      </div>
                    )}
                  </div>
                  <div className={isLeft ? 'order-2 md:order-1' : ''}>
                    <StepImage src={step.image.src} alt={step.image.alt} hint={step.image.hint} aspect={step.image.aspect} />
                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>
      </section>

      {/* Mid-process banner */}
      {cs.processMidBanner && <BannerImage src={cs.processMidBanner.src} alt={cs.processMidBanner.alt} />}

      {/* Pre-findings banner */}
      {cs.preFindingsBanner && <BannerImage src={cs.preFindingsBanner.src} alt={cs.preFindingsBanner.alt} />}

      {/* ── FINDINGS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-14 bg-white">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: GREEN }}>Key Findings</p>
          <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold mb-16 max-w-3xl leading-tight">What this project taught me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cs.findings.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-zinc-200 border-l-4 rounded-2xl p-6 hover:border-green-300 transition-all"
                style={{ borderLeftColor: GREEN }}
              >
                <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: GREEN }}>{f.num}</p>
                <h4 className="text-zinc-900 font-semibold text-base mb-2">{f.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* Pre-conclusion banner */}
      {cs.preConclusionBanner && <BannerImage src={(cs as any).preConclusionBanner?.src} alt={(cs as any).preConclusionBanner?.alt ?? ''} />}

      {/* ── CONCLUSION ── */}
      <section className="px-8 md:px-16 lg:px-24 py-14 bg-[#f9f9f7]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: GREEN }}>{cs.conclusion.heading}</p>
          <div className="max-w-3xl space-y-6">
            {cs.conclusion.paragraphs.map((p, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? 'text-zinc-800 text-lg' : 'text-zinc-500 text-base'}`}>{p}</p>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ── TEAM ── */}
      {cs.team && cs.team.length > 0 && (
        <section className="px-8 md:px-16 lg:px-24 py-12 bg-white border-t border-zinc-100">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: GREEN }}>Team</p>
            <div className="border border-zinc-100 rounded-2xl overflow-hidden divide-y divide-zinc-100">
              {cs.team.map(m => (
                <div key={m.name} className="grid grid-cols-3 items-center px-6 py-4">
                  <p className="text-zinc-800 text-sm font-medium">{m.name}</p>
                  <p className="text-zinc-400 text-sm">{m.role}</p>
                  <a href={m.url} target="_blank" rel="noreferrer" className="justify-self-end flex items-center gap-1.5 text-xs border border-zinc-200 rounded-full px-3 py-1.5 text-zinc-500 hover:border-green-400 hover:text-green-600 transition-colors">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="px-8 md:px-16 lg:px-24 py-20" style={{ backgroundColor: NAVY }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
        >
          <div>
            <p className="text-green-400 text-xs uppercase tracking-[0.2em] font-medium mb-5">{cs.client} · Full Case Study</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4 whitespace-pre-line">{cs.cta.heading}</h2>
            <p className="text-zinc-400 text-base max-w-xl leading-relaxed">{cs.cta.body}</p>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: GREEN }}
            >
              View full case study →
            </button>
            <Link
              href="/#work"
              className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 px-8 py-4 rounded-full text-sm font-medium hover:border-green-400 hover:text-green-400 transition-all"
            >
              ← Back to all work
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
