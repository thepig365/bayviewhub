'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Check, Calendar, HelpCircle } from 'lucide-react'

const pricingTiers = [
  {
    name: 'Family',
    price: '$299',
    period: '/season',
    features: [
      'Seasonal harvest box (fortnightly)',
      '4 family garden days per season',
      'Cooking workshop access',
      'Recipe cards & growing guides',
      'Priority event bookings',
    ],
    cta: 'Subscribe',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$179',
    period: '/season',
    features: [
      'Seasonal harvest box (monthly)',
      '2 garden visit days per season',
      'Recipe cards & growing guides',
      'Member newsletter',
    ],
    cta: 'Subscribe',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$499',
    period: '/season',
    features: [
      'Weekly harvest box',
      'Unlimited garden access',
      'All workshops included',
      'Private plot allocation',
      'Chef-led cooking sessions',
      'VIP event access',
    ],
    cta: 'Subscribe',
    highlight: false,
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-natural-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6">
              Edible Gardens Subscriptions
            </h1>
            <p className="text-xl text-natural-700 leading-relaxed">
              Connect with seasonal food through harvest boxes, family garden days, and hands-on growing experiences
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="subscribe" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
            Choose Your Garden Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.highlight
                    ? 'bg-primary-700 text-white ring-4 ring-primary-500 shadow-2xl scale-105'
                    : 'bg-natural-50 text-natural-900 shadow-lg'
                }`}
              >
                {tier.highlight && (
                  <div className="text-center mb-4">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-serif font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={tier.highlight ? 'text-primary-100' : 'text-natural-600'}>
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check
                        className={`w-5 h-5 mr-2 flex-shrink-0 ${
                          tier.highlight ? 'text-primary-200' : 'text-primary-600'
                        }`}
                      />
                      <span className={tier.highlight ? 'text-primary-50' : 'text-natural-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlight ? 'accent' : 'primary'}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Calendar */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
              This Season's Calendar
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 border-l-4 border-primary-600 pl-4">
                  <Calendar className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-natural-900 mb-1">Spring Planting Day</h4>
                    <p className="text-sm text-natural-600">September 15 • All members welcome</p>
                    <p className="text-natural-700 mt-2">
                      Help plant this season's crops and learn companion planting techniques
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 border-l-4 border-primary-600 pl-4">
                  <Calendar className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-natural-900 mb-1">First Harvest</h4>
                    <p className="text-sm text-natural-600">October 20-31 • Delivery period</p>
                    <p className="text-natural-700 mt-2">
                      Spring greens, herbs, and early tomatoes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 border-l-4 border-primary-600 pl-4">
                  <Calendar className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-natural-900 mb-1">Kids Garden Workshop</h4>
                    <p className="text-sm text-natural-600">November 5 • Family tier</p>
                    <p className="text-natural-700 mt-2">
                      Hands-on learning for children: seeds, soil, and sustainability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-natural-50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-natural-900">{faq.q}</span>
                    <HelpCircle
                      className={`w-5 h-5 text-primary-600 transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-natural-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founding Subscribers CTA */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-6">
              Founding Subscribers
            </h2>
            <p className="text-xl text-natural-700 mb-8">
              Join our first 50 subscribers and lock in special founding rates, plus early access to all programs
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700">50</div>
                  <div className="text-sm text-natural-600">Spots Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700">20%</div>
                  <div className="text-sm text-natural-600">Founding Discount</div>
                </div>
              </div>
              <Button variant="primary" size="lg" className="w-full">
                Join Early Access
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

