import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  sanitizeEditorialBody,
  sanitizeEditorialSpeakers,
  sanitizeEditorialText,
  sanitizeEditorialType,
} from '@/lib/editorial'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

const OPENAI_TRANSCRIPTION_MODEL = 'whisper-1'
const OPENAI_DRAFT_MODEL = 'gpt-4o-mini'
const OPENAI_TRANSCRIPTION_MAX_BYTES = 24 * 1024 * 1024

async function rejectIfUnauthorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

type AudioDraftRequest = {
  audioUrl?: string
  title?: string
  summary?: string
  editorialType?: string
  speakers?: string[] | string
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

async function transcribeAudioFromUrl(audioUrl: string, apiKey: string): Promise<string> {
  const audioResponse = await fetch(audioUrl)
  if (!audioResponse.ok) {
    throw new Error('Could not fetch the uploaded audio for transcription.')
  }

  const audioBlob = await audioResponse.blob()
  if (!audioBlob.size) {
    throw new Error('Uploaded audio was empty.')
  }

  if (audioBlob.size > OPENAI_TRANSCRIPTION_MAX_BYTES) {
    throw new Error('Audio transcription currently supports uploads up to 24 MB.')
  }

  const file = new File([audioBlob], 'mendpress-audio-input', {
    type: audioBlob.type || 'audio/mpeg',
  })

  const formData = new FormData()
  formData.set('file', file)
  formData.set('model', OPENAI_TRANSCRIPTION_MODEL)
  formData.set('response_format', 'text')

  const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  })

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
}: {
  apiKey: string
  title: string
  summary: string
  editorialType: string
  transcript: string
  speakers: string[]
}) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
            'You are writing for Mendpress at Bayview Hub. Produce restrained, editorial, human-sounding markdown. Avoid hype, AI-sounding filler, and generic marketing language. Return strict JSON with keys showNotesMarkdown and companionMarkdown.',
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
            },
          }),
        },
      ],
    }),
  })

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

  let parsed: { showNotesMarkdown?: string; companionMarkdown?: string }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('Editorial draft generation returned invalid JSON.')
  }

  return {
    showNotesMarkdown: sanitizeEditorialBody(parsed.showNotesMarkdown, 40000) || '',
    companionMarkdown: sanitizeEditorialBody(parsed.companionMarkdown, 40000) || '',
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
    const audioUrl = sanitizeAudioUrl(body.audioUrl)
    const title = sanitizeEditorialText(body.title, 180)
    const summary = sanitizeEditorialText(body.summary, 600)
    const editorialType = sanitizeEditorialType(body.editorialType)
    const speakers = sanitizeEditorialSpeakers(body.speakers)

    if (!audioUrl) {
      return NextResponse.json({ ok: false, error: 'Audio URL is required.' }, { status: 400 })
    }

    const transcript = await transcribeAudioFromUrl(audioUrl, apiKey)
    const drafts = await draftEditorialMaterials({
      apiKey,
      title,
      summary,
      editorialType,
      transcript,
      speakers,
    })

    return NextResponse.json({
      ok: true,
      transcriptMarkdown: sanitizeEditorialBody(transcript, 120000),
      showNotesMarkdown: drafts.showNotesMarkdown,
      companionMarkdown: drafts.companionMarkdown,
    })
  } catch (error) {
    console.error('[Editorial Audio] processing failed', error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Audio processing failed.',
      },
      { status: 500 }
    )
  }
}
