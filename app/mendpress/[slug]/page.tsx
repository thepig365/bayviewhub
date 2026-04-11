import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { JournalCard } from '@/components/editorial/JournalCard'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { topEditorialTagLabels } from '@/lib/editorial-tags'
import { buildShareImageUrl, buildSharePack, clampShareSummary, metadataFromSharePack } from '@/lib/share-pack'
import {
  editorialAbsoluteUrl,
  editorialBodyForLocale,
  editorialHasChinesePageContent,
  editorialHeroImageForLocale,
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
  mendpressSectionLabel,
} from '@/lib/editorial'
import { localizedHref } from '@/lib/language-routing'
import { ArticleReadDepthTracker } from '@/components/analytics/ArticleReadDepthTracker'

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

function articleShareSummary(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  return clampShareSummary(
    [
      editorialSummaryForLocale(entry, 'en'),
      bodyExcerpt(editorialBodyForLocale(entry, 'en'), 520),
    ]
      .filter(Boolean)
      .join(' ')
  )
}

function articleOgImage(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  return buildShareImageUrl({
    title: editorialTitleForLocale(entry, 'en'),
    summary: articleShareSummary(entry),
    eyebrow: `${mendpressSectionLabel(entry.editorialType)} / ${editorialTypeAdminLabel(entry.editorialType)} / Mendpress`,
    footer: 'Mendpress',
    theme: 'mendpress',
  })
}

function articleSharePack(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  const articleTitle = editorialTitleForLocale(entry, 'en')
  return buildSharePack({
    title: `${articleTitle} | Mendpress`,
    summary: articleShareSummary(entry),
    path: `/mendpress/${entry.slug}`,
    image: articleOgImage(entry),
    type: 'article',
    eyebrow: `${mendpressSectionLabel(entry.editorialType)} / ${editorialTypeAdminLabel(entry.editorialType)} / Mendpress`,
    footer: 'Mendpress',
    theme: 'mendpress',
  })
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
  const shareSummary = articleShareSummary(entry)
  const url = editorialAbsoluteUrl(entry.slug)
  const ogImage = articleOgImage(entry)
  const sharePack = articleSharePack(entry)
  const metadata = metadataFromSharePack(sharePack, {
    title: { absolute: title },
    description,
    keywords: topEditorialTagLabels(entry.tags, 'en', 5),
  })

  return {
    ...metadata,
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
      description: shareSummary,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, alt: articleTitle }],
      publishedTime: entry.publishedAt || undefined,
    },
  }
}

