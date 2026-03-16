'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center"
    >
      <Link href="/" className="text-white font-semibold text-lg tracking-tight">
        Onkar Lanke
      </Link>
      <div className="flex gap-8">
        <Link href="#work" className="text-zinc-400 hover:text-white transition-colors text-sm">
          Work
        </Link>
        <Link href="#about" className="text-zinc-400 hover:text-white transition-colors text-sm">
          About
        </Link>
        <a href="mailto:onkarlanke.iitk@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-sm">
          Contact
        </a>
      </div>
    </motion.nav>
  )
}
