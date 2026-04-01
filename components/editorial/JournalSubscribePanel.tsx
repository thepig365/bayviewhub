import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type Props = {
  compact?: boolean
}

export function JournalSubscribePanel({ compact = false }: Props) {
  return (
    <section className="rounded-3xl border border-border bg-natural-50 p-6 md:p-8 dark:border-border dark:bg-surface">
      <p className="eyebrow text-accent">Newsletter</p>
      <h2 className={`mt-3 font-serif font-semibold text-fg ${compact ? 'text-2xl' : 'text-3xl'}`}>
        Subscribe to Bayview Notes
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        Receive selected journal pieces, invitations, and estate notes when there is something worth sharing.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button href="/newsletter" variant="accent">
          Go to Newsletter
        </Button>
        <Link href="/journal" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
          Explore the Journal
        </Link>
      </div>
    </section>
  )
}
