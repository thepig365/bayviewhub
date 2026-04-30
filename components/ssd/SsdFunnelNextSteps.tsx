import Link from 'next/link'
import { SSD_LANDING } from '@/lib/constants'

export function SsdFunnelNextSteps({
  sentence,
  hubLabel = 'See the full SSD overview',
  feasibilityLabel = 'Run the feasibility check',
  feasibilityHref = SSD_LANDING.feasibility,
  overviewHref = SSD_LANDING.overview,
}: {
  sentence: string
  hubLabel?: string
  feasibilityLabel?: string
  feasibilityHref?: string
  overviewHref?: string
}) {
  return (
    <p className="mt-6 border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-muted">
      <span className="text-fg/90">{sentence}</span>
      <span className="mt-2 block sm:mt-2">
        <Link href={feasibilityHref} className="font-medium text-accent hover:underline">
          {feasibilityLabel}
        </Link>
        <span className="mx-2 text-border" aria-hidden>
          ·
        </span>
        <Link href={overviewHref} className="font-medium text-accent hover:underline">
          {hubLabel}
        </Link>
      </span>
    </p>
  )
}
