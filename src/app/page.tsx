'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
const siAdobeCC   = { path: 'M13.966 4.79h6.925v14.42h-6.925zm-3.932 0H3.109v14.42h6.925zM12 10.066c-1.1.596-1.857 1.645-2.005 2.863.148 1.218.905 2.267 2.005 2.862 1.1-.595 1.857-1.644 2.005-2.862-.148-1.218-.905-2.267-2.005-2.863z' }

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
  mono: "'Space Mono', monospace",
}

const ease = [0.22, 1, 0.36, 1] as const

// projects and archProjects are imported from @/lib/portfolio-data

// ─── Experience data (from CV) ────────────────────────────────────────────────
// Defined in component section below

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
  { name: 'Adobe CC',  category: 'Design',    svgPath: siAdobeCC.path,   iconFill: '#FF0000' },
]

const fallbackImgSrc: Record<string, string> = {
  'Amplitude': '/icons/amplitude.svg',
}

const webflowSites = [
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
]

const SQUIRCLE_PATH =
  'M 48 0 C 68 0 79 0 85 7 C 92 13 96 24 96 48 C 96 68 96 79 89 85 C 83 92 72 96 48 96 C 28 96 17 96 11 89 C 4 83 0 72 0 48 C 0 28 0 17 7 11 C 13 4 24 0 48 0 Z'

const TOOL_CARD_CLIP = 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)'

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group"
      style={{ position: 'relative', flexShrink: 0, cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 144, height: 62,
          background: hovered ? '#2a2a2a' : '#F0EDE6',
          border: `1px solid ${hovered ? '#2a2a2a' : '#E2DFD8'}`,
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          gap: '10px',
          padding: '0 17px',
          transition: 'background 0.18s ease, border-color 0.18s ease',
          boxShadow: hovered ? '0 2px 10px rgba(0,0,0,0.18)' : 'none',
        }}
      >
        {tool.name === 'VS Code' ? (
          <span style={{ fontFamily: T.mono, fontSize: '11px', fontWeight: 700, color: '#007ACC', letterSpacing: '0.01em', lineHeight: 1.2, textAlign: 'center', flexShrink: 0 }}>{'</>'}</span>
        ) : tool.svgPath ? (
          <svg role="img" viewBox="0 0 24 24" width={22} height={22} fill={tool.iconFill} style={{ flexShrink: 0 }}>
            <path d={tool.svgPath} />
          </svg>
        ) : (
          <img src={fallbackImgSrc[tool.name]} alt={tool.name} width={22} height={22} style={{ flexShrink: 0 }} />
        )}
        <span style={{ fontFamily: T.sans, fontSize: '14px', fontWeight: 500, color: hovered ? '#ffffff' : T.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em', transition: 'color 0.18s ease' }}>
          {tool.name}
        </span>
      </div>
    </motion.div>
  )
}

