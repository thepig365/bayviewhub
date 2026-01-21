import React from 'react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Therapeutic Arts Workshops | Bayview Hub',
  description: 'Restorative creative workshops (non-clinical) at Bayview Hub. Explore expressive arts in a calm, supportive environment.',
}

const workshops = [
  {
    title: 'Expressive Painting',
    description: 'Explore color, texture, and intuitive mark-making in a supportive group setting.',
  },
  {
    title: 'Clay & Presence',
    description: 'Tactile clay work combined with mindfulness practices.',
  },
  {
    title: 'Nature Journaling',
    description: 'Drawing and writing exercises inspired by the gardens and landscape.',
  },
]

const programs = [
  {
    title: '6-Week Adult Program',
    description: 'A sustained exploration of expressive arts for personal growth and creative expression.',
    details: ['Small group format', 'All materials included', 'Take-home practices'],
  },
  {
    title: '6-Week Parent & Child',
    description: 'Creative connection time for parents/carers and children aged 5–12.',
    details: ['Bonding through art', 'Age-appropriate activities', 'Family toolkit'],
  },
]

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Therapeutic Arts Workshops
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              Restorative creative workshops (non-clinical) at Bayview Hub. A space for expressive arts, creative exploration, and quiet restoration.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Why this exists
            </h2>
            <p className="text-natural-700 leading-relaxed dark:text-natural-300">
              Creative practice can be restorative — not as treatment, but as a way of slowing down, reconnecting, and making something with your hands. These workshops offer guided time to explore expressive arts in a calm, supportive environment within the estate.
            </p>
          </div>
        </div>
      </section>

      {/* What happens */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              What happens
            </h2>
            <div className="space-y-6">
              {workshops.map((workshop) => (
                <div key={workshop.title} className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                  <div>
                    <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">{workshop.title}</h3>
                    <p className="text-natural-700 dark:text-natural-300">{workshop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Longer programs
            </h2>
            <div className="space-y-8">
              {programs.map((program) => (
                <div key={program.title} className="bg-white rounded-xl p-8 dark:bg-primary-900/60 dark:border dark:border-primary-700">
                  <h3 className="text-xl font-serif font-bold text-natural-900 mb-3 dark:text-natural-50">{program.title}</h3>
                  <p className="text-natural-700 mb-4 dark:text-natural-300">{program.description}</p>
                  <ul className="space-y-2">
                    {program.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-natural-600 dark:text-natural-400">
                        <span className="text-primary-600 mr-2 dark:text-primary-400">—</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Who this is for
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  People looking for a creative outlet without performance pressure.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Anyone wanting to slow down and work with their hands.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Families seeking shared creative time together.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-natural-500 dark:text-natural-400">
              Therapeutic Arts Workshops are restorative creative workshops and are not clinical therapy or medical services. If you are experiencing a mental health crisis, please contact Lifeline (13 11 14), Beyond Blue (1300 22 4636), or emergency services (000).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-natural-600 mb-8 dark:text-natural-300">
              Workshops are offered seasonally. Explore the estate to see what's forming.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/experiences" variant="primary" size="lg">
                Explore Experiences
              </Button>
              <Button href="/visit" variant="outline" size="lg">
                Plan a Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
