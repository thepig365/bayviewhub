'use client'

import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'
import { LinkedInPackPanel } from '@/components/editorial/LinkedInPackPanel'
import type { EditorialEntry, EditorialStatus, EditorialType } from '@/lib/editorial'
import {
  editorialAbsoluteUrlFromPath,
  editorialTypeAdminHint,
  editorialTypeAdminLabel,
  mendpressSectionLabel,
  sanitizeEditorialTags,
  sanitizeEditorialSlug,
} from '@/lib/editorial'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'

type Props = {
  entry?: EditorialEntry | null
  imageUploadEnabled?: boolean
}

const TYPE_OPTIONS: EditorialType[] = [
  'essay',
  'field_note',
  'profile',
  'invitation',
  'project_brief',
  'dispatch',
]

const INLINE_MAX_DIMENSION = 1800

function baseFilename(value: string): string {
  return value
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'image'
}

function escapeImageSnippetText(value: string): string {
  return value.trim().replaceAll('"', "'").replaceAll(']', ')')
}

function buildUploadedImageSnippet({
  alt,
  caption,
  displaySrc,
  fullSrc,
}: {
  alt: string
  caption: string
  displaySrc: string
  fullSrc?: string | null
}) {
  const safeAlt = escapeImageSnippetText(alt) || 'Editorial image'
  const safeCaption = escapeImageSnippetText(caption)
  const captionPart = safeCaption ? ` "${safeCaption}"` : ''
  const zoomPart = fullSrc && fullSrc !== displaySrc ? `{zoom=${fullSrc}}` : ''
  return `![${safeAlt}](${displaySrc}${captionPart})${zoomPart}`
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const objectUrl = URL.createObjectURL(file)

  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new window.Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('Failed to process selected image.'))
      image.src = objectUrl
    })
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

async function createInlineImageVariant(file: File): Promise<File> {
  if (
    file.type === 'image/gif' ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/avif'
  ) {
    return file
  }

  const image = await loadImage(file)
  const maxDimension = Math.max(image.naturalWidth, image.naturalHeight)
  if (maxDimension <= INLINE_MAX_DIMENSION && file.size <= 2_000_000) {
    return file
  }

  const scale = Math.min(1, INLINE_MAX_DIMENSION / maxDimension)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Failed to prepare image for upload.')
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  const outputType =
    file.type === 'image/png' || file.type === 'image/webp' ? file.type : 'image/jpeg'
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, outputType, outputType === 'image/png' ? undefined : 0.88)
  })

  if (!blob) {
    throw new Error('Failed to optimize image for reading view.')
  }

  const ext = outputType === 'image/png' ? 'png' : outputType === 'image/webp' ? 'webp' : 'jpg'
  return new File([blob], `${baseFilename(file.name)}-inline.${ext}`, { type: outputType })
}

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

