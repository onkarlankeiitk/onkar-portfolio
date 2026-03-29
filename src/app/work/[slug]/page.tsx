'use client'

// app/work/[slug]/page.tsx
// This single file handles ALL summary pages — /work/deckup, /work/research-strategy, etc.

import React, { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { getCaseStudy } from '@/lib/case-studies'
import type { CaseStudy, ProcessStep, FindingCard, TeamMember } from '@/lib/case-studies/types'

// ─── IMAGE SLOT ───────────────────────────────────────────────────────────────
function ImageSlot({ alt, hint, aspect = 'aspect-video', className = '' }: {
  alt: string; hint: string; aspect?: string; className?: string
}) {
  return (
    <div className={`${aspect} ${className} bg-zinc-900 border border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-center p-6`}>
      <div className="text-2xl opacity-40">🖼</div>
      <p className="text-zinc-400 text-sm font-medium">{alt}</p>
      <p className="text-zinc-600 text-xs max-w-xs">{hint}</p>
    </div>
  )
}

// ─── PASSWORD MODAL ───────────────────────────────────────────────────────────
function PasswordModal({ slug, onClose, onSuccess }: {
  slug: string; onClose: () => void; onSuccess: () => void
}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  async function attempt() {
    const res = await fetch(`/api/auth/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: value }),
    })
    if (res.ok) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setValue('')
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-2xl mb-4">🔒</div>
        <h3 className="text-white text-xl font-semibold mb-1">Full Case Study</h3>
        <p className="text-zinc-500 text-sm mb-6">Enter the access code to view the detailed breakdown — process, artifacts, and all deliverables.</p>

        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Password</p>
        <motion.input
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Enter password"
          className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white text-sm outline-none mb-2 transition-colors ${
            error ? 'border-red-500/60' : 'border-zinc-700 focus:border-zinc-500'
          }`}
        />
        {error && <p className="text-red-400 text-xs mb-4">Incorrect password. Try again.</p>}
        {!error && <div className="mb-4" />}

        <div className="flex gap-3">
          <button onClick={attempt} className="flex-1 bg-white text-black text-sm font-medium py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Unlock →
          </button>
          <button onClick={onClose} className="px-5 py-3 border border-zinc-700 text-zinc-400 text-sm rounded-full hover:border-zinc-500 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────
function Step({ step }: { step: ProcessStep }) {
  const isLeft = step.imagePosition === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 pb-16 border-b border-zinc-900 last:border-0 last:mb-0 last:pb-0"
    >
      <div className={isLeft ? 'order-1 md:order-2' : ''}>
        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">{step.num}</p>
        <h3 className="text-white font-semibold text-2xl mb-4">{step.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4">{step.body}</p>
        {step.tags && step.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {step.tags.map(tag => (
              <span key={tag} className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={isLeft ? 'order-2 md:order-1' : ''}>
        {step.image.src ? (
          <img src={step.image.src} alt={step.image.alt} className={`w-full rounded-2xl ${step.image.aspect ?? 'aspect-video'} object-cover`} />
        ) : (
          <ImageSlot alt={step.image.alt} hint={step.image.hint} aspect={step.image.aspect} />
        )}
      </div>
    </motion.div>
  )
}

// ─── FINDING CARD ─────────────────────────────────────────────────────────────
function Finding({ card }: { card: FindingCard }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-colors">
      <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">{card.num}</p>
      <h4 className="text-white font-semibold text-base mb-2">{card.title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
    </div>
  )
}

// ─── TEAM MEMBER ──────────────────────────────────────────────────────────────
function Member({ m }: { m: TeamMember }) {
  return (
    <a
      href={m.url} target="_blank" rel="noreferrer"
      className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-xl hover:border-zinc-600 transition-colors"
    >
      <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
        {m.initials}
      </div>
      <div>
        <p className="text-white text-sm font-medium">{m.name}</p>
        <p className="text-zinc-600 text-xs">{m.role}</p>
      </div>
      <svg className="w-3.5 h-3.5 text-zinc-700 ml-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  )
}

// ─── MAIN TEMPLATE ────────────────────────────────────────────────────────────
export default function CaseStudySummary({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const cs: CaseStudy | undefined = getCaseStudy(slug)
  const [modalOpen, setModalOpen] = useState(false)

  if (!cs) {
    return (
      <main className="bg-[#0a0a0a] min-h-screen text-white flex items-center justify-center">
        <p className="text-zinc-600">Case study not found.</p>
      </main>
    )
  }

  function handleUnlock() {
    setModalOpen(false)
    window.location.href = cs!.detailPath
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        {cs.hero.banner ? (
          cs.hero.banner.type === 'video' ? (
            <video
              autoPlay muted loop playsInline
              poster={cs.hero.banner.poster}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
              <source src={cs.hero.banner.src!} type="video/mp4" />
            </video>
          ) : (
            <img
              src={cs.hero.banner.src!}
              alt={cs.hero.headline}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-20">🎬</div>
              <p className="text-zinc-700 text-sm">Banner / Hero video or GIF</p>
              <p className="text-zinc-800 text-xs mt-1">Set hero.banner in the data file once you have the asset</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 pt-32">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-zinc-600 text-xs mb-8"
          >
            <Link href="/#work" className="hover:text-zinc-400 transition-colors">Work</Link>
            <span>/</span>
            <span className="text-zinc-500">{cs.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {cs.tags.map(tag => (
              <span key={tag} className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            {cs.hero.headline}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-400 text-xl md:text-2xl font-light max-w-2xl mb-10"
          >
            {cs.hero.subline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { label: 'Client',   value: cs.client },
              { label: 'My Role',  value: cs.role },
              { label: 'Timeline', value: cs.timeline },
              { label: 'Year',     value: cs.year },
            ].map(m => (
              <div key={m.label} className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl">
                <p className="text-zinc-600 text-xs">{m.label}</p>
                <p className="text-white text-sm font-medium">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8 md:right-16 lg:right-24 text-zinc-700 text-xs tracking-widest uppercase flex items-center gap-2"
        >
          Scroll
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.div>
        </motion.div>
      </section>

      {/* ── 2. OVERVIEW ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {[
            { label: 'Context',                                text: cs.overview.context },
            { label: 'Problem',                                text: cs.overview.problem },
            { label: cs.overview.directionLabel ?? 'Solution', text: cs.overview.direction },
          ].map(col => (
            <div key={col.label}>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">{col.label}</p>
              <p className="text-zinc-300 text-sm leading-relaxed">{col.text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. METRICS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-20 border-t border-zinc-900 bg-zinc-900/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Results</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold">Impact</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {cs.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-white text-4xl md:text-5xl font-bold tracking-tight">{m.value}</div>
              <div className="text-zinc-400 text-sm mt-1">{m.label}</div>
              {m.sub && <div className="text-zinc-600 text-xs mt-0.5">{m.sub}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. PROCESS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold">{cs.processIntro ?? 'How we got there'}</h2>
        </motion.div>
        {cs.process.map((step, i) => <Step key={i} step={step} />)}
      </section>

      {/* ── 5. FINDINGS ── */}
      {cs.findings.length > 0 && (
        <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">Key Findings</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold">What we found</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cs.findings.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Finding card={card} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. CONCLUSION ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4">Conclusion</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">{cs.conclusion.heading}</h2>
          {cs.conclusion.paragraphs.map((p, i) => (
            <p key={i} className={`leading-relaxed mb-6 last:mb-0 ${i === 0 ? 'text-zinc-400 text-lg' : 'text-zinc-500 text-base'}`}>
              {p}
            </p>
          ))}
        </motion.div>

        {cs.team.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-6">Team</p>
            <div className="flex flex-wrap gap-4">
              {cs.team.map((m, i) => <Member key={i} m={m} />)}
            </div>
          </motion.div>
        )}
      </section>

      {/* ── 7. CTA ── */}
      <section className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative z-10 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full mb-8">
            <span className="text-zinc-600 text-xs">🔒</span>
            <span className="text-zinc-500 text-xs tracking-widest uppercase">Protected</span>
          </div>
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6 whitespace-pre-line">
            {cs.cta.heading}
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mb-10 leading-relaxed">{cs.cta.body}</p>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
            className="bg-white text-black px-10 py-5 rounded-full text-base font-semibold hover:bg-zinc-100 transition-colors inline-flex items-center gap-3"
          >
            View Full Case Study
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.button>
          <p className="text-zinc-700 text-xs mt-5">Access code required</p>
        </motion.div>
      </section>

      {modalOpen && (
        <PasswordModal
          slug={slug}
          onClose={() => setModalOpen(false)}
          onSuccess={handleUnlock}
        />
      )}

    </main>
  )
}
