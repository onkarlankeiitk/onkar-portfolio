'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'


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

const contactLinks = [
  { label: 'Email',    href: 'mailto:onkarlanke.iitk@gmail.com',  display: 'onkarlanke.iitk@gmail.com',   external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/onkarlanke/', display: 'linkedin.com/in/onkarlanke', external: true  },
  { label: 'Phone',    href: 'tel:+918669882810',                  display: '+91 86698 82810',              external: false },
  { label: 'Resume',   href: '/ONKAR_LANKE.pdf', display: 'Download Resume', external: true },
]

const SPACE_MONO = '"Space Mono", "JetBrains Mono", monospace'
const ACCENT = '#FF4A1C'

function FooterContactBtn({ href, label, display, external }: { href: string; label: string; display: string; external: boolean }) {
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
        gap: '8px',
        fontFamily: SPACE_MONO,
        fontSize: '13px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? '#ffffff' : ACCENT,
        background: hovered ? ACCENT : 'transparent',
        padding: '6px 10px 6px 0',
        paddingLeft: hovered ? '10px' : '0',
        clipPath: hovered
          ? 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)'
          : 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease, background 0.2s ease, clip-path 0.2s ease, padding-left 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: hovered ? 0.7 : 0.5, transition: 'opacity 0.2s ease' }}>
        {label}
      </span>
      <span style={{
        textDecoration: hovered ? 'none' : 'underline',
        textDecorationColor: ACCENT,
        textUnderlineOffset: '6px',
        transition: 'text-decoration-color 0.2s ease',
      }}>{display}</span>
      <span style={{ fontSize: '15px', lineHeight: 1, textDecoration: 'none' }}>↗</span>
    </a>
  )
}

