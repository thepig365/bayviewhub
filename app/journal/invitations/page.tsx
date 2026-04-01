import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal Invitations',
  description: 'Share-ready invitation pages for exhibitions, dinners, events, workshops, and private viewings.',
  path: '/journal/invitations',
})

export default function JournalInvitationsPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Invitations"
      intro="Elegant invitation pages for exhibitions, dinners, events, workshops, and viewings, built to be read, shared, and acted on."
      type="invitation"
    />
  )
}
