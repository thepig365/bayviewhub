import { Button } from '@/components/ui/Button'

/** Mid-page pathway band — use where a long body needs a clear fork */
export function SsdMidCta({
  intro,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  intro: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
}) {
  return (
    <section className="border-y border-border bg-natural-50 py-10 dark:bg-surface/35" aria-label="Next actions">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-base leading-relaxed text-muted">{intro}</p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href={primaryHref} variant="accent" size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="outline" size="lg" className="w-full sm:w-auto">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
