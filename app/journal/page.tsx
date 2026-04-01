import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal | Mendpress',
  description:
    'Mendpress at Bayview Hub. Journal remains the primary public reading and archive surface in v1.',
  path: '/journal',
})

export default function JournalPage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Journal"
      intro="Mendpress is Bayview Hub thinking in public. Journal remains the primary reading and archive surface in v1, bringing together interpretation, dialogue, witness, and archival publication."
    />
  )
}
