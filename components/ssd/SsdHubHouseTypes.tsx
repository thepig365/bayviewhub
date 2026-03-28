import Link from 'next/link'
import { SSD_HOUSE_USE_TYPES } from '@/lib/ssd-house-use-types'
import { SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

/** Scannable use-case types — same SSD rules; links only where a programme page helps */
export function SsdHubHouseTypes() {
  return (
    <section
      id="ssd-house-types"
      className="scroll-mt-24 border-b border-border bg-bg py-10 md:py-14"
      aria-label="Common Backyard Small Second Home use cases"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">Use cases</p>
          <h2 className="mb-3 font-serif text-xl font-bold text-fg md:text-2xl">Ways people use an SSD</h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            These are practical situations, not different planning products — the same 60 sqm cap, siting, and title rules
            apply. Pick the line that sounds like you, then use rules, cost, or the feasibility check as needed.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {SSD_HOUSE_USE_TYPES.map((item) => (
              <li
                key={item.label}
                className="rounded-lg border border-border bg-natural-50 p-4 dark:bg-surface/40 sm:p-5"
              >
                <h3 className="text-base font-semibold text-fg">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{item.description}</p>
                {item.href && item.linkLabel ? (
                  <p className="mt-3">
                    <Link href={item.href} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                      {item.linkLabel} →
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
              Run the feasibility check
            </Button>
            <p className="text-sm text-muted sm:ml-1">
              Main conversion step when you are ready to map your answers to a pathway.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
