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
  editorialBodyForLocale,
  editorialContextLinks,
  editorialHasChinesePageContent,
  editorialSeoDescriptionForLocale,
  editorialSeoTitleForLocale,
  editorialShowNotesForLocale,
  editorialSummaryForLocale,
  editorialTitleForLocale,
  editorialTranscriptForLocale,
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
  return (
    editorialSeoDescriptionForLocale(entry, 'en') ||
    editorialSummaryForLocale(entry, 'en') ||
    bodyExcerpt(editorialBodyForLocale(entry, 'en')) ||
    'Mendpress at Bayview Hub'
  )
}

function articleOgImage(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  if (entry.heroImage) {
    return entry.heroImage.startsWith('http') ? entry.heroImage : `${SITE_CONFIG.url}${entry.heroImage}`
  }
  return `${SITE_CONFIG.url}/og-image.png`
}

function articlePullQuote(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  const summary = editorialSummaryForLocale(entry, 'en').trim()
  if (summary.length >= 90 && summary.length <= 260) return summary
  return bodyExcerpt(editorialBodyForLocale(entry, 'en'), 260) || summary || editorialTitleForLocale(entry, 'en')
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

  const articleTitle = editorialTitleForLocale(entry, 'en')
  const title = `${articleTitle} | Mendpress — Bayview Hub`
  const description = articleDescription(entry)
  const url = editorialAbsoluteUrl(entry.slug)
  const ogImage = articleOgImage(entry)

  return {
    title,
    description,
    alternates: editorialHasChinesePageContent(entry)
      ? {
          canonical: url,
          languages: {
            'en-AU': url,
            'zh-CN': `${SITE_CONFIG.url}/zh/mendpress/${entry.slug}`,
            'x-default': url,
          },
        }
      : { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${articleTitle} | Mendpress`,
      description,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, alt: articleTitle }],
      publishedTime: entry.publishedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${articleTitle} | Mendpress`,
      description,
      images: [ogImage],
    },
  }
}

