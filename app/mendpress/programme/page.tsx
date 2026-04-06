import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Programme',
  description: 'Programme notes, invitations, reports, and event notices from Mendpress at Bayview Hub.',
  path: '/mendpress/programme',
})

export default function MendpressProgrammePage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Programme"
      intro="Programme notes, invitations, reports, and event notices that give Mendpress a public life in time and place."
      types={['programme_note', 'invitation', 'report', 'event_notice']}
      activeSection="programme"
    />
  )
}
