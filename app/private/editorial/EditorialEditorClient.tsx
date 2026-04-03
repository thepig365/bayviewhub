'use client'

import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'
import { LinkedInPackPanel } from '@/components/editorial/LinkedInPackPanel'
import type { EditorialEntry, EditorialMode, EditorialStatus, EditorialType } from '@/lib/editorial'
import {
  editorialAbsoluteUrlFromPath,
  editorialTypeAdminHint,
  editorialTypeAdminLabel,
  inferEditorialMode,
  isAudioFirstEditorialType,
  mendpressSectionLabel,
  sanitizeEditorialSpeakers,
  sanitizeEditorialTags,
  sanitizeEditorialSlug,
} from '@/lib/editorial'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'

type Props = {
  entry?: EditorialEntry | null
  imageUploadEnabled?: boolean
  audioUploadEnabled?: boolean
}

type UploadStatus = 'idle' | 'loading' | 'success' | 'error'
type AssistStatus = 'idle' | 'loading' | 'placeholder_ready' | 'ready'

const INLINE_MAX_DIMENSION = 1800
const SUPPORTED_AUDIO_COPY = 'MP3, M4A, WAV, OGG, or WebM up to 150 MB'
const FIELD_BASE_CLASS = `${CONTRAST_FORM_CONTROL_CLASS} text-base`
const WRITING_TEXTAREA_CLASS = `${CONTRAST_FORM_CONTROL_CLASS} text-base leading-8`

const MODE_OPTIONS: Array<{
  id: EditorialMode
  label: string
  hint: string
}> = [
  {
    id: 'written',
    label: 'Written piece',
    hint: 'Editorials, essays, conversations, interviews, field notes, and profiles.',
  },
  {
    id: 'audio',
    label: 'Audio piece',
    hint: 'Audio essays and podcast-style episodes with transcript and companion text.',
  },
  {
    id: 'hybrid',
    label: 'Hybrid piece',
    hint: 'Text-led pieces with a top audio player or embedded audio blocks in the body flow.',
  },
]

const MODE_TYPE_OPTIONS: Record<EditorialMode, EditorialType[]> = {
  written: ['editorial', 'essay', 'conversation', 'interview', 'field_note', 'profile'],
  audio: ['audio_essay', 'podcast_episode'],
  hybrid: ['editorial', 'essay', 'conversation', 'interview', 'field_note', 'profile'],
}

function baseFilename(value: string): string {
  return (
    value
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'asset'
  )
}

function escapeSnippetText(value: string): string {
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
  const safeAlt = escapeSnippetText(alt) || 'Editorial image'
  const safeCaption = escapeSnippetText(caption)
  const captionPart = safeCaption ? ` "${safeCaption}"` : ''
  const zoomPart = fullSrc && fullSrc !== displaySrc ? `{zoom=${fullSrc}}` : ''
  return `![${safeAlt}](${displaySrc}${captionPart})${zoomPart}`
}

