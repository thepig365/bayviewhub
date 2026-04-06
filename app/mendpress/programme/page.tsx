import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Programme',
  description:
    'Programme is the public-life section of Mendpress, gathering programme notes, invitations, reports, and event notices connected to Bayview Hub. It turns gatherings, announcements, and cultural activity into a coherent publishing surface, so public programme material is framed with context instead of appearing as isolated updates or event fragments.',
  path: '/mendpress/programme',
  theme: 'mendpress',
  shareEyebrow: 'Programme / Mendpress',
  shareFooter: 'Bayview Hub',
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
