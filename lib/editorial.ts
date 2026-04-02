import { type SupabaseClient } from '@supabase/supabase-js'
import {
  GALLERY_EXTERNAL,
  GALLERY_VIEWING_REQUEST_MAILTO,
  SITE_CONFIG,
  SSD_LANDING,
} from '@/lib/constants'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const EDITORIAL_TYPES = [
  'essay',
  'field_note',
  'profile',
  'invitation',
  'project_brief',
  'dispatch',
] as const

export const EDITORIAL_STATUSES = ['draft', 'published'] as const

export type EditorialType = (typeof EDITORIAL_TYPES)[number]
export type EditorialStatus = (typeof EDITORIAL_STATUSES)[number]
export type EditorialStatusFilter = EditorialStatus | 'all'
export const MENDPRESS_SECTION_IDS = ['editorial', 'dialogue', 'visual_narrative', 'reports'] as const
export type MendpressSectionId = (typeof MENDPRESS_SECTION_IDS)[number]

type EditorialTypeMeta = {
  label: string
  pluralLabel: string
  categoryPath: string
  description: string
}

export const EDITORIAL_TYPE_META: Record<EditorialType, EditorialTypeMeta> = {
  essay: {
    label: 'Essay',
    pluralLabel: 'Essays',
    categoryPath: '/mendpress/editorial',
    description: 'Longer-form pieces on art, place, hospitality, and cultural meaning.',
  },
  field_note: {
    label: 'Field Note',
    pluralLabel: 'Field Notes',
    categoryPath: '/mendpress/visual-narrative',
    description: 'Shorter notes from the estate as a living place.',
  },
  profile: {
    label: 'Profile',
    pluralLabel: 'Profiles',
    categoryPath: '/mendpress/dialogue',
    description: 'People-centred pieces on artists, partners, hosts, and collaborators.',
  },
  invitation: {
    label: 'Invitation',
    pluralLabel: 'Invitations',
    categoryPath: '/mendpress/reports',
    description: 'Elegant, share-ready pages for exhibitions, dinners, events, and viewings.',
  },
  project_brief: {
    label: 'Project Brief',
    pluralLabel: 'Projects',
    categoryPath: '/mendpress/reports',
    description: 'Commercially serious explainers for projects, opportunities, and participation paths.',
  },
  dispatch: {
    label: 'Dispatch',
    pluralLabel: 'Dispatches',
    categoryPath: '/mendpress/reports',
    description: 'Shorter editorial notes with a sharper point of view.',
  },
}

export type EditorialEntry = {
  id: string
  slug: string
  title: string
  summary: string
  bodyMarkdown: string
  editorialType: EditorialType
  status: EditorialStatus
  publishedAt: string | null
  heroImage: string | null
  primaryCtaLabel: string | null
  primaryCtaHref: string | null
  seoTitle: string | null
  seoDescription: string | null
  tags: string[]
  byline: string | null
  pinned: boolean
  createdAt: string | null
  updatedAt: string | null
  path: string
  categoryPath: string
  readingTimeMinutes: number
}

type EditorialDbRow = {
  id: string
  slug: string
  title: string
  summary: string | null
  body_markdown: string | null
  editorial_type: string | null
  status: string | null
  published_at: string | null
  hero_image: string | null
  primary_cta_label: string | null
  primary_cta_href: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[] | null
  byline: string | null
  pinned: boolean | null
  created_at: string | null
  updated_at: string | null
}

export type EditorialLink = {
  label: string
  href: string
  external?: boolean
}

export type EditorialLinkedInPackSource = Pick<
  EditorialEntry,
  'title' | 'summary' | 'slug' | 'editorialType' | 'heroImage' | 'tags' | 'path' | 'seoTitle' | 'byline'
>

export type EditorialLinkedInPack = {
  articleTitle: string
  articleUrl: string
  primaryPost: string
  shortHook: string
  suggestedImageNote: string
}

export type EditorialSection = {
  id: MendpressSectionId
  label: string
  description: string
  path: string
  entries: EditorialEntry[]
}

type MendpressSectionMeta = {
  label: string
  description: string
  path: string
}

export const MENDPRESS_SECTION_META: Record<MendpressSectionId, MendpressSectionMeta> = {
  editorial: {
    label: 'Editorial',
    description: 'Interpretive pieces, essays, and longer-form editorial framing from Bayview Hub.',
    path: '/mendpress/editorial',
  },
  dialogue: {
    label: 'Dialogue',
    description: 'Profiles, conversations, and people-centred pieces with a clearer human voice.',
    path: '/mendpress/dialogue',
  },
  visual_narrative: {
    label: 'Visual Narrative',
    description: 'Place-based and image-led writing shaped by atmosphere, weather, objects, and lived time.',
    path: '/mendpress/visual-narrative',
  },
  reports: {
    label: 'Programme',
    description: 'Dispatches, invitations, briefs, and contextual publication material gathered for Mendpress.',
    path: '/mendpress/reports',
  },
}

