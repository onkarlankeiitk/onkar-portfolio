'use client'

import { motion, Variants } from 'framer-motion'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const tools = [
  { name: 'Figma', category: 'Design', icon: 'https://cdn.simpleicons.org/figma/ffffff' },
  { name: 'Webflow', category: 'Design', icon: 'https://cdn.simpleicons.org/webflow/ffffff' },
  { name: 'Framer', category: 'Design', icon: 'https://cdn.simpleicons.org/framer/ffffff' },
  { name: 'Hotjar', category: 'Research', icon: 'https://cdn.simpleicons.org/hotjar/ffffff' },
  { name: 'Amplitude', category: 'Analytics', icon: '/icons/amplitude.svg' },
  { name: 'Notion', category: 'Strategy', icon: 'https://cdn.simpleicons.org/notion/ffffff' },
  { name: 'Miro', category: 'Strategy', icon: 'https://cdn.simpleicons.org/miro/ffffff' },
  { name: 'MS Clarity', category: 'Analytics', icon: '/icons/ms-clarity.svg' },
  { name: 'GitHub', category: 'Dev', icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Vercel', category: 'Dev', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'Claude', category: 'AI', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
  { name: 'VS Code', category: 'Dev', icon: '/icons/vscode.svg' },
]

// Category accent colors for tool cards
const categoryColors: Record<string, string> = {
  'Design': 'hover:border-blue-500/40',
  'Research': 'hover:border-amber-500/40',
  'Analytics': 'hover:border-amber-500/40',
  'Strategy': 'hover:border-green-500/40',
  'Dev': 'hover:border-purple-500/40',
  'AI': 'hover:border-orange-500/40',
}

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`shrink-0 flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-xl cursor-default transition-colors duration-200 ${categoryColors[tool.category] || 'hover:border-zinc-600'}`}
    >
      <img
        src={tool.icon}
        alt={tool.name}
        className="w-5 h-5 brightness-0 invert opacity-80"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
      <span className="text-zinc-300 text-sm font-medium whitespace-nowrap">{tool.name}</span>
      <span className="text-zinc-600 text-xs whitespace-nowrap">{tool.category}</span>
    </motion.div>
  )
}

function MarqueeRow() {
  const tripled = [...tools, ...tools, ...tools]
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      <motion.div
        className="flex gap-5 py-2 w-max"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {tripled.map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 relative overflow-hidden">

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl px-8 md:px-16 lg:px-24 relative z-10"
      >
        <motion.p variants={item} className="text-zinc-500 text-sm tracking-widest uppercase mb-6">
          Available for opportunities
        </motion.p>

        <motion.h1
          variants={item}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          Onkar Lanke
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-zinc-400 text-2xl md:text-4xl font-light mb-8"
        >
          Designer. Researcher. Strategist. Storyteller.
        </motion.h2>

        <motion.p
          variants={item}
          className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          5+ years crafting end-to-end experiences and research-based product strategies
        </motion.p>

        <motion.div variants={item} className="flex gap-4 mb-16">
          <a
            href="mailto:onkarlanke.iitk@gmail.com"
            className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            className="border border-zinc-700 text-zinc-400 px-6 py-3 rounded-full text-sm font-medium hover:border-blue-500/60 hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full relative z-10"
      >
        <p className="text-zinc-700 text-xs tracking-widest uppercase mb-4 px-8 md:px-16 lg:px-24">
          Tools I use
        </p>
        <MarqueeRow />
      </motion.div>

    </section>
  )
}
