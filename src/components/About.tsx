'use client'

import { motion } from 'framer-motion'

const experience = [
  {
    role: 'Senior UX Designer / Product Specialist',
    company: 'SlideXpress',
    period: 'Dec 2024 — Dec 2025',
    description: 'Led research & design for DeckUp SaaS. Defined product roadmap using RICE framework.',
  },
  {
    role: 'Senior UX Designer',
    company: 'Mindseye Creative',
    period: 'Apr 2023 — Dec 2024',
    description: 'Managed end-to-end client projects. Built complex Webflow sites. Led design and tech teams.',
  },
  {
    role: 'UX Designer',
    company: 'Tata Consultancy Services',
    period: 'Sept 2020 — Mar 2022',
    description: 'Contributed to TCS Vision 2025. Evaluated Tata Neu app. Designed hybrid work booking system.',
  },
]

const skills = [
  'UX Research', 'Product Strategy', 'Figma', 'Design Systems',
  'Prototyping', 'Webflow', 'Framer', 'Behavioral Analytics',
  'A/B Testing', 'RICE Framework', 'Agile', 'HTML & CSS',
]

export default function About() {
  return (
    <section id="about" className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-900">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-24"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-4">About</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-8">
          Designer who thinks like a PM.
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          IIT Kanpur M.Des graduate with 5+ years combining UX design expertise with
          data-driven product strategy. I specialise in behavioural analytics, growth metrics,
          and translating user insights into successful product outcomes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-8">Experience</p>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:gap-16 pb-8 border-b border-zinc-900"
            >
              <div className="md:w-48 shrink-0 mb-2 md:mb-0">
                <p className="text-zinc-600 text-sm">{exp.period}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{exp.role}</h3>
                <p className="text-zinc-500 text-sm mb-2">{exp.company}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-8">Skills</p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-zinc-400 border border-zinc-800 px-4 py-2 rounded-full text-sm hover:border-zinc-600 hover:text-white transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
