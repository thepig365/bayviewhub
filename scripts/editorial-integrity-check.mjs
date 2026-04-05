import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const SITE_URL = (process.env.SITE_URL || 'https://www.bayviewhub.me').replace(/\/+$/, '')

const EDITORIAL_TYPES = new Set([
  'editorial',
  'essay',
  'conversation',
  'interview',
  'audio_essay',
  'podcast_episode',
  'field_note',
  'profile',
  'invitation',
  'project_brief',
  'dispatch',
])

const EDITORIAL_STATUSES = new Set(['draft', 'published', 'archived'])

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase env. Set SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function line(title, items) {
  console.log(`\n## ${title}`)
  if (!items.length) {
    console.log('OK')
    return
  }
  for (const item of items) console.log(`- ${item}`)
}

const { data, error } = await supabase
  .from('editorial_entries')
  .select('id,slug,title,summary,body_markdown,editorial_type,status,published_at,updated_at')
  .order('updated_at', { ascending: false })
  .limit(500)

if (error) {
  console.error(`Failed to query editorial_entries: ${error.message}`)
  process.exit(1)
}

const rows = data || []
const duplicateSlugMap = new Map()
for (const row of rows) {
  const slug = text(row.slug)
  if (!slug) continue
  const list = duplicateSlugMap.get(slug) || []
  list.push(row.id)
  duplicateSlugMap.set(slug, list)
}

const duplicateSlugs = Array.from(duplicateSlugMap.entries())
  .filter(([, ids]) => ids.length > 1)
  .map(([slug, ids]) => `${slug} (${ids.length} rows: ${ids.join(', ')})`)

const malformedTypes = rows
  .filter((row) => !EDITORIAL_TYPES.has(text(row.editorial_type)))
  .map((row) => `${row.id} ${text(row.slug) || '(no slug)'} editorial_type="${String(row.editorial_type)}"`)

const malformedStatuses = rows
  .filter((row) => !EDITORIAL_STATUSES.has(text(row.status)))
  .map((row) => `${row.id} ${text(row.slug) || '(no slug)'} status="${String(row.status)}"`)

const publishedMissingCore = rows
  .filter((row) => text(row.status) === 'published')
  .filter((row) => !text(row.title) || !text(row.summary) || !text(row.body_markdown) || !text(row.published_at))
  .map((row) => `${row.id} ${text(row.slug) || '(no slug)'}`)

const publiclyCheckable = rows
  .filter((row) => text(row.status) === 'published')
  .filter((row) => EDITORIAL_TYPES.has(text(row.editorial_type)))
  .filter((row) => text(row.slug) && text(row.title) && text(row.summary) && text(row.body_markdown) && text(row.published_at))

const unreachablePublished = []
for (const row of publiclyCheckable) {
  const slug = text(row.slug)
  try {
    const response = await fetch(`${SITE_URL}/mendpress/${slug}`, { redirect: 'follow' })
    if (!response.ok) {
      unreachablePublished.push(`${row.id} ${slug} -> HTTP ${response.status}`)
    }
  } catch (fetchError) {
    unreachablePublished.push(`${row.id} ${slug} -> ${fetchError instanceof Error ? fetchError.message : 'fetch failed'}`)
  }
}

console.log(`# Editorial Integrity Report`)
console.log(`Generated at: ${new Date().toISOString()}`)
console.log(`Rows inspected: ${rows.length}`)
console.log(`Published rows checked for live reachability: ${publiclyCheckable.length}`)

line('Duplicate slugs', duplicateSlugs)
line('Malformed editorial_type values', malformedTypes)
line('Malformed status values', malformedStatuses)
line('Published rows missing title / summary / body / published_at', publishedMissingCore)
line('Published detail pages not publicly reachable', unreachablePublished)

const hasFailures =
  duplicateSlugs.length ||
  malformedTypes.length ||
  malformedStatuses.length ||
  publishedMissingCore.length ||
  unreachablePublished.length

process.exit(hasFailures ? 1 : 0)
