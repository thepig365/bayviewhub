import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = genMeta({
  title: 'Leon Zhong | Founder of Bayview Hub & Mendpress',
  description:
    'Leon Zhong is building Bayview Hub and Mendpress — a place-based and editorial ecosystem for emotional restoration, cultural life, and a return to what is real.',
  path: '/founder',
  type: 'website',
})

const founderPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Leon Zhong',
  url: 'https://www.bayviewhub.me/founder',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Bayview Estate Holdings',
    url: 'https://www.bayviewhub.me',
  },
  sameAs: [
    'https://linkedin.com/in/bayviewhub',
    'https://leonmend.substack.com',
  ],
}

const founderWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Leon Zhong | Founder of Bayview Hub & Mendpress',
  description:
    'Leon Zhong is building Bayview Hub and Mendpress — a place-based and editorial ecosystem for emotional restoration, cultural life, and a return to what is real.',
  url: 'https://www.bayviewhub.me/founder',
  about: {
    '@type': 'Person',
    name: 'Leon Zhong',
  },
}

const ecosystemCards = [
  {
    title: 'Bayview Hub',
    definition: 'Place-based cultural destination, Mornington Peninsula',
    status: 'Active — hospitality, events, music, garden',
    href: '/',
    external: false,
  },
  {
    title: 'Mendpress',
    definition: 'Editorial platform for essays, dialogue, visual narrative',
    status: 'Live',
    href: '/mendpress',
    external: false,
  },
  {
    title: 'Bayview Arts Gallery',
    definition: 'Curation, private viewing, physical exhibition, art-adjacent workshops',
    status: 'Online live; physical gallery in development',
    href: 'https://gallery.bayviewhub.me',
    external: true,
  },
  {
    title: 'Backyard Small Second Home',
    definition: 'Practical second dwelling programme for Victorian homeowners',
    status: 'Enquiries open',
    href: '/backyard-small-second-home',
    external: false,
  },
  {
    title: 'Mend',
    definition:
      'Deeper inquiry into emotional repair, self-reconciliation, meaning, art, psychology',
    status: 'In development',
    href: null,
    external: false,
  },
  {
    title: 'Edible Gardens',
    definition: 'Nature, food, community, slow living',
    status: 'Part of Bayview ecosystem',
    href: '/visit',
    external: false,
  },
]

const buildingNowItems = [
  'Building the Bayview Hub public ecosystem: art gallery, gardens, workshops, music, hospitality',
  'Developing Mendpress as the public editorial and publishing layer',
  'Growing the gallery — online presence live, physical gallery and curatorial partnership in active development',
  'Building the SSD / Backyard Small Second Home commercial funnel as a practical family infrastructure product',
  'Creating a distribution system across SEO, editorial publishing, LinkedIn, and physical activations',
]

const partnerPathways = [
  'Gallery cofounder / curator / operator',
  'Artists and private collectors',
  'Licensed builder / prefab / SSD delivery partner',
  'Garden, food, and community programme partner',
  'Editorial, content, and media collaborators',
  'Investors or strategic partners who understand place-based, non-VC ecosystem building',
]

