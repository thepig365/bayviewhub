import Link from 'next/link'
import { SSD_PROGRAMME_MAP } from '@/lib/constants'

/** Funnel map on the main SSD hub — clarifies one job per URL */
export function SsdProgrammeMap() {
  return (
    <section
      className="border-b border-border bg-bg py-10 md:py-14"
      aria-label="Backyard Small Second Home programme pages"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">Programme</p>
          <h2 className="mb-3 font-serif text-xl font-bold text-fg md:text-2xl">One clear job per page</h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            The offer is split so you can read philosophy, fit, rules, costs, or local context separately. Each route
            leads back to this hub and to the feasibility check when you are ready to act.
          </p>
          <ul className="space-y-3">
            {SSD_PROGRAMME_MAP.map((p) => (
              <li
                key={p.href}
                className="rounded-lg border border-border bg-natural-50 p-4 dark:bg-surface/40 md:p-5"
              >
                <Link href={p.href} className="font-medium text-fg transition-colors hover:text-accent">
                  {p.label}
                </Link>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.job}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
