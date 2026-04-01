import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal Projects',
  description: 'Project briefs and opportunity-led explainers from Bayview Hub.',
  path: '/journal/projects',
})

export default function JournalProjectsPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Projects"
      intro="Project briefs and commercially serious explainers for Bayview opportunities, participation paths, and selected growth projects."
      type="project_brief"
    />
  )
}