export function EditorialEditorClient({ entry, imageUploadEnabled = false }: Props) {
  const bodyTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
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
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [uploadMessage, setUploadMessage] = useState('')

  const publicSlug = useMemo(() => sanitizeEditorialSlug(slug, title), [slug, title])
  const publicPath = useMemo(() => (publicSlug ? `/mendpress/${publicSlug}` : entry?.path || ''), [entry?.path, publicSlug])
  const linkedInSource = useMemo(
    () => ({
      title: title.trim() || entry?.title || '',
      summary: summary.trim() || entry?.summary || '',
      slug: publicSlug || entry?.slug || '',
      editorialType,
      heroImage: heroImage.trim() || entry?.heroImage || null,
      tags: sanitizeEditorialTags(tags),
      path: publicPath || entry?.path || '',
      seoTitle: seoTitle.trim() || entry?.seoTitle || null,
      byline: byline.trim() || entry?.byline || null,
    }),
    [byline, editorialType, entry?.byline, entry?.heroImage, entry?.path, entry?.seoTitle, entry?.slug, entry?.summary, entry?.title, heroImage, publicPath, publicSlug, seoTitle, summary, tags, title]
  )

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

  const insertBodySnippet = (snippet: string) => {
    const textarea = bodyTextareaRef.current
    const current = bodyMarkdown
    if (!textarea) {
      setBodyMarkdown((prev) => `${prev}${prev.trim() ? '\n\n' : ''}${snippet}`)
      return
    }

    const start = textarea.selectionStart ?? current.length
    const end = textarea.selectionEnd ?? current.length
    const before = current.slice(0, start)
    const after = current.slice(end)
    const needsLeadingBreak = before.trim().length > 0 && !before.endsWith('\n\n')
    const needsTrailingBreak = after.trim().length > 0 && !after.startsWith('\n\n')
    const insert = `${needsLeadingBreak ? '\n\n' : ''}${snippet}${needsTrailingBreak ? '\n\n' : ''}`
    const nextValue = `${before}${insert}${after}`
    setBodyMarkdown(nextValue)

    window.requestAnimationFrame(() => {
      const nextPos = before.length + insert.length
      textarea.focus()
      textarea.setSelectionRange(nextPos, nextPos)
    })
  }

  const uploadImageAsset = async (file: File, variant: 'inline' | 'full') => {
    const formData = new FormData()
    formData.set('file', file)
    formData.set('variant', variant)
    formData.set('slug', publicSlug || 'draft')

    const res = await fetch('/api/editorial/upload-image', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok || typeof data.url !== 'string') {
      throw new Error(data.error || 'Image upload failed.')
    }

    return data.url
  }

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setUploadState('loading')
    setUploadMessage('Optimizing and uploading image...')

    try {
      const alt = window.prompt('Alt text (recommended for accessibility)', baseFilename(file.name).replaceAll('-', ' ')) || ''
      const caption = window.prompt('Caption (optional)', '') || ''
      const inlineFile = await createInlineImageVariant(file)
      const fullUrlPromise = uploadImageAsset(file, 'full')
      const inlineUrlPromise = inlineFile === file ? fullUrlPromise : uploadImageAsset(inlineFile, 'inline')
      const [fullUrl, inlineUrl] = await Promise.all([fullUrlPromise, inlineUrlPromise])

      insertBodySnippet(
        buildUploadedImageSnippet({
          alt,
          caption,
          displaySrc: inlineUrl,
          fullSrc: fullUrl,
        })
      )

      setUploadState('success')
      setUploadMessage('Image uploaded and inserted. Click-to-enlarge will use the full-resolution source.')
    } catch (error) {
      setUploadState('error')
      setUploadMessage(error instanceof Error ? error.message : 'Image upload failed.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
      <section className="rounded-2xl bg-natural-50 p-8 dark:border dark:border-border dark:bg-surface">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-accent">Private</p>
            <h1 className="text-3xl font-serif font-bold text-fg">
              {entry?.id ? 'Edit Mendpress Entry' : 'New Mendpress Entry'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Simple markdown is supported: blank lines create paragraphs, <code>##</code> creates a section heading, <code>-</code> creates bullets, <code>[text](url)</code> creates a link, and <code>![alt](image-url "caption")</code> inserts an image inside the article flow.
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
                    {editorialTypeAdminLabel(option)}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted">{editorialTypeAdminHint(editorialType)}</p>
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
            <div className="mb-3 flex flex-wrap gap-3 text-xs">
              {imageUploadEnabled ? (
                <>
                  <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => uploadInputRef.current?.click()}
                    disabled={uploadState === 'loading'}
                    className="rounded-full border border-border px-3 py-1 text-fg transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploadState === 'loading' ? 'Uploading image...' : 'Upload image'}
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => insertBodySnippet('![Alt text](https://example.com/image.jpg "Optional caption")')}
                className="rounded-full border border-border px-3 py-1 text-fg transition-colors hover:border-accent"
              >
                Insert image block
              </button>
              <button
                type="button"
                onClick={() =>
                  insertBodySnippet(
                    '![Artwork title](https://example.com/artwork.jpg "Artwork title, year")\n\nA short paragraph that responds to the image.'
                  )
                }
                className="rounded-full border border-border px-3 py-1 text-fg transition-colors hover:border-accent"
              >
                Insert image + text
              </button>
            </div>
            <textarea
              ref={bodyTextareaRef}
              rows={20}
              value={bodyMarkdown}
              onChange={(e) => setBodyMarkdown(e.target.value)}
              className={`${CONTRAST_FORM_CONTROL_CLASS} font-mono text-sm leading-7`}
            />
            <div className="mt-2 space-y-1 text-xs text-muted">
              <p>Use one image block per paragraph flow for photo essays, artwork notes, and visual narrative sequences.</p>
              <p>
                {imageUploadEnabled
                  ? (
                    <>
                      Upload image inserts optimized reading size plus zoom source. You can also write it manually as <code>![Alt text](https://example.com/image.jpg "Caption")&#123;zoom=https://example.com/full.jpg&#125;</code>.
                    </>
                  )
                  : (
                    <>
                      Image upload is not configured in this environment yet. Use manual image markdown such as <code>![Alt text](https://example.com/image.jpg "Caption")</code> or <code>![Alt text](https://example.com/image.jpg "Caption")&#123;zoom=https://example.com/full.jpg&#125;</code> until Vercel Blob is enabled.
                    </>
                  )}
              </p>
              {uploadMessage ? (
                <p className={uploadState === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}>{uploadMessage}</p>
              ) : null}
            </div>
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
              <p className="mt-2 text-xs text-muted">
                Use this for the article cover/preview image. Inline body images should go in the main body field above.
              </p>
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
            Pin this entry to the top of Mendpress lists
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

        {entryStatus === 'published' && publicPath ? (
          <LinkedInPackPanel source={linkedInSource} />
        ) : null}

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
          <p className="mt-3 text-xs text-muted">
            Current public section: <span className="font-medium text-fg">{mendpressSectionLabel(editorialType)}</span>
          </p>
        </section>
      </aside>
    </div>
  )
}
