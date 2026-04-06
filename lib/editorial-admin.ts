import type { EditorialEntry, EditorialStatus, EditorialType, EditorialVisibilityReport } from '@/lib/editorial'
import { verifyEditorialPublicVisibility } from '@/lib/editorial'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const EDITORIAL_AUDIT_ACTIONS = [
  'create',
  'update',
  'publish',
  'unpublish',
  'archive',
  'unarchive',
] as const

export type EditorialAuditAction = (typeof EDITORIAL_AUDIT_ACTIONS)[number]
type EditorialAuditMetadata = Record<string, unknown>

export type EditorialChineseFieldKey =
  | 'titleZh'
  | 'summaryZh'
  | 'bodyMarkdownZh'
  | 'transcriptMarkdownZh'
  | 'showNotesMarkdownZh'

export type EditorialChineseFieldState = 'missing' | 'auto_generated' | 'reviewed' | 'present'

export type EditorialChineseReviewSummary = {
  overall: 'missing' | 'auto_generated' | 'reviewed' | 'mixed' | 'present'
  fields: Record<
    EditorialChineseFieldKey,
    {
      state: EditorialChineseFieldState
      source: string | null
      updatedAt: string | null
    }
  >
}

const CHINESE_FIELD_COLUMN_MAP: Record<EditorialChineseFieldKey, string> = {
  titleZh: 'title_zh',
  summaryZh: 'summary_zh',
  bodyMarkdownZh: 'body_markdown_zh',
  transcriptMarkdownZh: 'transcript_markdown_zh',
  showNotesMarkdownZh: 'show_notes_markdown_zh',
}

type EditorialComparableRecord = Record<string, unknown>

function normalizeComparableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => normalizeComparableValue(item))
  if (typeof value === 'string') return value.trim()
  return value ?? null
}

function comparableEntryFields(entry: EditorialEntry): EditorialComparableRecord {
  return {
    slug: entry.slug,
    title: entry.title,
    summary: entry.summary,
    body_markdown: entry.bodyMarkdown,
    editorial_type: entry.editorialType,
    status: entry.status,
    published_at: entry.publishedAt,
    hero_image: entry.heroImage,
    primary_cta_label: entry.primaryCtaLabel,
    primary_cta_href: entry.primaryCtaHref,
    seo_title: entry.seoTitle,
    title_zh: entry.titleZh,
    summary_zh: entry.summaryZh,
    body_markdown_zh: entry.bodyMarkdownZh,
    seo_title_zh: entry.seoTitleZh,
    seo_description: entry.seoDescription,
    seo_description_zh: entry.seoDescriptionZh,
    tags: entry.tags,
    byline: entry.byline,
    pinned: entry.pinned,
    audio_url: entry.audioUrl,
    audio_duration_seconds: entry.audioDurationSeconds,
    transcript_markdown: entry.transcriptMarkdown,
    transcript_markdown_zh: entry.transcriptMarkdownZh,
    show_notes_markdown: entry.showNotesMarkdown,
    show_notes_markdown_zh: entry.showNotesMarkdownZh,
    speakers: entry.speakers,
  }
}

export function editorialChangedFields(
  previous: EditorialEntry | null,
  payload: Record<string, unknown>
): string[] {
  const comparablePayload = Object.entries(payload)
    .filter(([key]) => key !== 'updated_at')
    .reduce<EditorialComparableRecord>((acc, [key, value]) => {
      acc[key] = normalizeComparableValue(value)
      return acc
    }, {})

  if (!previous) {
    return Object.entries(comparablePayload)
      .filter(([, value]) => value !== null && value !== '' && JSON.stringify(value) !== '[]')
      .map(([key]) => key)
  }

  const previousComparable = comparableEntryFields(previous)
  return Object.entries(comparablePayload)
    .filter(([key, value]) => JSON.stringify(previousComparable[key]) !== JSON.stringify(value))
    .map(([key]) => key)
}

export function deriveEditorialAuditActions({
  previousStatus,
  nextStatus,
  isCreate,
  changedFields,
}: {
  previousStatus: EditorialStatus | null
  nextStatus: EditorialStatus
  isCreate: boolean
  changedFields: string[]
}): EditorialAuditAction[] {
  const actions: EditorialAuditAction[] = []

  if (isCreate) actions.push('create')
  if (!isCreate && changedFields.length) actions.push('update')
  if (previousStatus !== 'published' && nextStatus === 'published') actions.push('publish')
  if (previousStatus === 'published' && nextStatus !== 'published') actions.push('unpublish')
  if (previousStatus !== 'archived' && nextStatus === 'archived') actions.push('archive')
  if (previousStatus === 'archived' && nextStatus !== 'archived') actions.push('unarchive')

  return Array.from(new Set(actions))
}

