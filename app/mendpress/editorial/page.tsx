import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Editorial',
  description: 'Editorial interpretation and longer-form essays from Mendpress at Bayview Hub.',
  path: '/mendpress/editorial',
})

export default function MendpressEditorialPage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Editorial"
      intro="Interpretive pieces, essays, and longer-form editorial framing from Bayview Hub."
      types={['essay']}
      activeSection="editorial"
    />
  )
}
