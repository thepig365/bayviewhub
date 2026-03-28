import { SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { SsdHouseUseTypesCards } from '@/components/ssd/SsdHouseUseTypesCards'

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
          <SsdHouseUseTypesCards />
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
