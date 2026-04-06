import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 300

const MENDPRESS_DESCRIPTION =
  'Mendpress is the editorial publication of Bayview Hub — Editorial, Dialogue, Visual Narrative, and Programme gathered into one public reading surface. Published from the Mornington Peninsula.'

export const metadata: Metadata = {
  title: { absolute: 'Mendpress — Editorial, Dialogue, Visual Narrative & Programme | Bayview Hub' },
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
    description: 'Mendpress gathers Editorial, Dialogue, Visual Narrative, and Programme into one public reading surface.',
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
          "text": "Mendpress is the editorial publication of Bayview Hub. It publishes Editorial, Dialogue, Visual Narrative, and Programme pieces on art, attention, presence, and public life. It is not a blog — it is a curated editorial publication produced from the Mornington Peninsula."
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
    "description": "Mendpress is the editorial publication of Bayview Hub. It gathers Editorial, Dialogue, Visual Narrative, and Programme pieces on art, attention, presence, and place-based public life.",
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
        intro="Editorial gives the inquiry its thought. Dialogue gives it voices. Visual Narrative gives it eyes. Programme gives it public life."
      />
    </>
  )
}
