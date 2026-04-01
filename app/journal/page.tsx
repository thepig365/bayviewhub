import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal',
  description:
    'Essays, field notes, profiles, invitations, and project briefs from Bayview Hub.',
  path: '/journal',
})

export default function JournalPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Journal"
      intro="A public editorial layer for Bayview Hub: essays, field notes, profiles, invitations, and project briefs that connect place, culture, hospitality, and participation."
    />
  )
}
