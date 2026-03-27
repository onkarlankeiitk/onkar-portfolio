'use client'

import { motion } from 'framer-motion'

const articles = [
  {
    title: 'Squircles and how it changed the landscape of iOS Design',
    publication: 'Design Bootcamp',
    url: 'https://medium.com/design-bootcamp/squircles-and-how-it-changed-the-landscape-of-ios-design-381355cb1cca?sk=393894454324173a99f5b5d987eff5a5',
    tag: 'Design Theory',
    tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    readTime: '5 min read',
  },
  {
    title: 'Create powerful tools for research and productivity using Claude Artifacts',
    publication: 'Design Bootcamp',
    url: 'https://medium.com/design-bootcamp/create-powerful-tools-for-research-and-productivity-using-claude-556b10f03373?sk=54e935adaedaccd41cdd30c9c64b57ec',
    tag: 'AI & Productivity',
    tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    readTime: '7 min read',
  },
]

export default function Articles() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-16 border-t border-zinc-900">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Writing</p>
          <h2 className="text-white text-xl font-semibold">Latest pen-downs</h2>
        </div>
        <a
          href="https://medium.com/@onkarlanke"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-600 text-xs hover:text-blue-400 transition-colors"
        >
          All articles →
        </a>
      </motion.div>

      <div className="flex flex-col gap-3">
        {articles.map((article, index) => (
          <motion.a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group flex items-center justify-between gap-6 px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/30 transition-all duration-200"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-zinc-300 text-sm font-medium truncate group-hover:text-white transition-colors">
                  {article.title}
                </p>
                <p className="text-zinc-600 text-xs mt-0.5">{article.readTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full border hidden md:block ${article.tagColor}`}>
                {article.tag}
              </span>
              <svg className="w-4 h-4 text-zinc-700 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  )
}
