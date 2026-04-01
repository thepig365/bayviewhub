import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal Field Notes',
  description: 'Seasonal notes and grounded observations from the Bayview Hub estate.',
  path: '/journal/field-notes',
})

export default function JournalFieldNotesPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Field Notes"
      intro="Shorter notes from the estate as a living place: weather, atmosphere, movement, and what is unfolding across Bayview Hub."
      type="field_note"
    />
  )
}
