'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects, archProjects, getArticleThumbnail, ARTICLE_QUADRANT_POS } from '@/lib/portfolio-data'
import type { Project } from '@/lib/portfolio-data'

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

// ─── Flip card — matches landing page 16:9 layout ──────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      style={{ perspective: '1200px', cursor: 'pointer', height: '100%' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Link href={project.directPath} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', height: '100%' }}
        >
          {/* FRONT — fills grid cell height */}
          <div
            style={{
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              background: '#111',
              borderRadius: '12px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', height: '100%',
            }}
          >
            {/* Banner — 16:9 */}
            <div style={{ width: '100%', aspectRatio: '16/9', flexShrink: 0, overflow: 'hidden', background: '#111' }}>
              {project.banner
                ? <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
                : <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(135deg, #1a1a1a 0 8px, transparent 8px 16px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: T.mono, fontSize: '11px', color: '#3f3f46', textAlign: 'center', padding: '0 24px' }}>{`// ${project.slug}`}</span>
                  </div>
              }
            </div>
            {/* Content strip */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ background: '#27272a', color: '#a1a1aa', fontFamily: T.mono, fontSize: '9px', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '9999px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{ color: '#f4f4f5', fontSize: '13px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
                  {project.title}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: T.mono, fontSize: '10px', color: '#52525b', letterSpacing: '0.05em' }}>{project.year}</span>
                <span style={{ color: '#52525b', fontSize: '16px' }}>→</span>
              </div>
            </div>
          </div>

          {/* BACK — absolutely fills the front face */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: '#f4f4f5',
              borderRadius: '12px', padding: '20px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontFamily: T.mono, fontSize: '10px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {project.company}
              </p>
              <p style={{ color: '#0B0B0B', fontSize: '13px', lineHeight: 1.6, margin: 0, fontFamily: T.sans }}>
                {project.description}
              </p>
            </div>
            {/* Metrics */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {project.metrics.map(m => (
                <div key={m.l}>
                  <p style={{ color: '#0B0B0B', fontSize: '26px', fontWeight: 600, lineHeight: 1, margin: 0, fontFamily: T.sans }}>{m.v}</p>
                  <p style={{ color: '#71717a', fontSize: '11px', margin: '4px 0 0', fontFamily: T.mono }}>{m.l}</p>
                </div>
              ))}
            </div>
            {/* Tags + arrow */}
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
        </motion.div>
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

// ─── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ kicker, title, index }: { kicker: string; title: string; index: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      borderBottom: `1px solid ${T.rule}`, paddingBottom: '20px', marginBottom: '40px',
    }}>
      <div>
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          {kicker}
        </p>
        <h2 style={{ fontFamily: T.sans, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
          {title}
        </h2>
      </div>
      <span style={{ fontFamily: T.mono, fontSize: '32px', fontWeight: 500, color: T.rule, letterSpacing: '-0.03em' }}>
        {index}
      </span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => setArticles(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => {})
  }, [])

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
        .digital-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

        @media (max-width: 1024px) {
          .pnav { padding: 0 32px; }
          .proj-section { padding: 0 32px 64px; }
          .arch-card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pnav { padding: 0 20px; }
          .proj-section { padding: 0 20px 48px; }
          .arch-card-grid { grid-template-columns: 1fr; }
          .digital-grid { grid-template-columns: 1fr; }
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

      {/* ── 01 Articles ── */}
      <section className="proj-section" style={{ paddingTop: '64px' }}>
        <SectionHeader kicker="Writing" title="Articles & Essays" index="01/" />
        {articles.length === 0 ? (
          <div className="articles-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px 24px', border: `1px solid ${T.rule}`, borderRadius: '4px', background: '#ffffff', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '80px', height: '60px', borderRadius: '4px', ...stripedLight }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '10px', background: T.ruleSoft, borderRadius: '2px', width: '40%', marginBottom: '10px' }} />
                  <div style={{ height: '14px', background: T.ruleSoft, borderRadius: '2px', width: '80%', marginBottom: '6px' }} />
                  <div style={{ height: '14px', background: T.ruleSoft, borderRadius: '2px', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((a, i) => (
              <ArticleCard key={i} article={a} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${T.rule}`, margin: '0 64px 64px' }} />

      {/* ── 02 Digital Design ── */}
      <section className="proj-section">
        <SectionHeader kicker="Product & UX" title="Digital Design" index="02/" />
        <div className="digital-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
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
      <footer style={{ borderTop: `1px solid ${T.rule}`, padding: '28px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.paper, flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: T.mono, fontSize: '12px', color: T.inkMute }}>© {new Date().getFullYear()} Onkar Lanke</span>
        <nav style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Home'], ['/#work', 'Work'], ['/#about', 'About'], ['/#contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontFamily: T.mono, fontSize: '12px', color: T.inkMute, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.ink)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = T.inkMute)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </footer>
    </>
  )
}
