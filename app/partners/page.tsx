'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FOUNDING_ROLES } from '@/lib/constants'
import { Upload } from 'lucide-react'

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    role: '',
    plan: '',
    availability: '',
    hasQualification: false,
    hasInsurance: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Application submitted! We will be in touch soon.')
  }

  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 py-20 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Founding Partners Wanted
            </h1>
            <p className="text-xl text-natural-700 mb-8 leading-relaxed dark:text-natural-200">
              A destination hub with existing footfall and hospitality engine. Now expanding into Gallery, Art Programs, and Gardens.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#apply" variant="primary" size="lg">
                Apply Now
              </Button>
              <Button href="/partners/edible-gardens" variant="outline" size="lg">
                Edible Gardens Opportunity
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-natural-50">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-natural-50">
                  Existing Footfall + Destination Context
                </h3>
                <p className="text-natural-600 dark:text-natural-200">
                  50k+ annual visitors already coming for dining and music experiences
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-natural-50">
                  Built-in Hospitality Ecosystem
                </h3>
                <p className="text-natural-600 dark:text-natural-200">
                  Operational restaurant, cellar door, and live music venue as your foundation
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-natural-50">
                  Clear Revenue Streams
                </h3>
                <p className="text-natural-600 dark:text-natural-200">
                  Exhibitions, workshops, subscriptions with proven customer base
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-natural-50">
                  Partnership Structure
                </h3>
                <p className="text-natural-600 dark:text-natural-200">
                  Base compensation + revenue share + milestone bonuses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center dark:text-natural-50">
            Available Founding Roles
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FOUNDING_ROLES.map((role) => (
              <div key={role.id} className="bg-white rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                  {role.title}
                </h3>
                <p className="text-natural-600 mb-6 dark:text-natural-200">{role.description}</p>
                <ul className="space-y-3 mb-8">
                  {role.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-sm text-natural-600 dark:text-natural-200">
                      <span className="text-primary-600 mr-2 font-bold">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                {role.requirements && (
                  <div className="bg-accent-50 rounded-lg p-4 mb-6">
                    <p className="text-xs font-semibold text-accent-900 mb-2">Requirements:</p>
                    {role.requirements.map((req, idx) => (
                      <p key={idx} className="text-xs text-accent-800">• {req}</p>
                    ))}
                  </div>
                )}
                <Button href="#apply" variant="accent" size="sm" className="w-full">
                  Apply for This Role
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-natural-50">
              Apply Now
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-natural-50 rounded-2xl p-8 dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <div>
                <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
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
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
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
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                  Role Applying For *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
                >
                  <option value="">Select a role</option>
                  {FOUNDING_ROLES.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                  Your 90-Day Plan * (describe or paste link)
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  placeholder="What would you build in your first 90 days?"
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="e.g., Immediate, 2 weeks notice"
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
                />
              </div>

              {formData.role === 'art-therapy' && (
                <div className="bg-accent-50 rounded-lg p-4 space-y-3 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.hasQualification}
                      onChange={(e) => setFormData({ ...formData, hasQualification: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-natural-700 dark:text-natural-200">
                      I hold relevant qualifications in art therapy or equivalent
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.hasInsurance}
                      onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-natural-700 dark:text-natural-200">
                      I have or can obtain professional indemnity insurance
                    </span>
                  </label>
                </div>
              )}

              <Button variant="primary" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

