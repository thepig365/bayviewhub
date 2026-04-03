import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'

type Props = {
  compact?: boolean
  locale?: SiteLocale
  eyebrow?: string
  title?: string
  body?: string
  ctaLabel?: string
  secondaryLabel?: string
}

export function JournalSubscribePanel({
  compact = false,
  locale = 'en',
  eyebrow = 'Bayview Notes',
  title = 'Subscribe to Bayview Notes',
  body = 'Receive selected Mendpress pieces, invitations, and estate notes when there is something worth sharing.',
  ctaLabel = 'Go to Newsletter',
  secondaryLabel = 'Explore Mendpress',
}: Props) {
  return (
    <section className="rounded-3xl border border-border bg-natural-50 p-6 md:p-8 dark:border-border dark:bg-surface">
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className={`mt-3 font-serif font-semibold text-fg ${compact ? 'text-2xl' : 'text-3xl'}`}>
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {body}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button href={localizedHref('/newsletter', locale)} variant="accent">
          {ctaLabel}
        </Button>
        <Link href={localizedHref('/mendpress', locale)} className="text-sm text-fg underline underline-offset-4 hover:text-accent">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
