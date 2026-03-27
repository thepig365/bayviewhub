'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
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

export default function GardensPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-8 ">
              Edible Gardens
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Connect with seasonal food through harvest boxes, garden days, and hands-on growing experiences within the estate.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              Why this exists
            </h2>
            <p className="text-muted leading-relaxed">
              The gardens are a working part of the estate — not a display, but a place where food is grown, harvested, and shared. Subscribers become part of that cycle, receiving seasonal produce and spending time in the gardens throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* What happens */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              What happens
            </h2>
            <div className="space-y-6">
              {experiences.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                  <span className="text-accent mt-1.5 text-xs">•</span>
                  <div>
                    <h3 className="font-bold text-fg mb-2 ">{item.title}</h3>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              Who this is for
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  People who want to eat seasonally and know where their food comes from.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  Families looking for time outdoors and hands-on learning for children.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
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
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-natural-50 rounded-xl overflow-hidden dark:bg-surface/50">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-fg ">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-subtle transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-muted">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-muted mb-8">
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
    </main>
  )
}
