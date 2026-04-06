import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Visual Narrative',
  description:
    'Visual Narrative gathers the image-led side of Mendpress: visual essays, photo stories, and artwork readings shaped by sequence, atmosphere, and close attention. It is where Bayview Hub’s publishing surface works through images and visual interpretation rather than argument alone, giving the publication a slower and more spatial mode of reading.',
  path: '/mendpress/visual-narrative',
  theme: 'mendpress',
  shareEyebrow: 'Visual Narrative / Mendpress',
  shareFooter: 'Bayview Hub',
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
