import Link from 'next/link'
import { SSD_LANDING } from '@/lib/constants'

/** Compact return strip: every support page points back to hub + feasibility check */
export function SsdFunnelNextSteps({ sentence }: { sentence: string }) {
  return (
    <p className="text-sm text-muted leading-relaxed border-l-2 border-accent/50 pl-4 mt-6">
      <span className="text-fg/90">{sentence}</span>
      <span className="mt-2 block">
        <Link href={SSD_LANDING.overview} className="font-medium text-accent hover:underline">
          Back to Backyard Small Second Home
        </Link>
        <span className="mx-2 text-border" aria-hidden>
          ·
        </span>
        <Link href={SSD_LANDING.feasibility} className="font-medium text-accent hover:underline">
          Run feasibility check
        </Link>
      </span>
    </p>
  )
}
