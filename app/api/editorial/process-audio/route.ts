import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  editorialUrl,
  getEditorialEntryByIdForAdmin,
  sanitizeEditorialBody,
  sanitizeEditorialSlug,
  sanitizeEditorialSpeakers,
  sanitizeEditorialText,
  sanitizeEditorialTags,
  type EditorialType,
  sanitizeEditorialType,
} from '@/lib/editorial'
import { suggestedEditorialTagsForType } from '@/lib/editorial-tags'
import {
  PRIMARY_AUDIO_TRANSCRIPTION_MAX_BYTES,
  primaryAudioTranscriptionLimitMessage,
} from '@/lib/editorial-audio'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'
export const maxDuration = 300

const OPENAI_TRANSCRIPTION_MODEL = 'whisper-1'
const OPENAI_DRAFT_MODEL = 'gpt-4o-mini'
const PROCESSING_BUDGET_MS = 255_000
const PROCESSING_BUFFER_MS = 20_000

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}

async function rejectIfUnauthorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

type AudioDraftRequest = {
  entryId?: string
  audioUrl?: string
  audioDurationSeconds?: number | string
  title?: string
  summary?: string
  editorialType?: string
  speakers?: string[] | string
  transcriptMarkdown?: string
  showNotesMarkdown?: string
  companionMarkdown?: string
  titleZh?: string
  summaryZh?: string
  bodyMarkdownZh?: string
  showNotesMarkdownZh?: string
  transcriptMarkdownZh?: string
}

type AudioMetadataDrafts = {
  title?: string
  titleZh?: string
  summary?: string
  summaryZh?: string
  tags?: string[]
  seoTitle?: string
  seoTitleZh?: string
  seoDescription?: string
  seoDescriptionZh?: string
  seoKeywords?: string[]
  speakers?: string[]
}

type ProcessingStepState = 'success' | 'failed' | 'skipped'
type ProcessingStepReport = {
  state: ProcessingStepState
  message: string
}
type ProcessingReport = {
  transcript: ProcessingStepReport
  showNotes: ProcessingStepReport
  companion: ProcessingStepReport
  metadata: ProcessingStepReport
  persistence: ProcessingStepReport
}

function sanitizeAudioUrl(value: unknown): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : ''
  } catch {
    return ''
  }
}

function sanitizeEntryId(value: unknown): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return /^[0-9a-f-]{36}$/i.test(trimmed) ? trimmed : ''
}

function sanitizeDurationSeconds(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.max(1, Math.round(value))
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed) && parsed > 0) {
      return Math.max(1, Math.round(parsed))
    }
  }
  return null
}

