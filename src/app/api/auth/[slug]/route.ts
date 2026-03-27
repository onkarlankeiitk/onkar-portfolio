// app/api/auth/[slug]/route.ts
// Handles password checks for all case studies via POST /api/auth/[slug]

import { NextResponse } from 'next/server'
import { getCaseStudy } from '@/lib/case-studies'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const cs = getCaseStudy(params.slug)

  if (!cs) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const { password } = await request.json()
  const expected = process.env[cs.passwordEnvKey]

  if (!expected) {
    console.error(`Missing env var: ${cs.passwordEnvKey}`)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (password === expected) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
