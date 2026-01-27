'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'
import { Home, DollarSign, TrendingUp, Maximize2, CheckCircle2, Users, Briefcase, Heart, Palmtree, AlertTriangle, XCircle, Zap, Shield, FileText } from 'lucide-react'

const houseTypes = [
  {
    title: 'Garden Studio Retreat',
    description: 'Light-filled 60 sqm studio. Work, art, or guest stays. All-electric. Compliant.',
    image: '/images/second-home/garden-studio.jpg',
    priceRange: '$118k - $168k',
    size: '60 sqm max',
  },
  {
    title: 'Guest Cottage SSD',
    description: 'Self-contained SSD for parents, in-laws, long-stay guests. Independent. Adjacent.',
    image: '/images/second-home/guest-cottage.jpg',
    priceRange: '$80k - $135k',
    size: '60 sqm max',
  },
  {
    title: 'Family Pod & Rental',
    description: 'Flexible SSD for teens, young adults, or long-term rental. Versatile. Compliant.',
    image: '/images/second-home/family-pod.jpg',
    priceRange: '$90k - $169k',
    size: '60 sqm max',
  },
  {
    title: 'Modern Minimalist Studio',
    description: 'Clean lines. Expansive glass. Sophisticated workspace or guest retreat.',
    image: '/images/second-home/minimalist-studio.jpg',
    priceRange: '$70k - $110k',
    size: '60 sqm max',
  },
  {
    title: 'California Bungalow 2BR',
    description: 'Craftsman-style. Two bedrooms. Wide eaves. Classic charm, modern compliance.',
    image: '/images/second-home/california-bungalow.jpg',
    priceRange: '$122k - $168k',
    size: '60 sqm max',
  },
  {
    title: 'Two-Bedroom Family Unit',
    description: 'Spacious layout. Two bedrooms. Extended family or rental income.',
    image: '/images/second-home/two-bedroom.jpg',
    priceRange: '$122k - $168k',
    size: '60 sqm max',
  },
]

const useCases = [
  {
    title: 'Multi-Generational Housing',
    description: 'Parents or in-laws stay on familiar ground. Dignity. Proximity. Independence.',
    icon: Heart,
  },
  {
    title: 'Young Adult Transition',
    description: 'Semi-independent space for adult children. Study. Work. Rest. Still connected.',
    icon: Users,
  },
  {
    title: 'Home Office / Studio',
    description: 'Dedicated workspace. Separated from domestic life. No commute. Tax-deductible.',
    icon: Briefcase,
  },
  {
    title: 'Long-Term Rental Asset',
    description: 'Victoria rental demand: sub-1% vacancy. Compliant SSD = bankable yield.',
    icon: Palmtree,
  },
]

// VC253/VC282 Hard Constraints
const ssdFramework = [
  {
    constraint: 'Maximum GFA',
    value: '60 sqm',
    note: 'No exceptions. This is the ceiling under VC253.',
    icon: Maximize2,
  },
  {
    constraint: 'Siting',
    value: 'Behind front wall',
    note: 'SSD must be located behind the front wall line of the main dwelling.',
    icon: Home,
  },
  {
    constraint: 'Utilities',
    value: 'All-electric only',
    note: 'No reticulated gas connection. Mandated under VC282.',
    icon: Zap,
  },
  {
    constraint: 'Ownership',
    value: 'Same title',
    note: 'No subdivision. SSD stays on your title permanently.',
    icon: FileText,
  },
  {
    constraint: 'Main House POS',
    value: '25 sqm minimum',
    note: 'Main dwelling must retain 25 sqm private open space.',
    icon: Shield,
  },
]

