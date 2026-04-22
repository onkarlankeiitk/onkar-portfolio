'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Each tag has a color — used for pill bg and card hover border
const tagColors: Record<string, string> = {
  'Product Design': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'SaaS': 'bg-green-500/10 text-green-400 border-green-500/20',
  'B2B': 'bg-green-500/10 text-green-400 border-green-500/20',
  'UX Design': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Fintech': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Research': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'UX Research': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Strategy': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'E-commerce': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Gamification': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

// Each project gets an accent color for hover border
const accentColors: Record<string, string> = {
  'deckup': 'hover:border-blue-500/40',
  'dil-kyc': 'hover:border-amber-500/40',
  'research-strategy': 'hover:border-green-500/40',
  'fintech-gamification': 'hover:border-purple-500/40',
}

const projects = [
  {
    slug: 'deckup',
    title: 'Deck-Up — SaaS for Consultants',
    company: 'SlideXpress',
    year: '2024',
    tags: ['Product Design', 'SaaS', 'B2B'],
    metrics: [
      { value: '45–60%', label: 'Productivity gain' },
      { value: '40%', label: 'User comfort' },
    ],
    description: 'DeckUp increases the productivity of daily power users by 45–60% by providing a toolbar specifically created for power users. Phase 2 integrates AI for personalisation and quick deck generation.',
  },
  {
    slug: 'dil-kyc',
    title: 'Digitisation of KYC & Customer Management',
    company: 'Diamond India Limited',
    year: '2024',
    tags: ['UX Design', 'Fintech', 'Research'],
    metrics: [
      { value: '55%', label: 'Onboarding time reduced' },
      { value: '40%', label: 'Employee efficiency' },
    ],
    description: "DIL is India's largest bullion supplier. We digitised their extensive offline KYC and customer management system, reducing onboarding from 2 weeks to 5–7 days.",
  },
  {
    slug: 'research-strategy',
    title: 'Research & Strategy for Growth',
    company: 'Commongood, USA',
    year: '2023',
    tags: ['UX Research', 'Strategy', 'E-commerce'],
    metrics: [
      { value: '43%', label: 'Content engagement' },
      { value: '11%', label: 'Cart checkout volume' },
    ],
    description: 'UX evaluation and research-based strategies for a US-based snacking company specializing in healthy, convenient and delicious snack bars.',
  },
  {
    slug: 'fintech-gamification',
    title: 'Gamification in Fintech — Board Game Inspired',
    company: 'Mindseye Creative',
    year: '2023',
    tags: ['Gamification', 'Fintech', 'UX Design'],
    metrics: [
      { value: '85%', label: 'Usability score' },
      { value: '70%', label: 'User retention' },
    ],
    description: 'Designed a user-friendly fintech interface inspired by board game mechanics, simplifying access to complex financial products through familiar interaction patterns.',
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
        <h2 className="text-white text-4xl md:text-5xl font-light">Case Studies</h2>
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
              <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${accentColors[project.slug]}`}>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-zinc-600 text-xs mb-1">{project.company} · {project.year}</p>
                    <h3 className="text-white text-xl font-light leading-snug">{project.title}</h3>
                  </div>
                  <div className="text-zinc-700 group-hover:text-white transition-colors ml-4 shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{project.description}</p>

                <div className="flex gap-8 mb-6">
                  {project.metrics.map(metric => (
                    <div key={metric.label}>
                      <div className="text-white text-2xl font-normal">{metric.value}</div>
                      <div className="text-zinc-600 text-xs mt-0.5">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full border ${tagColors[tag] || 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
                    >
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