const currentAssets = [
  {
    label: 'Bayview physical estate',
    detail: 'Hospitality, events, live music, farmhouse accommodation',
    status: 'Active',
    href: '/',
    external: false,
  },
  {
    label: 'Bayview Arts Gallery online',
    detail: 'gallery.bayviewhub.me',
    status: 'Live',
    href: 'https://gallery.bayviewhub.me',
    external: true,
  },
  {
    label: 'Mendpress',
    detail: 'Editorial publishing platform',
    status: 'Live',
    href: '/mendpress',
    external: false,
  },
  {
    label: 'Backyard Small Second Home programme',
    detail: 'Enquiries open',
    status: 'Active',
    href: '/backyard-small-second-home',
    external: false,
  },
  {
    label: 'Substack',
    detail: 'leonmend.substack.com',
    status: 'Active',
    href: 'https://leonmend.substack.com',
    external: true,
  },
  {
    label: 'LinkedIn',
    detail: '522 followers, 500+ connections',
    status: 'Active',
    href: 'https://linkedin.com/in/bayviewhub',
    external: true,
  },
]

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderPersonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderWebPageSchema) }}
      />

      {/* Section 1 — Hero */}
      <section
        id="hero"
        className="py-24 md:py-36 border-b border-border"
        aria-labelledby="founder-name"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* PHOTO PLACEHOLDER — insert <Image> here when portrait supplied */}
            <p className="text-xs tracking-widest uppercase text-accent mb-6 font-sans">
              Founder — Bayview Hub &amp; Mendpress
            </p>
            <h1
              id="founder-name"
              className="font-serif text-5xl md:text-7xl text-fg leading-tight mb-8"
            >
              Leon Zhong
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-12">
              Building a place-based and editorial ecosystem for emotional restoration, cultural
              life, and a return to what is real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/" variant="accent" size="md">
                Explore Bayview Hub
              </Button>
              <Button href="/mendpress" variant="outline" size="md">
                Read Mendpress
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Partnership Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Founder Thesis */}
      <section
        id="thesis"
        className="py-20 md:py-28 border-b border-border"
        aria-labelledby="thesis-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-10 font-sans">
              Thesis
            </p>
            <h2
              id="thesis-heading"
              className="font-serif text-3xl md:text-4xl text-fg mb-10 leading-snug"
            >
              We are living through a strange abundance.
            </h2>
            <div className="space-y-6 text-base md:text-lg text-muted leading-relaxed">
              <p>
                More content, less attention. More connection, less presence. More productivity,
                less repair. More images, less seeing.
              </p>
              <p>My work sits at the intersection of art, AI, place, and inner life.</p>
              <p>
                Bayview Hub is the physical response: a place-based ecosystem on the Mornington
                Peninsula where cultural, reflective, and restorative layers are being added to an
                already active destination — through art, gardens, music, food, hospitality, and
                more intentional forms of physical connection.
              </p>
              <p>
                Mendpress is the editorial response: a publishing platform for essays, dialogue,
                images, and public thought — built for people who want depth, not volume.
              </p>
              <p>
                Together, they are an attempt to shape a more mindful environment for beauty,
                emotional restoration, and shared presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Ecosystem Map */}
      <section
        id="ecosystem"
        className="py-20 md:py-28 border-b border-border"
        aria-labelledby="ecosystem-heading"
      >
        <div className="container mx-auto px-4">
          <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans">
            Ecosystem
          </p>
          <h2
            id="ecosystem-heading"
            className="font-serif text-3xl md:text-4xl text-fg mb-12 leading-snug"
          >
            The System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {ecosystemCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl text-fg leading-snug">{card.title}</h3>
                  <span className="text-xs tracking-wide text-accent whitespace-nowrap mt-1 font-sans shrink-0">
                    {card.status}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{card.definition}</p>
                {card.href ? (
                  card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover transition-colors self-start mt-auto pt-2"
                    >
                      Visit →
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="text-sm text-accent hover:text-accent-hover transition-colors self-start mt-auto pt-2"
                    >
                      Explore →
                    </Link>
                  )
                ) : (
                  <span className="text-sm text-subtle self-start mt-auto pt-2">Coming</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Building Now */}
      <section
        id="building-now"
        className="py-20 md:py-28 border-b border-border"
        aria-labelledby="building-now-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans">
              Building Now
            </p>
            <h2
              id="building-now-heading"
              className="font-serif text-3xl md:text-4xl text-fg mb-10 leading-snug"
            >
              What I Am Building
            </h2>
            <ol className="space-y-5">
              {buildingNowItems.map((item, i) => (
                <li key={i} className="flex gap-4 text-base text-muted leading-relaxed">
                  <span className="text-accent font-serif text-lg shrink-0 w-5 pt-px">
                    {i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Section 5 — Looking For */}
      <section
        id="looking-for"
        className="py-20 md:py-28 border-b border-border"
        aria-labelledby="looking-for-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans">
              Partnerships
            </p>
            <h2
              id="looking-for-heading"
              className="font-serif text-3xl md:text-4xl text-fg mb-8 leading-snug"
            >
              What I Am Looking For
            </h2>
            <div className="space-y-4 text-base text-muted leading-relaxed mb-10">
              <p>
                I am interested in serious conversations with people who can build, operate,
                curate, deliver, or partner at a system level.
              </p>
              <p>
                I am not looking for generic wellness branding, shallow content production, or
                surface-level collaboration.
              </p>
            </div>
            <ul className="space-y-4">
              {partnerPathways.map((pathway) => (
                <li key={pathway} className="flex gap-4 items-start text-base text-muted">
                  <span
                    className="w-1 h-1 rounded-full bg-accent mt-2.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{pathway}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/contact" variant="accent" size="md">
                Partnership Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Current Assets */}
      <section
        id="assets"
        className="py-20 md:py-28 border-b border-border"
        aria-labelledby="assets-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans">
              Assets
            </p>
            <h2
              id="assets-heading"
              className="font-serif text-3xl md:text-4xl text-fg mb-10 leading-snug"
            >
              Current Assets
            </h2>
            <div className="divide-y divide-border">
              {currentAssets.map((asset) => (
                <div
                  key={asset.label}
                  className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-base text-fg font-medium">{asset.label}</span>
                    <span className="text-sm text-muted">{asset.detail}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-accent tracking-wide">{asset.status}</span>
                    {asset.href &&
                      (asset.external ? (
                        <a
                          href={asset.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-subtle hover:text-accent transition-colors"
                        >
                          Visit →
                        </a>
                      ) : (
                        <Link
                          href={asset.href}
                          className="text-sm text-subtle hover:text-accent transition-colors"
                        >
                          View →
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Closing */}
      <section
        id="closing"
        className="py-24 md:py-36"
        aria-labelledby="closing-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="font-serif text-2xl md:text-3xl text-fg mb-4 leading-snug">
              This is not a content brand pretending to be a place.
            </p>
            <p
              id="closing-heading"
              className="font-serif text-2xl md:text-3xl text-muted mb-14 leading-snug"
            >
              It is a place learning how to speak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/" variant="accent" size="md">
                Explore Bayview Hub
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Partnership Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
