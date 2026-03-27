// lib/case-studies/index.ts
// Registry of all case studies — add each new project here

import { researchStrategy }    from './research-strategy'
import { deckup }              from './deckup'
import { dilKyc }              from './dil-kyc'
import { fintechGamification } from './fintech-gamification'
import type { CaseStudy }      from './types'

export const caseStudies: CaseStudy[] = [
  researchStrategy,
  deckup,
  dilKyc,
  fintechGamification,
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
