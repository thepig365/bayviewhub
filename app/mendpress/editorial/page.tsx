import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Editorial',
  description:
    'The Editorial section of Mendpress gathers essays, editorials, and audio essays that carry Bayview Hub’s inquiry in public language. It is where thought is made explicit: longer-form writing on attention, culture, place, and meaning, shaped as a serious publishing surface rather than a fast-moving content feed.',
  path: '/mendpress/editorial',
  theme: 'mendpress',
  shareEyebrow: 'Editorial / Mendpress',
  shareFooter: 'Bayview Hub',
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
