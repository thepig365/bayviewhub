import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Cellar Door',
  description:
    'Visit the Bayview Estate Cellar Door in Main Ridge for guided tastings, premium wines, and seasonal food pairings.',
  path: '/cellar-door',
})

export default function CellarDoorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
