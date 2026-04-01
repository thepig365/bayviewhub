import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Visual Narrative',
  description: 'Place-based and image-led writing from Mendpress at Bayview Hub.',
  path: '/mendpress/visual-narrative',
})

export default function MendpressVisualNarrativePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Visual Narrative"
      intro="Place-based and image-led writing shaped by atmosphere, weather, objects, and lived time."
      types={['field_note']}
      activeSection="visual_narrative"
    />
  )
}
