import Image from 'next/image'
import Link from 'next/link'
import { SSD_HOUSE_ARCHETYPE_FLOOR_PLAN, SSD_HOUSE_ARCHETYPES_EXTERIOR } from '@/lib/ssd-house-archetypes'
import { SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

/** Image-led named house types + supporting floor plan for the main SSD hub */
export function SsdHubHouseArchetypes() {
  const plan = SSD_HOUSE_ARCHETYPE_FLOOR_PLAN

  return (
    <section
      id="ssd-house-archetypes"
      className="scroll-mt-24 border-b border-border bg-bg py-12 md:py-16"
      aria-labelledby="ssd-house-archetypes-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">House types</p>
          <h2
            id="ssd-house-archetypes-heading"
            className="max-w-3xl font-serif text-2xl font-bold text-fg md:text-3xl"
          >
            What kinds of small second homes do people picture?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Four named formats we use when discussing Victorian SSD projects — illustrative only, not separate planning
            products. Everything still has to fit the <strong className="text-fg">~60 sqm GFA</strong> cap, siting, and
            your title. The floor plan below shows layout thinking, not a guaranteed permit outcome.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SSD_HOUSE_ARCHETYPES_EXTERIOR.map((item) => (
              <li
                key={item.image}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-natural-50 shadow-sm dark:bg-surface/50"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-natural-200 dark:bg-neutral-800">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-serif text-base font-semibold text-fg sm:text-lg">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  {item.href && item.linkLabel ? (
                    <p className="mt-3">
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                      >
                        {item.linkLabel} →
                      </Link>
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-dashed border-border pt-8">
            <div className="mx-auto max-w-3xl">
              <p className="text-micro mb-2 font-medium uppercase tracking-widest text-muted">Typical layout</p>
              <div className="flex flex-col gap-5 rounded-xl border border-border bg-natural-50/80 p-4 dark:bg-surface/40 sm:flex-row sm:items-stretch sm:gap-6 sm:p-5">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-sm shrink-0 overflow-hidden rounded-lg bg-white dark:bg-neutral-900 sm:mx-0 sm:max-w-[240px] sm:self-center">
                  <Image
                    src={plan.image}
                    alt={plan.imageAlt}
                    width={480}
                    height={360}
                    className="h-full w-full object-contain object-center p-2"
                    sizes="(max-width: 640px) 100vw, 240px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="font-serif text-lg font-semibold text-fg">{plan.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{plan.description}</p>
                  {plan.href && plan.linkLabel ? (
                    <p className="mt-3">
                      <Link href={plan.href} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                        {plan.linkLabel} →
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
              Open the feasibility checklist
            </Button>
            <Button href={`${SSD_LANDING.overview}#ssd-programme`} variant="outline" size="lg" className="w-full sm:w-auto">
              Browse programme pages
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
