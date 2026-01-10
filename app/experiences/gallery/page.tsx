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
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const pillars = [
    {
      title: 'The Earth',
      subtitle: 'Edible Gardens',
      description: 'Living Art. Farm-to-Soul connection grounding the visitor.',
      icon: '🌱',
    },
    {
      title: 'The Hearth',
      subtitle: 'Pig & Whistle',
      description: "The social anchor providing warmth and 'unbuttoned' comfort.",
      icon: '🔥',
    },
    {
      title: 'The Pulse',
      subtitle: 'Live Music',
      description: 'Weekly live music at The Shed accelerates the heartbeat, keeping crowds engaged.',
      icon: '🎵',
    },
    {
      title: 'The Elixir',
      subtitle: 'Wine & Coffee',
      description: 'Sensory openers that relax the mind.',
      icon: '🍷',
    },
    {
      title: 'The Vision',
      subtitle: 'The Gallery',
      description: 'Where YOU come in. Aesthetic contemplation.',
      icon: '🎨',
      highlight: true,
    },
    {
      title: 'The Mending',
      subtitle: 'Wellness',
      description: 'Where YOU lead. Restoration and creative therapy.',
      icon: '✨',
      highlight: true,
    },
  ]

  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* PART A: Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-neutral-100 dark:bg-neutral-900" />
          <div className="w-1/2 bg-gradient-to-br from-primary-50 via-green-50 to-accent-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block bg-black text-white px-4 py-2 text-xs font-mono tracking-widest uppercase mb-8">
              Strategic Partnership Prospectus
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-natural-900 mb-8 leading-tight dark:text-natural-50">
              The Gallery Model is Broken.
              <span className="block text-primary-700 dark:text-primary-400">We Have Re-Engineered It.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-natural-700 leading-relaxed max-w-3xl mb-12 dark:text-natural-200">
              Dining. Wine. Music. Nature. Art. Wellness.
              <span className="block mt-2 font-medium text-natural-900 dark:text-natural-100">
                A Strategic Partnership to Build the Complete 'Third Place.'
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#inquiry" variant="primary" size="lg">
                Inquire About Partnership
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
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            Living Ecosystem
          </span>
        </div>
      </section>

      {/* PART B: The Six Pillars of Traffic */}
      <section id="ecosystem" className="py-24 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-sm font-mono tracking-widest text-primary-600 uppercase mb-4">The Ecosystem</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Six Pillars of Traffic
            </h2>
            <p className="text-lg text-natural-600 dark:text-natural-300">
              Each pillar feeds the others. The gallery doesn't compete for attention—it completes the experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all ${
                  pillar.highlight
                    ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl ring-2 ring-primary-500 ring-offset-4 dark:ring-offset-primary-900'
                    : 'bg-natural-50 dark:bg-primary-800/50 hover:shadow-lg'
                }`}
              >
                {pillar.highlight && (
                  <div className="absolute -top-3 right-6 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    YOUR DOMAIN
                  </div>
                )}
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className={`text-xl font-serif font-bold mb-1 ${pillar.highlight ? 'text-white' : 'text-natural-900 dark:text-natural-50'}`}>
                  {pillar.title}
                </h3>
                <p className={`text-sm font-medium mb-3 ${pillar.highlight ? 'text-primary-200' : 'text-primary-600 dark:text-primary-400'}`}>
                  {pillar.subtitle}
                </p>
                <p className={pillar.highlight ? 'text-primary-100' : 'text-natural-600 dark:text-natural-300'}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PART C: The Business Logic */}
      <section className="py-24 bg-natural-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-400 uppercase mb-4">The Business Logic</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Shift Capital from Rent to Reach.
            </h2>
            <p className="text-xl text-natural-300 mb-16 max-w-3xl">
              Traditional galleries bleed money on prime real estate, leaving nothing for the work that matters: artist development, marketing, and experience design.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Capital Efficiency */}
              <div className="border-l-2 border-primary-500 pl-6">
                <h3 className="text-lg font-bold text-primary-400 mb-2">Capital Efficiency</h3>
                <p className="text-2xl font-serif font-bold mb-4">$0 Commercial Rent</p>
                <p className="text-natural-400">
                  We eliminate commercial rent so you can invest in Global Marketing, artist acquisition, and programming that moves the needle.
                </p>
              </div>

              {/* The Audience */}
              <div className="border-l-2 border-accent-500 pl-6">
                <h3 className="text-lg font-bold text-accent-400 mb-2">The Audience</h3>
                <p className="text-2xl font-serif font-bold mb-4">50,000+ Seed Traffic</p>
                <p className="text-natural-400">
                  Annual visitors already primed for experience. International tourists become Global Amplification Vectors for your artists.
                </p>
              </div>

              {/* The Mindset */}
              <div className="border-l-2 border-green-500 pl-6">
                <h3 className="text-lg font-bold text-green-400 mb-2">Lifestyle Modulation</h3>
                <p className="text-2xl font-serif font-bold mb-4">Relaxed, Not Rushed</p>
                <p className="text-natural-400">
                  Selling to people who've had wine, enjoyed nature, heard music. Not stressed urban commuters between meetings.
                </p>
              </div>
            </div>

            {/* Key insight callout */}
            <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-lg text-natural-300 italic">
                "The question isn't how to get people through the door—they're already here. 
                The question is: <span className="text-white font-medium">what do you want to show them?</span>"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PART D: The Deal */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-4">The Offer</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Not an Employee.<br />
              <span className="text-primary-700 dark:text-primary-400">A Founding Partner.</span>
            </h2>
            <p className="text-xl text-natural-600 mb-12 dark:text-natural-300">
              This is not a job listing. This is an invitation to co-build an institution.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 dark:bg-primary-800">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Asset Leverage</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Full access to a 30-acre estate, existing infrastructure, and operational hospitality ecosystem. Build on a foundation, not from scratch.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-6 dark:bg-accent-900/30">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Revenue Share / Equity</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Structured partnership using "Slicing Pie" or equivalent dynamic equity model. Your contribution builds your stake. Skin in the game.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 dark:bg-green-900/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Full Autonomy</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Complete creative control over curation, programming, artist relationships, and brand positioning. Your vision. Your execution.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 dark:bg-purple-900/30">
                  <span className="text-2xl">🌏</span>
                </div>
                <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Global Platform</h3>
                <p className="text-natural-600 dark:text-natural-300">
                  Position yourself at the intersection of international tourism and contemporary art. Build a reputation, not just a business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART E: Call to Action / Form */}
      <section id="inquiry" className="py-24 bg-white dark:bg-primary-900">
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
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center dark:bg-green-900/20 dark:border-green-800">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-800 mb-2 dark:text-green-200">Inquiry Received</h3>
                <p className="text-green-700 dark:text-green-300">
                  We review all inquiries personally. If there's strategic alignment, we'll reach out to arrange a conversation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-natural-50 rounded-2xl p-8 dark:bg-primary-800/30 dark:border dark:border-primary-700">
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
                      Curation, gallery, art therapy, hospitality, or relevant entrepreneurial experience.
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
                    <p className="text-red-600 text-center text-sm dark:text-red-400">
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
