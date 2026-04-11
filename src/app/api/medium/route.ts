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

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function cleanUrl(url: string): string {
  return url.split('?')[0]
}

function parseItems(rssXml: string) {
  const itemRe = /<item>([\s\S]*?)<\/item>/gi
  const items: Array<{
    title: string
    url: string
    publication: string
    tags: string[]
    pubDate: string
    readTime: string
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

    const tags = extractAll(block, 'category').slice(0, 3)

    const pubDateRaw = block.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1]?.trim() ?? ''

    // Use content:encoded if available, otherwise fall back to description
    const contentHtml = extractCdata(block, 'content:encoded') || extractCdata(block, 'description')
    const readTime = estimateReadTime(contentHtml)

    if (title && url) {
      items.push({ title, url, publication, tags, pubDate: pubDateRaw, readTime })
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
