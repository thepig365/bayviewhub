import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress',
  description:
    'Mendpress is Bayview Hub thinking in public — a publishing layer for editorial interpretation, dialogue, visual narrative, and reports.',
  path: '/mendpress',
})

export default function MendpressPage() {
  return (
    <JournalCollectionPage
      eyebrow="Bayview Hub"
      title="Mendpress"
      intro="Mendpress is Bayview Hub thinking in public — a publishing layer for editorial interpretation, dialogue, visual narrative, and reports."
    />
  )
}
