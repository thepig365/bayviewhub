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
    website: '', // honeypot
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/partners', {
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
          linkedin: '',
          role: '',
          plan: '',
          availability: '',
          hasQualification: false,
          hasInsurance: false,
          website: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen dark:bg-bg">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 py-20 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6 dark:text-fg">
              Founding Partners Wanted
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed">
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
      <section className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-fg">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-fg">
                  Existing Footfall + Destination Context
                </h3>
                <p className="text-muted">
                  <a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400">Estimated 50k+ annual visitors</a> (see Evidence) already coming for dining and music experiences
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-fg">
                  Built-in Hospitality Ecosystem
                </h3>
                <p className="text-muted">
                  Operational restaurant, cellar door, and live music venue as your foundation
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-fg">
                  Clear Revenue Streams
                </h3>
                <p className="text-muted">
                  Exhibitions, workshops, subscriptions with proven customer base
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-lg font-bold text-natural-900 mb-3 dark:text-fg">
                  Partnership Structure
                </h3>
                <p className="text-muted">
                  Base compensation + revenue share + milestone bonuses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-natural-50 dark:bg-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center dark:text-fg">
            Available Founding Roles
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FOUNDING_ROLES.map((role) => (
              <div key={role.id} className="bg-white rounded-2xl p-8 shadow-lg dark:bg-surface dark:border dark:border-border">
                <h3 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-fg">
                  {role.title}
                </h3>
                <p className="text-muted mb-6">{role.description}</p>
                <ul className="space-y-3 mb-8">
                  {role.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-base text-muted">
                      <span className="text-primary-600 mr-2 font-bold">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                <Button href="#apply" variant="accent" size="sm" className="w-full">
                  Apply for This Role
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8 text-center dark:text-fg">
              Apply Now
            </h2>

            {status === 'success' ? (
              <div className="bg-natural-50 rounded-2xl p-12 text-center dark:bg-surface dark:border dark:border-border">
                <div className="text-accent-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-serif font-bold text-natural-900 mb-3 dark:text-fg">Application Received</h3>
                <p className="text-muted">We'll review your application and reach out if aligned.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-natural-50 rounded-2xl p-8 dark:bg-surface dark:border dark:border-border">
              <div>
                <label htmlFor="partner-name" className="block text-base font-medium text-fg mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="partner-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label htmlFor="partner-email" className="block text-base font-medium text-fg mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="partner-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label htmlFor="partner-linkedin" className="block text-base font-medium text-fg mb-2">
                  LinkedIn / Portfolio URL
                </label>
                <input
                  id="partner-linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label htmlFor="partner-role" className="block text-base font-medium text-fg mb-2">
                  Role Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  id="partner-role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:focus:ring-primary-300"
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
                <label htmlFor="partner-plan" className="block text-base font-medium text-fg mb-2">
                  Your 90-Day Plan <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-muted mb-2">Describe your vision or paste a link to a document.</p>
                <textarea
                  id="partner-plan"
                  required
                  rows={6}
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  placeholder="What would you build in your first 90 days?"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
              </div>

              <div>
                <label htmlFor="partner-availability" className="block text-base font-medium text-fg mb-2">
                  Availability
                </label>
                <input
                  id="partner-availability"
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="e.g., Immediate, 2 weeks notice"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
              </div>

              {formData.role === 'art-therapy' && (
                <div className="bg-accent-50 rounded-lg p-4 space-y-3 dark:bg-surface/50 dark:border dark:border-border">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.hasQualification}
                      onChange={(e) => setFormData({ ...formData, hasQualification: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-base text-muted">
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
                    <span className="text-base text-muted">
                      I have or can obtain professional indemnity insurance
                    </span>
                  </label>
                </div>
              )}

              {/* Honeypot field - hidden from humans */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <Button variant="primary" size="lg" className="w-full" disabled={status === 'loading'} type="submit">
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </Button>

              {status === 'error' && (
                <p className="text-muted text-center text-base">
                  Error submitting. Please try again or contact us directly.
                </p>
              )}
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

