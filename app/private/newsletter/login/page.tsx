'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PrivateNewsletterLoginInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const notConfigured = searchParams.get('missing') === '1'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        router.push('/private/newsletter')
        router.refresh()
        return
      }
      setStatus('error')
      setMessage(data.error || 'Login failed.')
    } catch {
      setStatus('error')
      setMessage('Login failed.')
    }
  }

  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-natural-50 rounded-2xl p-8 dark:bg-surface dark:border dark:border-border">
          <p className="eyebrow text-accent mb-3 text-center">Private</p>
          <h1 className="text-3xl font-serif font-bold text-fg text-center mb-4">
            Newsletter Admin
          </h1>
          <p className="text-muted text-center mb-8">
            Enter the newsletter admin password to compose and send a campaign.
          </p>

          {notConfigured && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-6">
              Newsletter admin access is not configured yet. Set <code>NEWSLETTER_ADMIN_PASSWORD</code> in the deployment environment first.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newsletter-admin-password" className="block text-sm font-medium text-fg mb-2">
                Password
              </label>
              <input
                id="newsletter-admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || notConfigured}
              className="w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {status === 'loading' ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {status === 'error' && message && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{message}</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default function PrivateNewsletterLoginPage() {
  return (
    <Suspense fallback={null}>
      <PrivateNewsletterLoginInner />
    </Suspense>
  )
}
