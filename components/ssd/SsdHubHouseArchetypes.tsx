import Image from 'next/image'
import Link from 'next/link'
import { SSD_HOUSE_ARCHETYPES } from '@/lib/ssd-house-archetypes'
import { SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

/** Image-led archetypes for the main SSD hub — not a price list; formats people picture. */
export function SsdHubHouseArchetypes() {
  return (
    <section
      id="ssd-house-archetypes"
      className="scroll-mt-24 border-b border-border bg-bg py-12 md:py-16"
      aria-labelledby="ssd-house-archetypes-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-micro mb-2 font-medium uppercase tracking-widest text-accent">Formats</p>
          <h2
            id="ssd-house-archetypes-heading"
            className="max-w-3xl font-serif text-2xl font-bold text-fg md:text-3xl"
          >
            Small second-home shapes people picture
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Victorian SSD is one planning pathway — these are common ways owners imagine using up to about{' '}
            <strong className="text-fg">60 sqm</strong> behind the main house. Your title, overlays, and siting still
            decide what is realistic; the feasibility check turns this into a pathway view for your lot.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SSD_HOUSE_ARCHETYPES.map((item) => (
              <li
                key={item.image}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-natural-50 shadow-sm dark:bg-surface/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-natural-200 dark:bg-neutral-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-semibold text-fg md:text-xl">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {item.description}
                  </p>
                  {item.href && item.linkLabel ? (
                    <p className="mt-4">
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

          <p className="mt-8 text-center text-xs leading-relaxed text-muted">
            Photos are stock placeholders (Unsplash) for layout — swap for Bayview or client imagery in{' '}
            <code className="rounded bg-natural-100 px-1 py-0.5 text-[0.7rem] dark:bg-white/10">/public/images/second-home/</code>.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
              Run the feasibility check
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
