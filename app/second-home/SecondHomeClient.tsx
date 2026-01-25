'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'
import { Home, DollarSign, TrendingUp, Maximize2, CheckCircle2, Users, Briefcase, Heart, Palmtree, AlertTriangle, XCircle } from 'lucide-react'

const houseTypes = [
  {
    title: 'Garden Studio Retreat',
    description:
      'A light-filled garden studio for work, art, or quiet guest stays. Perfect for creative pursuits and peaceful mornings.',
    image: '/images/second-home/garden-studio.jpg',
    priceRange: '$118k - $168k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'Guest Cottage SSD',
    description:
      'A self-contained Small Second Dwelling ideal for parents, in-laws, or long-stay guests. Independent living with nearby connection.',
    image: '/images/second-home/guest-cottage.jpg',
    priceRange: '$80k - $135k',
    size: 'Up to 60 sqm',
  },
  {
    title: 'Family Pod & Rental Option',
    description:
      'A flexible Small Second Dwelling for teens, young adults or long-term rentals. Versatile design for changing needs.',
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
    size: 'Up to 60 sqm',
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
    title: 'SSD for Parents or In-Laws',
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
    title: 'Long-Term Rental',
    description:
      "Tap into Victoria's strong rental demand with a compliant, private dwelling. Generate income from quality tenants year-round.",
    icon: Palmtree,
  },
]

const ssdConstraints = [
  {
    title: '60 sqm Maximum',
    description: 'The SSD framework caps floor area at 60 sqm. This is non-negotiable under Victorian regulations.',
  },
  {
    title: 'No Subdivision',
    description: 'An SSD cannot be subdivided from the main lot. It stays on your title. Period.',
  },
  {
    title: 'Siting Requirements',
    description: 'The SSD must be located behind the front wall line of the main dwelling.',
  },
  {
    title: 'No Reticulated Gas',
    description: 'SSDs cannot connect to reticulated gas. All-electric design is required.',
  },
  {
    title: '25 sqm POS for Main Dwelling',
    description: 'Your main house must retain at least 25 sqm of private open space after the SSD is built.',
  },
]

