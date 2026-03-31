'use client'

import { motion, Variants, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const tools = [
  { name: 'Figma',      category: 'Design',    icon: 'https://cdn.simpleicons.org/figma/ffffff' },
  { name: 'Webflow',    category: 'Design',    icon: 'https://cdn.simpleicons.org/webflow/ffffff' },
  { name: 'Framer',     category: 'Design',    icon: 'https://cdn.simpleicons.org/framer/ffffff' },
  { name: 'Hotjar',     category: 'Research',  icon: 'https://cdn.simpleicons.org/hotjar/ffffff' },
  { name: 'Amplitude',  category: 'Analytics', icon: '/icons/amplitude.svg' },
  { name: 'Notion',     category: 'Strategy',  icon: 'https://cdn.simpleicons.org/notion/ffffff' },
  { name: 'Miro',       category: 'Strategy',  icon: 'https://cdn.simpleicons.org/miro/ffffff' },
  { name: 'MS Clarity', category: 'Analytics', icon: '/icons/ms-clarity.svg' },
  { name: 'GitHub',     category: 'Dev',       icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Vercel',     category: 'Dev',       icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'Claude',     category: 'AI',        icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
  { name: 'VS Code',    category: 'Dev',       icon: '/icons/vscode.svg' },
]

const categoryColors: Record<string, string> = {
  'Design':    'hover:border-blue-500/50',
  'Research':  'hover:border-amber-500/50',
  'Analytics': 'hover:border-amber-500/50',
  'Strategy':  'hover:border-green-500/50',
  'Dev':       'hover:border-purple-500/50',
  'AI':        'hover:border-orange-500/50',
}

// ─── MOUSE GRADIENT ───────────────────────────────────────────────────────────
function MouseGradient() {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 400)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })
  useEffect(() => {
    const h = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [x, y])
  return (
    <motion.div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <motion.div className="absolute rounded-full"
        style={{ width: 800, height: 800, x: sx, y: sy, translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(120,80,255,0.18) 0%, rgba(80,120,255,0.10) 35%, transparent 70%)',
          filter: 'blur(30px)' }}
      />
    </motion.div>
  )
}

