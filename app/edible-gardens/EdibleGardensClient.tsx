'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const plannedFeatures = [
  {
    title: 'Seasonal Harvest Boxes',
    description: 'Fresh produce from the gardens, delivered weekly or fortnightly to your family table.',
  },
  {
    title: 'Garden Days',
    description: 'Screen-free, repeatable time outdoors — planting, watering, harvesting as a family.',
  },
  {
    title: 'Kids Grow Experiences',
    description: 'Age-appropriate tasks that teach children seed → food → table.',
  },
  {
    title: 'Take-Home Recipes',
    description: 'Simple recipes to turn your harvest into dinner, not just an activity.',
  },
]

export function EdibleGardensClient() {
  const [formData, setFormData] = useState({ name: '', email: '', familySize: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/eoi-edible-gardens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'waitlist' }),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', familySize: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* What we're building */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-4">
              What we're building
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              A subscription program for families who want to trade passive screen time for real, 
              repeatable time outdoors — and bring seasonal produce home for the family table.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {plannedFeatures.map((item) => (
                <div key={item.title} className="p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                  <h3 className="font-bold text-fg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
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
            <h2 className="text-2xl font-serif font-bold text-fg mb-8">
              Who this is for
            </h2>
            <ul className="space-y-4 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <span>Families looking for regular, screen-free outdoor time with their kids.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <span>People who want to eat seasonally and know where their food comes from.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <span>Anyone wanting to teach children patience, care, and cause-and-effect through growing.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-fg mb-4">
                Join the Founding Families Waitlist
              </h2>
              <p className="text-muted">
                Be first to know when subscriptions open. Founding Families get priority access and special perks.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-primary-50 rounded-2xl p-8 text-center dark:bg-primary-900/20">
                <div className="text-accent text-4xl mb-4">✓</div>
                <h3 className="text-xl font-serif font-bold text-fg mb-2">You're on the list!</h3>
                <p className="text-muted">We'll be in touch when the program launches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-8 shadow-lg border border-natural-200 dark:bg-surface dark:border-border">
                <div>
                  <label htmlFor="waitlist-name" className="block text-sm font-medium text-fg mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-fg mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-family" className="block text-sm font-medium text-fg mb-2">
                    Family size (optional)
                  </label>
                  <input
                    id="waitlist-family"
                    type="text"
                    placeholder="e.g., 2 adults, 2 kids"
                    value={formData.familySize}
                    onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </Button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-fg mb-4">
              Want to build this program?
            </h2>
            <p className="text-muted mb-8">
              We're seeking one Founding Partner to design, build, and operate Edible Gardens at Bayview Hub.
              This is a founding build opportunity, not a franchise.
            </p>
            <Link
              href="/partners/edible-gardens"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium underline underline-offset-2"
            >
              Learn about the Founding Partner Opportunity →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted text-center max-w-2xl mx-auto">
            This program is currently in Concept Plan stage. Launch timing depends on securing a Founding Partner.
            Joining the waitlist does not guarantee a subscription spot but gives you priority when we launch.
          </p>
        </div>
      </section>
    </>
  )
}
