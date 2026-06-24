'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  sans: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
}

const navLinks = [
  { href: '/#work',     label: 'Work' },
  { href: '/#about',    label: 'About' },
  { href: '/projects',  label: 'All Projects' },
]

// ─── Liquid glass tokens per theme ───────────────────────────────────────────
function glassTokens(isLight: boolean) {
  if (isLight) {
    return {
      // Base glass tint — very light warm white
      bg:             'rgba(255, 255, 255, 0.12)',
      // Layered gradient: top-left specular → base tint → bottom-right tint
      glassGradient:  'linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(244,242,236,0.10) 55%, rgba(230,228,220,0.16) 100%)',
      // Iridescent shimmer (subtle rainbow tint)
      iridescence:    'linear-gradient(120deg, rgba(255,180,160,0.07) 0%, rgba(160,180,255,0.07) 40%, rgba(160,255,200,0.06) 100%)',
      border:         'rgba(255, 255, 255, 0.75)',
      // Multi-layer shadow: top specular inset + depth shadow + bottom inner shadow
      shadow:         '0 1px 0 rgba(255,255,255,0.95) inset, 0 -1px 0 rgba(0,0,0,0.06) inset, 0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      logoColor:      '#0B0B0B',
      linkColor:      '#7A7A75',
      linkHover:      '#D04D1F',
      hamburger:      '#0B0B0B',
      divider:        'rgba(180, 174, 163, 0.45)',
    }
  }
  return {
    bg:             'rgba(14, 14, 18, 0.18)',
    glassGradient:  'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.04) 100%)',
    iridescence:    'linear-gradient(120deg, rgba(255,140,100,0.07) 0%, rgba(120,140,255,0.07) 40%, rgba(100,255,200,0.06) 100%)',
    border:         'rgba(255, 255, 255, 0.18)',
    shadow:         '0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.35) inset, 0 16px 56px rgba(0,0,0,0.50), 0 4px 12px rgba(0,0,0,0.25)',
    logoColor:      '#ffffff',
    linkColor:      '#8A8A92',
    linkHover:      '#D04D1F',
    hamburger:      '#ffffff',
    divider:        'rgba(255,255,255,0.10)',
  }
}

// ─── Nav link with animated underline ────────────────────────────────────────
function NavLink({ href, label, color, hoverColor }: { href: string; label: string; color: string; hoverColor: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      style={{
        position: 'relative',
        fontFamily: T.sans,
        fontSize: '13px',
        fontWeight: 450,
        letterSpacing: '-0.01em',
        color: hovered ? hoverColor : color,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        paddingBottom: '2px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: 0, left: 0,
        height: '1px',
        width: hovered ? '100%' : '0%',
        background: hoverColor,
        transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1)',
        display: 'block',
      }} />
    </Link>
  )
}

// ─── CTA pill ─────────────────────────────────────────────────────────────────
function CTAPill({ isLight }: { isLight: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="/ONKAR_LANKE.pdf"
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontFamily: T.sans, fontSize: '12px', fontWeight: 500,
        letterSpacing: '-0.01em',
        color: isLight ? (hovered ? '#ffffff' : '#0B0B0B') : (hovered ? '#0B0B0B' : '#ffffff'),
        background: isLight
          ? (hovered ? '#0B0B0B' : 'rgba(11,11,11,0.08)')
          : (hovered ? '#ffffff' : 'rgba(255,255,255,0.1)'),
        border: `1px solid ${isLight ? 'rgba(11,11,11,0.15)' : 'rgba(255,255,255,0.14)'}`,
        borderRadius: '9999px',
        padding: '7px 16px',
        textDecoration: 'none',
        transition: 'all 0.22s ease',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      View resume
    </a>
  )
}

