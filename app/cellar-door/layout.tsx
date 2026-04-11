import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Cellar Door — Wine Tastings, Main Ridge',
  description:
    'Bayview Estate Cellar Door at 365 Purves Road, Main Ridge, Mornington Peninsula: cool-climate tastings, seasonal pairings, and booking paths for groups and premium experiences. Practical visitor context — not generic winery marketing.',
  path: '/cellar-door',
})

export default function CellarDoorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
