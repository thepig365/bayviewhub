import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { JournalCard } from '@/components/editorial/JournalCard'
import { Button } from '@/components/ui/Button'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { SITE_CONFIG } from '@/lib/constants'
import { buildShareImageUrl, buildSharePack, clampShareSummary, metadataFromSharePack } from '@/lib/share-pack'
import {
  editorialAbsoluteUrl,
  editorialHasChinesePageContent,
  editorialSeoDescriptionForLocale,
  editorialSeoTitleForLocale,
  editorialShowNotesForLocale,
  editorialSummaryForLocale,
  editorialTitleForLocale,
  editorialTranscriptForLocale,
  editorialTypeLabelForLocale,
  formatEditorialDate,
  getPublishedEditorialEntryBySlug,
  isAudioFirstEditorialType,
  listRelatedEditorialEntries,
  mendpressSectionLabelForLocale,
} from '@/lib/editorial'
import { localizedHref } from '@/lib/language-routing'

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

function chineseReadingExcerpt(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>, max = 220): string {
  return (
    bodyExcerpt(entry.bodyMarkdownZh || '', max) ||
    bodyExcerpt(entry.showNotesMarkdownZh || '', max) ||
    bodyExcerpt(entry.transcriptMarkdownZh || '', max)
  )
}

function articleDescription(entry: Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>) {
  if (!entry) return 'Mendpress 中文阅读'
  return (
    editorialSeoDescriptionForLocale(entry, 'zh') ||
    editorialSummaryForLocale(entry, 'zh') ||
    chineseReadingExcerpt(entry) ||
    'Mendpress 中文阅读'
  )
}

function articleOgImage(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  return buildShareImageUrl({
    title: editorialTitleForLocale(entry, 'zh'),
    summary: articleShareSummary(entry),
    eyebrow: `${mendpressSectionLabelForLocale(entry.editorialType, 'zh')} / ${editorialTypeLabelForLocale(entry.editorialType, 'zh')} / Mendpress`,
    footer: 'Mendpress',
    theme: 'mendpress',
  })
}