export async function writeEditorialAuditLogs({
  entryId,
  slug,
  actions,
  changedFields,
  previousStatus,
  nextStatus,
  editorialType,
  extraMetadata,
}: {
  entryId: string
  slug: string
  actions: EditorialAuditAction[]
  changedFields: string[]
  previousStatus: EditorialStatus | null
  nextStatus: EditorialStatus
  editorialType: EditorialType
  extraMetadata?: EditorialAuditMetadata
}): Promise<void> {
  if (!actions.length) return

  const supabase = getSupabaseServer()
  if (!supabase) {
    console.warn('[Editorial Audit] skipped because Supabase server client is unavailable')
    return
  }

  const rows = actions.map((action) => ({
    entry_id: entryId,
    slug,
    action_type: action,
    changed_fields: changedFields,
    metadata: {
      previous_status: previousStatus,
      next_status: nextStatus,
      editorial_type: editorialType,
      ...(extraMetadata || {}),
    },
  }))

  const { error } = await supabase.from('editorial_audit_log').insert(rows)
  if (error) {
    console.warn('[Editorial Audit] insert failed', error)
  }
}

export async function verifyExpectedPublishedVisibility(
  status: EditorialStatus,
  slug: string
): Promise<EditorialVisibilityReport | null> {
  if (status !== 'published') return null
  return verifyEditorialPublicVisibility(slug)
}

export async function getEditorialChineseReviewSummary(entry: EditorialEntry): Promise<EditorialChineseReviewSummary> {
  const supabase = getSupabaseServer()
  const fields: EditorialChineseReviewSummary['fields'] = {
    titleZh: { state: entry.titleZh?.trim() ? 'present' : 'missing', source: null, updatedAt: null },
    summaryZh: { state: entry.summaryZh?.trim() ? 'present' : 'missing', source: null, updatedAt: null },
    bodyMarkdownZh: { state: entry.bodyMarkdownZh?.trim() ? 'present' : 'missing', source: null, updatedAt: null },
    transcriptMarkdownZh: {
      state: entry.transcriptMarkdownZh?.trim() ? 'present' : 'missing',
      source: null,
      updatedAt: null,
    },
    showNotesMarkdownZh: {
      state: entry.showNotesMarkdownZh?.trim() ? 'present' : 'missing',
      source: null,
      updatedAt: null,
    },
  }

  if (!supabase) {
    return { overall: deriveOverallChineseReviewState(fields), fields }
  }

  const { data, error } = await supabase
    .from('editorial_audit_log')
    .select('created_at, changed_fields, metadata')
    .eq('entry_id', entry.id)
    .order('created_at', { ascending: false })
    .limit(40)

  if (error || !data) {
    return { overall: deriveOverallChineseReviewState(fields), fields }
  }

  for (const key of Object.keys(CHINESE_FIELD_COLUMN_MAP) as EditorialChineseFieldKey[]) {
    const current = fields[key]
    if (current.state === 'missing') continue
    const column = CHINESE_FIELD_COLUMN_MAP[key]
    const match = data.find((row) => Array.isArray(row.changed_fields) && row.changed_fields.includes(column))
    if (!match) continue
    const metadata = (match.metadata || {}) as { source?: string }
    current.source = metadata.source || null
    current.updatedAt = typeof match.created_at === 'string' ? match.created_at : null
    current.state =
      metadata.source === 'manual_admin'
        ? 'reviewed'
        : metadata.source === 'auto_translation'
          ? 'auto_generated'
          : 'present'
  }

  return { overall: deriveOverallChineseReviewState(fields), fields }
}

function deriveOverallChineseReviewState(fields: EditorialChineseReviewSummary['fields']) {
  const states = Object.values(fields).map((field) => field.state)
  const presentStates = states.filter((state) => state !== 'missing')
  if (!presentStates.length) return 'missing'
  if (presentStates.every((state) => state === 'reviewed')) return 'reviewed'
  if (presentStates.every((state) => state === 'auto_generated')) return 'auto_generated'
  if (presentStates.every((state) => state === 'present')) return 'present'
  return 'mixed'
}