export default async function MendpressEntryPage({ params }: Props) {
  // Shared live article template for the public Mendpress reading surface.
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const primaryCta = defaultEditorialPrimaryCta(entry)
  const contextualLinks = editorialContextLinks(entry)
  const absoluteUrl = editorialAbsoluteUrl(entry.slug)
  const description = articleDescription(entry)
  const pullQuote = articlePullQuote(entry)
  const body = editorialBodyForLocale(entry, 'en')
  const transcript = editorialTranscriptForLocale(entry, 'en')
  const showNotes = editorialShowNotesForLocale(entry, 'en')
  const durationLabel = formatDuration(entry.audioDurationSeconds)
  const entryTypeLabel = editorialTypeAdminLabel(entry.editorialType)
  const sectionLabel = mendpressSectionLabel(entry.editorialType)
  const audioLeadTitle = isAudioFirstEditorialType(entry.editorialType) ? entryTypeLabel : 'Listen to this piece'
  const audioFirst = isAudioFirstEditorialType(entry.editorialType)
  const keywordString = entry.tags.length
    ? entry.tags.join(', ')
    : 'art, attention, repair, presence, Mornington Peninsula, Bayview Hub, Mendpress'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': entry.audioUrl && isAudioFirstEditorialType(entry.editorialType) ? 'PodcastEpisode' : 'Article',
    headline: editorialTitleForLocale(entry, 'en'),
    description,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Periodical',
      name: 'Mendpress',
      url: 'https://www.bayviewhub.me/mendpress',
    },
    keywords: keywordString,
    datePublished: entry.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: entry.byline || 'Bayview Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bayviewhub.me/og-image.png',
      },
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
        <article className="mx-auto max-w-6xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <header className="rounded-[2.25rem] border border-border bg-natural-100 px-6 py-8 shadow-md dark:border-border dark:bg-surface md:px-10 md:py-12">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-fg/72 dark:text-white/72">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-accent">{sectionLabel}</span>
                <span className="text-fg/78 dark:text-white/78">{entryTypeLabel}</span>
                <span className="text-fg/72 dark:text-white/72">Mendpress</span>
              </div>
              <h1 className="mt-5 max-w-5xl text-balance font-serif text-4xl font-semibold text-fg md:text-6xl md:leading-[1.05]">
                {editorialTitleForLocale(entry, 'en')}
              </h1>
              {editorialSummaryForLocale(entry, 'en') ? (
                <p className="mt-6 max-w-3xl text-pretty text-xl leading-9 text-fg/90 dark:text-white/90 md:text-[1.8rem] md:leading-[1.6]">
                  {editorialSummaryForLocale(entry, 'en')}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
                {entry.byline ? <span className="font-medium text-fg dark:text-white">By {entry.byline}</span> : null}
                {entry.byline ? <span aria-hidden>·</span> : null}
                <span>{formatEditorialDate(entry.publishedAt, 'en')}</span>
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
                mailtoSubject={`${editorialTitleForLocale(entry, 'en')} | Mendpress`}
                mailtoIntro={`${description}\n\nRead it here:`}
                shortShareBlurb={description}
                bordered={false}
                label="Share this article"
                className="mt-7 max-w-4xl"
              />
              <div className="mt-5">
                <Link href="/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                  Back to Mendpress
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl space-y-6">
              {entry.audioUrl && audioFirst ? (
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
              ) : null}

              {entry.heroImage ? (
                <div className="overflow-hidden rounded-[1.9rem] border border-border bg-natural-200 dark:border-border dark:bg-surface">
                  <img src={entry.heroImage} alt={editorialTitleForLocale(entry, 'en')} className="h-auto w-full object-cover" />
                </div>
              ) : null}

              {entry.audioUrl && !audioFirst ? (
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
              ) : null}
            </div>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="min-w-0">
              <EditorialPullQuote quote={pullQuote} articleTitle={editorialTitleForLocale(entry, 'en')} articleUrl={absoluteUrl} />
              <div className="mx-auto max-w-[46rem]">
                {body ? <EditorialBody body={body} className="mt-8" locale="en" /> : null}

                {showNotes ? (
                  <section className="mt-14">
                    <p className="eyebrow text-accent">Show notes</p>
                    <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Companion text</h2>
                    <EditorialBody body={showNotes} className="mt-6" locale="en" />
                  </section>
                ) : null}

                {transcript ? (
                  <section className="mt-14">
                    <p className="eyebrow text-accent">Transcript</p>
                    <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Full transcript</h2>
                    <EditorialBody body={transcript} className="mt-6" locale="en" />
                  </section>
                ) : null}
              </div>

              <section className="mt-16 rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
                    <p className="eyebrow text-accent">Continue with Mendpress</p>
                    <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">
                      More from {sectionLabel}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                      Continue from this piece into the same editorial current, or step back out into the wider Mendpress publication.
                    </p>
                    {relatedEntries.length ? (
                      <div className="mt-8 space-y-0">
                        {relatedEntries.map((relatedEntry) => (
                          <JournalCard key={relatedEntry.id} entry={relatedEntry} layout="stream" />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 rounded-3xl border border-border bg-natural-200 p-5 shadow-sm dark:border-border dark:bg-bg/60">
                        <p className="text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                          The next related piece has not been published yet. Continue through the main Mendpress stream instead.
                        </p>
                        <div className="mt-4">
                          <Link href="/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            Explore Mendpress
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <ShareStrip
                      url={absoluteUrl}
                      mailtoSubject={`${editorialTitleForLocale(entry, 'en')} | Mendpress`}
                      mailtoIntro={`${description}\n\nRead it here:`}
                      shortShareBlurb={description}
                      label="Share this piece"
                    />
                    <JournalSubscribePanel
                      compact
                      body="Receive selected Mendpress pieces, invitations, and estate notes when there is something worth sharing."
                      ctaLabel="Go to Newsletter"
                      secondaryLabel="Explore Mendpress"
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-border bg-natural-200 p-6 shadow-md dark:border-border dark:bg-surface">
                <p className="eyebrow text-accent">Next step</p>
                <h2 className="mt-3 text-2xl font-serif font-semibold text-fg">
                  Continue from this piece
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                  Each Mendpress piece should lead somewhere useful: subscription, visit, enquiry, or deeper reading.
                </p>
                <div className="mt-6">
                  <Button href={primaryCta.href} external={primaryCta.external} variant="accent" className="w-full">
                    {primaryCta.label}
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-3 text-[15px] leading-6 md:text-sm md:leading-5">
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
            </aside>
          </div>
        </article>
      </div>
    </main>
  )
}
