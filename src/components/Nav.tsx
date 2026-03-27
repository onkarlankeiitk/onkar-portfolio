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
          href="https://drive.google.com/file/d/1wDjkbRqU7HU97B6fdTVDiCW9R__m6_e6/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  )
}