function ToolsMarquee({ bg = '#F7F4EE' }: { bg?: string }) {
  const tripled = [...tools, ...tools, ...tools]
  return (
    <div style={{ position: 'relative', overflowX: 'clip', overflowY: 'visible' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: `linear-gradient(to right, ${bg}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: `linear-gradient(to left, ${bg}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
      <motion.div
        style={{ display: 'flex', gap: '10px', padding: '6px 0', width: 'max-content' }}
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
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={project.directPath}
      style={{ display: 'block', position: 'relative', cursor: 'pointer', textDecoration: 'none', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        {/* FRONT */}
        <div
          style={{
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: '6px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'opacity 650ms ease, transform 650ms ease',
            opacity: hovered ? 0 : 1,
            transform: hovered ? 'scale(0.97)' : 'scale(1)',
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
              <p style={{ color: '#f4f4f5', fontSize: '13px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
                {project.title}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span style={{ color: '#52525b', fontSize: '16px' }}>→</span>
            </div>
          </div>
        </div>

        {/* BACK — fades in over the front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#f4f4f5',
            border: '1px solid #e4e4e7',
            borderRadius: '6px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'opacity 650ms ease, transform 650ms ease',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            pointerEvents: hovered ? 'auto' : 'none',
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

// ─── Case Study vertical card ─────────────────────────────────────────────────
function CaseStudyCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={project.directPath}
      style={{ display: 'block', position: 'relative', cursor: 'pointer', textDecoration: 'none', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        {/* FRONT — tall image + tags + title */}
        <div style={{
          background: '#111',
          border: '1px solid #1a1a1a',
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'opacity 650ms ease, transform 650ms ease',
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'scale(0.97)' : 'scale(1)',
        }}>
          {/* Banner — fills most of the card height */}
          <div style={{ flex: 1, overflow: 'hidden', background: '#0a0a0a', minHeight: 0 }}>
            {project.banner
              ? <img src={project.banner} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
              : <div style={{ width: '100%', height: '100%', ...stripedDark }} />
            }
          </div>
          {/* Bottom strip — title only */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid #1a1a1a', flexShrink: 0 }}>
            <p style={{ color: '#f4f4f5', fontSize: '17px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
              {project.title}
            </p>
          </div>
        </div>

        {/* BACK — fades in over the front */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#f4f4f5',
          border: '1px solid #e4e4e7',
          borderRadius: '6px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'opacity 650ms ease, transform 650ms ease',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: hovered ? 'auto' : 'none',
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
  )
}

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
        background: hovered ? T.ruleSoft : '#ffffff',
        border: `1px solid ${T.rule}`,
        borderRadius: '8px',
        padding: '12px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
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
          border: `1px solid ${T.rule}`,
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
        <p style={{ fontFamily: T.mono, fontSize: '10px', color: T.inkMute, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          {date}
        </p>
        <p style={{ color: T.ink, fontSize: '13px', fontWeight: 500, lineHeight: 1.4, margin: 0, fontFamily: T.sans }}>
          {article.title}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontFamily: T.mono, fontSize: '9px', color: T.inkMute, letterSpacing: '0.05em', background: T.ruleSoft, padding: '2px 6px', borderRadius: '9999px' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}

// ─── Medium articles section (below tools in About) ──────────────────────────
function MediumSection() {
  const [articles, setArticles] = useState<Array<{ title: string; pubDate: string; link: string; tags?: string[]; publication?: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data.slice(0, 6) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="medium-section" style={{ borderTop: `1px solid ${T.rule}`, padding: '72px 80px', background: '#FCFCFA' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
        <h3 style={{ fontFamily: T.sans, fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500, color: T.ink, margin: 0, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
          Weekend pen-downs: My articles
        </h3>
        <a
          href="https://medium.com/@onkarlanke"
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s', flexShrink: 0, marginLeft: '24px' }}
          onMouseEnter={e => (e.currentTarget.style.color = T.ink)}
          onMouseLeave={e => (e.currentTarget.style.color = T.inkMute)}
        >
          All articles →
        </a>
      </div>
      <div className="medium-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ background: T.ruleSoft, border: `1px solid ${T.rule}`, borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px' }}>
                <div style={{ width: '80px', height: '64px', flexShrink: 0, background: T.rule, borderRadius: '6px' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                  <div style={{ height: '10px', background: T.rule, borderRadius: '4px', width: '40%' }} />
                  <div style={{ height: '12px', background: T.rule, borderRadius: '4px', width: '90%' }} />
                </div>
              </div>
            ))
          : articles.map((a, i) => <ArticleCard key={i} article={a} index={i} />)
        }
      </div>
    </div>
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
      {children(hovered ? '#FF4A1C' : '#52525b')}
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
      <div className="webflow-iframe-wrap" style={{ position: 'relative', height: '320px', overflow: 'hidden', background: '#0a0a0a' }}>
        <iframe
          src={site.url}
          title={site.name}
          loading="lazy"
          style={{
            width: '200%',
            height: '640px',
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
// ─── Hero — Option A: Asymmetric grid (exact from design handoff) ─────────────
const HERO_ACCENT = '#FF4A1C'
const PIXEL_COLS = 22
const PIXEL_ROWS = 16
const PIXEL_DELAYS: number[] = Array.from({ length: PIXEL_COLS * PIXEL_ROWS }, () => Math.random() * 0.9)
const ABOUT_PIXEL_DELAYS: number[] = Array.from({ length: PIXEL_COLS * PIXEL_ROWS }, () => Math.random() * 0.9)
const BLOB_PIXEL_COLS = 12
const BLOB_PIXEL_ROWS = 12
const BLOB_PIXEL_DELAYS: number[] = Array.from({ length: BLOB_PIXEL_COLS * BLOB_PIXEL_ROWS }, () => Math.random() * 0.9)
const HERO_BG     = '#FCFCFA'
const HERO_INK    = '#141414'
const HERO_MUTED  = '#8a8a85'
const HERO_BODY   = '#3a3a36'
const SPACE_MONO  = "'Space Mono', monospace"
const HELV        = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const GLORY       = "'Glory', sans-serif"

const HERO_TAGS = [
  { n: '01', label: 'Product Design' },
  { n: '02', label: 'UX Research & Strategy' },
  { n: '03', label: 'Behavioral Mapping' },
  { n: '04', label: 'Visual Design' },
  { n: '05', label: 'Systems Thinking' },
  { n: '06', label: 'Data Analytics' },
]

// Each character carries its display text and whether it's accent-coloured.
// We encode the ampersand as the literal '&' char for rendering (React escapes it).
type CharDef = { ch: string; accent: boolean }

const HERO_LINES: CharDef[][] = [
  [...'Observer,'].map(ch => ({ ch, accent: false })),
  [...'Tinkerer,'].map(ch => ({ ch, accent: false })),
  [
    ...('Storyteller').split('').map(ch => ({ ch, accent: false })),
    { ch: '.', accent: true },
  ],
]

function HeroCTA({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: SPACE_MONO,
        fontSize: '13px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? '#ffffff' : HERO_ACCENT,
        background: hovered ? HERO_ACCENT : 'transparent',
        padding: '4px 8px 4px 0',
        paddingLeft: hovered ? '8px' : '0',
        clipPath: hovered
          ? 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% 0, 100% 100%, 0 100%)',
        cursor: 'pointer',
        transition: 'color 0.2s ease, background 0.2s ease, clip-path 0.2s ease, padding-left 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        textDecoration: hovered ? 'none' : 'underline',
        textDecorationColor: HERO_ACCENT,
        textUnderlineOffset: '6px',
        transition: 'text-decoration-color 0.2s ease',
      }}>{label}</span>
      <span style={{ fontSize: '15px', lineHeight: 1, textDecoration: 'none' }}>↗</span>
    </a>
  )
}

function HeroCTALight({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: SPACE_MONO,
        fontSize: '13px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? '#ffffff' : HERO_INK,
        background: hovered ? HERO_ACCENT : 'transparent',
        padding: '4px 8px 4px 0',
        paddingLeft: hovered ? '8px' : '0',
        clipPath: hovered
          ? 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)'
          : 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease, background 0.2s ease, clip-path 0.2s ease, padding-left 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        textDecoration: hovered ? 'none' : 'underline',
        textDecorationColor: HERO_INK,
        textUnderlineOffset: '6px',
      }}>{label}</span>
      <span style={{ fontSize: '13px', lineHeight: 1 }}>↗</span>
    </a>
  )
}

const HERO_TOTAL_CHARS = HERO_LINES.reduce((s, l) => s + l.length, 0)

function HeroSection() {
  const [revealed, setRevealed]       = useState([0, 0, 0])
  const [cursorLine, setCursorLine]   = useState(0)
  const [done, setDone]               = useState(false)
  const [rightReady, setRightReady]   = useState(false)
  const [charsDone, setCharsDone]     = useState(0)

  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    let cancelled = false
    let count = 0

    const type = () => {
      if (cancelled) return
      if (lineIdx >= HERO_LINES.length) {
        setCursorLine(-1)
        setTimeout(() => setDone(true), 200)
        return
      }
      const line = HERO_LINES[lineIdx]
      if (charIdx <= line.length) {
        const li = lineIdx, ci = charIdx
        setRevealed(prev => { const n = [...prev]; n[li] = ci; return n })
        setCursorLine(lineIdx)
        count++; setCharsDone(count)
        charIdx++
        setTimeout(type, 75)
      } else {
        lineIdx++; charIdx = 0
        // Storyteller (line 2) just started — trigger right side
        if (lineIdx === 2) setRightReady(true)
        setTimeout(type, 260)
      }
    }

    const delay = setTimeout(type, 350)
    return () => { cancelled = true; clearTimeout(delay) }
  }, [])

  const p = Math.min(charsDone / HERO_TOTAL_CHARS, 1)

  const CARD_BG = 'rgba(225, 217, 214, 0.50)'
  const CARD_DISSOLVE = '#E1D9D6'

  return (
    <section
      id="hero"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        height: '100svh',
        background: HERO_BG,
        color: HERO_INK,
        fontFamily: HELV,
        padding: '36px 80px 36px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Animated badge — top left ── */}
      <div className="hero-badge" style={{ position: 'absolute', top: '36px', left: '80px', zIndex: 2, perspective: '600px' }}>
        {p > 0 && (
          <motion.div
            initial={{ rotateY: -85, height: 3 }}
            animate={{ rotateY: 0, height: 70 }}
            transition={{
              rotateY: { duration: 0.975, ease: [0.22, 1, 0.36, 1] },
              height:   { duration: 0.675, ease: [0.22, 1, 0.36, 1], delay: 0.75 },
            }}
            style={{
              width: '220px',
              background: HERO_ACCENT,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '10px 16px',
              clipPath: `polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)`,
              transformOrigin: 'left center',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.32 }}
              style={{
                fontFamily: SPACE_MONO,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.7,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#333333' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#333333', flexShrink: 0 }} />
                Portfolio — 2026
              </div>
              <div style={{ color: '#EAEAEA' }}>Est. 2020 / 6+ Years</div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── Main grid: headline | circle+card | vertical skills ── */}
      <div className="hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 480px',
        gap: '32px',
        alignItems: 'center',
        flex: 1,
        padding: '80px 0 0',
      }}>

        {/* Left — typewritten headline */}
        <div>
          <h1 style={{
            margin: 0,
            fontFamily: HELV,
            fontWeight: 700,
            fontSize: 'clamp(40px, 9vw, 100px)',
            lineHeight: 0.94,
            letterSpacing: '-0.035em',
            color: HERO_INK,
            minHeight: '2.82em',
          }}>
            {HERO_LINES.map((line, li) => (
              <span key={li} style={{ display: 'block' }}>
                {line.slice(0, revealed[li]).map(({ ch, accent }, ci) => (
                  <span key={ci} style={accent ? { color: HERO_ACCENT } : undefined}>{ch}</span>
                ))}
                {cursorLine === li && (
                  <span style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '0.8em',
                    background: HERO_INK,
                    marginLeft: '4px',
                    verticalAlign: 'middle',
                    animation: 'heroCursor 0.75s step-end infinite',
                  }} />
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Center — orange circle + light card */}
        <div style={{ position: 'relative' }}>
          {/* Dotted grid — behind blob, 30% larger on each side */}
          {rightReady && (
            <div style={{
              position: 'absolute',
              top: 'calc(clamp(-80px, -15vw, -110px) - clamp(200px, 35vw, 300px) * 0.3)',
              left: 'calc(clamp(-80px, -15vw, -110px) - clamp(200px, 35vw, 300px) * 0.3)',
              width: 'calc(clamp(200px, 35vw, 300px) * 1.6)',
              height: 'calc(clamp(200px, 35vw, 300px) * 1.6)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='%23C9C9C9' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='%23C9C9C9' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              zIndex: 1,
              pointerEvents: 'none',
            }} />
          )}
          {/* Hero figure — centered on blob, flipped, behind card */}
          {rightReady && (
            <motion.div
              className="hero-figure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                /* blob top/left = clamp(-80px,-15vw,-110px) ≈ -80px; blob size = clamp(200px,35vw,300px) */
                /* center = blob_tl + blob_size/2 */
                top: 'calc(clamp(-80px, -15vw, -110px) + clamp(200px, 35vw, 300px) / 2)',
                left: 'calc(clamp(-80px, -15vw, -110px) + clamp(200px, 35vw, 300px) / 2 - 100px)',
                width: 'clamp(280px, 44vw, 400px)',
                /* shift back by own half-size to truly centre the image on the blob centre */
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <img
                src="/hero-figure.png"
                alt=""
                aria-hidden
                style={{ width: '100%', display: 'block', transform: 'scaleX(-1)' }}
              />
            </motion.div>
          )}

          {/* Orange circle — mounts when Storyteller starts, pixel dissolve reveals it */}
          {rightReady && <motion.div
            className="hero-blob"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 }}
            style={{
            position: 'absolute',
            top: 'clamp(-80px, -15vw, -110px)',
            left: 'clamp(-80px, -15vw, -110px)',
            width: 'clamp(200px, 35vw, 300px)',
            height: 'clamp(200px, 35vw, 300px)',
            background: HERO_ACCENT,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            {(
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${BLOB_PIXEL_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${BLOB_PIXEL_ROWS}, 1fr)`,
                pointerEvents: 'none',
                zIndex: 2,
              }}>
                {BLOB_PIXEL_DELAYS.map((delay, i) => (
                  <motion.div
                    key={i}
                    style={{ background: HERO_BG }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.30, delay: delay + 0.2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>}

          {/* Card */}
          <motion.div
            className="hero-right-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: rightReady ? 1 : 0 }}
            transition={{ duration: 0 }}
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: CARD_BG,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '40px 36px',
              borderRadius: '12px',
              border: '1px solid #DBDBDB',
              overflow: 'hidden',
            }}
          >
            {/* Pixel dissolve overlay */}
            {rightReady && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${PIXEL_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${PIXEL_ROWS}, 1fr)`,
                pointerEvents: 'none',
                zIndex: 10,
              }}>
                {PIXEL_DELAYS.map((delay, i) => (
                  <motion.div
                    key={i}
                    style={{ background: CARD_DISSOLVE }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.30, delay: delay + 0.2 }}
                  />
                ))}
              </div>
            )}

            <div className="hero-card-heading" style={{
              fontFamily: SPACE_MONO,
              fontSize: '21px',
              letterSpacing: '0.04em',
              color: HERO_INK,
              position: 'relative', zIndex: 1,
            }}>
              Hi, <span style={{ color: HERO_INK }}>I&rsquo;m Onkar</span>,
            </div>

            <p className="hero-card-body" style={{
              margin: 0,
              fontFamily: HELV,
              fontSize: '15px',
              lineHeight: 1.55,
              color: HERO_BODY,
              maxWidth: '380px',
              position: 'relative', zIndex: 1,
            }}>
              A Product craftsman, passionate UX researcher, &amp; technologist, building experiences for{' '}
              <span style={{ color: HERO_INK, fontWeight: 500 }}>5+ years</span>, with recent development
              in agentic environments and AI powered research &amp; prototyping.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '96px', position: 'relative', zIndex: 1 }}>
              <HeroCTALight href="/ONKAR_LANKE.pdf" label="View Resume" external />
              <HeroCTALight href="https://www.linkedin.com/in/onkarlanke/" label="Connect on LinkedIn" external />
              <div style={{
                marginTop: '14px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px 0',
                fontFamily: SPACE_MONO,
                fontSize: '9px',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: HERO_MUTED,
                lineHeight: 1.4,
              }}>
                {HERO_TAGS.map(({ label }, i) => (
                  <span key={label}>
                    {label}
                    {i < HERO_TAGS.length - 1 && <span style={{ margin: '0 6px', opacity: 0.5 }}>·</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
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
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to right, ${T.paper}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to left, ${T.paper}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

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
  { value: 5, suffix: '+', label: 'Years designing' },
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
    title: 'Icons Design Planner',
    url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner',
    cover: '/behance/behance-04.png',
    year: '2019',
  },
  {
    title: 'IndiGo Go Next Experience Design',
    url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design',
    cover: '/behance/behance-01.png',
    year: '2020',
  },
  {
    title: 'Delivering Better Experience — A Redesign',
    url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN',
    cover: '/behance/behance-03.png',
    year: '2020',
  },
  {
    title: 'Designing for Last Mile Reach — Financial Inclusion',
    url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion',
    cover: '/behance/behance-02.png',
    year: '2020',
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
        borderRadius: '6px',
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
        padding: '80px 64px',
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
        paddingBottom: '32px',
        marginBottom: '48px',
      }}>
        <h2 style={{
          color: '#ffffff',
          fontFamily: T.sans,
          fontSize: '28px',
          fontWeight: 500,
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Previous work: portfolio 2020
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

// ─── Industrial Design Photo Grid ─────────────────────────────────────────────
const industrialImages = [
  // Row 1 — wide + single
  { src: '/industrial/id-04.jpg', alt: 'Space design', span: 2 },
  { src: '/industrial/id-05.jpg', alt: 'Interactive origami lamp design', span: 1 },
  // Row 2 — three equal
  { src: '/industrial/id-01.jpg', alt: 'Speakers concept', span: 1 },
  { src: '/industrial/id-02.jpg', alt: 'Indoor food growing pods', span: 1 },
  { src: '/industrial/id-03.jpg', alt: 'Arch vision', span: 1 },
]

function IndustrialSection() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#FCFCFA',
        padding: '80px 64px',
        borderTop: '1px solid #E5E5E0',
        fontFamily: T.sans,
      }}
      className="industrial-section"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid #E5E5E0',
          paddingBottom: '32px',
          marginBottom: '48px',
        }}
      >
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Industrial &amp; Product Design
          </p>
          <h2 style={{ color: T.ink, fontSize: '28px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
            Beyond pixels: Design by 1st principles
          </h2>
        </div>
        <span style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          3D · Physical · Systems
        </span>
      </motion.div>

      {/* Photo grid — fixed row heights so every cell in a row aligns flush */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '360px 360px',
          gap: '3px',
        }}
        className="industrial-grid"
      >
        {industrialImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease }}
            style={{
              gridColumn: img.span > 1 ? `span ${img.span}` : undefined,
              borderRadius: '0px',
              overflow: 'hidden',
              background: '#E5E5E0',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
            />
          </motion.div>
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

function AboutPhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Diagonal line texture — top-left corner */}
      <div style={{
        position: 'absolute',
        top: '-24px',
        left: '-24px',
        width: '55%',
        height: '55%',
        zIndex: 2,
        pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(45deg, #FF4A1C 0px, #FF4A1C 1px, transparent 1px, transparent 8px)',
        maskImage: 'linear-gradient(135deg, black 40%, transparent 75%)',
        WebkitMaskImage: 'linear-gradient(135deg, black 40%, transparent 75%)',
        opacity: 0.6,
      }} />
      <motion.div
        style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0 }}
      >
        {/* Pixel dissolve overlay */}
        {inView && (
          <div style={{
            position: 'absolute', inset: 0, display: 'grid',
            gridTemplateColumns: `repeat(${PIXEL_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${PIXEL_ROWS}, 1fr)`,
            pointerEvents: 'none', zIndex: 10,
          }}>
            {ABOUT_PIXEL_DELAYS.map((delay, i) => (
              <motion.div
                key={i}
                style={{ background: '#FCFCFA' }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.30, delay: delay + 0.2 }}
              />
            ))}
          </div>
        )}
        <img
          src="/onkar.jpg"
          alt="Onkar Lanke"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
        />
      </motion.div>
    </div>
  )
}

const aboutSkillsGrid = [
  {
    heading: 'UX Research',
    items: ['Literature or secondary', 'Behavioral mapping', 'Contextual inquiry', 'Surveys', 'Focus groups', 'Ethnographic research', 'Usability testing', 'Heuristic evaluation', 'A/B testing', 'Data analytics'],
  },
  {
    heading: 'Design',
    items: ['Concept generation', 'Wireframes', 'Information Architecture', 'Navigation Structures', 'Personas & Journey mapping', 'Story boarding', 'Design Systems', 'Prototyping', 'Product Spec Docs', 'VisualUI', '3D modeling', 'Accessibility (WCAG)', 'Inclusive Design'],
  },
  {
    heading: 'Tech',
    items: ['HTML', 'CSS', 'JS', 'Python', 'Data analytics', 'GitHub VC'],
  },
]

function SkillTag({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: T.sans, fontSize: '14px',
        color: hovered ? '#ffffff' : '#3a3a36',
        background: hovered ? '#2a2a2a' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${hovered ? '#2a2a2a' : '#DBDBDB'}`,
        borderRadius: '4px', padding: '4px 10px', lineHeight: 1.5,
        cursor: 'default', transition: 'all 0.18s ease',
      }}
    >{label}</span>
  )
}

function SkillsAccordion() {
  return (
    <div>
      <p style={{ fontFamily: T.mono, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.inkMute, margin: '0 0 12px' }}>Skills</p>
    <div style={{
      background: 'rgba(225, 217, 214, 0.30)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '12px',
      border: '1px solid rgba(219, 219, 219, 0.5)',
      overflow: 'hidden',
      padding: '0 20px',
      position: 'relative',
    }}>
      {/* Noise overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', borderRadius: '12px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.3,
      }} />
      {aboutSkillsGrid.map((col, i) => (
        <div key={col.heading} style={{ borderBottom: i < aboutSkillsGrid.length - 1 ? '1px solid #DBDBDB' : 'none', padding: '16px 0', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: T.sans, fontSize: '17px', fontWeight: 600, color: T.ink, margin: '0 0 10px' }}>{col.heading}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {col.items.map(item => (
              <SkillTag key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#FCFCFA',
        fontFamily: T.sans,
        position: 'relative',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Ghost display word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40px',
          right: '-10px',
          fontSize: 'clamp(49px, 7.35vw, 108px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          color: T.ruleSoft,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        About
      </div>

      {/* Chrome strip */}
      <div
        style={{
          padding: '40px 80px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: T.mono, fontSize: '40px', fontWeight: 500, color: T.rule, letterSpacing: '-0.03em' }}>
          03/
        </span>
      </div>

      {/* Body — 2 col */}
      <div
        className="about-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '64px',
          padding: '32px 80px 80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left column: headline + illustration ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: T.ink,
              margin: 0,
              fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
            }}>
              Thriving on Curiosity &amp; Experimentation&hellip;
            </h2>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${T.rule}` }}
          >
            <img
              src="/about-illustration.png"
              alt="Designer at work illustration"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

        </div>

        {/* ── Right column: stats + bio + skills accordion ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <p style={{ fontSize: '15px', color: '#3D3D38', lineHeight: 1.7, margin: '0 0 16px' }}>
              I&rsquo;m an engineer turned designer, &amp; I simply love product building!
              Through extensive explorations, I bring insights to the forefront &amp;
              ship intentional, desirable experiences, for various outcomes like
              improved user satisfaction, enhanced onboarding, increase in
              task completions and product growth.
            </p>
            <p style={{ fontSize: '15px', color: '#3D3D38', lineHeight: 1.7, margin: 0 }}>
              People say, &ldquo;<span style={{ color: T.ink, fontWeight: 500 }}>Good Design shapes you.</span>&rdquo; Design has made me
              more humble, an active listener, &amp; importance of putting your
              heart into every small detail, as I feel designers do an incredible
              job making spaces more liveable and desirable.
            </p>
          </motion.div>

          {/* Stats card */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            style={{
              background: '#FF4A1C',
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '20px 20px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none',
              }}>
                <p style={{ fontFamily: T.mono, fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 4px', lineHeight: 1 }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: T.mono, fontSize: '9px', color: 'rgba(255,255,255,0.75)', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Skills accordion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <SkillsAccordion />
          </motion.div>
        </div>
      </div>

      {/* Tools marquee — full page width */}
      <div style={{ padding: '40px 0 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '0 80px 16px' }}>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: '#2a2a2a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Tools I use</p>
        </div>
        <ToolsMarquee bg="#FCFCFA" />
      </div>

    </section>
  )
}

// ─── Experience Timeline ──────────────────────────────────────────────────────
const timelineJobs = [
  {
    role: 'UX Researcher',
    company: 'TeamLease Pvt Ltd',
    type: 'Internship',
    period: 'May – Jul 2019',
    months: 3,
    desc: 'Platform revamp research — 86% engagement growth post-redesign.',
    accent: false,
  },
  {
    role: 'Product Designer',
    company: 'Kritsnam Technologies',
    type: 'Internship',
    period: 'Oct – Dec 2019',
    months: 2,
    desc: 'Sensor dashboard — 65% reduction in service time (47m → 16m).',
    accent: true,
  },
  {
    role: 'UX Designer',
    company: 'Tata Consultancy Services',
    type: 'Full-time',
    period: 'Sept 2020 – Mar 2023',
    months: 30,
    desc: 'AirAsia CX, Tata Neu heuristic eval, hybrid work platform.',
    accent: false,
  },
  {
    role: 'Senior UX Designer',
    company: 'Mindseye Creative Studios',
    type: 'Full-time',
    period: 'Apr 2023 – Dec 2025',
    months: 32,
    desc: 'End-to-end UX + AI SaaS for consultants; 40–55% productivity gain.',
    accent: true,
  },
  {
    role: 'Product Design Consultant',
    company: 'Laminar Interactive',
    type: 'Freelance',
    period: 'Mar – May 2026',
    months: 2,
    desc: 'AI tool for architects — research, prototype, 20% workflow gain.',
    accent: false,
  },
]

// Circle size scales with tenure (months)
const TL_MIN_PX = 130
const TL_MAX_PX = 270
const TL_MAX_MONTHS = 32
// Horizontal line sits 240px from the top of the track area
const TL_LINE_Y = 240
// Tick extends this many px below the circle's bottom edge
const TL_TICK_EXTRA = 40

function tlSize(months: number) {
  return Math.round(TL_MIN_PX + (months / TL_MAX_MONTHS) * (TL_MAX_PX - TL_MIN_PX))
}

function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // total track height: line (240) + max radius (135) + tick extra (40) + date text (56) + bottom pad (40)
  const trackH = TL_LINE_Y + Math.round(TL_MAX_PX / 2) + TL_TICK_EXTRA + 56 + 40

  return (
    <section
      id="experience"
      style={{ background: '#F7F4EE', position: 'relative', zIndex: 10, fontFamily: T.sans }}
    >
      {/* Header strip */}
      <div className="tl-header" style={{
        padding: '40px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `1px solid ${T.rule}`,
      }}>
        <div>
          <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Work Experience
          </p>
          <p style={{ fontFamily: T.sans, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.03em', color: T.ink, margin: 0, lineHeight: 1.1 }}>
            Where I&rsquo;ve shipped
          </p>
        </div>
        <span style={{ fontFamily: T.mono, fontSize: '40px', fontWeight: 500, color: T.rule, letterSpacing: '-0.03em' }}>05/</span>
      </div>

      {/* Timeline track */}
      <div
        ref={ref}
        className="tl-wrap"
        style={{ position: 'relative', height: trackH, overflowX: 'auto', overflowY: 'visible' }}
      >
        {/* Horizontal line */}
        <div className="tl-line" style={{
          position: 'absolute',
          left: 0, right: 0,
          top: TL_LINE_Y,
          height: '2px',
          background: `linear-gradient(to right, #E2DFD8 0%, #C8C5BE 8%, #C8C5BE 92%, #E2DFD8 100%)`,
          zIndex: 0,
        }} />

        {/* Items row — flex-start so spacers control vertical position */}
        <div className="tl-track" style={{
          position: 'absolute', inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '32px',
          padding: '0 80px',
        }}>
          {timelineJobs.map((job, i) => {
            const size   = tlSize(job.months)
            const radius = size / 2
            const bg     = job.accent ? '#FF4A1C' : '#2a2a2a'
            const pad    = Math.round(size * 0.13)
            const roleFs = Math.max(9,  Math.round(size * 0.055))
            const metaFs = Math.max(7,  Math.round(size * 0.037))
            const descFs = Math.max(8,  Math.round(size * 0.044))
            // spacer pushes circle so its centre sits on TL_LINE_Y
            const spacer = TL_LINE_Y - radius
            // tick from circle centre to (radius + EXTRA) below circle centre
            const tickH  = radius + TL_TICK_EXTRA

            return (
              <motion.div
                key={i}
                className="tl-item"
                initial={{ opacity: 0, x: -60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* Spacer — aligns circle centre with the horizontal line */}
                <div style={{ height: spacer, flexShrink: 0 }} />

                {/* Circle */}
                <div
                  className="tl-circle"
                  style={{
                    width: size, height: size,
                    borderRadius: '50%',
                    background: bg,
                    flexShrink: 0,
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: pad,
                    textAlign: 'center',
                    gap: 4,
                    overflow: 'hidden',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.16)',
                  }}
                >
                  <span style={{ display: 'block', fontFamily: T.sans, fontSize: roleFs, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2, overflow: 'hidden', maxHeight: roleFs * 1.2 * 2 }}>
                    {job.role}
                  </span>
                  <span style={{ display: 'block', fontFamily: T.mono, fontSize: metaFs, color: 'rgba(255,255,255,0.68)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', lineHeight: 1.3 }}>
                    {job.company}
                  </span>
                  <span style={{ display: 'block', fontFamily: T.mono, fontSize: metaFs - 1, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>
                    {job.type}
                  </span>
                  <span style={{ display: 'block', fontFamily: T.sans, fontSize: descFs, color: 'rgba(255,255,255,0.86)', lineHeight: 1.35, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                    {job.desc}
                  </span>
                </div>

                {/* Vertical tick — drawn from circle centre (marginTop pulls it up) */}
                <div style={{
                  width: 1.5,
                  height: tickH,
                  background: bg,
                  marginTop: -radius,          // start at circle centre
                  flexShrink: 0,
                  position: 'relative', zIndex: 1,
                  opacity: 0.55,
                }} />

                {/* Dot at tick end */}
                <div style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: bg,
                  flexShrink: 0,
                  marginTop: -1,
                }} />

                {/* Date label */}
                <div style={{ textAlign: 'center', marginTop: 8, flexShrink: 0 }}>
                  <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 600, color: T.ink, letterSpacing: '0.04em', margin: '0 0 2px', whiteSpace: 'nowrap' }}>
                    {job.period}
                  </p>
                  <p style={{ fontFamily: T.mono, fontSize: 9, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
                    {job.months < 12
                      ? `${job.months} mo`
                      : `${Math.round(job.months / 12 * 10) / 10} yr`}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Experience + Tools sections ──────────────────────────────────────────────
const experience = [
  {
    role: 'Product Design + Strategy',
    company: 'Laminar Interactive',
    type: 'Freelance · Stealth AI startup',
    period: 'Mar 2026 – May 2026',
    bullets: [
      'AI-powered tool for architects to execute villa/bungalow projects in hours — developed product vision, user scenarios, research (surveys + moderated interviews).',
      'Built a working prototype using Claude, Nano Banana, and Vercel; trained model agents for site analysis and concept generation in 2D plans and 3D sectional views.',
    ],
  },
  {
    role: 'Product Lead — Design + Strategy',
    company: 'SlideXpress · Mindseye Creative',
    type: 'Full-time',
    period: 'Apr 2023 – Dec 2025',
    bullets: [
      'Co-visioned and built a subscription-based AI SaaS companion for consultants — improved workflow productivity by 40–55%. Led full PDLC: research, IA, wireframing, prototyping, developer handoffs.',
      'Identified critical dev-capacity gap and hired a frontend engineer whose performance set the benchmark for future engineering hires. Flagged 3rd-party dependency risk 12+ months before it stalled the product.',
    ],
  },
  {
    role: 'Senior UX Designer',
    company: 'Mindseye Creative',
    type: 'Full-time',
    period: '2022 – 2023',
    bullets: [
      'Led research-driven strategy across client engagements — identified behavioral insights that reframed positioning, resulting in 24% sales lift and ~130% engagement growth.',
      'Built complex websites with Webflow & Framer; leveraged behavioral analytics (Microsoft Clarity, Hotjar, Amplitude) for data-informed growth decisions.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Tata Consultancy Services',
    type: 'Full-time',
    period: 'Sept 2020 – Mar 2023',
    bullets: [
      'Designed integrated employee experience systems for TCS Vision 2025 — seamless workflows across workplace touchpoints.',
      "Conducted heuristic evaluation of Tata Neu app (Nielsen\u2019s principles), leading to 7% drop reduction during onboarding. Collaborated on hybrid work booking platform and COVID proximity-tracking app.",
    ],
  },
  {
    role: 'Instructional Design · Course Designer',
    company: 'LOM Digital × LearningMate',
    type: 'Freelance',
    period: 'Nov 2022 – Feb 2023',
    bullets: [
      'Designed structure, scope & sequence for "Introduction to Manufacturing: Product Design & Innovation" — an online elective for 9th–12th grade students in Pennsylvania.',
    ],
  },
]

function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        background: '#FCFCFA',
        fontFamily: T.sans,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Header strip */}
      <div style={{
        padding: '40px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `1px solid ${T.rule}`,
      }}>
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Experience
        </p>
        <span style={{ fontFamily: T.mono, fontSize: '40px', fontWeight: 500, color: T.rule, letterSpacing: '-0.03em' }}>
          05/
        </span>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 80px 80px' }}>
        {experience.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: '40px',
              borderBottom: i < experience.length - 1 ? `1px solid ${T.rule}` : 'none',
              padding: '40px 0',
            }}
          >
            {/* Left — meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '3px' }}>
              <span style={{ fontFamily: T.mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMute }}>
                {job.period}
              </span>
              <span style={{ fontFamily: T.mono, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                {job.type}
              </span>
            </div>

            {/* Right — content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
                  {job.role}
                </p>
                <p style={{ margin: 0, fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {job.company}
                </p>
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: '14px', color: '#3D3D38', lineHeight: 1.6, paddingLeft: '4px' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ToolsSection() {
  return (
    <section
      style={{
        background: '#F7F4EE',
        padding: '32px 0 40px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ padding: '0 80px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Tools I use
        </p>
      </div>
      <ToolsMarquee />
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

// ─── Work subsection with hover-orange label ──────────────────────────────────
function WorkSubSection({ label, children, topPadding = '56px' }: { label: string; children: React.ReactNode; topPadding?: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ padding: `${topPadding} 64px 0` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        style={{
          fontFamily: T.mono,
          fontSize: '17px',
          color: hovered ? '#FF4A1C' : '#52525b',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 20px',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </motion.p>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showUI] = useState(true)

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
        href="https://fonts.googleapis.com/css2?family=Allura&family=Glory:wght@700&family=Quicksand:wght@400;500;600&family=Felipa&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=JetBrains+Mono:wght@400;500&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes heroCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
@keyframes orangePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #D04D1F; }
          50% { opacity: 0.35; box-shadow: 0 0 2px #D04D1F; }
        }
        @keyframes blobMorph {
          0%   { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
          20%  { border-radius: 45% 55% 35% 65% / 65% 35% 60% 40%; }
          40%  { border-radius: 55% 45% 65% 35% / 42% 58% 45% 55%; }
          60%  { border-radius: 38% 62% 50% 50% / 55% 45% 58% 42%; }
          80%  { border-radius: 62% 38% 45% 55% / 45% 55% 38% 62%; }
          100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
        }
        .hero-blob {
          border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
          animation: blobMorph 9s ease-in-out infinite;
        }

      `}</style>

      <main style={{ background: T.dark }}>
        {/* Spacer blocks give each sticky section its own scroll budget */}
        {/* {showUI && <Nav />} */}

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — sticky, white bg, editorial layout
        ═══════════════════════════════════════════════════════════════════ */}
        <HeroSection />

        {/* ═══════════════════════════════════════════════════════════════════
            WORK — case studies + webflow builds
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="work"
          style={{
            position: 'relative',
            zIndex: 10,
            background: T.dark,
            borderRadius: '24px 24px 0 0',
            fontFamily: T.sans,
            paddingBottom: '80px',
          }}
        >
          {/* Header strip */}
          {/* Case Studies — 4 vertical cards */}
          <WorkSubSection label="Case Studies">
            <div className="case-studies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', gridAutoRows: '552px' }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  style={{ height: '100%' }}
                >
                  <CaseStudyCard project={project} />
                </motion.div>
              ))}
            </div>
          </WorkSubSection>

          {/* Webflow Builds — 2 columns */}
          <WorkSubSection label="Design + Low-code work on webflow" topPadding="96px">
            <div className="webflow-builds-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {webflowSites.map((site, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <WebflowCard site={site} />
                </motion.div>
              ))}
            </div>
          </WorkSubSection>

          {/* Behance Archive */}
          <WorkSubSection label="Notable previous work" topPadding="96px">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <a
                href="https://www.behance.net/lankeonkar"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: T.mono, fontSize: '11px', color: '#52525b', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
              >
                View on Behance →
              </a>
            </div>
            <div className="behance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {behanceProjects.map((project, i) => (
                <BehanceCard key={project.url} project={project} index={i} />
              ))}
            </div>
          </WorkSubSection>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ABOUT SECTION — normal scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <AboutSection />

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERIENCE — below behance
        ═══════════════════════════════════════════════════════════════════ */}
        <ExperienceTimeline />

        {/* ═══════════════════════════════════════════════════════════════════
            INDUSTRIAL DESIGN PHOTO GRID — normal scroll
        ═══════════════════════════════════════════════════════════════════ */}
        <IndustrialSection />

        {/* TEMPORARILY HIDDEN — Beyond Pixels / Arch + Industrial section */}
        {/* <ArchSection /> */}

        {/* ═══════════════════════════════════════════════════════════════════
            DOODLES — just above footer
        ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ background: T.paper, overflow: 'hidden', position: 'relative', padding: '48px 0', borderTop: '1px solid #E5E5E0' }}>
          <div style={{ padding: '0 64px 24px' }}>
            <p style={{ fontFamily: T.mono, fontSize: '11px', color: T.inkMute, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
              Raw sketches &amp; explorations
            </p>
            <p style={{ fontFamily: T.sans, fontSize: '22px', fontWeight: 500, color: T.ink, margin: 0, letterSpacing: '-0.02em' }}>
              Doodling on the go
            </p>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to right, ${T.paper}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'clamp(40px, 8vw, 80px)', background: `linear-gradient(to left, ${T.paper}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <SketchMarquee />
        </div>

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
            padding: 72px 24px 32px !important;
            height: auto !important;
            min-height: 100svh !important;
          }
          /* Stack: headline on top, card below */
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 24px 0 16px !important;
          }
          /* Card — full width, reduce padding */
          .hero-right-col {
            padding: 28px 24px !important;
          }
          /* Reduce card heading font size on tablet */
          .hero-right-col .hero-card-heading {
            font-size: 17px !important;
          }
          /* Reduce card body font size on tablet */
          .hero-right-col .hero-card-body {
            font-size: 13px !important;
          }
          /* Para-to-CTA spacing tighter on mobile */
          .hero-right-col > div:last-child {
            margin-top: 32px !important;
          }
          /* Hide vertical skills bar on mobile */
          .hero-skills-bar {
            display: none !important;
          }
          /* Badge repositioned for smaller padding */
          .hero-badge {
            top: 20px !important;
            left: 24px !important;
          }
          /* Blob — move to top-right of card, smaller */
          .hero-blob {
            width: 140px !important;
            height: 140px !important;
            top: -50px !important;
            left: auto !important;
            right: -30px !important;
          }
          /* Figure — hide on mobile (too large, overlaps layout) */
          .hero-figure {
            display: none !important;
          }

          /* Work section */
          .work-panel-header {
            padding: 24px 24px !important;
          }
          #work > div {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .case-studies-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .webflow-builds-grid {
            grid-template-columns: 1fr !important;
          }
          .webflow-iframe-wrap {
            height: 140px !important;
          }
          .medium-section {
            padding: 56px 24px !important;
          }
          .medium-grid {
            grid-template-columns: 1fr !important;
          }

          /* Behance */
          .behance-section {
            padding: 56px 24px !important;
          }
          .behance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Arch */
          #arch {
            padding: 56px 24px !important;
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
            padding: 48px 24px !important;
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Services */
          .services-header {
            padding: 32px 24px 28px !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--rule, #D9D6CE);
            padding: 32px 24px !important;
          }
          .services-grid > div:last-child {
            border-bottom: none !important;
          }

          /* Industrial / Beyond Pixels */
          .industrial-section {
            padding: 56px 24px !important;
          }
          .industrial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto !important;
          }
          .industrial-grid > div {
            height: 240px !important;
          }

          /* Experience Timeline */
          .tl-header {
            padding: 28px 24px !important;
          }
          .tl-wrap {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .tl-wrap::-webkit-scrollbar { display: none; }
          .tl-track {
            padding: 0 24px !important;
            gap: 20px !important;
          }
          .tl-circle {
            zoom: 0.65;
          }
          .tl-item {
            zoom: 0.65;
          }

        }

        /* ── Mobile (≤480px) ── */
        @media (max-width: 480px) {
          /* Hero */
          #hero {
            padding: 64px 18px 24px !important;
          }
          .hero-grid {
            gap: 20px !important;
            padding: 16px 0 12px !important;
          }
          .hero-right-col {
            padding: 24px 20px !important;
          }
          /* Blob — even smaller on phone */
          .hero-blob {
            width: 110px !important;
            height: 110px !important;
            top: -40px !important;
            right: -20px !important;
          }
          /* Further reduce card font sizes on small mobile */
          .hero-right-col .hero-card-heading {
            font-size: 15px !important;
          }
          .hero-right-col .hero-card-body {
            font-size: 12px !important;
          }
          .hero-right-col > div:last-child {
            margin-top: 24px !important;
          }

          /* Work section */
          .work-panel-header {
            padding: 20px 18px !important;
          }
          .case-studies-grid {
            grid-template-columns: 1fr !important;
          }

          /* Behance */
          .behance-section {
            padding: 48px 18px !important;
          }
          .behance-grid {
            grid-template-columns: 1fr !important;
          }

          /* Arch */
          #arch {
            padding: 48px 18px !important;
          }
          .arch-projects {
            grid-template-columns: 1fr !important;
          }

          /* About */
          .about-inner {
            padding: 40px 18px !important;
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Services */
          .services-grid > div {
            padding: 28px 18px !important;
          }

          /* Industrial / Beyond Pixels */
          .industrial-section {
            padding: 48px 18px !important;
          }
          .industrial-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .industrial-grid > div {
            height: 220px !important;
          }

          /* Experience Timeline */
          .tl-header {
            padding: 24px 18px !important;
          }
          .tl-item {
            zoom: 0.52;
          }
        }
      `}</style>
    </>
  )
}
