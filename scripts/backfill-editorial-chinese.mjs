import { readFileSync, existsSync } from 'node:fs'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

const OPENAI_TRANSLATION_MODEL = 'gpt-4o-mini'
const OPENAI_TRANSLATION_TIMEOUT_MS = 45_000

function loadEnv(path = '.env.local') {
  if (!existsSync(path)) {
    throw new Error(`Missing env file: ${path}`)
  }
  const text = readFileSync(path, 'utf8')
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx <= 0) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1)
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength) : ''
}

function cleanBody(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function missingChineseFields(entry) {
  const fields = []
  if (entry.title?.trim() && !entry.title_zh?.trim()) fields.push('titleZh')
  if (entry.summary?.trim() && !entry.summary_zh?.trim()) fields.push('summaryZh')
  if (entry.body_markdown?.trim() && !entry.body_markdown_zh?.trim()) fields.push('bodyMarkdownZh')
  if (entry.transcript_markdown?.trim() && !entry.transcript_markdown_zh?.trim()) fields.push('transcriptMarkdownZh')
  if (entry.show_notes_markdown?.trim() && !entry.show_notes_markdown_zh?.trim()) fields.push('showNotesMarkdownZh')
  return fields
}

async function requestChineseTranslation(entry, fields, apiKey) {
  const source = {}
  if (fields.includes('titleZh')) source.title = entry.title
  if (fields.includes('summaryZh')) source.summary = entry.summary
  if (fields.includes('bodyMarkdownZh')) source.bodyMarkdown = entry.body_markdown
  if (fields.includes('transcriptMarkdownZh') && entry.transcript_markdown) source.transcriptMarkdown = entry.transcript_markdown
  if (fields.includes('showNotesMarkdownZh') && entry.show_notes_markdown) source.showNotesMarkdown = entry.show_notes_markdown

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
            'Translate Mendpress editorial publishing content from English into Simplified Chinese. Preserve Markdown headings, links, paragraph breaks, lists, and speaker labels. Keep the tone serious, natural, and editorial. Do not add translator notes or commentary. Return only JSON.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'Translate the provided English Mendpress fields into Simplified Chinese.',
            requestedKeys: fields,
            source,
          }),
        },
      ],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`OpenAI translation failed: ${response.status} ${text.slice(0, 400)}`)
  }

  const json = await response.json()
  const content = json?.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('OpenAI translation returned an empty response.')

  let parsed
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI translation returned invalid JSON.')
  }

  return {
    titleZh: cleanText(parsed.titleZh, 180),
    summaryZh: cleanText(parsed.summaryZh, 600),
    bodyMarkdownZh: cleanBody(parsed.bodyMarkdownZh, 80000),
    transcriptMarkdownZh: cleanBody(parsed.transcriptMarkdownZh, 120000),
    showNotesMarkdownZh: cleanBody(parsed.showNotesMarkdownZh, 80000),
  }
}

async function main() {
  loadEnv('.env.local')
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const apiKey = process.env.OPENAI_API_KEY?.trim()

  if (!url || !key) throw new Error('Missing Supabase env vars.')
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY.')

  const supabase = createClient(url, key)
  const slugs = process.argv.slice(2)
  if (!slugs.length) {
    throw new Error('Provide one or more editorial slugs.')
  }

  const { data, error } = await supabase
    .from('editorial_entries')
    .select(
      'id,slug,title,summary,body_markdown,transcript_markdown,show_notes_markdown,title_zh,summary_zh,body_markdown_zh,transcript_markdown_zh,show_notes_markdown_zh,status'
    )
    .in('slug', slugs)
    .eq('status', 'published')

  if (error) throw error

  const results = []
  for (const entry of data || []) {
    const fields = missingChineseFields(entry)
    if (!fields.length) {
      results.push({ slug: entry.slug, status: 'skipped', updatedFields: [] })
      continue
    }

    const translated = await requestChineseTranslation(entry, fields, apiKey)
    const payload = { updated_at: new Date().toISOString() }
    const updatedFields = []

    if (fields.includes('titleZh') && translated.titleZh) {
      payload.title_zh = translated.titleZh
      updatedFields.push('title_zh')
    }
    if (fields.includes('summaryZh') && translated.summaryZh) {
      payload.summary_zh = translated.summaryZh
      updatedFields.push('summary_zh')
    }
    if (fields.includes('bodyMarkdownZh') && translated.bodyMarkdownZh) {
      payload.body_markdown_zh = translated.bodyMarkdownZh
      updatedFields.push('body_markdown_zh')
    }
    if (fields.includes('transcriptMarkdownZh') && translated.transcriptMarkdownZh) {
      payload.transcript_markdown_zh = translated.transcriptMarkdownZh
      updatedFields.push('transcript_markdown_zh')
    }
    if (fields.includes('showNotesMarkdownZh') && translated.showNotesMarkdownZh) {
      payload.show_notes_markdown_zh = translated.showNotesMarkdownZh
      updatedFields.push('show_notes_markdown_zh')
    }

    const { error: updateError } = await supabase.from('editorial_entries').update(payload).eq('id', entry.id)
    if (updateError) throw updateError

    results.push({ slug: entry.slug, status: 'translated', updatedFields })
  }

  console.log(JSON.stringify(results, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
