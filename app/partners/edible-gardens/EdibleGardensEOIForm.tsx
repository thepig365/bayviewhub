'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

type FormState = {
  name: string
  email: string
  phone: string
  website: string
  message: string
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  website: '',
  message: '',
}

export function EdibleGardensEOIForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [form, setForm] = useState<FormState>(INITIAL_STATE)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== 'idle') return

    setStatus('submitting')

    // NOTE: This matches the current pattern in /partners (simple client-side capture).
    // If/when you want, we can wire this to an API route + email.
    console.log('EOI submitted (Edible Gardens):', form)

    await new Promise((r) => setTimeout(r, 350))
    setStatus('submitted')
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


