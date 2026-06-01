'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { researchStrategy as cs } from '@/lib/case-studies/research-strategy'
import Nav from '@/components/Nav'

// ─── Design tokens (mirrors landing page) ─────────────────────────────────────
const T = {
  paper:    '#F4F2EC',
  ink:      '#0B0B0B',
  inkMute:  '#8A8A85',
  rule:     '#D9D6CE',
  ruleSoft: '#E8E5DD',
  dark:     '#0A0A0A',
  sans:     '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
  mono:     '"JetBrains Mono", ui-monospace, monospace',
}

const ease = [0.22, 1, 0.36, 1] as const

const stripedDark = {
  background: 'repeating-linear-gradient(135deg, #1a1a1a 0 8px, transparent 8px 16px)',
}

const stripedLight = {
  background: `repeating-linear-gradient(135deg, #E8E5DD 0 12px, transparent 12px 24px), ${T.paper}`,
}

// ─── Registration mark ─────────────────────────────────────────────────────────
function RegMark({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="10" y1="0" x2="10" y2="20" stroke={T.rule} strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke={T.rule} strokeWidth="1" />
        <circle cx="10" cy="10" r="3" stroke={T.rule} strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}

// ─── Mono label ────────────────────────────────────────────────────────────────
function MonoLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontFamily: T.sans,
      fontSize: '11px',
      color: light ? '#52525b' : T.inkMute,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      margin: '0 0 12px',
    }}>
      {children}
    </p>
  )
}

// ─── Image / placeholder ───────────────────────────────────────────────────────
function StepImage({ src, alt, aspect = '16/9', dark = false }: {
  src: string | null; alt: string; aspect?: string; dark?: boolean
}) {
  if (src) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease }}
        style={{ aspectRatio: aspect, width: '100%', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${dark ? '#1a1a1a' : T.rule}` }}
      >
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease }}
      style={{
        aspectRatio: aspect, width: '100%', borderRadius: '10px',
        border: `1px solid ${dark ? '#1a1a1a' : T.rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...(dark ? stripedDark : stripedLight),
      }}
    >
      <p style={{ fontFamily: T.sans, fontSize: '10px', color: dark ? '#3f3f46' : T.inkMute, letterSpacing: '0.05em', margin: 0 }}>
        {alt}
      </p>
    </motion.div>
  )
}

function BannerImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}
      style={{ width: '100%', overflow: 'hidden', height: 'clamp(240px, 38vw, 520px)' }}
    >
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </motion.div>
  )
}

