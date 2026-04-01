'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import type { EditorialEntry, EditorialStatus, EditorialType } from '@/lib/editorial'
import {
  editorialAbsoluteUrlFromPath,
  editorialTypeLabel,
  sanitizeEditorialSlug,
} from '@/lib/editorial'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'

type Props = {
  entry?: EditorialEntry | null
}

const TYPE_OPTIONS: EditorialType[] = [
  'essay',
  'field_note',
  'profile',
  'invitation',
  'project_brief',
  'dispatch',
]

function toDateTimeLocal(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function EditorialEditorClient({ entry }: Props) {
  const [title, setTitle] = useState(entry?.title || '')
  const [slug, setSlug] = useState(entry?.slug || '')
  const [summary, setSummary] = useState(entry?.summary || '')
  const [bodyMarkdown, setBodyMarkdown] = useState(entry?.bodyMarkdown || '')
  const [editorialType, setEditorialType] = useState<EditorialType>(entry?.editorialType || 'essay')
  const [publishedAt, setPublishedAt] = useState(toDateTimeLocal(entry?.publishedAt || null))
  const [heroImage, setHeroImage] = useState(entry?.heroImage || '')
  const [byline, setByline] = useState(entry?.byline || '')
  const [tags, setTags] = useState((entry?.tags || []).join(', '))
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(entry?.primaryCtaLabel || '')
  const [primaryCtaHref, setPrimaryCtaHref] = useState(entry?.primaryCtaHref || '')
  const [seoTitle, setSeoTitle] = useState(entry?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(entry?.seoDescription || '')
  const [pinned, setPinned] = useState(Boolean(entry?.pinned))
  const [entryStatus, setEntryStatus] = useState<EditorialStatus>(entry?.status || 'draft')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const publicSlug = useMemo(() => sanitizeEditorialSlug(slug, title), [slug, title])
  const publicPath = useMemo(() => (publicSlug ? `/journal/${publicSlug}` : entry?.path || ''), [entry?.path, publicSlug])

  const submit = async (desiredStatus: EditorialStatus) => {
    setStatus('loading')
    setMessage('')

    const endpoint = entry?.id ? `/api/editorial/admin/${entry.id}` : '/api/editorial/admin'
    const method = entry?.id ? 'PATCH' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          summary,
          bodyMarkdown,
          editorialType,
          status: desiredStatus,
          publishedAt,
          heroImage,
          byline,
          tags,
          primaryCtaLabel,
          primaryCtaHref,
          seoTitle,
          seoDescription,
          pinned,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setStatus('error')
        setMessage(data.error || 'Failed to save entry.')
        return
      }

      setStatus('success')
      setEntryStatus(desiredStatus)
      setMessage(desiredStatus === 'published' ? 'Entry published.' : 'Draft saved.')

      if (!entry?.id && data.id) {
        window.location.href = `/private/editorial/${data.id}`
        return
      }
    } catch {
      setStatus('error')
      setMessage('Failed to save entry.')
    }
  }

  const logout = async () => {
    await fetch('/api/newsletter/admin/logout', { method: 'POST' })
    window.location.href = '/private/editorial/login'
  }

  const useTitleForSlug = () => {
    setSlug(sanitizeEditorialSlug(title, title))
  }

  const copyPublicUrl = async () => {
    if (!publicPath) return
    try {
      await navigator.clipboard.writeText(editorialAbsoluteUrlFromPath(publicPath))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
      <section className="rounded-2xl bg-natural-50 p-8 dark:border dark:border-border dark:bg-surface">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-accent">Private</p>
            <h1 className="text-3xl font-serif font-bold text-fg">
              {entry?.id ? 'Edit Journal Entry' : 'New Journal Entry'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Simple markdown is supported: blank lines create paragraphs, <code>##</code> creates a section heading, <code>-</code> creates bullets, and <code>[text](url)</code> creates a link.
            </p>
          </div>
          <button type="button" onClick={logout} className="text-sm text-muted transition-colors hover:text-fg">
            Log out
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={CONTRAST_FORM_CONTROL_CLASS} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="why-private-viewing-matters"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Editorial type</label>
              <select
                value={editorialType}
                onChange={(e) => setEditorialType(e.target.value as EditorialType)}
                className={CONTRAST_FORM_CONTROL_CLASS}
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {editorialTypeLabel(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Summary / dek</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={CONTRAST_FORM_CONTROL_CLASS}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Body</label>
            <textarea
              rows={20}
              value={bodyMarkdown}
              onChange={(e) => setBodyMarkdown(e.target.value)}
              className={`${CONTRAST_FORM_CONTROL_CLASS} font-mono text-sm leading-7`}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Hero image URL</label>
              <input
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Byline</label>
              <input
                value={byline}
                onChange={(e) => setByline(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="Bayview Hub"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Primary CTA label</label>
              <input
                value={primaryCtaLabel}
                onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="Request Private Viewing"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Primary CTA href</label>
              <input
                value={primaryCtaHref}
                onChange={(e) => setPrimaryCtaHref(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="/visit or https://..."
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Publish date</label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Tags</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
                placeholder="art, place, hospitality"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">SEO title</label>
              <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={CONTRAST_FORM_CONTROL_CLASS} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">SEO description</label>
              <input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className={CONTRAST_FORM_CONTROL_CLASS}
              />
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-fg">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="h-4 w-4" />
            Pin this entry to the top of Journal lists
          </label>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface">
          <h2 className="text-xl font-serif font-bold text-fg">Actions</h2>
          <p className="mt-2 text-sm text-muted">
            Current state: <span className="font-medium text-fg">{entryStatus}</span>
          </p>
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => submit('draft')}
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-primary-700 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
            >
              {status === 'loading' ? 'Saving…' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => submit('published')}
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {status === 'loading' ? 'Publishing…' : 'Publish'}
            </button>
          </div>
          {message ? (
            <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}`}>
              {message}
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface">
          <h2 className="text-xl font-serif font-bold text-fg">Quick links</h2>
          <div className="mt-4 space-y-3 text-sm">
            <Link href="/private/editorial" className="block text-fg underline underline-offset-4 hover:text-accent">
              Back to editorial index
            </Link>
            <Link href="/private/newsletter" className="block text-fg underline underline-offset-4 hover:text-accent">
              Open newsletter admin
            </Link>
            {publicPath ? (
              <>
                <button type="button" onClick={copyPublicUrl} className="block text-fg underline underline-offset-4 hover:text-accent">
                  {copied ? 'Public URL copied' : 'Copy public URL'}
                </button>
                {entryStatus === 'published' ? (
                  <Link href={publicPath} className="block text-fg underline underline-offset-4 hover:text-accent">
                    Open live article
                  </Link>
                ) : (
                  <p className="text-muted">Publish this entry before opening the live article.</p>
                )}
              </>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface">
          <h2 className="text-xl font-serif font-bold text-fg">Slug helper</h2>
          <p className="mt-2 text-sm text-muted">
            Keep public URLs clean and stable. If you change the slug after publishing, the live URL also changes.
          </p>
          <button
            type="button"
            onClick={useTitleForSlug}
            className="mt-4 text-sm text-fg underline underline-offset-4 hover:text-accent"
          >
            Use title as slug
          </button>
          {publicPath ? <p className="mt-3 break-all text-xs text-muted">{publicPath}</p> : null}
        </section>
      </aside>
    </div>
  )
}
