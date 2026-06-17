'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projects, archProjects, getArticleThumbnail, ARTICLE_QUADRANT_POS } from '@/lib/portfolio-data'
// SVG paths inlined from simple-icons to avoid bundling the 25 MB package
const siFigma    = { path: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z' }
const siWebflow  = { path: 'm24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z' }
const siFramer   = { path: 'M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z' }
const siHotjar   = { path: 'M10.119 9.814C12.899 8.27 16.704 6.155 16.704 0h-4.609c0 3.444-1.676 4.375-4.214 5.786C5.1 7.33 1.295 9.444 1.295 15.6h4.61c0-3.444 1.676-4.376 4.214-5.786zM18.096 8.4c0 3.444-1.677 4.376-4.215 5.785-2.778 1.544-6.585 3.66-6.585 9.815h4.609c0-3.444 1.676-4.376 4.214-5.786 2.78-1.544 6.586-3.658 6.586-9.814h-4.609z' }
const siGithub   = { path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' }
const siVercel   = { path: 'm12 1.608 12 20.784H0Z' }
const siAnthropic = { path: 'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z' }

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  paper: '#F4F2EC',
  ink: '#0B0B0B',
  inkMute: '#8A8A85',
  rule: '#D9D6CE',
  ruleSoft: '#E8E5DD',
  accent: '#1E3AE8',
  dark: '#0A0A0A',
  sans: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
}

const ease = [0.22, 1, 0.36, 1] as const

// projects and archProjects are imported from @/lib/portfolio-data

// ─── Experience data ───────────────────────────────────────────────────────────
const experience = [
  { role: 'Product Designer', company: 'SlideXpress (DeckUp)', period: '2023 – 2024' },
  { role: 'UX Designer', company: 'Diamond India Ltd.', period: '2024' },
  { role: 'UX Researcher', company: 'Commongood, USA', period: '2023' },
]

// ─── Striped pattern style ─────────────────────────────────────────────────────
const stripedDark = {
  background: 'repeating-linear-gradient(135deg, #1a1a1a 0 8px, transparent 8px 16px)',
  border: '1px solid #1a1a1a',
} as const

const stripedLight = {
  background: `repeating-linear-gradient(135deg, #E8E5DD 0 12px, transparent 12px 24px), ${T.paper}`,
  border: `1px solid ${T.rule}`,
} as const

// ─── Tools Marquee ────────────────────────────────────────────────────────────
const tools = [
  { name: 'Figma',      category: 'Design',    svgPath: siFigma.path,      iconFill: '#F24E1E' },
  { name: 'Webflow',    category: 'Design',    svgPath: siWebflow.path,    iconFill: '#146EF5' },
  { name: 'Framer',     category: 'Design',    svgPath: siFramer.path,     iconFill: '#0055FF' },
  { name: 'Hotjar',     category: 'Research',  svgPath: siHotjar.path,     iconFill: '#FF3C00' },
  { name: 'Amplitude',  category: 'Analytics', svgPath: null,              iconFill: '#1271F7' },
  { name: 'GitHub',     category: 'Dev',       svgPath: siGithub.path,     iconFill: '#181717' },
  { name: 'Vercel',     category: 'Dev',       svgPath: siVercel.path,     iconFill: '#000000' },
  { name: 'Claude',     category: 'AI',        svgPath: siAnthropic.path,  iconFill: '#CC785C' },
  { name: 'VS Code',    category: 'Dev',       svgPath: null,              iconFill: '#007ACC' },
]

const fallbackImgSrc: Record<string, string> = {
  'Amplitude': '/icons/amplitude.svg',
}

const SQUIRCLE_PATH =
  'M 48 0 C 68 0 79 0 85 7 C 92 13 96 24 96 48 C 96 68 96 79 89 85 C 83 92 72 96 48 96 C 28 96 17 96 11 89 C 4 83 0 72 0 48 C 0 28 0 17 7 11 C 13 4 24 0 48 0 Z'

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group"
      style={{ position: 'relative', flexShrink: 0, width: 114, height: 114, cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: '100%', height: '100%',
          borderRadius: '36px',
          background: 'rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s ease',
        }}
      >
        {tool.name === 'VS Code' ? (
          <span style={{ fontFamily: T.mono, fontSize: '18px', fontWeight: 600, color: '#007ACC', letterSpacing: '0.02em', textAlign: 'center', lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span>VS</span><span>Code</span></span>
        ) : tool.svgPath ? (
          <svg role="img" viewBox="0 0 24 24" width={43} height={43} fill={tool.iconFill}>
            <path d={tool.svgPath} />
          </svg>
        ) : (
          <img src={fallbackImgSrc[tool.name]} alt={tool.name} width={43} height={43} />
        )}
      </div>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: '#27272a', border: '1px solid #3f3f46', borderRadius: '10px',
          padding: '6px 12px', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 30,
          pointerEvents: 'none',
        }}>
          <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600, margin: 0, fontFamily: T.sans }}>{tool.name}</p>
          <p style={{ color: '#71717a', fontSize: '10px', margin: '2px 0 0', fontFamily: T.mono }}>{tool.category}</p>
        </div>
      )}
    </motion.div>
  )
}

