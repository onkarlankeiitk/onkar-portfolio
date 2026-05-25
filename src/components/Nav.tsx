'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ORANGE = '#f97316'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'All Projects' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, setIsLight] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsLight(y < window.innerHeight * 0.85)
      if (y < 80) { setVisible(true); lastY.current = y; return }
      if (y < lastY.current - 4) setVisible(true)
      else if (y > lastY.current + 4) { setVisible(false); setMenuOpen(false) }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mutedColor = isLight ? '#8A8A85' : '#a1a1aa'

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 50,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: isLight ? 'rgba(244,242,236,0.92)' : 'rgba(10,10,10,0.85)',
            borderBottom: `1px solid ${isLight ? '#D9D6CE' : '#18181b'}`,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          {/* Main bar */}
          <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <Link
              href="/#hero"
              style={{
                fontFamily: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                letterSpacing: '-0.02em',
                color: isLight ? '#0B0B0B' : '#ffffff',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              Onkar Lanke
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {/* Desktop nav links — hidden on mobile/tablet (< 1024px) */}
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: mutedColor,
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    fontFamily: '"Inter Tight", system-ui, sans-serif',
                  }}
                  className="hidden lg:block"
                  onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Hamburger — mobile + tablet only (< 1024px) */}
              <div className="lg:hidden">
              <button
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '36px',
                  height: '36px',
                  gap: '6px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                {[
                  menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                  'none',
                  menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                ].map((transform, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '2px',
                      background: isLight ? '#0B0B0B' : '#ffffff',
                      transition: 'transform 0.3s ease, opacity 0.3s ease, background 0.3s ease',
                      transformOrigin: 'center',
                      transform,
                      opacity: i === 1 && menuOpen ? 0 : 1,
                    }}
                  />
                ))}
              </button>
              </div>
            </div>
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
                style={{
                  overflow: 'hidden',
                  borderTop: `1px solid ${isLight ? '#D9D6CE' : '#18181b'}`,
                }}
                className="lg:hidden"
              >
                <div style={{ padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        color: mutedColor,
                        fontSize: '16px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        fontFamily: '"Inter Tight", system-ui, sans-serif',
                      }}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                      onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
