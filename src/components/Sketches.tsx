'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

// ─── REPLACE THESE PATHS WITH YOUR ACTUAL SKETCH IMAGES ───────────────────────
// Put your sketch images in /public/sketches/ folder and update the paths below
// e.g. '/sketches/sketch-01.jpg', '/sketches/sketch-02.png' etc.
const sketches = [
  { id: 1, src: '/sketches/sketch-01.jpg', label: 'Sketch 01' },
  { id: 2, src: '/sketches/sketch-02.jpg', label: 'Sketch 02' },
  { id: 3, src: '/sketches/sketch-03.jpg', label: 'Sketch 03' },
  { id: 4, src: '/sketches/sketch-04.webp', label: 'Sketch 04' },
  { id: 5, src: '/sketches/sketch-05.jpg', label: 'Sketch 05' },
  { id: 6, src: '/sketches/sketch-06.jpg', label: 'Sketch 06' },
  { id: 7, src: '/sketches/sketch-07.jpg', label: 'Sketch 07' },
  { id: 8, src: '/sketches/sketch-08.jpg', label: 'Sketch 08' },
  
]
// ──────────────────────────────────────────────────────────────────────────────

// Split into two rows for opposite direction scrolling
const row1 = sketches.slice(0, 8)

// Random but consistent rotations — gives organic sketchbook feel
const rotations = [-2, 1.5, -1, 2.5, -1.8, 0.8, -2.2, 1.2, 2, -1.5, 1, -2.8, 0.5, -1.2, 2.3, -0.8]

// Placeholder shown when no image src is provided
function SketchPlaceholder({ label, rotation }: { label: string; rotation: number }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.05 }}
      style={{ rotate: rotation }}
      className="shrink-0 w-48 h-64 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-black/50 hover:z-10 relative"
    >
      {/* Paper texture effect using CSS */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] relative">
        {/* Lined paper effect */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #555 27px, #555 28px)',
            backgroundSize: '100% 28px',
          }}
        />
        {/* Pencil icon */}
        <svg className="w-8 h-8 text-zinc-600 mb-3 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <p className="text-zinc-600 text-xs relative z-10">{label}</p>
      </div>
    </motion.div>
  )
}

function SketchCard({ sketch, index }: { sketch: typeof sketches[0]; index: number }) {
  const rotation = rotations[index % rotations.length]

  if (!sketch.src) {
    return <SketchPlaceholder label={sketch.label} rotation={rotation} />
  }

  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.05 }}
      style={{ rotate: rotation }}
      className="shrink-0 w-48 h-64 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-black/50 hover:z-10 relative"
    >
      <img
        src={sketch.src}
        alt={sketch.label}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}

// InfiniteRow — duplicates cards and scrolls infinitely in one direction
function InfiniteRow({ items, direction }: { items: typeof sketches; direction: 'left' | 'right' }) {
  // We duplicate the array so the scroll looks seamless (no gap at the end)
  const doubled = [...items, ...items]
  const duration = 35 // seconds for one full scroll cycle

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges so it bleeds into page background */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-6 py-4 w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        // Pause on hover over the entire row
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubled.map((sketch, i) => (
          <SketchCard key={`${sketch.id}-${i}`} sketch={sketch} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Sketches() {
  return (
    <section className="py-24 border-t border-zinc-900 overflow-hidden">

      {/* Section header — full width padding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-8 md:px-16 lg:px-24 mb-12"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-3">Thinking out loud</p>
        <h2 className="text-white text-2xl font-semibold">Design breaks: pen strokes in between design sprints</h2>
        <p className="text-zinc-500 mt-2 text-sm max-w-md">
          Raw sketches and explorations — My love for sketching & early concepts keep me going.
        </p>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="mb-6">
        <InfiniteRow items={row1} direction="left" />
      </div>

    

    </section>
  )
}
