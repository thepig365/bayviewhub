import { Button } from '@/components/ui/Button'
import { SSD_LANDING } from '@/lib/constants'

/** Closing band: same next step on every SSD support page */
export function SsdFunnelReturn({ className = '' }: { className?: string }) {
  return (
    <section
      className={`border-t border-border bg-natural-50 py-14 dark:bg-surface/40 ${className}`}
      aria-label="Next steps for Backyard Small Second Home"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-micro mb-3 font-medium uppercase tracking-widest text-muted">Next steps</p>
          <h2 className="mb-4 font-serif text-xl font-semibold text-fg sm:text-2xl">
            Return to the hub — or run the feasibility check
          </h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            Support pages each cover one topic. When you are ready to test your property against the Victorian SSD
            framework, use the feasibility check; for the full programme context, start from the main Backyard Small
            Second Home page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={SSD_LANDING.overview} variant="primary" size="lg">
              Backyard Small Second Home
            </Button>
            <Button href={SSD_LANDING.feasibility} variant="accent" size="lg">
              Feasibility check
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
