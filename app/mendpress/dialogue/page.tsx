import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Dialogue',
  description: 'Profiles, conversations, interviews, and audio dialogue from Mendpress at Bayview Hub.',
  path: '/mendpress/dialogue',
})

export default function MendpressDialoguePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Dialogue"
      intro="Profiles, conversations, interviews, and spoken exchanges with a clearer human voice."
      types={['conversation', 'interview', 'profile', 'podcast_episode']}
      activeSection="dialogue"
    />
  )
}
