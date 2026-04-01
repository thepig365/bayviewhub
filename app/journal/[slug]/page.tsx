import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import {
  defaultEditorialPrimaryCta,
  editorialAbsoluteUrl,
  editorialContextLinks,
  formatEditorialDate,
  getPublishedEditorialEntryBySlug,
  listRelatedEditorialEntries,
  mendpressSectionDescription,
  mendpressSectionLabel,
} from '@/lib/editorial'

export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) {
    return {
      title: 'Journal | Mendpress',
      description: 'Mendpress at Bayview Hub',
    }
  }

  const title = entry.seoTitle || entry.title
  const description = entry.seoDescription || entry.summary
  const url = editorialAbsoluteUrl(entry.slug)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: entry.heroImage ? [{ url: entry.heroImage, alt: entry.title }] : undefined,
      publishedTime: entry.publishedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: entry.heroImage ? [entry.heroImage] : ['/og-image.png'],
    },
  }
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const primaryCta = defaultEditorialPrimaryCta(entry)
  const contextualLinks = editorialContextLinks(entry)
  const absoluteUrl = editorialAbsoluteUrl(entry.slug)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.seoDescription || entry.summary,
    datePublished: entry.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: entry.byline || 'Bayview Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    image: entry.heroImage ? [entry.heroImage] : undefined,
    articleSection: mendpressSectionLabel(entry.editorialType),
    mainEntityOfPage: absoluteUrl,
  }

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <article className="mx-auto max-w-5xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <div className="text-center">
            <p className="eyebrow text-accent">Mendpress</p>
            <p className="mt-3 text-sm font-medium text-fg">{mendpressSectionLabel(entry.editorialType)}</p>
            <h1 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
              {entry.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted">{entry.summary}</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
              {mendpressSectionDescription(entry.editorialType)}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted">
              <span>{formatEditorialDate(entry.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span>{entry.readingTimeMinutes} min read</span>
              {entry.byline ? (
                <>
                  <span aria-hidden>·</span>
                  <span>By {entry.byline}</span>
                </>
              ) : null}
            </div>
            <div className="mt-4">
              <Link href="/journal" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                Back to the Journal archive
              </Link>
            </div>
          </div>

          {entry.heroImage ? (
            <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-natural-100 dark:border-border dark:bg-surface">
              <img src={entry.heroImage} alt={entry.title} className="h-auto w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <EditorialBody body={entry.bodyMarkdown} />

              <ShareStrip
                url={absoluteUrl}
                mailtoSubject={`${entry.title} | Mendpress`}
                mailtoIntro={`${entry.summary}\n\nRead it here:`}
                shortShareBlurb={entry.summary}
                className="mt-10"
              />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
                <p className="eyebrow text-accent">Next step</p>
                <h2 className="mt-3 text-2xl font-serif font-semibold text-fg">
                  Continue from this piece
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Each Mendpress piece should lead somewhere useful: subscription, visit, enquiry, or deeper reading.
                </p>
                <div className="mt-6">
                  <Button href={primaryCta.href} external={primaryCta.external} variant="accent" className="w-full">
                    {primaryCta.label}
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  {contextualLinks.map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-fg underline underline-offset-4 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>

              <JournalSubscribePanel compact />
            </aside>
          </div>

          {relatedEntries.length ? (
            <section className="mt-14">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-accent">Related reading</p>
                  <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">
                    More from {mendpressSectionLabel(entry.editorialType)}
                  </h2>
                </div>
                <Link href="/journal" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                  View all
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedEntries.map((relatedEntry) => (
                  <JournalCard key={relatedEntry.id} entry={relatedEntry} />
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  )
}
