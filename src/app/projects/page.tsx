'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects, archProjects, getArticleThumbnail, ARTICLE_QUADRANT_POS } from '@/lib/portfolio-data'
import type { Project } from '@/lib/portfolio-data'
import Footer from '@/components/Footer'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  paper: '#F4F2EC',
  ink: '#0B0B0B',
  inkMute: '#8A8A85',
  rule: '#D9D6CE',
  ruleSoft: '#E8E5DD',
  dark: '#0A0A0A',
  sans: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
}
const ease = [0.22, 1, 0.36, 1] as const

const stripedLight = {
  background: `repeating-linear-gradient(135deg, #E8E5DD 0 12px, transparent 12px 24px), ${T.paper}`,
  border: `1px solid ${T.rule}`,
} as const

// ─── Case study card — matches home page CaseStudyCard exactly ─────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      style={{ height: '100%' }}
    >
      <Link
        href={project.directPath}
        style={{ display: 'block', position: 'relative', perspective: '1000px', cursor: 'pointer', textDecoration: 'none', height: '100%' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '100%',
        }}>
          {/* FRONT — tall image + bottom strip */}
          <div style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}>
            {/* Image fills most of the card */}
            <div style={{ flex: 1, overflow: 'hidden', background: '#0a0a0a', minHeight: 0 }}>
              {project.banner
                ? <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
                : <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(135deg, #1a1a1a 0 8px, transparent 8px 16px)' }} />
              }
            </div>
            {/* Bottom strip — tags + title */}
            <div style={{ padding: '14px 16px', borderTop: '1px solid #1a1a1a', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ background: '#27272a', color: '#a1a1aa', fontFamily: T.mono, fontSize: '9px', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '9999px' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ color: '#f4f4f5', fontSize: '17px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
                {project.title}
              </p>
            </div>
          </div>

          {/* BACK — description + metrics */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#f4f4f5',
            border: '1px solid #e4e4e7',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontFamily: T.mono, fontSize: '10px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {project.company}
              </p>
              <p style={{ color: '#0B0B0B', fontSize: '17px', lineHeight: 1.6, margin: 0, fontFamily: T.sans }}>
                {project.description}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              {project.metrics.map(m => (
                <div key={m.l}>
                  <p style={{ color: '#0B0B0B', fontSize: '26px', fontWeight: 600, lineHeight: 1, margin: 0, fontFamily: T.sans }}>{m.v}</p>
                  <p style={{ color: '#71717a', fontSize: '11px', margin: '4px 0 0', fontFamily: T.mono }}>{m.l}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ background: '#e4e4e7', color: '#52525b', fontFamily: T.mono, fontSize: '9px', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '9999px' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <span style={{ color: '#0B0B0B', fontSize: '16px', flexShrink: 0, marginLeft: '8px' }}>→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
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

// ─── Page ────────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.paper}; color: ${T.ink}; font-family: ${T.sans}; -webkit-font-smoothing: antialiased; }

        .pnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 64px; height: 56px;
          background: rgba(244,242,236,0.92);
          border-bottom: 1px solid ${T.rule};
          backdrop-filter: blur(8px);
          font-family: ${T.sans};
        }
        .pnav a { text-decoration: none; color: ${T.ink}; }
        .pnav-links { display: flex; gap: 24px; align-items: center; }
        .pnav-links a { font-size: 14px; color: ${T.inkMute}; transition: color 0.2s; }
        .pnav-links a:hover { color: ${T.ink}; }

        .proj-section { padding: 0 64px 80px; }
        .arch-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .articles-grid { display: flex; flex-direction: column; gap: 12px; }
        .digital-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; grid-auto-rows: 552px; }

        .behance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .webflow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 1024px) {
          .pnav { padding: 0 32px; }
          .proj-section { padding: 0 32px 64px; }
          .arch-card-grid { grid-template-columns: repeat(2, 1fr); }
          .digital-grid { grid-template-columns: repeat(2, 1fr); }
          .behance-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pnav { padding: 0 20px; }
          .proj-section { padding: 0 20px 48px; }
          .arch-card-grid { grid-template-columns: 1fr; }
          .digital-grid { grid-template-columns: 1fr; grid-auto-rows: 480px; }
          .behance-grid { grid-template-columns: repeat(2, 1fr); }
          .webflow-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Nav */}
      <nav className="pnav">
        <Link href="/" style={{ fontFamily: T.sans, fontWeight: 600, fontSize: '16px', letterSpacing: '-0.02em' }}>
          Onkar Lanke
        </Link>
        <div className="pnav-links">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <a
            href="/ONKAR_LANKE.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              background: T.ink, color: '#ffffff',
              fontSize: '13px', fontWeight: 500,
              padding: '8px 18px', borderRadius: '9999px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Resume
          </a>
        </div>
      </nav>

      {/* Page hero */}
      <section style={{ background: T.paper, padding: '120px 64px 48px', borderBottom: `1px solid ${T.rule}`, position: 'relative', overflow: 'hidden' }}>
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
        <div className="digital-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
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
