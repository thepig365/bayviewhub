'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'
import { Home, DollarSign, TrendingUp, Maximize2, CheckCircle2, Users, Briefcase, Heart, Palmtree } from 'lucide-react'

const houseTypes = [
  {
    title: 'Garden Studio Retreat',
    description:
      'A light-filled garden studio for work, art, or quiet guest stays. Perfect for creative pursuits and peaceful mornings.',
    image: '/images/second-home/garden-studio.jpg',
    priceRange: '$140k - $148k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'Guest Cottage Granny Flat',
    description:
      'A self-contained granny flat ideal for parents, in-laws, or long-stay guests. Independent living with nearby connection.',
    image: '/images/second-home/guest-cottage.jpg',
    priceRange: '$80k - $135k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'Family Pod & Rental Option',
    description:
      'A flexible small second home for teens, young adults or short-stay rentals. Versatile design for changing needs.',
    image: '/images/second-home/family-pod.jpg',
    priceRange: '$90k - $169k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'Modern Minimalist Studio',
    description:
      'Ultra-contemporary design with clean lines and expansive glass. Perfect for those seeking a sleek, sophisticated workspace or guest retreat.',
    image: '/images/second-home/minimalist-studio.jpg',
    priceRange: '$70k - $110k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'California Bungalow Two Bedroom',
    description:
      'Craftsman-style bungalow with two bedrooms, featuring wide eaves, tapered columns, and a welcoming front porch. Classic charm with modern comfort.',
    image: '/images/second-home/california-bungalow.jpg',
    priceRange: '$122k - $168k',
    size: 'Up to 80 sqm',
  },
  {
    title: 'Two-Bedroom Family Unit',
    description:
      'Spacious layout with two bedrooms and open living areas. Ideal for extended family living or generating substantial rental income.',
    image: '/images/second-home/two-bedroom.jpg',
    priceRange: '$122k - $168k',
    size: 'Up to 60 sqm',
  },
]

const useCases = [
  {
    title: 'Granny Flat for Parents or In-Laws',
    description:
      'Independent, nearby living with dignity and closeness. Help aging parents stay on familiar ground while maintaining their independence.',
    icon: Heart,
  },
  {
    title: 'Teen or Young Adult Space',
    description:
      'Semi-independent area for study, music, creativity and rest. Give young adults space to grow while staying connected.',
    icon: Users,
  },
  {
    title: 'Home Office or Creative Studio',
    description:
      'A quiet, focused workspace away from the main house. Separate work from home life with a dedicated sanctuary.',
    icon: Briefcase,
  },
  {
    title: 'Short-Stay Rental or Airbnb',
    description:
      'Tap into Victorian tourism demand with a tasteful, private stay. Generate income from visitors year-round.',
    icon: Palmtree,
  },
]

