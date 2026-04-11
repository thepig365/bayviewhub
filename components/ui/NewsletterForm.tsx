'use client'

import React, { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'
import { type SiteLocale } from '@/lib/language-routing'
import { getAttribution, track } from '@/lib/analytics'
import { Button } from './Button'

export function NewsletterForm({ locale = 'en' }: { locale?: SiteLocale }) {
  const pathname = usePathname() || '/newsletter'
  const pageSection = locale === 'zh' ? 'newsletter_zh' : 'newsletter'
  const formStarted = useRef(false)
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [honeypot, setHoneypot] = useState('')

  const interestOptions = [
    { id: 'music', label: locale === 'zh' ? 'The Shed 音乐（现场音乐）' : 'The Shed Music (Live Music)' },
    { id: 'dining', label: locale === 'zh' ? '酒庄餐厅（Pig & Whistle）' : 'Winery Restaurant (Pig & Whistle)' },
    { id: 'cellar', label: locale === 'zh' ? '酒窖 / 酒窖品鉴' : 'Wine Cellar / Cellar Door Tastings' },
    { id: 'gardens', label: locale === 'zh' ? '可食花园订阅' : 'Edible Gardens Subscriptions' },
    { id: 'workshops', label: locale === 'zh' ? '艺术工作坊与艺术疗愈' : 'Art Workshops & Art Therapy' },
    { id: 'gallery', label: locale === 'zh' ? 'Bayview 艺术画廊' : 'Bayview Arts Gallery' },
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
      const payload = { email, interests, website: honeypot }
      console.log('[Newsletter Client] Submitting:', payload)
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log('[Newsletter Client] Response:', { status: response.status, data })

      if (response.ok) {
        const sp =
          typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
        const attr = getAttribution(sp)
        track('newsletter_signup', {
          form_id: 'newsletter_bayview_notes',
          page_section: pageSection,
          page_path: pathname,
          ...attr,
        })
        track('form_submit', {
          form_id: 'newsletter_bayview_notes',
          page_section: pageSection,
          page_path: pathname,
          outcome: 'success',
          ...attr,
        })
        setStatus('success')
        setEmail('')
        setInterests([])
      } else {
        console.error('[Newsletter Client] Error:', data)
        setStatus('error')
      }
    } catch (error) {
      console.error('[Newsletter Client] Fetch error:', error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-base font-medium text-fg mb-2">
          {locale === 'zh' ? '邮箱地址' : 'Email Address'}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => {
            if (formStarted.current) return
            formStarted.current = true
            const sp =
              typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
            const attr = getAttribution(sp)
            track('form_start', {
              form_id: 'newsletter_bayview_notes',
              page_section: pageSection,
              page_path: pathname,
              ...attr,
            })
          }}
          required
          className={`${CONTRAST_FORM_CONTROL_CLASS} text-base focus:border-transparent`}
          placeholder={locale === 'zh' ? 'name@example.com' : 'your@email.com'}
        />
      </div>

      <div>
        <p className="block text-base font-medium text-fg mb-3">
          {locale === 'zh' ? '我感兴趣的是：（可多选）' : "I'm interested in: (select all that apply)"}
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
                className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:focus:ring-primary-300"
              />
              <span className="text-base text-fg">{option.label}</span>
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
        {status === 'loading' ? (locale === 'zh' ? '订阅中...' : 'Subscribing...') : locale === 'zh' ? '订阅' : 'Subscribe'}
      </Button>

      {status === 'success' && (
        <p className="text-base text-accent text-center">
          {locale === 'zh' ? '✓ 已成功订阅。' : '✓ Successfully subscribed.'}
        </p>
      )}
      {status === 'error' && (
        <p className="text-base text-red-600 text-center">
          {locale === 'zh' ? '出了点问题，请再试一次。' : 'Something went wrong. Please try again.'}
        </p>
      )}
    </form>
  )
}

