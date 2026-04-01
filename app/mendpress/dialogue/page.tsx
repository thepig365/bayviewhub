import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Dialogue',
  description: 'Profiles, conversations, and people-centred pieces from Mendpress at Bayview Hub.',
  path: '/mendpress/dialogue',
})

export default function MendpressDialoguePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Dialogue"
      intro="Profiles, conversations, and people-centred pieces with a clearer human voice."
      types={['profile']}
      activeSection="dialogue"
    />
  )
}