function ToolsMarquee() {
  const tripled = [...tools, ...tools, ...tools]
  return (
    <div style={{ position: 'relative', overflowX: 'clip', overflowY: 'visible' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: `linear-gradient(to right, ${T.paper}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: `linear-gradient(to left, ${T.paper}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
      <motion.div
        style={{ display: 'flex', gap: '20px', padding: '8px 0', width: 'max-content' }}
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {tripled.map((tool, i) => <ToolCard key={`${tool.name}-${i}`} tool={tool} />)}
      </motion.div>
    </div>
  )
}

// ─── Flip Card ─────────────────────────────────────────────────────────────────
function FlipCard({ project }: { project: typeof projects[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <Link
      href={project.directPath}
      style={{ display: 'block', position: 'relative', perspective: '1000px', cursor: 'pointer', textDecoration: 'none', height: '100%' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '100%',
        }}
      >
        {/* FRONT — fills grid cell height */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Banner — 16:9 */}
          <div style={{ width: '100%', aspectRatio: '16/9', flexShrink: 0, overflow: 'hidden', borderBottom: '1px solid #1a1a1a', background: '#111' }}>
            {project.banner
              ? <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
              : <div style={{ width: '100%', height: '100%', ...stripedDark }} />
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span style={{ color: '#52525b', fontSize: '16px' }}>→</span>
            </div>
          </div>
        </div>

        {/* BACK — absolutely fills the front face, light theme */}
        <div
          style={{
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
      </div>
    </Link>
  )
}

// getThumbnail and ARTICLE_QUADRANT_POS imported from @/lib/portfolio-data

// ─── Article skeleton ──────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px' }}>
      <div style={{ width: '80px', height: '64px', flexShrink: 0, background: '#1a1a1a', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
        <div style={{ height: '10px', background: '#1a1a1a', borderRadius: '4px', width: '40%' }} />
        <div style={{ height: '12px', background: '#1a1a1a', borderRadius: '4px', width: '90%' }} />
        <div style={{ height: '12px', background: '#1a1a1a', borderRadius: '4px', width: '70%' }} />
      </div>
    </div>
  )
}

// ─── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ article, index = 0 }: { article: { title: string; pubDate: string; link: string; tags?: string[]; publication?: string }; index?: number }) {
  const [hovered, setHovered] = useState(false)
  const date = new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  const thumbnail = getArticleThumbnail(article.title)
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        gap: '12px',
        background: hovered ? '#f4f4f5' : '#111',
        border: `1px solid ${hovered ? '#e4e4e7' : '#1a1a1a'}`,
        borderRadius: '8px',
        padding: '12px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Article thumbnail */}
      <div
        style={{
          width: '80px',
          height: '64px',
          flexShrink: 0,
          borderRadius: '6px',
          overflow: 'hidden',
          ...(thumbnail
            ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { backgroundImage: 'url(/article-thumbnails.png)', backgroundSize: '200% 200%', backgroundPosition: ARTICLE_QUADRANT_POS[index % 4] }),
          border: `1px solid ${hovered ? '#d4d4d8' : '#1a1a1a'}`,
          transition: 'border-color 0.25s ease',
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
        <p style={{ fontFamily: T.mono, fontSize: '10px', color: hovered ? '#71717a' : '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, transition: 'color 0.2s' }}>
          {date}
        </p>
        <p style={{ color: hovered ? '#0B0B0B' : '#d4d4d8', fontSize: '13px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans, transition: 'color 0.2s' }}>
          {article.title}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontFamily: T.mono, fontSize: '9px', color: hovered ? '#52525b' : '#3f3f46', letterSpacing: '0.05em', background: hovered ? '#e4e4e7' : '#1a1a1a', padding: '2px 6px', borderRadius: '9999px', transition: 'all 0.2s' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}

// ─── Column section wrapper — hover turns heading orange ─────────────────────
function ColSection({ children, borderRight }: { children: (headingColor: string) => React.ReactNode; borderRight?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="col-section"
      style={{ borderRight: borderRight ? '1px solid #1a1a1a' : 'none', padding: '24px', overflowY: 'auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children(hovered ? '#f97316' : '#52525b')}
    </div>
  )
}

// ─── Webflow site card (iframe preview) ──────────────────────────────────────
function WebflowCard({ site }: { site: { name: string; url: string; description: string; tags: string[] } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${hovered ? '#333' : '#1a1a1a'}`, transition: 'border-color 0.2s', display: 'block', textDecoration: 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <div style={{ background: '#111', borderBottom: '1px solid #1a1a1a', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        {/* URL bar */}
        <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '4px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontFamily: T.mono, fontSize: '9px', color: '#52525b', letterSpacing: '0.03em' }}>
            {site.url.replace('https://', '')}
          </span>
        </div>
        {/* External link indicator */}
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#3f3f46" strokeWidth="2" style={{ flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* iframe preview */}
      <div className="webflow-iframe-wrap" style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#0a0a0a' }}>
        <iframe
          src={site.url}
          title={site.name}
          loading="lazy"
          style={{
            width: '200%',
            height: '440px',
            border: 'none',
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        />
        {/* subtle overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)', transition: 'opacity 0.3s', opacity: hovered ? 0 : 1 }} />
      </div>

      {/* Footer strip */}
      <div style={{ padding: '10px 14px', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: T.sans, fontSize: '12px', fontWeight: 500, color: '#d4d4d8', margin: '0 0 2px', letterSpacing: '-0.01em' }}>
            {site.name}
          </p>
          <p style={{ fontFamily: T.sans, fontSize: '10px', color: '#52525b', margin: 0, lineHeight: 1.4 }}>
            {site.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginLeft: '8px' }}>
          {site.tags.map(tag => (
            <span key={tag} style={{ fontFamily: T.mono, fontSize: '9px', color: '#52525b', letterSpacing: '0.04em', background: '#1a1a1a', padding: '2px 6px', borderRadius: '9999px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

// ─── Articles column ───────────────────────────────────────────────────────────
function ArticlesColumn({ headingColor }: { headingColor: string }) {
  const [articles, setArticles] = useState<Array<{ title: string; pubDate: string; link: string; tags?: string[]; publication?: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data.slice(0, 4) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{ fontFamily: T.mono, fontSize: '11px', color: headingColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', transition: 'color 0.2s' }}>
        Medium Articles
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <ArticleSkeleton key={i} />)
        ) : articles.length > 0 ? (
          articles.map((a, i) => <ArticleCard key={i} article={a} index={i} />)
        ) : (
          // Fallback placeholder articles
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                background: '#111',
                border: '1px solid #1a1a1a',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ width: '80px', height: '64px', flexShrink: 0, borderRadius: '6px', backgroundImage: 'url(/article-thumbnails.png)', backgroundSize: '200% 200%', backgroundPosition: ARTICLE_QUADRANT_POS[i % 4], border: '1px solid #1a1a1a' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
                <p style={{ fontFamily: T.mono, fontSize: '10px', color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                  Coming soon
                </p>
                <p style={{ color: '#52525b', fontSize: '13px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
                  Article {i + 1} — Loading from Medium...
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <a
        href="https://medium.com/@onkarlanke"
        target="_blank"
        rel="noreferrer"
        style={{ fontFamily: T.mono, fontSize: '11px', color: '#52525b', textDecoration: 'none', marginTop: '16px', display: 'inline-block', transition: 'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
        onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
      >
        All articles →
      </a>
    </div>
  )
}

// ─── Typewriter headline ──────────────────────────────────────────────────────
const HEADLINE_LINES = ['Observer,', 'Tinkerer,', 'Storyteller.']

function TypewriterHeadline({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState<string[]>(['', '', ''])
  const [cursorLine, setCursorLine] = useState(0)

  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    let cancelled = false

    const type = () => {
      if (cancelled) return
      if (lineIdx >= HEADLINE_LINES.length) {
        setCursorLine(-1)
        onDone?.()
        return
      }
      const currentLine = HEADLINE_LINES[lineIdx]
      if (charIdx <= currentLine.length) {
        setDisplayed(prev => {
          const next = [...prev]
          next[lineIdx] = currentLine.slice(0, charIdx)
          return next
        })
        setCursorLine(lineIdx)
        charIdx++
        setTimeout(type, 90)
      } else {
        lineIdx++
        charIdx = 0
        setTimeout(type, 280)
      }
    }

    const delay = setTimeout(type, 400)
    return () => { cancelled = true; clearTimeout(delay) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <h1
      style={{
        fontSize: 'clamp(62px, 15vw, 128px)',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        lineHeight: 0.95,
        margin: 0,
        fontFamily: 'var(--font-script)',
        textAlign: 'center',
        color: '#2A3F5C',
      }}
    >
      {HEADLINE_LINES.map((_, i) => (
        <span key={i} style={{ display: 'block' }}>
          {displayed[i]}
          {cursorLine === i && (
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.8em',
                background: T.ink,
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'cursorBlink 0.8s step-end infinite',
              }}
            />
          )}
        </span>
      ))}
    </h1>
  )
}

// ─── Hero CTA with rotating arrow ────────────────────────────────────────────
function HeroCTA({ href, label, filled }: { href: string; label: string; filled: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: filled ? (hovered ? '#ffffff' : '#D04D1F') : 'transparent',
        color: filled ? (hovered ? '#D04D1F' : '#ffffff') : (hovered ? '#D04D1F' : T.ink),
        fontFamily: T.sans,
        fontSize: '15px',
        fontWeight: 500,
        padding: filled ? '14px 28px' : '13px 28px',
        borderRadius: '9999px',
        textDecoration: 'none',
        border: filled ? 'none' : `1.5px solid ${hovered ? '#D04D1F' : T.rule}`,
        transition: 'background 0.25s, color 0.25s, border-color 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Arrow: 45° at rest, 0° on hover */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        style={{
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
          flexShrink: 0,
        }}
      >
        <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="8,2 13,7 8,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

// ─── Corner registration mark ─────────────────────────────────────────────────
function RegMark({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="10" y1="0" x2="10" y2="20" stroke={T.rule} strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke={T.rule} strokeWidth="1" />
        <circle cx="10" cy="10" r="3" stroke={T.rule} strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}

// ─── Count-up stat ────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}


// ─── Sketch marquee (natural-ratio cards) ─────────────────────────────────────
const sketchSrcs = [
  '/sketches/sketch-01.jpg',
  '/sketches/sketch-02.jpg',
  '/sketches/sketch-03.jpg',
  '/sketches/sketch-04.webp',
  '/sketches/sketch-05.jpg',
  '/sketches/sketch-06.jpg',
  '/sketches/sketch-07.jpg',
  '/sketches/sketch-08.jpg',
]
const rotations = [-2, 1.5, -1, 2.5, -1.8, 0.8, -2.2, 1.2]

function SketchCard({ src, label, rotation }: { src: string; label: string; rotation: number }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.04 }}
      style={{
        rotate: rotation,
        flexShrink: 0,
        width: 'clamp(180px, 45vw, 260px)',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
        onError={e => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const parent = el.parentElement
          if (parent) {
            parent.style.width = '200px'
            parent.style.height = '260px'
            parent.style.backgroundImage = 'repeating-linear-gradient(135deg, #222 0 8px, transparent 8px 16px)'
          }
        }}
      />
    </motion.div>
  )
}

function SketchMarquee() {
  const doubled = [...sketchSrcs, ...sketchSrcs]
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to right, ${T.dark}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to left, ${T.dark}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

      <motion.div
        className="sketch-track"
        style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 0', width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((src, i) => (
          <SketchCard
            key={`${src}-${i}`}
            src={src}
            label={`Sketch ${(i % sketchSrcs.length) + 1}`}
            rotation={rotations[i % rotations.length]}
          />
        ))}
      </motion.div>
    </div>
  )
}

// ─── About Section ─────────────────────────────────────────────────────────────
const expData = [
  {
    role: 'Product Designer',
    company: 'SlideXpress · DeckUp',
    period: '2023 – 2024',
    description: 'Led end-to-end design of a B2B SaaS toolbar for consultants — from research to shipped product. Increased daily productivity by 45–60%.',
  },
  {
    role: 'UX Designer',
    company: 'Diamond India Ltd.',
    period: '2024',
    description: 'Digitised offline KYC and customer management workflows for a diamond trading firm, cutting onboarding from 2 weeks to 5–7 days.',
  },
  {
    role: 'UX Researcher',
    company: 'Commongood, USA',
    period: '2023',
    description: 'Delivered research-backed strategies for a US snacking brand, driving a 43% engagement lift and 11% checkout volume increase.',
  },
  {
    role: 'Interaction Designer',
    company: 'Mindseye Creative',
    period: '2023',
    description: 'Designed a gamified fintech interface inspired by board game mechanics — 85% usability score, 70% retention uplift.',
  },
]

const stats = [
  { value: 6, suffix: '+', label: 'Years designing' },
  { value: 20, suffix: '+', label: 'Products / Services' },
  { value: 5, suffix: '+', label: 'Industries' },
]

const skills = ['Product Strategy', 'Roadmapping', 'UX Research', 'Digital Design', 'Analytics', 'Resource Allocation', 'Spatial Design', 'Articulation & Storytelling', 'KPIs & Success Metrics']

// ─── Arch project card with hover state ──────────────────────────────────────
function ArchCard({ project, index }: { project: { title: string; label: string; image?: string }; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? '#333' : '#1a1a1a'}`,
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / placeholder */}
      <div
        style={{
          aspectRatio: '4/3',
          overflow: 'hidden',
          position: 'relative',
          background: hovered
            ? 'repeating-linear-gradient(135deg, #d4d4d8 0 8px, transparent 8px 16px), #f4f4f5'
            : 'repeating-linear-gradient(135deg, #1a1a1a 0 8px, transparent 8px 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s ease',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: hovered ? 1 : 0.85, transition: 'opacity 0.3s' }}
          />
        ) : (
          <p style={{ fontFamily: T.mono, fontSize: '10px', color: hovered ? '#a1a1aa' : '#3f3f46', margin: 0, letterSpacing: '0.04em', transition: 'color 0.2s' }}>
            {project.label}
          </p>
        )}
      </div>
      {/* Title strip */}
      <div style={{ padding: '14px 18px', background: hovered ? '#f4f4f5' : '#111', transition: 'background 0.25s ease' }}>
        <p style={{ fontFamily: T.sans, fontSize: '14px', fontWeight: 500, color: hovered ? '#0B0B0B' : '#d4d4d8', margin: 0, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>
          {project.title}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Behance Section ──────────────────────────────────────────────────────────
const behanceProjects = [
  {
    title: 'IndiGo Go Next Experience Design',
    url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design',
    cover: '/behance/behance-01.png',
    year: '2020',
  },
  {
    title: 'Designing for Last Mile Reach — Financial Inclusion',
    url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion',
    cover: '/behance/behance-02.png',
    year: '2020',
  },
  {
    title: 'Delivering Better Experience — A Redesign',
    url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN',
    cover: '/behance/behance-03.png',
    year: '2020',
  },
  {
    title: 'Icons Design Planner',
    url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner',
    cover: '/behance/behance-04.png',
    year: '2019',
  },
]

function BehanceCard({ project, index }: { project: typeof behanceProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease }}
      style={{
        display: 'block',
        background: '#0A0A0A',
        border: `1px solid ${hovered ? '#2a2a2a' : '#1a1a1a'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.25s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image — 872×688 natural ratio ≈ 4:3 */}
      <div style={{ position: 'relative', aspectRatio: '872 / 688', overflow: 'hidden', background: '#111' }}>
        <img
          src={project.cover}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.3s',
            display: 'block',
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
      {/* Title + meta below image */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{
          fontFamily: T.sans,
          fontSize: '13px',
          fontWeight: 500,
          color: hovered ? '#ffffff' : '#a1a1aa',
          margin: '0 0 8px',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          transition: 'color 0.2s',
        }}>
          {project.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: T.mono, fontSize: '10px', color: '#3f3f46', letterSpacing: '0.04em' }}>{project.year}</span>
          <span style={{ fontFamily: T.mono, fontSize: '9px', color: '#3f3f46', border: '1px solid #27272a', padding: '1px 6px', borderRadius: '4px', letterSpacing: '0.06em' }}>
            Be
          </span>
        </div>
      </div>
    </motion.a>
  )
}

function BehanceSection() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A0A0A',
        padding: '56px 48px',
        borderTop: '1px solid #1a1a1a',
        fontFamily: T.sans,
      }}
      className="behance-section"
    >
      {/* Header — mirrors work panel header style */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1a1a1a',
        paddingBottom: '24px',
        marginBottom: '32px',
      }}>
        <h2 style={{
          color: '#ffffff',
          fontFamily: T.sans,
          fontSize: '28px',
          fontWeight: 500,
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Behance old work: 2020
        </h2>
        <a
          href="https://www.behance.net/lankeonkar"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: T.mono,
            fontSize: '11px',
            color: '#52525b',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
        >
          View on Behance →
        </a>
      </div>

      {/* 4-col grid */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        className="behance-grid"
      >
        {behanceProjects.map((project, i) => (
          <BehanceCard key={project.url} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Arch + Industrial Section ────────────────────────────────────────────────
function ArchSection() {
  const disciplines = [
    { index: '01', title: 'Space + Arch' },
    { index: '02', title: 'Lighting Products' },
    { index: '03', title: 'Consumer Electronics' },
    { index: '04', title: 'Acoustic Panels' },
  ]

  return (
    <section
      id="arch"
      style={{
        background: T.dark,
        fontFamily: T.sans,
        padding: '80px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-24px',
          left: '-16px',
          fontSize: 'clamp(80px, 12vw, 180px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          color: '#141414',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        Space
      </div>

      {/* Chrome */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '24px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: '#52525b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Industrial &amp; Architectural Design
          </p>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0 }}>
            Beyond pixels: Design by 1st principles!
          </h2>
        </div>
        <span style={{ fontFamily: T.mono, fontSize: '40px', fontWeight: 500, color: '#1a1a1a', letterSpacing: '-0.03em' }}>
          04/
        </span>
      </div>

      {/* Projects — 3 cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          position: 'relative',
          zIndex: 1,
        }}
        className="arch-projects"
      >
        {archProjects.map((p, i) => (
          <ArchCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: T.paper,
        fontFamily: T.sans,
        position: 'relative',
      }}
    >
      {/* Ghost display word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40px',
          right: '-10px',
          fontSize: 'clamp(100px, 15vw, 220px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          color: T.ruleSoft,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        Process
      </div>

      {/* Chrome strip */}
      <div
        style={{
          padding: '28px 64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: `1px solid ${T.rule}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            About
          </p>
        </div>
        <span style={{ fontFamily: T.mono, fontSize: '40px', fontWeight: 500, color: T.rule, letterSpacing: '-0.03em' }}>
          03/
        </span>
      </div>

      {/* Body — 2 col */}
      <div
        className="about-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '64px',
          padding: '48px 64px 56px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <h2 style={{
              fontSize: 'clamp(40px, 5vw, 80px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: T.ink,
              margin: 0,
              fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
            }}>
              Hello, I&apos;m Onkar.
            </h2>
            <p style={{
              fontSize: 'clamp(18px, 2vw, 28px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: T.inkMute,
              margin: 0,
            }}>
              A craftsman at heart!
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '48ch' }}
          >
            <p style={{ fontSize: '18px', color: '#3D3D38', lineHeight: 1.65, margin: 0 }}>
              I&apos;m an engineer turned designer obsessed with forms, shapes, materials, interactions, & technology. I believe these are the ingredients of good, successful design. I bring research to the forefront &amp; ship products with intentional design experiences. &lsquo;Good Design shapes you&rsquo; — I have experienced that first hand.
            </p>
            <p style={{ fontSize: '18px', color: '#3D3D38', lineHeight: 1.65, margin: 0 }}>
              Fundamentally, I believe I&apos;m a craftsman. I have worked with various brands and startups to work on their products/service, digging on users to find undefined behavioral patterns and hidden pain points, analysed workflows and made changes to achieve desired results like engagement, revenue boost, or impact. I also contributed in building teams and aided in hiring right design talent. I&apos;m looking for following roles: <em style={{ fontStyle: 'normal', color: T.ink, fontWeight: 500 }}>Product Lead, Innovation Manager, Product Manager</em> as my next phase of career.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: T.rule,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ background: T.paper, padding: '18px 20px' }}>
                <p style={{ fontFamily: T.sans, fontSize: 'clamp(26px, 2.5vw, 40px)', fontWeight: 500, letterSpacing: '-0.03em', color: T.ink, margin: '0 0 3px', lineHeight: 1 }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: T.mono, fontSize: '10px', color: '#D04D1F', margin: 0, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Skills pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <p style={{ fontFamily: T.mono, fontSize: '10px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              Skills
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map(skill => (
                <SkillPill key={skill} label={skill} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right column — tall photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '14px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/onkar.webp"
              alt="Onkar Lanke"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Tools band ── */}
      <div
        style={{
          borderTop: `1px solid ${T.rule}`,
          padding: '40px 0 36px',
          overflow: 'hidden',
          background: T.paper,
        }}
      >
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px', padding: '0 64px' }}>
          Tools I use
        </p>
        <ToolsMarquee />
      </div>

      {/* ── Sketches band (dark) ── */}
      <div
        style={{
          background: T.dark,
          borderTop: `1px solid ${T.rule}`,
          paddingTop: '48px',
          paddingBottom: '48px',
          overflow: 'hidden',
        }}
      >
        {/* Sketches header */}
        <div style={{ padding: '0 64px 32px' }}>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: '#52525b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Raw sketches &amp; explorations
          </p>
          <p style={{ fontFamily: T.sans, fontSize: '22px', fontWeight: 500, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Design Breaks
          </p>
        </div>

        {/* Marquee */}
        <SketchMarquee />
      </div>
    </section>
  )
}

// ─── Skill pill with hover fill ───────────────────────────────────────────────
function SkillPill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        border: `1.5px solid ${hovered ? T.ink : T.rule}`,
        borderRadius: '9999px',
        padding: '5px 13px',
        fontSize: '12px',
        color: hovered ? T.paper : T.ink,
        background: hovered ? T.ink : 'transparent',
        fontFamily: T.sans,
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showUI, setShowUI] = useState(false)

  return (
    <>
      {/* Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes orangePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #D04D1F; }
          50% { opacity: 0.35; box-shadow: 0 0 2px #D04D1F; }
        }
        .flip-card-inner {
          transform-style: preserve-3d;
        }
      `}</style>

      <main style={{ background: T.dark }}>
        {/* Spacer blocks give each sticky section its own scroll budget */}
        {showUI && <Nav />}

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — sticky, light paper bg
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 0,
            height: '100svh',
            background: T.paper,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 80px',
            fontFamily: T.sans,
          }}
        >
          {/* Ghost display word — scaled down on mobile */}
          <div
            aria-hidden
            className="hero-ghost"
            style={{
              position: 'absolute',
              bottom: '-10%',
              right: '-2%',
              fontSize: 'clamp(80px, 28vw, 340px)',
              fontWeight: 600,
              color: T.ruleSoft,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              fontFamily: T.sans,
            }}
          >
            Design
          </div>

          {/* Registration marks — hidden on mobile */}
          <div className="hero-decor" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <RegMark style={{ top: '32px', left: '32px' }} />
            <RegMark style={{ top: '32px', right: '32px' }} />
            <RegMark style={{ bottom: '32px', left: '32px' }} />
            <RegMark style={{ bottom: '32px', right: '32px' }} />
            <div aria-hidden style={{ position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', color: T.rule, fontSize: '18px', lineHeight: 1, userSelect: 'none' }}>+</div>
            <div aria-hidden style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', color: T.rule, fontSize: '18px', lineHeight: 1, userSelect: 'none' }}>+</div>
          </div>

          {/* Main content */}
          <div
            className="hero-content"
            style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '46px', marginTop: '40px' }}
          >
            {/* Main headline — triggers showUI when done */}
            <TypewriterHeadline onDone={() => setShowUI(true)} />

            {/* CTA pills — always in DOM, fades in after typewriter */}
            <div
              className="hero-ctas"
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                opacity: showUI ? 1 : 0,
                transition: 'opacity 0.7s ease-out 0.2s',
              }}
            >
              <HeroCTA href="/#work" label="View work" filled />
              <HeroCTA href="https://www.linkedin.com/in/onkarlanke/" label="Connect on LinkedIn" filled={false} />
            </div>
          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WORK PANEL — dark, slides over hero
            Wrapper is 200svh so the sticky card is active for 100svh then releases
        ═══════════════════════════════════════════════════════════════════ */}
        <div id="work" className="work-wrapper" style={{ height: '200svh' }}>
        <div
          id="work-panel"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            height: '100svh',
            borderRadius: '24px 24px 0 0',
            background: T.dark,
            overflow: 'hidden',
            fontFamily: T.sans,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Panel header strip */}
          <div
            className="work-panel-header"
            style={{
              padding: '32px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #1a1a1a',
            }}
          >
            <h2
              style={{
                color: '#ffffff',
                fontFamily: T.sans,
                fontSize: '28px',
                fontWeight: 500,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Digital Design
            </h2>
            <Link
              href="/projects"
              style={{
                fontFamily: T.mono,
                fontSize: '11px',
                color: '#52525b',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
            >
              All Projects →
            </Link>
          </div>

          {/* Three-column grid — fills remaining card height, each col scrolls independently */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr 1fr',
              flex: 1,
              overflow: 'hidden',
              borderTop: '1px solid #1a1a1a',
            }}
            className="work-columns"
          >
            {/* ── Column 1: Articles ── */}
            <ColSection borderRight>
              {(headingColor) => (
                <ArticlesColumn headingColor={headingColor} />
              )}
            </ColSection>

            {/* ── Column 2: Case Studies ── */}
            <ColSection borderRight>
              {(headingColor) => (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <p style={{ fontFamily: T.mono, fontSize: '11px', color: headingColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', transition: 'color 0.2s', flexShrink: 0 }}>
                    Case Studies
                  </p>
                  <div className="flip-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px', flex: 1 }}>
                    {projects.map(project => (
                      <FlipCard key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </ColSection>

            {/* ── Column 3: Webflow Builds ── */}
            <ColSection>
              {(headingColor) => (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <p style={{ fontFamily: T.mono, fontSize: '11px', color: headingColor, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, transition: 'color 0.2s' }}>
                      NO-CODE WEBFLOW BUILDS
                    </p>
                  </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    name: 'Reevo CRM',
                    url: 'https://www.reevocrm.com',
                    description: 'Salesforce Summit Partner — implementations, AI integrations & adoption.',
                    tags: ['CRM', 'B2B'],
                  },
                  {
                    name: 'Catalyst Healthcare',
                    url: 'https://catalysthcc.com',
                    description: 'Regulatory policy advancing innovative healthcare solutions.',
                    tags: ['Healthcare', 'Consulting'],
                  },
                ].map((item, i) => (
                  <WebflowCard key={i} site={item} />
                ))}
              </div>
                </>
              )}
            </ColSection>
          </div>
        </div>

        </div>{/* end work wrapper */}

        {/* ═══════════════════════════════════════════════════════════════════
            BEHANCE ARCHIVE — normal scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <BehanceSection />

        {/* ═══════════════════════════════════════════════════════════════════
            ARCH + INDUSTRIAL — normal scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <ArchSection />

        {/* ═══════════════════════════════════════════════════════════════════
            ABOUT SECTION — normal scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <AboutSection />

        {/* ═══════════════════════════════════════════════════════════════════
            FOOTER — sticky, ends the scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            height: '100svh',
            borderRadius: '24px 24px 0 0',
            overflow: 'hidden',
          }}
        >
          <Footer />
        </div>
      </main>

      {/* Responsive overrides */}
      <style>{`
        .sketch-track:hover {
          animation-play-state: paused !important;
        }

        /* Hide scrollbar in Case Studies column */
        .work-columns > div:nth-child(2)::-webkit-scrollbar {
          display: none;
        }
        .work-columns > div:nth-child(2) {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        /* ── Tablet (≤768px) ── */
        @media (max-width: 768px) {
          /* Hero */
          #hero {
            padding: 0 24px !important;
            justify-content: center !important;
          }
          .hero-decor {
            display: none !important;
          }
          .hero-ghost {
            right: -10% !important;
            bottom: -5% !important;
          }
          .hero-content {
            gap: 20px !important;
            margin-top: 0 !important;
            width: 100% !important;
          }
          .hero-ctas {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
          }
          .hero-ctas a {
            justify-content: center !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Work panel */
          .work-panel-header {
            padding: 20px 24px !important;
          }
          .work-columns {
            grid-template-columns: 1fr !important;
            overflow-y: visible !important;
            height: auto !important;
          }
          .work-columns > div {
            border-right: none !important;
            border-bottom: 1px solid #1a1a1a;
          }
          #work-panel {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
          }
          .work-wrapper {
            height: auto !important;
          }
          .col-section {
            padding: 20px !important;
          }
          .flip-cards {
            grid-template-columns: 1fr !important;
          }
          .webflow-iframe-wrap {
            height: 140px !important;
          }

          /* Behance */
          .behance-section {
            padding: 40px 20px !important;
          }
          .behance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Arch */
          #arch {
            padding: 48px 20px !important;
          }
          .arch-disciplines {
            flex-wrap: wrap !important;
          }
          .arch-disciplines > div {
            flex: 1 1 45% !important;
          }
          .arch-projects {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }

          /* About */
          .about-inner {
            padding: 32px 20px !important;
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #about > div:last-child {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        /* ── Mobile (≤480px) ── */
        @media (max-width: 480px) {
          /* Hero */
          #hero {
            padding: 0 16px !important;
          }
          .hero-content {
            gap: 16px !important;
          }

          /* Work panel */
          .work-panel-header {
            padding: 16px 16px !important;
          }
          .col-section {
            padding: 16px !important;
          }

          /* Behance */
          .behance-section {
            padding: 32px 16px !important;
          }
          .behance-grid {
            grid-template-columns: 1fr !important;
          }

          /* Arch */
          #arch {
            padding: 40px 16px !important;
          }
          .arch-projects {
            grid-template-columns: 1fr !important;
          }

          /* About */
          .about-inner {
            padding: 28px 16px !important;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #about > div:last-child {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </>
  )
}
