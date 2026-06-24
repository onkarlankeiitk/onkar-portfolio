'use client'

/**
 * Editorial Landing Page — follows CLAUDE.md design system exactly.
 * Warm off-white paper · near-black ink · editorial blue accent
 * No gradients · no shadows · no blobs · type-led · Swiss-influenced
 *
 * Archetypes used (CLAUDE.md §8):
 *   Hero   → E (cover) + C (display headline)
 *   Work   → C (display headline + indexed cards + curved connector)
 *   About  → B (venn / circles) adapted for 3-column grid
 *   Footer → E (section break) + contact
 */

import Link from 'next/link'

// ── DATA ────────────────────────────────────────────────────────────────────
const projects = [
  {
    num: '01', company: 'SlideXpress', year: '2024',
    title: 'Deck-Up\nSaaS for Consultants',
    metric: '45–60%', metricLabel: 'productivity gain',
    slug: 'deckup',
  },
  {
    num: '02', company: 'Diamond India Limited', year: '2024',
    title: 'KYC &\nCustomer Management',
    metric: '55%', metricLabel: 'onboarding time cut',
    slug: 'dil-kyc',
  },
  {
    num: '03', company: 'Commongood, USA', year: '2023',
    title: 'Research &\nGrowth Strategy',
    metric: '43%', metricLabel: 'content engagement',
    slug: 'research-strategy',
  },
  {
    num: '04', company: 'Mindseye Creative', year: '2023',
    title: 'Gamification\nin Fintech',
    metric: '85%', metricLabel: 'usability score',
    slug: 'fintech-gamification',
  },
]

const expertise = [
  {
    num: '01', title: 'Design',
    body: 'UX research · wireframing · prototyping · visual design · design systems · information architecture · interaction design. Figma · Webflow · Framer.',
  },
  {
    num: '02', title: 'Research',
    body: 'Primary & secondary research · usability testing · behavioral analytics · heuristic evaluation · experience mapping. Hotjar · Amplitude · Clarity.',
  },
  {
    num: '03', title: 'Strategy',
    body: 'Product strategy & roadmapping · RICE framework · GTM strategy · conversion funnel design · feature prioritisation · stakeholder management.',
  },
]

// ── PRIMITIVES ──────────────────────────────────────────────────────────────

/** Small + registration mark — decorative, disciplined. §6 shape vocabulary */
function Plus({ top, right, bottom, left }: { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
      style={{ position: 'absolute', top, right, bottom, left, pointerEvents: 'none' }}
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke="var(--ink-mute)" strokeWidth="1" />
      <line x1="0" y1="6" x2="12" y2="6" stroke="var(--ink-mute)" strokeWidth="1" />
    </svg>
  )
}

/** Hairline rule — 1px solid --rule */
function Rule({ style }: { style?: React.CSSProperties }) {
  return <div aria-hidden style={{ height: 1, background: 'var(--rule)', ...style }} />
}

/** Pill — the system's signature shape. §6 shape vocabulary */
function Pill({ children, variant = 'filled', href, target }: {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  href?: string
  target?: string
}) {
  const s: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 9999,
    padding: '0 28px',
    height: 48,
    fontFamily: 'var(--mono)',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    cursor: href ? 'pointer' : 'default',
    ...(variant === 'filled'
      ? { background: 'var(--ink)', color: 'var(--paper)' }
      : { background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--ink)' }),
  }
  if (href) return <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} style={s}>{children}</a>
  return <span style={s}>{children}</span>
}

/** Mono caption label */
function Meta({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)',
      ...style,
    }}>
      {children}
    </span>
  )
}

// ── SLIDE CHROME HELPERS ────────────────────────────────────────────────────

/** Top chrome strip: kicker left, slide-number right. §7 */
function Chrome({ kicker, slideNum }: { kicker: string; slideNum: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 16 }}>
        <Meta>{kicker}</Meta>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 40,
          fontWeight: 400,
          color: 'var(--ink-mute)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {slideNum}
        </span>
      </div>
      <Rule />
    </div>
  )
}

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="ed-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'var(--paper)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div className="ed-nav-inner" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: 64, padding: '0 80px',
      }}>
        {/* Left: deck title + name */}
        <div>
          <Meta style={{ display: 'block', lineHeight: 1 }}>Portfolio</Meta>
          <Link href="/editorial#hero" style={{
            fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500,
            color: 'var(--ink)', letterSpacing: '-0.01em', textDecoration: 'none',
            display: 'block', lineHeight: 1.3, marginTop: 2,
          }}>
            Onkar Lanke
          </Link>
        </div>

        {/* Right: nav links + available pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Work', 'About', 'Contact'].map(label => (
            <Link key={label} href={`/editorial#${label.toLowerCase()}`} style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--ink-mute)', textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}

          {/* Availability indicator — outline pill with dot */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 16px', height: 36, borderRadius: 9999,
            border: '1.5px solid var(--rule)',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--ink-mute)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2E7D32', flexShrink: 0 }} />
            Available
          </div>
        </div>
      </div>
    </nav>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────