export default async function MendpressEntryPage({ params }: Props) {
  // Shared live article template for the public Mendpress reading surface.
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const sharePack = articleSharePack(entry)
  const absoluteUrl = sharePack.canonicalUrl
  const sectionHref = localizedHref(entry.categoryPath, 'en')
  const description = articleDescription(entry)
  const shareSummary = sharePack.shareSummary
  const body = editorialBodyForLocale(entry, 'en')
  const heroImage = editorialHeroImageForLocale(entry, 'en')
  const transcript = editorialTranscriptForLocale(entry, 'en')
  const showNotes = editorialShowNotesForLocale(entry, 'en')
  const durationLabel = formatDuration(entry.audioDurationSeconds)
  const entryTypeLabel = editorialTypeAdminLabel(entry.editorialType)
  const sectionLabel = mendpressSectionLabel(entry.editorialType)
  const visibleTags = topEditorialTagLabels(entry.tags, 'en', 3)
  const audioLeadTitle = isAudioFirstEditorialType(entry.editorialType) ? entryTypeLabel : 'Listen to this piece'
  const audioFirst = isAudioFirstEditorialType(entry.editorialType)
  const featuredRelatedEntry = relatedEntries[0] || null
  const secondaryRelatedEntries = relatedEntries.slice(1)
  const keywordString = entry.tags.length
    ? topEditorialTagLabels(entry.tags, 'en', 5).join(', ')
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
                <span className="text-fg/78 dark:text-white/78">/</span>
                <span className="text-fg/78 dark:text-white/78">{entryTypeLabel}</span>
                <span className="text-fg/72 dark:text-white/72">/</span>
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
              {visibleTags.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/16 bg-white/6 px-3 py-1 text-[12px] tracking-[0.08em] text-fg/78 dark:text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <ShareStrip
                url={absoluteUrl}
                shareTitle={sharePack.shareTitle}
                shareSummary={shareSummary}
                mailtoSubject={`${editorialTitleForLocale(entry, 'en')} | Mendpress`}
                mailtoIntro={`${description}\n\nRead it here:`}
                shortShareBlurb={shareSummary}
                bordered={false}
                showSharingPackPanel
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
                <div id="listen">
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

              {heroImage ? (
                <div className="overflow-hidden rounded-[1.9rem] border border-border bg-natural-200 dark:border-border dark:bg-surface">
                  <img src={heroImage} alt={editorialTitleForLocale(entry, 'en')} className="h-auto w-full object-cover" />
                </div>
              ) : null}

              {entry.audioUrl && !audioFirst ? (
                <div id="listen">
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
            </div>
          </header>

          <div className="mt-12">
            <div className="mx-auto max-w-[46rem]">
              {body ? (
                <ArticleReadDepthTracker slug={entry.slug} locale="en">
                  <EditorialBody body={body} className="mt-2 md:mt-4" locale="en" />
                </ArticleReadDepthTracker>
              ) : null}

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

            <section className="mt-24 border-t border-border pt-14 dark:border-border">
              <div className="mx-auto max-w-[74rem]">
                <h2 className="font-serif text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                  Continue with Mendpress
                </h2>

                <div className="mt-12 space-y-16">
                  <section>
                    <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.5rem]">
                      More from {sectionLabel}
                    </h3>
                    <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-lg md:leading-8">
                      Stay with the same editorial current, or return to the wider Mendpress publication from here.
                    </p>

                    {featuredRelatedEntry ? (
                      <div className="mt-9 space-y-8">
                        <JournalCard entry={featuredRelatedEntry} layout="lead" />
                        {secondaryRelatedEntries.length ? (
                          <div className="grid gap-8 xl:grid-cols-2">
                            {secondaryRelatedEntries.map((relatedEntry) => (
                              <JournalCard key={relatedEntry.id} entry={relatedEntry} />
                            ))}
                          </div>
                        ) : null}
                        <div className="pt-1">
                          <Link href={sectionHref} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            Browse all {sectionLabel}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-8 max-w-2xl">
                        <p className="text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                          The next related piece has not been published yet. Continue through the main Mendpress stream instead.
                        </p>
                        <div className="mt-4">
                          <Link href="/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            Explore Mendpress
                          </Link>
                        </div>
                      </div>
                    )}
                  </section>

                  <div className="grid gap-14 border-t border-border pt-14 dark:border-border xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                    <section>
                      <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.35rem]">
                        Share this piece
                      </h3>
                      <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                        Keep the title, summary, and link close at hand for posting manually, without losing the platform tools.
                      </p>
                      <ShareStrip
                        url={absoluteUrl}
                        shareTitle={sharePack.shareTitle}
                        shareSummary={shareSummary}
                        mailtoSubject={`${editorialTitleForLocale(entry, 'en')} | Mendpress`}
                        mailtoIntro={`${description}\n\nRead it here:`}
                        shortShareBlurb={shareSummary}
                        showSharingPackPanel
                        bordered={false}
                        label="Share this piece"
                        className="mt-7"
                      />
                    </section>

                    <section className="xl:border-l xl:border-border xl:pl-12 dark:border-border">
                      <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.35rem]">
                        Stay with Mendpress
                      </h3>
                      <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                        Receive selected Mendpress pieces, invitations, and estate notes when there is something worth sharing.
                      </p>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Button href={localizedHref('/newsletter', 'en')} variant="accent">
                          Go to Newsletter
                        </Button>
                        <Link href={localizedHref('/mendpress', 'en')} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                          Explore Mendpress
                        </Link>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
