'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative px-8 md:px-16 lg:px-24 pt-24 pb-12 border-t border-zinc-900 overflow-hidden">

      {/* Large background text */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[clamp(80px,18vw,220px)] font-black uppercase leading-none tracking-tighter text-zinc-900 whitespace-nowrap"
      >
        Let&apos;s talk
      </p>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-12">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter max-w-4xl"
        >
          Connect<br />
          <span className="text-zinc-500">with me.</span>
        </motion.h2>

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center"
        >
          {/* Email */}
          <a
            href="mailto:onkarlanke.iitk@gmail.com"
            className="group flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all duration-200"
          >
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <span className="text-sm font-medium">onkarlanke.iitk@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+918669882810"
            className="group flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all duration-200"
          >
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="text-sm font-medium">+91 78430 45699</span>
          </a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/onkarlanke/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative group flex items-center gap-3 bg-white text-black rounded-full px-6 py-3 font-semibold text-sm overflow-hidden"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            <span className="relative z-10">LinkedIn</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-8 border-t border-zinc-900/60"
        >
          <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} Onkar Lanke. All rights reserved.</p>
          <p className="text-zinc-700 text-xs">Designed & built with intent.</p>
        </motion.div>

      </div>
    </footer>
  )
}
