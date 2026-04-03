import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  editorialUrl,
  sanitizeEditorialBody,
  sanitizeEditorialSlug,
  sanitizeEditorialSpeakers,
  sanitizeEditorialText,
  sanitizeEditorialTags,
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
      tags: sanitizeEditorialTags(parsed.tags).slice(0, 8),
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
    const suggestedTitle = drafts.metadata.title || title || 'Untitled audio piece'
    const slugSuggestion = sanitizeEditorialSlug('', suggestedTitle)
    const ctaHref = slugSuggestion ? editorialUrl(slugSuggestion) : '/mendpress'

    return NextResponse.json({
      ok: true,
      transcriptMarkdown: sanitizeEditorialBody(transcript, 120000),
      transcriptMarkdownZh: drafts.transcriptMarkdownZh,
      showNotesMarkdown: drafts.showNotesMarkdown,
      showNotesMarkdownZh: drafts.showNotesMarkdownZh,
      companionMarkdown: drafts.companionMarkdown,
      companionMarkdownZh: drafts.companionMarkdownZh,
      metadata: {
        title: drafts.metadata.title,
        titleZh: drafts.metadata.titleZh,
        summary: drafts.metadata.summary,
        summaryZh: drafts.metadata.summaryZh,
        tags: drafts.metadata.tags,
        seoTitle: drafts.metadata.seoTitle,
        seoTitleZh: drafts.metadata.seoTitleZh,
        seoDescription: drafts.metadata.seoDescription,
        seoDescriptionZh: drafts.metadata.seoDescriptionZh,
        seoKeywords: drafts.metadata.seoKeywords,
        speakers: drafts.metadata.speakers,
        slugSuggestion,
        primaryCtaLabel: editorialType === 'podcast_episode' || editorialType === 'audio_essay' ? 'Listen on Mendpress' : '',
        primaryCtaHref: editorialType === 'podcast_episode' || editorialType === 'audio_essay' ? ctaHref : '',
      },
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
