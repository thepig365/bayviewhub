import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Experiences',
  description:
    'Explore Bayview Hub experiences across dining, cellar door tastings, arts, events, workshops, accommodation, and edible gardens.',
  path: '/experiences',
})

export default function ExperiencesLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
