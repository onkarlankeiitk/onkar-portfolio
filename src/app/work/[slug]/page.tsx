'use client'

// app/work/[slug]/page.tsx

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCaseStudy } from '@/lib/case-studies'
import type { CaseStudy, ProcessStep, FindingCard, TeamMember } from '@/lib/case-studies/types'

// ─── ACCENT COLORS PER PROJECT ────────────────────────────────────────────────
// Matches the hover border colors used on the homepage cards
const accentMap: Record<string, {
  tag: string
  border: string
  text: string
  bg: string
  num: string
}> = {
  'deckup':               { tag: 'bg-blue-50 text-blue-600 border-blue-200',     border: 'border-l-blue-400',   text: 'text-blue-600',   bg: 'bg-blue-50/60',   num: 'text-blue-500' },
  'dil-kyc':              { tag: 'bg-amber-50 text-amber-700 border-amber-200',  border: 'border-l-amber-400',  text: 'text-amber-700',  bg: 'bg-amber-50/60',  num: 'text-amber-600' },
  'research-strategy':    { tag: 'bg-green-50 text-green-700 border-green-200',  border: 'border-l-green-500',  text: 'text-green-700',  bg: 'bg-green-50/60',  num: 'text-green-600' },
  'fintech-gamification': { tag: 'bg-purple-50 text-purple-600 border-purple-200', border: 'border-l-purple-400', text: 'text-purple-600', bg: 'bg-purple-50/60', num: 'text-purple-500' },
}
const defaultAccent = { tag: 'bg-zinc-100 text-zinc-600 border-zinc-200', border: 'border-l-zinc-300', text: 'text-zinc-500', bg: 'bg-zinc-50', num: 'text-zinc-400' }

// ─── IMAGE SLOT ───────────────────────────────────────────────────────────────
function ImageSlot({ alt, hint, aspect = 'aspect-video', className = '' }: {
  alt: string; hint: string; aspect?: string; className?: string
}) {
  return (
    <div className={`${aspect} ${className} w-full bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-2xl flex flex-col items-center justify-center gap-2 text-center p-6`}>
      <div className="text-3xl opacity-30">🖼</div>
      <p className="text-zinc-500 text-sm font-medium">{alt}</p>
      <p className="text-zinc-400 text-xs max-w-xs">{hint}</p>
    </div>
  )
}

