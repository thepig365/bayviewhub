import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Events',
  description:
    'See upcoming events at Bayview Hub, including live music, seasonal dining nights, gallery openings, workshops, and garden experiences.',
  path: '/events',
})

export default function EventsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
