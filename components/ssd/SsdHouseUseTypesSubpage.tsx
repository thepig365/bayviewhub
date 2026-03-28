import Link from 'next/link'
import { SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { SsdHouseUseTypesCards } from '@/components/ssd/SsdHouseUseTypesCards'

type SsdHouseUseTypesSubpageProps = {
  /** Current pathname for “you are here” on matching card (e.g. /backyard-small-second-home/cost-rent-roi) */
  currentPath: string
  /** Anchor id for on-page jump when a card points at this URL (e.g. indicative-cost-tiers) */
  onPageAnchorId?: string
}

/**
 * Same use-case grid as the main hub, for child funnel pages where visitors expect to see “house types”.
 */
export function SsdHouseUseTypesSubpage({ currentPath, onPageAnchorId }: SsdHouseUseTypesSubpageProps) {
  return (
    <section
      className="border-b border-border bg-bg py-10 md:py-12"
      aria-labelledby="ssd-use-cases-subpage-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">Use cases</p>
          <h2 id="ssd-use-cases-subpage-heading" className="mb-3 font-serif text-xl font-bold text-fg md:text-2xl">
            Ways people use an SSD
          </h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            Practical situations — not different planning products. The same 60 sqm cap and title rules apply; cost bands
            below are indicative for whichever line matches you.
          </p>
          <SsdHouseUseTypesCards currentPath={currentPath} onPageAnchorId={onPageAnchorId} />
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
              Run the feasibility check
            </Button>
            <Link
              href={`${SSD_LANDING.overview}#ssd-house-types`}
              className="text-center text-sm font-medium text-accent underline-offset-4 hover:underline sm:text-left"
            >
              Open full SSD overview (same use cases + programme map) →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