// ─── BANNER SLOT — full-bleed, no padding, banner height ─────────────────────
function BannerSlot({ src, alt }: { src: string | null; alt: string }) {
  if (src) {
    return (
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="w-full overflow-hidden"
        style={{ height: 'clamp(320px, 45vw, 640px)' }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    )
  }
  return (
    <div
      className="w-full border-y-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center gap-2"
      style={{ height: 'clamp(320px, 45vw, 640px)' }}
    >
      <div className="text-4xl opacity-20">🖼</div>
      <p className="text-zinc-500 text-sm font-medium">{alt || 'Banner image'}</p>
      <p className="text-zinc-400 text-xs">Full-bleed banner — set src in data file</p>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white border border-zinc-200 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-zinc-200/80"
      >
        <div className="text-2xl mb-4">🔒</div>
        <h3 className="text-zinc-900 text-xl font-semibold mb-1">Full Case Study</h3>
        <p className="text-zinc-500 text-sm mb-6">Enter the access code to view the detailed breakdown — process, artifacts, and all deliverables.</p>
        <p className="text-zinc-400 text-xs tracking-widest uppercase mb-2">Password</p>
        <motion.input
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Enter password"
          className={`w-full bg-zinc-50 border rounded-xl px-4 py-3 text-zinc-900 text-sm outline-none mb-2 transition-colors ${
            error ? 'border-red-400' : 'border-zinc-200 focus:border-zinc-400'
          }`}
        />
        {error && <p className="text-red-500 text-xs mb-4">Incorrect password. Try again.</p>}
        {!error && <div className="mb-4" />}
        <div className="flex gap-3">
          <button onClick={attempt} className="flex-1 bg-zinc-900 text-white text-sm font-medium py-3 rounded-full hover:bg-zinc-700 transition-colors">
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

// ─── TEAM MEMBER ──────────────────────────────────────────────────────────────
function Member({ m }: { m: TeamMember }) {
  return (
    <a
      href={m.url} target="_blank" rel="noreferrer"
      className="group flex items-center gap-3 bg-white border border-zinc-200 px-5 py-3 rounded-xl hover:border-[#0A66C2] hover:bg-[#EBF3FB] transition-all duration-200"
    >
      <div className="w-9 h-9 rounded-full bg-zinc-100 group-hover:bg-[#0A66C2] flex items-center justify-center text-xs font-semibold text-zinc-500 group-hover:text-white shrink-0 transition-all duration-200">
        {m.initials}
      </div>
      <div>
        <p className="text-zinc-800 text-sm font-medium group-hover:text-[#0A66C2] transition-colors">{m.name}</p>
        <p className="text-zinc-400 text-xs">{m.role}</p>
      </div>
      <svg className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#0A66C2] ml-2 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  )
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────
function Step({ step, accent }: { step: ProcessStep; accent: typeof defaultAccent }) {
  const isLeft = step.imagePosition === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20 pb-20 border-b border-zinc-100 last:border-0 last:mb-0 last:pb-0"
    >
      <div className={isLeft ? 'order-1 md:order-2' : ''}>
        <p className={`text-xs tracking-widest uppercase mb-3 font-semibold ${accent.num}`}>{step.num}</p>
        <h3 className="text-zinc-900 font-semibold text-2xl mb-4">{step.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-5">{step.body}</p>
        {step.tags && step.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {step.tags.map(tag => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${accent.tag}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={isLeft ? 'order-2 md:order-1' : ''}>
        {step.image.src ? (
          <img src={step.image.src} alt={step.image.alt} className={`w-full rounded-2xl shadow-sm ${step.image.aspect ?? 'aspect-video'} object-cover`} />
        ) : (
          <ImageSlot alt={step.image.alt} hint={step.image.hint} aspect={step.image.aspect} />
        )}
      </div>
    </motion.div>
  )
}

// ─── FINDING CARD ─────────────────────────────────────────────────────────────
function Finding({ card, accent }: { card: FindingCard; accent: typeof defaultAccent }) {
  return (
    <div className={`bg-white border border-zinc-200 border-l-4 ${accent.border} rounded-2xl p-6 hover:shadow-sm transition-all`}>
      <p className={`text-xs tracking-widest uppercase mb-3 font-semibold ${accent.num}`}>{card.num}</p>
      <h4 className="text-zinc-900 font-semibold text-base mb-2">{card.title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CaseStudySummary() {
  const pathname = usePathname()
  const slug = pathname?.split("/").pop() ?? ""
  const cs: CaseStudy | undefined = getCaseStudy(slug)
  const [modalOpen, setModalOpen] = useState(false)
  const accent = accentMap[slug] ?? defaultAccent

  if (!cs) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Case study not found.</p>
      </main>
    )
  }

  function handleUnlock() {
    setModalOpen(false)
    window.location.href = cs!.detailPath
  }

  // Optional full-width images — add to data file as:
  // fullWidthImages: [
  //   { src: '/case-studies/your-project/overview.png', alt: 'Overview diagram' },
  //   { src: '/case-studies/your-project/metrics.png',  alt: 'Metrics dashboard' },
  //   { src: '/case-studies/your-project/process.png',  alt: 'Process overview' },
  // ]
  const fwImages = (cs as any).fullWidthImages as Array<{ src: string; alt: string }> | undefined

  return (
    <main className="bg-[#f9f9f7] min-h-screen text-zinc-900">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {cs.hero.banner ? (
          cs.hero.banner.type === 'video' ? (
            <video autoPlay muted loop playsInline poster={cs.hero.banner.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={cs.hero.banner.src!} type="video/mp4" />
            </video>
          ) : (
            <img src={cs.hero.banner.src!} alt={cs.hero.headline}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-20">🎬</div>
              <p className="text-zinc-400 text-sm">Banner / Hero video or GIF</p>
              <p className="text-zinc-300 text-xs mt-1">Set hero.banner in the data file once you have the asset</p>
            </div>
          </div>
        )}
        {/* Left-to-right gradient — fades out at 50% width, 80% opacity */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(249,249,247,0.8) 0%, transparent 50%)' }} />
        {/* Bottom overlay — fades up to 60% of banner height, 80% opacity */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(249,249,247,0.8) 0%, rgba(249,249,247,0.48) 30%, transparent 60%)' }} />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 pt-32">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-zinc-400 text-xs mb-8"
          >
            <Link href="/#work" className="hover:text-zinc-600 transition-colors">Work</Link>
            <span>/</span>
            <span className="text-zinc-500">{cs.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {cs.tags.map(tag => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${accent.tag}`}>{tag}</span>
            ))}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-zinc-900 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            {cs.hero.headline}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-500 text-xl md:text-2xl font-light max-w-2xl mb-10"
          >
            {cs.hero.subline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: 'Client',   value: cs.client },
              { label: 'My Role',  value: cs.role },
              { label: 'Timeline', value: cs.timeline },
              { label: 'Year',     value: cs.year },
            ].map(m => (
              <div key={m.label} className="bg-white/80 backdrop-blur-sm border border-zinc-200 px-4 py-2 rounded-xl">
                <p className="text-zinc-400 text-xs">{m.label}</p>
                <p className="text-zinc-800 text-sm font-medium">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8 md:right-16 lg:right-24 text-zinc-400 text-xs tracking-widest uppercase flex items-center gap-2"
        >
          Scroll
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.div>
        </motion.div>
      </section>

      {/* ── 2. OVERVIEW + TEAM (team pulled up here) ── */}
      <section className="px-8 md:px-16 lg:px-24 py-20 border-t border-zinc-200 bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14">
            {[
              { label: 'Context',                                text: cs.overview.context },
              { label: 'Problem',                                text: cs.overview.problem },
              { label: cs.overview.directionLabel ?? 'Solution', text: cs.overview.direction },
            ].map(col => (
              <div key={col.label}>
                <p className={`text-xs tracking-widest uppercase mb-3 font-semibold ${accent.text}`}>{col.label}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{col.text}</p>
              </div>
            ))}
          </div>

          {/* ── TEAM — just below context ── */}
          {cs.team.length > 0 && (
            <div className="pt-10 border-t border-zinc-100">
              <p className="text-zinc-400 text-xs tracking-widest uppercase mb-5">Team</p>
              <div className="flex flex-wrap gap-3">
                {cs.team.map((m, i) => <Member key={i} m={m} />)}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── FULL-WIDTH IMAGE SLOT 1 — after overview ── */}
      {/* Add to data file: fullWidthImages: [{ src: '/path/to/image.png', alt: 'Description' }] */}
      {fwImages?.[0] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="px-8 md:px-16 lg:px-24 py-6 bg-white"
        >
          <img src={fwImages[0].src} alt={fwImages[0].alt} className="w-full rounded-2xl shadow-sm object-cover" />
        </motion.div>
      )}

      {/* ── 3. METRICS ── */}
      <section className={`px-8 md:px-16 lg:px-24 py-20 border-t border-zinc-200 ${accent.bg}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className={`text-xs tracking-widest uppercase mb-2 font-semibold ${accent.text}`}>Results</p>
          <h2 className="text-zinc-900 text-3xl md:text-4xl font-bold">Impact</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {cs.metrics.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`text-4xl md:text-5xl font-bold tracking-tight ${accent.text}`}>{m.value}</div>
              <div className="text-zinc-600 text-sm mt-1">{m.label}</div>
              {m.sub && <div className="text-zinc-400 text-xs mt-0.5">{m.sub}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE SLOT 2 — after metrics ── */}
      {fwImages?.[1] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="px-8 md:px-16 lg:px-24 py-6"
        >
          <img src={fwImages[1].src} alt={fwImages[1].alt} className="w-full rounded-2xl shadow-sm object-cover" />
        </motion.div>
      )}

      {/* ── 4. PROCESS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-200 bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className={`text-xs tracking-widest uppercase mb-3 font-semibold ${accent.text}`}>Process</p>
          <h2 className="text-zinc-900 text-3xl md:text-4xl font-bold">{cs.processIntro ?? 'How we got there'}</h2>
        </motion.div>
        {cs.process.map((step, i) => (
          <React.Fragment key={i}>
            <Step step={step} accent={accent} />
            {i === 1 && cs.process.length > 2 && (
              <div className="-mx-8 md:-mx-16 lg:-mx-24 mb-20">
                <BannerSlot
                  src={cs.processMidBanner?.src ?? null}
                  alt={cs.processMidBanner?.alt ?? 'Process mid-point banner'}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* ── FULL-WIDTH IMAGE SLOT 3 — after process (legacy fwImages) ── */}
      {fwImages?.[2] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="px-8 md:px-16 lg:px-24 py-6 bg-white"
        >
          <img src={fwImages[2].src} alt={fwImages[2].alt} className="w-full rounded-2xl shadow-sm object-cover" />
        </motion.div>
      )}

      {/* ── BANNER BEFORE FINDINGS — full-bleed ── */}
      {cs.findings.length > 0 && (
        <BannerSlot
          src={cs.preFindingsBanner?.src ?? null}
          alt={cs.preFindingsBanner?.alt ?? 'Key findings banner'}
        />
      )}

      {/* ── 5. FINDINGS ── */}
      {cs.findings.length > 0 && (
        <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-200 bg-[#f9f9f7]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className={`text-xs tracking-widest uppercase mb-3 font-semibold ${accent.text}`}>Key Findings</p>
            <h2 className="text-zinc-900 text-3xl md:text-4xl font-bold">What we found</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cs.findings.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Finding card={card} accent={accent} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── FULL-WIDTH IMAGE SLOT 4 — after findings ── */}
      {fwImages?.[3] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="px-8 md:px-16 lg:px-24 py-6"
        >
          <img src={fwImages[3].src} alt={fwImages[3].alt} className="w-full rounded-2xl shadow-sm object-cover" />
        </motion.div>
      )}

      {/* ── 6. CONCLUSION ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-200 bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className={`text-xs tracking-widest uppercase mb-4 font-semibold ${accent.text}`}>Conclusion</p>
          <h2 className="text-zinc-900 text-3xl md:text-4xl font-bold mb-6">{cs.conclusion.heading}</h2>
          {cs.conclusion.paragraphs.map((p, i) => (
            <p key={i} className={`leading-relaxed mb-6 last:mb-0 ${i === 0 ? 'text-zinc-600 text-lg' : 'text-zinc-500 text-base'}`}>
              {p}
            </p>
          ))}
        </motion.div>
      </section>

      {/* ── 7. CTA — headline + button only, no paragraph ── */}
      <section className={`px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-200 ${accent.bg}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full mb-8 ${accent.tag}`}>
            <span className="text-xs">🔒</span>
            <span className={`text-xs tracking-widest uppercase font-semibold`}>Protected</span>
          </div>

          <h2 className="text-zinc-900 text-4xl md:text-6xl font-bold tracking-tight leading-none mb-10 whitespace-pre-line">
            {cs.cta.heading}
          </h2>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
            className="bg-zinc-900 text-white px-10 py-5 rounded-full text-base font-semibold hover:bg-zinc-700 transition-colors inline-flex items-center gap-3"
          >
            View Full Case Study
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.button>
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