async function persistProcessingOutputs({
  entryId,
  audioUrl,
  audioDurationSeconds,
  transcriptMarkdown,
  showNotesMarkdown,
  companionMarkdown,
  transcriptMarkdownZh,
  showNotesMarkdownZh,
  companionMarkdownZh,
  metadata,
  existing,
}: {
  entryId: string
  audioUrl: string
  audioDurationSeconds: number | null
  transcriptMarkdown: string
  showNotesMarkdown: string
  companionMarkdown: string
  transcriptMarkdownZh: string
  showNotesMarkdownZh: string
  companionMarkdownZh: string
  metadata: AudioMetadataDrafts
  existing: AudioDraftRequest
}): Promise<ProcessingStepReport> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    return {
      state: 'failed',
      message:
        'Processing completed, but persistence could not run because Supabase server env is missing.',
    }
  }

  const entry = await getEditorialEntryByIdForAdmin(entryId)
  if (!entry) {
    return {
      state: 'failed',
      message: 'Processing completed, but the editorial entry could not be found for persistence.',
    }
  }

  const payload: Record<string, unknown> = {
    audio_url: audioUrl,
    updated_at: new Date().toISOString(),
  }

  if (audioDurationSeconds) {
    payload.audio_duration_seconds = audioDurationSeconds
  }
  if (transcriptMarkdown.trim()) {
    payload.transcript_markdown = transcriptMarkdown
  }
  if (!existing.transcriptMarkdownZh?.trim() && !entry.transcriptMarkdownZh && transcriptMarkdownZh.trim()) {
    payload.transcript_markdown_zh = transcriptMarkdownZh
  }
  if (!existing.showNotesMarkdown?.trim() && !entry.showNotesMarkdown && showNotesMarkdown.trim()) {
    payload.show_notes_markdown = showNotesMarkdown
  }
  if (!existing.showNotesMarkdownZh?.trim() && !entry.showNotesMarkdownZh && showNotesMarkdownZh.trim()) {
    payload.show_notes_markdown_zh = showNotesMarkdownZh
  }
  if (!existing.companionMarkdown?.trim() && !entry.bodyMarkdown && companionMarkdown.trim()) {
    payload.body_markdown = companionMarkdown
  }
  if (!existing.bodyMarkdownZh?.trim() && !entry.bodyMarkdownZh && companionMarkdownZh.trim()) {
    payload.body_markdown_zh = companionMarkdownZh
  }
  if (!existing.summary?.trim() && !entry.summary && metadata.summary?.trim()) {
    payload.summary = metadata.summary.trim()
  }
  if (!existing.summaryZh?.trim() && !entry.summaryZh && metadata.summaryZh?.trim()) {
    payload.summary_zh = metadata.summaryZh.trim()
  }
  if ((!entry.tags || !entry.tags.length) && metadata.tags?.length) {
    payload.tags = metadata.tags
  }
  if ((!entry.speakers || !entry.speakers.length) && metadata.speakers?.length) {
    payload.speakers = metadata.speakers
  }
  if (!entry.seoTitle && metadata.seoTitle?.trim()) {
    payload.seo_title = metadata.seoTitle.trim()
  }
  if (!entry.seoTitleZh && metadata.seoTitleZh?.trim()) {
    payload.seo_title_zh = metadata.seoTitleZh.trim()
  }
  if (!entry.seoDescription && metadata.seoDescription?.trim()) {
    payload.seo_description = metadata.seoDescription.trim()
  }
  if (!entry.seoDescriptionZh && metadata.seoDescriptionZh?.trim()) {
    payload.seo_description_zh = metadata.seoDescriptionZh.trim()
  }

  const { error } = await supabase.from('editorial_entries').update(payload).eq('id', entryId)
  if (error) {
    return {
      state: 'failed',
      message: `Processing completed, but persistence failed: ${error.message}`,
    }
  }

  return {
    state: 'success',
    message: 'Successful outputs were written back to the editorial entry.',
  }
}

function remainingProcessingTime(deadlineMs: number): number {
  return deadlineMs - Date.now()
}

function timeoutWithinBudget(deadlineMs: number, capMs: number, label: string): number {
  const remaining = remainingProcessingTime(deadlineMs) - PROCESSING_BUFFER_MS
  if (remaining <= 5_000) {
    throw new Error(`${label} was skipped because the server was too close to its execution limit.`)
  }
  return Math.min(capMs, remaining)
}

async function transcribeAudioFromUrl(audioUrl: string, apiKey: string, deadlineMs: number): Promise<string> {
  let audioResponse: Response
  try {
    audioResponse = await fetch(audioUrl, {
      signal: AbortSignal.timeout(timeoutWithinBudget(deadlineMs, 45_000, 'Audio fetch')),
    })
  } catch (error) {
    throw new Error(
      isAbortError(error)
        ? 'Fetching the uploaded audio took too long. Try again or upload a shorter recording.'
        : 'Could not fetch the uploaded audio for transcription.'
    )
  }
  if (!audioResponse.ok) {
    throw new Error('Could not fetch the uploaded audio for transcription.')
  }

  const audioBlob = await audioResponse.blob()
  if (!audioBlob.size) {
    throw new Error('Uploaded audio was empty.')
  }

  if (audioBlob.size > PRIMARY_AUDIO_TRANSCRIPTION_MAX_BYTES) {
    throw new Error(primaryAudioTranscriptionLimitMessage())
  }

  const file = new File([audioBlob], 'mendpress-audio-input', {
    type: audioBlob.type || 'audio/mpeg',
  })

  const formData = new FormData()
  formData.set('file', file)
  formData.set('model', OPENAI_TRANSCRIPTION_MODEL)
  formData.set('response_format', 'text')

  let transcriptionResponse: Response
  try {
    transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
      signal: AbortSignal.timeout(timeoutWithinBudget(deadlineMs, 150_000, 'Speech-to-text')),
    })
  } catch (error) {
    throw new Error(
      isAbortError(error)
        ? 'Speech-to-text took too long for this recording. Try again or upload a shorter file.'
        : 'Speech-to-text failed for this audio file.'
    )
  }

  if (!transcriptionResponse.ok) {
    const errorText = await transcriptionResponse.text().catch(() => '')
    throw new Error(
      errorText.includes('maximum content size')
        ? 'Audio transcription request exceeded the provider size limit.'
        : 'Speech-to-text failed for this audio file.'
    )
  }

  const transcriptText = (await transcriptionResponse.text()).trim()
  if (!transcriptText) {
    throw new Error('Speech-to-text returned an empty transcript.')
  }

  return transcriptText
}

