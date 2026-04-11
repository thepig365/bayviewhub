'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'
import { getAttribution, track } from '@/lib/analytics'

type FormState = {
  name: string
  email: string
  message: string
  website: string
}

export function WorkshopsEnquiryForm() {
  const pathname = usePathname() || '/workshops'
  const formStarted = useRef(false)
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setStatus('error')
        setErrorMessage(data.error || `Something went wrong. Please email ${SITE_CONFIG.email}.`)
        return
      }

      const sp =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
      const attr = getAttribution(sp)
      track('workshop_enquiry_submit', {
        form_id: 'workshops_enquiry',
        page_section: 'workshops',
        page_path: pathname,
        ...attr,
      })
      track('form_submit', {
        form_id: 'workshops_enquiry',
        page_section: 'workshops',
        page_path: pathname,
        outcome: 'success',
        ...attr,
      })

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        message: '',
        website: '',
      })
    } catch {
      setStatus('error')
      setErrorMessage(`Something went wrong. Please email ${SITE_CONFIG.email}.`)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-natural-100 px-5 py-6 text-center dark:border-border dark:bg-bg/50">
        <p className="text-lg font-medium text-fg">Enquiry received.</p>
        <p className="mt-2 text-[15px] leading-7 text-fg/88 dark:text-white/88 md:text-sm">
          We will respond within 5 business days with programme details and availability.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) => setFormData((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="workshops-name" className="mb-2 block text-base font-medium text-fg">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="workshops-name"
          type="text"
          required
          value={formData.name}
          onFocus={() => {
            if (formStarted.current) return
            formStarted.current = true
            const sp =
              typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
            const attr = getAttribution(sp)
            track('form_start', {
              form_id: 'workshops_enquiry',
              page_section: 'workshops',
              page_path: pathname,
              ...attr,
            })
          }}
          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          className={CONTRAST_FORM_CONTROL_CLASS}
        />
      </div>

      <div>
        <label htmlFor="workshops-email" className="mb-2 block text-base font-medium text-fg">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="workshops-email"
          type="email"
          required
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          className={CONTRAST_FORM_CONTROL_CLASS}
        />
      </div>

      <div>
        <label htmlFor="workshops-message" className="mb-2 block text-base font-medium text-fg">
          Message
        </label>
        <textarea
          id="workshops-message"
          rows={5}
          value={formData.message}
          onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
          className={CONTRAST_FORM_CONTROL_CLASS}
        />
      </div>

      <Button type="submit" variant="accent" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send enquiry'}
      </Button>

      <p className="text-center text-[13px] leading-6 text-fg/72 dark:text-white/72">
        We respond within 5 business days.
      </p>

      {status === 'error' ? <p className="text-center text-sm text-red-600 dark:text-red-400">{errorMessage}</p> : null}
    </form>
  )
}
