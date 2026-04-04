'use client'

import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { CONTRAST_FORM_CONTROL_ROW_CLASS } from '@/lib/contrast-form-field-class'

type Props = {
  className?: string
}

export function MendpressInlineNewsletterCta({ className = '' }: Props) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interests: [], website: honeypot }),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`rounded-[1.75rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8 ${className}`.trim()}>
      <p className="eyebrow text-accent">Bayview Notes</p>
      <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">Stay with Mendpress</h2>
      <p className="mt-3 max-w-2xl text-[1.02rem] leading-8 text-fg/90 dark:text-white/90 md:text-base md:leading-7">
        Essays, dialogues, and field notes — published when there is something worth reading.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          className="absolute -left-[9999px] h-px w-px opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status !== 'idle') setStatus('idle')
            }}
            placeholder="Email address"
            className={`${CONTRAST_FORM_CONTROL_ROW_CLASS} px-5 py-4 focus:ring-accent dark:focus:ring-accent`}
            required
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </div>
        <p className="text-[13px] leading-6 text-fg/72 dark:text-white/72">
          No frequency promises. Unsubscribe any time.
        </p>
        {status === 'success' ? (
          <p className="text-[15px] leading-7 text-accent md:text-sm">Thanks — you&apos;re on the list.</p>
        ) : null}
        {status === 'error' ? (
          <p className="text-[15px] leading-7 text-red-600 dark:text-red-400 md:text-sm">
            Something went wrong. Try again or email {SITE_CONFIG.email}.
          </p>
        ) : null}
      </form>
    </section>
  )
}
