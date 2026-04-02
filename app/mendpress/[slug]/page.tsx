import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { EditorialPullQuote } from '@/components/editorial/EditorialPullQuote'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import {
  defaultEditorialPrimaryCta,
  editorialAbsoluteUrl,
  editorialContextLinks,
  editorialTypeAdminLabel,
  formatEditorialDate,
  getPublishedEditorialEntryBySlug,
  isAudioFirstEditorialType,
  listRelatedEditorialEntries,
  mendpressSectionDescription,
  mendpressSectionLabel,
} from '@/lib/editorial'

export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }>
}

function bodyExcerpt(body: string, max = 220): string {
  const firstParagraph = body
    .trim()
    .split(/\n{2,}/)
    .map((section) => section.trim())
    .find((section) => {
      const line = section.split('\n')[0]?.trim() || ''
      return line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('!audio[') && !line.startsWith('>') && !line.startsWith('- ')
    })

  const clean = (firstParagraph || '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

function articleDescription(entry: Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>) {
  if (!entry) return 'Mendpress at Bayview Hub'
  return entry.seoDescription || entry.summary || bodyExcerpt(entry.bodyMarkdown) || 'Mendpress at Bayview Hub'
}

function articleOgImage(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  if (entry.heroImage) {
    return entry.heroImage.startsWith('http') ? entry.heroImage : `${SITE_CONFIG.url}${entry.heroImage}`
  }
  return `${SITE_CONFIG.url}/og-image.png`
}

function articlePullQuote(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  const summary = entry.summary.trim()
  if (summary.length >= 90 && summary.length <= 260) return summary
  return bodyExcerpt(entry.bodyMarkdown, 260) || summary || entry.title
}

function formatDuration(value: number | null): string | null {
  if (!value || value <= 0) return null
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  if (hours > 0) return `${hours}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
  return `${minutes}:${`${seconds}`.padStart(2, '0')}`
}

function isoDuration(value: number | null): string | undefined {
  if (!value || value <= 0) return undefined
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${seconds || (!hours && !minutes) ? `${seconds}S` : ''}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) {
    return {
      title: 'Mendpress',
      description: 'Mendpress at Bayview Hub',
    }
  }

  const title = entry.seoTitle || entry.title
  const description = articleDescription(entry)
  const url = editorialAbsoluteUrl(entry.slug)
  const ogImage = articleOgImage(entry)

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
      images: [{ url: ogImage, alt: entry.title }],
      publishedTime: entry.publishedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function MendpressEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const primaryCta = defaultEditorialPrimaryCta(entry)
  const contextualLinks = editorialContextLinks(entry)
  const absoluteUrl = editorialAbsoluteUrl(entry.slug)
  const description = articleDescription(entry)
  const pullQuote = articlePullQuote(entry)
  const durationLabel = formatDuration(entry.audioDurationSeconds)
  const entryTypeLabel = editorialTypeAdminLabel(entry.editorialType)
  const audioLeadTitle = isAudioFirstEditorialType(entry.editorialType) ? entryTypeLabel : 'Listen to this piece'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': entry.audioUrl && isAudioFirstEditorialType(entry.editorialType) ? 'PodcastEpisode' : 'Article',
    headline: entry.title,
    description,
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
    image: [articleOgImage(entry)],
    articleSection: mendpressSectionLabel(entry.editorialType),
    mainEntityOfPage: absoluteUrl,
    duration: isoDuration(entry.audioDurationSeconds),
    associatedMedia: entry.audioUrl
      ? {
          '@type': 'AudioObject',
          contentUrl: entry.audioUrl,
          duration: isoDuration(entry.audioDurationSeconds),
        }
      : undefined,
  }

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <article className="mx-auto max-w-5xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <header className="rounded-[2rem] border border-border bg-white/80 px-6 py-8 shadow-sm dark:border-border dark:bg-surface/95 md:px-10 md:py-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{mendpressSectionLabel(entry.editorialType)}</span>
                <span>{entryTypeLabel}</span>
                <span>Mendpress</span>
              </div>
              <h1 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-4xl font-semibold text-fg md:text-6xl md:leading-[1.1]">
                {entry.title}
              </h1>
              {entry.summary ? (
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-xl leading-9 text-muted md:text-2xl md:leading-10">
                  {entry.summary}
                </p>
              ) : null}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted">
                {mendpressSectionDescription(entry.editorialType)}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted">
                {entry.byline ? <span>By {entry.byline}</span> : null}
                {entry.byline ? <span aria-hidden>·</span> : null}
                <span>{formatEditorialDate(entry.publishedAt)}</span>
                {entry.readingTimeMinutes ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{entry.readingTimeMinutes} min read</span>
                  </>
                ) : null}
                {durationLabel ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{durationLabel} audio</span>
                  </>
                ) : null}
                {entry.speakers.length ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{entry.speakers.join(', ')}</span>
                  </>
                ) : null}
              </div>
              <ShareStrip
                url={absoluteUrl}
                mailtoSubject={`${entry.title} | Mendpress`}
                mailtoIntro={`${description}\n\nRead it here:`}
                shortShareBlurb={description}
                bordered={false}
                label="Share"
                className="mx-auto mt-7 max-w-3xl"
              />
              <div className="mt-4">
                <Link href="/mendpress" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                  Back to Mendpress
                </Link>
              </div>
            </div>

            {entry.heroImage ? (
              <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-natural-100 dark:border-border dark:bg-surface">
                <img src={entry.heroImage} alt={entry.title} className="h-auto w-full object-cover" />
              </div>
            ) : null}

            {entry.audioUrl ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <EditorialAudioPlayer
                  title={audioLeadTitle}
                  src={entry.audioUrl}
                  speakers={entry.speakers}
                  durationLabel={durationLabel}
                  note={
                    isAudioFirstEditorialType(entry.editorialType)
                      ? 'This piece is published for listening first, with companion editorial material below.'
                      : 'A playable audio version sits alongside the written piece.'
                  }
                />
              </div>
            ) : null}
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <EditorialPullQuote quote={pullQuote} articleTitle={entry.title} articleUrl={absoluteUrl} />
              {entry.bodyMarkdown ? <EditorialBody body={entry.bodyMarkdown} /> : null}

              {entry.showNotesMarkdown ? (
                <section className="mt-10">
                  <p className="eyebrow text-accent">Show notes</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Companion text</h2>
                  <EditorialBody body={entry.showNotesMarkdown} className="mt-5" />
                </section>
              ) : null}

              {entry.transcriptMarkdown ? (
                <section className="mt-10">
                  <p className="eyebrow text-accent">Transcript</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Full transcript</h2>
                  <EditorialBody body={entry.transcriptMarkdown} className="mt-5" />
                </section>
              ) : null}

              <section className="mt-12 rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-accent">Share this piece</p>
                    <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">
                      Continue reading from Mendpress
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                      Pass it on, or continue deeper into the editorial archive.
                    </p>
                  </div>
                  <Link href="/mendpress" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                    Explore Mendpress
                  </Link>
                </div>
                <ShareStrip
                  url={absoluteUrl}
                  mailtoSubject={`${entry.title} | Mendpress`}
                  mailtoIntro={`${description}\n\nRead it here:`}
                  shortShareBlurb={description}
                  label="Share this piece"
                  className="mt-6"
                />
                {relatedEntries.length ? (
                  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {relatedEntries.map((relatedEntry) => (
                      <JournalCard key={relatedEntry.id} entry={relatedEntry} />
                    ))}
                  </div>
                ) : null}
              </section>
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

          {relatedEntries.length ? null : (
            <section className="mt-14 rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
              <p className="eyebrow text-accent">Continue reading</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-serif font-semibold text-fg">More from Mendpress</h2>
                <Link href="/mendpress" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                  Back to Mendpress
                </Link>
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}