async function draftEditorialMaterials({
  apiKey,
  title,
  summary,
  editorialType,
  transcript,
  speakers,
  deadlineMs,
}: {
  apiKey: string
  title: string
  summary: string
  editorialType: EditorialType
  transcript: string
  speakers: string[]
  deadlineMs: number
}) {
  let response: Response
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_DRAFT_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are writing for Mendpress at Bayview Hub. Produce restrained, editorial, human-sounding markdown and metadata in both English and Simplified Chinese. Avoid hype, AI-sounding filler, generic marketing language, and keyword stuffing. Return strict JSON only.',
          },
          {
            role: 'user',
            content: JSON.stringify({
              title,
              summary,
              editorialType,
              speakers,
              transcript,
              instructions: {
                showNotesMarkdown:
                  'Write concise but polished markdown show notes with a short opening, 3-6 bullet highlights, and a speaker section only if speakers are present.',
                companionMarkdown:
                  'Write a short editorial companion text in markdown, 2-5 short paragraphs, suitable as the written companion to the audio piece.',
                transcriptMarkdownZh:
                  'Translate the transcript into clean, readable Simplified Chinese markdown while preserving meaning and speaker structure.',
                showNotesMarkdownZh:
                  'Write a Simplified Chinese version of the show notes in restrained editorial language.',
                companionMarkdownZh:
                  'Write a Simplified Chinese version of the companion text in restrained editorial language.',
                summary:
                  'Write one restrained editorial dek, 1-3 sentences, based on the transcript.',
                summaryZh:
                  'Write a Simplified Chinese version of the dek.',
                title:
                  'If the current title is blank or weak, suggest a clean editorial title. Otherwise return the current title.',
                titleZh:
                  'Write a clean Simplified Chinese title version suitable for public editorial reading.',
                tags:
                  'Suggest 3-6 specific editorial tags derived from the transcript. Avoid generic filler tags.',
                seoTitle:
                  'Write a clean SEO title under 70 characters.',
                seoTitleZh:
                  'Write a clean Simplified Chinese SEO title under 70 characters.',
                seoDescription:
                  'Write a concise SEO description under 160 characters.',
                seoDescriptionZh:
                  'Write a concise Simplified Chinese SEO description under 160 characters.',
                seoKeywords:
                  'Suggest 5-10 topic terms or keyword phrases that actually match the piece.',
                speakers:
                  'Infer speakers or guests only if the transcript strongly supports it. Otherwise return an empty array.',
                outputSchema:
                  'Return JSON with keys showNotesMarkdown, companionMarkdown, transcriptMarkdownZh, showNotesMarkdownZh, companionMarkdownZh, title, titleZh, summary, summaryZh, tags, seoTitle, seoTitleZh, seoDescription, seoDescriptionZh, seoKeywords, speakers.',
              },
            }),
          },
        ],
      }),
      signal: AbortSignal.timeout(timeoutWithinBudget(deadlineMs, 75_000, 'Editorial drafting')),
    })
  } catch (error) {
    throw new Error(
      isAbortError(error)
        ? 'Editorial draft generation took too long. The transcript can still be kept, then retry draft generation.'
        : 'Editorial draft generation failed.'
    )
  }

  if (!response.ok) {
    throw new Error('Editorial draft generation failed.')
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error('Editorial draft generation returned empty content.')
  }

  let parsed: {
    showNotesMarkdown?: string
    companionMarkdown?: string
    transcriptMarkdownZh?: string
    showNotesMarkdownZh?: string
    companionMarkdownZh?: string
  } & AudioMetadataDrafts
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('Editorial draft generation returned invalid JSON.')
  }

  return {
    showNotesMarkdown: sanitizeEditorialBody(parsed.showNotesMarkdown, 40000) || '',
    companionMarkdown: sanitizeEditorialBody(parsed.companionMarkdown, 40000) || '',
    transcriptMarkdownZh: sanitizeEditorialBody(parsed.transcriptMarkdownZh, 120000) || '',
    showNotesMarkdownZh: sanitizeEditorialBody(parsed.showNotesMarkdownZh, 40000) || '',
    companionMarkdownZh: sanitizeEditorialBody(parsed.companionMarkdownZh, 40000) || '',
    metadata: {
      title: sanitizeEditorialText(parsed.title, 180) || '',
      titleZh: sanitizeEditorialText(parsed.titleZh, 180) || '',
      summary: sanitizeEditorialText(parsed.summary, 600) || '',
      summaryZh: sanitizeEditorialText(parsed.summaryZh, 600) || '',
      tags: suggestedEditorialTagsForType(editorialType),
      seoTitle: sanitizeEditorialText(parsed.seoTitle, 180) || '',
      seoTitleZh: sanitizeEditorialText(parsed.seoTitleZh, 180) || '',
      seoDescription: sanitizeEditorialText(parsed.seoDescription, 300) || '',
      seoDescriptionZh: sanitizeEditorialText(parsed.seoDescriptionZh, 300) || '',
      seoKeywords: sanitizeEditorialTags(parsed.seoKeywords).slice(0, 10),
      speakers: sanitizeEditorialSpeakers(parsed.speakers).slice(0, 8),
    },
  }
}

