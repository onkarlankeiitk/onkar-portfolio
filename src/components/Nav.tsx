'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Always show when near the top
      if (y < 80) { setVisible(true); lastY.current = y; return }
      // Show on upscroll, hide on downscroll
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
          className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center backdrop-blur-sm bg-[#0a0a0a]/80 border-b border-zinc-900"
        >
          <Link href="/#hero" className="text-white font-semibold text-lg tracking-tight">
            Onkar Lanke
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#work" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
              Work
            </Link>
            <Link href="/#about" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
              About
            </Link>
            <Link href="/#contact" className="text-zinc-400 hover:text-white transition-colors text-sm hidden md:block">
              Contact
            </Link>
            <a
              href="https://drive.google.com/file/d/1PNn9pC0hjqr5yJNAO6Donal4jPbvpnWo/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
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
