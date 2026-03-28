import Link from 'next/link'
import { SSD_HOUSE_USE_TYPES } from '@/lib/ssd-house-use-types'

type SsdHouseUseTypesCardsProps = {
  /** When set, that route renders as on-page jump or note instead of a redundant outbound link */
  currentPath?: string
  /** e.g. indicative-cost-tiers — used when currentPath matches a card’s href */
  onPageAnchorId?: string
}

export function SsdHouseUseTypesCards({ currentPath, onPageAnchorId }: SsdHouseUseTypesCardsProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {SSD_HOUSE_USE_TYPES.map((item) => {
        const isHere = Boolean(currentPath && item.href === currentPath)
        return (
          <li
            key={item.label}
            className="rounded-lg border border-border bg-natural-50 p-4 dark:bg-surface/40 sm:p-5"
          >
            <h3 className="text-base font-semibold text-fg">{item.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{item.description}</p>
            {item.href && item.linkLabel ? (
              <p className="mt-3">
                {isHere && onPageAnchorId ? (
                  <a
                    href={`#${onPageAnchorId}`}
                    className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Jump to cost bands on this page →
                  </a>
                ) : isHere ? (
                  <span className="text-sm font-medium text-muted">You’re on this page.</span>
                ) : (
                  <Link href={item.href} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                    {item.linkLabel} →
                  </Link>
                )}
              </p>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
