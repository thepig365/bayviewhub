'use client'

import React, { useState } from 'react'
import { Button } from './Button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [honeypot, setHoneypot] = useState('')

  const interestOptions = [
    { id: 'music', label: 'The Shed Music (Live Music)' },
    { id: 'dining', label: 'Winery Restaurant (Pig & Whistle)' },
    { id: 'cellar', label: 'Wine Cellar / Cellar Door Tastings' },
    { id: 'gardens', label: 'Edible Gardens Subscriptions' },
    { id: 'workshops', label: 'Art Workshops & Art Therapy' },
    { id: 'gallery', label: 'Bayview Arts Gallery' },
  ]

  const handleInterestToggle = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Replace with your actual API endpoint or form service
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interests, website: honeypot }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setInterests([])
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-natural-700 mb-3 dark:text-natural-200">
          I'm interested in: (select all that apply)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={interests.includes(option.id)}
                onChange={() => handleInterestToggle(option.id)}
                className="w-4 h-4 text-primary-600 border-natural-300 rounded focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:focus:ring-primary-300"
              />
              <span className="text-sm text-natural-700 dark:text-natural-200">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Honeypot field - hidden from humans */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-primary-700 text-center dark:text-primary-300">
          ✓ Successfully subscribed! Check your email.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