// ─── BLOBS ────────────────────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div className="absolute rounded-full"
        style={{ width: 700, height: 700, top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 500, height: 500, top: '-5%', right: '-10%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 600, height: 400, bottom: '5%', left: '25%', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ x: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  )
}

// ─── DOT GRID ─────────────────────────────────────────────────────────────────
function DotGrid() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0"
        style={{ opacity: 0.35, backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div aria-hidden className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #0a0a0a 100%)' }}
      />
    </>
  )
}

// ─── ORIGAMI BIRD CANVAS ──────────────────────────────────────────────────────
function OrigamiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    window.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      }
    })

    // 3D projection utility
    function project(
      vx: number, vy: number, vz: number,
      rotX: number, rotY: number,
      cx: number, cy: number
    ) {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const x1 = vx * cosY - vz * sinY
      const z1 = vx * sinY + vz * cosY
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const y1 = vy * cosX - z1 * sinX
      const z2 = vy * sinX + z1 * cosX
      const fov = 800
      const s = fov / (fov + z2 + 300)
      return { x: cx + x1 * s, y: cy + y1 * s, z: z2, s }
    }

    // Origami dove vertices — scaled 3x
    const S = 3
    const V: [number,number,number][] = [
      [ 0,   -120,  0 ].map(v => v*S) as [number,number,number],
      [ 60,  -80,   20].map(v => v*S) as [number,number,number],
      [ 40,  -60,   10].map(v => v*S) as [number,number,number],
      [ 20,  -50,   15].map(v => v*S) as [number,number,number],
      [-10,  -80,  -10].map(v => v*S) as [number,number,number],
      [-60,  -40,  -20].map(v => v*S) as [number,number,number],
      [-100,  20,  -30].map(v => v*S) as [number,number,number],
      [-120,  60,  -10].map(v => v*S) as [number,number,number],
      [-100,  80,   20].map(v => v*S) as [number,number,number],
      [-60,   60,   10].map(v => v*S) as [number,number,number],
      [ 20,   30,   30].map(v => v*S) as [number,number,number],
      [ 60,   10,   40].map(v => v*S) as [number,number,number],
      [ 120, -40,   10].map(v => v*S) as [number,number,number],
      [ 80,  -60,  -10].map(v => v*S) as [number,number,number],
      [ 40,   60,   20].map(v => v*S) as [number,number,number],
      [-20,   80,   0 ].map(v => v*S) as [number,number,number],
      [ 20,  -20,   50].map(v => v*S) as [number,number,number],
      [-30,   0,    20].map(v => v*S) as [number,number,number],
      [ 50,  -30,  -20].map(v => v*S) as [number,number,number],
      [ 100, -20,  -30].map(v => v*S) as [number,number,number],
      [-40,  -20,   0 ].map(v => v*S) as [number,number,number],
    ]

    // Faces (triangles) — each is [v0, v1, v2, lightFactor]
    const F: [number,number,number,number][] = [
      // Head
      [0, 1, 2, 0.95],
      [0, 2, 3, 0.80],
      [0, 3, 4, 0.70],
      [4, 3, 20, 0.60],
      // Body top
      [4, 20, 5, 0.75],
      [20, 17, 5, 0.65],
      // Wing upper
      [0, 13, 18, 0.90],
      [13, 12, 18, 1.00],
      [18, 12, 19, 0.85],
      [0, 18, 4, 0.70],
      // Wing lower
      [3, 16, 11, 0.80],
      [16, 11, 10, 0.90],
      [11, 12, 13, 0.95],
      [11, 13, 18, 0.75],
      // Chest / belly
      [2, 3, 16, 0.85],
      [16, 10, 14, 0.80],
      [10, 17, 14, 0.70],
      // Tail
      [5, 9, 17, 0.65],
      [9, 15, 17, 0.60],
      [5, 6, 9, 0.55],
      [6, 7, 8, 0.80],
      [6, 8, 9, 0.70],
      [9, 8, 15, 0.65],
      [15, 14, 17, 0.60],
    ]

    // Edges for wireframe
    const edges = new Set<string>()
    F.forEach(([a,b,c]) => {
      [[a,b],[b,c],[a,c]].forEach(([i,j]) => {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`
        edges.add(k)
      })
    })
    const E = Array.from(edges).map(k => k.split('-').map(Number) as [number,number])

    // Grid dots — scattered in 3D space around origin
    const gridDots: [number,number,number][] = []
    for (let gx = -5; gx <= 5; gx++) {
      for (let gy = -4; gy <= 4; gy++) {
        gridDots.push([gx * 30, gy * 30, (Math.sin(gx*0.8)*Math.cos(gy*0.6)) * 20])
      }
    }

    // Easing
    function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t }
    function easeOut(t: number) { return 1 - Math.pow(1-t, 3) }

    function draw() {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      t += 0.006

      // Gentle auto-rotation + mouse tilt
      const baseRotY = t * 0.25
      const rotY = baseRotY + mouse.current.x * 0.8
      const rotX = -0.15 + mouse.current.y * 0.5
      const cx = W * 0.52
      const cy = H * 0.48

      // Time phases — total cycle 16s
      const cycle = t % 16

      // Phase 1 (0–2s): grid dots materialize
      const dotPhase = easeOut(Math.min(cycle / 2, 1))

      // Phase 2 (2–5s): edges draw in one by one
      const edgePhase = easeInOut(Math.max(0, Math.min((cycle - 2) / 3, 1)))

      // Phase 3 (5–9s): faces fill in
      const facePhase = easeInOut(Math.max(0, Math.min((cycle - 5) / 4, 1)))

      // Phase 4 (9–13s): hold / float
      // Phase 5 (13–16s): dissolve back
      const dissolvePhase = easeInOut(Math.max(0, Math.min((cycle - 13) / 3, 1)))
      const masterAlpha = cycle > 13 ? 1 - dissolvePhase : 1

      // Project all vertices
      const pV = V.map(([vx,vy,vz]) => project(vx, vy, vz, rotX, rotY, cx, cy))

      // ── GRID DOTS ──
      if (dotPhase > 0) {
        gridDots.forEach(([gx,gy,gz], gi) => {
          const appear = Math.max(0, Math.min((dotPhase * gridDots.length - gi) / 8, 1))
          if (appear <= 0) return
          const p = project(gx, gy, gz, rotX, rotY, cx, cy)
          const alpha = appear * masterAlpha * 0.5
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.5 * p.s, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180,180,255,${alpha})`
          ctx.fill()
        })
      }

      // ── FACES ──
      if (facePhase > 0) {
        // Sort by average Z (painter's algorithm)
        const sortedF = [...F].sort((a, b) => {
          const za = (pV[a[0]].z + pV[a[1]].z + pV[a[2]].z) / 3
          const zb = (pV[b[0]].z + pV[b[1]].z + pV[b[2]].z) / 3
          return za - zb
        })

        sortedF.forEach(([i0, i1, i2, light], fi) => {
          const appear = Math.max(0, Math.min((facePhase * F.length - fi) / 4, 1))
          if (appear <= 0) return
          const p0 = pV[i0], p1 = pV[i1], p2 = pV[i2]
          const a = appear * masterAlpha

          // Paper white with subtle blue tint — matches reference
          const baseLight = 0.55 + light * 0.45
          const r = Math.round(200 + baseLight * 55)
          const g = Math.round(210 + baseLight * 45)
          const b = Math.round(240 + baseLight * 15)

          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.closePath()
          ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.92})`
          ctx.fill()

          // Grain texture overlay — the speckled look from the reference
          if (appear > 0.5) {
            const gAlpha = (appear - 0.5) * 2 * a * 0.15
            const avgX = (p0.x + p1.x + p2.x) / 3
            const avgY = (p0.y + p1.y + p2.y) / 3
            const grad = ctx.createRadialGradient(avgX, avgY, 0, avgX, avgY, 80)
            grad.addColorStop(0, `rgba(100,140,220,${gAlpha})`)
            grad.addColorStop(1, `rgba(100,140,220,0)`)
            ctx.fillStyle = grad
            ctx.fill()
          }
        })
      }

      // ── EDGES ──
      if (edgePhase > 0) {
        const numEdgesVisible = Math.floor(edgePhase * E.length)
        E.forEach(([i, j], ei) => {
          const appear = Math.max(0, Math.min((edgePhase * E.length - ei) / 3, 1))
          if (appear <= 0) return
          const p0 = pV[i], p1 = pV[j]
          const a = appear * masterAlpha * (facePhase > 0 ? 0.6 : 1.0)
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `rgba(180,200,255,${a})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        })
      }

      // ── VERTEX DOTS ──
      if (edgePhase > 0) {
        pV.forEach((p, vi) => {
          const appear = Math.max(0, Math.min((edgePhase * V.length - vi) / 2, 1))
          if (appear <= 0) return
          const a = appear * masterAlpha * (facePhase > 0.5 ? 0.5 : 1.0)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(160,180,255,${a})`
          ctx.fill()
          // Glow ring
          ctx.beginPath()
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(160,180,255,${a * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      }

      // ── FOLD CREASE LINES (dashed) — like in the reference ──
      if (facePhase > 0.6) {
        const creaseAlpha = ((facePhase - 0.6) / 0.4) * masterAlpha * 0.5
        const creases: [number,number][] = [[16,17],[10,17],[3,16],[11,16],[9,17]]
        creases.forEach(([i,j]) => {
          const p0 = pV[i], p1 = pV[j]
          ctx.beginPath()
          ctx.setLineDash([4, 6])
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `rgba(100,140,220,${creaseAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
          ctx.setLineDash([])
        })
      }

      // ── FLOATING LABEL ──
      if (facePhase > 0.8) {
        const la = ((facePhase - 0.8) / 0.2) * masterAlpha
        ctx.font = '10px monospace'
        ctx.fillStyle = `rgba(140,160,255,${la * 0.7})`
        ctx.letterSpacing = '3px'
        ctx.textAlign = 'center'
        ctx.fillText('ORIGAMI  /  DESIGN', cx, H - 24)
        ctx.textAlign = 'left'
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.div className="relative w-full h-full"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </motion.div>
  )
}

// ─── TOOL CARD ────────────────────────────────────────────────────────────────
function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`shrink-0 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 px-5 py-3 rounded-xl cursor-default transition-colors duration-200 ${categoryColors[tool.category] || 'hover:border-zinc-600'}`}
    >
      <img src={tool.icon} alt={tool.name} className="w-5 h-5 brightness-0 invert opacity-80"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      <span className="text-zinc-300 text-sm font-medium whitespace-nowrap">{tool.name}</span>
      <span className="text-zinc-600 text-xs whitespace-nowrap">{tool.category}</span>
    </motion.div>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function MarqueeRow() {
  const tripled = [...tools, ...tools, ...tools]
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      <motion.div className="flex gap-5 py-2 w-max"
        animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {tripled.map((tool, i) => <ToolCard key={`${tool.name}-${i}`} tool={tool} />)}
      </motion.div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 relative overflow-hidden">

      <MouseGradient />
      <Blobs />
      <DotGrid />

      <div className="flex-1 flex items-center w-full px-8 md:px-16 lg:px-24 relative z-10">

        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex-1 max-w-xl pr-0 lg:pr-12">

          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <p className="text-zinc-400 text-sm tracking-widest uppercase">Available for opportunities</p>
          </motion.div>

          <motion.h1 variants={item} className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
            Onkar Lanke
          </motion.h1>

          <motion.h2 variants={item} className="text-zinc-400 text-xl md:text-3xl font-light mb-6">
            Designer. Researcher. Strategist. Storyteller.
          </motion.h2>

          <motion.p variants={item} className="text-zinc-500 text-base md:text-lg max-w-md leading-relaxed mb-10">
            5+ years crafting research-based product strategies and end-to-end experiences.
          </motion.p>

          <motion.div variants={item} className="flex gap-4">
            <motion.a href="mailto:onkarlanke.iitk@gmail.com"
              className="relative group inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12" />
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: '0 0 28px 8px rgba(255,255,255,0.3)' }} />
              <span className="relative z-10">Contact Me</span>
            </motion.a>

            <motion.a href="https://www.linkedin.com/in/onkarlanke/" target="_blank" rel="noreferrer"
              className="border border-zinc-700 text-zinc-400 px-7 py-3.5 rounded-full text-sm font-medium hover:border-blue-500/60 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>

        </motion.div>

        {/* RIGHT — origami bird */}
        <div className="hidden lg:flex flex-1 items-center justify-center" style={{ height: "700px" }}>
          <OrigamiCanvas />
        </div>

      </div>

      {/* Tools marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full relative z-10 mt-6 pb-8"
      >
        <p className="text-zinc-700 text-xs tracking-widest uppercase mb-4 px-8 md:px-16 lg:px-24">Tools I use</p>
        <MarqueeRow />
      </motion.div>

    </section>
  )
}
