import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { SSD_HUB_FAQ } from '@/lib/ssd-hub-faq'

/** Hub body below programme map: how it works, FAQ, closing CTA (framing + house types live higher on the page) */
export function SsdHubContent() {
  return (
    <div className="bg-bg">
      <section className="border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">
              What steps should I take on the Victorian SSD pathway?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The hub below links deeper pages for rules, cost bands, and local overlays. Use them when you need detail;
              the checklist is for turning your answers into an indicative pathway read (Green Lane-style, VicSmart, or
              standard planning) before you spend on drawings.
            </p>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-relaxed text-muted marker:text-fg marker:font-semibold">
              <li>
                <strong className="text-fg">Read your hard lines.</strong> Open the Victoria rules summary for 60 sqm,
                siting, all-electric, and same-title requirements.
              </li>
              <li>
                <strong className="text-fg">Sense-check cost and context.</strong> Use the cost page for indicative
                bands — not a quote — and the fit page if you are unsure whether SSD matches your goals.
              </li>
              <li>
                <strong className="text-fg">Run the feasibility checklist.</strong> Answer the interactive questions;
                outcomes are indicative and not a council or legal decision.
              </li>
              <li>
                <strong className="text-fg">Engage professionals on title.</strong> Building surveyor, planner, or
                builder when you are ready to test a real design against the scheme.
              </li>
            </ol>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={SSD_LANDING.feasibility} variant="accent" size="lg">
                Open the feasibility checklist
              </Button>
              <Button href="/backyard-small-second-home/victoria-rules" variant="outline" size="lg">
                Victoria rules (plain English)
              </Button>
              <Button href="/backyard-small-second-home/cost-rent-roi" variant="outline" size="lg">
                Indicative cost context
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">
              What do people ask about backyard second homes in Victoria?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Short answers in everyday language — always verify on your title and current scheme.
            </p>
            <div className="mt-8 space-y-2 border-t border-border pt-2">
              {SSD_HUB_FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-border py-3 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer list-none text-base font-medium text-fg hover:text-accent">
                    {item.q}
                  </summary>
                  <p className="mt-3 pb-1 text-base leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 md:py-16 dark:bg-surface/40">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">
              How can I check whether my block fits the SSD rules?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              The checklist asks structured questions about size, siting, overlays, and title intent, then suggests which
              pathway your answers <em>usually</em> resemble. It does not replace council or professional advice.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
                Open the feasibility checklist
              </Button>
              <Button
                href={`${SSD_LANDING.overview}#ssd-programme`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Jump to programme map
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted">
              Contact (general):{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-accent underline-offset-4 hover:underline">
                {SITE_CONFIG.email}
              </a>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Searching &quot;granny flat&quot;? See how that wording maps to SSD →{' '}
              <Link href="/backyard-small-second-home/granny-flat-victoria" className="text-accent underline-offset-4 hover:underline">
                Granny flat (Victoria)
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
