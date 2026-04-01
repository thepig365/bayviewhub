import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal Profiles',
  description: 'Profiles of artists, partners, makers, hosts, and collaborators in the Bayview Hub world.',
  path: '/journal/profiles',
})

export default function JournalProfilesPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Profiles"
      intro="People-centred editorial pieces on the artists, hosts, partners, and collaborators who make the Bayview Hub world feel inhabited."
      type="profile"
    />
  )
}
