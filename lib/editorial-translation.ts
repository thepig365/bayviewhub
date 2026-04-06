import {
  getEditorialEntryByIdForAdmin,
  sanitizeEditorialBody,
  sanitizeEditorialText,
  type EditorialEntry,
} from '@/lib/editorial'
import { writeEditorialAuditLogs } from '@/lib/editorial-admin'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

const OPENAI_TRANSLATION_MODEL = 'gpt-4o-mini'
const OPENAI_TRANSLATION_TIMEOUT_MS = 45_000

type TranslationField =
  | 'titleZh'
  | 'summaryZh'
  | 'bodyMarkdownZh'
  | 'transcriptMarkdownZh'
  | 'showNotesMarkdownZh'

type TranslationSyncResult = {
  status: 'translated' | 'skipped' | 'failed'
  message: string
  updatedFields: string[]
}

type TranslationDraft = Partial<Record<TranslationField, string>>

const FIELD_TO_DB_COLUMN: Record<TranslationField, string> = {
  titleZh: 'title_zh',
  summaryZh: 'summary_zh',
  bodyMarkdownZh: 'body_markdown_zh',
  transcriptMarkdownZh: 'transcript_markdown_zh',
  showNotesMarkdownZh: 'show_notes_markdown_zh',
}

function missingChineseFields(entry: EditorialEntry): TranslationField[] {
  const missing: TranslationField[] = []
  if (entry.title.trim() && !entry.titleZh?.trim()) missing.push('titleZh')
  if (entry.summary.trim() && !entry.summaryZh?.trim()) missing.push('summaryZh')
  if (entry.bodyMarkdown.trim() && !entry.bodyMarkdownZh?.trim()) missing.push('bodyMarkdownZh')
  if (entry.transcriptMarkdown?.trim() && !entry.transcriptMarkdownZh?.trim()) missing.push('transcriptMarkdownZh')
  if (entry.showNotesMarkdown?.trim() && !entry.showNotesMarkdownZh?.trim()) missing.push('showNotesMarkdownZh')
  return missing
}

function sanitizeTranslationDraft(draft: TranslationDraft): TranslationDraft {
  return {
    titleZh: sanitizeEditorialText(draft.titleZh, 180) || '',
    summaryZh: sanitizeEditorialText(draft.summaryZh, 600) || '',
    bodyMarkdownZh: sanitizeEditorialBody(draft.bodyMarkdownZh, 80_000) || '',
    transcriptMarkdownZh: sanitizeEditorialBody(draft.transcriptMarkdownZh, 120_000) || '',
    showNotesMarkdownZh: sanitizeEditorialBody(draft.showNotesMarkdownZh, 80_000) || '',
  }
}

async function requestChineseTranslation(entry: EditorialEntry, fields: TranslationField[], apiKey: string): Promise<TranslationDraft> {
  const sourcePayload: Record<string, string> = {}
  if (fields.includes('titleZh')) sourcePayload.title = entry.title
  if (fields.includes('summaryZh')) sourcePayload.summary = entry.summary
  if (fields.includes('bodyMarkdownZh')) sourcePayload.bodyMarkdown = entry.bodyMarkdown
  if (fields.includes('transcriptMarkdownZh') && entry.transcriptMarkdown) sourcePayload.transcriptMarkdown = entry.transcriptMarkdown
  if (fields.includes('showNotesMarkdownZh') && entry.showNotesMarkdown) sourcePayload.showNotesMarkdown = entry.showNotesMarkdown

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(OPENAI_TRANSLATION_TIMEOUT_MS),
    body: JSON.stringify({
      model: OPENAI_TRANSLATION_MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Translate Mendpress editorial publishing content from English into Simplified Chinese. Preserve Markdown structure, headings, links, lists, paragraph breaks, and speaker labels. Keep the tone serious, clear, and editorial. Do not add commentary or translator notes. Return only valid JSON with the requested Chinese keys.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'Translate the provided English fields into Simplified Chinese for Mendpress publication use.',
            requestedKeys: fields,
            outputKeys: {
              titleZh: 'Simplified Chinese translation of title',
              summaryZh: 'Simplified Chinese translation of summary',
              bodyMarkdownZh: 'Simplified Chinese translation of body markdown',
              transcriptMarkdownZh: 'Simplified Chinese translation of transcript markdown',
              showNotesMarkdownZh: 'Simplified Chinese translation of show notes markdown',
            },
            source: sourcePayload,
          }),
        },
      ],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`OpenAI translation failed: ${response.status} ${text.slice(0, 400)}`)
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>
  }
  const content = json.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error('OpenAI translation returned an empty response.')
  }

  let parsed: TranslationDraft
  try {
    parsed = JSON.parse(content) as TranslationDraft
  } catch {
    throw new Error('OpenAI translation returned invalid JSON.')
  }

  return sanitizeTranslationDraft(parsed)
}

export async function syncEditorialChineseTranslation(entryId: string): Promise<TranslationSyncResult> {
  const entry = await getEditorialEntryByIdForAdmin(entryId)
  if (!entry) {
    return {
      status: 'failed',
      message: 'Editorial entry could not be loaded for Chinese sync.',
      updatedFields: [],
    }
  }

  if (entry.status !== 'published') {
    return {
      status: 'skipped',
      message: 'Entry is not published, so Chinese sync was skipped.',
      updatedFields: [],
    }
  }

  const fields = missingChineseFields(entry)
  if (!fields.length) {
    return {
      status: 'skipped',
      message: 'Chinese fields are already present.',
      updatedFields: [],
    }
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return {
      status: 'failed',
      message: 'OPENAI_API_KEY is not configured for EN to CN sync.',
      updatedFields: [],
    }
  }

  let translated: TranslationDraft
  try {
    translated = await requestChineseTranslation(entry, fields, apiKey)
  } catch (error) {
    return {
      status: 'failed',
      message: error instanceof Error ? error.message : 'Chinese translation sync failed.',
      updatedFields: [],
    }
  }

  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  const updatedFields: string[] = []

  for (const field of fields) {
    const value = translated[field]?.trim()
    if (!value) continue
    payload[FIELD_TO_DB_COLUMN[field]] = value
    updatedFields.push(FIELD_TO_DB_COLUMN[field])
  }

  if (!updatedFields.length) {
    return {
      status: 'failed',
      message: 'Chinese translation sync returned no usable fields.',
      updatedFields: [],
    }
  }

  const supabase = getSupabaseServer()
  if (!supabase) {
    return {
      status: 'failed',
      message: 'Database is not configured for Chinese sync persistence.',
      updatedFields: [],
    }
  }

  const { error } = await supabase.from('editorial_entries').update(payload).eq('id', entryId)
  if (error) {
    return {
      status: 'failed',
      message: `Chinese sync persistence failed: ${error.message}`,
      updatedFields: [],
    }
  }

  await writeEditorialAuditLogs({
    entryId: entry.id,
    slug: entry.slug,
    actions: ['update'],
    changedFields: updatedFields,
    previousStatus: entry.status,
    nextStatus: entry.status,
    editorialType: entry.editorialType,
    extraMetadata: {
      source: 'auto_translation',
      locale: 'zh',
      zh_state: 'auto_generated',
    },
  })

  return {
    status: 'translated',
    message: 'Chinese fields were generated from the published English source.',
    updatedFields,
  }
}
