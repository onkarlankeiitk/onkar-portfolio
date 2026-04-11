'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Article {
  title: string
  url: string
  publication: string
  tags: string[]
  pubDate: string
}

const TAG_COLORS = [
  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'bg-green-500/10 text-green-400 border-green-500/20',
  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'bg-amber-500/10 text-amber-400 border-amber-500/20',
]

function tagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

function MediumIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-zinc-800 rounded w-3/4" />
          <div className="h-2.5 bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
      <div className="h-5 w-20 bg-zinc-800 rounded-full hidden md:block" />
    </div>
  )
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/medium')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.articles)) setArticles(data.articles)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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
          <h2 className="text-white text-5xl font-bold">Latest pen-downs..</h2>
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
        {loading ? (
          [0, 1, 2].map(i => <SkeletonRow key={i} />)
        ) : articles.length === 0 ? (
          <p className="text-zinc-600 text-sm">No articles found.</p>
        ) : (
          articles.map((article, index) => {
            const primaryTag = article.tags[0] ?? 'Article'
            return (
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
                    <MediumIcon className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-300 text-sm font-medium truncate group-hover:text-white transition-colors">
                      {article.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border hidden md:block ${tagColor(primaryTag)}`}>
                    {primaryTag}
                  </span>
                  <svg className="w-4 h-4 text-zinc-700 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.a>
            )
          })
        )}
      </div>

    </section>
  )
}