export async function POST(request: Request) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'OPENAI_API_KEY is not configured for audio processing.' },
      { status: 500 }
    )
  }

  try {
    const body = (await request.json()) as AudioDraftRequest
    const entryId = sanitizeEntryId(body.entryId)
    const audioUrl = sanitizeAudioUrl(body.audioUrl)
    const audioDurationSeconds = sanitizeDurationSeconds(body.audioDurationSeconds)
    const title = sanitizeEditorialText(body.title, 180)
    const summary = sanitizeEditorialText(body.summary, 600)
    const editorialType = sanitizeEditorialType(body.editorialType)
    const speakers = sanitizeEditorialSpeakers(body.speakers)
    const deadlineMs = Date.now() + PROCESSING_BUDGET_MS
    const processing: ProcessingReport = {
      transcript: { state: 'skipped', message: 'Transcript not started yet.' },
      showNotes: { state: 'skipped', message: 'Show notes not started yet.' },
      companion: { state: 'skipped', message: 'Companion text not started yet.' },
      metadata: { state: 'skipped', message: 'Metadata drafting not started yet.' },
      persistence: entryId
        ? { state: 'skipped', message: 'Persistence will run after successful processing.' }
        : { state: 'skipped', message: 'No editorial entry id provided, so persistence is deferred until save draft.' },
    }

    if (!audioUrl) {
      return NextResponse.json({ ok: false, error: 'Audio URL is required.' }, { status: 400 })
    }

    const transcript = await transcribeAudioFromUrl(audioUrl, apiKey, deadlineMs)
    processing.transcript = {
      state: 'success',
      message: 'Transcript generated successfully.',
    }
    let drafts:
      | Awaited<ReturnType<typeof draftEditorialMaterials>>
      | null = null
    let warning = ''

    if (entryId) {
      processing.persistence = await persistProcessingOutputs({
        entryId,
        audioUrl,
        audioDurationSeconds,
        transcriptMarkdown: sanitizeEditorialBody(transcript, 120000),
        showNotesMarkdown: '',
        companionMarkdown: '',
        transcriptMarkdownZh: '',
        showNotesMarkdownZh: '',
        companionMarkdownZh: '',
        metadata: {},
        existing: body,
      })
    }

    try {
      drafts = await draftEditorialMaterials({
        apiKey,
        title,
        summary,
        editorialType,
        transcript,
        speakers,
        deadlineMs,
      })
      processing.showNotes = {
        state: drafts.showNotesMarkdown.trim() ? 'success' : 'failed',
        message: drafts.showNotesMarkdown.trim() ? 'Show notes generated successfully.' : 'Show notes came back empty.',
      }
      processing.companion = {
        state: drafts.companionMarkdown.trim() ? 'success' : 'failed',
        message: drafts.companionMarkdown.trim() ? 'Companion text generated successfully.' : 'Companion text came back empty.',
      }
      processing.metadata = {
        state:
          drafts.metadata.summary ||
          drafts.metadata.tags?.length ||
          drafts.metadata.seoTitle ||
          drafts.metadata.seoDescription
            ? 'success'
            : 'failed',
        message:
          drafts.metadata.summary ||
          drafts.metadata.tags?.length ||
          drafts.metadata.seoTitle ||
          drafts.metadata.seoDescription
            ? 'Metadata suggestions generated successfully.'
            : 'Metadata suggestions came back empty.',
      }
    } catch (error) {
      processing.showNotes = {
        state: 'failed',
        message: error instanceof Error ? error.message : 'Show notes generation failed.',
      }
      processing.companion = {
        state: 'failed',
        message: error instanceof Error ? error.message : 'Companion generation failed.',
      }
      processing.metadata = {
        state: 'failed',
        message: error instanceof Error ? error.message : 'Metadata generation failed.',
      }
      warning =
        error instanceof Error
          ? `${error.message} The transcript is ready, and you can retry draft generation without re-uploading the audio.`
          : 'Editorial draft generation failed. The transcript is ready, and you can retry without re-uploading the audio.'
    }

    const metadata = drafts?.metadata ?? {
      title: '',
      titleZh: '',
      summary: '',
      summaryZh: '',
      tags: [],
      seoTitle: '',
      seoTitleZh: '',
      seoDescription: '',
      seoDescriptionZh: '',
      seoKeywords: [],
      speakers: [],
    }
    const suggestedTitle = metadata.title || title || 'Untitled audio piece'
    const slugSuggestion = sanitizeEditorialSlug('', suggestedTitle)
    const podcastCtaHref = slugSuggestion ? `${editorialUrl(slugSuggestion)}#listen` : '#listen'
    const audioEssayCtaHref = '/mendpress/editorial'

    if (entryId) {
      processing.persistence = await persistProcessingOutputs({
        entryId,
        audioUrl,
        audioDurationSeconds,
        transcriptMarkdown: sanitizeEditorialBody(transcript, 120000),
        showNotesMarkdown: drafts?.showNotesMarkdown || '',
        companionMarkdown: drafts?.companionMarkdown || '',
        transcriptMarkdownZh: drafts?.transcriptMarkdownZh || '',
        showNotesMarkdownZh: drafts?.showNotesMarkdownZh || '',
        companionMarkdownZh: drafts?.companionMarkdownZh || '',
        metadata,
        existing: body,
      })
    }

    return NextResponse.json({
      ok: true,
      transcriptMarkdown: sanitizeEditorialBody(transcript, 120000),
      transcriptMarkdownZh: drafts?.transcriptMarkdownZh || '',
      showNotesMarkdown: drafts?.showNotesMarkdown || '',
      showNotesMarkdownZh: drafts?.showNotesMarkdownZh || '',
      companionMarkdown: drafts?.companionMarkdown || '',
      companionMarkdownZh: drafts?.companionMarkdownZh || '',
      warning,
      processing,
      metadata: {
        title: metadata.title,
        titleZh: metadata.titleZh,
        summary: metadata.summary,
        summaryZh: metadata.summaryZh,
        tags: metadata.tags,
        seoTitle: metadata.seoTitle,
        seoTitleZh: metadata.seoTitleZh,
        seoDescription: metadata.seoDescription,
        seoDescriptionZh: metadata.seoDescriptionZh,
        seoKeywords: metadata.seoKeywords,
        speakers: metadata.speakers,
        slugSuggestion,
        primaryCtaLabel:
          editorialType === 'podcast_episode'
            ? 'Listen now'
            : editorialType === 'audio_essay'
              ? 'Continue with Editorial'
              : '',
        primaryCtaHref:
          editorialType === 'podcast_episode'
            ? podcastCtaHref
            : editorialType === 'audio_essay'
              ? audioEssayCtaHref
              : '',
      },
    })
  } catch (error) {
    console.error('[Editorial Audio] processing failed', error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Audio processing failed.',
        processing: {
          transcript: { state: 'failed', message: error instanceof Error ? error.message : 'Transcript failed.' },
          showNotes: { state: 'failed', message: 'Show notes did not run.' },
          companion: { state: 'failed', message: 'Companion text did not run.' },
          metadata: { state: 'failed', message: 'Metadata drafting did not run.' },
          persistence: { state: 'skipped', message: 'Persistence did not run because processing failed first.' },
        },
      },
      { status: 500 }
    )
  }
}
