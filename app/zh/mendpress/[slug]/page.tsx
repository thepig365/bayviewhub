import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialBody } from '@/components/editorial/EditorialBody'
import { EditorialPullQuote } from '@/components/editorial/EditorialPullQuote'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import { Button } from '@/components/ui/Button'
import { ShareStrip } from '@/components/ui/ShareStrip'
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
  editorialTypeLabelForLocale,
  formatEditorialDate,
  getPublishedEditorialEntryBySlug,
  isAudioFirstEditorialType,
  listRelatedEditorialEntries,
  mendpressSectionDescriptionForLocale,
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

function articleDescription(entry: Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>) {
  if (!entry) return 'Mendpress 中文阅读'
  return (
    editorialSeoDescriptionForLocale(entry, 'zh') ||
    editorialSummaryForLocale(entry, 'zh') ||
    bodyExcerpt(editorialBodyForLocale(entry, 'zh')) ||
    'Mendpress 中文阅读'
  )
}

function articleOgImage(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  if (entry.heroImage) {
    return entry.heroImage.startsWith('http') ? entry.heroImage : `${SITE_CONFIG.url}${entry.heroImage}`
  }
  return `${SITE_CONFIG.url}/og-image.png`
}

function articlePullQuote(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  const summary = editorialSummaryForLocale(entry, 'zh').trim()
  if (summary.length >= 50 && summary.length <= 180) return summary
  return bodyExcerpt(editorialBodyForLocale(entry, 'zh'), 180) || summary || editorialTitleForLocale(entry, 'zh')
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

function translateLinkLabel(label: string): string {
  switch (label) {
    case 'Mendpress':
      return 'Mendpress'
    case 'Subscribe':
      return '订阅'
    case 'Dialogue':
      return '对话'
    case 'Gallery':
      return '画廊'
    case 'Partners':
      return '合作方'
    case 'Private Viewing':
      return '私人观看'
    case 'Editorial':
      return '评论'
    case 'Newsletter':
      return '通讯页'
    case 'Visit':
      return '到访信息'
    case 'Visit Bayview Hub':
      return '到访 Bayview Hub'
    case 'Feasibility':
      return '可行性评估'
    default:
      return label
  }
}

function localizedPrimaryCta(entry: NonNullable<Awaited<ReturnType<typeof getPublishedEditorialEntryBySlug>>>) {
  const base = defaultEditorialPrimaryCta(entry)
  if (entry.primaryCtaLabel) {
    return {
      ...base,
      href: base.external ? base.href : localizedHref(base.href, 'zh'),
    }
  }

  switch (entry.editorialType) {
    case 'editorial':
      return { label: '阅读 Mendpress', href: '/zh/mendpress/editorial', external: false }
    case 'essay':
      return { label: '申请私人观看', href: base.href, external: base.external }
    case 'conversation':
      return { label: '订阅 Bayview Notes', href: '/zh/newsletter', external: false }
    case 'interview':
      return { label: '开始交流', href: base.href, external: base.external }
    case 'audio_essay':
    case 'podcast_episode':
      return { label: '在 Mendpress 收听', href: `/zh/mendpress/${entry.slug}`, external: false }
    case 'field_note':
      return { label: '计划到访', href: '/zh/visit', external: false }
    case 'profile':
      return { label: '开始交流', href: base.href, external: base.external }
    case 'invitation':
      return { label: '查看近期安排', href: localizedHref(base.href, 'zh'), external: false }
    case 'project_brief':
      return { label: '开始项目沟通', href: base.href, external: base.external }
    case 'dispatch':
      return { label: '订阅 Bayview Notes', href: '/zh/newsletter', external: false }
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
  const ogImage = articleOgImage(entry)

  return {
    title,
    description,
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
      description,
      siteName: SITE_CONFIG.name,
      locale: 'zh_CN',
      images: [{ url: ogImage, alt: editorialTitleForLocale(entry, 'zh') }],
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

export default async function ChineseMendpressEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await getPublishedEditorialEntryBySlug(slug)
  if (!entry) notFound()

  if (!editorialHasChinesePageContent(entry)) {
    return (
      <main className="min-h-screen bg-bg py-16 md:py-20">
        <div className="container mx-auto px-4">
          <section className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-white/85 px-6 py-10 shadow-sm dark:border-border dark:bg-surface/95 md:px-10">
            <p className="eyebrow text-accent">Mendpress 中文入口</p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-fg md:text-5xl">
              该文章的完整中文版尚未发布
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
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

            <section className="mt-8 rounded-2xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-bg/60">
              <p className="eyebrow text-accent">当前英文原文</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-fg">{entry.title}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
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
              {entry.summary ? <p className="mt-4 text-base leading-8 text-muted">{entry.summary}</p> : null}
            </section>
          </section>
        </div>
      </main>
    )
  }

  const relatedEntries = await listRelatedEditorialEntries(entry, 3)
  const primaryCta = localizedPrimaryCta(entry)
  const contextualLinks = editorialContextLinks(entry).map((link) => ({
    ...link,
    label: translateLinkLabel(link.label),
    href: link.external ? link.href : localizedHref(link.href, 'zh'),
  }))
  const englishUrl = editorialAbsoluteUrl(entry.slug)
  const chineseUrl = `${SITE_CONFIG.url}/zh/mendpress/${entry.slug}`
  const description = articleDescription(entry)
  const pullQuote = articlePullQuote(entry)
  const body = editorialBodyForLocale(entry, 'zh')
  const transcript = editorialTranscriptForLocale(entry, 'zh')
  const showNotes = editorialShowNotesForLocale(entry, 'zh')
  const durationLabel = formatDuration(entry.audioDurationSeconds)
  const entryTypeLabel = editorialTypeLabelForLocale(entry.editorialType, 'zh')
  const audioLeadTitle = isAudioFirstEditorialType(entry.editorialType) ? entryTypeLabel : '收听这篇内容'
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
        <article className="mx-auto max-w-5xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <header className="rounded-[2rem] border border-border bg-white/80 px-6 py-8 shadow-sm dark:border-border dark:bg-surface/95 md:px-10 md:py-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                  {mendpressSectionLabelForLocale(entry.editorialType, 'zh')}
                </span>
                <span>{entryTypeLabel}</span>
                <span>Mendpress</span>
              </div>
              <h1 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-4xl font-semibold text-fg md:text-6xl md:leading-[1.1]">
                {editorialTitleForLocale(entry, 'zh')}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-pretty text-xl leading-9 text-muted md:text-2xl md:leading-10">
                {editorialSummaryForLocale(entry, 'zh')}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted">
                {mendpressSectionDescriptionForLocale(entry.editorialType, 'zh')}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted">
                {entry.byline ? <span>{entry.byline}</span> : null}
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
                mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                mailtoIntro={`${description}\n\n阅读链接：`}
                shortShareBlurb={description}
                bordered={false}
                label="分享"
                className="mx-auto mt-7 max-w-3xl"
                locale="zh"
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link href="/zh/mendpress" className="text-fg underline underline-offset-4 hover:text-accent">
                  返回 Mendpress
                </Link>
                <Link href={englishUrl} className="text-muted underline underline-offset-4 hover:text-fg">
                  打开英文原页
                </Link>
              </div>
            </div>

            {entry.heroImage ? (
              <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-natural-100 dark:border-border dark:bg-surface">
                <img src={entry.heroImage} alt={editorialTitleForLocale(entry, 'zh')} className="h-auto w-full object-cover" />
              </div>
            ) : null}

            {entry.audioUrl ? (
              <div className="mx-auto mt-8 max-w-4xl">
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
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <EditorialPullQuote quote={pullQuote} articleTitle={editorialTitleForLocale(entry, 'zh')} articleUrl={chineseUrl} locale="zh" />
              {body ? <EditorialBody body={body} className="mt-6" locale="zh" /> : null}

              {showNotes ? (
                <section className="mt-10">
                  <p className="eyebrow text-accent">导读说明</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文导读与说明</h2>
                  <EditorialBody body={showNotes} className="mt-5" locale="zh" />
                </section>
              ) : null}

              {transcript ? (
                <section className="mt-10">
                  <p className="eyebrow text-accent">中文稿本</p>
                  <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">中文稿本</h2>
                  <EditorialBody body={transcript} className="mt-5" locale="zh" />
                </section>
              ) : null}

              <section className="mt-12 rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-accent">分享这篇内容</p>
                    <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">继续阅读 Mendpress</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                      如果这篇内容值得传递下去，可以分享；如果还想继续深入，也可以回到 Mendpress 继续阅读。
                    </p>
                  </div>
                  <Link href="/zh/mendpress" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                    浏览 Mendpress
                  </Link>
                </div>
                <ShareStrip
                  url={chineseUrl}
                  mailtoSubject={`${editorialTitleForLocale(entry, 'zh')} | Mendpress`}
                  mailtoIntro={`${description}\n\n阅读链接：`}
                  shortShareBlurb={description}
                  label="分享这篇内容"
                  className="mt-6"
                  locale="zh"
                />
                {relatedEntries.length ? (
                  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {relatedEntries.map((relatedEntry) => (
                      <JournalCard key={relatedEntry.id} entry={relatedEntry} locale="zh" />
                    ))}
                  </div>
                ) : null}
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
                <p className="eyebrow text-accent">下一步</p>
                <h2 className="mt-3 text-2xl font-serif font-semibold text-fg">从这篇内容继续</h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  每一篇 Mendpress 内容都应通向某个真正有用的下一步: 订阅、到访、交流或继续阅读。
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

              <JournalSubscribePanel
                compact
                locale="zh"
                eyebrow="Bayview Notes"
                title="订阅 Bayview Notes"
                body="接收 Mendpress 精选文章、项目更新与 Bayview Hub 的公开动向。"
                ctaLabel="进入通讯页"
                secondaryLabel="浏览 Mendpress"
              />
            </aside>
          </div>

          {relatedEntries.length ? null : (
            <section className="mt-14 rounded-3xl border border-border bg-natural-50 p-6 dark:border-border dark:bg-surface">
              <p className="eyebrow text-accent">继续阅读</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-serif font-semibold text-fg">更多 Mendpress 内容</h2>
                <Link href="/zh/mendpress" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                  返回 Mendpress
                </Link>
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}