const EDITORIAL_SELECT =
  'id,slug,title,summary,body_markdown,editorial_type,status,published_at,hero_image,primary_cta_label,primary_cta_href,seo_title,seo_description,tags,byline,pinned,created_at,updated_at'

function trimString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\r\n/g, '\n').slice(0, max)
}

export function sanitizeEditorialText(value: unknown, max = 500): string {
  return trimString(value, max)
}

export function sanitizeEditorialBody(value: unknown, max = 80_000): string {
  return trimString(value, max)
}

function sanitizeHref(value: unknown): string | null {
  const href = trimString(value, 800)
  if (!href) return null
  if (
    href.startsWith('/') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:')
  ) {
    return href
  }
  return null
}

export function sanitizeEditorialSlug(value: unknown, fallbackTitle?: string): string {
  const source = trimString(value, 160) || trimString(fallbackTitle, 160)
  return source
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export function sanitizeEditorialType(value: unknown): EditorialType {
  return EDITORIAL_TYPES.includes(value as EditorialType) ? (value as EditorialType) : 'essay'
}

export function sanitizeEditorialStatus(value: unknown): EditorialStatus {
  return EDITORIAL_STATUSES.includes(value as EditorialStatus)
    ? (value as EditorialStatus)
    : 'draft'
}

export function sanitizeEditorialTags(value: unknown): string[] {
  const raw =
    Array.isArray(value)
      ? value
      : typeof value === 'string'
        ? value.split(',')
        : []

  return Array.from(
    new Set(
      raw
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
        .map((item) => item.replace(/[^a-z0-9 -]/g, '').trim())
        .filter(Boolean)
        .slice(0, 12)
    )
  )
}

export function editorialTypeLabel(type: EditorialType): string {
  return EDITORIAL_TYPE_META[type].label
}

export function editorialPluralLabel(type: EditorialType): string {
  return EDITORIAL_TYPE_META[type].pluralLabel
}

export function editorialTypeDescription(type: EditorialType): string {
  return EDITORIAL_TYPE_META[type].description
}

export function editorialTypeAdminLabel(type: EditorialType): string {
  return `${editorialTypeLabel(type)} -> ${mendpressSectionLabel(type)}`
}

export function editorialTypeAdminHint(type: EditorialType): string {
  return `Internal type "${editorialTypeLabel(type)}" publishes under public Mendpress section "${mendpressSectionLabel(type)}".`
}

function socialSummarySentence(value: string): string {
  const clean = sanitizeEditorialText(value, 320).replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  const sentenceMatch = clean.match(/^.+?[.!?](?=\s|$)/)
  return sentenceMatch ? sentenceMatch[0].trim() : clean
}

function mendpressSectionContextLine(type: EditorialType): string {
  switch (mendpressSectionIdForType(type)) {
    case 'editorial':
      return 'It extends Bayview Hub’s editorial reading of art, place, hospitality, and cultural meaning.'
    case 'dialogue':
      return 'It stays close to people, practice, and the conversation around how cultural work is actually carried.'
    case 'visual_narrative':
      return 'It works through image, atmosphere, and lived detail, rather than summary alone.'
    case 'reports':
      return 'It frames invitations, dispatches, and project context as part of the public programme around Bayview Hub.'
  }
}

function mendpressThemeLine(source: EditorialLinkedInPackSource): string {
  if (source.tags.length) {
    return `Themes include ${source.tags.slice(0, 3).join(', ')}.`
  }

  switch (source.editorialType) {
    case 'essay':
      return 'It is intended as a public-facing editorial text rather than campaign copy.'
    case 'profile':
      return 'The emphasis is on voice, practice, and the relationship between people and place.'
    case 'field_note':
      return 'The emphasis is on atmosphere, sequence, and what can only be understood by staying with the image.'
    case 'invitation':
      return 'The emphasis is on what is being convened, and why the invitation matters in public.'
    case 'project_brief':
      return 'The emphasis is on programme logic, participation, and the practical shape of the work.'
    case 'dispatch':
      return 'The emphasis is on a shorter public note with a clear point of view.'
  }
}

function mendpressSuggestedLinkedInImage(source: EditorialLinkedInPackSource): string {
  const prefix = source.heroImage
    ? 'Use the article hero image if it crops cleanly for LinkedIn.'
    : 'No hero image is set yet.'

  switch (source.editorialType) {
    case 'essay':
      return `${prefix} Prefer a single artwork detail, installation view, or quietly composed landscape image.`
    case 'profile':
      return `${prefix} Prefer a strong portrait or a clear image of the subject in context.`
    case 'field_note':
      return `${prefix} Prefer an atmospheric landscape, object detail, or image-led sequence opener.`
    case 'invitation':
      return `${prefix} Prefer the event image, invitation artwork, or the clearest programme-facing visual.`
    case 'project_brief':
      return `${prefix} Prefer a project image, site view, plan, or visual that clarifies the opportunity.`
    case 'dispatch':
      return `${prefix} Prefer the strongest documentary image or detail that carries the note at a glance.`
  }
}

export function buildEditorialLinkedInPack(
  source: EditorialLinkedInPackSource
): EditorialLinkedInPack {
  const articleTitle = sanitizeEditorialText(source.seoTitle, 180) || sanitizeEditorialText(source.title, 180)
  const articleUrl = editorialAbsoluteUrlFromPath(source.path || editorialUrl(source.slug))
  const summaryLine =
    socialSummarySentence(source.summary) ||
    `${articleTitle} is now live on Mendpress.`
  const sectionLabel = mendpressSectionLabel(source.editorialType)
  const bylineLine = source.byline ? `By ${sanitizeEditorialText(source.byline, 120)}.` : null

  const primaryPost = [
    articleTitle,
    '',
    summaryLine,
    '',
    mendpressSectionContextLine(source.editorialType),
    mendpressThemeLine(source),
    bylineLine,
    '',
    `Read the article: ${articleUrl}`,
  ]
    .filter(Boolean)
    .join('\n')

  const shortHook = [
    summaryLine,
    `Published in ${sectionLabel} on Mendpress.`,
  ].join(' ')

  return {
    articleTitle,
    articleUrl,
    primaryPost,
    shortHook,
    suggestedImageNote: mendpressSuggestedLinkedInImage(source),
  }
}

export function mendpressSectionIdForType(type: EditorialType): MendpressSectionId {
  switch (type) {
    case 'essay':
      return 'editorial'
    case 'profile':
      return 'dialogue'
    case 'field_note':
      return 'visual_narrative'
    case 'dispatch':
    case 'invitation':
    case 'project_brief':
      return 'reports'
  }
}

export function mendpressSectionLabel(type: EditorialType): string {
  return MENDPRESS_SECTION_META[mendpressSectionIdForType(type)].label
}

export function mendpressSectionDescription(type: EditorialType): string {
  return MENDPRESS_SECTION_META[mendpressSectionIdForType(type)].description
}

export function mendpressSectionPath(
  value: MendpressSectionId | EditorialType
): string {
  const id = MENDPRESS_SECTION_IDS.includes(value as MendpressSectionId)
    ? (value as MendpressSectionId)
    : mendpressSectionIdForType(value as EditorialType)
  return MENDPRESS_SECTION_META[id].path
}

export function editorialCategoryPath(type: EditorialType): string {
  return mendpressSectionPath(type)
}

export function editorialUrl(slug: string): string {
  return `/mendpress/${slug}`
}

export function editorialAbsoluteUrl(slug: string): string {
  return `${SITE_CONFIG.url}${editorialUrl(slug)}`
}

export function editorialAbsoluteUrlFromPath(path: string): string {
  return `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function estimateReadingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function normalizeIsoString(value: unknown): string | null {
  const raw = trimString(value, 80)
  if (!raw) return null
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function normalizeEntry(row: EditorialDbRow): EditorialEntry {
  const editorialType = sanitizeEditorialType(row.editorial_type)
  const bodyMarkdown = sanitizeEditorialBody(row.body_markdown)
  const publishedAt = normalizeIsoString(row.published_at)

  return {
    id: row.id,
    slug: sanitizeEditorialSlug(row.slug, row.title),
    title: sanitizeEditorialText(row.title, 180),
    summary: sanitizeEditorialText(row.summary, 600),
    bodyMarkdown,
    editorialType,
    status: sanitizeEditorialStatus(row.status),
    publishedAt,
    heroImage: sanitizeHref(row.hero_image),
    primaryCtaLabel: sanitizeEditorialText(row.primary_cta_label, 120) || null,
    primaryCtaHref: sanitizeHref(row.primary_cta_href),
    seoTitle: sanitizeEditorialText(row.seo_title, 180) || null,
    seoDescription: sanitizeEditorialText(row.seo_description, 300) || null,
    tags: sanitizeEditorialTags(row.tags),
    byline: sanitizeEditorialText(row.byline, 120) || null,
    pinned: Boolean(row.pinned),
    createdAt: normalizeIsoString(row.created_at),
    updatedAt: normalizeIsoString(row.updated_at),
    path: editorialUrl(row.slug),
    categoryPath: editorialCategoryPath(editorialType),
    readingTimeMinutes: estimateReadingTimeMinutes(
      [row.title, row.summary, bodyMarkdown].filter(Boolean).join(' ')
    ),
  }
}

function editorialQuery(client: SupabaseClient) {
  return client.from('editorial_entries').select(EDITORIAL_SELECT)
}

function logEditorialReadError(scope: string, error: unknown) {
  console.warn(`[Editorial] ${scope} failed`, error)
}

export async function listPublishedEditorialEntries(options?: {
  type?: EditorialType
  types?: EditorialType[]
  limit?: number
  excludeSlug?: string
}): Promise<EditorialEntry[]> {
  const supabase = getSupabaseServer()
  if (!supabase) return []

  let query = editorialQuery(supabase)
    .eq('status', 'published')
    .order('pinned', { ascending: false })
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })

  const normalizedTypes = Array.isArray(options?.types)
    ? Array.from(new Set(options.types.map((type) => sanitizeEditorialType(type))))
    : []

  if (normalizedTypes.length > 1) {
    query = query.in('editorial_type', normalizedTypes)
  } else if (normalizedTypes.length === 1) {
    query = query.eq('editorial_type', normalizedTypes[0])
  } else if (options?.type) {
    query = query.eq('editorial_type', options.type)
  }
  if (options?.excludeSlug) {
    query = query.neq('slug', sanitizeEditorialSlug(options.excludeSlug))
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query
  if (error || !data) {
    logEditorialReadError('list published entries', error)
    return []
  }

  return (data as EditorialDbRow[]).map(normalizeEntry)
}

export async function getPublishedEditorialEntryBySlug(
  slug: string
): Promise<EditorialEntry | null> {
  const supabase = getSupabaseServer()
  if (!supabase) return null

  const { data, error } = await editorialQuery(supabase)
    .eq('slug', sanitizeEditorialSlug(slug))
    .eq('status', 'published')
    .limit(1)
    .maybeSingle()

  if (error || !data) {
    if (error) logEditorialReadError(`get published slug ${slug}`, error)
    return null
  }

  return normalizeEntry(data as EditorialDbRow)
}

export async function getEditorialEntryByIdForAdmin(id: string): Promise<EditorialEntry | null> {
  const supabase = getSupabaseServer()
  if (!supabase) return null

  const { data, error } = await editorialQuery(supabase).eq('id', id).limit(1).maybeSingle()

  if (error || !data) {
    if (error) logEditorialReadError(`get admin entry ${id}`, error)
    return null
  }

  return normalizeEntry(data as EditorialDbRow)
}

export async function listEditorialEntriesForAdmin(limit = 24): Promise<EditorialEntry[]> {
  const supabase = getSupabaseServer()
  if (!supabase) return []

  const { data, error } = await editorialQuery(supabase)
    .order('updated_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !data) {
    logEditorialReadError('list admin entries', error)
    return []
  }

  return (data as EditorialDbRow[]).map(normalizeEntry)
}

export async function listRelatedEditorialEntries(
  entry: EditorialEntry,
  limit = 3
): Promise<EditorialEntry[]> {
  const candidates = await listPublishedEditorialEntries({ limit: 40, excludeSlug: entry.slug })
  if (!candidates.length) return []

  const withScore = candidates.map((candidate) => {
    const sharedTags = candidate.tags.filter((tag) => entry.tags.includes(tag)).length
    const score =
      (candidate.editorialType === entry.editorialType ? 5 : 0) +
      sharedTags * 3 +
      (candidate.pinned ? 1 : 0)

    return { candidate, score }
  })

  return withScore
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (b.candidate.publishedAt || '').localeCompare(a.candidate.publishedAt || '')
    })
    .map((item) => item.candidate)
    .slice(0, limit)
}

export function buildEditorialWritePayload(body: Record<string, unknown>) {
  const title = sanitizeEditorialText(body.title, 180)
  const slug = sanitizeEditorialSlug(body.slug, title)
  const summary = sanitizeEditorialText(body.summary, 600)
  const bodyMarkdown = sanitizeEditorialBody(body.bodyMarkdown, 80_000)
  const editorialType = sanitizeEditorialType(body.editorialType)
  const status = sanitizeEditorialStatus(body.status)
  const publishedAtInput = sanitizeEditorialText(body.publishedAt, 40)
  const publishedAt =
    status === 'published'
      ? normalizeIsoString(publishedAtInput || new Date().toISOString())
      : publishedAtInput
        ? normalizeIsoString(publishedAtInput)
        : null

  if (!title || !slug || !summary || !bodyMarkdown) {
    return null
  }

  return {
    slug,
    title,
    summary,
    body_markdown: bodyMarkdown,
    editorial_type: editorialType,
    status,
    published_at: publishedAt,
    hero_image: sanitizeHref(body.heroImage),
    primary_cta_label: sanitizeEditorialText(body.primaryCtaLabel, 120) || null,
    primary_cta_href: sanitizeHref(body.primaryCtaHref),
    seo_title: sanitizeEditorialText(body.seoTitle, 180) || null,
    seo_description: sanitizeEditorialText(body.seoDescription, 300) || null,
    tags: sanitizeEditorialTags(body.tags),
    byline: sanitizeEditorialText(body.byline, 120) || null,
    pinned: Boolean(body.pinned),
    updated_at: new Date().toISOString(),
  }
}

export function defaultEditorialPrimaryCta(entry: EditorialEntry): EditorialLink {
  if (entry.primaryCtaLabel && entry.primaryCtaHref) {
    return {
      label: entry.primaryCtaLabel,
      href: entry.primaryCtaHref,
      external: entry.primaryCtaHref.startsWith('http') || entry.primaryCtaHref.startsWith('mailto:'),
    }
  }

  switch (entry.editorialType) {
    case 'essay':
      return { label: 'Request Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true }
    case 'field_note':
      return { label: 'Plan Your Visit', href: '/visit' }
    case 'profile':
      return { label: 'Start a Conversation', href: GALLERY_VIEWING_REQUEST_MAILTO, external: true }
    case 'invitation':
      return { label: 'See What Is On', href: '/events' }
    case 'project_brief':
      return { label: 'Start Feasibility Check', href: SSD_LANDING.feasibility }
    case 'dispatch':
      return { label: 'Subscribe to Bayview Notes', href: '/newsletter' }
  }
}

export function editorialContextLinks(entry: EditorialEntry): EditorialLink[] {
  switch (entry.editorialType) {
    case 'essay':
      return [
        { label: 'Subscribe', href: '/newsletter' },
        { label: 'Gallery', href: GALLERY_EXTERNAL.archive, external: true },
      ]
    case 'field_note':
      return [
        { label: 'Visit Bayview Hub', href: '/visit' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'profile':
      return [
        { label: 'Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'invitation':
      return [
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Visit', href: '/visit' },
      ]
    case 'project_brief':
      return [
        { label: 'Feasibility', href: SSD_LANDING.feasibility },
        { label: 'Partners', href: '/partners' },
      ]
    case 'dispatch':
      return [
        { label: 'Mendpress', href: '/mendpress' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
  }
}

export function formatEditorialDate(value: string | null): string {
  if (!value) return 'Draft'
  return new Date(value).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function groupEditorialEntries(entries: EditorialEntry[]): EditorialSection[] {
  return MENDPRESS_SECTION_IDS.map((id) => ({
    id,
    label: MENDPRESS_SECTION_META[id].label,
    description: MENDPRESS_SECTION_META[id].description,
    path: MENDPRESS_SECTION_META[id].path,
    entries: entries.filter((entry) => mendpressSectionIdForType(entry.editorialType) === id),
  })).filter((section) => section.entries.length > 0)
}

export function editorialStatusMatches(entry: EditorialEntry, filter: EditorialStatusFilter): boolean {
  return filter === 'all' ? true : entry.status === filter
}

export function editorialTypeMatches(
  entry: EditorialEntry,
  filter: EditorialType | 'all'
): boolean {
  return filter === 'all' ? true : entry.editorialType === filter
}

export const MENDPRESS_CATEGORY_LINKS = [
  { id: 'all', label: 'All', href: '/mendpress' },
  { id: 'editorial', label: 'Editorial', href: '/mendpress/editorial' },
  { id: 'dialogue', label: 'Dialogue', href: '/mendpress/dialogue' },
  { id: 'visual_narrative', label: 'Visual Narrative', href: '/mendpress/visual-narrative' },
  { id: 'reports', label: 'Programme', href: '/mendpress/reports' },
] as const
