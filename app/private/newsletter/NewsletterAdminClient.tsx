'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { editorialTypeLabel, formatEditorialDate, type EditorialType } from '@/lib/editorial'

type CampaignSummary = {
  id: string
  subject: string
  status: string
  send_kind: string
  sent_count: number
  failed_count: number
  created_at: string
}

type Props = {
  activeSubscriberCount: number | null
  recentCampaigns: CampaignSummary[]
  recentJournalEntries: Array<{
    id: string
    title: string
    path: string
    editorialType: string
    publishedAt: string | null
  }>
}

const DEFAULT_HTML = `<p>Hello from Bayview Hub,</p>
<p>Use this space for the newsletter body. You can paste simple HTML such as paragraphs, headings, links, lists, and images.</p>
<p><a href="https://www.bayviewhub.me/experiences">See what is on now</a>.</p>`

export function NewsletterAdminClient({
  activeSubscriberCount,
  recentCampaigns,
  recentJournalEntries,
}: Props) {
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [introText, setIntroText] = useState('')
  const [htmlBody, setHtmlBody] = useState(DEFAULT_HTML)
  const [testEmail, setTestEmail] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<string>('')

  const submit = async (mode: 'test' | 'send_all') => {
    setStatus('loading')
    setResult('')
    try {
      const res = await fetch('/api/newsletter/admin/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          subject,
          previewText,
          introText,
          htmlBody,
          testEmail,
          confirmText,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('success')
        setResult(
          mode === 'test'
            ? `Test send accepted. Campaign ${data.campaignId}.`
            : `Bulk send completed. Target ${data.targetCount}, sent ${data.sentCount}, failed ${data.failedCount}. Campaign ${data.campaignId}.`
        )
      } else {
        setStatus('error')
        setResult(data.error || 'Newsletter send failed.')
      }
    } catch {
      setStatus('error')
      setResult('Newsletter send failed.')
    }
  }

  const logout = async () => {
    await fetch('/api/newsletter/admin/logout', { method: 'POST' })
    window.location.href = '/private/newsletter/login'
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <section className="bg-natural-50 rounded-2xl p-8 dark:bg-surface dark:border dark:border-border">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="eyebrow text-accent mb-2">Private</p>
            <h1 className="text-3xl font-serif font-bold text-fg">Newsletter Compose</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-sm text-muted hover:text-fg transition-colors"
          >
            Log out
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="Bayview Hub newsletter subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Preview text</label>
            <input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="Short inbox preview"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Intro</label>
            <textarea
              rows={3}
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="Optional intro paragraph"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">HTML body</label>
            <textarea
              rows={16}
              value={htmlBody}
              onChange={(e) => setHtmlBody(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <p className="mt-2 text-xs text-muted">
              Simple HTML is supported. The system wraps it in a Bayview Hub email shell and adds an unsubscribe footer.
            </p>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="bg-natural-50 rounded-2xl p-6 dark:bg-surface dark:border dark:border-border">
          <h2 className="text-xl font-serif font-bold text-fg mb-4">Send</h2>
          <p className="text-sm text-muted mb-4">
            Active subscribers: <strong className="text-fg">{activeSubscriberCount ?? 'Unavailable'}</strong>
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-fg mb-2">Test email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="button"
              onClick={() => submit('test')}
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-primary-700 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
            >
              Send Test
            </button>

            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-fg mb-2">
                Confirm bulk send
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder='Type "SEND"'
              />
              <button
                type="button"
                onClick={() => submit('send_all')}
                disabled={status === 'loading'}
                className="mt-3 w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                Send To All Active Subscribers
              </button>
            </div>
          </div>

          {result && (
            <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}`}>
              {result}
            </p>
          )}
        </section>

        <section className="bg-natural-50 rounded-2xl p-6 dark:bg-surface dark:border dark:border-border">
          <h2 className="text-xl font-serif font-bold text-fg mb-4">Recent Campaigns</h2>
          {recentCampaigns.length === 0 ? (
            <p className="text-sm text-muted">No campaign rows yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentCampaigns.map((campaign) => (
                <li key={campaign.id} className="rounded-lg border border-border p-3">
                  <p className="font-medium text-fg">{campaign.subject}</p>
                  <p className="text-xs text-muted mt-1">
                    {campaign.send_kind} · {campaign.status} · sent {campaign.sent_count} / failed {campaign.failed_count}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(campaign.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-natural-50 rounded-2xl p-6 dark:bg-surface dark:border dark:border-border">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-serif font-bold text-fg">Recent Journal Entries</h2>
            <Link href="/private/editorial" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
              Open editorial
            </Link>
          </div>
          {recentJournalEntries.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No published Journal entries yet. Publish one from the editorial workspace to link it in a newsletter.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentJournalEntries.map((entry) => (
                <li key={entry.id} className="rounded-lg border border-border p-3">
                  <p className="font-medium text-fg">{entry.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {editorialTypeLabel(entry.editorialType as EditorialType)} · {formatEditorialDate(entry.publishedAt)}
                  </p>
                  <p className="mt-2 break-all text-xs text-muted">{entry.path}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </div>
  )
}