export function SecondHomeClient() {
  const params = useSearchParams()
  const attribution = useMemo(() => getAttribution(params), [params])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    backyardSize: '',
    propertyType: '',
    usage: '',
    timeframe: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '/second-home'

    try {
      const response = await fetch('/api/second-home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formData,
          utm: attribution,
          page: pageUrl,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data?.success) {
        setSubmitStatus('success')
        track('sh_form_submit_success', attribution)
        setFormData({
          name: '',
          email: '',
          phone: '',
          suburb: '',
          backyardSize: '',
          propertyType: '',
          usage: '',
          timeframe: '',
        })
      } else {
        setSubmitStatus('error')
        track('sh_form_submit_error', attribution)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      track('sh_form_submit_error', attribution)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-natural-50 to-accent-50 py-20 md:py-32 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-medium text-primary-700 mb-4 uppercase tracking-wide dark:text-primary-200">
              Small Second Home Builder
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Small Second Home Builder, for all Victorians
            </h1>
            <p className="text-xl md:text-2xl text-natural-700 mb-10 leading-relaxed dark:text-natural-200">
              Turn your unused backyard into a beautiful small second home or granny flat. Create extra space for family,
              guests or work — and unlock the potential for long-term rental income.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="#register"
                variant="primary"
                size="lg"
                onClick={() => track('sh_register_click', attribution)}
              >
                Register Your Interest
              </Button>
              <Button
                href="#house-types"
                variant="outline"
                size="lg"
                onClick={() => track('sh_view_house_types_click', attribution)}
              >
                View House Types
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build Section */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Why Build a Backyard Second Home?
            </h2>
            <p className="text-xl text-natural-700 leading-relaxed dark:text-natural-200">
              Your backyard holds more potential than you might think. A well-designed small second home or granny flat
              creates secondary income in your own backyard, expands your living space, and makes better use of land you
              already own.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <DollarSign className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Generate Rental Income</h3>
              <p className="text-natural-700 dark:text-natural-200">
                Suitable for students, Airbnb guests, or extended family. Turn your backyard into a steady income stream.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <TrendingUp className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Solid Asset Investment</h3>
              <p className="text-natural-700 dark:text-natural-200">
                A quality small second home can increase property value and appeal for future buyers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <Maximize2 className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Expand Your Living Space</h3>
              <p className="text-natural-700 dark:text-natural-200">
                Add room for hobbies, guests, or a growing family without moving to a larger property.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-primary-800">
                <CheckCircle2 className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Peace of Mind</h3>
              <p className="text-natural-700 dark:text-natural-200">
                Bayview guides you through design, permits and construction with trusted local partners.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-natural-700 italic dark:text-natural-200">
              Your backyard doesn't have to sit idle. It can become your most flexible and rewarding space.
            </p>
          </div>
        </div>
      </section>

      {/* House Types */}
      <section id="house-types" className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
              Explore Our Small Second Home Concepts
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {houseTypes.map((house, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow dark:bg-primary-900/60 dark:border dark:border-primary-700"
              >
                <div className="h-64 bg-gradient-to-br from-primary-200 to-accent-200 relative overflow-hidden">
                  <Image
                    src={house.image}
                    alt={house.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-natural-900 mb-3 dark:text-natural-50">
                    {house.title}
                  </h3>
                  <p className="text-natural-700 leading-relaxed mb-6 dark:text-natural-200">{house.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-natural-50 rounded-lg p-3 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                      <div className="font-medium text-natural-900 dark:text-natural-50">Price Range</div>
                      <div className="text-natural-600 dark:text-natural-200">{house.priceRange}</div>
                    </div>
                    <div className="bg-natural-50 rounded-lg p-3 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                      <div className="font-medium text-natural-900 dark:text-natural-50">Size</div>
                      <div className="text-natural-600 dark:text-natural-200">{house.size}</div>
                    </div>
                  </div>

                  <Button
                    href={`mailto:leonzh@bayviewestate.com.au?subject=Interest in Small Second Home - ${encodeURIComponent(
                      house.title
                    )}&body=${encodeURIComponent(
                      `Hi, I'm interested in learning more about the ${house.title}.\n\nPage: ${
                        typeof window !== 'undefined' ? window.location.href : 'https://www.bayviewhub.me/second-home'
                      }\nAttribution: ${JSON.stringify(attribution)}`
                    )}`}
                    variant="primary"
                    size="sm"
                    className="w-full"
                    external
                    onClick={() => track('sh_house_register_click', { ...attribution, house: house.title })}
                  >
                    Register Your Interest
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-natural-50">
              Calm, Garden-Inspired Design with Bayview DNA
            </h2>
            <div className="prose prose-lg max-w-none text-natural-700 space-y-6 dark:text-natural-200 dark:prose-invert">
              <p className="text-xl leading-relaxed">
                Every Bayview Backyard Second Home is designed with warm, natural materials and light timber tones. We
                frame views with gardens, trees, and sky, creating spaces that invite you to slow down.
              </p>
              <p className="text-xl leading-relaxed">
                These are spaces designed for art, books, and slow mornings. Spaces that feel connected to the land and
                the changing seasons of Victoria.
              </p>
              <p className="text-xl leading-relaxed">
                Our small second homes carry the same thoughtful approach you'll find across the broader Bayview
                ecosystem:
              </p>
              <ul className="space-y-2 text-lg">
                <li>
                  <strong>Bayview Arts &amp; Framing Studio</strong> — Custom framing and gallery space
                </li>
                <li>
                  <strong>Pig &amp; Whistle / Bayview Estate</strong> — Hospitality and gathering spaces
                </li>
                <li>
                  <strong>Market Garden Project</strong> — Sustainable local food growing
                </li>
                <li>
                  <strong>Mend</strong> — Digital reflection platform
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
              One Small Second Home. Many Possibilities.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-full p-3 flex-shrink-0 dark:bg-primary-800">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">{useCase.title}</h3>
                      <p className="text-natural-700 leading-relaxed dark:text-natural-200">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              href="#register"
              variant="primary"
              size="lg"
              onClick={() => track('sh_register_click', attribution)}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-16 text-center">
              From Backyard Idea to Completed Second Home
            </h2>

            <div className="space-y-12">
              {[
                {
                  step: '1',
                  title: 'Register Your Interest',
                  description:
                    "You share your property details, goals and timeframe. We listen and ask questions to understand what you're hoping to create.",
                  icon: Home,
                },
                {
                  step: '2',
                  title: 'Feasibility & Concept',
                  description:
                    "We map potential layouts, highlight council considerations, and outline a budget range. This stage helps you decide if it's the right fit.",
                  icon: CheckCircle2,
                },
                {
                  step: '3',
                  title: 'Design & Approvals',
                  description:
                    'We guide you through detailed design and, with local professionals, help navigate planning and building permits across Victoria.',
                  icon: Briefcase,
                },
                {
                  step: '4',
                  title: 'Build & Bayview Finishing Touches',
                  description:
                    'Your second home is built and optionally finished with styling and garden touches that reflect the Bayview feel. Move in and enjoy.',
                  icon: Heart,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start space-x-6">
                    <div className="bg-primary-700 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-natural-900 mb-3 flex items-center space-x-2">
                        <span>{item.title}</span>
                        <Icon className="w-5 h-5 text-primary-700" />
                      </h3>
                      <p className="text-natural-700 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bayview Family */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 text-center">
              Part of the Bayview Estate Family
            </h2>
            <div className="prose prose-lg max-w-none text-natural-700 space-y-6">
              <p className="text-xl leading-relaxed">
                Bayview Backyard Second Home is part of <strong>Bayview Estate Holdings</strong>, a collection of
                businesses and projects that share a common philosophy: creating physical and digital spaces where
                families slow down, reconnect and feel at home.
              </p>
              <p className="text-xl leading-relaxed">Alongside Bayview Backyard Second Home, the Bayview family includes:</p>
              <ul className="space-y-2 text-lg">
                <li>
                  <strong>Bayview Arts &amp; Framing Studio</strong> – custom framing and gallery space
                </li>
                <li>
                  <strong>Pig &amp; Whistle / Bayview Estate</strong> – hospitality and gathering
                </li>
                <li>
                  <strong>Market Garden Project</strong> – sustainable local food growing
                </li>
                <li>
                  <strong>Mend</strong> – a digital reflection platform
                </li>
              </ul>
              <p className="text-xl leading-relaxed">
                Each of these projects reflects our belief in thoughtful design, connection to place, and making space
                for what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register"
        className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-primary-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Register Your Interest in a Small Second Home
              </h2>
              <p className="text-lg text-natural-700 dark:text-natural-200">
                Share a few details below and we'll contact you for a no-pressure, honest conversation about whether a
                small second home or granny flat is a good fit for your property.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                    Suburb / Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                    How big is your backyard? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 200 sqm, 0.1 acre"
                    value={formData.backyardSize}
                    onChange={(e) => setFormData({ ...formData, backyardSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                    Property Type *
                  </label>
                  <select
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  >
                    <option value="">Select property type</option>
                    <option value="house">House</option>
                    <option value="acreage">Acreage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                    What would you like this second home to be used for?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                    When are you hoping to start?
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                  >
                    <option value="">Select timeframe</option>
                    <option value="0-6months">0–6 months</option>
                    <option value="6-12months">6–12 months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>

                <Button variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit & Register Interest'}
                </Button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg text-center dark:bg-primary-800/30 dark:border-primary-700">
                    <p className="text-primary-800 font-medium dark:text-primary-200">
                      ✓ Thank you! We've received your registration and will contact you within 2 business days.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                    <p className="text-red-800">
                      Something went wrong. Please try again or email us at leonzh@bayviewestate.com.au
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


