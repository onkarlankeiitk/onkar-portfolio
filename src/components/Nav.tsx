'use client'

import { useEffect, useRef, useState } from 'react'
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

// ─── Glass token computed per theme ──────────────────────────────────────────
function glassTokens(isLight: boolean) {
  if (isLight) {
    return {
      bg:           'rgba(244, 242, 236, 0.62)',
      border:       'rgba(180, 174, 163, 0.55)',
      innerGlow:    'rgba(255, 255, 255, 0.72)',
      shadow:       '0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.72) inset',
      logoColor:    '#0B0B0B',
      linkColor:    '#8A8A85',
      linkHover:    '#D04D1F',
      hamburger:    '#0B0B0B',
      divider:      'rgba(180, 174, 163, 0.5)',
    }
  }
  return {
    bg:           'rgba(12, 12, 12, 0.52)',
    border:       'rgba(255, 255, 255, 0.08)',
    innerGlow:    'rgba(255, 255, 255, 0.06)',
    shadow:       '0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset',
    logoColor:    '#ffffff',
    linkColor:    '#71717a',
    linkHover:    '#D04D1F',
    hamburger:    '#ffffff',
    divider:      'rgba(255,255,255,0.08)',
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
      {/* Animated underline */}
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
      href="mailto:onkar@example.com"
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
      Get in touch
    </a>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [visible, setVisible]   = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, setIsLight]   = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsLight(y < window.innerHeight * 0.85)
      if (y < 80) { setVisible(true); lastY.current = y; return }
      if (y < lastY.current - 4)       setVisible(true)
      else if (y > lastY.current + 4) { setVisible(false); setMenuOpen(false) }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const g = glassTokens(isLight)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav-wrapper"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{ y: -80,    opacity: 0 }}
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
          <nav
            style={{
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              background: g.bg,
              border: `1px solid ${g.border}`,
              borderRadius: '14px',
              boxShadow: g.shadow,
              transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              overflow: 'hidden',
            }}
          >
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
                <CTAPill isLight={isLight} />
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
                        {link.label}
                      </Link>
                    ))}
                    <div style={{ paddingTop: '14px' }}>
                      <CTAPill isLight={isLight} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
