'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

const experiences = [
  {
    title: 'Seasonal Harvest Boxes',
    description: 'Fresh produce from the gardens, delivered to you on a regular cycle.',
  },
  {
    title: 'Garden Days',
    description: 'Time spent in the gardens — planting, harvesting, or simply being present.',
  },
  {
    title: 'Cooking Workshops',
    description: 'Learn to prepare seasonal produce with guidance from visiting chefs.',
  },
]

const faqs = [
  {
    q: 'Can I pause my subscription?',
    a: 'Yes, you can pause for up to one season with 2 weeks notice.',
  },
  {
    q: 'What happens in bad weather?',
    a: 'Garden days are rescheduled. Harvest boxes are delivered rain or shine.',
  },
  {
    q: 'Are the gardens organic?',
    a: 'Yes, we use organic and regenerative farming practices.',
  },
  {
    q: 'Can I transfer my subscription?',
    a: 'Yes, subscriptions can be transferred to friends or family with notice.',
  },
]

export function EdibleGardensClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Why */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Why this exists
            </h2>
            <p className="text-natural-700 leading-relaxed dark:text-natural-300">
              The gardens are a working part of the estate — not a display, but a place where food is grown, harvested, and shared. Subscribers become part of that cycle, receiving seasonal produce and spending time in the gardens throughout the year.
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
              {experiences.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                  <div>
                    <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">{item.title}</h3>
                    <p className="text-natural-700 dark:text-natural-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Who this is for
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  People who want to eat seasonally and know where their food comes from.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Families looking for time outdoors and hands-on learning for children.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Anyone wanting a closer relationship with growing food.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-natural-50 rounded-xl overflow-hidden dark:bg-primary-800/30">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-natural-900 dark:text-natural-50">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-natural-500 transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-natural-700 dark:text-natural-300">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="subscribe" className="py-20 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-natural-600 mb-8 dark:text-natural-300">
              Subscriptions open seasonally. Explore the estate to learn more.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/partners/edible-gardens" variant="primary" size="lg">
                Learn About Partnership
              </Button>
              <Button href="/visit" variant="outline" size="lg">
                Plan a Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
