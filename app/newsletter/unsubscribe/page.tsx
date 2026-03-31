'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useMemo, useState } from 'react'

function NewsletterUnsubscribeInner() {
  const searchParams = useSearchParams()
  const email = useMemo(() => searchParams.get('email') || '', [searchParams])
  const sig = useMemo(() => searchParams.get('sig') || '', [searchParams])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleUnsubscribe = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sig }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('success')
        setMessage('You have been unsubscribed from Bayview Hub newsletter emails.')
      } else {
        setStatus('error')
        setMessage(data.error || 'This unsubscribe link is invalid or has expired.')
      }
    } catch {
      setStatus('error')
      setMessage('We could not process this unsubscribe request right now.')
    }
  }

  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-natural-50 rounded-2xl p-8 text-center dark:bg-surface dark:border dark:border-border">
          <p className="eyebrow text-accent mb-3">Newsletter</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-4">
            Unsubscribe
          </h1>

          {email ? (
            <p className="text-muted mb-8">
              Stop sending newsletter updates to <strong className="text-fg">{email}</strong>.
            </p>
          ) : (
            <p className="text-muted mb-8">
              This unsubscribe link is incomplete.
            </p>
          )}

          {status === 'idle' && (
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={!email || !sig}
              className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              Confirm Unsubscribe
            </button>
          )}

          {status === 'loading' && <p className="text-muted">Processing unsubscribe request…</p>}
          {status === 'success' && <p className="text-accent">{message}</p>}
          {status === 'error' && <p className="text-red-600 dark:text-red-400">{message}</p>}

          <p className="mt-8 text-sm text-muted">
            You can return to the <Link href="/newsletter" className="text-accent hover:underline">newsletter page</Link> any time to subscribe again.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <NewsletterUnsubscribeInner />
    </Suspense>
  )
}
