'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl"
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
          Designer. Strategist. Storyteller.
        </motion.h2>

        <motion.p
          variants={item}
          className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          5+ years crafting research-based product strategies and end-to-end experiences.
          IIT Kanpur M.Des. Previously at TCS, Mindseye, SlideXpress.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-12 mb-12">
          {[
            { value: '126%', label: 'Engagement growth' },
            { value: '50%', label: 'Service time reduced' },
            { value: '5+', label: 'Years experience' },
            { value: '9.0', label: 'IIT Kanpur CGPA' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-white text-3xl font-bold">{stat.value}</div>
              <div className="text-zinc-600 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex gap-4">
          <a
            href="#work"
            className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            View Work
          </a>
          <a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            className="border border-zinc-700 text-zinc-400 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
