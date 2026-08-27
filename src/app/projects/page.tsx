'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects, archProjects, getArticleThumbnail, ARTICLE_QUADRANT_POS } from '@/lib/portfolio-data'
import type { Project } from '@/lib/portfolio-data'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  paper: '#F4F2EC',
  ink: '#0B0B0B',
  inkMute: '#8A8A85',
  rule: '#D9D6CE',
  ruleSoft: '#E8E5DD',
  dark: '#0A0A0A',
  sans: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
  mono: "'Space Mono', monospace",
}
const ease = [0.22, 1, 0.36, 1] as const

const stripedLight = {
  background: `repeating-linear-gradient(135deg, #E8E5DD 0 12px, transparent 12px 24px), ${T.paper}`,
  border: `1px solid ${T.rule}`,
} as const

// ─── Bento case study grid ────────────────────────────────────────────────────
const BC = {
  bg: '#F4F2EC',
  border: '#E0DDD6',
  ink: '#0B0B0B',
  mute: '#8A8A85',
  orange: '#FF4A1C',
  divider: '#D9D6CE',
}

// Shared resting meta block (metrics shown on hover only)
function BentoMeta({ project }: { project: Project }) {
  return (
    <div style={{ flexShrink: 0, paddingTop: '2px' }}>
      <p style={{ fontFamily: T.mono, fontSize: '9px', color: BC.mute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>
        {project.company} · {project.year}
      </p>
      <p style={{ fontFamily: T.sans, fontSize: '18px', fontWeight: 500, color: BC.ink, lineHeight: 1.35, margin: 0, letterSpacing: '-0.02em' }}>
        {project.title}
      </p>
    </div>
  )
}

// Hover overlay — description + metrics + tags, fades in over the card
function BentoOverlay({ project, visible }: { project: Project; visible: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(244, 242, 236, 0.92)',
      backdropFilter: 'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      padding: '22px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '9px', color: BC.mute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            {project.company}
          </p>
          <p style={{ fontFamily: T.sans, fontSize: '15px', color: BC.ink, lineHeight: 1.6, margin: 0, letterSpacing: '-0.01em' }}>
            {project.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {project.metrics.map(m => (
            <div key={m.l}>
              <p style={{ fontFamily: T.sans, fontSize: '26px', fontWeight: 600, color: BC.orange, margin: 0, lineHeight: 1, letterSpacing: '-0.04em' }}>{m.v}</p>
              <p style={{ fontFamily: T.mono, fontSize: '10px', color: BC.mute, margin: '4px 0 0', letterSpacing: '0.06em' }}>{m.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: T.mono, fontSize: '9px', color: BC.mute, background: BC.border, padding: '3px 8px', borderRadius: '9999px', letterSpacing: '0.04em' }}>
              {tag}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: T.sans, fontSize: '18px', color: BC.ink, flexShrink: 0, marginLeft: '8px' }}>→</span>
      </div>
    </div>
  )
}

// Cell 1: tall card — image top (inset), text bottom (col 1, rows 1–2)
function BentoTall({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={project.directPath} className="bento-cell-tall"
      style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '14px', background: BC.bg, border: `1px solid ${BC.border}`, borderRadius: '14px', textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', minHeight: 0 }}>
        <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
      </div>
      <BentoMeta project={project} />
      <BentoOverlay project={project} visible={hovered} />
    </Link>
  )
}

// Cell 2: wide split — text left, image right inset (cols 2–3, row 1)
function BentoWide({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={project.directPath} className="bento-cell-wide"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', background: BC.bg, border: `1px solid ${BC.border}`, borderRadius: '14px', overflow: 'hidden', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {/* Left: text panel */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${BC.divider}` }}>
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '9px', color: BC.mute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>{project.company}</p>
          <p style={{ fontFamily: T.sans, fontSize: '18px', fontWeight: 500, color: BC.ink, lineHeight: 1.35, margin: 0, letterSpacing: '-0.02em' }}>{project.title}</p>
        </div>
        <span style={{ fontFamily: T.mono, fontSize: '10px', color: hovered ? BC.ink : BC.mute, transition: 'color 0.2s', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          View case study →
        </span>
      </div>
      {/* Right: image inset */}
      <div style={{ padding: '14px' }}>
        <div style={{ height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
        </div>
      </div>
      <BentoOverlay project={project} visible={hovered} />
    </Link>
  )
}

// Cells 3 & 4: square cards — image top (inset), text + metrics below
function BentoSquare({ project, className }: { project: Project; className: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={project.directPath} className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '14px', background: BC.bg, border: `1px solid ${BC.border}`, borderRadius: '14px', textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', minHeight: 0 }}>
        <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
      </div>
      <BentoMeta project={project} />
      <BentoOverlay project={project} visible={hovered} />
    </Link>
  )
}

// ─── Article card (fetched from Medium API) ────────────────────────────────────
type Article = { title: string; link: string; pubDate: string; tags?: string[]; publication?: string }

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const date = new Date(article.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const thumbnail = getArticleThumbnail(article.title)
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease }}
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px 24px',
        border: `1px solid ${T.rule}`,
        borderRadius: '4px',
        textDecoration: 'none',
        background: '#ffffff',
        transition: 'border-color 0.2s',
        alignItems: 'flex-start',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = T.ink)}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = T.rule)}
    >
      {/* Article thumbnail */}
      <div
        style={{
          flexShrink: 0,
          width: '80px',
          height: '60px',
          borderRadius: '4px',
          overflow: 'hidden',
          ...(thumbnail
            ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { backgroundImage: 'url(/article-thumbnails.png)', backgroundSize: '200% 200%', backgroundPosition: ARTICLE_QUADRANT_POS[index % 4] }),
          border: `1px solid ${T.rule}`,
        }}
      />
      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: T.mono, fontSize: '10px', color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>
          {date}{article.publication ? ` · ${article.publication}` : ''}
        </p>
        <p style={{ fontFamily: T.sans, fontSize: '15px', fontWeight: 500, color: T.ink, lineHeight: 1.4, letterSpacing: '-0.01em', margin: '0 0 8px' }}>
          {article.title}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontFamily: T.mono, fontSize: '9px', color: T.inkMute, background: T.ruleSoft, padding: '2px 8px', borderRadius: '9999px', letterSpacing: '0.05em' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <span style={{ fontFamily: T.mono, fontSize: '14px', color: T.inkMute, flexShrink: 0, paddingTop: '2px' }}>↗</span>
    </motion.a>
  )
}

