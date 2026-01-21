'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function GalleryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    background: '',
    vision: '',
    structure: '',
    availability: '',
    neverShow: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/eoi-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          background: formData.background,
          vision: formData.vision,
          experience: formData.structure,
        }),
      })
      
      const data = await res.json()
      
      if (data.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          linkedin: '',
          background: '',
          vision: '',
          structure: '',
          availability: '',
          neverShow: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const buildingItems = [
    {
      title: 'The Gallery',
      subtitle: 'Founding Partner-led',
      description: 'Curation, artist development, exhibitions, collector relationships.',
      icon: '🎨',
    },
    {
      title: 'Therapeutic Arts Workshops',
      subtitle: 'Founding Partner-led',
      description: 'Restorative creative workshops (non-clinical) that bring people from viewing into participation.',
      icon: '✨',
    },
    {
      title: 'The Destination Ecosystem',
      subtitle: 'Bayview Hub',
      description: 'Hospitality + events + gardens + music — the context that keeps attention and return visits alive.',
      icon: '🌿',
    },
  ]

  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* PART A: Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-neutral-100 dark:bg-neutral-900" />
          <div className="w-1/2 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 dark:from-primary-900 dark:via-neutral-800 dark:to-primary-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block bg-black text-white px-4 py-2 text-xs font-mono tracking-widest uppercase mb-8">
              Founding Partnership
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-natural-900 mb-8 leading-tight dark:text-natural-50">
              A Gallery Inside a Living Destination
              <span className="block text-primary-700 dark:text-primary-400">— Not a White Cube in Isolation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-natural-700 leading-relaxed max-w-3xl mb-12 dark:text-natural-200">
              A founding partnership to build a contemporary gallery and therapeutic arts workshop within Bayview Hub's estate — with dining, wine, music, gardens, and a year-round visitor audience already in motion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#inquiry" variant="primary" size="lg">
                Inquire About Founding Partnership
              </Button>
              <Button href="#ecosystem" variant="outline" size="lg">
                Explore the Ecosystem
              </Button>
            </div>
          </div>
        </div>

        {/* Visual contrast indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm text-natural-500">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-neutral-300 rounded-full" />
            Sterile White Cube
          </span>
          <span className="text-natural-300">vs</span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-neutral-500 rounded-full" />
            Living Ecosystem
          </span>
        </div>
      </section>

      {/* PART B: Why This Works */}
      <section id="ecosystem" className="py-24 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-sm font-mono tracking-widest text-primary-600 uppercase mb-4">Why This Works</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              The audience is already here.
            </h2>
            <p className="text-lg text-natural-600 dark:text-natural-300 max-w-3xl mx-auto">
              Conventional galleries collapse under rent and attention scarcity. Bayview flips the equation: visitors already arrive for food, wine, music, gardens, and events. The work is to curate what they encounter — and convert passive visitors into long-term patrons.
            </p>
          </div>
        </div>
      </section>

      {/* PART C: What We Are Building */}
      <section className="py-24 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-sm font-mono tracking-widest text-primary-600 uppercase mb-4">What We Are Building</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Three Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {buildingItems.map((item, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl bg-white dark:bg-primary-900/60 hover:shadow-lg transition-all dark:border dark:border-primary-700"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-1 text-natural-900 dark:text-natural-50">
                  {item.title}
                </h3>
                <p className="text-sm font-medium mb-3 text-primary-600 dark:text-primary-400">
                  {item.subtitle}
                </p>
                <p className="text-natural-600 dark:text-natural-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PART D: The Business Logic */}
      <section className="py-24 bg-natural-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-400 uppercase mb-4">The Business Logic</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16">
              Why the numbers work.
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* No Commercial Rent */}
              <div className="border-l-2 border-primary-500 pl-6">
                <h3 className="text-lg font-bold text-primary-400 mb-2">Capital Efficiency</h3>
                <p className="text-2xl font-serif font-bold mb-4">No Commercial Rent</p>
                <p className="text-natural-400">
                  The partnership is designed to allocate more resources to programming, artists, and collectors.
                </p>
              </div>

              {/* Seed Traffic */}
              <div className="border-l-2 border-accent-500 pl-6">
                <h3 className="text-lg font-bold text-accent-400 mb-2">The Audience</h3>
                <p className="text-2xl font-serif font-bold mb-4">50,000+ Seed Traffic</p>
                <p className="text-natural-400">
                  Bayview Hub's destination activity provides ongoing discovery. Annual visitors already primed for experience.
                </p>
              </div>

              {/* Relaxed, Not Rushed */}
              <div className="border-l-2 border-neutral-500 pl-6">
                <h3 className="text-lg font-bold text-neutral-400 mb-2">Lifestyle Modulation</h3>
                <p className="text-2xl font-serif font-bold mb-4">Relaxed, Not Rushed</p>
                <p className="text-natural-400">
                  Art is encountered in a lived environment, where people stay longer and return.
                </p>
              </div>
            </div>

            {/* Key insight callout */}
            <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-lg text-natural-300">
                You're not solving "traffic." You're designing conversion: <span className="text-white font-medium">visitors → patrons → collectors → members.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PART E: The Partnership */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-4">The Partnership</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Not an Employee.<br />
              <span className="text-primary-700 dark:text-primary-400">A Founding Partner.</span>
            </h2>
            <p className="text-xl text-natural-600 mb-8 dark:text-natural-300">
              This is a partner-led collaboration for an operator who wants to build a real, independent gallery business with a physical base and an existing destination audience behind it.
            </p>
            <p className="text-lg text-natural-500 mb-12 dark:text-natural-400 italic">
              Partnership structure can be discussed after alignment (revenue share / equity / hybrid).
            </p>

            {/* Roles and Boundaries */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 dark:bg-primary-800">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Bayview's Role</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Leon is the owner-operator of Bayview Hub and the gallery's founding dealer ("old bones"). He is responsible for site integration, brand governance, artist development.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-6 dark:bg-accent-900/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Founding Partner Role</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  The Founding Partner leads curation, exhibition programming, and collector development day-to-day.
                </p>
              </div>
            </div>

            {/* Asset Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 dark:bg-neutral-900/30">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">30-Acre Estate</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Full access to the estate, existing infrastructure, and operational hospitality ecosystem. Build on a foundation, not from scratch.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 dark:bg-neutral-900/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Full Autonomy</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Complete creative control over curation, programming, artist relationships, and brand positioning. Your vision. Your execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART F: Who This Is For */}
      <section className="py-24 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-4">Who This Is For</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-12 dark:text-natural-50">
              The right fit.
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-2xl">✓</span>
                <p className="text-lg text-natural-700 dark:text-natural-200">
                  A curator / dealer / operator who can build a collector-facing program.
                </p>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-2xl">✓</span>
                <p className="text-lg text-natural-700 dark:text-natural-200">
                  Someone who treats a gallery as long-term cultural practice, not a short-term project.
                </p>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-2xl">✓</span>
                <p className="text-lg text-natural-700 dark:text-natural-200">
                  A person comfortable working inside a living destination (not an isolated white-cube model).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART G: Call to Action / Form */}
      <section id="inquiry" className="py-24 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-4 text-center">Next Step</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-4 text-center dark:text-natural-50">
              Inquire About Founding Partnership
            </h2>
            <p className="text-natural-600 text-center mb-10 dark:text-natural-300">
              For serious inquiries only. We're looking for strategic alignment, not applicants.
            </p>

            {status === 'success' ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center dark:bg-neutral-900/20 dark:border-neutral-800">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2 dark:text-neutral-200">Inquiry Received</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  We review all inquiries personally. If there's strategic alignment, we'll reach out to arrange a conversation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://"
                        className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Professional Background *
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      Curation, gallery, creative workshops, hospitality, or relevant entrepreneurial experience.
                    </p>
                    <textarea
                      required
                      rows={3}
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Your Strategic Vision *
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      How would you leverage this ecosystem? What would you build?
                    </p>
                    <textarea
                      required
                      rows={4}
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      What kind of artist would you never show — and why? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.neverShow}
                      onChange={(e) => setFormData({ ...formData, neverShow: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Preferred Partnership Structure
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      Equity partner, revenue share, hybrid model, or other arrangement.
                    </p>
                    <textarea
                      rows={2}
                      value={formData.structure}
                      onChange={(e) => setFormData({ ...formData, structure: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Availability & Commitment Level
                    </label>
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      placeholder="e.g., Full-time from Q2 2026, Part-time initially..."
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>

                  {status === 'error' && (
                    <p className="text-neutral-600 text-center text-sm dark:text-neutral-400">
                      Something went wrong. Please email directly: {SITE_CONFIG.email}
                    </p>
                  )}

                  <p className="text-xs text-natural-500 text-center dark:text-natural-400">
                    This is not a job application. Submitting an inquiry does not create any obligation for either party.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <p className="text-sm text-natural-500 text-center dark:text-natural-400 max-w-3xl mx-auto">
            Therapeutic Arts Workshops are restorative creative workshops and are not clinical therapy or medical services.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-natural-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-natural-400 mb-2">Prefer a direct conversation?</p>
          <p className="text-white">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-primary-400 transition-colors">
              {SITE_CONFIG.email}
            </a>
            {' '}&middot;{' '}
            <a href={`tel:${SITE_CONFIG.phone}`} className="underline hover:text-primary-400 transition-colors">
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
