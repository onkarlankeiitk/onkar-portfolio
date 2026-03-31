'use client'

import { motion } from 'framer-motion'

const experience = [
  {
    role: 'Product Design Specialist',
    company: 'SlideXpress',
    period: 'Dec 2024 — Dec 2025',
    description: 'Built DeckUp SaaS from scratch. Led research, design and cross-functional team. Defined product roadmap using RICE framework. Conceptualised GTM strategy and conversion funnels.',
  },
  {
    role: 'Senior UX Designer',
    company: 'Mindseye Creative',
    period: 'Apr 2023 — Dec 2024',
    description: 'Managed end-to-end client projects from briefs to delivery. Built complex Webflow sites. Led tech and design teams. Leveraged Hotjar, Amplitude and Microsoft Clarity for data-informed decisions.',
  },
  {
    role: 'Course Designer',
    company: 'LearningMate',
    period: 'Nov 2022 — Feb 2023',
    description: 'Designed course structure for Introduction to Manufacturing: Product Design and Innovation for grades 9-12 in Pennsylvania. Designed structure, content strategy and assessments.',
  },
  {
    role: 'UX Designer',
    company: 'Tata Consultancy Services',
    period: 'Sept 2020 — Mar 2022',
    description: 'Contributed to TCS Vision 2025. Heuristic evaluation of Tata Neu app resulting in 13% more engagement. Collaborated on Air Asia flight booking UX. Designed hybrid work booking system.',
  },
  {
    role: 'Product Designer — Internship',
    company: 'Kritsnam Technologies',
    period: 'Oct 2019 — Dec 2019',
    description: 'Designed interactive dashboard for water sensors. Data visualization, device management and calibration. Reduced service time by 50% from 47 to 23 minutes.',
  },
  {
    role: 'UX Researcher — Internship',
    company: 'TeamLease',
    period: 'May 2019 — July 2019',
    description: 'Primary and secondary research including on-ground interviews, social listening and diary studies for platform revamp. Engagement grew by 126% after redesign.',
  },
]

const skillSections = [
  {
    label: 'Design',
    accent: 'bg-blue-400',
    skills: [
      'UX Research & Testing',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems & Components',
      'Information Architecture',
      'Interaction Design',
      'Accessibility (WCAG)',
      'Inclusive Design',
      'Heuristic Evaluation',
      'Experience Mapping',
      'Figma',
      'Webflow',
      'Framer',
    ],
  },
  {
    label: 'Technical',
    accent: 'bg-emerald-400',
    skills: [
      'HTML & CSS',
      'SQL',
      'Python for Analytics',
      'A/B Testing & Experimentation',
      'Behavioral Analytics',
      'Growth Analytics',
      'Microsoft Clarity',
      'Hotjar',
      'Amplitude',
      'GitHub',
      'Vercel',
      'No-code / Low-code',
    ],
  },
  {
    label: 'Management',
    accent: 'bg-amber-400',
    skills: [
      'Product Strategy & Roadmapping',
      'RICE Framework',
      'Efforts vs Impact Studies',
      'Agile & Design Thinking',
      'Cross-functional Leadership',
      'Stakeholder Management',
      'Go-to-market Strategy',
      'Conversion Funnel Design',
      'Feature Prioritization',
      'Storytelling Frameworks',
      'Primary & Secondary Research',
      'Delivery Frameworks',
    ],
  },
]

export default function About() {
  return (
    <section id="about" className="px-8 md:px-16 lg:px-24 py-32 border-t border-zinc-900">

      {/* ── About intro ─────────────────────────────────────────────────────── */}
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

      {/* ── Experience timeline ──────────────────────────────────────────────── */}
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
              className="flex flex-col md:flex-row md:gap-16 pb-8 border-b border-zinc-900/40"
            >
              <div className="md:w-48 shrink-0 mb-2 md:mb-0">
                <p className="text-zinc-600 text-sm">{exp.period}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-0.5">{exp.role}</h3>
                <p className="text-zinc-500 text-sm mb-2">{exp.company}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Skills — all rows visible simultaneously ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-zinc-600 text-sm tracking-widest uppercase mb-10">Skills</p>

        <div className="space-y-0">
          {skillSections.map((section, sectionIndex) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="flex items-stretch gap-0 py-8 border-b border-zinc-900/40 last:border-0"
            >
              {/* Label */}
              <div className="w-36 shrink-0 self-start pt-2">
                <span className="text-zinc-400 text-sm font-medium tracking-wide whitespace-nowrap">
                  {section.label}
                </span>
              </div>

              {/* Accent line — height matches one pill row (py-2 + text-sm = ~36px) */}
              <div className={`w-0.5 opacity-70 shrink-0 mr-6 self-stretch ${section.accent}`} />

              {/* Pills */}
              <motion.div
                className="flex flex-wrap gap-2.5 self-start"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
              >
                {section.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-zinc-400 border border-zinc-800 px-4 py-2 rounded-full text-sm
                               hover:bg-white hover:text-black hover:border-white
                               transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