// ─── Webflow data ───────────────────────────────────────────────────────────────
const webflowSites = [
  { name: 'Reevo CRM', url: 'https://www.reevocrm.com', description: 'Salesforce Summit Partner — implementations, AI integrations & adoption.', tags: ['CRM', 'B2B'] },
  { name: 'Catalyst Healthcare', url: 'https://catalysthcc.com', description: 'Regulatory policy advancing innovative healthcare solutions.', tags: ['Healthcare', 'Consulting'] },
]

// ─── Behance data ────────────────────────────────────────────────────────────────
const behanceProjects = [
  { title: 'IndiGo Go Next Experience Design', url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design', cover: '/behance/behance-01.png', year: '2020' },
  { title: 'Designing for Last Mile Reach — Financial Inclusion', url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion', cover: '/behance/behance-02.png', year: '2020' },
  { title: 'Delivering Better Experience — A Redesign', url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN', cover: '/behance/behance-03.png', year: '2020' },
  { title: 'Icons Design Planner', url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner', cover: '/behance/behance-04.png', year: '2019' },
]

// ─── Webflow card ────────────────────────────────────────────────────────────────
function WebflowCard({ site }: { site: typeof webflowSites[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${hovered ? '#333' : '#1a1a1a'}`, transition: 'border-color 0.2s', display: 'block', textDecoration: 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <div style={{ background: '#111', borderBottom: '1px solid #1a1a1a', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '4px', padding: '3px 8px' }}>
          <span style={{ fontFamily: T.mono, fontSize: '9px', color: '#52525b', letterSpacing: '0.03em' }}>
            {site.url.replace('https://', '')}
          </span>
        </div>
      </div>
      {/* iframe preview */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#0a0a0a' }}>
        <iframe
          src={site.url}
          title={site.name}
          loading="lazy"
          style={{ width: '200%', height: '560px', border: 'none', transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)', transition: 'opacity 0.3s', opacity: hovered ? 0 : 1 }} />
      </div>
      {/* Footer strip */}
      <div style={{ padding: '10px 14px', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: T.sans, fontSize: '12px', fontWeight: 500, color: '#d4d4d8', margin: '0 0 2px' }}>{site.name}</p>
          <p style={{ fontFamily: T.sans, fontSize: '10px', color: '#52525b', margin: 0 }}>{site.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginLeft: '12px' }}>
          {site.tags.map(tag => (
            <span key={tag} style={{ fontFamily: T.mono, fontSize: '8px', color: '#52525b', border: '1px solid #27272a', padding: '2px 6px', borderRadius: '9999px' }}>{tag}</span>
          ))}
        </div>
      </div>
    </a>
  )
}

// ─── Behance card ────────────────────────────────────────────────────────────────
function BehanceCard({ project, index }: { project: typeof behanceProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease }}
      style={{ display: 'block', background: '#0A0A0A', border: `1px solid ${hovered ? '#2a2a2a' : '#1a1a1a'}`, borderRadius: '6px', overflow: 'hidden', textDecoration: 'none', transition: 'border-color 0.25s', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#111' }}>
        <img
          src={project.cover}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0.75, transition: 'opacity 0.3s', display: 'block' }}
        />
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontFamily: T.sans, fontSize: '13px', fontWeight: 500, color: hovered ? '#ffffff' : '#a1a1aa', margin: '0 0 8px', lineHeight: 1.4, transition: 'color 0.2s' }}>
          {project.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: T.mono, fontSize: '10px', color: '#3f3f46', letterSpacing: '0.04em' }}>{project.year}</span>
          <span style={{ fontFamily: T.mono, fontSize: '11px', color: '#3f3f46' }}>↗</span>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ kicker, title, index, dark = false }: { kicker: string; title: string; index: string; dark?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      borderBottom: `1px solid ${dark ? '#1a1a1a' : T.rule}`, paddingBottom: '20px', marginBottom: '40px',
    }}>
      <div>
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: dark ? '#52525b' : T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          {kicker}
        </p>
        <h2 style={{ fontFamily: T.sans, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, color: dark ? '#ffffff' : T.ink, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
          {title}
        </h2>
      </div>
      <span style={{ fontFamily: T.mono, fontSize: '32px', fontWeight: 500, color: dark ? '#1a1a1a' : T.rule, letterSpacing: '-0.03em' }}>
        {index}
      </span>
    </div>
  )
}

// ─── Back To Top ─────────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 32,
        left: 32,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        background: hovered ? T.ink : T.paper,
        border: `1.5px solid ${hovered ? T.ink : T.rule}`,
        borderRadius: 12,
        padding: '10px 14px',
        cursor: 'pointer',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.18)' : '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
      }}
      aria-label="Back to top"
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke={hovered ? T.paper : T.ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontFamily: T.mono,
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: hovered ? T.paper : T.inkMute,
        whiteSpace: 'nowrap',
        transition: 'color 0.18s ease',
      }}>
        Back to top
      </span>
    </motion.button>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.paper}; color: ${T.ink}; font-family: ${T.sans}; -webkit-font-smoothing: antialiased; }

        .proj-section { padding: 0 64px 80px; }
        .arch-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .articles-grid { display: flex; flex-direction: column; gap: 12px; }

        /* ── Bento grid ── */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 360px 320px;
          gap: 12px;
        }
        .bento-cell-tall { grid-column: 1; grid-row: 1 / 3; }
        .bento-cell-wide { grid-column: 2 / 4; grid-row: 1; }
        .bento-cell-stat { grid-column: 2; grid-row: 2; }
        .bento-cell-img  { grid-column: 3; grid-row: 2; }

        .behance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .webflow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 1024px) {
          .proj-section { padding: 0 32px 64px; }
          .arch-card-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 300px 280px 280px;
          }
          .bento-cell-tall { grid-column: 1; grid-row: 1 / 3; }
          .bento-cell-wide { grid-column: 2; grid-row: 1; }
          .bento-cell-stat { grid-column: 2; grid-row: 2; }
          .bento-cell-img  { grid-column: 1 / 3; grid-row: 3; }
          .behance-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .proj-section { padding: 0 20px 48px; }
          .arch-card-grid { grid-template-columns: 1fr; }
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 320px 300px 260px 300px;
          }
          .bento-cell-tall { grid-column: 1; grid-row: 1; }
          .bento-cell-wide { grid-column: 1; grid-row: 2; }
          .bento-cell-stat { grid-column: 1; grid-row: 3; }
          .bento-cell-img  { grid-column: 1; grid-row: 4; }
          .behance-grid { grid-template-columns: repeat(2, 1fr); }
          .webflow-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Nav />
      <BackToTop />

      {/* Page hero */}
      <section style={{ background: T.paper, padding: '140px 64px 48px', borderBottom: `1px solid ${T.rule}`, position: 'relative', overflow: 'hidden' }}>
        {/* Ghost word */}
        <div aria-hidden style={{ position: 'absolute', bottom: '-10px', right: '-10px', fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 500, letterSpacing: '-0.04em', color: T.ruleSoft, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
          Work
        </div>
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Selected Work
        </p>
        <h1 style={{ fontFamily: T.sans, fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 500, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: '20px' }}>
          All Projects
        </h1>
        <p style={{ fontFamily: T.sans, fontSize: '18px', color: T.inkMute, maxWidth: '38ch', lineHeight: 1.55 }}>
          End-to-end product design, research, and builds — from digital to physical.
        </p>
      </section>

      {/* ── 01 Digital Design ── */}
      <section className="proj-section" style={{ paddingTop: '64px', background: T.dark, borderRadius: '24px 24px 0 0' }}>
        <SectionHeader kicker="UX Case Studies" title="Digital Design" index="01/" dark />
        <div className="bento-grid">
          <BentoTall   project={projects[0]} />
          <BentoWide   project={projects[1]} />
          <BentoSquare project={projects[2]} className="bento-cell-stat" />
          <BentoSquare project={projects[3]} className="bento-cell-img" />
        </div>
      </section>

      {/* Divider */}
      {/* ── 02 Webflow builds ── */}
      <section className="proj-section" style={{ paddingTop: '64px', background: T.dark }}>
        <SectionHeader kicker="Low-code" title="Design + Webflow Builds" index="03/" dark />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {webflowSites.map((site, i) => (
            <WebflowCard key={i} site={site} />
          ))}
        </div>
      </section>

      {/* ── 04 Behance archive ── */}
      <section className="proj-section" style={{ paddingTop: '64px', background: T.dark, paddingBottom: '80px' }}>
        <SectionHeader kicker="Archive" title="Previous Work: Portfolio 2020" index="04/" dark />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {behanceProjects.map((project, i) => (
            <BehanceCard key={project.url} project={project} index={i} />
          ))}
        </div>
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <a
            href="https://www.behance.net/lankeonkar"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: T.mono, fontSize: '11px', color: '#52525b', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#52525b')}
          >
            View on Behance →
          </a>
        </div>
      </section>

      {/* TEMPORARILY HIDDEN — Beyond Pixels / Arch + Industrial section */}
      {/* Divider */}
      {/* <div style={{ borderTop: `1px solid ${T.rule}`, margin: '0 64px 64px' }} /> */}

      {/* ── 03 Arch + Industrial ── */}
      {/* <section className="proj-section">
        <SectionHeader kicker="Beyond Pixels" title="Arch + Industrial Design" index="03/" />
        <div className="arch-card-grid">
          {archProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1, ease }}
              style={{ borderRadius: '4px', overflow: 'hidden', border: `1px solid ${T.rule}` }}
            >
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', ...(!p.image ? stripedLight : {}), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.image
                  ? <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <p style={{ fontFamily: T.mono, fontSize: '10px', color: T.inkMute, margin: 0, letterSpacing: '0.04em' }}>{p.label}</p>
                }
              </div>
              <div style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: T.mono, fontSize: '9px', color: T.inkMute, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>
                    {p.tag}
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: '15px', fontWeight: 500, color: T.ink, letterSpacing: '-0.01em', margin: 0 }}>
                    {p.title}
                  </p>
                </div>
                <span style={{ fontFamily: T.mono, fontSize: '14px', color: T.inkMute }}>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, height: '100svh', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
        <Footer />
      </div>
    </>
  )
}