// ─── Password modal — landing page dark style ──────────────────────────────────
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
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        style={{
          background: '#111', border: '1px solid #27272a', borderRadius: '16px',
          padding: '36px', width: '100%', maxWidth: '380px',
        }}
      >
        <div style={{ fontFamily: T.sans, fontSize: '10px', color: '#52525b', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Full Case Study
        </div>
        <h3 style={{ fontFamily: T.sans, fontSize: '20px', fontWeight: 500, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Access required
        </h3>
        <p style={{ fontFamily: T.sans, fontSize: '13px', color: '#71717a', margin: '0 0 24px', lineHeight: 1.6 }}>
          Enter the access code to view the full process, research artifacts, and all deliverables.
        </p>
        <motion.input
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          type="password" value={value}
          onChange={e => { setValue(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Enter password" autoFocus
          style={{
            width: '100%', boxSizing: 'border-box',
            background: '#1a1a1a', border: `1px solid ${error ? '#ef4444' : '#27272a'}`,
            borderRadius: '8px', padding: '12px 16px',
            fontFamily: T.sans, fontSize: '13px', color: '#ffffff',
            outline: 'none', marginBottom: error ? '8px' : '20px',
          }}
        />
        {error && (
          <p style={{ fontFamily: T.sans, fontSize: '10px', color: '#ef4444', margin: '0 0 16px', letterSpacing: '0.05em' }}>
            Incorrect password — try again
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={attempt}
            style={{
              flex: 1, padding: '12px', borderRadius: '9999px',
              background: T.ink, color: '#fff', border: 'none',
              fontFamily: T.sans, fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            Unlock →
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 20px', borderRadius: '9999px',
              background: 'transparent', color: '#71717a',
              border: '1px solid #27272a',
              fontFamily: T.sans, fontSize: '13px', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Tag pill ──────────────────────────────────────────────────────────────────
function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span style={{
      fontFamily: T.sans, fontSize: '9px', letterSpacing: '0.05em',
      color: dark ? '#a1a1aa' : T.inkMute,
      background: dark ? '#1a1a1a' : T.ruleSoft,
      border: `1px solid ${dark ? '#27272a' : T.rule}`,
      padding: '4px 10px', borderRadius: '9999px',
    }}>
      {children}
    </span>
  )
}

// ─── Section chrome header (mirrors landing page section headers) ───────────────
function SectionChrome({ label, heading, index, light }: { label: string; heading: string; index: string; light?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      borderBottom: `1px solid ${light ? T.rule : '#1a1a1a'}`,
      paddingBottom: '24px', marginBottom: '48px',
    }}>
      <div>
        <MonoLabel light={!light}>{label}</MonoLabel>
        <h2 style={{
          fontFamily: T.sans,
          fontSize: 'clamp(24px, 3vw, 40px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          color: light ? T.ink : '#ffffff',
          margin: 0,
        }}>
          {heading}
        </h2>
      </div>
      <span style={{ fontFamily: T.sans, fontSize: '40px', fontWeight: 500, color: light ? T.rule : '#1a1a1a', letterSpacing: '-0.03em', flexShrink: 0 }}>
        {index}
      </span>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ResearchStrategySummary() {
  const [modalOpen, setModalOpen] = useState(false)
  function handleUnlock() { setModalOpen(false); window.location.href = cs.detailPath }

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <AnimatePresence>
        {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} onSuccess={handleUnlock} />}
      </AnimatePresence>

      <main style={{ background: T.dark, fontFamily: T.sans }}>
        <Nav />

        {/* ══════════════════════════════════════════════════════
            HERO — dark, registration marks
        ══════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          background: T.dark,
          padding: '80px 64px 0',
          overflow: 'hidden',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }} className="rs-hero">
          {/* Ghost word */}
          <div aria-hidden style={{
            position: 'absolute', bottom: '-20px', right: '-16px',
            fontSize: 'clamp(80px, 12vw, 180px)', fontWeight: 500,
            letterSpacing: '-0.04em', color: '#111', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            Research
          </div>

          {/* Registration marks */}
          <RegMark style={{ top: '90px', left: '32px' }} />
          <RegMark style={{ top: '90px', right: '32px' }} />

          {/* Back link */}
          <div style={{ position: 'absolute', top: '90px', left: '64px', zIndex: 1 }}>
            <Link href="/#work" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: T.sans, fontSize: '11px', color: '#52525b',
              textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to work
            </Link>
          </div>

          {/* Tags row */}
          <div style={{ position: 'absolute', top: '90px', right: '64px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end', zIndex: 1 }}>
            {cs.tags.map(t => <Tag key={t} dark>{t}</Tag>)}
          </div>

          {/* Headline block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ position: 'relative', zIndex: 1, paddingBottom: '40px' }}
          >
            <p style={{ fontFamily: T.sans, fontSize: '11px', color: '#52525b', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              {cs.client} · {cs.year}
            </p>
            <h1 style={{
              fontSize: 'clamp(42px, 7vw, 96px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 0.95,
              color: '#ffffff',
              margin: '0 0 24px',
              maxWidth: '16ch',
            }}>
              {cs.hero.headline} —<br />
              <span style={{ color: T.inkMute }}>Research &amp; Strategy</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#71717a', maxWidth: '52ch', lineHeight: 1.6, margin: '0 0 32px' }}>
              {cs.hero.subline}
            </p>
          </motion.div>

          {/* Banner — full width, below headline */}
          {cs.hero.banner && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: 'calc(100% + 128px)', marginLeft: '-64px', aspectRatio: '16/9', overflow: 'hidden', borderTop: '1px solid #1a1a1a', position: 'relative', zIndex: 1 }}
            >
              {cs.hero.banner.type === 'video' ? (
                <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src={cs.hero.banner.src!} type="video/mp4" />
                </video>
              ) : (
                <img src={cs.hero.banner.src!} alt={cs.hero.headline} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              )}
            </motion.div>
          )}
        </section>

        {/* Meta strip */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0',
          borderBottom: '1px solid #1a1a1a',
          background: T.dark,
          position: 'relative', zIndex: 1,
        }} className="rs-meta">
          {[
            { label: 'Client',   value: cs.client },
            { label: 'Role',     value: cs.role },
            { label: 'Timeline', value: cs.timeline },
            { label: 'Year',     value: cs.year },
          ].map((m, i, arr) => (
            <div key={m.label} style={{
              flex: '1 1 160px',
              padding: '20px 32px',
              borderRight: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none',
            }}>
              <p style={{ fontFamily: T.sans, fontSize: '10px', color: '#52525b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                {m.label}
              </p>
              <p style={{ fontFamily: T.sans, fontSize: '13px', fontWeight: 500, color: '#d4d4d8', margin: 0 }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            OVERVIEW — paper bg
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: T.paper, padding: '64px 64px', position: 'relative' }} className="rs-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>

            <SectionChrome label="Overview" heading={cs.title} index="01/" light />

            {/* 3-col context / problem / solution */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', marginBottom: '56px', border: `1px solid ${T.rule}`, borderRadius: '12px', overflow: 'hidden' }} className="rs-3col">
              {[
                { head: 'Context',  body: cs.overview.context },
                { head: 'Problem',  body: cs.overview.problem },
                { head: cs.overview.directionLabel ?? 'Solution', body: cs.overview.direction },
              ].map((col, i, arr) => (
                <div key={col.head} style={{
                  padding: '28px 28px',
                  borderRight: i < arr.length - 1 ? `1px solid ${T.rule}` : 'none',
                  background: T.paper,
                }}>
                  <p style={{ fontFamily: T.sans, fontSize: '10px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                    {col.head}
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: '13px', color: T.ink, lineHeight: 1.65, margin: 0 }}>
                    {col.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: T.rule, borderRadius: '12px', overflow: 'hidden' }} className="rs-metrics">
              {cs.metrics.map(m => (
                <div key={m.label} style={{ background: T.paper, padding: '28px 24px' }}>
                  <p style={{ fontFamily: T.sans, fontSize: 'clamp(32px, 3vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', color: T.ink, margin: '0 0 4px', lineHeight: 1 }}>
                    {m.value}
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: '13px', fontWeight: 500, color: T.ink, margin: '0 0 2px' }}>
                    {m.label}
                  </p>
                  {m.sub && <p style={{ fontFamily: T.sans, fontSize: '10px', color: T.inkMute, margin: 0, letterSpacing: '0.04em' }}>{m.sub}</p>}
                </div>
              ))}
            </div>

          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROCESS — dark
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: T.dark, padding: '64px 64px', position: 'relative' }} className="rs-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>

            <SectionChrome label="Process" heading={cs.processIntro ?? 'How we got there'} index="02/" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {cs.process.map((step, i) => {
                const isLeft = step.imagePosition === 'left'
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}
                    className="rs-step"
                  >
                    <div style={{ order: isLeft ? 2 : 1 }}>
                      <p style={{ fontFamily: T.sans, fontSize: '10px', color: '#52525b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                        {step.num}
                      </p>
                      <h3 style={{ fontFamily: T.sans, fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 500, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 16px', lineHeight: 1.15 }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: T.sans, fontSize: '14px', color: '#71717a', lineHeight: 1.65, margin: '0 0 20px' }}>
                        {step.body}
                      </p>
                      {step.tags && step.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {step.tags.map(tag => <Tag key={tag} dark>{tag}</Tag>)}
                        </div>
                      )}
                    </div>
                    <div style={{ order: isLeft ? 1 : 2 }}>
                      <StepImage src={step.image.src} alt={step.image.alt} aspect={step.image.aspect?.replace('aspect-[', '').replace(']', '') ?? '16/9'} dark />
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

        {/* ══════════════════════════════════════════════════════
            FINDINGS — paper bg
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: T.paper, padding: '64px 64px', position: 'relative' }} className="rs-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>

            <SectionChrome label="Key Findings" heading="What the research surfaced" index="03/" light />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="rs-3col">
              {cs.findings.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease }}
                  style={{
                    border: `1px solid ${T.rule}`,
                    borderLeft: `3px solid ${T.ink}`,
                    borderRadius: '10px',
                    padding: '24px',
                    background: T.paper,
                  }}
                >
                  <p style={{ fontFamily: T.sans, fontSize: '10px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                    {f.num}
                  </p>
                  <h4 style={{ fontFamily: T.sans, fontSize: '15px', fontWeight: 500, color: T.ink, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                    {f.title}
                  </h4>
                  <p style={{ fontFamily: T.sans, fontSize: '13px', color: T.inkMute, lineHeight: 1.65, margin: 0 }}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </section>

        {/* Pre-conclusion banner */}
        {cs.preConclusionBanner && <BannerImage src={cs.preConclusionBanner.src} alt={cs.preConclusionBanner.alt} />}

        {/* ══════════════════════════════════════════════════════
            CONCLUSION — dark
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: T.dark, padding: '64px 64px', position: 'relative' }} className="rs-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>

            <SectionChrome label={cs.conclusion.heading} heading="Learnings & Reflections" index="04/" />

            <div style={{ maxWidth: '64ch', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cs.conclusion.paragraphs.map((p, i) => (
                <p key={i} style={{
                  fontFamily: T.sans,
                  fontSize: i === 0 ? '17px' : '14px',
                  color: i === 0 ? '#d4d4d8' : '#71717a',
                  lineHeight: 1.7,
                  margin: 0,
                  borderLeft: i === 0 ? '2px solid #27272a' : 'none',
                  paddingLeft: i === 0 ? '20px' : '0',
                }}>
                  {p}
                </p>
              ))}
            </div>

          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TEAM — paper bg
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: T.paper, padding: '48px 64px', borderTop: `1px solid ${T.rule}`, position: 'relative' }} className="rs-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <MonoLabel>Team</MonoLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {cs.team.map(m => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA — dark, matches landing page footer feel
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: T.dark, padding: '80px 64px',
          borderTop: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden',
        }} className="rs-section">
          {/* Ghost word */}
          <div aria-hidden style={{
            position: 'absolute', bottom: '-16px', right: '-8px',
            fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 500,
            letterSpacing: '-0.04em', color: '#111', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            Full Study
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', zIndex: 1 }}
            className="rs-cta-inner"
          >
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontFamily: T.sans, fontSize: '11px', color: '#52525b', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px' }}>
                {cs.client} · Full Case Study
              </p>
              <h2 style={{
                fontFamily: T.sans,
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                lineHeight: 1.0,
                color: '#ffffff',
                margin: '0 0 16px',
                whiteSpace: 'pre-line',
              }}>
                {cs.cta.heading}
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: '15px', color: '#52525b', maxWidth: '52ch', lineHeight: 1.6, margin: 0 }}>
                {cs.cta.body}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <CTAButton onClick={() => setModalOpen(true)} filled label="View full case study" />
              <CTAButton href="/#work" filled={false} label="Back to all work" />
            </div>
          </motion.div>
        </section>

      </main>

      <style>{`
        @media (max-width: 768px) {
          .rs-hero { padding: 80px 24px 0 !important; }
          .rs-section { padding: 48px 24px !important; }
          .rs-meta > div { border-right: none !important; border-bottom: 1px solid #1a1a1a; }
          .rs-3col { grid-template-columns: 1fr !important; }
          .rs-3col > div { border-right: none !important; border-bottom: 1px solid #D9D6CE; }
          .rs-3col > div:last-child { border-bottom: none; }
          .rs-metrics { grid-template-columns: repeat(2,1fr) !important; }
          .rs-step { grid-template-columns: 1fr !important; }
          .rs-step > div { order: unset !important; }
          .rs-cta-inner { flex-direction: column !important; }
        }
      `}</style>
    </>
  )
}

// ─── Team card ─────────────────────────────────────────────────────────────────
function TeamCard({ member }: { member: { initials: string; name: string; role: string; url: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={member.url} target="_blank" rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: hovered ? T.ink : T.paper,
        border: `1px solid ${hovered ? T.ink : T.rule}`,
        padding: '12px 20px', borderRadius: '10px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
        background: hovered ? '#fff' : T.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.sans, fontSize: '11px', fontWeight: 500,
        color: hovered ? T.ink : '#fff',
        transition: 'all 0.2s',
      }}>
        {member.initials}
      </div>
      <div>
        <p style={{ fontFamily: T.sans, fontSize: '13px', fontWeight: 500, color: hovered ? '#fff' : T.ink, margin: '0 0 2px', transition: 'color 0.2s' }}>
          {member.name}
        </p>
        <p style={{ fontFamily: T.sans, fontSize: '10px', color: hovered ? '#a1a1aa' : T.inkMute, margin: 0, letterSpacing: '0.04em', transition: 'color 0.2s' }}>
          {member.role}
        </p>
      </div>
    </a>
  )
}

// ─── CTA button (mirrors landing page HeroCTA) ─────────────────────────────────
function CTAButton({ onClick, href, filled, label }: { onClick?: () => void; href?: string; filled: boolean; label: string }) {
  const [hovered, setHovered] = useState(false)
  const style: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    background: filled ? '#ffffff' : 'transparent',
    color: filled ? T.ink : '#71717a',
    fontFamily: T.sans, fontSize: '15px', fontWeight: 500,
    padding: filled ? '14px 28px' : '13px 28px',
    borderRadius: '9999px', textDecoration: 'none', cursor: 'pointer',
    border: filled ? 'none' : `1.5px solid ${hovered ? '#52525b' : '#27272a'}`,
    opacity: hovered && filled ? 0.85 : 1,
    transition: 'opacity 0.2s, border-color 0.2s',
  }
  const arrow = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)', flexShrink: 0 }}>
      <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="8,2 13,7 8,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (href) return (
    <Link href={href} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {label}{arrow}
    </Link>
  )
  return (
    <button onClick={onClick} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {label}{arrow}
    </button>
  )
}