// Explicit rejection criteria
const notForYou = [
  { text: 'You want to subdivide and sell separately', reason: 'SSDs cannot be subdivided. Full stop.' },
  { text: 'You need more than 60 sqm', reason: 'This framework is for compact high-yield assets, not mansions.' },
  { text: 'You expect gas connection', reason: 'VC282 prohibits reticulated gas. All-electric or nothing.' },
  { text: 'You want to build in the front yard', reason: 'Siting behind front wall is mandatory. No exceptions.' },
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
    <div className="min-h-screen dark:bg-neutral-900">
      {/* Hero - The Manifesto */}
      <section className="bg-neutral-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-mono text-neutral-500 mb-6 uppercase tracking-widest">
              Victorian SSD Framework · VC253/VC282 · 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              60 sqm. No Planning Permit.
              <span className="block text-neutral-400">Bureaucratic Immunity for High-Yield Assets.</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-6 leading-relaxed max-w-3xl">
              We navigate the Victorian SSD framework. Compliant Small Second Dwellings on existing residential lots. 
              Multi-generational housing or rental yield. Same title. No subdivision. No gas.
            </p>
            <p className="text-lg text-neutral-500 mb-10">
              This is not about selling houses. This is about delivering planning certainty within hard constraints.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                href="#register"
                variant="primary"
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100"
                onClick={() => track('sh_register_click', attribution)}
              >
                Enter Feasibility Gate
              </Button>
              <Button
                href="/backyard-second-home/feasibility-checklist"
                variant="outline"
                size="lg"
                className="border-neutral-600 text-white hover:bg-neutral-800"
                onClick={() => track('sh_checklist_click', attribution)}
              >
                Run Compliance Check
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Framework - VC253/VC282 Hard Constraints */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 dark:text-white">
                The Framework: VC253/VC282
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300">
                These are not guidelines. These are hard constraints. Non-negotiable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ssdFramework.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white dark:text-neutral-900" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-400">{item.constraint}</div>
                        <div className="font-bold text-neutral-900 dark:text-white">{item.value}</div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.note}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 p-8 bg-neutral-900 dark:bg-neutral-900 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">The Trade-Off</h3>
              <p className="text-neutral-300 leading-relaxed">
                Comply with these constraints → access the <strong>Deemed-to-Comply pathway</strong> under Clause 54.03 → 
                <strong> bypass planning permit entirely</strong>. Proceed direct to building permit. Council cannot refuse 
                if you meet the criteria. That is the value proposition: constraints in exchange for certainty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Boundary Section - Explicit Rejection */}
      <section className="py-20 bg-neutral-100 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangle className="w-10 h-10 text-neutral-700 dark:text-neutral-400" />
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                This Is Not For You If...
              </h2>
            </div>
            
            <div className="space-y-4 mb-8">
              {notForYou.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-800 rounded-xl border-l-4 border-neutral-900 dark:border-neutral-600">
                  <XCircle className="w-6 h-6 text-neutral-700 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-white mb-1">{item.text}</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{item.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-neutral-900 dark:bg-neutral-700 rounded-xl text-white">
              <p className="text-neutral-300">
                <strong className="text-white">Mansion-seekers and subdividers:</strong> Look elsewhere. 
                This framework delivers 60 sqm compliant assets. If that constraint does not fit your project, 
                engage a traditional developer and expect 12-18 months in Planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SSD - Direct Value */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 dark:text-white">
              Why This Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Constraints create opportunity. Here is the logic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-neutral-900 dark:bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2 dark:text-white">Rental Yield</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Victoria vacancy &lt;1%. Compliant SSD = bankable, recurring income.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-900 dark:bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2 dark:text-white">Asset Growth</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Quality SSD increases property value. Documented. Compliant. Attractive to buyers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-900 dark:bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2 dark:text-white">No Planning Permit</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Deemed-to-Comply = bypass planning. Straight to building permit. Certainty.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral-900 dark:bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2 dark:text-white">Speed</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                No planning = faster timeline. 6-9 months feasibility to handover. Not 18+.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 dark:text-white">
              Use Cases
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon
              return (
                <div key={idx} className="bg-white dark:bg-neutral-800 rounded-xl p-6 flex items-start gap-4">
                  <div className="bg-neutral-900 dark:bg-white rounded-lg p-2 flex-shrink-0">
                    <Icon className="w-5 h-5 text-white dark:text-neutral-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1 dark:text-white">{useCase.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{useCase.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* House Types */}
      <section id="house-types" className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 dark:text-white">
              SSD Configurations
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              All designs comply with VC253/VC282. 60 sqm max. All-electric. Behind front wall.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {houseTypes.map((house, idx) => (
              <div key={idx} className="group bg-neutral-50 dark:bg-neutral-700 rounded-xl overflow-hidden">
                <div className="h-48 bg-neutral-200 dark:bg-neutral-600 relative overflow-hidden">
                  <Image
                    src={house.image}
                    alt={house.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 mb-2 dark:text-white">{house.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 dark:text-neutral-300">{house.description}</p>
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                    <span>{house.priceRange}</span>
                    <span className="font-mono">{house.size}</span>
                  </div>
                  <Button
                    href="#register"
                    variant="primary"
                    size="sm"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    onClick={() => track('sh_house_register_click', { ...attribution, house: house.title })}
                  >
                    Request Feasibility
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entry Gate - Registration Form */}
      <section id="register" className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-widest">
                Entry Gate
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SSD Feasibility Submission
              </h2>
              <p className="text-neutral-400">
                Submit site details. We assess against VC253/VC282 criteria. 
                48-hour response with feasibility determination.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-neutral-900">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Suburb (VIC) *</label>
                    <input
                      type="text"
                      required
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Lot Size (sqm) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 600"
                      value={formData.backyardSize}
                      onChange={(e) => setFormData({ ...formData, backyardSize: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Primary Use *</label>
                    <select
                      required
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    >
                      <option value="">Select use</option>
                      <option value="family">Multi-generational</option>
                      <option value="rental">Rental income</option>
                      <option value="both">Both</option>
                      <option value="office">Home office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Timeline</label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="0-6months">Within 6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="exploring">Exploring</option>
                  </select>
                </div>

                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg" 
                  className="w-full bg-neutral-900 hover:bg-neutral-800" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit for Feasibility Assessment'}
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-neutral-100 border border-neutral-200 rounded-lg text-center">
                    <p className="text-neutral-800 font-medium">
                      Received. Feasibility assessment delivered within 48 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                    <p className="text-red-800">
                      Submission failed. Email leonzh@bayviewestate.com.au directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Footer - Authority */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Victorian SSD Regulatory Compliance Service
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Registered VicSmart Pathway Provider · Clause 54.03 Deemed-to-Comply Specialist
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              <a 
                href="https://www.planning.vic.gov.au/guides-and-resources/guides/small-second-dwellings" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                DTP SSD Guidelines
              </a>
              <span>·</span>
              <span>VC253/VC282 Compliant</span>
              <span>·</span>
              <span>Victoria Planning Provisions</span>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
              This page provides regulatory guidance and does not constitute legal or planning advice. 
              Engage qualified professionals for site-specific determinations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
