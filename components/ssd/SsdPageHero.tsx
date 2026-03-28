import { Button } from '@/components/ui/Button'

export type SsdPageHeroProps = {
  title: string
  explainer: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
}

/** Consistent SSD funnel hero: title, one-sentence job, primary + secondary CTA */
export function SsdPageHero({
  title,
  explainer,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: SsdPageHeroProps) {
  return (
    <section className="border-b border-border bg-natural-50 py-8 sm:py-10 md:py-12 dark:bg-surface/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-bold leading-tight text-fg sm:text-4xl md:text-[2.35rem]">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{explainer}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