/**
 * Archetype: E (cover) + C (display headline).
 * Giant ghost word · kicker pill · 3-line tight headline · mono supporting copy · CTAs.
 */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100svh',
      padding: '64px 80px',
      paddingTop: 136,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Registration marks — four corners */}
      <Plus top={80} left={80} />
      <Plus top={80} right={80} />
      <Plus bottom={80} left={80} />
      <Plus bottom={80} right={80} />

      {/* Ghost display word — behind content, --rule-soft */}
      <span aria-hidden style={{
        position: 'absolute',
        top: '50%', right: -40,
        transform: 'translateY(-50%)',
        fontFamily: 'var(--sans)',
        fontSize: 'clamp(180px, 26vw, 340px)',
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: 0.92,
        color: 'var(--rule-soft)',
        userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>
        Design
      </span>

      {/* Slide number top-right */}
      <span style={{
        position: 'absolute', top: 88, right: 80,
        fontFamily: 'var(--mono)', fontSize: 48, fontWeight: 400,
        color: 'var(--ink-mute)', letterSpacing: '-0.02em', lineHeight: 1,
      }}>
        01/
      </span>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 920 }}>

        {/* Kicker outline pill */}
        <div style={{ marginBottom: 32 }}>
          <Pill variant="outline">01&nbsp;&nbsp;Product Designer &amp; UX Researcher</Pill>
        </div>

        {/* Sub-kicker mono */}
        <Meta style={{ display: 'block', marginBottom: 16 }}>
          5+ Years — Research · Design · Strategy · Storytelling
        </Meta>

        {/* Hero headline — tight tracked, weight 500 */}
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(64px, 9vw, 136px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 0.92,
          color: 'var(--ink)',
          margin: '0 0 48px',
          maxWidth: '12ch',
        }}>
          Connecting dots,<br />
          bridging Tech<br />
          <span style={{ color: 'var(--accent)' }}>&amp; Design.</span>
        </h1>

        {/* Supporting copy */}
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 22, fontWeight: 400,
          color: 'var(--ink-mute)',
          letterSpacing: '-0.005em',
          lineHeight: 1.45,
          maxWidth: '44ch',
          margin: '0 0 48px',
        }}>
          Designer. Researcher. Strategist. Storyteller.
          Crafting end-to-end product experiences and research-based strategies.
        </p>

        {/* CTA pills */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Pill variant="filled" href="mailto:onkarlanke.iitk@gmail.com">
            Contact Me &rarr;
          </Pill>
          <Pill variant="outline" href="https://www.linkedin.com/in/onkarlanke/" target="_blank">
            LinkedIn
          </Pill>
          <Pill variant="outline" href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing" target="_blank">
            Resume
          </Pill>
        </div>
      </div>

      {/* Bottom-right supporting meta */}
      <div style={{
        position: 'absolute', bottom: 64, right: 80,
        textAlign: 'right',
      }}>
        <Meta style={{ display: 'block' }}>Mumbai, India</Meta>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 12,
          color: 'var(--ink-mute)', display: 'block', marginTop: 4,
        }}>
          onkarlanke.iitk@gmail.com
        </span>
      </div>

      {/* Bottom hairline */}
      <Rule style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  )
}

// ── WORK ─────────────────────────────────────────────────────────────────────
/**
 * Archetype C — display headline + indexed cards + curved SVG connector.
 * CLAUDE.md §8 C: kicker pill, massive headline, 4-up cards, curved connector.
 */
