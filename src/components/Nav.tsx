'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center backdrop-blur-sm bg-[#0a0a0a]/80 border-b border-zinc-900"
    >
      <Link href="/" className="text-white font-semibold text-lg tracking-tight">
        Onkar Lanke
      </Link>
      <div className="flex items-center gap-6">
        <Link href="#work" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
          Work
        </Link>
        <Link href="#about" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
          About
        </Link>
        <a href="mailto:onkarlanke.iitk@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
          Contact
        </a>
        <a
        href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
        className="relative group bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full overflow-hidden hover:bg-zinc-100 transition-colors"
        >
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12" />
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 20px 6px rgba(255,255,255,0.2)' }}
        />
        <span className="relative z-10">Resume</span>
        </a>
      </div>
    </motion.nav>
  )
}


