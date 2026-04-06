import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Visual Narrative',
  description: 'Visual essays, photo stories, and artwork readings from Mendpress at Bayview Hub.',
  path: '/mendpress/visual-narrative',
})

export default function MendpressVisualNarrativePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Visual Narrative"
      intro="Visual essays, photo stories, and artwork readings shaped by atmosphere, image sequence, and close looking."
      types={['visual_essay', 'photo_story', 'artwork_reading']}
      activeSection="visual_narrative"
    />
  )
}
