import Link from 'next/link'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'
import { cn } from '@/lib/utils'
import {
  editorialHasChineseCardContent,
  editorialSummaryForLocale,
  editorialTitleForLocale,
  editorialTypeLabelForLocale,
  type EditorialEntry,
  formatEditorialDate,
  isAudioFirstEditorialType,
  mendpressSectionLabelForLocale,
} from '@/lib/editorial'

function formatDuration(value: number | null): string | null {
  if (!value || value <= 0) return null
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  if (hours > 0) return `${hours}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
  return `${minutes}:${`${seconds}`.padStart(2, '0')}`
}

type Props = {
  entry: EditorialEntry
  locale?: SiteLocale
  layout?: 'card' | 'lead' | 'stream'
}

export function JournalCard({ entry, locale = 'en', layout = 'card' }: Props) {
  const entryHref = localizedHref(entry.path, locale)
  const categoryHref = localizedHref(entry.categoryPath, locale)
  const entryTitle = editorialTitleForLocale(entry, locale)
  const entrySummary = editorialSummaryForLocale(entry, locale)
  const hasChineseCard = editorialHasChineseCardContent(entry)
  const isLead = layout === 'lead'
  const isStream = layout === 'stream'
  const metaClass = locale === 'zh' ? 'text-fg/86 dark:text-white/86' : 'text-fg/84 dark:text-white/84'
  const summaryClass = locale === 'zh' ? 'text-fg/92 dark:text-white/92' : 'text-fg/90 dark:text-white/90'
  const duration = formatDuration(entry.audioDurationSeconds)
  const actionLabel = isAudioFirstEditorialType(entry.editorialType)
    ? locale === 'zh'
      ? '打开内容'
      : 'Open piece'
    : locale === 'zh'
      ? '阅读文章'
      : 'Read piece'

  if (isLead || isStream) {
    return (
      <article
        className={cn(
          'relative',
          isLead
            ? 'overflow-hidden rounded-[2rem] border border-border bg-natural-100 shadow-lg dark:border-border dark:bg-surface'
            : 'border-t border-border py-8 first:border-t-0 first:pt-0 dark:border-border'
        )}
      >
        <div className={cn(isLead ? 'grid gap-6 p-6 md:grid-cols-[minmax(0,1.15fr)_340px] md:p-8' : 'grid gap-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-start')}>
          <div className={cn('min-w-0', isLead ? 'flex flex-col justify-center' : '')}>
            <div className={cn('mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 md:text-sm md:leading-5', metaClass)}>
              {locale === 'zh' && !hasChineseCard ? (
                <>
                  <span className="rounded-full bg-natural-300 px-2 py-1 text-[12px] uppercase tracking-[0.14em] text-fg/85 dark:bg-neutral-800 dark:text-white/84 md:text-[11px]">
                    当前仍为英文原文
                  </span>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              {isLead ? (
                <>
                  <span className="rounded-full bg-accent/15 px-2 py-1 text-[12px] uppercase tracking-[0.14em] text-accent md:text-[11px]">
                    {locale === 'zh' ? '最新发布' : 'Latest story'}
                  </span>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              {entry.pinned && !isLead ? (
                <>
                  <span className="rounded-full bg-accent/10 px-2 py-1 text-[12px] uppercase tracking-[0.14em] text-accent md:text-[11px]">
                    {locale === 'zh' ? '置顶' : 'Pinned'}
                  </span>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              <span className="eyebrow text-accent">{mendpressSectionLabelForLocale(entry.editorialType, locale)}</span>
              <span aria-hidden>·</span>
              <span>{editorialTypeLabelForLocale(entry.editorialType, locale)}</span>
              <span aria-hidden>·</span>
              <span>{formatEditorialDate(entry.publishedAt, locale)}</span>
              {entry.byline ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{locale === 'zh' ? entry.byline : `By ${entry.byline}`}</span>
                </>
              ) : null}
              {isAudioFirstEditorialType(entry.editorialType) && duration ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{duration} {locale === 'zh' ? '音频' : 'audio'}</span>
                </>
              ) : entry.readingTimeMinutes ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{locale === 'zh' ? `约 ${entry.readingTimeMinutes} 分钟阅读` : `${entry.readingTimeMinutes} min read`}</span>
                </>
              ) : null}
            </div>

            <h2 className={cn('font-serif font-semibold text-fg text-balance', isLead ? 'text-4xl leading-[1.12] md:text-5xl' : 'text-[1.95rem] leading-tight md:text-[2.3rem]')}>
              <Link href={entryHref} className="transition-colors hover:text-accent">
                {entryTitle}
              </Link>
            </h2>

            {entrySummary ? (
              <p className={cn('mt-4 max-w-3xl text-pretty', isLead ? 'text-lg leading-8 md:text-xl md:leading-9' : 'text-base leading-8', summaryClass)}>
                {entrySummary}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[15px] leading-6 md:text-sm md:leading-5">
              <Link href={entryHref} className="font-medium text-fg underline underline-offset-4 hover:text-accent">
                {actionLabel}
              </Link>
              <Link href={categoryHref} className="text-fg/82 transition-colors hover:text-fg dark:text-white/82 dark:hover:text-white">
                {locale === 'zh' ? '更多来自 ' : 'More from '}
                {mendpressSectionLabelForLocale(entry.editorialType, locale)}
              </Link>
            </div>
          </div>

          {entry.heroImage ? (
            <Link
              href={entryHref}
              className={cn(
                'block overflow-hidden rounded-[1.5rem] border border-border bg-natural-200 dark:border-border dark:bg-neutral-900',
                isLead ? 'self-stretch' : 'md:self-start'
              )}
            >
              <img
                src={entry.heroImage}
                alt={entryTitle}
                className={cn(
                  'h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]',
                  isLead ? 'aspect-[4/5] min-h-[280px] md:min-h-[360px]' : 'aspect-[4/3]'
                )}
              />
            </Link>
          ) : (
            <div
              className={cn(
                'rounded-[1.5rem] border border-border bg-natural-200 dark:border-border dark:bg-neutral-900',
                isLead ? 'min-h-[280px] md:min-h-[360px]' : 'aspect-[4/3]'
              )}
            />
          )}
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'overflow-hidden rounded-3xl border border-border bg-natural-100 shadow-md transition-colors hover:border-accent dark:border-border dark:bg-surface',
      )}
    >
      {entry.heroImage ? (
        <Link href={entryHref} className="block bg-natural-200 dark:bg-neutral-900">
          <img
            src={entry.heroImage}
            alt={entryTitle}
            className="aspect-[16/10] h-full w-full object-cover"
          />
        </Link>
      ) : null}

      <div className="p-6 md:p-8">
        <div className={cn('mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 md:text-sm md:leading-5', metaClass)}>
          {locale === 'zh' && !hasChineseCard ? (
            <>
              <span className="rounded-full bg-natural-300 px-2 py-1 text-[12px] uppercase tracking-[0.14em] text-fg/85 dark:bg-neutral-800 dark:text-white/84 md:text-[11px]">
                当前仍为英文原文
              </span>
              <span aria-hidden>·</span>
            </>
          ) : null}
          {entry.pinned ? (
            <>
              <span className="rounded-full bg-accent/15 px-2 py-1 text-[12px] uppercase tracking-[0.14em] text-accent md:text-[11px]">
                {locale === 'zh' ? '置顶' : 'Pinned'}
              </span>
              <span aria-hidden>·</span>
            </>
          ) : null}
          <span className="eyebrow text-accent">{mendpressSectionLabelForLocale(entry.editorialType, locale)}</span>
          <span aria-hidden>·</span>
          <span>{editorialTypeLabelForLocale(entry.editorialType, locale)}</span>
          <span aria-hidden>·</span>
          <span>{formatEditorialDate(entry.publishedAt, locale)}</span>
          {entry.byline ? (
            <>
              <span aria-hidden>·</span>
              <span>{locale === 'zh' ? entry.byline : `By ${entry.byline}`}</span>
            </>
          ) : null}
          {isAudioFirstEditorialType(entry.editorialType) && duration ? (
            <>
              <span aria-hidden>·</span>
              <span>{duration} {locale === 'zh' ? '音频' : 'audio'}</span>
            </>
          ) : entry.readingTimeMinutes ? (
            <>
              <span aria-hidden>·</span>
              <span>{locale === 'zh' ? `约 ${entry.readingTimeMinutes} 分钟阅读` : `${entry.readingTimeMinutes} min read`}</span>
            </>
          ) : null}
        </div>

        <h2 className="font-serif text-2xl font-semibold text-fg">
          <Link href={entryHref} className="hover:text-accent transition-colors">
            {entryTitle}
          </Link>
        </h2>

        <p className={cn('mt-4 text-[1.02rem] leading-8 md:text-base md:leading-7', summaryClass)}>{entrySummary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-[15px] leading-6 md:text-sm md:leading-5">
          <Link href={entryHref} className="font-medium text-fg underline underline-offset-4 hover:text-accent">
            {actionLabel}
          </Link>
          <Link href={categoryHref} className="text-fg/82 hover:text-fg transition-colors dark:text-white/82 dark:hover:text-white">
            {locale === 'zh' ? '更多来自 ' : 'More from '}
            {mendpressSectionLabelForLocale(entry.editorialType, locale)}
          </Link>
        </div>
      </div>
    </article>
  )
}
