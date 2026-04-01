import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  type EditorialEntry,
  editorialPluralLabel,
  editorialTypeLabel,
  formatEditorialDate,
} from '@/lib/editorial'

type Props = {
  entry: EditorialEntry
  featured?: boolean
}

export function JournalCard({ entry, featured = false }: Props) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-colors hover:border-accent dark:border-border dark:bg-surface',
        featured ? 'lg:grid lg:grid-cols-[1.25fr_minmax(0,1fr)]' : ''
      )}
    >
      {entry.heroImage ? (
        <Link href={entry.path} className="block bg-natural-200 dark:bg-neutral-900">
          <img
            src={entry.heroImage}
            alt={entry.title}
            className={cn(
              'h-full w-full object-cover',
              featured ? 'min-h-[320px] lg:min-h-[420px]' : 'aspect-[16/10]'
            )}
          />
        </Link>
      ) : null}

      <div className={cn('p-6 md:p-8', featured ? 'flex flex-col justify-center' : '')}>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span className="eyebrow text-accent">{editorialTypeLabel(entry.editorialType)}</span>
          <span aria-hidden>·</span>
          <span>{formatEditorialDate(entry.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{entry.readingTimeMinutes} min read</span>
        </div>

        <h2 className={cn('font-serif font-semibold text-fg', featured ? 'text-4xl' : 'text-2xl')}>
          <Link href={entry.path} className="hover:text-accent transition-colors">
            {entry.title}
          </Link>
        </h2>

        <p className="mt-4 text-base leading-7 text-muted">{entry.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link href={entry.path} className="font-medium text-fg underline underline-offset-4 hover:text-accent">
            Read piece
          </Link>
          <Link href={entry.categoryPath} className="text-muted hover:text-fg transition-colors">
            More {editorialPluralLabel(entry.editorialType)}
          </Link>
        </div>
      </div>
    </article>
  )
}
