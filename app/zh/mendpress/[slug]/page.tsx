import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import { Button } from '@/components/ui/Button'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { SITE_CONFIG } from '@/lib/constants'
import { buildShareImageUrl, buildSharePack, clampShareSummary, metadataFromSharePack } from '@/lib/share-pack'
import {
  defaultEditorialPrimaryCta,
  editorialAbsoluteUrl,
  editorialContextLinks,
  editorialHasChinesePageContent,
  editorialSeoDescriptionForLocale,
  editorialSeoTitleForLocale,
  editorialShowNotesForLocale,
  editorialSummaryForLocale,
  editorialTitleForLocale,
  editorialTranscriptForLocale,
  editorialTypeLabelForLocale,
  formatEditorialDate,
  getMendpressAudioHubState,
  getPublishedEditorialEntryBySlug,
  isAudioFirstEditorialType,
  listRelatedEditorialEntries,
  mendpressNextStepCopy,
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

function translateLinkLabel(label: string): string {
  switch (label) {
    case 'Mendpress':
      return 'Mendpress'
    case 'Subscribe':
      return '订阅'
    case 'Subscribe to Bayview Notes':
      return '订阅 Bayview Notes'
    case 'Dialogue':
      return '对话'
    case 'Programme':
      return '项目'
    case 'Visual Narrative':
      return '视觉叙事'
    case 'Gallery':
      return '画廊'
    case 'Partners':
      return '合作方'
    case 'Private Viewing':
      return '私人观看'
    case 'Editorial':
      return '评论'
    case 'Read Mendpress':
      return '阅读 Mendpress'
    case 'Continue with Editorial':
      return '继续阅读 Editorial'
    case 'More from Dialogue':
      return '更多 Dialogue'
    case 'Explore Visual Narrative':
      return '浏览 Visual Narrative'
    case 'Newsletter':
      return '通讯页'
    case 'Visit':
      return '到访信息'
    case 'Visit Bayview Hub':
      return '到访 Bayview Hub'
    case 'Request Private Viewing':
      return '申请私人观看'
    case 'Start a Conversation':
      return '开始交流'
    case 'Listen on Mendpress':
      return '在 Mendpress 收听'
    case 'Listen now':
      return '立即收听'
    case 'Plan Your Visit':
      return '规划到访'
    case 'See What Is On':
    case 'See what’s on':
      return '查看近期安排'
    case 'Start Feasibility Check':
      return '开始可行性检查'
    case 'Feasibility':
      return '可行性评估'
    default:
      return label
  }
}

function localizedPrimaryCta(
  entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>,
  audioHubReady: boolean
) {
  const base = defaultEditorialPrimaryCta(entry, { audioHubReady })
  return {
    ...base,
    label: translateLinkLabel(base.label),
    href: base.external || base.href.startsWith('#') ? base.href : localizedHref(base.href, 'zh'),
  }
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
  const sharePack = buildSharePack({
    title,
    summary: shareSummary,
    path: `/zh/mendpress/${entry.slug}`,
    image: ogImage,
    type: 'article',
    locale: 'zh',
    eyebrow: `${mendpressSectionLabelForLocale(entry.editorialType, 'zh')} / ${editorialTypeLabelForLocale(entry.editorialType, 'zh')} / Mendpress`,
    footer: 'Mendpress',
    theme: 'mendpress',
  })
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

  if (!editorialHasChinesePageContent(entry)) {
    return (
      <main className="min-h-screen bg-bg py-16 md:py-20">
        <div className="container mx-auto px-4">
          <section className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-natural-100 px-6 py-10 shadow-md dark:border-border dark:bg-surface md:px-10">
            <p className="eyebrow text-accent">Mendpress 中文入口</p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-fg md:text-5xl">
              该文章的完整中文版尚未发布
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-fg/90 dark:text-white/90">
              这条 Mendpress 路由已经支持中英切换，但这篇文章目前仍以英文为主版本发布。我们不会把仅有中文外壳的页面伪装成完整翻译稿。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={entry.path} variant="primary" size="md">
                打开英文原页
              </Button>
              <Button href="/zh/mendpress" variant="outline" size="md">
                返回 Mendpress 中文页
              </Button>
            </div>

            <section className="mt-8 rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-bg/70">
              <p className="eyebrow text-accent">当前英文原文</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-fg">{entry.title}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg/82 dark:text-white/82">
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
              {entry.summary ? <p className="mt-4 text-base leading-8 text-fg/90 dark:text-white/90">{entry.summary}</p> : null}
            </section>
          </section>
        </div>
      </main>
    )
  }

  const [relatedEntries, audioHubState] = await Promise.all([
    listRelatedEditorialEntries(entry, 3),
    getMendpressAudioHubState(),
  ])
  const primaryCta = localizedPrimaryCta(entry, audioHubState.isReady)
  const contextualLinks = editorialContextLinks(entry).map((link) => ({
    ...link,
    label: translateLinkLabel(link.label),
    href: link.external ? link.href : localizedHref(link.href, 'zh'),
  }))
  const nextStepCopy = mendpressNextStepCopy(entry.editorialType, 'zh')
  const englishUrl = editorialAbsoluteUrl(entry.slug)
  const chineseUrl = `${SITE_CONFIG.url}/zh/mendpress/${entry.slug}`
  const description = articleDescription(entry)
  const shareSummary = articleShareSummary(entry)
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
                {editorialSummaryForLocale(entry, 'zh')}
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
                shareTitle={editorialTitleForLocale(entry, 'zh')}
                shareSummary={shareSummary}
                mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                mailtoIntro={`${description}\n\n阅读链接：`}
                shortShareBlurb={shareSummary}
                bordered={false}
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

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="min-w-0">
              <div className="mx-auto max-w-[46rem]">
                {readingLayerNotice ? (
                  <section className="mt-8 rounded-2xl border border-border bg-natural-100 px-5 py-4 dark:border-border dark:bg-surface">
                    <p className="text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">{readingLayerNotice}</p>
                  </section>
                ) : null}
                {body ? <EditorialBody body={body} className={readingLayerNotice ? 'mt-8' : 'mt-2 md:mt-4'} locale="zh" /> : null}

                {showNotes ? (
                  <section className="mt-14">
                    <p className="eyebrow text-accent">导读说明</p>
                    <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文导读与说明</h2>
                    <EditorialBody body={showNotes} className="mt-6" locale="zh" />
                  </section>
                ) : null}

                {transcript ? (
                  <section className="mt-14">
                    <p className="eyebrow text-accent">中文稿本</p>
                    <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文稿本</h2>
                    <EditorialBody body={transcript} className="mt-6" locale="zh" />
                  </section>
                ) : null}
              </div>

              <section className="mt-16 rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
                    <p className="eyebrow text-accent">继续阅读 Mendpress</p>
                    <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">
                      更多来自 {sectionLabel}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                      从这篇内容继续进入同一栏目，或回到 Mendpress 的公开发布流中继续阅读。
                    </p>
                    {relatedEntries.length ? (
                      <div className="mt-8 space-y-0">
                        {relatedEntries.map((relatedEntry) => (
                          <JournalCard key={relatedEntry.id} entry={relatedEntry} layout="stream" locale="zh" />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 rounded-3xl border border-border bg-natural-200 p-5 shadow-sm dark:border-border dark:bg-bg/60">
                        <p className="text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                          下一篇相关内容尚未形成足够清晰的关联推荐。你可以先返回 Mendpress 主流继续阅读。
                        </p>
                        <div className="mt-4">
                          <Link href="/zh/mendpress" className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            浏览 Mendpress
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <ShareStrip
                      url={chineseUrl}
                      shareTitle={editorialTitleForLocale(entry, 'zh')}
                      shareSummary={shareSummary}
                      mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                      mailtoIntro={`${description}\n\n阅读链接：`}
                      shortShareBlurb={shareSummary}
                      label="分享这篇内容"
                      locale="zh"
                    />
                    <JournalSubscribePanel
                      compact
                      locale="zh"
                      eyebrow="Bayview Notes"
                      title="订阅 Bayview Notes"
                      body="接收 Mendpress 精选文章、项目更新与 Bayview Hub 的公开动向。"
                      ctaLabel="进入通讯页"
                      secondaryLabel="浏览 Mendpress"
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-border bg-natural-200 p-6 shadow-md dark:border-border dark:bg-surface">
                <p className="eyebrow text-accent">{nextStepCopy.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-serif font-semibold text-fg">{nextStepCopy.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                  {nextStepCopy.body}
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
