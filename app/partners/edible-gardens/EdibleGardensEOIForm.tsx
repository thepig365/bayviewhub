'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'

type FormState = {
  name: string
  email: string
  phone: string
  website: string
  applicantType: 'Individual' | 'Team' | 'Business' | ''
  pilotStart: '0–30 days' | '30–60 days' | '60–90 days' | 'Later' | ''
  hasRunProgramsBefore: 'Yes' | 'No' | ''
  programExperience: string
  availability: string
  message: string
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  website: '',
  applicantType: '',
  pilotStart: '',
  hasRunProgramsBefore: '',
  programExperience: '',
  availability: '',
  message: '',
}

export function EdibleGardensEOIForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const params = useSearchParams()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== 'idle') return

    setError(null)
    setStatus('submitting')

    const utm = getAttribution(params)
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '/partners/edible-gardens'

    try {
      const res = await fetch('/api/eoi-edible-gardens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: pageUrl,
          utm,
          form,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Submission failed')
      }

      track('eg_form_submit_success', {
        ...utm,
        forwardedWebhook: String(Boolean(data?.forwardedWebhook)),
        emailedOwner: String(Boolean(data?.emailedOwner)),
        emailedApplicant: String(Boolean(data?.emailedApplicant)),
      })
      setStatus('submitted')
    } catch (err: any) {
      setStatus('idle')
      setError(err?.message || 'Something went wrong. Please try again.')
      track('eg_form_submit_error', getAttribution(params))
    }
  }

  if (status === 'submitted') {
    return (
      <div className="rounded-2xl p-8 bg-white shadow-lg border border-natural-200 text-center dark:bg-primary-900/60 dark:border-primary-700">
        <h3 className="text-2xl font-serif font-bold text-natural-900 mb-3 dark:text-natural-50">
          Expression of Interest received
        </h3>
        <p className="text-natural-700 dark:text-natural-200">
          Thank you. We’ll review your submission and reach out to arrange a short alignment conversation.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl p-8 bg-white shadow-lg border border-natural-200 dark:bg-primary-900/60 dark:border-primary-700"
    >
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-100">
          {error}
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            Website / LinkedIn
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            I’m applying as *
          </label>
          <select
            required
            value={form.applicantType}
            onChange={(e) => setForm({ ...form, applicantType: e.target.value as FormState['applicantType'] })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          >
            <option value="">Select one</option>
            <option value="Individual">Individual</option>
            <option value="Team">Team</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            I can start a pilot *
          </label>
          <select
            required
            value={form.pilotStart}
            onChange={(e) => setForm({ ...form, pilotStart: e.target.value as FormState['pilotStart'] })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          >
            <option value="">Select a timeframe</option>
            <option value="0–30 days">0–30 days</option>
            <option value="30–60 days">30–60 days</option>
            <option value="60–90 days">60–90 days</option>
            <option value="Later">Later</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            Have you run subscriptions/workshops before? *
          </label>
          <select
            required
            value={form.hasRunProgramsBefore}
            onChange={(e) => setForm({ ...form, hasRunProgramsBefore: e.target.value as FormState['hasRunProgramsBefore'] })}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:focus:ring-primary-300"
          >
            <option value="">Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
            Availability / time commitment
          </label>
          <input
            type="text"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
            placeholder="e.g., weekends only / 3 days per week / full-time"
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
          Briefly describe your subscription/workshop experience
          {form.hasRunProgramsBefore === 'Yes' ? ' *' : ''}
        </label>
        <textarea
          required={form.hasRunProgramsBefore === 'Yes'}
          rows={4}
          value={form.programExperience}
          onChange={(e) => setForm({ ...form, programExperience: e.target.value })}
          placeholder="What did you run? How many subscribers/attendees? What worked?"
          className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
          Tell us who you are and what you want to build *
        </label>
        <textarea
          required
          rows={7}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Who you are • what you want to build • how you see an edible garden serving people and community"
          className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
        />
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting…' : 'Apply as Founding Edible Gardens Partner'}
      </Button>
    </form>
  )
}