function buildUploadedAudioSnippet({
  title,
  src,
  note,
  speakers,
  durationSeconds,
}: {
  title: string
  src: string
  note: string
  speakers?: string
  durationSeconds?: number | null
}) {
  const safeTitle = escapeSnippetText(title) || 'Audio'
  const safeNote = escapeSnippetText(note)
  const safeSpeakers = escapeSnippetText(speakers || '')
  const notePart = safeNote ? ` "${safeNote}"` : ''
  const speakerPart = safeSpeakers ? `{speaker=${safeSpeakers}}` : ''
  const durationPart =
    typeof durationSeconds === 'number' && Number.isFinite(durationSeconds) && durationSeconds > 0
      ? `{duration=${Math.round(durationSeconds)}}`
      : ''
  return `!audio[${safeTitle}](${src}${notePart})${speakerPart}${durationPart}`
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

async function getAudioDuration(file: File): Promise<number | null> {
  const objectUrl = URL.createObjectURL(file)

  try {
    return await new Promise<number | null>((resolve) => {
      const audio = document.createElement('audio')
      audio.preload = 'metadata'
      audio.onloadedmetadata = () => {
        resolve(Number.isFinite(audio.duration) ? Math.round(audio.duration) : null)
      }
      audio.onerror = () => resolve(null)
      audio.src = objectUrl
    })
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
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

function formatDuration(value: number | null): string | null {
  if (!value || value <= 0) return null
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  if (hours > 0) return `${hours}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
  return `${minutes}:${`${seconds}`.padStart(2, '0')}`
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function buildTranscriptPlaceholder({
  title,
  durationLabel,
}: {
  title: string
  durationLabel?: string | null
}) {
  return [
    '## Transcript draft',
    '',
    `A transcript placeholder was prepared for "${title || 'this piece'}".`,
    durationLabel ? `Detected duration: ${durationLabel}.` : '',
    '',
    'Automatic speech-to-text is not connected in this environment yet.',
    'Replace this placeholder with the processed transcript when it becomes available.',
  ]
    .filter(Boolean)
    .join('\n')
}

function buildShowNotesDraft({
  title,
  summary,
  speakers,
}: {
  title: string
  summary: string
  speakers: string[]
}) {
  return [
    '## Show notes',
    '',
    summary || `A short introduction to ${title || 'this audio piece'}.`,
    '',
    '## In this piece',
    '- Opening frame and context',
    '- Main themes and conversation turns',
    '- Closing note or invitation',
    speakers.length ? '' : null,
    speakers.length ? `## Speakers\n- ${speakers.join('\n- ')}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildCompanionDraft({
  title,
  summary,
}: {
  title: string
  summary: string
}) {
  return [
    summary || `${title || 'This piece'} is now available to listen to on Mendpress.`,
    '',
    'This companion draft was prepared after upload as a starting point for editorial refinement.',
    'Shape it into a stronger opening note, framing paragraph, or written companion to the listening experience.',
  ].join('\n')
}

function simplifyUploadError(message: string, kind: 'audio' | 'image'): string {
  if (message.includes('BLOB_READ_WRITE_TOKEN') || message.includes('Configure Vercel Blob')) {
    return kind === 'audio'
      ? 'Audio upload is not available right now.'
      : 'Image upload is not available right now.'
  }

  return message
}

export function EditorialEditorClient({
  entry,
  imageUploadEnabled = false,
  audioUploadEnabled = false,
}: Props) {
  const bodyTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const imageUploadInputRef = useRef<HTMLInputElement | null>(null)
  const audioUploadInputRef = useRef<HTMLInputElement | null>(null)
  const bodyAudioUploadInputRef = useRef<HTMLInputElement | null>(null)

  const initialMode = entry ? inferEditorialMode(entry) : 'written'
  const [editorialMode, setEditorialMode] = useState<EditorialMode>(initialMode)
  const [title, setTitle] = useState(entry?.title || '')
  const [slug, setSlug] = useState(entry?.slug || '')
  const [summary, setSummary] = useState(entry?.summary || '')
  const [bodyMarkdown, setBodyMarkdown] = useState(entry?.bodyMarkdown || '')
  const [editorialType, setEditorialType] = useState<EditorialType>(
    entry?.editorialType || (initialMode === 'audio' ? 'audio_essay' : 'editorial')
  )
  const [publishedAt, setPublishedAt] = useState(toDateTimeLocal(entry?.publishedAt || null))
  const [heroImage, setHeroImage] = useState(entry?.heroImage || '')
  const [byline, setByline] = useState(entry?.byline || '')
  const [tags, setTags] = useState((entry?.tags || []).join(', '))
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(entry?.primaryCtaLabel || '')
  const [primaryCtaHref, setPrimaryCtaHref] = useState(entry?.primaryCtaHref || '')
  const [seoTitle, setSeoTitle] = useState(entry?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(entry?.seoDescription || '')
  const [pinned, setPinned] = useState(Boolean(entry?.pinned))
  const [audioUrl, setAudioUrl] = useState(entry?.audioUrl || '')
  const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(entry?.audioDurationSeconds || null)
  const [transcriptMarkdown, setTranscriptMarkdown] = useState(entry?.transcriptMarkdown || '')
  const [showNotesMarkdown, setShowNotesMarkdown] = useState(entry?.showNotesMarkdown || '')
  const [speakers, setSpeakers] = useState((entry?.speakers || []).join(', '))
  const [entryStatus, setEntryStatus] = useState<EditorialStatus>(entry?.status || 'draft')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [imageUploadState, setImageUploadState] = useState<UploadStatus>('idle')
  const [imageUploadMessage, setImageUploadMessage] = useState('')
  const [audioUploadState, setAudioUploadState] = useState<UploadStatus>('idle')
  const [audioUploadMessage, setAudioUploadMessage] = useState('')
  const [bodyAudioUploadState, setBodyAudioUploadState] = useState<UploadStatus>('idle')
  const [bodyAudioUploadMessage, setBodyAudioUploadMessage] = useState('')
  const [audioDragActive, setAudioDragActive] = useState(false)
  const [assistStatus, setAssistStatus] = useState<{
    transcript: AssistStatus
    showNotes: AssistStatus
    companion: AssistStatus
  }>({
    transcript: entry?.transcriptMarkdown ? 'ready' : 'idle',
    showNotes: entry?.showNotesMarkdown ? 'ready' : 'idle',
    companion: entry?.bodyMarkdown ? 'ready' : 'idle',
  })

  const publicSlug = useMemo(() => sanitizeEditorialSlug(slug, title), [slug, title])
  const publicPath = useMemo(() => (publicSlug ? `/mendpress/${publicSlug}` : entry?.path || ''), [entry?.path, publicSlug])
  const currentTypeOptions = useMemo(() => {
    const options = new Set<EditorialType>(MODE_TYPE_OPTIONS[editorialMode])
    if (entry?.editorialType) {
      options.add(entry.editorialType)
    }
    options.add(editorialType)
    return Array.from(options)
  }, [editorialMode, editorialType, entry?.editorialType])
  const hasAudioSupport = editorialMode !== 'written'
  const audioReady = Boolean(audioUrl)
  const audioUploadPending = editorialMode === 'audio' && !audioReady
  const revealAudioFields = editorialMode !== 'audio' || audioReady
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
    [
      byline,
      editorialType,
      entry?.byline,
      entry?.heroImage,
      entry?.path,
      entry?.seoTitle,
      entry?.slug,
      entry?.summary,
      entry?.title,
      heroImage,
      publicPath,
      publicSlug,
      seoTitle,
      summary,
      tags,
      title,
    ]
  )

  const handleModeChange = (nextMode: EditorialMode) => {
    setEditorialMode(nextMode)
    if (!MODE_TYPE_OPTIONS[nextMode].includes(editorialType)) {
      setEditorialType(MODE_TYPE_OPTIONS[nextMode][0])
    }
  }

  const canChoosePrimaryAudio = audioUploadEnabled && audioUploadState !== 'loading'

  const openPrimaryAudioPicker = () => {
    if (!canChoosePrimaryAudio) return
    audioUploadInputRef.current?.click()
  }

  const runAudioAssistWorkflow = async ({
    file,
    duration,
  }: {
    file: File
    duration: number | null
  }) => {
    const detectedSpeakers = sanitizeEditorialSpeakers(speakers)
    const durationLabel = formatDuration(duration)
    const fallbackTitle = title.trim() || baseFilename(file.name).replaceAll('-', ' ')

    if (!transcriptMarkdown.trim()) {
      setAssistStatus((current) => ({ ...current, transcript: 'loading' }))
      await wait(500)
      setTranscriptMarkdown(buildTranscriptPlaceholder({ title: fallbackTitle, durationLabel }))
      setAssistStatus((current) => ({ ...current, transcript: 'placeholder_ready' }))
    }

    if (!showNotesMarkdown.trim()) {
      setAssistStatus((current) => ({ ...current, showNotes: 'loading' }))
      await wait(450)
      setShowNotesMarkdown(
        buildShowNotesDraft({
          title: fallbackTitle,
          summary: summary.trim(),
          speakers: detectedSpeakers,
        })
      )
      setAssistStatus((current) => ({ ...current, showNotes: 'placeholder_ready' }))
    }

    if (!bodyMarkdown.trim()) {
      setAssistStatus((current) => ({ ...current, companion: 'loading' }))
      await wait(400)
      setBodyMarkdown(
        buildCompanionDraft({
          title: fallbackTitle,
          summary: summary.trim(),
        })
      )
      setAssistStatus((current) => ({ ...current, companion: 'placeholder_ready' }))
    }
  }

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
          editorialMode,
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
          audioUrl,
          audioDurationSeconds,
          transcriptMarkdown,
          showNotesMarkdown,
          speakers,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setStatus('error')
        setMessage(data.error || 'Failed to save piece.')
        return
      }

      setStatus('success')
      setEntryStatus(desiredStatus)
      setMessage(desiredStatus === 'published' ? 'Piece published.' : 'Draft saved.')

      if (!entry?.id && data.id) {
        window.location.href = `/private/editorial/${data.id}`
        return
      }
    } catch {
      setStatus('error')
      setMessage('Failed to save piece.')
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

    return data.url as string
  }

  const uploadAudioAsset = async (file: File) => {
    const formData = new FormData()
    formData.set('file', file)
    formData.set('slug', publicSlug || 'draft')

    const res = await fetch('/api/editorial/upload-audio', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok || typeof data.url !== 'string') {
      throw new Error(data.error || 'Audio upload failed.')
    }

    return data.url as string
  }

  const startPrimaryAudioUpload = async (file: File) => {
    setAudioUploadState('loading')
    setAudioUploadMessage('Uploading audio and preparing draft fields...')

    try {
      const [url, duration] = await Promise.all([uploadAudioAsset(file), getAudioDuration(file)])
      setAudioUrl(url)
      setAudioDurationSeconds(duration)
      await runAudioAssistWorkflow({ file, duration })
      setAudioUploadState('success')
      setAudioUploadMessage('Audio uploaded. Draft transcript and editorial fields are ready to refine.')
    } catch (error) {
      setAudioUploadState('error')
      setAudioUploadMessage(
        simplifyUploadError(error instanceof Error ? error.message : 'Audio upload failed.', 'audio')
      )
    }
  }

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setImageUploadState('loading')
    setImageUploadMessage('Optimizing and uploading image...')

    try {
      const alt =
        window.prompt(
          'Alt text (recommended for accessibility)',
          baseFilename(file.name).replaceAll('-', ' ')
        ) || ''
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

      setImageUploadState('success')
      setImageUploadMessage('Image uploaded and inserted. Click-to-enlarge will use the full-resolution source.')
    } catch (error) {
      setImageUploadState('error')
      setImageUploadMessage(
        simplifyUploadError(error instanceof Error ? error.message : 'Image upload failed.', 'image')
      )
    }
  }

  const handleUploadPrimaryAudio = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    await startPrimaryAudioUpload(file)
  }

  const handleInsertAudioBlock = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setBodyAudioUploadState('loading')
    setBodyAudioUploadMessage('Uploading audio block...')

    try {
      const [url, duration] = await Promise.all([uploadAudioAsset(file), getAudioDuration(file)])
      const clipTitle = window.prompt('Audio block title', baseFilename(file.name).replaceAll('-', ' ')) || 'Audio'
      const note = window.prompt('Companion note / caption (optional)', '') || ''
      const speaker = window.prompt('Speaker or guest (optional)', sanitizeEditorialSpeakers(speakers).join(', ')) || ''
      insertBodySnippet(
        buildUploadedAudioSnippet({
          title: clipTitle,
          src: url,
          note,
          speakers: speaker,
          durationSeconds: duration,
        })
      )
      setBodyAudioUploadState('success')
      setBodyAudioUploadMessage('Audio block inserted into the body flow.')
    } catch (error) {
      setBodyAudioUploadState('error')
      setBodyAudioUploadMessage(
        simplifyUploadError(error instanceof Error ? error.message : 'Audio block upload failed.', 'audio')
      )
    }
  }

  const handleAudioDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setAudioDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    await startPrimaryAudioUpload(file)
  }

  const assistantTone =
    assistStatus.transcript === 'loading' ||
    assistStatus.showNotes === 'loading' ||
    assistStatus.companion === 'loading'
      ? 'System is preparing draft editorial materials from the uploaded audio.'
      : 'Draft materials are ready for editorial refinement.'

  const renderAssistStatus = (
    value: AssistStatus,
    labels: { loading: string; ready: string; placeholder: string }
  ) => {
    if (value === 'loading') return <span className="text-accent">{labels.loading}</span>
    if (value === 'placeholder_ready') return <span className="text-muted">{labels.placeholder}</span>
    if (value === 'ready') return <span className="text-muted">{labels.ready}</span>
    return null
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
      <section className="rounded-2xl bg-natural-50 p-8 dark:border dark:border-border dark:bg-surface">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-accent">Private</p>
            <h1 className="text-3xl font-serif font-bold text-fg">
              {entry?.id ? 'Edit piece' : 'New piece'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Build the piece in the mode that matches how it will be experienced. Written stays text-first. Audio begins with upload, then refinement.
            </p>
          </div>
          <button type="button" onClick={logout} className="text-sm text-muted transition-colors hover:text-fg">
            Log out
          </button>
        </div>

        {!entry?.id ? (
          <section className="mb-8 rounded-2xl border border-border bg-white/80 p-5 dark:border-border dark:bg-neutral-950/40">
            <h2 className="text-xl font-serif font-semibold text-fg">Choose a publishing mode</h2>
            <p className="mt-2 text-sm text-muted">
              Start with the mode that matches how the piece will be read or heard. You can still change the editorial type below.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {MODE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleModeChange(option.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                    editorialMode === option.id
                      ? 'border-accent bg-accent/5 text-fg'
                      : 'border-border bg-white text-fg hover:border-accent/50 dark:bg-neutral-950'
                  }`}
                >
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="mt-2 text-xs leading-6 text-muted">{option.hint}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={FIELD_BASE_CLASS} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-fg">Slug (optional)</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={FIELD_BASE_CLASS}
                placeholder="in-the-age-of-ai"
              />
              <p className="mt-2 text-xs text-muted">Leave this blank if you want the system to derive it from the title.</p>
            </div>
            {revealAudioFields ? (
              <div>
              <label className="mb-2 block text-sm font-medium text-fg">Editorial type</label>
              <select
                value={editorialType}
                onChange={(e) => setEditorialType(e.target.value as EditorialType)}
                className={FIELD_BASE_CLASS}
              >
                {currentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {editorialTypeAdminLabel(option)}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted">{editorialTypeAdminHint(editorialType)}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted dark:border-border">
                Upload the audio first and the publishing setup will open underneath.
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Summary / dek</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={WRITING_TEXTAREA_CLASS}
            />
          </div>

          {hasAudioSupport ? (
            <section className="rounded-2xl border border-border bg-white/80 p-5 dark:border-border dark:bg-neutral-950/40">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-fg">
                    {editorialMode === 'audio' ? 'Upload the audio first' : 'Add the main audio'}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {editorialMode === 'audio'
                      ? 'Begin with the recording. Mendpress will open the editing workspace after the upload lands.'
                      : 'Attach a narrated version or companion audio without interrupting the writing flow.'}
                  </p>
                </div>
                {audioReady ? (
                  <button
                    type="button"
                    onClick={() => audioUploadInputRef.current?.click()}
                    className="rounded-full border border-border px-3 py-1 text-sm text-fg transition-colors hover:border-accent"
                  >
                    Replace audio
                  </button>
                ) : null}
              </div>

              <input
                ref={audioUploadInputRef}
                type="file"
                accept="audio/*"
                onChange={handleUploadPrimaryAudio}
                className="hidden"
              />

              <div
                role={canChoosePrimaryAudio ? 'button' : undefined}
                tabIndex={canChoosePrimaryAudio ? 0 : -1}
                aria-disabled={!canChoosePrimaryAudio}
                onClick={openPrimaryAudioPicker}
                onKeyDown={(event) => {
                  if (!canChoosePrimaryAudio) return
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openPrimaryAudioPicker()
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  if (canChoosePrimaryAudio) setAudioDragActive(true)
                }}
                onDragLeave={() => setAudioDragActive(false)}
                onDrop={handleAudioDrop}
                className={`mt-5 block rounded-3xl border border-dashed px-6 py-10 text-center transition-colors ${
                  audioDragActive ? 'border-accent bg-accent/5' : 'border-border bg-natural-50 dark:bg-surface'
                } ${canChoosePrimaryAudio ? 'cursor-pointer hover:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40' : 'cursor-default opacity-80'}`}
              >
                <div className="mx-auto max-w-2xl">
                  <p className="text-xl font-serif font-semibold text-fg">
                    {audioReady ? 'Audio is attached' : 'Drop an audio file here'}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {audioReady
                      ? 'You can replace the current file at any time and keep refining the editorial draft.'
                      : 'Choose the recording first. The system will detect duration and prepare transcript, show-notes, and companion-text drafts.'}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">{SUPPORTED_AUDIO_COPY}</p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      openPrimaryAudioPicker()
                    }}
                    disabled={!canChoosePrimaryAudio}
                    className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm ${
                      canChoosePrimaryAudio
                        ? 'bg-accent font-medium text-white'
                        : 'border border-border text-fg'
                    }`}
                  >
                    {audioUploadState === 'loading'
                      ? 'Uploading…'
                      : audioReady
                        ? 'Choose replacement file'
                        : audioUploadEnabled
                          ? 'Choose audio file'
                          : 'Audio uploads unavailable'}
                  </button>
                </div>
              </div>

              {audioUrl ? (
                <div className="mt-5 rounded-2xl border border-border bg-natural-50 p-4 dark:border-border dark:bg-surface">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-fg">Audio preview</p>
                    {formatDuration(audioDurationSeconds) ? (
                      <p className="text-xs text-muted">Detected duration: {formatDuration(audioDurationSeconds)}</p>
                    ) : null}
                  </div>
                  <audio controls src={audioUrl} className="mt-3 w-full" />
                </div>
              ) : null}

              {audioUploadMessage ? (
                <p className={`mt-3 text-sm ${audioUploadState === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}`}>
                  {audioUploadMessage}
                </p>
              ) : null}

              {audioReady ? (
                <div className="mt-5 rounded-2xl border border-border bg-white p-4 dark:border-border dark:bg-neutral-950">
                  <p className="text-sm font-medium text-fg">Processing</p>
                  <p className="mt-2 text-sm text-muted">{assistantTone}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-natural-50 px-4 py-3 text-sm dark:bg-surface">
                      <p className="font-medium text-fg">Transcript</p>
                      <p className="mt-1 text-xs leading-6">
                        {renderAssistStatus(assistStatus.transcript, {
                          loading: 'Generating transcript…',
                          placeholder: 'Placeholder draft ready',
                          ready: 'Ready',
                        })}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-natural-50 px-4 py-3 text-sm dark:bg-surface">
                      <p className="font-medium text-fg">Show notes</p>
                      <p className="mt-1 text-xs leading-6">
                        {renderAssistStatus(assistStatus.showNotes, {
                          loading: 'Drafting show notes…',
                          placeholder: 'Placeholder draft ready',
                          ready: 'Ready',
                        })}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-natural-50 px-4 py-3 text-sm dark:bg-surface">
                      <p className="font-medium text-fg">Companion text</p>
                      <p className="mt-1 text-xs leading-6">
                        {renderAssistStatus(assistStatus.companion, {
                          loading: 'Drafting companion text…',
                          placeholder: 'Placeholder draft ready',
                          ready: 'Ready',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          {revealAudioFields ? (
            <>
              {editorialMode === 'audio' ? (
                <>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="block text-sm font-medium text-fg">Transcript</label>
                      <span className="text-xs text-muted">
                        {renderAssistStatus(assistStatus.transcript, {
                          loading: 'Generating transcript…',
                          placeholder: 'Placeholder draft',
                          ready: 'Ready',
                        })}
                      </span>
                    </div>
                    <textarea
                      rows={12}
                      value={transcriptMarkdown}
                      onChange={(e) => {
                        setTranscriptMarkdown(e.target.value)
                        if (e.target.value.trim()) {
                          setAssistStatus((current) => ({ ...current, transcript: 'ready' }))
                        }
                      }}
                      className={WRITING_TEXTAREA_CLASS}
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="block text-sm font-medium text-fg">Show notes</label>
                      <span className="text-xs text-muted">
                        {renderAssistStatus(assistStatus.showNotes, {
                          loading: 'Drafting show notes…',
                          placeholder: 'Placeholder draft',
                          ready: 'Ready',
                        })}
                      </span>
                    </div>
                    <textarea
                      rows={10}
                      value={showNotesMarkdown}
                      onChange={(e) => {
                        setShowNotesMarkdown(e.target.value)
                        if (e.target.value.trim()) {
                          setAssistStatus((current) => ({ ...current, showNotes: 'ready' }))
                        }
                      }}
                      className={WRITING_TEXTAREA_CLASS}
                    />
                  </div>
                </>
              ) : null}

              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-fg">
                    {editorialMode === 'audio' ? 'Companion text' : 'Body'}
                  </label>
                  {(editorialMode === 'hybrid' || editorialMode === 'written') ? (
                    <div className="flex flex-wrap gap-3 text-sm">
                      {imageUploadEnabled ? (
                        <>
                          <input
                            ref={imageUploadInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleUploadImage}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imageUploadInputRef.current?.click()}
                            disabled={imageUploadState === 'loading'}
                            className="rounded-full border border-border px-3 py-1 text-fg transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {imageUploadState === 'loading' ? 'Adding image…' : 'Add image'}
                          </button>
                        </>
                      ) : null}
                      {audioUploadEnabled ? (
                        <>
                          <input
                            ref={bodyAudioUploadInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleInsertAudioBlock}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => bodyAudioUploadInputRef.current?.click()}
                            disabled={bodyAudioUploadState === 'loading'}
                            className="rounded-full border border-border px-3 py-1 text-fg transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {bodyAudioUploadState === 'loading' ? 'Adding audio…' : 'Add audio'}
                          </button>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <span className="text-xs text-muted">
                      {renderAssistStatus(assistStatus.companion, {
                        loading: 'Drafting companion text…',
                        placeholder: 'Placeholder draft',
                        ready: 'Ready',
                      })}
                    </span>
                  )}
                </div>
                <textarea
                  ref={bodyTextareaRef}
                  rows={editorialMode === 'audio' ? 12 : 20}
                  value={bodyMarkdown}
                  onChange={(e) => {
                    setBodyMarkdown(e.target.value)
                    if (editorialMode === 'audio' && e.target.value.trim()) {
                      setAssistStatus((current) => ({ ...current, companion: 'ready' }))
                    }
                  }}
                  className={WRITING_TEXTAREA_CLASS}
                />
                {imageUploadMessage ? (
                  <p className={`mt-2 text-sm ${imageUploadState === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}`}>
                    {imageUploadMessage}
                  </p>
                ) : null}
                {bodyAudioUploadMessage ? (
                  <p className={`mt-2 text-sm ${bodyAudioUploadState === 'error' ? 'text-red-600 dark:text-red-400' : 'text-accent'}`}>
                    {bodyAudioUploadMessage}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {hasAudioSupport ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-fg">Speakers / guests</label>
                    <input
                      value={speakers}
                      onChange={(e) => setSpeakers(e.target.value)}
                      className={FIELD_BASE_CLASS}
                      placeholder="Leon Zhang, Guest Name"
                    />
                  </div>
                ) : null}
                <div>
                  <label className="mb-2 block text-sm font-medium text-fg">
                    {hasAudioSupport ? 'Cover / hero image URL' : 'Hero image URL'}
                  </label>
                  <input
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className={FIELD_BASE_CLASS}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-fg">Byline</label>
                  <input
                    value={byline}
                    onChange={(e) => setByline(e.target.value)}
                    className={FIELD_BASE_CLASS}
                    placeholder="Mendpress Editorial Desk"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-fg">Tags</label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className={FIELD_BASE_CLASS}
                    placeholder="art, listening, place"
                  />
                </div>
              </div>

              <details className="rounded-2xl border border-border bg-white/80 p-5 dark:border-border dark:bg-neutral-950/40">
                <summary className="cursor-pointer text-sm font-medium text-fg">Advanced</summary>
                <div className="mt-4 space-y-5">
                  {hasAudioSupport ? (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-fg">Audio file URL</label>
                      <input
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                        className={FIELD_BASE_CLASS}
                        placeholder="https://..."
                      />
                    </div>
                  ) : null}

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-fg">Primary CTA label</label>
                      <input
                        value={primaryCtaLabel}
                        onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                        className={FIELD_BASE_CLASS}
                        placeholder={isAudioFirstEditorialType(editorialType) ? 'Listen on Mendpress' : 'Read on Mendpress'}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-fg">Primary CTA href</label>
                      <input
                        value={primaryCtaHref}
                        onChange={(e) => setPrimaryCtaHref(e.target.value)}
                        className={FIELD_BASE_CLASS}
                        placeholder="/newsletter or https://..."
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
                        className={FIELD_BASE_CLASS}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-fg">SEO title</label>
                      <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={FIELD_BASE_CLASS} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-fg">SEO description</label>
                    <input
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className={FIELD_BASE_CLASS}
                    />
                  </div>

                  <label className="flex items-center gap-3 text-sm text-fg">
                    <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="h-4 w-4" />
                    Pin this piece to the top of Mendpress lists
                  </label>

                  <div className="rounded-2xl border border-border bg-natural-50 p-4 text-sm dark:border-border dark:bg-surface">
                    <p className="font-medium text-fg">Advanced body helpers</p>
                    <p className="mt-2 text-muted">These are optional fallbacks for direct embeds or hand-edited markdown.</p>
                    <div className="mt-3 space-y-2 text-xs text-muted">
                      <p><code>![Alt text](https://example.com/image.jpg "Caption")&#123;zoom=https://example.com/full.jpg&#125;</code></p>
                      <p><code>!audio[Title](https://example.com/audio.mp3 "Optional note")&#123;speaker=Name&#125;&#123;duration=245&#125;</code></p>
                    </div>
                  </div>
                </div>
              </details>
            </>
          ) : null}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface">
          <h2 className="text-xl font-serif font-bold text-fg">Actions</h2>
          <p className="mt-2 text-sm text-muted">
            Current state: <span className="font-medium text-fg">{entryStatus}</span>
          </p>
          <div className="mt-2 text-xs text-muted">
            <p>Mode: <span className="font-medium text-fg">{MODE_OPTIONS.find((option) => option.id === editorialMode)?.label}</span></p>
            <p>Public section: <span className="font-medium text-fg">{mendpressSectionLabel(editorialType)}</span></p>
          </div>
          {audioUploadPending ? (
            <p className="mt-5 text-sm leading-7 text-muted">
              Upload the audio first. Once the system has prepared the listening workspace, draft and publish controls will appear here.
            </p>
          ) : (
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
          )}
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
                    Open live piece
                  </Link>
                ) : (
                  <p className="text-muted">Publish this piece before opening the live page.</p>
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
        </section>
      </aside>
    </div>
  )
}
