import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 300

const MENDPRESS_DESCRIPTION =
  'Mendpress is the editorial publication of Bayview Hub — essays, dialogues, and visual narratives on art, attention, repair, and slow living. Published from the Mornington Peninsula. Not a blog. A curated editorial publication with a distinct worldview.'

export const metadata: Metadata = {
  title: { absolute: 'Mendpress — Essays, Dialogue & Visual Narrative | Bayview Hub' },
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
  const mendpressFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Mendpress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mendpress is the editorial publication of Bayview Hub. It publishes essays, dialogues, visual narratives, and field notes on art, attention, repair, and the life of a real place. It is not a blog — it is a curated editorial publication with a distinct worldview, produced from the Mornington Peninsula."
        }
      },
      {
        "@type": "Question",
        "name": "What topics does Mendpress cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mendpress covers the relationship between art and attention, slow living and cultural repair, place-based experience, the role of beauty in daily life, and the broader inquiry of what it means to live seriously in an accelerated world."
        }
      },
      {
        "@type": "Question",
        "name": "How often does Mendpress publish?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mendpress publishes when there is something worth reading. It prioritises depth and editorial quality over frequency. Readers can subscribe to the newsletter to be notified of new publications."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Mendpress and Mend?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mend is the broader inquiry into emotional life, meaning, and repair. Mendpress is the editorial and publishing form of that inquiry — the essays, conversations, and narratives that give it language. Bayview Hub is the physical place where the inquiry is lived."
        }
      }
    ]
  }
  const mendpressSchema = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    "name": "Mendpress",
    "description": "Mendpress is the editorial publication of Bayview Hub. It publishes essays, dialogues, visual narratives, and field notes on art, attention, repair, and place-based living. Published from the Mornington Peninsula, Victoria, Australia.",
    "url": "https://www.bayviewhub.me/mendpress",
    "publisher": {
      "@type": "Organization",
      "name": "Bayview Hub",
      "url": "https://www.bayviewhub.me",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "365 Purves Road",
        "addressLocality": "Main Ridge",
        "addressRegion": "VIC",
        "postalCode": "3928",
        "addressCountry": "AU"
      }
    },
    "about": [
      { "@type": "Thing", "name": "Art and attention" },
      { "@type": "Thing", "name": "Slow living" },
      { "@type": "Thing", "name": "Cultural repair" },
      { "@type": "Thing", "name": "Place-based experience" },
      { "@type": "Thing", "name": "Emotional repair" }
    ],
    "inLanguage": ["en", "zh"]
  }
  const editorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mendpress Editorial Desk",
    "jobTitle": "Editor, Mendpress",
    "worksFor": {
      "@type": "Organization",
      "name": "Bayview Hub",
      "url": "https://www.bayviewhub.me"
    },
    "url": "https://www.bayviewhub.me/mendpress"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mendpressSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mendpressFAQSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(editorSchema) }}
      />
      <JournalCollectionPage
        eyebrow="Bayview Hub"
        title="Mendpress"
        intro="Mendpress is Bayview Hub thinking in public — a publishing layer for editorial interpretation, dialogue, visual narrative, programme, and audio-led pieces."
      />
    </>
  )
}
