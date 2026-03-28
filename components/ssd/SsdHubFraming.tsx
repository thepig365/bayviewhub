import Link from 'next/link'
import { Button } from '@/components/ui/Button'

/** Short “why it matters” block — sits after Quick Answer, before house types */
export function SsdHubFraming() {
  return (
    <div className="bg-bg">
      <section className="border-b border-border py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">Who this is for</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Victorian homeowners who want a <strong className="text-fg">small second building</strong> on the same
              title — family use, rent, or a separate work room — and who want to know{' '}
              <strong className="text-fg">what the planning rules allow before</strong> they fall in love with a floor
              plan.
            </p>
            <ul className="mt-6 list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
              <li>You can accept the hard limits (60 sqm, behind front wall, all-electric, no subdivision).</li>
              <li>You want a straight answer on pathway (planning vs building permit) for your lot, not generic inspiration.</li>
            </ul>
            <p className="mt-6">
              <Link
                href="/backyard-small-second-home/is-this-for-you"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Find out if this pathway suits you →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">How Bayview Hub treats this</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We start from the published rules and your site — not from a pre-chosen design. If the SSD framework does
              not fit, we say that early so you can use the right process (standard planning, different use, or a smaller
              brief).
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The goal is a <strong className="text-fg">workable, documented pathway</strong>: what you can file, what
              still needs a surveyor or planner, and where the risks sit.
            </p>
            <div className="mt-8">
              <Button href="/backyard-small-second-home/approach" variant="outline" size="lg">
                Read why this pathway exists
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
