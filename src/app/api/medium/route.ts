import { NextResponse } from 'next/server'

export const revalidate = 3600 // revalidate every hour

const MEDIUM_RSS = 'https://medium.com/feed/@onkarlanke'

function extractCdata(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`, 'i')
  const m = xml.match(re)
  return (m?.[1] ?? m?.[2] ?? '').trim()
}

function extractAll(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`, 'gi')
  const results: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    const val = (m[1] ?? m[2] ?? '').trim()
    if (val) results.push(val)
  }
  return results
}

function cleanUrl(url: string): string {
  return url.split('?')[0]
}

// Maps common Medium category slugs to portfolio-friendly display labels
const TAG_MAP: Record<string, string> = {
  'ux': 'UX Design',
  'ui': 'UI Design',
  'design': 'Design',
  'product-design': 'Product Design',
  'product-management': 'Product',
  'design-thinking': 'Design Thinking',
  'industrial-design': 'Industrial Design',
  'user-research': 'User Research',
  'research': 'Research',
  'strategy': 'Strategy',
  'ai': 'AI',
  'artificial-intelligence': 'AI',
  'claude': 'AI',
  'creativity': 'Creativity',
  'productivity': 'Productivity',
  'typography': 'Typography',
  'branding': 'Branding',
  'illustration': 'Illustration',
  'engineering': 'Engineering',
  'technology': 'Technology',
  'startup': 'Startup',
  'innovation': 'Innovation',
  'leadership': 'Leadership',
  'work': 'Work & Career',
  'culture': 'Culture',
  'aviation': 'Aviation',
  'boeing': 'Case Study',
  'squircle': 'Design Theory',
  'ios': 'iOS',
  'android': 'Android',
  'figma': 'Figma',
  'webflow': 'Webflow',
  'framer': 'Framer',
}

function prettifyTag(slug: string): string {
  const lower = slug.toLowerCase()
  if (TAG_MAP[lower]) return TAG_MAP[lower]
  // Fallback: capitalise each word
  return lower.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function parseItems(rssXml: string) {
  const itemRe = /<item>([\s\S]*?)<\/item>/gi
  const items: Array<{
    title: string
    url: string
    publication: string
    tags: string[]
    pubDate: string
  }> = []

  let m: RegExpExecArray | null
  while ((m = itemRe.exec(rssXml)) !== null) {
    const block = m[1]

    const title = extractCdata(block, 'title')
    const linkMatch = block.match(/<link>([^<]+)<\/link>/) ??
                      block.match(/<guid[^>]*isPermaLink="true"[^>]*>([^<]+)<\/guid>/)
    const url = cleanUrl(linkMatch?.[1]?.trim() ?? '')

    // Publication: from the URL path (e.g. medium.com/design-bootcamp/...)
    const pubMatch = url.match(/medium\.com\/([^/@][^/]*)\//)
    const publication = pubMatch
      ? pubMatch[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Medium'

    const tags = extractAll(block, 'category')
      .map(t => prettifyTag(t))
      .filter((t, i, a) => a.indexOf(t) === i) // dedupe
      .slice(0, 2)

    const pubDateRaw = block.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1]?.trim() ?? ''

    if (title && url) {
      items.push({ title, url, publication, tags, pubDate: pubDateRaw })
    }
  }
  return items
}

export async function GET() {
  try {
    const res = await fetch(MEDIUM_RSS, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-rss-reader/1.0)' },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch RSS' }, { status: 502 })
    }

    const xml = await res.text()
    const items = parseItems(xml).slice(0, 3)

    return NextResponse.json({ articles: items }, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=300' },
    })
  } catch (err) {
    console.error('Medium RSS error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
