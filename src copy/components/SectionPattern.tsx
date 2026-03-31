'use client'

// components/SectionPattern.tsx
// Drop <SectionPattern /> inside any section to add a subtle Stripe-like pattern
// Usage: wrap your section in `relative overflow-hidden` and add <SectionPattern variant="dots" />

type Variant = 'dots' | 'grid' | 'cross' | 'noise'

interface Props {
  variant?: Variant
  opacity?: number
  color?: string // e.g. '#ffffff' for light sections, '#555555' for dark
}

export default function SectionPattern({
  variant = 'dots',
  opacity = 0.06,
  color = '#888888',
}: Props) {
  const patterns: Record<Variant, string> = {
    dots: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    grid: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
    cross: `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(to right, ${color} 1px, transparent 1px),
      radial-gradient(circle, ${color} 1.5px, transparent 1.5px)
    `,
    noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }

  const sizes: Record<Variant, string> = {
    dots:  '24px 24px',
    grid:  '32px 32px, 32px 32px',
    cross: '32px 32px, 32px 32px, 32px 32px',
    noise: '200px 200px',
  }

  return (
    <>
      {/* Pattern layer */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity,
          backgroundImage: patterns[variant],
          backgroundSize: sizes[variant],
        }}
      />
      {/* Edge fade — blends pattern into section edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, inherit 100%)',
        }}
      />
    </>
  )
}