function Work() {
  return (
    <section id="work" style={{ padding: '96px 80px', position: 'relative' }}>

      <Chrome kicker="Selected Work" slideNum="02/" />

      {/* Headline row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', gap: 32, marginBottom: 64,
      }}>
        <div>
          <div style={{ marginBottom: 24 }}>
            <Pill variant="outline">02&nbsp;&nbsp;Design Process</Pill>
          </div>
          <h2 style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 0.92,
            color: 'var(--ink)',
            margin: 0,
          }}>
            Case Studies
          </h2>
        </div>

        {/* Top-right mono supporting copy — CLAUDE.md §8 C */}
        <p style={{
          fontFamily: 'var(--mono)', fontSize: 12,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: 'var(--ink-mute)', maxWidth: '22ch',
          lineHeight: 1.55, flexShrink: 0, textAlign: 'right',
        }}>
          End-to-end product design<br />
          from research to delivery
        </p>
      </div>

      {/* 4-up card row */}
      <div className="ed-grid-4" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        position: 'relative',
      }}>
        {projects.map(project => (
          <Link key={project.slug} href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--rule)',
              boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
              padding: 32,
              height: '100%',
              display: 'flex', flexDirection: 'column',
              cursor: 'pointer',
              transition: 'border-color 200ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--rule)')}
            >
              {/* Number + year */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 24,
              }}>
                <Meta>{project.num}</Meta>
                <Meta>{project.year}</Meta>
              </div>

              {/* Company */}
              <Meta style={{ display: 'block', marginBottom: 12 }}>
                {project.company}
              </Meta>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 500,
                letterSpacing: '-0.01em', lineHeight: 1.25,
                color: 'var(--ink)',
                margin: '0 0 32px',
                flex: 1,
                whiteSpace: 'pre-line',
              }}>
                {project.title}
              </h3>

              {/* Metric — over a hairline rule */}
              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 24 }}>
                <div style={{
                  fontFamily: 'var(--sans)', fontSize: 40, fontWeight: 500,
                  letterSpacing: '-0.02em', lineHeight: 1,
                  color: 'var(--ink)', marginBottom: 6,
                }}>
                  {project.metric}
                </div>
                <Meta>{project.metricLabel}</Meta>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Curved SVG connector — CLAUDE.md §9 recipe */}
      <svg
        viewBox="0 0 1760 80" preserveAspectRatio="none"
        style={{ width: '100%', height: 48, display: 'block', marginTop: -1 }}
        aria-hidden
      >
        <path
          d="M 0 8
             C 80 8 140 72 220 72
             S 360 8  440 8
             S 560 72 660 72
             S 780 8  880 8
             S 1000 72 1100 72
             S 1220 8  1320 8
             S 1440 72 1540 72
             S 1660 8  1760 8"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1.25"
        />
      </svg>

      <Rule style={{ marginTop: 96 }} />
    </section>
  )
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
/**
 * Archetype B (adapted) — ghost display word behind 3 columns.
 * Thin circle markers · numbered titles · dotted vertical guides between columns.
 */