const navLinks = [
  { href: '/#work',    label: 'Work' },
  { href: '/#about',   label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

const roles = ['Senior UX Designer', 'Senior Product Designer', 'Usability Analyst']

function RolePill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        border: `1px solid ${hovered ? '#FF4A1C' : '#27272a'}`,
        borderRadius: '9999px',
        padding: '8px 20px',
        fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
        fontSize: '14px',
        color: hovered ? '#FF4A1C' : '#FF4A1C',
        letterSpacing: '0.04em',
        cursor: 'default',
        transition: 'border-color 0.2s ease, color 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  )
}

// ─── Origami SVG components ────────────────────────────────────────────────────
function OrigamiCrane({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,15 80,55 50,70 20,55" />
      <polygon points="20,55 50,70 10,80" />
      <polygon points="80,55 50,70 90,80" />
      <polyline points="50,15 60,5 65,12" />
      <polyline points="50,70 50,90 44,85" />
      <line x1="50" y1="15" x2="50" y2="70" />
      <line x1="20" y1="55" x2="80" y2="55" />
    </svg>
  )
}

function OrigamiFox({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,80 10,30 50,50 90,30" />
      <polygon points="10,30 20,5 35,30" />
      <polygon points="90,30 80,5 65,30" />
      <polygon points="50,50 44,62 56,62" />
      <line x1="10" y1="30" x2="90" y2="30" />
      <line x1="50" y1="30" x2="50" y2="80" />
    </svg>
  )
}

function OrigamiBoat({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="10,60 50,80 90,60 70,40 30,40" />
      <polygon points="50,40 50,10 75,40" />
      <line x1="50" y1="10" x2="50" y2="80" />
      <line x1="10" y1="60" x2="90" y2="60" />
    </svg>
  )
}

function OrigamiDiamond({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,5 95,50 50,95 5,50" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
      <polygon points="50,5 95,50 50,50" />
      <polygon points="5,50 50,50 50,95" />
    </svg>
  )
}

function OrigamiBird({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,20 85,50 50,65 15,50" />
      <polygon points="15,50 50,65 5,72" />
      <polygon points="85,50 50,65 95,72" />
      <polygon points="50,20 62,8 55,22" />
      <polyline points="50,65 45,82 50,78 55,82" />
      <line x1="15" y1="50" x2="85" y2="50" />
      <line x1="50" y1="20" x2="50" y2="65" />
    </svg>
  )
}

function OrigamiStar({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
    </svg>
  )
}

function OrigamiFlower({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF4A1C" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,10 60,40 90,40 68,58 76,88 50,72 24,88 32,58 10,40 40,40" />
      <polygon points="50,25 57,45 75,45 62,55 67,73 50,62 33,73 38,55 25,45 43,45" />
      <circle cx="50" cy="50" r="8" />
    </svg>
  )
}

// ─── Origami piece definitions ─────────────────────────────────────────────────
const PIECES = [
  { Component: OrigamiCrane,   size: 180, opacity: 0.12 },
  { Component: OrigamiFox,     size: 140, opacity: 0.10 },
  { Component: OrigamiBoat,    size: 160, opacity: 0.10 },
  { Component: OrigamiDiamond, size: 110, opacity: 0.14 },
  { Component: OrigamiBird,    size: 200, opacity: 0.09 },
  { Component: OrigamiStar,    size: 120, opacity: 0.12 },
  { Component: OrigamiFlower,  size: 130, opacity: 0.10 },
  { Component: OrigamiCrane,   size: 100, opacity: 0.09 },
  { Component: OrigamiFox,     size: 170, opacity: 0.10 },
  { Component: OrigamiBoat,    size: 90,  opacity: 0.13 },
  { Component: OrigamiStar,    size: 150, opacity: 0.09 },
  { Component: OrigamiBird,    size: 120, opacity: 0.12 },
  { Component: OrigamiDiamond, size: 140, opacity: 0.10 },
  { Component: OrigamiFlower,  size: 100, opacity: 0.13 },
  { Component: OrigamiCrane,   size: 220, opacity: 0.07 },
]

// ─── Animated origami layer ────────────────────────────────────────────────────
function AnimatedOrigami() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number; rot: number; rotV: number }[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()

    // Seed random state per piece
    stateRef.current = PIECES.map((p) => {
      const speed = 0.25 + Math.random() * 0.25
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * (width - p.size),
        y: Math.random() * (height - p.size),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 0.18,
      }
    })

    const tick = () => {
      const { width, height } = container.getBoundingClientRect()
      const s = stateRef.current

      for (let i = 0; i < s.length; i++) {
        const p = s[i]
        const size = PIECES[i].size

        p.x += p.vx
        p.y += p.vy
        p.rot += p.rotV

        // Boundary bounce
        if (p.x <= 0)           { p.x = 0;            p.vx =  Math.abs(p.vx); p.rotV *= -1 }
        if (p.x + size >= width) { p.x = width - size; p.vx = -Math.abs(p.vx); p.rotV *= -1 }
        if (p.y <= 0)            { p.y = 0;            p.vy =  Math.abs(p.vy); p.rotV *= -1 }
        if (p.y + size >= height){ p.y = height - size; p.vy = -Math.abs(p.vy); p.rotV *= -1 }

        const el = nodeRefs.current[i]
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`
      }

      // Piece-to-piece collision (circle approximation using half-size radius)
      for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length; j++) {
          const a = s[i], b = s[j]
          const ra = PIECES[i].size * 0.45
          const rb = PIECES[j].size * 0.45
          const cx_a = a.x + PIECES[i].size / 2
          const cy_a = a.y + PIECES[i].size / 2
          const cx_b = b.x + PIECES[j].size / 2
          const cy_b = b.y + PIECES[j].size / 2
          const dx = cx_a - cx_b
          const dy = cy_a - cy_b
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < ra + rb && dist > 0) {
            // Elastic 1D velocity exchange along collision normal
            const nx = dx / dist, ny = dy / dist
            const dvx = a.vx - b.vx, dvy = a.vy - b.vy
            const dot = dvx * nx + dvy * ny
            if (dot < 0) {
              a.vx -= dot * nx; a.vy -= dot * ny
              b.vx += dot * nx; b.vy += dot * ny
              // Playful spin reversal on hit
              a.rotV = -a.rotV + (Math.random() - 0.5) * 0.12
              b.rotV = -b.rotV + (Math.random() - 0.5) * 0.12
              // Separate overlapping pieces
              const overlap = (ra + rb - dist) / 2
              a.x += nx * overlap; a.y += ny * overlap
              b.x -= nx * overlap; b.y -= ny * overlap
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div ref={containerRef} aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {PIECES.map((piece, i) => (
        <div
          key={i}
          ref={el => { nodeRefs.current[i] = el }}
          style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform', filter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.8)) drop-shadow(0 0 16px rgba(249, 115, 22, 0.4))' }}
        >
          <piece.Component size={piece.size} opacity={piece.opacity} />
        </div>
      ))}
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; tags?: string[]; publication?: string }[]>([])

  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data.slice(0, 4)) })
      .catch(() => {})
  }, [])

  return (
    <>
    <style>{`
      .footer-root {
        padding: 80px 80px 48px;
      }
      .footer-top {
        gap: 64px;
      }

      .footer-bottom {
        padding-top: 48px;
      }
      @media (max-width: 768px) {
        .footer-root {
          padding: 48px 32px 36px !important;
          height: auto !important;
          min-height: 100svh;
        }
        .footer-articles-grid {
          grid-template-columns: 1fr !important;
        }
        .footer-headline {
          line-height: 1.05 !important;
        }
        .footer-top {
          flex-direction: column !important;
          gap: 40px !important;
        }

        .footer-contact-col {
          width: 100% !important;
        }
        .footer-bottom {
          padding-top: 32px !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 20px !important;
        }
        .footer-nav-links {
          gap: 16px !important;
        }
      }
      @media (max-width: 480px) {
        .footer-root {
          padding: 36px 20px 28px !important;
        }
        .footer-top {
          gap: 32px !important;
        }
        .footer-bottom {
          padding-top: 24px !important;
        }
      }
    `}</style>
    <footer
      id="contact"
      className="footer-root"
      style={{
        background: '#0A0A0A',
        minHeight: '100svh',
        fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedOrigami />

      {/* ── Top half ── */}
      <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>

        {/* Left — headline + roles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: '1 1 340px', maxWidth: '520px' }}
        >
          <h2 className="footer-headline" style={{ color: '#ffffff', fontSize: 'clamp(32px, 5vw, 80px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0, maxWidth: '14ch', fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif' }}>
            Open to full time roles
          </h2>

          {/* Role pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            {roles.map(role => <RolePill key={role} label={role} />)}
          </div>
        </motion.div>

        {/* Right — contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="footer-contact-col"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '0 0 auto', paddingTop: '8px', position: 'relative', zIndex: 1 }}
        >
          {contactLinks.map(link => (
            <FooterContactBtn
              key={link.label}
              href={link.href}
              label={link.label}
              display={link.display}
              external={link.external}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Medium articles strip ── */}
      {articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, borderTop: '1px solid #18181b', paddingTop: '32px' }}
        >
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '15px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '16px' }}>
            My articles
          </p>
          <div className="footer-articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#18181b' }}>
            {articles.map((a) => (
              <a
                key={a.link}
                href={a.link}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px', padding: '20px 24px', background: '#0A0A0A', textDecoration: 'none', transition: 'background 0.2s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#111'; (el.querySelector('.art-title') as HTMLElement).style.color = '#FF4A1C'; (el.querySelector('.art-arrow') as HTMLElement).style.color = '#FF4A1C' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0A0A0A'; (el.querySelector('.art-title') as HTMLElement).style.color = '#d4d4d8'; (el.querySelector('.art-arrow') as HTMLElement).style.color = '#3f3f46' }}
              >
                <p className="art-title" style={{ fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, color: '#d4d4d8', lineHeight: 1.45, margin: 0, letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>
                  {a.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {(a.tags ?? []).map(tag => (
                      <span key={tag} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#52525b', letterSpacing: '0.06em', background: '#18181b', padding: '2px 7px', borderRadius: '4px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="art-arrow" style={{ color: '#3f3f46', fontSize: '14px', flexShrink: 0, transition: 'color 0.2s ease' }}>↗</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Bottom navigation row ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="footer-bottom"
        style={{ borderTop: '1px solid #18181b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}
      >
        <span style={{ fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', fontSize: '12px', color: '#52525b', letterSpacing: '0.05em' }}>
          Onkar Lanke
        </span>

        <div className="footer-nav-links" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              style={{ color: '#52525b', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s ease', fontFamily: '"Inter Tight", system-ui, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <span style={{ fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', fontSize: '12px', color: '#3f3f46' }}>
          © {new Date().getFullYear()}
        </span>
      </motion.div>
    </footer>
    </>
  )
}
