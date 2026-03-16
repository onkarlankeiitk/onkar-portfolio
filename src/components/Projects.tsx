'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    slug: 'deckup',
    title: 'DeckUp — SaaS for Consultants',
    company: 'SlideXpress',
    year: '2024',
    tags: ['Product Design', 'SaaS', 'B2B'],
    metric: { value: '45–60%', label: 'Productivity gain' },
    description: 'Built a SaaS product from scratch for power PowerPoint users and consultants. Led research, design and product roadmap.',
  },
  {
    slug: 'dil-kyc',
    title: 'KYC & Onboarding Digitisation',
    company: 'Diamond India Limited',
    year: '2024',
    tags: ['UX Design', 'Fintech', 'Research'],
    metric: { value: '55%', label: 'Onboarding time reduced' },
    description: "Digitised India's largest bullion operator's offline KYC and customer management system.",
  },
  {
    slug: 'tata-neu',
    title: 'Tata Neu App — UX Evaluation',
    company: 'TCS',
    year: '2022',
    tags: ['UX Research', 'Heuristics', 'Analytics'],
    metric: { value: '13%', label: 'Engagement increase' },
    description: 'Conducted heuristic evaluation using Nielsen principles, documenting UX issues across the super-app.',
  },
  {
    slug: 'teamlease',
    title: 'TeamLease Platform Revamp',
    company: 'TeamLease',
    year: '2019',
    tags: ['UX Research', 'Redesign'],
    metric: { value: '126%', label: 'Engagement growth' },
    description: 'Primary and secondary research including on-ground interviews, social listening and diary studies.',
  },
]

export default function Projects() {
  return (
    <section id="work" className="px-8 md:px-16 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-4">Selected Work</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold">Case Studies</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/work/${project.slug}`}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-zinc-600 text-xs mb-1">{project.company} · {project.year}</p>
                    <h3 className="text-white text-xl font-semibold">{project.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-2xl font-bold">{project.metric.value}</div>
                    <div className="text-zinc-600 text-xs">{project.metric.label}</div>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
