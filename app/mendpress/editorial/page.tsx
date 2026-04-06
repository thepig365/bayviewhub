import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Editorial',
  description: 'Editorials, essays, and audio essays from Mendpress at Bayview Hub.',
  path: '/mendpress/editorial',
})

export default function MendpressEditorialPage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Editorial"
      intro="Editorials, essays, and audio essays that give the Mendpress inquiry its public thought."
      types={['editorial', 'essay', 'audio_essay']}
      activeSection="editorial"
    />
  )
}
