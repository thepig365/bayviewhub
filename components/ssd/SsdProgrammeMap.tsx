import Link from 'next/link'
import { SSD_PROGRAMME_MAP } from '@/lib/constants'

/** Funnel map on the main SSD hub — clarifies one job per URL */
export function SsdProgrammeMap() {
  return (
    <section
      id="ssd-programme"
      className="scroll-mt-24 border-b border-border bg-bg py-8 md:py-12"
      aria-label="Backyard Small Second Home programme pages"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">Programme</p>
          <h2 className="mb-3 font-serif text-xl font-bold text-fg md:text-2xl">
            Where should I read next — rules, cost, fit, or my block?
          </h2>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted sm:mb-8">
            Each page answers one kind of question so this hub stays readable. Follow the topic you need, then use the
            feasibility checklist when you want a structured pass over your answers.
          </p>
          <ul className="space-y-2.5 sm:space-y-3">
            {SSD_PROGRAMME_MAP.map((p) => (
              <li
                key={p.href}
                className="rounded-lg border border-border bg-natural-50 p-4 dark:bg-surface/40 sm:p-5"
              >
                <Link href={p.href} className="text-base font-medium text-fg transition-colors hover:text-accent">
                  {p.label}
                </Link>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{p.job}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
