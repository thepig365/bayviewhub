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
  sent_at: string | null
  target_count: number
  preview_text: string | null
  intro_text: string | null
  html_body: string
  test_recipient: string | null
}

type Props = {
  activeSubscriberCount: number | null
  recentCampaigns: CampaignSummary[]
  recentJournalEntries: Array<{
    id: string
    title: string
    path: string
    absoluteUrl: string
    editorialType: string
    publishedAt: string | null
    summary: string
  }>
}

const DEFAULT_HTML = `<p>Hello from Bayview Hub,</p>
<p>Use this space for the newsletter body. You can paste simple HTML such as paragraphs, headings, links, lists, and images.</p>
<p><a href="https://www.bayviewhub.me/experiences">See what is on now</a>.</p>`

type SendResult =
  | null
  | {
      mode: 'draft' | 'test' | 'send_all'
      campaignId: string
      targetCount?: number
      sentCount?: number
      failedCount?: number
      message: string
      isError?: boolean
    }

export function NewsletterAdminClient({
  activeSubscriberCount,
  recentCampaigns,
  recentJournalEntries,
}: Props) {
  const [campaigns, setCampaigns] = useState(recentCampaigns)
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [introText, setIntroText] = useState('')
  const [htmlBody, setHtmlBody] = useState(DEFAULT_HTML)
  const [testEmail, setTestEmail] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null)
  const [campaignFilter, setCampaignFilter] = useState<'all' | 'draft' | 'sent' | 'failed'>('all')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<SendResult>(null)

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (campaignFilter === 'all') return true
    if (campaignFilter === 'draft') return campaign.status === 'draft'
    if (campaignFilter === 'sent') return campaign.status === 'sent' || campaign.status === 'partial'
    return campaign.status === 'failed'
  })

  const loadCampaign = (campaign: CampaignSummary) => {
    setCurrentDraftId(campaign.status === 'draft' ? campaign.id : null)
    setSubject(campaign.subject || '')
    setPreviewText(campaign.preview_text || '')
    setIntroText(campaign.intro_text || '')
    setHtmlBody(campaign.html_body || DEFAULT_HTML)
    setResult({
      mode: 'draft',
      campaignId: campaign.id,
      message: campaign.status === 'draft' ? 'Draft loaded into composer.' : 'Previous campaign loaded into composer.',
    })
  }

  const insertJournalLink = async (entry: Props['recentJournalEntries'][number]) => {
    const snippet = `<p><strong><a href="${entry.absoluteUrl}">${entry.title}</a></strong><br/>${entry.summary}</p>`
    setHtmlBody((prev) => `${prev.trim()}\n\n${snippet}`)
    try {
      await navigator.clipboard.writeText(entry.absoluteUrl)
    } catch {}
  }

  const copyJournalUrl = async (entry: Props['recentJournalEntries'][number]) => {
    try {
      await navigator.clipboard.writeText(entry.absoluteUrl)
      setResult({
        mode: 'draft',
        campaignId: currentDraftId || entry.id,
        message: 'Journal URL copied.',
      })
    } catch {
      setResult({
        mode: 'draft',
        campaignId: currentDraftId || entry.id,
        message: 'Could not copy Journal URL.',
        isError: true,
      })
    }
  }

  const saveDraft = async () => {
    setStatus('loading')
    setResult(null)
    try {
      const res = await fetch('/api/newsletter/admin/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: currentDraftId,
          subject,
          previewText,
          introText,
          htmlBody,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setStatus('error')
        setResult({
          mode: 'draft',
          campaignId: currentDraftId || 'draft',
          message: data.error || 'Draft save failed.',
          isError: true,
        })
        return
      }

      setStatus('success')
      setCurrentDraftId(data.campaignId)
      setCampaigns((prev) => {
        const next = [
          {
            id: data.campaignId,
            subject,
            status: 'draft',
            send_kind: 'test',
            sent_count: 0,
            failed_count: 0,
            created_at: new Date().toISOString(),
            sent_at: null,
            target_count: 0,
            preview_text: previewText || null,
            intro_text: introText || null,
            html_body: htmlBody,
            test_recipient: null,
          },
          ...prev.filter((campaign) => campaign.id !== data.campaignId),
        ]
        return next.slice(0, 12)
      })
      setResult({
        mode: 'draft',
        campaignId: data.campaignId,
        message: 'Draft saved.',
      })
    } catch {
      setStatus('error')
      setResult({
        mode: 'draft',
        campaignId: currentDraftId || 'draft',
        message: 'Draft save failed.',
        isError: true,
      })
    }
  }

  const submit = async (mode: 'test' | 'send_all') => {
    setStatus('loading')
    setResult(null)
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
          campaignId: currentDraftId,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('success')
        setCurrentDraftId(null)
        setCampaigns((prev) => {
          const next = [
            {
              id: data.campaignId,
              subject,
              status: mode === 'test' ? 'sent' : data.failedCount > 0 ? 'partial' : 'sent',
              send_kind: mode,
              sent_count: data.sentCount ?? 0,
              failed_count: data.failedCount ?? 0,
              created_at: new Date().toISOString(),
              sent_at: new Date().toISOString(),
              target_count: data.targetCount ?? 0,
              preview_text: previewText || null,
              intro_text: introText || null,
              html_body: htmlBody,
              test_recipient: mode === 'test' ? testEmail || null : null,
            },
            ...prev.filter((campaign) => campaign.id !== data.campaignId),
          ]
          return next.slice(0, 12)
        })
        setResult({
          mode,
          campaignId: data.campaignId,
          targetCount: data.targetCount,
          sentCount: data.sentCount,
          failedCount: data.failedCount,
          message:
            mode === 'test'
              ? 'Test send accepted.'
              : 'Bulk send completed.',
        })
      } else {
        setStatus('error')
        setResult({
          mode,
          campaignId: currentDraftId || 'send',
          message: data.error || 'Newsletter send failed.',
          isError: true,
        })
      }
    } catch {
      setStatus('error')
      setResult({
        mode,
        campaignId: currentDraftId || 'send',
        message: 'Newsletter send failed.',
        isError: true,
      })
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
            <p className="mt-2 text-sm text-muted">
              Reuse Journal content, save drafts, and send only when the issue is ready.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/private/newsletter/subscribers" className="text-sm text-fg underline underline-offset-4 hover:text-accent">
              Subscribers
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-sm text-muted hover:text-fg transition-colors"
            >
              Log out
            </button>
          </div>
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

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={saveDraft}
              disabled={status === 'loading'}
              className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-fg transition-colors hover:border-accent disabled:opacity-60"
            >
              Save Draft
            </button>
            {currentDraftId ? (
              <p className="self-center text-xs text-muted">Current draft/campaign: {currentDraftId}</p>
            ) : null}
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

          {result ? (
            <div className={`mt-4 rounded-lg border p-4 text-sm ${result.isError ? 'border-red-300 text-red-600 dark:border-red-800 dark:text-red-400' : 'border-accent/30 text-fg'}`}>
              <p className={result.isError ? '' : 'text-accent'}>{result.message}</p>
              <p className="mt-2 text-xs opacity-80">Campaign {result.campaignId}</p>
              {typeof result.targetCount === 'number' ? (
                <p className="mt-2 text-xs opacity-80">
                  Target {result.targetCount} · sent {result.sentCount ?? 0} · failed {result.failedCount ?? 0}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="bg-natural-50 rounded-2xl p-6 dark:bg-surface dark:border dark:border-border">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-serif font-bold text-fg">Campaign History</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {(['all', 'draft', 'sent', 'failed'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCampaignFilter(filter)}
                  className={`rounded-full px-3 py-1 transition-colors ${campaignFilter === filter ? 'bg-primary-700 text-white' : 'border border-border text-fg'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          {filteredCampaigns.length === 0 ? (
            <p className="text-sm text-muted">No campaign rows yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {filteredCampaigns.map((campaign) => (
                <li key={campaign.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-fg">{campaign.subject}</p>
                      <p className="mt-1 text-xs text-muted">
                        {campaign.send_kind} · {campaign.status} · target {campaign.target_count} · sent {campaign.sent_count} / failed {campaign.failed_count}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Created {new Date(campaign.created_at).toLocaleString()}
                        {campaign.sent_at ? ` · Sent ${new Date(campaign.sent_at).toLocaleString()}` : ''}
                      </p>
                      {campaign.test_recipient ? (
                        <p className="mt-1 text-xs text-muted">Test recipient: {campaign.test_recipient}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => loadCampaign(campaign)}
                      className="text-sm text-fg underline underline-offset-4 hover:text-accent"
                    >
                      Load
                    </button>
                  </div>
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
                  <p className="mt-2 text-xs text-muted">{entry.summary}</p>
                  <p className="mt-2 break-all text-xs text-muted">{entry.path}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => insertJournalLink(entry)}
                      className="text-fg underline underline-offset-4 hover:text-accent"
                    >
                      Insert into issue
                    </button>
                    <button
                      type="button"
                      onClick={() => copyJournalUrl(entry)}
                      className="text-fg underline underline-offset-4 hover:text-accent"
                    >
                      Copy URL
                    </button>
                    <Link href={entry.path} className="text-fg underline underline-offset-4 hover:text-accent">
                      Open
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </div>
  )
}