function About() {
  return (
    <section id="about" style={{ padding: '96px 80px', position: 'relative', overflow: 'hidden' }}>

      <Chrome kicker="Expertise" slideNum="03/" />

      {/* Ghost display word — CLAUDE.md §8 B */}
      <span aria-hidden style={{
        position: 'absolute',
        top: '50%', left: -24,
        transform: 'translateY(-50%)',
        fontFamily: 'var(--sans)',
        fontSize: 'clamp(140px, 20vw, 260px)',
        fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.92,
        color: 'var(--rule-soft)',
        userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>
        Process
      </span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64 }}>
          <Pill variant="outline">03&nbsp;&nbsp;Expertise</Pill>
        </div>

        {/* 3-column grid with dotted vertical dividers */}
        <div className="ed-grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          position: 'relative',
        }}>

          {/* Dotted vertical guide between columns — CLAUDE.md §6 shape vocabulary */}
          {[1, 2].map(i => (
            <div key={i} aria-hidden style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: `${(i / 3) * 100}%`,
              width: 1,
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--rule) 0px, var(--rule) 4px, transparent 4px, transparent 10px)',
              pointerEvents: 'none',
            }} />
          ))}

          {expertise.map((item, idx) => (
            <div key={item.num} style={{
              padding: '48px 40px',
              position: 'relative',
              ...(idx > 0 ? {} : {}),
            }}>
              {/* + mark at top-right of each cell */}
              <Plus top={24} right={24} />

              {/* Thin circle marker — CLAUDE.md §6 */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '1px solid var(--ink-mute)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <Meta>{item.num}</Meta>
              </div>

              {/* Section title */}
              <h3 style={{
                fontFamily: 'var(--sans)', fontSize: 40, fontWeight: 500,
                letterSpacing: '-0.015em', lineHeight: 1.1,
                color: 'var(--ink)', margin: '0 0 24px',
              }}>
                {item.title}
              </h3>

              {/* Body */}
              <p style={{
                fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 400,
                color: 'var(--ink-mute)', lineHeight: 1.55,
                maxWidth: '28ch', margin: 0,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Rule style={{ marginTop: 96 }} />
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
/**
 * Archetype E (section break) — massive ghost "Let's Talk" word,
 * clean display headline, CTA pills, footer meta.
 */
function Contact() {
  return (
    <footer id="contact" style={{ padding: '96px 80px 64px', position: 'relative', overflow: 'hidden' }}>

      <Chrome kicker="Contact" slideNum="04/" />

      {/* Ghost display word at bottom */}
      <span aria-hidden style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--sans)',
        fontSize: 'clamp(64px, 13vw, 180px)',
        fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1,
        color: 'var(--rule-soft)',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap', zIndex: 0,
      }}>
        Let&apos;s Talk
      </span>

      {/* + registration marks */}
      <Plus top={80} left={80} />
      <Plus bottom={80} right={80} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(56px, 8vw, 112px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 0.92,
          color: 'var(--ink)',
          margin: '48px 0 64px',
          maxWidth: '16ch',
        }}>
          Let&apos;s build something<br />
          <span style={{ color: 'var(--accent)' }}>together.</span>
        </h2>

        {/* CTA row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 96 }}>
          <Pill variant="filled" href="mailto:onkarlanke.iitk@gmail.com">
            Email &rarr;
          </Pill>
          <Pill variant="outline" href="https://www.linkedin.com/in/onkarlanke/" target="_blank">
            LinkedIn
          </Pill>
          <Pill variant="outline" href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing" target="_blank">
            Resume
          </Pill>
        </div>

        {/* Footer meta strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid var(--rule)', paddingTop: 24,
        }}>
          <Meta>Onkar Lanke — Portfolio</Meta>
          <Meta>&copy; {new Date().getFullYear()} &nbsp;·&nbsp; Designed with intent.</Meta>
        </div>
      </div>
    </footer>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function EditorialPage() {
  return (
    <>
      {/* Font loading — Inter Tight (display+body) + JetBrains Mono (meta/captions) */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <style>{`
        /* ── Editorial Design System Tokens — CLAUDE.md §4 ── */
        .ed-root {
          --paper:        #F4F2EC;
          --ink:          #0B0B0B;
          --ink-soft:     #1A1A1A;
          --ink-mute:     #8A8A85;
          --rule:         #D9D6CE;
          --rule-soft:    #E8E5DD;
          --accent:       #1E3AE8;
          --card:         #FFFFFF;

          --sans: "Inter Tight", "Helvetica Neue", system-ui, sans-serif;
          --mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--sans);
          min-height: 100svh;
        }

        /* Normalize */
        .ed-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .ed-root a { color: inherit; }

        /* Responsive — CLAUDE.md §3 canvas is 1920×1080 for slides,
           but as a web page we reduce margins gracefully on small screens. */
        @media (max-width: 1024px) {
          .ed-root section,
          .ed-root footer {
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
          .ed-nav-inner {
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
          .ed-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .ed-grid-3 { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 600px) {
          .ed-root section,
          .ed-root footer {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .ed-nav-inner {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .ed-grid-4 { grid-template-columns: 1fr !important; }
        }

        /* Focus states */
        .ed-root a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 2px;
        }

        /* Card hover — only border color change, no shadow */
        .ed-card:hover { border-color: var(--ink) !important; }

        /* prefers-reduced-motion — no motion by default anyway */
        @media (prefers-reduced-motion: reduce) {
          .ed-root * { transition-duration: 0ms !important; }
        }
      `}</style>

      <div className="ed-root">
        {/* <Nav /> */}

        {/* Sections use the spacing scale from §12: 96px between, 64px margins */}
        <Hero />

        <section style={{ padding: '0 80px' }} aria-hidden>
          {/* Intentional quiet space — one large quiet region per slide (§3) */}
        </section>

        <Work />
        <About />
        <Contact />
      </div>
    </>
  )
}