// ─── LinkedIn icon button ─────────────────────────────────────────────────────
function LinkedInIcon({ isLight }: { isLight: boolean }) {
  const [hovered, setHovered] = useState(false)
  const color = isLight
    ? (hovered ? '#0A66C2' : '#0B0B0B')
    : (hovered ? '#0A66C2' : '#ffffff')
  return (
    <a
      href="https://www.linkedin.com/in/onkarlanke/"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px', borderRadius: '9999px',
        color,
        transition: 'color 0.22s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, setIsLight]   = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsLight(y < window.innerHeight * 0.85)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const g = glassTokens(isLight)

  return (
    <>
      {/* Shimmer keyframe animation */}
      <style>{`
        @keyframes liquidShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .liquid-shimmer {
          background-size: 300% 300%;
          animation: liquidShimmer 8s ease infinite;
        }
      `}</style>

      <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '16px',
              left: 0,
              right: 0,
              width: 'calc(100% - 48px)',
              maxWidth: '1120px',
              margin: '0 auto',
              zIndex: 50,
            }}
          >
            {/* Gradient border wrapper */}
            <div style={{
              background: isLight
                ? 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(200,196,188,0.5) 60%, rgba(255,255,255,0.6) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.14) 100%)',
              borderRadius: '9999px',
              padding: '1px',
              transition: 'background 0.35s ease',
            }}>
              <nav
                style={{
                  position: 'relative',
                  backdropFilter: 'blur(48px) saturate(220%) brightness(1.04)',
                  WebkitBackdropFilter: 'blur(48px) saturate(220%) brightness(1.04)',
                  background: g.bg,
                  borderRadius: '9999px',
                  boxShadow: g.shadow,
                  transition: 'background 0.35s ease, box-shadow 0.35s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Glass gradient layer */}
                <div aria-hidden style={{
                  position: 'absolute',
                  inset: 0,
                  background: g.glassGradient,
                  borderRadius: '9999px',
                  pointerEvents: 'none',
                  zIndex: 0,
                  transition: 'background 0.35s ease',
                }} />

                {/* Iridescent shimmer layer */}
                <div
                  aria-hidden
                  className="liquid-shimmer"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: g.iridescence,
                    borderRadius: '9999px',
                    pointerEvents: 'none',
                    zIndex: 0,
                    transition: 'background 0.35s ease',
                  }}
                />

                {/* Content layer — sits above overlays */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Main bar */}
                  <div style={{
                    padding: '13px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    {/* Logo */}
                    <Link
                      href="/#hero"
                      style={{
                        fontFamily: T.sans,
                        fontWeight: 600,
                        fontSize: '15px',
                        letterSpacing: '-0.02em',
                        color: g.logoColor,
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Onkar Lanke
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex" style={{ alignItems: 'center', gap: '28px' }}>
                      {navLinks.map(link => (
                        <NavLink
                          key={link.href}
                          href={link.href}
                          label={link.label}
                          color={g.linkColor}
                          hoverColor={g.linkHover}
                        />
                      ))}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LinkedInIcon isLight={isLight} />
                        <CTAPill isLight={isLight} />
                      </div>
                    </div>

                    {/* Hamburger — mobile only */}
                    <button
                      className="flex md:hidden"
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center',
                        width: '36px', height: '36px', gap: '5px',
                        cursor: 'pointer', background: 'none', border: 'none', padding: 0,
                      }}
                      onClick={() => setMenuOpen(o => !o)}
                      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                      aria-expanded={menuOpen}
                      aria-controls="mobile-nav"
                    >
                      {[
                        menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                        'none',
                        menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                      ].map((transform, i) => (
                        <span
                          key={i}
                          style={{
                            display: 'block',
                            width: '18px', height: '1.5px',
                            background: g.hamburger,
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transformOrigin: 'center',
                            transform,
                            opacity: i === 1 && menuOpen ? 0 : 1,
                          }}
                        />
                      ))}
                    </button>
                  </div>

                  {/* Mobile dropdown */}
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        id="mobile-nav"
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                        className="md:hidden"
                      >
                        <div style={{
                          borderTop: `1px solid ${g.divider}`,
                          padding: '16px 20px 20px',
                          display: 'flex', flexDirection: 'column', gap: '4px',
                        }}>
                          {navLinks.map(link => (
                            <Link
                              key={link.href}
                              href={link.href}
                              style={{
                                fontFamily: T.sans, fontSize: '15px', fontWeight: 450,
                                color: g.linkColor, textDecoration: 'none',
                                padding: '10px 0',
                                borderBottom: `1px solid ${g.divider}`,
                                transition: 'color 0.2s ease',
                                letterSpacing: '-0.01em',
                              }}
                              onClick={() => setMenuOpen(false)}
                              onMouseEnter={e => (e.currentTarget.style.color = g.linkHover)}
                              onMouseLeave={e => (e.currentTarget.style.color = g.linkColor)}
                            >
                              {link.href === navLinks[navLinks.length - 1].href
                                ? link.label
                                : link.label}
                            </Link>
                          ))}
                          <div style={{ paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LinkedInIcon isLight={isLight} />
                            <CTAPill isLight={isLight} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>
          </motion.div>
    </>
  )
}
