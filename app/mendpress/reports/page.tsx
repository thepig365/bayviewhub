import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Reports',
  description: 'Dispatches, invitations, briefs, and contextual publication material from Mendpress at Bayview Hub.',
  path: '/mendpress/reports',
})

export default function MendpressReportsPage() {
  return (
    <JournalCollectionPage
      eyebrow="Mendpress"
      title="Reports"
      intro="Dispatches, invitations, briefs, and contextual publication material gathered for the Mendpress archive."
      types={['dispatch', 'invitation', 'project_brief']}
      activeSection="reports"
    />
  )
}
