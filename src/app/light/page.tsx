'use client'

import { motion, Variants, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  siFigma, siWebflow, siFramer, siHotjar,
  siNotion, siMiro, siGithub, siVercel, siAnthropic,
} from 'simple-icons'

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
const BG = '#f8f9fa'
const CARD = '#ffffff'
const BORDER = '#e4e4e7'       // zinc-200
const SECTION_BORDER = '#f4f4f5' // zinc-100
const TEXT_1 = '#18181b'       // zinc-900
const TEXT_2 = '#52525b'       // zinc-600
const TEXT_3 = '#a1a1aa'       // zinc-400
const TEXT_4 = '#d4d4d8'       // zinc-300

// ─── NAV ──────────────────────────────────────────────────────────────────────
function LightNav() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) { setVisible(true); lastY.current = y; return }
      if (y < lastY.current - 4) setVisible(true)
      else if (y > lastY.current + 4) setVisible(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center backdrop-blur-sm border-b"
          style={{ background: 'rgba(248,249,250,0.90)', borderColor: BORDER }}
        >
          <Link href="/light#hero" className="font-semibold text-lg tracking-tight" style={{ color: TEXT_1 }}>
            Onkar Lanke
          </Link>
          <div className="flex items-center gap-6">
            {['Work', 'About', 'Contact'].map(label => (
              <Link key={label} href={`/light#${label.toLowerCase()}`}
                className="text-sm hidden md:block transition-colors hover:opacity-80"
                style={{ color: TEXT_2 }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing"
              target="_blank" rel="noreferrer"
              className="relative group text-white text-sm font-semibold px-5 py-2.5 rounded-full overflow-hidden transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              <span className="relative z-10">Resume</span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
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
        style={{ width: 880, height: 880, x: sx, y: sy, translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(120,80,255,0.07) 0%, rgba(80,120,255,0.04) 35%, transparent 70%)',
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
        style={{ width: 700, height: 700, top: '-20%', left: '-15%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 500, height: 500, top: '-5%', right: '-10%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 600, height: 400, bottom: '5%', left: '25%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  )
}

// ─── DOT GRID ─────────────────────────────────────────────────────────────────
function DotGrid() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0"
        style={{ opacity: 0.5, backgroundImage: 'radial-gradient(circle, #bbb 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div aria-hidden className="absolute inset-0 z-0"
        style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, ${BG} 100%)` }}
      />
    </>
  )
}

// ─── ORIGAMI BIRD CANVAS ──────────────────────────────────────────────────────
function OrigamiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas = canvasEl
    const rawCtx = canvas.getContext('2d')
    if (!rawCtx) return
    const ctx = rawCtx
    let animId: number
    let t = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

    function project(vx: number, vy: number, vz: number, rotX: number, rotY: number, cx: number, cy: number) {
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

    const S = 3
    const V: [number, number, number][] = [
      [0, -120, 0], [60, -80, 20], [40, -60, 10], [20, -50, 15],
      [-10, -80, -10], [-60, -40, -20], [-100, 20, -30], [-120, 60, -10],
      [-100, 80, 20], [-60, 60, 10], [20, 30, 30], [60, 10, 40],
      [120, -40, 10], [80, -60, -10], [40, 60, 20], [-20, 80, 0],
      [20, -20, 50], [-30, 0, 20], [50, -30, -20], [100, -20, -30],
      [-40, -20, 0],
    ].map(v => v.map(n => n * S) as [number, number, number])

    const F: [number, number, number, number][] = [
      [0, 1, 2, 0.95], [0, 2, 3, 0.80], [0, 3, 4, 0.70], [4, 3, 20, 0.60],
      [4, 20, 5, 0.75], [20, 17, 5, 0.65],
      [0, 13, 18, 0.90], [13, 12, 18, 1.00], [18, 12, 19, 0.85], [0, 18, 4, 0.70],
      [3, 16, 11, 0.80], [16, 11, 10, 0.90], [11, 12, 13, 0.95], [11, 13, 18, 0.75],
      [2, 3, 16, 0.85], [16, 10, 14, 0.80], [10, 17, 14, 0.70],
      [5, 9, 17, 0.65], [9, 15, 17, 0.60], [5, 6, 9, 0.55], [6, 7, 8, 0.80],
      [6, 8, 9, 0.70], [9, 8, 15, 0.65], [15, 14, 17, 0.60],
    ]

    const edges = new Set<string>()
    F.forEach(([a, b, c]) => {
      [[a, b], [b, c], [a, c]].forEach(([i, j]) => {
        edges.add(i < j ? `${i}-${j}` : `${j}-${i}`)
      })
    })
    const E = Array.from(edges).map(k => k.split('-').map(Number) as [number, number])

    const gridDots: [number, number, number][] = []
    for (let gx = -5; gx <= 5; gx++)
      for (let gy = -4; gy <= 4; gy++)
        gridDots.push([gx * 30, gy * 30, Math.sin(gx * 0.8) * Math.cos(gy * 0.6) * 20])

    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

    function draw() {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      t += 0.006

      const baseRotY = t * 0.25
      const rotY = baseRotY + mouse.current.x * 0.8
      const rotX = -0.15 + mouse.current.y * 0.5
      const cx = W * 0.52
      const cy = H * 0.48

      const cycle = t % 16
      const dotPhase = easeOut(Math.min(cycle / 2, 1))
      const edgePhase = easeInOut(Math.max(0, Math.min((cycle - 2) / 3, 1)))
      const facePhase = easeInOut(Math.max(0, Math.min((cycle - 5) / 4, 1)))
      const dissolvePhase = easeInOut(Math.max(0, Math.min((cycle - 13) / 3, 1)))
      const masterAlpha = cycle > 13 ? 1 - dissolvePhase : 1

      const pV = V.map(([vx, vy, vz]) => project(vx, vy, vz, rotX, rotY, cx, cy))

      // Grid dots — darker for light bg
      if (dotPhase > 0) {
        gridDots.forEach(([gx, gy, gz], gi) => {
          const appear = Math.max(0, Math.min((dotPhase * gridDots.length - gi) / 8, 1))
          if (appear <= 0) return
          const p = project(gx, gy, gz, rotX, rotY, cx, cy)
          const alpha = appear * masterAlpha * 0.4
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.5 * p.s, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(80,80,160,${alpha})`
          ctx.fill()
        })
      }

      // Faces — paper with slight warm tint
      if (facePhase > 0) {
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
          const baseLight = 0.55 + light * 0.45
          // Darker, more visible faces on light background
          const r = Math.round(160 + baseLight * 40)
          const g = Math.round(170 + baseLight * 35)
          const b = Math.round(210 + baseLight * 20)
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.closePath()
          ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.85})`
          ctx.fill()
          if (appear > 0.5) {
            const gAlpha = (appear - 0.5) * 2 * a * 0.12
            const avgX = (p0.x + p1.x + p2.x) / 3
            const avgY = (p0.y + p1.y + p2.y) / 3
            const grad = ctx.createRadialGradient(avgX, avgY, 0, avgX, avgY, 80)
            grad.addColorStop(0, `rgba(60,100,200,${gAlpha})`)
            grad.addColorStop(1, `rgba(60,100,200,0)`)
            ctx.fillStyle = grad
            ctx.fill()
          }
        })
      }

      // Edges
      if (edgePhase > 0) {
        E.forEach(([i, j], ei) => {
          const appear = Math.max(0, Math.min((edgePhase * E.length - ei) / 3, 1))
          if (appear <= 0) return
          const p0 = pV[i], p1 = pV[j]
          const a = appear * masterAlpha * (facePhase > 0 ? 0.5 : 0.9)
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `rgba(80,120,200,${a})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        })
      }

      // Vertex dots
      if (edgePhase > 0) {
        pV.forEach((p, vi) => {
          const appear = Math.max(0, Math.min((edgePhase * V.length - vi) / 2, 1))
          if (appear <= 0) return
          const a = appear * masterAlpha * (facePhase > 0.5 ? 0.4 : 0.9)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(60,100,200,${a})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(60,100,200,${a * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      }

      // Crease lines
      if (facePhase > 0.6) {
        const creaseAlpha = ((facePhase - 0.6) / 0.4) * masterAlpha * 0.4
        const creases: [number, number][] = [[16, 17], [10, 17], [3, 16], [11, 16], [9, 17]]
        creases.forEach(([i, j]) => {
          const p0 = pV[i], p1 = pV[j]
          ctx.beginPath()
          ctx.setLineDash([4, 6])
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `rgba(60,100,200,${creaseAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
          ctx.setLineDash([])
        })
      }

      // Floating label
      if (facePhase > 0.8) {
        const la = ((facePhase - 0.8) / 0.2) * masterAlpha
        ctx.font = '10px monospace'
        ctx.fillStyle = `rgba(60,100,200,${la * 0.6})`
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

// ─── TOOL CARDS + MARQUEE ─────────────────────────────────────────────────────
const tools = [
  { name: 'Figma',      category: 'Design',    svgPath: siFigma.path,      iconFill: '#F24E1E', borderColor: '#F24E1E' },
  { name: 'Webflow',    category: 'Design',    svgPath: siWebflow.path,    iconFill: '#146EF5', borderColor: '#146EF5' },
  { name: 'Framer',     category: 'Design',    svgPath: siFramer.path,     iconFill: '#0055FF', borderColor: '#0055FF' },
  { name: 'Hotjar',     category: 'Research',  svgPath: siHotjar.path,     iconFill: '#FF3C00', borderColor: '#FF3C00' },
  { name: 'Amplitude',  category: 'Analytics', svgPath: null,              iconFill: '#1271F7', borderColor: '#1271F7' },
  { name: 'Notion',     category: 'Strategy',  svgPath: siNotion.path,     iconFill: '#18181b', borderColor: '#18181b' },
  { name: 'Miro',       category: 'Strategy',  svgPath: siMiro.path,       iconFill: '#FFD02F', borderColor: '#FFD02F' },
  { name: 'MS Clarity', category: 'Analytics', svgPath: null,              iconFill: '#0078D4', borderColor: '#0078D4' },
  { name: 'GitHub',     category: 'Dev',       svgPath: siGithub.path,     iconFill: '#18181b', borderColor: '#18181b' },
  { name: 'Vercel',     category: 'Dev',       svgPath: siVercel.path,     iconFill: '#18181b', borderColor: '#18181b' },
  { name: 'Claude',     category: 'AI',        svgPath: siAnthropic.path,  iconFill: '#D4704F', borderColor: '#D4704F' },
  { name: 'VS Code',    category: 'Dev',       svgPath: null,              iconFill: '#007ACC', borderColor: '#007ACC' },
]

const fallbackImgSrc: Record<string, string> = {
  'Amplitude':  '/icons/amplitude.svg',
  'MS Clarity': '/icons/ms-clarity.svg',
  'VS Code':    '/icons/vscode.svg',
}

const SQUIRCLE_PATH = 'M 48 0 C 68 0 79 0 85 7 C 92 13 96 24 96 48 C 96 68 96 79 89 85 C 83 92 72 96 48 96 C 28 96 17 96 11 89 C 4 83 0 72 0 48 C 0 28 0 17 7 11 C 13 4 24 0 48 0 Z'

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group relative shrink-0 cursor-default"
      style={{ width: 96, height: 96 }}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ clipPath: `path("${SQUIRCLE_PATH}")`, background: 'rgb(241,241,245)' }}
      >
        {tool.svgPath ? (
          <svg role="img" viewBox="0 0 24 24" width={32} height={32} fill={tool.iconFill} className="shrink-0">
            <path d={tool.svgPath} />
          </svg>
        ) : tool.name === 'VS Code' ? (
          <span className="text-sm font-bold tracking-tight" style={{ color: tool.iconFill }}>VS</span>
        ) : (
          <img
            src={fallbackImgSrc[tool.name]}
            alt={tool.name}
            width={32} height={32}
            className="shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
      </div>
      <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
        <div className="bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-center whitespace-nowrap shadow-lg">
          <p className="text-zinc-900 text-sm font-semibold">{tool.name}</p>
          <p className="text-zinc-500 text-xs mt-0.5">{tool.category}</p>
        </div>
        <div className="w-2.5 h-2.5 bg-white border-b border-r border-zinc-200 rotate-45 mx-auto -mt-[5px]" />
      </div>
    </motion.div>
  )
}

function MarqueeRow() {
  const tripled = [...tools, ...tools, ...tools]
  return (
    <div className="relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${BG}, transparent)` }} />
      <motion.div className="flex gap-5 py-2 w-max"
        animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {tripled.map((tool, i) => <ToolCard key={`${tool.name}-${i}`} tool={tool} />)}
      </motion.div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

function LightHero() {
  return (
    <section id="hero" className="flex flex-col pt-24 relative overflow-hidden" style={{ minHeight: '100svh' }}>
      <MouseGradient />
      <Blobs />
      <DotGrid />

      <div className="flex-1 flex items-center w-full px-8 md:px-16 lg:px-24 relative z-10 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex-1 max-w-xl pr-0 lg:pr-12">

          <motion.div variants={item} className="flex items-center gap-3 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <p className="text-sm tracking-widest uppercase" style={{ color: TEXT_2 }}>Available for opportunities</p>
          </motion.div>

          <motion.h1 variants={item}
            className="text-[5.46rem] md:text-[6.82rem] lg:text-[8.2rem] leading-none mb-8"
            style={{ color: TEXT_1, fontFamily: "'Covered By Your Grace', cursive", fontWeight: 400 }}
          >
            Observer, Tinkerer, Storyteller
          </motion.h1>

          <motion.div variants={item} className="flex gap-4">
            <motion.a href="mailto:onkarlanke.iitk@gmail.com"
              className="relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden"
              style={{ background: TEXT_1, color: '#fff' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              <span className="relative z-10">Contact Me</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="relative z-10 transition-transform duration-300 group-hover:rotate-45">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </motion.a>

            <motion.a href="https://www.linkedin.com/in/onkarlanke/" target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border transition-colors"
              style={{ borderColor: '#146EF5', color: '#146EF5' }}
              whileHover={{ scale: 1.04, backgroundColor: '#146EF5', color: '#fff' }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Connect on LinkedIn
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-45">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </motion.a>
          </motion.div>

        </motion.div>

        <div className="hidden lg:flex flex-1 items-center justify-center" style={{ height: '700px' }}>
          <OrigamiCanvas />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full relative z-10 mt-2 pb-6"
      >
        <p className="text-xs tracking-widest uppercase mb-4 px-8 md:px-16 lg:px-24" style={{ color: TEXT_4 }}>Tools I use</p>
        <MarqueeRow />
      </motion.div>
    </section>
  )
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
interface Article { title: string; url: string; publication: string; tags: string[]; pubDate: string }

const TAG_COLORS_LIGHT = [
  'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'bg-green-500/10 text-green-600 border-green-500/20',
  'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'bg-amber-500/10 text-amber-600 border-amber-500/20',
]
function tagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  return TAG_COLORS_LIGHT[Math.abs(hash) % TAG_COLORS_LIGHT.length]
}
function MediumIcon({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}
function ArticleRow({ article, index }: { article: Article; index: number }) {
  const primaryTag = article.tags[0] ?? 'Article'
  return (
    <motion.a href={article.url} target="_blank" rel="noreferrer"
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex items-center justify-between gap-6 px-6 py-5 border rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-sm"
      style={{ background: CARD, borderColor: BORDER }}
    >
      <div className="flex items-center gap-5 min-w-0">
        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300"
          style={{ background: '#f1f1f5' }}>
          <MediumIcon className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors duration-300" />
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium leading-snug group-hover:text-blue-600 transition-colors duration-300" style={{ color: TEXT_1 }}>
            {article.title}
          </p>
          {article.pubDate && (
            <p className="text-xs mt-1" style={{ color: TEXT_3 }}>
              {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs px-3 py-1 rounded-full border hidden md:block ${tagColor(primaryTag)}`}>{primaryTag}</span>
        <svg className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-300" style={{ color: TEXT_4 }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </motion.a>
  )
}

function LightArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data.articles)) setArticles(data.articles) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="px-8 md:px-16 lg:px-24 py-16 border-t" style={{ borderColor: SECTION_BORDER }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: TEXT_4 }}>Writing</p>
          <h2 className="text-5xl font-bold" style={{ color: TEXT_1 }}>Latest pen-downs on medium</h2>
        </div>
        <a href="https://medium.com/@onkarlanke" target="_blank" rel="noreferrer"
          className="text-xs transition-colors hover:text-blue-500" style={{ color: TEXT_3 }}>
          All articles →
        </a>
      </motion.div>

      <div className="flex flex-col gap-3">
        {loading ? (
          [0, 1, 2].map(i => (
            <div key={i} className="flex items-center justify-between gap-6 px-6 py-5 border rounded-xl animate-pulse"
              style={{ background: CARD, borderColor: BORDER }}>
              <div className="flex items-center gap-5 min-w-0 flex-1">
                <div className="shrink-0 w-10 h-10 rounded-xl" style={{ background: '#f1f1f5' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{ background: '#f1f1f5' }} />
                  <div className="h-3 rounded w-1/4" style={{ background: '#f1f1f5' }} />
                </div>
              </div>
              <div className="h-5 w-24 rounded-full hidden md:block" style={{ background: '#f1f1f5' }} />
            </div>
          ))
        ) : articles.length === 0 ? (
          <p className="text-sm" style={{ color: TEXT_3 }}>No articles found.</p>
        ) : (
          articles.map((article, index) => <ArticleRow key={article.url} article={article} index={index} />)
        )}
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const tagColorsLight: Record<string, string> = {
  'Product Design': 'bg-blue-50 text-blue-600 border-blue-200',
  'SaaS': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'B2B': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'UX Design': 'bg-blue-50 text-blue-600 border-blue-200',
  'Fintech': 'bg-purple-50 text-purple-600 border-purple-200',
  'Research': 'bg-amber-50 text-amber-600 border-amber-200',
  'UX Research': 'bg-amber-50 text-amber-600 border-amber-200',
  'Strategy': 'bg-amber-50 text-amber-600 border-amber-200',
  'E-commerce': 'bg-orange-50 text-orange-600 border-orange-200',
  'Gamification': 'bg-purple-50 text-purple-600 border-purple-200',
}
const projectsData = [
  { slug: 'deckup', title: 'Deck-Up — SaaS for Consultants', company: 'SlideXpress', year: '2024',
    tags: ['Product Design', 'SaaS', 'B2B'], accentHover: 'hover:border-blue-500 hover:shadow-md hover:shadow-blue-100',
    metrics: [{ value: '45–60%', label: 'Productivity gain' }, { value: '40%', label: 'User comfort' }],
    description: 'DeckUp increases the productivity of daily power users by 45–60% by providing a toolbar specifically created for power users. Phase 2 integrates AI for personalisation and quick deck generation.' },
  { slug: 'dil-kyc', title: 'Digitisation of KYC & Customer Management', company: 'Diamond India Limited', year: '2024',
    tags: ['UX Design', 'Fintech', 'Research'], accentHover: 'hover:border-amber-500 hover:shadow-md hover:shadow-amber-100',
    metrics: [{ value: '55%', label: 'Onboarding time reduced' }, { value: '40%', label: 'Employee efficiency' }],
    description: "DIL is India's largest bullion supplier. We digitised their extensive offline KYC and customer management system, reducing onboarding from 2 weeks to 5–7 days." },
  { slug: 'research-strategy', title: 'Research & Strategy for Growth', company: 'Commongood, USA', year: '2023',
    tags: ['UX Research', 'Strategy', 'E-commerce'], accentHover: 'hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-100',
    metrics: [{ value: '43%', label: 'Content engagement' }, { value: '11%', label: 'Cart checkout volume' }],
    description: 'UX evaluation and research-based strategies for a US-based snacking company specializing in healthy, convenient and delicious snack bars.' },
  { slug: 'fintech-gamification', title: 'Gamification in Fintech — Board Game Inspired', company: 'Mindseye Creative', year: '2023',
    tags: ['Gamification', 'Fintech', 'UX Design'], accentHover: 'hover:border-purple-500 hover:shadow-md hover:shadow-purple-100',
    metrics: [{ value: '85%', label: 'Usability score' }, { value: '70%', label: 'User retention' }],
    description: 'Designed a user-friendly fintech interface inspired by board game mechanics, simplifying access to complex financial products through familiar interaction patterns.' },
]

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link href={`/work/${project.slug}`}>
        <div className={`border rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group ${project.accentHover}`}
          style={{ background: CARD, borderColor: BORDER }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs mb-1" style={{ color: TEXT_3 }}>{project.company} · {project.year}</p>
              <h3 className="text-xl font-light leading-snug" style={{ color: TEXT_1 }}>{project.title}</h3>
            </div>
            <div className="ml-4 shrink-0 mt-1 group-hover:text-zinc-900 transition-colors" style={{ color: TEXT_4 }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: TEXT_2 }}>{project.description}</p>
          <div className="flex gap-8 mb-6">
            {project.metrics.map(metric => (
              <div key={metric.label}>
                <div className="text-2xl font-normal" style={{ color: TEXT_1 }}>{metric.value}</div>
                <div className="text-xs mt-0.5" style={{ color: TEXT_3 }}>{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${tagColorsLight[tag] || 'bg-zinc-50 text-zinc-500 border-zinc-200'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function LightProjects() {
  return (
    <section id="work" className="px-8 md:px-16 lg:px-24 py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-16">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: TEXT_3 }}>Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-light" style={{ color: TEXT_1 }}>Case Studies</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

// ─── WEBBUILDS ────────────────────────────────────────────────────────────────
const sites = [
  { name: 'Reevo CRM', description: 'Austin, Texas-based Salesforce Summit Partner specializing in implementations, customizations, AI integrations, and adoption services.',
    url: 'https://www.reevocrm.com', location: 'Austin, Texas', accentHover: 'hover:border-blue-300',
    tags: [{ label: 'Webflow', color: 'bg-blue-50 text-blue-600 border-blue-200' }, { label: 'CRM', color: 'bg-purple-50 text-purple-600 border-purple-200' }, { label: 'B2B', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' }] },
  { name: 'Catalyst Healthcare Consulting', description: 'Dynamic, hands-on regulatory policy dedicated to helping clients advance innovative healthcare solutions that benefit patients.',
    url: 'https://catalysthcc.com', location: 'USA', accentHover: 'hover:border-emerald-300',
    tags: [{ label: 'Webflow', color: 'bg-blue-50 text-blue-600 border-blue-200' }, { label: 'Healthcare', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' }, { label: 'Consulting', color: 'bg-amber-50 text-amber-600 border-amber-200' }] },
]

function SiteCard({ site }: { site: typeof sites[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() { x.set(0); y.set(0); setHovered(false) }

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative cursor-pointer">
      <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${site.accentHover}`}
        style={{ background: CARD, borderColor: BORDER }}>
        <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ background: '#f4f4f5', borderColor: BORDER }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 rounded-md px-3 py-1 flex items-center gap-2" style={{ background: '#e8e8ec' }}>
            <svg className="w-3 h-3" style={{ color: TEXT_3 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs truncate" style={{ color: TEXT_2 }}>{site.url.replace('https://', '')}</span>
          </div>
          <a href={site.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="transition-colors hover:text-blue-500" style={{ color: TEXT_3 }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div className="relative overflow-hidden" style={{ height: '280px' }}>
          <iframe src={site.url} title={site.name} className="w-full border-0 pointer-events-none"
            style={{ height: '600px', transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%' }} loading="lazy" />
          <div className={`absolute inset-0 transition-opacity duration-300 bg-zinc-100 ${hovered ? 'opacity-0' : 'opacity-10'}`} />
        </div>
      </div>
      <div className="mt-5 px-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg" style={{ color: TEXT_1 }}>{site.name}</h3>
          <span className="text-xs mt-1" style={{ color: TEXT_3 }}>{site.location}</span>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT_2 }}>{site.description}</p>
        <div className="flex flex-wrap gap-2">
          {site.tags.map(tag => (
            <span key={tag.label} className={`text-xs px-3 py-1 rounded-full border ${tag.color}`}>{tag.label}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function LightWebBuilds() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: SECTION_BORDER }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-16">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: TEXT_3 }}>No / Low Code</p>
        <h2 className="text-4xl md:text-5xl font-bold" style={{ color: TEXT_1 }}>Webflow Builds</h2>
        <p className="mt-4 text-lg max-w-xl" style={{ color: TEXT_2 }}>
          Production websites crafted using figma, brewed using webflow & fine-tuned with HTML and CSS.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: '1000px' }}>
        {sites.map((site, index) => (
          <motion.div key={site.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
            <SiteCard site={site} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── BEHANCE ──────────────────────────────────────────────────────────────────
const behanceProjects = [
  { title: 'IndiGo Go Next Experience Design', url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design', cover: '/behance/behance-01.png', year: '2020', color: 'hover:border-blue-300' },
  { title: 'Designing for Last Mile Reach — Financial Inclusion', url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion', cover: '/behance/behance-02.png', year: '2020', color: 'hover:border-emerald-300' },
  { title: 'Delivering Better Experience — A Redesign', url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN', cover: '/behance/behance-03.png', year: '2020', color: 'hover:border-amber-300' },
  { title: 'Icons Design Planner', url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner', cover: '/behance/behance-04.png', year: '2019', color: 'hover:border-purple-300' },
]

function LightBehance() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 border-t" style={{ borderColor: SECTION_BORDER }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-10">
        <p className="text-sm tracking-widest uppercase mb-3" style={{ color: TEXT_3 }}>Archive</p>
        <h2 className="text-2xl font-semibold" style={{ color: TEXT_1 }}>Behance 2020</h2>
        <p className="mt-2 text-sm" style={{ color: TEXT_3 }}>Earlier work and explorations.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {behanceProjects.map((project, index) => (
          <motion.a key={project.url} href={project.url} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`group block border rounded overflow-hidden transition-all duration-300 hover:-translate-y-1 ${project.color}`}
            style={{ background: CARD, borderColor: BORDER }}>
            <div className="relative overflow-hidden aspect-video" style={{ background: '#f1f1f5' }}>
              <img src={project.cover} alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-xs leading-snug mb-1 transition-colors group-hover:text-zinc-900" style={{ color: TEXT_2 }}>
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: TEXT_3 }}>{project.year}</span>
                <span className="text-xs border px-1.5 py-0.5 rounded" style={{ color: TEXT_3, borderColor: BORDER }}>Be</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mt-10 flex justify-center">
        <a href="https://www.behance.net/lankeonkar" target="_blank" rel="noreferrer"
          className="border px-6 py-3 rounded-full text-sm font-medium transition-colors hover:border-blue-400 hover:text-blue-500"
          style={{ borderColor: BORDER, color: TEXT_2 }}>
          Explore more on Behance
        </a>
      </motion.div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const experience = [
  { role: 'Senior UX Designer', company: 'SlideXpress - A unit of Mindseye Creative', period: 'Dec 2024 — Dec 2025',
    description: 'Building DeckUp SaaS from scratch. Led research, design and cross-functional team. Defined product roadmap, conceptualised GTM strategy and conversion funnels.' },
  { role: 'Senior UX Designer', company: 'Mindseye Creative', period: 'Apr 2023 — Dec 2024',
    description: 'Managed end-to-end client projects from briefs to delivery. Built complex Webflow sites. Led tech and design teams. Leveraged Hotjar, Amplitude and Microsoft Clarity for data-informed decisions.' },
  { role: 'UX Designer', company: 'Tata Consultancy Services', period: 'Sept 2020 — Mar 2022',
    description: 'Contributed to TCS Vision 2025. Heuristic evaluation of Tata Neu app resulting in 13% more engagement. Collaborated on Air Asia flight booking UX. Designed hybrid work booking system.' },
  { role: 'Instructional Designer: (Course Designer) Product Design & Innovation - Part time', company: 'LearningMate', period: 'Nov 2022 — Feb 2023',
    description: 'Designed course structure & sample lessons & assessment criteria for Introduction to Manufacturing: Product Design and Innovation for grades 9-12 in Pennsylvania.' },
  { role: 'Product Designer — Internship', company: 'Kritsnam Technologies', period: 'Oct 2019 — Dec 2019',
    description: 'Designed interactive dashboard for water sensors. Data visualization, device management and calibration. Reduced service time by 50% from 47 to 23 minutes.' },
  { role: 'UX Researcher — Internship', company: 'TeamLease', period: 'May 2019 — July 2019',
    description: 'Primary and secondary research including on-ground interviews, social listening and diary studies for platform revamp. Engagement grew by 126% after redesign.' },
]

const skillSections = [
  { label: 'Design', accent: 'bg-blue-400', skills: ['UX Research & Testing', 'Wireframing & Prototyping', 'Visual Design', 'Design Systems & Components', 'Information Architecture', 'Interaction Design', 'Accessibility (WCAG)', 'Inclusive Design', 'Heuristic Evaluation', 'Experience Mapping', 'Figma', 'Webflow', 'Framer'] },
  { label: 'Technical', accent: 'bg-emerald-400', skills: ['HTML & CSS', 'SQL', 'Python for Analytics', 'A/B Testing & Experimentation', 'Behavioral Analytics', 'Growth Analytics', 'Microsoft Clarity', 'Hotjar', 'Amplitude', 'GitHub', 'Vercel', 'No-code / Low-code'] },
  { label: 'Management', accent: 'bg-amber-400', skills: ['Product Strategy & Roadmapping', 'RICE Framework', 'Efforts vs Impact Studies', 'Agile & Design Thinking', 'Cross-functional Leadership', 'Stakeholder Management', 'Go-to-market Strategy', 'Conversion Funnel Design', 'Feature Prioritization', 'Storytelling Frameworks', 'Primary & Secondary Research', 'Delivery Frameworks'] },
]

// About — intro text only
function LightAbout() {
  return (
    <section id="about" className="px-8 md:px-16 lg:px-24 pt-32 pb-16 border-t" style={{ borderColor: SECTION_BORDER }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="max-w-3xl">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: TEXT_3 }}>About</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: TEXT_1 }}>Craftsmanship + Tech + Amazing folks</h2>
        <h3 className="text-2xl md:text-3xl font-light mb-8" style={{ color: TEXT_2 }}>Hey! Thanks for stopping by.</h3>
        <p className="text-lg leading-relaxed mb-6" style={{ color: TEXT_2 }}>
          I'm an engineer turned Designer with utmost fascination for Tech. Design & Tech interplay with each other, leading to tech inspired Design and vice versa.
        </p>
        <p className="text-lg leading-relaxed" style={{ color: TEXT_2 }}>
          Over the years, my love for intentional design practices has grown tremendously. It is said that "Good design shapes you" and I have literally experienced that, specially in last 2 years. My design passion not only built pixel products but also architecture for space design, lighting design and sound design. "Designing and building with Intent" has literally become my motto. Connect with me if you've any collabs or just chats!
        </p>
      </motion.div>
    </section>
  )
}

// Experience + Skills — side by side in a 2-col grid
function LightExpSkills() {
  return (
    <section className="px-8 md:px-16 lg:px-24 pt-16 pb-32 border-t" style={{ borderColor: SECTION_BORDER }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── Experience (left) ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-widest uppercase mb-8" style={{ color: TEXT_3 }}>Experience</p>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="pb-8 border-b last:border-0" style={{ borderColor: '#f1f1f5' }}>
                <p className="text-xs mb-2" style={{ color: TEXT_3 }}>{exp.period}</p>
                <h3 className="font-semibold mb-0.5 text-sm leading-snug" style={{ color: TEXT_1 }}>{exp.role}</h3>
                <p className="text-sm mb-2" style={{ color: TEXT_2 }}>{exp.company}</p>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_3 }}>{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Skills (right) ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="text-sm tracking-widest uppercase mb-8" style={{ color: TEXT_3 }}>Skills</p>
          <div className="space-y-0">
            {skillSections.map((section, si) => (
              <motion.div key={section.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: si * 0.1 }}
                className="flex items-stretch gap-0 py-6 border-b last:border-0" style={{ borderColor: '#f1f1f5' }}>
                <div className="w-28 shrink-0 self-start pt-1.5">
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap" style={{ color: TEXT_2 }}>{section.label}</span>
                </div>
                <div className={`w-0.5 opacity-70 shrink-0 mr-5 self-stretch ${section.accent}`} />
                <div className="flex flex-wrap gap-2 self-start">
                  {section.skills.map(skill => (
                    <span key={skill}
                      className="border px-3 py-1.5 rounded-full text-xs hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-200 cursor-default"
                      style={{ color: TEXT_2, borderColor: BORDER }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─── SKETCHES ─────────────────────────────────────────────────────────────────
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
const rotations = [-2, 1.5, -1, 2.5, -1.8, 0.8, -2.2, 1.2, 2, -1.5, 1, -2.8, 0.5, -1.2, 2.3, -0.8]

function SketchCard({ sketch, index }: { sketch: typeof sketches[0]; index: number }) {
  const rotation = rotations[index % rotations.length]
  if (!sketch.src) {
    return (
      <motion.div whileHover={{ rotate: 0, scale: 1.05 }}
        style={{ rotate: rotation, background: '#f1f1f5', borderColor: BORDER, width: 192, height: 256 }}
        className="shrink-0 border overflow-hidden cursor-pointer hover:shadow-xl hover:z-10 relative">
        <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ background: '#f8f9fa' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #aaa 27px, #aaa 28px)', backgroundSize: '100% 28px' }} />
          <svg className="w-8 h-8 mb-3 relative z-10" style={{ color: TEXT_3 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <p className="text-xs relative z-10" style={{ color: TEXT_3 }}>{sketch.label}</p>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div whileHover={{ rotate: 0, scale: 1.05 }} style={{ rotate: rotation }}
      className="shrink-0 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-zinc-200 hover:z-10 relative">
      <img src={sketch.src} alt={sketch.label} className="block max-h-[307px] w-auto object-contain" />
    </motion.div>
  )
}

function LightSketches() {
  const doubled = [...sketches, ...sketches]
  return (
    <section className="py-24 border-t overflow-hidden" style={{ borderColor: SECTION_BORDER }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="px-8 md:px-16 lg:px-24 mb-12">
        <p className="text-sm tracking-widest uppercase mb-3" style={{ color: TEXT_3 }}>Thinking out loud</p>
        <h2 className="text-2xl font-semibold" style={{ color: TEXT_1 }}>Design breaks: pen strokes in between design sprints</h2>
        <p className="mt-2 text-sm max-w-md" style={{ color: TEXT_2 }}>
          Raw sketches and explorations — My love for sketching & early concepts keep me going.
        </p>
      </motion.div>

      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${BG}, transparent)` }} />
        <motion.div className="flex gap-6 py-4 w-max"
          animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}>
          {doubled.map((sketch, i) => <SketchCard key={`${sketch.id}-${i}`} sketch={sketch} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function LightFooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const PARTICLE_COUNT = 180
    const CONNECTION_DIST = 160
    const SPEED = 0.3
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED, r: Math.random() * 1.5 + 0.5,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(80,130,200,${alpha})`; ctx.lineWidth = 0.9; ctx.stroke()
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(80,130,200,0.5)'; ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />
}

function LightFooter() {
  return (
    <footer id="contact" className="relative px-8 md:px-16 lg:px-24 pt-24 pb-12 border-t overflow-hidden"
      style={{ borderColor: SECTION_BORDER }}>
      <LightFooterParticles />
      <p aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[clamp(80px,18vw,220px)] font-black uppercase leading-none tracking-tighter whitespace-nowrap"
        style={{ color: '#ececee' }}>
        Let&apos;s talk
      </p>

      <div className="relative z-10 flex flex-col gap-12">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter max-w-4xl" style={{ color: TEXT_1 }}>
          Let&apos;s Talk
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
          <a href="mailto:onkarlanke.iitk@gmail.com"
            className="group flex items-center gap-3 border rounded-full px-6 py-3 transition-all duration-200 hover:border-zinc-400"
            style={{ borderColor: BORDER, color: TEXT_2 }}>
            <span className="transition-colors" style={{ color: TEXT_3 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="text-sm font-medium">onkarlanke.iitk@gmail.com</span>
          </a>

          <a href="tel:+918669882810"
            className="group flex items-center gap-3 border rounded-full px-6 py-3 transition-all duration-200 hover:border-zinc-400"
            style={{ borderColor: BORDER, color: TEXT_2 }}>
            <span style={{ color: TEXT_3 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="text-sm font-medium">+91 86698 82810</span>
          </a>

          <motion.a href="https://www.linkedin.com/in/onkarlanke/" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="relative group flex items-center gap-3 rounded-full px-6 py-3 font-semibold text-sm overflow-hidden"
            style={{ background: TEXT_1, color: '#fff' }}>
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
            <span className="relative z-10">LinkedIn</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-8 border-t" style={{ borderColor: '#ececee' }}>
          <p className="text-xs" style={{ color: TEXT_3 }}>© {new Date().getFullYear()} Onkar Lanke. All rights reserved.</p>
          <p className="text-xs" style={{ color: TEXT_3 }}>Designed & built with intent.</p>
        </motion.div>
      </div>
    </footer>
  )
}

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
// Lerp-based inertial scroll — content lags slightly behind the wheel,
// giving a viscous, "weighted" feel. EASE controls heaviness: lower = slower.
function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const el = scroller  // stable non-null reference for closures

    const EASE = 0.055   // lower → more resistance / heavier feel

    let currentY = 0
    let targetY = 0
    let rafId: number

    // Mirror content height onto <body> so the native scrollbar renders
    function syncHeight() {
      document.body.style.height = `${el.offsetHeight}px`
    }
    syncHeight()
    const ro = new ResizeObserver(syncHeight)
    ro.observe(el)

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function tick() {
      // Clamp target to valid scroll range
      const maxScroll = el.offsetHeight - window.innerHeight
      targetY = Math.max(0, Math.min(window.scrollY, maxScroll))

      currentY = lerp(currentY, targetY, EASE)
      if (Math.abs(currentY - targetY) < 0.08) currentY = targetY

      el.style.transform = `translateY(${-currentY}px)`
      rafId = requestAnimationFrame(tick)
    }

    // Sync currentY to where the browser thinks it is (handles page load / hash links)
    currentY = window.scrollY
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      document.body.style.height = ''
    }
  }, [])

  return (
    // Fixed container — hides overflow so translated content doesn't peek
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link href="https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap" rel="stylesheet" />
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <div ref={scrollerRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
    </>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LightPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen" style={{ background: BG }}>
        <LightNav />
        <LightHero />
        <LightArticles />
        <LightProjects />
        <LightWebBuilds />
        <LightBehance />
        <LightAbout />
        <LightSketches />
        <LightExpSkills />
        <LightFooter />
      </main>
    </SmoothScroll>
  )
}
