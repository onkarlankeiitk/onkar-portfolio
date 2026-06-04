'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const contactLinks = [
  { label: 'Email',    href: 'mailto:onkarlanke.iitk@gmail.com',  display: 'onkarlanke.iitk@gmail.com',   external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/onkarlanke/', display: 'linkedin.com/in/onkarlanke', external: true  },
  { label: 'Phone',    href: 'tel:+918669882810',                  display: '+91 86698 82810',              external: false },
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing', display: 'Download Resume ↗', external: true },
]

const navLinks = [
  { href: '/#work',    label: 'Work' },
  { href: '/#about',   label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

const roles = ['Lead designer', 'Product Manager', 'Innovation Manager']

function RolePill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        border: `1px solid ${hovered ? '#f97316' : '#27272a'}`,
        borderRadius: '9999px',
        padding: '8px 20px',
        fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
        fontSize: '14px',
        color: hovered ? '#f97316' : '#f97316',
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
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
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
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
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
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="10,60 50,80 90,60 70,40 30,40" />
      <polygon points="50,40 50,10 75,40" />
      <line x1="50" y1="10" x2="50" y2="80" />
      <line x1="10" y1="60" x2="90" y2="60" />
    </svg>
  )
}

function OrigamiDiamond({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
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
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
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
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
    </svg>
  )
}

function OrigamiFlower({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#f97316" strokeWidth="0.8" strokeLinejoin="round" opacity={opacity}>
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
  return (
    <>
    <style>{`
      .footer-root {
        padding: 80px 80px 48px;
      }
      .footer-top {
        gap: 64px;
      }
      .footer-contact-btn {
        min-width: 280px;
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
        .footer-headline {
          line-height: 1.05 !important;
        }
        .footer-top {
          flex-direction: column !important;
          gap: 40px !important;
        }
        .footer-contact-btn {
          min-width: 0 !important;
          width: 100% !important;
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
        height: '100svh',
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
            Open to <em style={{ fontStyle: 'italic' }}>full time roles</em> and <em style={{ fontStyle: 'italic' }}>creative collabs!</em>
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
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="footer-contact-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', border: '1px solid #3f3f46', borderRadius: '9999px', padding: '12px 24px', color: '#d4d4d8', fontSize: '14px', textDecoration: 'none', transition: 'border-color 0.2s ease, color 0.2s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#f97316'; el.style.color = '#f97316' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3f3f46'; el.style.color = '#d4d4d8' }}
            >
              <span style={{ fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b' }}>
                {link.label}
              </span>
              <span style={{ fontSize: '13px' }}>{link.display}</span>
            </a>
          ))}
        </motion.div>
      </div>

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
