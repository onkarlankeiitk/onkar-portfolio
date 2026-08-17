'use client'

import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const BG        = '#FCFCFA'
const INK       = '#141414'
const MUTED     = '#8A8A85'
const RULE      = '#D9D6CE'
const ACCENT    = '#FF4A1C'
const SANS      = '"Helvetica Neue", Helvetica, Arial, sans-serif'
const MONO      = "'Space Mono', monospace"

const ease = [0.22, 1, 0.36, 1] as const

// ─── Skills data ──────────────────────────────────────────────────────────────
const skills = [
  {
    heading: 'UX Research',
    items: [
      'Literature or secondary',
      'Behavioral mapping',
      'Contextual inquiry',
      'Surveys',
      'Focus groups',
      'Ethnographic research',
      'Usability testing',
      'Heuristic evaluation',
      'A/B testing',
      'Data analytics',
    ],
  },
  {
    heading: 'Design',
    items: [
      'Concept generation',
      'Wireframes',
      'Information Architecture',
      'Navigation Structures',
      'Personas & Journey mapping',
      'Story boarding',
      'Design Systems',
      'Prototyping',
      'Product Spec Docs',
      'VisualUI',
      '3D modeling',
      'Accessibility (WCAG)',
      'Inclusive Design',
    ],
  },
  {
    heading: 'Tech',
    items: [
      'HTML',
      'CSS',
      'JS',
      'Python',
      'Data analytics',
      'GitHub VC',
    ],
  },
]

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '5+',  label: 'Years Designing' },
  { value: '20+', label: 'Cross-Domain' },
  { value: '5',   label: 'Industries' },
]

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 14V4M9 4L4 9M9 4L14 9" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: INK, fontFamily: SANS }}>
      <Nav />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        {/* ── Two-column grid ── */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}>

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Headline */}
            <h1 style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: INK,
            }}>
              Thriving on Curiosity &amp; Experimentation&hellip;
            </h1>

            {/* Photo */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '4px',
              overflow: 'hidden',
              border: `1px solid ${RULE}`,
            }}>
              <img
                src="/onkar.webp"
                alt="Onkar Lanke"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Stats row */}
            <div style={{
              display: 'flex',
              gap: '0',
              borderTop: `1px solid ${RULE}`,
              paddingTop: '24px',
            }}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    paddingRight: i < stats.length - 1 ? '24px' : 0,
                    borderRight: i < stats.length - 1 ? `1px solid ${RULE}` : 'none',
                    paddingLeft: i > 0 ? '24px' : 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <ArrowUp />
                    <span style={{
                      fontFamily: SANS,
                      fontWeight: 700,
                      fontSize: '28px',
                      letterSpacing: '-0.04em',
                      color: INK,
                      lineHeight: 1,
                    }}>{stat.value}</span>
                  </div>
                  <p style={{
                    margin: 0,
                    fontFamily: MONO,
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: MUTED,
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            {/* Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#3a3a36',
              }}>
                I&rsquo;m an engineer turned designer, &amp; I simply love product building!
                Through extensive explorations, I bring insights to the forefront &amp;
                ship intentional, desirable experiences, for various outcomes like
                improved user satisfaction, enhanced onboarding, increase in
                task completions and product growth.
              </p>
              <p style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#3a3a36',
              }}>
                People say, &ldquo;<span style={{ color: INK, fontWeight: 500 }}>Good Design shapes you.</span>&rdquo; Design has made me
                more humble, an active listener, &amp; importance of putting your
                heart into every small detail, as I feel designers do an incredible
                job making spaces more liveable and desirable.
              </p>
            </div>

            {/* Skills grid */}
            <div style={{
              border: `1px solid ${RULE}`,
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: `1px solid ${RULE}`,
              }}>
                {skills.map((col, i) => (
                  <div
                    key={col.heading}
                    style={{
                      padding: '10px 16px',
                      fontFamily: MONO,
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: INK,
                      borderRight: i < skills.length - 1 ? `1px solid ${RULE}` : 'none',
                    }}
                  >
                    {col.heading}
                  </div>
                ))}
              </div>

              {/* Items */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {skills.map((col, i) => (
                  <div
                    key={col.heading}
                    style={{
                      padding: '16px',
                      borderRight: i < skills.length - 1 ? `1px solid ${RULE}` : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {col.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <span style={{
                          flexShrink: 0,
                          marginTop: '6px',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: MUTED,
                          display: 'block',
                        }} />
                        <span style={{
                          fontFamily: SANS,
                          fontSize: '12px',
                          lineHeight: 1.6,
                          color: '#3a3a36',
                        }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