const notForYou = [
  'You want to subdivide and sell the dwelling separately',
  'You need more than 60 sqm (mansion expectations)',
  'You expect to connect to gas',
  'You want to bypass proper compliance pathways',
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
      <section className="bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 py-20 md:py-32 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-medium text-neutral-700 mb-4 uppercase tracking-wide dark:text-neutral-200">
              Victorian SSD Framework 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Small Second Dwelling (SSD) Builder — Victoria
            </h1>
            <p className="text-xl md:text-2xl text-natural-700 mb-6 leading-relaxed dark:text-natural-200">
              Build a compliant Small Second Dwelling on your existing lot. 60 sqm max. No subdivision. 
              Designed for multi-generational living or long-term rental income.
            </p>
            <p className="text-lg text-natural-600 mb-10 dark:text-natural-300">
              We validate feasibility before you spend serious money. If your site doesn't work, we tell you early.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="#register"
                variant="primary"
                size="lg"
                onClick={() => track('sh_register_click', attribution)}
              >
                Request SSD Feasibility Check
              </Button>
              <Button
                href="#house-types"
                variant="outline"
                size="lg"
                onClick={() => track('sh_view_house_types_click', attribution)}
              >
                View SSD Concepts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Boundary of the Game - SSD Constraints */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
              Boundary of the Game
            </h2>
            <p className="text-xl text-neutral-300 mb-12 text-center max-w-3xl mx-auto">
              The Victorian SSD framework has hard constraints. Understand them before you proceed.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {ssdConstraints.map((constraint, idx) => (
                <div key={idx} className="border-l-2 border-neutral-500 pl-6">
                  <h3 className="text-lg font-bold text-white mb-2">{constraint.title}</h3>
                  <p className="text-neutral-400">{constraint.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-lg text-neutral-300">
                These constraints exist for a reason. They enable speed — 'Deemed-to-Comply' under Clause 54.03 means 
                <span className="text-white font-medium"> no planning permit required</span> if you meet the criteria. 
                That's the trade-off: smaller scope, faster delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* This Is NOT For You */}
      <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangle className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
              <h2 className="text-2xl font-bold text-natural-900 dark:text-natural-50">
                This Service Is NOT For You If...
              </h2>
            </div>
            <div className="space-y-3">
              {notForYou.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl dark:bg-neutral-700">
                  <XCircle className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                  <span className="text-natural-700 dark:text-natural-200">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-natural-600 dark:text-natural-300">
              If any of the above applies, we're not the right fit. We focus on compliant SSD builds within the Victorian framework.
            </p>
          </div>
        </div>
      </section>

      {/* Why Build Section */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Why Build an SSD?
            </h2>
            <p className="text-xl text-natural-700 leading-relaxed dark:text-natural-200">
              Your backyard holds more potential than you might think. A well-designed Small Second Dwelling 
              creates secondary income, expands your living space, and makes better use of land you already own.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-neutral-800">
                <DollarSign className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Generate Rental Income</h3>
              <p className="text-natural-700 dark:text-natural-200">
                Long-term rental demand in Victoria remains strong. Turn your backyard into a steady income stream.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-neutral-800">
                <TrendingUp className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Solid Asset Investment</h3>
              <p className="text-natural-700 dark:text-natural-200">
                A quality SSD can increase property value and appeal for future buyers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-neutral-800">
                <Maximize2 className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Expand Living Space</h3>
              <p className="text-natural-700 dark:text-natural-200">
                Add room for family, guests, or work without moving to a larger property.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 dark:bg-neutral-800">
                <CheckCircle2 className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold text-natural-900 mb-3 dark:text-natural-50">Faster Approval</h3>
              <p className="text-natural-700 dark:text-natural-200">
                'Deemed-to-Comply' pathway under Clause 54.03 means no planning permit if you meet criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Types */}
      <section id="house-types" className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
              SSD Concepts (All Under 60 sqm)
            </h2>
            <p className="text-lg text-natural-600 dark:text-natural-300">
              Every design complies with Victorian SSD requirements. No exceptions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {houseTypes.map((house, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow dark:bg-primary-900/60 dark:border dark:border-primary-700"
              >
                <div className="h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
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
                    href={`mailto:leonzh@bayviewestate.com.au?subject=SSD Inquiry - ${encodeURIComponent(
                      house.title
                    )}&body=${encodeURIComponent(
                      `Hi, I'm interested in learning more about the ${house.title} SSD concept.\n\nPage: ${
                        typeof window !== 'undefined' ? window.location.href : 'https://www.bayviewhub.me/second-home'
                      }\nAttribution: ${JSON.stringify(attribution)}`
                    )}`}
                    variant="primary"
                    size="sm"
                    className="w-full"
                    external
                    onClick={() => track('sh_house_register_click', { ...attribution, house: house.title })}
                  >
                    Request Feasibility Check
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
              One SSD. Many Possibilities.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon
              return (
                <div
                  key={idx}
                  className="bg-neutral-50 rounded-2xl p-8 dark:bg-primary-900/60 dark:border dark:border-primary-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-200 rounded-full p-3 flex-shrink-0 dark:bg-neutral-800">
                      <Icon className="w-6 h-6 text-neutral-700" />
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
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-16 text-center dark:text-natural-50">
              From Feasibility to Handover
            </h2>

            <div className="space-y-12">
              {[
                {
                  step: '1',
                  title: 'SSD Feasibility Check',
                  description:
                    "We review your site against SSD criteria: lot size, siting, access, services, overlays. If it doesn't work, we tell you early.",
                  icon: Home,
                },
                {
                  step: '2',
                  title: 'Compliance Design',
                  description:
                    'Design within the 60 sqm limit, behind front wall line, no gas. All compliant with Clause 54.03 for Deemed-to-Comply pathway.',
                  icon: CheckCircle2,
                },
                {
                  step: '3',
                  title: 'Building Permit',
                  description:
                    'If Deemed-to-Comply criteria are met, no planning permit required. Straight to building permit with a registered building surveyor.',
                  icon: Briefcase,
                },
                {
                  step: '4',
                  title: 'Build & Handover',
                  description:
                    'Construction by vetted builders. Quality control throughout. Handover with all compliance documentation.',
                  icon: Heart,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start space-x-6">
                    <div className="bg-neutral-700 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-natural-900 mb-3 flex items-center space-x-2 dark:text-natural-50">
                        <span>{item.title}</span>
                        <Icon className="w-5 h-5 text-neutral-700" />
                      </h3>
                      <p className="text-natural-700 leading-relaxed text-lg dark:text-natural-200">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SSD Entry Point - Registration Form */}
      <section
        id="register"
        className="py-20 bg-neutral-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                SSD Feasibility Entry Point
              </h2>
              <p className="text-lg text-neutral-300">
                Submit your details. We'll validate whether your site meets SSD criteria and provide a 
                professional feasibility report within 48 hours.
              </p>
              <p className="text-sm text-neutral-500 mt-4">
                No sales pressure. If your site doesn't work, we'll explain why.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-natural-900">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">
                    Suburb / Postcode (Victoria) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">
                    Approximate lot size (sqm) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 600"
                    value={formData.backyardSize}
                    onChange={(e) => setFormData({ ...formData, backyardSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">
                    Primary Use *
                  </label>
                  <select
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  >
                    <option value="">Select primary use</option>
                    <option value="family">Multi-generational family living</option>
                    <option value="rental">Long-term rental income</option>
                    <option value="both">Both (family now, rental later)</option>
                    <option value="office">Home office / studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-natural-700 mb-2">
                    When are you hoping to start?
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  >
                    <option value="">Select timeframe</option>
                    <option value="0-6months">Within 6 months</option>
                    <option value="6-12months">6–12 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <Button variant="primary" size="lg" className="w-full bg-neutral-900 hover:bg-neutral-800" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request SSD Feasibility Check'}
                </Button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-neutral-100 border border-neutral-200 rounded-lg text-center">
                    <p className="text-neutral-800 font-medium">
                      ✓ Received. We'll review your site and respond within 48 hours with a feasibility assessment.
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

      {/* GEO Footer */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              <strong>Victorian SSD Compliance Service</strong> — Bayview Hub provides Small Second Dwelling feasibility 
              assessment and project management services for residential properties in Victoria, Australia.
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              SSD regulations governed by Victorian Planning Provisions, Clause 54.03. This page is for informational 
              purposes and does not constitute legal or planning advice. Always consult qualified professionals for 
              your specific situation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
