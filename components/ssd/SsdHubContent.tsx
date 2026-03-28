import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'

const HUB_FAQ: { q: string; a: string }[] = [
  {
    q: 'What is a Victorian SSD in one line?',
    a: 'A Small Second Dwelling of up to 60 sqm on the same title as your house, behind the front wall, all-electric, not subdivided — governed by VC253/VC282 and the planning scheme.',
  },
  {
    q: 'Do I always skip a planning permit?',
    a: 'No. If you meet all Deemed-to-Comply tests (sometimes called a “Green Lane” outcome), you may not need a planning permit, but you still need a building permit. Overlays and siting can push you to VicSmart or a full planning process.',
  },
  {
    q: 'What is VicSmart?',
    a: 'A faster council route for some compliant projects when minor overlays or small variations apply — not a guarantee; your site determines the path.',
  },
  {
    q: 'Can I sell the second dwelling on its own title?',
    a: 'No. The SSD framework requires the second dwelling to stay on the same title as the main home.',
  },
  {
    q: 'What should I do first?',
    a: 'Skim this page, open the rules or cost page if you need detail, then run the interactive feasibility check when you want a structured answer for your situation.',
  },
]

/** Hub body below programme map: how it works, FAQ, closing CTA (framing + house types live higher on the page) */
export function SsdHubContent() {
  return (
    <div className="bg-bg">
      <section className="border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">How it works</h2>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-relaxed text-muted marker:text-fg marker:font-semibold">
              <li>
                <strong className="text-fg">Orient.</strong> Use the programme list above to open the page that matches
                your question (rules, cost, local context, or fit).
              </li>
              <li>
                <strong className="text-fg">Check the framework.</strong> Confirm you are within the SSD hard lines or
                understand what would push you out.
              </li>
              <li>
                <strong className="text-fg">Run the feasibility check.</strong> Answer the interactive checklist — it
                maps likely Green Lane, VicSmart, or standard planning outcomes (indicative, not legal advice).
              </li>
              <li>
                <strong className="text-fg">Submit if you want a written pass.</strong> Request a structured feasibility
                response from the form on that page.
              </li>
            </ol>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={SSD_LANDING.feasibility} variant="accent" size="lg">
                Run the feasibility check
              </Button>
              <Button href="/backyard-small-second-home/victoria-rules" variant="outline" size="lg">
                Understand Victoria rules
              </Button>
              <Button href="/backyard-small-second-home/cost-rent-roi" variant="outline" size="lg">
                Explore likely costs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">Common questions</h2>
            <p className="mt-2 text-sm text-muted">Short answers — detail lives on the linked programme pages.</p>
            <div className="mt-8 space-y-2 border-t border-border pt-2">
              {HUB_FAQ.map((item) => (
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
            <h2 className="font-serif text-2xl font-bold text-fg md:text-3xl">Ready to test your site?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              The feasibility check is the fastest way to turn what you have read into a structured pathway view for
              your lot.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
                Run the feasibility check
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
              General enquiry:{' '}
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
