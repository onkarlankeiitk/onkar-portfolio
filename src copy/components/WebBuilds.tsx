'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

const sites = [
  {
    name: 'Reevo CRM',
    description: 'Austin, Texas-based Salesforce Summit Partner specializing in implementations, customizations, AI integrations, and adoption services.',
    url: 'https://www.reevocrm.com',
    tags: [
      { label: 'Webflow', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      { label: 'CRM', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      { label: 'B2B', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    ],
    location: 'Austin, Texas',
    accentHover: 'hover:border-blue-500/40',
  },
  {
    name: 'Catalyst Healthcare Consulting',
    description: 'Dynamic, hands-on regulatory policy dedicated to helping clients advance innovative healthcare solutions that benefit patients.',
    url: 'https://catalysthcc.com',
    tags: [
      { label: 'Webflow', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      { label: 'Healthcare', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
      { label: 'Consulting', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    ],
    location: 'USA',
    accentHover: 'hover:border-green-500/40',
  },
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

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative cursor-pointer"
    >
      <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-colors duration-300 ${site.accentHover}`}>
        <div className="bg-zinc-800 px-4 py-3 flex items-center gap-3 border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-zinc-700 rounded-md px-3 py-1 flex items-center gap-2">
            <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-zinc-400 text-xs truncate">{site.url.replace('https://', '')}</span>
          </div>
          <a href={site.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-500 hover:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div className="relative overflow-hidden" style={{ height: '280px' }}>
          <iframe
            src={site.url}
            title={site.name}
            className="w-full border-0 pointer-events-none"
            style={{ height: '600px', transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%' }}
            loading="lazy"
          />
          <div className={`absolute inset-0 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-20 bg-zinc-900'}`} />
        </div>
      </div>
      <div className="mt-5 px-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-lg">{site.name}</h3>
          <span className="text-zinc-600 text-xs mt-1">{site.location}</span>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4">{site.description}</p>
        <div className="flex flex-wrap gap-2">
          {site.tags.map(tag => (
            <span key={tag.label} className={`text-xs px-3 py-1 rounded-full border ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function WebBuilds() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-4">No / Low Code</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold">Webflow Builds</h2>
        <p className="text-zinc-500 mt-4 text-lg max-w-xl">
          Production websites crafted using figma, brewed using webflow & fine-tuned with HTML and CSS.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: '1000px' }}>
        {sites.map((site, index) => (
          <motion.div
            key={site.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <SiteCard site={site} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
