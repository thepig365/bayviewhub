'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function GalleryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    background: '',
    vision: '',
    experience: '',
    availability: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/eoi-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      if (data.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          background: '',
          vision: '',
          experience: '',
          availability: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-natural-50 to-accent-50 py-20 md:py-28 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full bg-accent-500/15 text-accent-700 px-4 py-2 text-sm font-bold tracking-wide uppercase mb-6 dark:bg-accent-500/20 dark:text-accent-200">
              Founding Partner Opportunity
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Bayview Arts Gallery &amp; Creative Wellbeing Programs
            </h1>
            <p className="text-xl md:text-2xl text-natural-700 leading-relaxed dark:text-natural-200">
              We're seeking a visionary founding partner to co-establish two interrelated creative ventures at Bayview Hub—a curated arts gallery and therapeutic art workshop programs.
            </p>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-natural-50">
              The Opportunity
            </h2>
            <p className="text-lg text-natural-700 leading-relaxed mb-8 dark:text-natural-200">
              Bayview Hub is the visitor gateway to Bayview Estate—a 30-acre property in Main Ridge on the Mornington Peninsula, home to the Pig &amp; Whistle winery restaurant, The Shed live music venue, and The Farmhouse accommodation. With over 50,000 annual visitors, we're now expanding into arts and creative wellbeing.
            </p>
            <p className="text-lg text-natural-700 leading-relaxed dark:text-natural-200">
              We're looking for a <strong>founding partner</strong> to jointly establish and lead two interconnected projects that will become the creative heart of Bayview Hub.
            </p>
          </div>
        </div>
      </section>

      {/* Two Projects */}
      <section className="py-20 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-12 text-center dark:text-natural-50">
            Two Interrelated Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Project 1: Gallery */}
            <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 dark:bg-primary-800">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Bayview Arts Gallery
              </h3>
              <p className="text-natural-600 mb-6 leading-relaxed dark:text-natural-200">
                A curated gallery space showcasing exhibitions, artist openings, and collectible works. Set within the natural beauty of the estate, the gallery will connect art lovers with emerging and established artists.
              </p>
              <ul className="space-y-3 text-natural-700 dark:text-natural-200">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 dark:text-primary-300">•</span>
                  <span>Curate rotating exhibitions and permanent collections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 dark:text-primary-300">•</span>
                  <span>Build artist relationships and collector networks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 dark:text-primary-300">•</span>
                  <span>Host opening nights, artist talks, and art events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 dark:text-primary-300">•</span>
                  <span>Develop sales operations and gallery programs</span>
                </li>
              </ul>
            </div>

            {/* Project 2: Workshops */}
            <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-6 dark:bg-accent-900/30">
                <span className="text-3xl">🧘</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Art Workshops &amp; Art Therapy
              </h3>
              <p className="text-natural-600 mb-6 leading-relaxed dark:text-natural-200">
                Expressive arts programs designed for wellbeing, creativity, and connection. From beginner workshops to therapeutic sessions, these programs will make art accessible to all visitors.
              </p>
              <ul className="space-y-3 text-natural-700 dark:text-natural-200">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 dark:text-accent-300">•</span>
                  <span>Design and deliver creative workshop programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 dark:text-accent-300">•</span>
                  <span>Develop art therapy sessions with qualified practitioners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 dark:text-accent-300">•</span>
                  <span>Create family-friendly and corporate programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 dark:text-accent-300">•</span>
                  <span>Build scalable workshop systems and facilitator networks</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Connection */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-200 dark:bg-primary-900/60 dark:border-primary-600">
              <h4 className="text-xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Why These Projects Are Interrelated
              </h4>
              <p className="text-natural-700 leading-relaxed dark:text-natural-200">
                The gallery and workshop programs share creative vision, physical space, artist networks, and audience. Exhibitions inspire workshop themes; workshop participants become gallery visitors and collectors. Together, they create a complete creative ecosystem that attracts diverse visitors and generates multiple revenue streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-12 text-center dark:text-natural-50">
            What Bayview Hub Offers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <span className="text-2xl">🏡</span>
              </div>
              <h4 className="text-lg font-bold text-natural-900 mb-2 dark:text-natural-50">Prime Location</h4>
              <p className="text-natural-600 dark:text-natural-200">
                30-acre estate in Main Ridge, 15 mins from Peninsula Hot Springs, with established visitor traffic.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="text-lg font-bold text-natural-900 mb-2 dark:text-natural-50">Built-in Audience</h4>
              <p className="text-natural-600 dark:text-natural-200">
                50,000+ annual visitors through the restaurant, live music, and accommodation—ready to discover art.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-bold text-natural-900 mb-2 dark:text-natural-50">True Partnership</h4>
              <p className="text-natural-600 dark:text-natural-200">
                Flexible partnership structure with shared vision, resources, and growth potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-primary-800 dark:to-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-natural-50">
              Who We're Looking For
            </h2>
            <p className="text-lg text-natural-700 text-center mb-12 dark:text-natural-200">
              The ideal founding partner brings creative vision, relevant experience, and entrepreneurial drive to build something meaningful together.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-natural-900 mb-4 dark:text-natural-50">Ideal Background</h4>
                  <ul className="space-y-3 text-natural-700 dark:text-natural-200">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 dark:text-primary-300">✓</span>
                      <span>Gallery management, curation, or art sales experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 dark:text-primary-300">✓</span>
                      <span>Art therapy qualification or workshop facilitation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 dark:text-primary-300">✓</span>
                      <span>Artist networks and collector relationships</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 dark:text-primary-300">✓</span>
                      <span>Business acumen and entrepreneurial mindset</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-natural-900 mb-4 dark:text-natural-50">Key Qualities</h4>
                  <ul className="space-y-3 text-natural-700 dark:text-natural-200">
                    <li className="flex items-start">
                      <span className="text-accent-600 mr-3 dark:text-accent-300">★</span>
                      <span>Visionary thinking with practical execution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-600 mr-3 dark:text-accent-300">★</span>
                      <span>Passion for making art accessible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-600 mr-3 dark:text-accent-300">★</span>
                      <span>Collaborative and partnership-oriented</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-600 mr-3 dark:text-accent-300">★</span>
                      <span>Ready to build from the ground up</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EOI Form */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-4 text-center dark:text-natural-50">
              Express Your Interest
            </h2>
            <p className="text-natural-600 text-center mb-10 dark:text-natural-200">
              Tell us about yourself and your vision for Bayview Arts Gallery and Creative Wellbeing Programs.
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center dark:bg-green-900/20 dark:border-green-800">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-800 mb-2 dark:text-green-200">Thank You!</h3>
                <p className="text-green-700 dark:text-green-300">
                  We've received your expression of interest and will be in touch soon to discuss this opportunity further.
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
                      Your Background *
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      Tell us about your experience in arts, gallery management, art therapy, or related fields.
                    </p>
                    <textarea
                      required
                      rows={4}
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Your Vision *
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      What's your vision for an arts gallery and creative programs at Bayview Hub?
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
                      Partnership Structure Preference
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      What type of partnership structure are you looking for? (e.g., equity partner, revenue share, employed director, etc.)
                    </p>
                    <textarea
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Availability
                    </label>
                    <p className="text-sm text-natural-500 mb-2 dark:text-natural-400">
                      When could you start? Full-time, part-time, or other arrangement?
                    </p>
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-primary-900 dark:border-primary-600 dark:text-natural-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                      Anything Else?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Links to portfolio, questions, or anything else you'd like to share..."
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
                    {status === 'loading' ? 'Submitting...' : 'Submit Expression of Interest'}
                  </Button>

                  {status === 'error' && (
                    <p className="text-red-600 text-center dark:text-red-400">
                      Something went wrong. Please try again or email us directly at {SITE_CONFIG.email}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-natural-100 dark:bg-primary-800/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-natural-600 dark:text-natural-200">
            Prefer to reach out directly? Email{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary-700 underline dark:text-primary-300">
              {SITE_CONFIG.email}
            </a>{' '}
            or call{' '}
            <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary-700 underline dark:text-primary-300">
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
