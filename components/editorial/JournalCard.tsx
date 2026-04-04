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
  featured?: boolean
  locale?: SiteLocale
}

export function JournalCard({ entry, featured = false, locale = 'en' }: Props) {
  const entryHref = localizedHref(entry.path, locale)
  const categoryHref = localizedHref(entry.categoryPath, locale)
  const entryTitle = editorialTitleForLocale(entry, locale)
  const entrySummary = editorialSummaryForLocale(entry, locale)
  const hasChineseCard = editorialHasChineseCardContent(entry)
  return (
    <article
      className={cn(
        'overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-colors hover:border-accent dark:border-border dark:bg-surface',
        featured ? 'lg:grid lg:grid-cols-[1.25fr_minmax(0,1fr)]' : ''
      )}
    >
      {entry.heroImage ? (
        <Link href={entryHref} className="block bg-natural-200 dark:bg-neutral-900">
          <img
            src={entry.heroImage}
            alt={entryTitle}
            className={cn(
              'h-full w-full object-cover',
              featured ? 'min-h-[320px] lg:min-h-[420px]' : 'aspect-[16/10]'
            )}
          />
        </Link>
      ) : null}

      <div className={cn('p-6 md:p-8', featured ? 'flex flex-col justify-center' : '')}>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          {locale === 'zh' && !hasChineseCard ? (
            <>
              <span className="rounded-full bg-natural-100 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted dark:bg-surface">
                当前仍为英文原文
              </span>
              <span aria-hidden>·</span>
            </>
          ) : null}
          {featured || entry.pinned ? (
            <>
              <span className="rounded-full bg-accent/15 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                {featured ? (locale === 'zh' ? '精选' : 'Featured') : locale === 'zh' ? '置顶' : 'Pinned'}
              </span>
              <span aria-hidden>·</span>
            </>
          ) : null}
          <span className="eyebrow text-accent">{mendpressSectionLabelForLocale(entry.editorialType, locale)}</span>
          <span aria-hidden>·</span>
          <span>{editorialTypeLabelForLocale(entry.editorialType, locale)}</span>
          <span aria-hidden>·</span>
          <span>{formatEditorialDate(entry.publishedAt, locale)}</span>
          {isAudioFirstEditorialType(entry.editorialType) && formatDuration(entry.audioDurationSeconds) ? (
            <>
              <span aria-hidden>·</span>
              <span>{formatDuration(entry.audioDurationSeconds)} {locale === 'zh' ? '音频' : 'audio'}</span>
            </>
          ) : entry.readingTimeMinutes ? (
            <>
              <span aria-hidden>·</span>
              <span>{locale === 'zh' ? `约 ${entry.readingTimeMinutes} 分钟阅读` : `${entry.readingTimeMinutes} min read`}</span>
            </>
          ) : null}
        </div>

        <h2 className={cn('font-serif font-semibold text-fg', featured ? 'text-4xl' : 'text-2xl')}>
          <Link href={entryHref} className="hover:text-accent transition-colors">
            {entryTitle}
          </Link>
        </h2>

        <p className="mt-4 text-base leading-7 text-muted">{entrySummary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link href={entryHref} className="font-medium text-fg underline underline-offset-4 hover:text-accent">
            {isAudioFirstEditorialType(entry.editorialType)
              ? locale === 'zh'
                ? '打开内容'
                : 'Open piece'
              : locale === 'zh'
                ? '阅读文章'
                : 'Read piece'}
          </Link>
          <Link href={categoryHref} className="text-muted hover:text-fg transition-colors">
            {locale === 'zh' ? '更多来自 ' : 'More from '}
            {mendpressSectionLabelForLocale(entry.editorialType, locale)}
          </Link>
        </div>
      </div>
    </article>
  )
}
