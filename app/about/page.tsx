import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = {
  ...genMeta({
    title: `About | ${SITE_CONFIG.name}`,
    description:
      'Bayview Hub is a place-based cultural estate at Main Ridge on the Mornington Peninsula. It brings together art, music, hospitality, edible gardens, workshops, and the Mendpress editorial publication as one coherent public ecology. This page explains why those elements belong together, what kind of place Bayview is trying to become, and why it is being built as something more serious than a generic lifestyle or wellness brand.',
    path: '/about',
  }),
  title: {
    absolute: 'About | Bayview Hub',
  },
}

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bayview Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bayview Hub is a place-based cultural ecosystem at 365 Purves Road, Main Ridge, Mornington Peninsula, Victoria. It combines art, music, hospitality, edible gardens, workshops, and editorial publishing as one connected ecology. It is home to the Mendpress editorial publication and the Bayview Arts Gallery."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Bayview Hub located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bayview Hub is located at 365 Purves Road, Main Ridge, Victoria 3928, on the Mornington Peninsula, approximately 90 minutes from Melbourne CBD. Open Wednesday to Sunday, 11am to late."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Mend, Mendpress, and Bayview Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mend is the deeper inquiry into emotional life, meaning, repair, and reconciliation. Mendpress is the editorial publication that gives that inquiry language — essays, dialogues, and visual narratives. Bayview Hub is the physical place where the inquiry is lived through art, workshops, music, gardens, and hospitality."
        }
      },
      {
        "@type": "Question",
        "name": "Is Bayview Hub a wellness retreat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Bayview Hub is not a wellness brand, retreat centre, or therapeutic facility. It is a cultural estate — a serious place for art, editorial work, hospitality, and community. Its workshops are non-clinical creative experiences, not therapeutic treatment."
        }
      },
      {
        "@type": "Question",
        "name": "How do I visit Bayview Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bayview Hub is open Wednesday to Sunday, 11am to late, at 365 Purves Road, Main Ridge, Victoria 3928. See bayviewhub.me/visit for directions, opening hours, and visitor information."
        }
      }
    ]
  }

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-3 text-accent">About Us</p>
          <h1 className="text-4xl font-serif font-bold leading-tight text-fg md:text-5xl lg:text-6xl">
            Why Bayview Hub exists
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-muted reading md:text-lg">
            <p>
              Bayview Hub exists because contemporary life has become increasingly efficient, connected, and accelerated yet often thinner in attention, place, beauty, and shared experience.
            </p>
            <p>
              We are building a living cultural place on the Mornington Peninsula where art, music, hospitality, gardens, workshops, and slow life form part of one larger human ecology.
            </p>
            <p>
              Here, these things belong together. The gallery is not an ornament. Music is not background. Gardens are not scenery. Hospitality is not merely service. Each element helps restore attention, conversation, memory, and a more grounded way of being with others.
            </p>
            <p>
              Bayview Hub also stands in relation to a wider body of work. Mend is the deeper inquiry into emotional life, meaning, repair, and reconciliation. Mendpress gives that inquiry language through essays, conversations, and editorial work. Bayview Hub gives it a physical setting, a rare kind of place where such questions can be lived through art, non-clinical art therapeutic workshops, music, edible gardens, hospitality, beauty, and community.
            </p>
            <p>
              In an age shaped by screens, speed, isolation, and overstimulation, places like this matter. Not because they offer escape, but because they make another way of living visible again.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center rounded bg-accent px-6 py-3 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
            >
              Explore Bayview Hub
            </Link>
            <Link
              href="/mendpress"
              className="inline-flex items-center justify-center rounded border border-border px-6 py-3 text-base font-medium text-fg transition-colors hover:border-accent"
            >
              Read Mendpress
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
