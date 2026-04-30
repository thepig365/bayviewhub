import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SSD_LANDING } from '@/lib/constants'

export type SsdFunnelReturnProps = {
  className?: string
  /** Override default heading */
  heading?: string
  /** Override default supporting line */
  body?: string
  primaryLabel?: string
  secondaryLabel?: string
  primaryHref?: string
  secondaryHref?: string
  /** Third text link beside overview (default: estate visit) */
  visitHref?: string
  visitLabel?: string
}

/** Closing band — feasibility first, hub second */
export function SsdFunnelReturn({
  className = '',
  heading = 'What do you want to do next?',
  body = 'Use the feasibility check when you are ready to test your lot. Return to the hub to pick another topic or reread the summary.',
  primaryLabel = 'Run the feasibility check',
  secondaryLabel = 'See the full SSD overview',
  primaryHref = SSD_LANDING.feasibility,
  secondaryHref = SSD_LANDING.overview,
  visitHref = '/visit',
  visitLabel = 'Visit the estate',
}: SsdFunnelReturnProps) {
  return (
    <section
      className={`border-t border-border bg-natural-50 py-12 md:py-14 dark:bg-surface/40 ${className}`}
      aria-label="Next steps for Backyard Small Second Home"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-micro mb-3 font-medium uppercase tracking-widest text-muted">Next steps</p>
          <h2 className="mb-4 font-serif text-xl font-semibold text-fg sm:text-2xl">{heading}</h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">{body}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={primaryHref} variant="accent" size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="outline" size="lg" className="w-full sm:w-auto">
              {secondaryLabel}
            </Button>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            <Link href={primaryHref} className="font-medium text-accent underline-offset-4 hover:underline">
              {primaryLabel}
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href={secondaryHref} className="underline-offset-4 hover:underline">
              {secondaryLabel}
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href={visitHref} className="underline-offset-4 hover:underline">
              {visitLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
