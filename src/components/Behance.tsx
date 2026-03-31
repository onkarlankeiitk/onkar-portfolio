'use client'

import { motion } from 'framer-motion'

const behanceProjects = [
  {
    title: 'IndiGo Go Next Experience Design',
    url: 'https://www.behance.net/gallery/149525913/IndiGo-Go-Next-Experience-Design',
    cover: '/behance/behance-01.png',
    year: '2020',
    color: 'hover:border-blue-500/40',
  },
  {
    title: 'Designing for Last Mile Reach — Financial Inclusion',
    url: 'https://www.behance.net/gallery/153941575/Designing-for-last-mile-reach-financial-inclusion',
    cover: '/behance/behance-02.png',
    year: '2020',
    color: 'hover:border-green-500/40',
  },
  {
    title: 'Delivering Better Experience — A Redesign',
    url: 'https://www.behance.net/gallery/88634913/Delivering-Better-Experience-A-REDESIGN',
    cover: '/behance/behance-03.png',
    year: '2020',
    color: 'hover:border-amber-500/40',
  },
  {
    title: 'Icons Design Planner',
    url: 'https://www.behance.net/gallery/72384035/Icons-Design-Planner',
    cover: '/behance/behance-04.png',
    year: '2019',
    color: 'hover:border-purple-500/40',
  },
]

export default function Behance() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 border-t border-zinc-900">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-3">Archive</p>
        <h2 className="text-white text-2xl font-semibold">Behance 2020</h2>
        <p className="text-zinc-600 mt-2 text-sm">Earlier work and explorations.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {behanceProjects.map((project, index) => (
          <motion.a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${project.color}`}
          >
            <div className="relative overflow-hidden aspect-video bg-zinc-800">
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
            <div className="p-3">
              <h3 className="text-zinc-300 font-medium text-xs leading-snug mb-1 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 text-xs">{project.year}</span>
                <span className="text-zinc-700 text-xs border border-zinc-800 px-1.5 py-0.5 rounded">
                  Be
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://www.behance.net/lankeonkar"
          target="_blank"
          rel="noreferrer"
          className="border border-zinc-700 text-zinc-400 px-6 py-3 rounded-full text-sm font-medium hover:border-blue-500/60 hover:text-blue-400 transition-colors"
        >
          Explore more on Behance
        </a>
      </motion.div>

    </section>
  )
}