function articleSharePack(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  return buildSharePack({
    title: editorialSeoTitleForLocale(entry, 'zh') || editorialTitleForLocale(entry, 'zh'),
    summary: articleShareSummary(entry),
    path: `/zh/mendpress/${entry.slug}`,
    image: articleOgImage(entry),
    type: 'article',
    locale: 'zh',
    eyebrow: `${mendpressSectionLabelForLocale(entry.editorialType, 'zh')} / ${editorialTypeLabelForLocale(entry.editorialType, 'zh')} / Mendpress`,
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

function articleShareSummary(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  return clampShareSummary(
    [
      editorialSummaryForLocale(entry, 'zh'),
      chineseReadingExcerpt(entry, 520),
      bodyExcerpt(entry.bodyMarkdown || '', 520),
    ]
      .filter(Boolean)
      .join(' ')
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) {
    return {
      title: 'Mendpress',
      description: 'Mendpress 中文阅读',
    }
  }

  const englishUrl = editorialAbsoluteUrl(entry.slug)
  const chineseUrl = `${SITE_CONFIG.url}/zh/mendpress/${entry.slug}`

  if (!editorialHasChinesePageContent(entry)) {
    return {
      title: `${entry.title} | 中文入口`,
      description: '该篇 Mendpress 文章的正式中文版本尚未发布，你仍可从这里进入英文原页。',
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: englishUrl,
      },
      openGraph: {
        title: `${entry.title} | 中文入口`,
        description: '该篇 Mendpress 文章的正式中文版本尚未发布，你仍可从这里进入英文原页。',
        url: chineseUrl,
        locale: 'zh_CN',
        type: 'article',
      },
    }
  }

  const title = editorialSeoTitleForLocale(entry, 'zh') || editorialTitleForLocale(entry, 'zh')
  const description = articleDescription(entry)
  const shareSummary = articleShareSummary(entry)
  const ogImage = articleOgImage(entry)
  const sharePack = articleSharePack(entry)
  const metadata = metadataFromSharePack(sharePack, {
    title,
    description,
  })

  return {
    ...metadata,
    alternates: {
      canonical: chineseUrl,
      languages: {
        'en-AU': englishUrl,
        'zh-CN': chineseUrl,
        'x-default': englishUrl,
      },
    },
    openGraph: {
      type: 'article',
      url: chineseUrl,
      title,
      description: shareSummary,
      siteName: SITE_CONFIG.name,
      locale: 'zh_CN',
      images: [{ url: ogImage, alt: editorialTitleForLocale(entry, 'zh') }],
      publishedTime: entry.publishedAt || undefined,
    },
  }
}

export default async function ChineseMendpressEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()
  const hasChinesePageContent = editorialHasChinesePageContent(entry)

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const englishUrl = editorialAbsoluteUrl(entry.slug)
  const sharePack = articleSharePack(entry)
  const chineseUrl = sharePack.canonicalUrl
  const sectionHref = localizedHref(entry.categoryPath, 'zh')
  const description = articleDescription(entry)
  const shareSummary = sharePack.shareSummary
  const body = entry.bodyMarkdownZh || ''
  const transcript = editorialTranscriptForLocale(entry, 'zh')
  const showNotes = editorialShowNotesForLocale(entry, 'zh')
  const readingLayerNotice =
    !body && (showNotes || transcript)
      ? '这篇条目目前已提供中文导读或中文稿本，便于中文阅读；英文原正文仍保留在英文页中。'
      : null
  const durationLabel = formatDuration(entry.audioDurationSeconds)
  const entryTypeLabel = editorialTypeLabelForLocale(entry.editorialType, 'zh')
  const sectionLabel = mendpressSectionLabelForLocale(entry.editorialType, 'zh')
  const audioLeadTitle = isAudioFirstEditorialType(entry.editorialType) ? entryTypeLabel : '收听这篇内容'
  const audioFirst = isAudioFirstEditorialType(entry.editorialType)
  const featuredRelatedEntry = relatedEntries[0] || null
  const secondaryRelatedEntries = relatedEntries.slice(1)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': entry.audioUrl && isAudioFirstEditorialType(entry.editorialType) ? 'PodcastEpisode' : 'Article',
    headline: editorialTitleForLocale(entry, 'zh'),
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
    articleSection: mendpressSectionLabelForLocale(entry.editorialType, 'zh'),
    mainEntityOfPage: chineseUrl,
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
                {!hasChinesePageContent ? (
                  <>
                    <span className="rounded-full bg-natural-300 px-3 py-1 text-fg/84 dark:bg-neutral-800 dark:text-white/82">
                      中文版本待发布
                    </span>
                    <span className="text-fg/72 dark:text-white/72">/</span>
                  </>
                ) : null}
                <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                  {sectionLabel}
                </span>
                <span className="text-fg/78 dark:text-white/78">/</span>
                <span className="text-fg/78 dark:text-white/78">{entryTypeLabel}</span>
                <span className="text-fg/72 dark:text-white/72">/</span>
                <span className="text-fg/72 dark:text-white/72">Mendpress</span>
              </div>
              <h1 className="mt-5 max-w-5xl text-balance font-serif text-4xl font-semibold text-fg md:text-6xl md:leading-[1.05]">
                {editorialTitleForLocale(entry, 'zh')}
              </h1>
              <p className="mt-6 max-w-3xl text-pretty text-xl leading-9 text-fg/90 dark:text-white/90 md:text-[1.8rem] md:leading-[1.6]">
                {hasChinesePageContent
                  ? editorialSummaryForLocale(entry, 'zh')
                  : '这篇文章的完整中文版本尚未正式发布。当前可先从这里进入英文原页，我们也会在中文内容完成后保持同一篇文章格式同步更新。'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
                {entry.byline ? <span className="font-medium text-fg dark:text-white">{entry.byline}</span> : null}
                {entry.byline ? <span aria-hidden>·</span> : null}
                <span>{formatEditorialDate(entry.publishedAt, 'zh')}</span>
                {entry.readingTimeMinutes ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>约 {entry.readingTimeMinutes} 分钟阅读</span>
                  </>
                ) : null}
                {durationLabel ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{durationLabel} 音频</span>
                  </>
                ) : null}
                {entry.speakers.length ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{entry.speakers.join(' / ')}</span>
                  </>
                ) : null}
              </div>
              <ShareStrip
                url={chineseUrl}
                shareTitle={sharePack.shareTitle}
                shareSummary={shareSummary}
                mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                mailtoIntro={`${description}\n\n阅读链接：`}
                shortShareBlurb={shareSummary}
                bordered={false}
                showSharingPackPanel
                label="分享这篇文章"
                className="mt-7 max-w-4xl"
                locale="zh"
              />
              <div className="mt-5 flex flex-wrap items-center gap-4 text-[15px] leading-6 md:text-sm md:leading-5">
                <Link href="/zh/mendpress" className="text-fg underline underline-offset-4 hover:text-accent">
                  返回 Mendpress
                </Link>
                <Link href={englishUrl} className="text-fg/82 underline underline-offset-4 hover:text-fg dark:text-white/82 dark:hover:text-white">
                  打开英文原页
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
                    locale="zh"
                    note={
                      isAudioFirstEditorialType(entry.editorialType)
                        ? '音频文件保持原始语言发布，但下方的正文、导读与 transcript/script 已切换为中文阅读模式。'
                        : '本页保留原始音频，同时提供中文阅读版本。'
                    }
                  />
                </div>
              ) : null}

              {entry.heroImage ? (
                <div className="overflow-hidden rounded-[1.9rem] border border-border bg-natural-200 dark:border-border dark:bg-surface">
                  <img src={entry.heroImage} alt={editorialTitleForLocale(entry, 'zh')} className="h-auto w-full object-cover" />
                </div>
              ) : null}

              {entry.audioUrl && !audioFirst ? (
                <div id="listen">
                  <EditorialAudioPlayer
                    title={audioLeadTitle}
                    src={entry.audioUrl}
                    speakers={entry.speakers}
                    durationLabel={durationLabel}
                    locale="zh"
                    note={
                      isAudioFirstEditorialType(entry.editorialType)
                        ? '音频文件保持原始语言发布，但下方的正文、导读与 transcript/script 已切换为中文阅读模式。'
                        : '本页保留原始音频，同时提供中文阅读版本。'
                    }
                  />
                </div>
              ) : null}
            </div>
          </header>

          <div className="mt-12">
            <div className="mx-auto max-w-[46rem]">
              {!hasChinesePageContent ? (
                <section className="mt-2 rounded-[1.9rem] border border-border bg-natural-100 px-6 py-7 shadow-sm dark:border-border dark:bg-surface md:px-8 md:py-8">
                  <p className="eyebrow text-accent">中文版本待发布</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg md:text-[2.35rem]">
                    这篇 Mendpress 文章尚未形成正式中文版
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-8 text-fg/88 dark:text-white/82 md:text-base md:leading-7">
                    当前中文路由会保留与英文正文页相同的文章结构，但不会把尚未完成的中文内容伪装成完整译稿。你可以先进入英文原页阅读，我们会在中文内容生成并整理完成后同步更新这里。
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button href={englishUrl} variant="accent">
                      打开英文原页
                    </Button>
                    <Link href="/zh/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                      返回 Mendpress 中文页
                    </Link>
                  </div>
                </section>
              ) : null}

              {hasChinesePageContent && readingLayerNotice ? (
                <section className="mt-8 rounded-2xl border border-border bg-natural-100 px-5 py-4 dark:border-border dark:bg-surface">
                  <p className="text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">{readingLayerNotice}</p>
                </section>
              ) : null}
              {hasChinesePageContent && body ? (
                <EditorialBody body={body} className={readingLayerNotice ? 'mt-8' : 'mt-2 md:mt-4'} locale="zh" />
              ) : null}

              {!hasChinesePageContent ? (
                <section className="mt-12 border-t border-border pt-10 dark:border-border">
                  <p className="eyebrow text-accent">当前英文原文</p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold text-fg md:text-[2.35rem]">{entry.title}</h2>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
                    <span>{mendpressSectionLabelForLocale(entry.editorialType, 'zh')}</span>
                    <span aria-hidden>·</span>
                    <span>{formatEditorialDate(entry.publishedAt, 'zh')}</span>
                    {entry.byline ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>{entry.byline}</span>
                      </>
                    ) : null}
                  </div>
                  <p className="mt-4 text-[1.02rem] leading-8 text-fg/88 dark:text-white/82 md:text-base md:leading-7">
                    {entry.summary}
                  </p>
                </section>
              ) : null}

              {hasChinesePageContent && showNotes ? (
                <section className="mt-14">
                  <p className="eyebrow text-accent">导读说明</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文导读与说明</h2>
                  <EditorialBody body={showNotes} className="mt-6" locale="zh" />
                </section>
              ) : null}

              {hasChinesePageContent && transcript ? (
                <section className="mt-14">
                  <p className="eyebrow text-accent">中文稿本</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文稿本</h2>
                  <EditorialBody body={transcript} className="mt-6" locale="zh" />
                </section>
              ) : null}
            </div>

            <section className="mt-24 border-t border-border pt-14 dark:border-border">
              <div className="mx-auto max-w-[74rem]">
                <h2 className="font-serif text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                  继续阅读 Mendpress
                </h2>

                <div className="mt-12 space-y-16">
                  <section>
                    <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.5rem]">
                      更多来自 {sectionLabel}
                    </h3>
                    <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-lg md:leading-8">
                      顺着这篇内容继续进入同一栏目，或从这里回到更完整的 Mendpress 公共发布流。
                    </p>

                    {featuredRelatedEntry ? (
                      <div className="mt-9 space-y-8">
                        <JournalCard entry={featuredRelatedEntry} layout="lead" locale="zh" />
                        {secondaryRelatedEntries.length ? (
                          <div className="grid gap-8 xl:grid-cols-2">
                            {secondaryRelatedEntries.map((relatedEntry) => (
                              <JournalCard key={relatedEntry.id} entry={relatedEntry} locale="zh" />
                            ))}
                          </div>
                        ) : null}
                        <div className="pt-1">
                          <Link href={sectionHref} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            浏览更多 {sectionLabel}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-8 max-w-2xl">
                        <p className="text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                          下一篇相关内容尚未形成足够清晰的关联推荐。你可以先返回 Mendpress 主流继续阅读。
                        </p>
                        <div className="mt-4">
                          <Link href="/zh/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            浏览 Mendpress
                          </Link>
                        </div>
                      </div>
                    )}
                  </section>

                  <div className="grid gap-14 border-t border-border pt-14 dark:border-border xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                    <section>
                      <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.35rem]">
                        分享这篇内容
                      </h3>
                      <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                        标题、摘要与链接都放在这里，便于你手动带去 LinkedIn、小红书、微信或其他发布流程。
                      </p>
                      <ShareStrip
                        url={chineseUrl}
                        shareTitle={sharePack.shareTitle}
                        shareSummary={shareSummary}
                        mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                        mailtoIntro={`${description}\n\n阅读链接：`}
                        shortShareBlurb={shareSummary}
                        showSharingPackPanel
                        bordered={false}
                        label="分享这篇内容"
                        locale="zh"
                        className="mt-7"
                      />
                    </section>

                    <section className="xl:border-l xl:border-border xl:pl-12 dark:border-border">
                      <h3 className="font-serif text-[2rem] font-semibold leading-tight text-fg md:text-[2.35rem]">
                        继续关注 Mendpress
                      </h3>
                      <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-fg/84 dark:text-white/78 md:text-base md:leading-7">
                        接收 Mendpress 精选文章、项目更新与 Bayview Hub 的公开动向，只在确有内容值得发送时寄出。
                      </p>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Button href={localizedHref('/newsletter', 'zh')} variant="accent">
                          进入通讯页
                        </Button>
                        <Link href={localizedHref('/mendpress', 'zh')} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                          浏览 Mendpress
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
