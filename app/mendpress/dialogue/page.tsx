import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Dialogue',
  description: 'Conversations, interviews, profiles, and podcast episodes from Mendpress at Bayview Hub.',
  path: '/mendpress/dialogue',
})

export default function MendpressDialoguePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Dialogue"
      intro="Conversations, interviews, profiles, and spoken exchanges carried by voice, method, and listening."
      types={['conversation', 'interview', 'profile', 'podcast_episode']}
      activeSection="dialogue"
    />
  )
}
