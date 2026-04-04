import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 300

const MENDPRESS_DESCRIPTION =
  'Mendpress is the editorial publication of Bayview Hub. Essays, conversations, and visual narratives on art, attention, repair, and the life of a real place. Published from the Mornington Peninsula.'

export const metadata: Metadata = {
  title: 'Mendpress — Essays, Dialogue & Visual Narrative | Bayview Hub',
  description: MENDPRESS_DESCRIPTION,
  alternates: {
    canonical: `${SITE_CONFIG.url}/mendpress`,
  },
  openGraph: {
    title: 'Mendpress | Bayview Hub Editorial Publication',
    description: MENDPRESS_DESCRIPTION,
    url: `${SITE_CONFIG.url}/mendpress`,
    siteName: SITE_CONFIG.name,
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Mendpress',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mendpress | Bayview Hub Editorial Publication',
    description:
      'Mendpress is the editorial publication of Bayview Hub. Essays, conversations, and visual narratives on art, attention, repair, and the life of a real place.',
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
}

export default function MendpressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Periodical',
            name: 'Mendpress',
            description:
              'Mendpress is the editorial publication of Bayview Hub. Essays, conversations, and visual narratives on art, attention, repair, and the life of a real place.',
            url: 'https://www.bayviewhub.me/mendpress',
            publisher: {
              '@type': 'Organization',
              name: 'Bayview Hub',
              url: 'https://www.bayviewhub.me',
            },
            inLanguage: ['en', 'zh'],
            locationCreated: {
              '@type': 'Place',
              name: 'Mornington Peninsula, Victoria, Australia',
            },
          }),
        }}
      />
      <JournalCollectionPage
        eyebrow="Bayview Hub"
        title="Mendpress"
        intro="Mendpress is Bayview Hub thinking in public — a publishing layer for editorial interpretation, dialogue, visual narrative, programme, and audio-led pieces."
      />
    </>
  )
}
