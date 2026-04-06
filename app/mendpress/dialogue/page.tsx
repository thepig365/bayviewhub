import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Dialogue',
  description:
    'The Dialogue section of Mendpress brings together conversations, interviews, profiles, and podcast episodes shaped by human voice and real exchange. It is the part of the publication that stays closest to speech, encounter, and listening, holding spoken and text-led dialogue inside the broader Mendpress editorial world.',
  path: '/mendpress/dialogue',
  theme: 'mendpress',
  shareEyebrow: 'Dialogue / Mendpress',
  shareFooter: 'Bayview Hub',
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
