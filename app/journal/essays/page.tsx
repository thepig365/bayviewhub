import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Journal Essays',
  description: 'Longer-form Bayview Hub essays on art, place, hospitality, and cultural meaning.',
  path: '/journal/essays',
})

export default function JournalEssaysPage() {
  return (
    <JournalCollectionPage
      eyebrow="Journal"
      title="Essays"
      intro="Longer-form pieces that interpret Bayview Hub through art, place, gathering, and cultural memory."
      type="essay"
    />
  )
}
