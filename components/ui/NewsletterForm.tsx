'use client'

import React, { useState } from 'react'
import { Button } from './Button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const interestOptions = [
    { id: 'music', label: 'Music' },
    { id: 'dining', label: 'Dining' },
    { id: 'gardens', label: 'Gardens' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'gallery', label: 'Gallery' },
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
        body: JSON.stringify({ email, interests }),
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
        <label htmlFor="email" className="block text-sm font-medium text-natural-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-natural-700 mb-3">
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
                className="w-4 h-4 text-primary-600 border-natural-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-natural-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-primary-700 text-center">
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

