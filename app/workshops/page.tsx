import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { WorkshopsEnquiryForm } from './WorkshopsEnquiryForm'

export const metadata: Metadata = {
  title: {
    absolute: 'Art Workshops Mornington Peninsula | Bayview Hub',
  },
  description:
    'Non-clinical, place-based art workshops at Bayview Hub, Mornington Peninsula. Creative sessions in a working garden and studio environment at Main Ridge, Victoria.',
  openGraph: {
    title: 'Art Workshops Mornington Peninsula | Bayview Hub',
    description: 'Non-clinical, place-based art workshops at Bayview Hub, Mornington Peninsula.',
    url: 'https://www.bayviewhub.me/workshops',
  },
  alternates: {
    canonical: 'https://www.bayviewhub.me/workshops',
  },
}

const workshopsSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are the art workshops at Bayview Hub clinical art therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Bayview Hub workshops are non-clinical, place-based creative sessions. They are not a substitute for professional therapeutic care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the workshops held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Workshops take place at Bayview Hub, 365 Purves Road, Main Ridge, Mornington Peninsula, Victoria 3928.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need art experience to attend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No prior art experience is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I register for a workshop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Submit an enquiry via the form on this page. We will respond within 5 business days with programme details and availability.',
      },
    },
  ],
}

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopsSchema) }}
        />

        <article className="mx-auto max-w-5xl">
          <header className="rounded-[2.25rem] border border-border bg-natural-100 px-6 py-8 shadow-md dark:border-border dark:bg-surface md:px-10 md:py-12">
            <div className="max-w-4xl">
              <p className="eyebrow text-accent">Bayview Hub</p>
              <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-fg md:text-6xl md:leading-[1.05]">
                Art Workshops — Mornington Peninsula
              </h1>
              <p className="mt-6 max-w-3xl text-[1.05rem] leading-8 text-fg/90 dark:text-white/90 md:text-[1.12rem]">
                Bayview Hub runs art-based workshops at the estate in Main Ridge. These are not clinical sessions. They are
                structured creative experiences in a specific physical environment — a working garden, a studio, and open land
                on the Mornington Peninsula.
              </p>
              <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-fg/88 dark:text-white/88 md:text-[1.12rem]">
                The question at the centre of this programme is practical: what happens when people slow down, make something
                by hand, and pay genuine attention to a place?
              </p>
            </div>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-8">
              <section className="rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <h2 className="text-3xl font-serif font-semibold text-fg">The setting</h2>
                <p className="mt-4 text-[1.05rem] leading-8 text-fg/88 dark:text-white/88 md:text-[1.08rem]">
                  365 Purves Road, Main Ridge, Victoria. The estate includes a working edible garden, a studio, and open land.
                  Workshops take place in these environments. The setting is part of the work.
                </p>
              </section>

              <section className="rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <h2 className="text-3xl font-serif font-semibold text-fg">Programme</h2>
                <p className="mt-4 text-[1.05rem] leading-8 text-fg/88 dark:text-white/88 md:text-[1.08rem]">
                  The current programme is in development. Submit an enquiry below to register interest or join the waitlist.
                </p>
              </section>

              <section className="rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <h2 className="text-3xl font-serif font-semibold text-fg">These workshops are not</h2>
                <p className="mt-4 text-[1.05rem] leading-8 text-fg/88 dark:text-white/88 md:text-[1.08rem]">
                  These sessions are not clinical art therapy and are not a substitute for professional therapeutic or mental
                  health support. They are non-clinical, place-based creative experiences.
                </p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-border bg-natural-200 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
                <p className="eyebrow text-accent">Send an enquiry</p>
                <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Register interest</h2>
                <p className="mt-4 text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
                  Use the form to register interest in current or upcoming workshops at Bayview Hub.
                </p>
                <div className="mt-6">
                  <WorkshopsEnquiryForm />
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-12 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
              <Link href="/visit" className="underline underline-offset-4 hover:text-accent">
                Visit Us
              </Link>
              <span aria-hidden>·</span>
              <Link href="/events" className="underline underline-offset-4 hover:text-accent">
                What&apos;s On
              </Link>
              <span aria-hidden>·</span>
              <Link href="/mendpress" className="underline underline-offset-4 hover:text-accent">
                Mendpress
              </Link>
              <span aria-hidden>·</span>
              <a href={`mailto:${SITE_CONFIG.email}`} className="underline underline-offset-4 hover:text-accent">
                Contact
              </a>
            </div>
          </footer>
        </article>
      </div>
    </main>
  )
}
