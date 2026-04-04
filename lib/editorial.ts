import { type SupabaseClient } from '@supabase/supabase-js'
import {
  GALLERY_EXTERNAL,
  GALLERY_VIEWING_REQUEST_MAILTO,
  SITE_CONFIG,
  SSD_LANDING,
} from '@/lib/constants'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const EDITORIAL_TYPES = [
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
] as const

export const EDITORIAL_DESK_TYPES = [
  'editorial',
  'essay',
  'conversation',
  'interview',
  'audio_essay',
  'podcast_episode',
  'field_note',
  'profile',
] as const

export const AUDIO_FIRST_EDITORIAL_TYPES = ['audio_essay', 'podcast_episode'] as const
export const WRITTEN_EDITORIAL_TYPES = [
  'editorial',
  'essay',
  'conversation',
  'interview',
  'field_note',
  'profile',
] as const

export const EDITORIAL_STATUSES = ['draft', 'published'] as const

export type EditorialType = (typeof EDITORIAL_TYPES)[number]
export type EditorialStatus = (typeof EDITORIAL_STATUSES)[number]
export type EditorialStatusFilter = EditorialStatus | 'all'
export type EditorialMode = 'written' | 'audio' | 'hybrid'
export type EditorialLocale = 'en' | 'zh'
export const MENDPRESS_SECTION_IDS = ['editorial', 'dialogue', 'visual_narrative', 'reports'] as const
export type MendpressSectionId = (typeof MENDPRESS_SECTION_IDS)[number]

type EditorialTypeMeta = {
  label: string
  zhLabel: string
  pluralLabel: string
  zhPluralLabel: string
  categoryPath: string
  description: string
  zhDescription: string
}

export const EDITORIAL_TYPE_META: Record<EditorialType, EditorialTypeMeta> = {
  editorial: {
    label: 'Editorial',
    zhLabel: '评论',
    pluralLabel: 'Editorial',
    zhPluralLabel: '主编稿',
    categoryPath: '/mendpress/editorial',
    description: 'Foundational editorial pieces and public statements from Mendpress.',
    zhDescription: 'Mendpress 的主编式文章、公开判断与立场文本。',
  },
  essay: {
    label: 'Essay',
    zhLabel: '随笔',
    pluralLabel: 'Essays',
    zhPluralLabel: '随笔',
    categoryPath: '/mendpress/editorial',
    description: 'Longer-form pieces on art, place, hospitality, and cultural meaning.',
    zhDescription: '围绕艺术、场所、款待与文化意义展开的较长篇写作。',
  },
  conversation: {
    label: 'Conversation',
    zhLabel: '对谈',
    pluralLabel: 'Conversations',
    zhPluralLabel: '对话',
    categoryPath: '/mendpress/dialogue',
    description: 'Written exchanges that stay close to voice, method, and lived conversation.',
    zhDescription: '保持声音感、方法感与真实交谈纹理的书面对话。',
  },
  interview: {
    label: 'Interview',
    zhLabel: '访谈',
    pluralLabel: 'Interviews',
    zhPluralLabel: '访谈',
    categoryPath: '/mendpress/dialogue',
    description: 'Structured Q&A pieces, interviews, and profile-led conversations.',
    zhDescription: '结构化问答、访谈与以人物为核心的交流文本。',
  },
  audio_essay: {
    label: 'Audio Essay',
    zhLabel: '音频评论',
    pluralLabel: 'Audio Essays',
    zhPluralLabel: '音频随笔',
    categoryPath: '/mendpress/editorial',
    description: 'Voice-led editorials, narrated essays, and spoken pieces shaped for listening.',
    zhDescription: '以声音为主导、为聆听而组织的主编稿、朗读型随笔与 spoken piece。',
  },
  podcast_episode: {
    label: 'Podcast Episode',
    zhLabel: '播客单集',
    pluralLabel: 'Podcast Episodes',
    zhPluralLabel: '播客单集',
    categoryPath: '/mendpress/dialogue',
    description: 'Audio-first episodes, interviews, and spoken conversations published through Mendpress.',
    zhDescription: '通过 Mendpress 发布的音频优先单集、访谈与 spoken conversation。',
  },
  field_note: {
    label: 'Field Note',
    zhLabel: '田野笔记',
    pluralLabel: 'Field Notes',
    zhPluralLabel: '现场笔记',
    categoryPath: '/mendpress/visual-narrative',
    description: 'Shorter notes from the estate as a living place.',
    zhDescription: '从庄园生活现场生长出来的较短篇观察与笔记。',
  },
  profile: {
    label: 'Profile',
    zhLabel: '人物特写',
    pluralLabel: 'Profiles',
    zhPluralLabel: '人物稿',
    categoryPath: '/mendpress/dialogue',
    description: 'People-centred pieces on artists, partners, hosts, and collaborators.',
    zhDescription: '聚焦艺术家、合作方、主理人与协作者的人物型文章。',
  },
  invitation: {
    label: 'Invitation',
    zhLabel: '邀请函',
    pluralLabel: 'Invitations',
    zhPluralLabel: '邀请函',
    categoryPath: '/mendpress/reports',
    description: 'Elegant, share-ready pages for exhibitions, dinners, events, and viewings.',
    zhDescription: '面向展览、晚宴、活动与 viewing 的公开邀请型页面。',
  },
  project_brief: {
    label: 'Project Brief',
    zhLabel: '项目简报',
    pluralLabel: 'Projects',
    zhPluralLabel: '项目简报',
    categoryPath: '/mendpress/reports',
    description: 'Commercially serious explainers for projects, opportunities, and participation paths.',
    zhDescription: '面向项目、机会与参与路径的公开说明文本。',
  },
  dispatch: {
    label: 'Dispatch',
    zhLabel: '发布札记',
    pluralLabel: 'Dispatches',
    zhPluralLabel: '发布札记',
    categoryPath: '/mendpress/reports',
    description: 'Shorter editorial notes with a sharper point of view.',
    zhDescription: '更短、更直接、观点更明确的主编式发布札记。',
  },
}

export type EditorialEntry = {
  id: string
  slug: string
  title: string
  titleZh: string | null
  summary: string
  summaryZh: string | null
  bodyMarkdown: string
  bodyMarkdownZh: string | null
  editorialType: EditorialType
  status: EditorialStatus
  publishedAt: string | null
  heroImage: string | null
  primaryCtaLabel: string | null
  primaryCtaHref: string | null
  seoTitle: string | null
  seoTitleZh: string | null
  seoDescription: string | null
  seoDescriptionZh: string | null
  tags: string[]
  byline: string | null
  pinned: boolean
  audioUrl: string | null
  audioDurationSeconds: number | null
  transcriptMarkdown: string | null
  transcriptMarkdownZh: string | null
  showNotesMarkdown: string | null
  showNotesMarkdownZh: string | null
  speakers: string[]
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
  title_zh?: string | null
  summary: string | null
  summary_zh?: string | null
  body_markdown: string | null
  body_markdown_zh?: string | null
  editorial_type: string | null
  status: string | null
  published_at: string | null
  hero_image: string | null
  primary_cta_label: string | null
  primary_cta_href: string | null
  seo_title: string | null
  seo_title_zh?: string | null
  seo_description: string | null
  seo_description_zh?: string | null
  tags: string[] | null
  byline: string | null
  pinned: boolean | null
  audio_url?: string | null
  audio_duration_seconds?: number | null
  transcript_markdown?: string | null
  transcript_markdown_zh?: string | null
  show_notes_markdown?: string | null
  show_notes_markdown_zh?: string | null
  speakers?: string[] | null
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
  zhLabel: string
  description: string
  zhDescription: string
  path: string
}

export const MENDPRESS_SECTION_META: Record<MendpressSectionId, MendpressSectionMeta> = {
  editorial: {
    label: 'Editorial',
    zhLabel: '评论',
    description: 'Interpretive pieces, essays, and longer-form editorial framing from Bayview Hub.',
    zhDescription: '围绕 Bayview Hub 的评论文章、随笔与更长篇的编辑性写作。',
    path: '/mendpress/editorial',
  },
  dialogue: {
    label: 'Dialogue',
    zhLabel: '对话',
    description: 'Profiles, conversations, and people-centred pieces with a clearer human voice.',
    zhDescription: '以人物、对谈、访谈与更鲜明的人声为中心的栏目。',
    path: '/mendpress/dialogue',
  },
  visual_narrative: {
    label: 'Visual Narrative',
    zhLabel: '视觉叙事',
    description: 'Place-based and image-led writing shaped by atmosphere, weather, objects, and lived time.',
    zhDescription: '以场所、图像、天气、物件与日常时间感为线索的视觉叙事写作。',
    path: '/mendpress/visual-narrative',
  },
  reports: {
    label: 'Programme',
    zhLabel: '项目发布',
    description: 'Dispatches, invitations, briefs, and contextual publication material gathered for Mendpress.',
    zhDescription: '围绕 Mendpress 的发布札记、邀请函、项目简报与相关语境材料。',
    path: '/mendpress/reports',
  },
}

const EDITORIAL_SELECT_BASE =
  'id,slug,title,summary,body_markdown,editorial_type,status,published_at,hero_image,primary_cta_label,primary_cta_href,seo_title,seo_description,tags,byline,pinned,created_at,updated_at'

const EDITORIAL_SELECT_AUDIO =
  `${EDITORIAL_SELECT_BASE},audio_url,audio_duration_seconds,transcript_markdown,show_notes_markdown,speakers`

const EDITORIAL_SELECT_BILINGUAL =
  `${EDITORIAL_SELECT_AUDIO},title_zh,summary_zh,body_markdown_zh,seo_title_zh,seo_description_zh,transcript_markdown_zh,show_notes_markdown_zh`

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

export function sanitizeEditorialSpeakers(value: unknown): string[] {
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
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 8)
    )
  )
}

export function isAudioFirstEditorialType(type: EditorialType): boolean {
  return AUDIO_FIRST_EDITORIAL_TYPES.includes(type as (typeof AUDIO_FIRST_EDITORIAL_TYPES)[number])
}

export function inferEditorialMode(entry: Pick<EditorialEntry, 'editorialType' | 'audioUrl' | 'bodyMarkdown'>): EditorialMode {
  if (isAudioFirstEditorialType(entry.editorialType)) return 'audio'
  if (entry.audioUrl || bodyContainsAudioBlock(entry.bodyMarkdown)) return 'hybrid'
  return 'written'
}

function bodyContainsAudioBlock(body: string): boolean {
  return /!audio\[[^\]]*\]\([^)]+\)/.test(body)
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
  return EDITORIAL_TYPES.includes(value as EditorialType) ? (value as EditorialType) : 'editorial'
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

export function editorialTypeLabelForLocale(type: EditorialType, locale: EditorialLocale): string {
  return locale === 'zh' ? EDITORIAL_TYPE_META[type].zhLabel : EDITORIAL_TYPE_META[type].label
}

export function editorialPluralLabel(type: EditorialType): string {
  return EDITORIAL_TYPE_META[type].pluralLabel
}

export function editorialPluralLabelForLocale(type: EditorialType, locale: EditorialLocale): string {
  return locale === 'zh' ? EDITORIAL_TYPE_META[type].zhPluralLabel : EDITORIAL_TYPE_META[type].pluralLabel
}

export function editorialTypeDescription(type: EditorialType): string {
  return EDITORIAL_TYPE_META[type].description
}

export function editorialTypeDescriptionForLocale(type: EditorialType, locale: EditorialLocale): string {
  return locale === 'zh' ? EDITORIAL_TYPE_META[type].zhDescription : EDITORIAL_TYPE_META[type].description
}

export function editorialTypeAdminLabel(type: EditorialType): string {
  return editorialTypeLabel(type)
}

export function editorialTypeAdminHint(type: EditorialType): string {
  return `"${editorialTypeLabel(type)}" publishes under Mendpress section "${mendpressSectionLabel(type)}".`
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
    case 'editorial':
      return 'It is intended as a public-facing editorial text rather than campaign copy.'
    case 'essay':
      return 'It is intended as a public-facing editorial text rather than campaign copy.'
    case 'conversation':
      return 'The emphasis is on exchange, method, and a strong human voice carried in public.'
    case 'interview':
      return 'The emphasis is on a clear interview structure, with attention to the subject rather than generic promotion.'
    case 'audio_essay':
      return 'The emphasis is on voice, pacing, and a spoken editorial line rather than a text-only essay.'
    case 'podcast_episode':
      return 'The emphasis is on listening first, while still holding the piece inside the Mendpress editorial world.'
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
    case 'editorial':
      return `${prefix} Prefer a composed editorial still, artwork detail, or image that can hold a public statement.`
    case 'essay':
      return `${prefix} Prefer a single artwork detail, installation view, or quietly composed landscape image.`
    case 'conversation':
      return `${prefix} Prefer a portrait, table view, studio image, or any frame that suggests exchange and presence.`
    case 'interview':
      return `${prefix} Prefer a portrait or documentary image that keeps the focus on the subject and context.`
    case 'audio_essay':
      return `${prefix} Prefer a restrained cover image, landscape, or artwork detail that holds up as listening artwork.`
    case 'podcast_episode':
      return `${prefix} Prefer a strong cover image, guest portrait, or still that reads clearly at small sizes.`
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
    case 'editorial':
    case 'essay':
    case 'audio_essay':
      return 'editorial'
    case 'conversation':
    case 'interview':
    case 'profile':
    case 'podcast_episode':
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

export function mendpressSectionLabelForLocale(type: EditorialType, locale: EditorialLocale): string {
  const meta = MENDPRESS_SECTION_META[mendpressSectionIdForType(type)]
  return locale === 'zh' ? meta.zhLabel : meta.label
}

export function mendpressSectionDescription(type: EditorialType): string {
  return MENDPRESS_SECTION_META[mendpressSectionIdForType(type)].description
}

export function mendpressSectionDescriptionForLocale(type: EditorialType, locale: EditorialLocale): string {
  const meta = MENDPRESS_SECTION_META[mendpressSectionIdForType(type)]
  return locale === 'zh' ? meta.zhDescription : meta.description
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
  return words ? Math.max(1, Math.ceil(words / 220)) : 0
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
  const bodyMarkdownZh = sanitizeEditorialBody(row.body_markdown_zh, 80_000) || null
  const publishedAt = normalizeIsoString(row.published_at)

  return {
    id: row.id,
    slug: sanitizeEditorialSlug(row.slug, row.title),
    title: sanitizeEditorialText(row.title, 180),
    titleZh: sanitizeEditorialText(row.title_zh, 180) || null,
    summary: sanitizeEditorialText(row.summary, 600),
    summaryZh: sanitizeEditorialText(row.summary_zh, 600) || null,
    bodyMarkdown,
    bodyMarkdownZh,
    editorialType,
    status: sanitizeEditorialStatus(row.status),
    publishedAt,
    heroImage: sanitizeHref(row.hero_image),
    primaryCtaLabel: sanitizeEditorialText(row.primary_cta_label, 120) || null,
    primaryCtaHref: sanitizeHref(row.primary_cta_href),
    seoTitle: sanitizeEditorialText(row.seo_title, 180) || null,
    seoTitleZh: sanitizeEditorialText(row.seo_title_zh, 180) || null,
    seoDescription: sanitizeEditorialText(row.seo_description, 300) || null,
    seoDescriptionZh: sanitizeEditorialText(row.seo_description_zh, 300) || null,
    tags: sanitizeEditorialTags(row.tags),
    byline: sanitizeEditorialText(row.byline, 120) || null,
    pinned: Boolean(row.pinned),
    audioUrl: sanitizeHref(row.audio_url),
    audioDurationSeconds:
      typeof row.audio_duration_seconds === 'number' && Number.isFinite(row.audio_duration_seconds)
        ? Math.max(1, Math.round(row.audio_duration_seconds))
        : null,
    transcriptMarkdown: sanitizeEditorialBody(row.transcript_markdown, 120_000) || null,
    transcriptMarkdownZh: sanitizeEditorialBody(row.transcript_markdown_zh, 120_000) || null,
    showNotesMarkdown: sanitizeEditorialBody(row.show_notes_markdown, 80_000) || null,
    showNotesMarkdownZh: sanitizeEditorialBody(row.show_notes_markdown_zh, 80_000) || null,
    speakers: sanitizeEditorialSpeakers(row.speakers),
    createdAt: normalizeIsoString(row.created_at),
    updatedAt: normalizeIsoString(row.updated_at),
    path: editorialUrl(row.slug),
    categoryPath: editorialCategoryPath(editorialType),
    readingTimeMinutes: estimateReadingTimeMinutes(
      [row.title, row.summary, bodyMarkdown].filter(Boolean).join(' ')
    ),
  }
}

function editorialQuery(client: SupabaseClient, level: 'bilingual' | 'audio' | 'base' = 'bilingual') {
  const select =
    level === 'bilingual'
      ? EDITORIAL_SELECT_BILINGUAL
      : level === 'audio'
        ? EDITORIAL_SELECT_AUDIO
        : EDITORIAL_SELECT_BASE

  return client.from('editorial_entries').select(select)
}

function logEditorialReadError(scope: string, error: unknown) {
  console.warn(`[Editorial] ${scope} failed`, error)
}

export function editorialMissingColumnError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const message = 'message' in error && typeof error.message === 'string' ? error.message : ''
  const details = 'details' in error && typeof error.details === 'string' ? error.details : ''
  const hint = 'hint' in error && typeof error.hint === 'string' ? error.hint : ''
  const code = 'code' in error && typeof error.code === 'string' ? error.code : ''
  const joined = `${message} ${details} ${hint}`.toLowerCase()
  return code === '42703' || code === 'PGRST204' || joined.includes('audio_') || joined.includes('transcript_markdown') || joined.includes('show_notes_markdown') || joined.includes('speakers') || joined.includes('title_zh') || joined.includes('summary_zh') || joined.includes('body_markdown_zh') || joined.includes('seo_title_zh') || joined.includes('seo_description_zh') || joined.includes('transcript_markdown_zh') || joined.includes('show_notes_markdown_zh')
}

export function editorialMissingAudioWriteColumnError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const message = 'message' in error && typeof error.message === 'string' ? error.message : ''
  const details = 'details' in error && typeof error.details === 'string' ? error.details : ''
  const hint = 'hint' in error && typeof error.hint === 'string' ? error.hint : ''
  const code = 'code' in error && typeof error.code === 'string' ? error.code : ''
  const joined = `${message} ${details} ${hint}`.toLowerCase()

  return (
    code === '42703' ||
    code === 'PGRST204' ||
    joined.includes('audio_url') ||
    joined.includes('audio_duration_seconds') ||
    joined.includes('transcript_markdown') ||
    joined.includes('show_notes_markdown') ||
    joined.includes('speakers') ||
    joined.includes('title_zh') ||
    joined.includes('summary_zh') ||
    joined.includes('body_markdown_zh') ||
    joined.includes('seo_title_zh') ||
    joined.includes('seo_description_zh') ||
    joined.includes('transcript_markdown_zh') ||
    joined.includes('show_notes_markdown_zh')
  )
}

const EDITORIAL_BILINGUAL_WRITE_COLUMNS = [
  'title_zh',
  'summary_zh',
  'body_markdown_zh',
  'seo_title_zh',
  'seo_description_zh',
  'transcript_markdown_zh',
  'show_notes_markdown_zh',
] as const

const EDITORIAL_AUDIO_WRITE_COLUMNS = [
  'audio_url',
  'audio_duration_seconds',
  'transcript_markdown',
  'show_notes_markdown',
  'speakers',
] as const

function omitEditorialWriteColumns(
  payload: Record<string, unknown>,
  keys: readonly string[]
): Record<string, unknown> {
  const next = { ...payload }
  for (const key of keys) {
    delete next[key]
  }
  return next
}

export function editorialWritePayloadFallbacks(payload: Record<string, unknown>): Record<string, unknown>[] {
  const variants = [
    payload,
    omitEditorialWriteColumns(payload, EDITORIAL_BILINGUAL_WRITE_COLUMNS),
    omitEditorialWriteColumns(payload, EDITORIAL_AUDIO_WRITE_COLUMNS),
    omitEditorialWriteColumns(payload, [...EDITORIAL_BILINGUAL_WRITE_COLUMNS, ...EDITORIAL_AUDIO_WRITE_COLUMNS]),
  ]

  const unique = new Map<string, Record<string, unknown>>()
  for (const variant of variants) {
    const key = JSON.stringify(variant)
    if (!unique.has(key)) {
      unique.set(key, variant)
    }
  }

  return Array.from(unique.values())
}

export async function listPublishedEditorialEntries(options?: {
  type?: EditorialType
  types?: EditorialType[]
  limit?: number
  excludeSlug?: string
  strictRecency?: boolean
}): Promise<EditorialEntry[]> {
  const supabase = getSupabaseServer()
  if (!supabase) return []

  const runQuery = async (level: 'bilingual' | 'audio' | 'base') => {
    let query = editorialQuery(supabase, level).eq('status', 'published')

    if (!options?.strictRecency) {
      query = query.order('pinned', { ascending: false })
    }

    query = query.order('published_at', { ascending: false }).order('created_at', { ascending: false })

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

    return query
  }

  let { data, error } = await runQuery('bilingual')
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await runQuery('audio'))
  }
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await runQuery('base'))
  }
  if (error || !data) {
    logEditorialReadError('list published entries', error)
    return []
  }

  return (data as unknown as EditorialDbRow[]).map(normalizeEntry)
}

export async function getPublishedEditorialEntryBySlug(
  slug: string
): Promise<EditorialEntry | null> {
  const supabase = getSupabaseServer()
  if (!supabase) return null

  const runQuery = (level: 'bilingual' | 'audio' | 'base') =>
    editorialQuery(supabase, level)
      .eq('slug', sanitizeEditorialSlug(slug))
      .eq('status', 'published')
      .limit(1)
      .maybeSingle()

  let { data, error } = await runQuery('bilingual')
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await runQuery('audio'))
  }
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await runQuery('base'))
  }

  if (error || !data) {
    if (error) logEditorialReadError(`get published slug ${slug}`, error)
    return null
  }

  return normalizeEntry(data as unknown as EditorialDbRow)
}

export async function getEditorialEntryByIdForAdmin(id: string): Promise<EditorialEntry | null> {
  const supabase = getSupabaseServer()
  if (!supabase) return null

  let { data, error } = await editorialQuery(supabase, 'bilingual').eq('id', id).limit(1).maybeSingle()
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await editorialQuery(supabase, 'audio').eq('id', id).limit(1).maybeSingle())
  }
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await editorialQuery(supabase, 'base').eq('id', id).limit(1).maybeSingle())
  }

  if (error || !data) {
    if (error) logEditorialReadError(`get admin entry ${id}`, error)
    return null
  }

  return normalizeEntry(data as unknown as EditorialDbRow)
}

export async function listEditorialEntriesForAdmin(limit = 24): Promise<EditorialEntry[]> {
  const supabase = getSupabaseServer()
  if (!supabase) return []

  let { data, error } = await editorialQuery(supabase, 'bilingual')
    .order('updated_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await editorialQuery(supabase, 'audio')
      .order('updated_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit))
  }
  if (error && editorialMissingColumnError(error)) {
    ;({ data, error } = await editorialQuery(supabase, 'base')
      .order('updated_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit))
  }

  if (error || !data) {
    logEditorialReadError('list admin entries', error)
    return []
  }

  return (data as unknown as EditorialDbRow[]).map(normalizeEntry)
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

export function buildEditorialWritePayload(body: Record<string, unknown>): {
  payload: Record<string, unknown> | null
  error: string | null
} {
  const title = sanitizeEditorialText(body.title, 180)
  const titleZh = sanitizeEditorialText(body.titleZh, 180) || null
  const slug = sanitizeEditorialSlug(body.slug, title)
  const summary = sanitizeEditorialText(body.summary, 600)
  const summaryZh = sanitizeEditorialText(body.summaryZh, 600) || null
  const bodyMarkdown = sanitizeEditorialBody(body.bodyMarkdown, 80_000)
  const bodyMarkdownZh = sanitizeEditorialBody(body.bodyMarkdownZh, 80_000) || null
  const editorialType = sanitizeEditorialType(body.editorialType)
  const editorialMode = body.editorialMode === 'audio' || body.editorialMode === 'hybrid' ? body.editorialMode : 'written'
  const status = sanitizeEditorialStatus(body.status)
  const publishedAtInput = sanitizeEditorialText(body.publishedAt, 40)
  const audioUrl = sanitizeHref(body.audioUrl)
  const transcriptMarkdown = sanitizeEditorialBody(body.transcriptMarkdown, 120_000) || null
  const transcriptMarkdownZh = sanitizeEditorialBody(body.transcriptMarkdownZh, 120_000) || null
  const showNotesMarkdown = sanitizeEditorialBody(body.showNotesMarkdown, 80_000) || null
  const showNotesMarkdownZh = sanitizeEditorialBody(body.showNotesMarkdownZh, 80_000) || null
  const speakers = sanitizeEditorialSpeakers(body.speakers)
  const audioDurationSeconds =
    typeof body.audioDurationSeconds === 'number' && Number.isFinite(body.audioDurationSeconds)
      ? Math.max(1, Math.round(body.audioDurationSeconds))
      : typeof body.audioDurationSeconds === 'string' && body.audioDurationSeconds.trim()
        ? (() => {
            const parsed = Number(body.audioDurationSeconds)
            return Number.isFinite(parsed) && parsed > 0 ? Math.max(1, Math.round(parsed)) : null
          })()
        : null
  const publishedAt =
    status === 'published'
      ? normalizeIsoString(publishedAtInput || new Date().toISOString())
      : publishedAtInput
        ? normalizeIsoString(publishedAtInput)
        : null

  if (!title || !summary) {
    return { payload: null, error: 'Title and summary are required.' }
  }

  if ((editorialMode === 'written' || editorialMode === 'hybrid') && !bodyMarkdown) {
    return { payload: null, error: 'Body is required for written and hybrid pieces.' }
  }

  if (isAudioFirstEditorialType(editorialType) && !audioUrl) {
    return { payload: null, error: 'Audio file or URL is required for audio-first pieces.' }
  }

  if (status === 'published' && editorialMode === 'hybrid' && !audioUrl && !bodyContainsAudioBlock(bodyMarkdown)) {
    return { payload: null, error: 'Hybrid pieces need a main audio file or at least one embedded audio block before publishing.' }
  }

  return {
    error: null,
    payload: {
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
      title_zh: titleZh,
      summary_zh: summaryZh,
      body_markdown_zh: bodyMarkdownZh,
      seo_title_zh: sanitizeEditorialText(body.seoTitleZh, 180) || null,
      seo_description: sanitizeEditorialText(body.seoDescription, 300) || null,
      seo_description_zh: sanitizeEditorialText(body.seoDescriptionZh, 300) || null,
      tags: sanitizeEditorialTags(body.tags),
      byline: sanitizeEditorialText(body.byline, 120) || null,
      pinned: Boolean(body.pinned),
      audio_url: audioUrl,
      audio_duration_seconds: audioDurationSeconds,
      transcript_markdown: transcriptMarkdown,
      transcript_markdown_zh: transcriptMarkdownZh,
      show_notes_markdown: showNotesMarkdown,
      show_notes_markdown_zh: showNotesMarkdownZh,
      speakers,
      updated_at: new Date().toISOString(),
    },
  }
}

export function editorialTitleForLocale(entry: EditorialEntry, locale: EditorialLocale): string {
  return locale === 'zh' ? entry.titleZh || entry.title : entry.title
}

export function editorialSummaryForLocale(entry: EditorialEntry, locale: EditorialLocale): string {
  return locale === 'zh' ? entry.summaryZh || entry.summary : entry.summary
}

export function editorialBodyForLocale(entry: EditorialEntry, locale: EditorialLocale): string {
  return locale === 'zh' ? entry.bodyMarkdownZh || entry.bodyMarkdown : entry.bodyMarkdown
}

export function editorialSeoTitleForLocale(entry: EditorialEntry, locale: EditorialLocale): string | null {
  return locale === 'zh' ? entry.seoTitleZh || entry.seoTitle : entry.seoTitle
}

export function editorialSeoDescriptionForLocale(entry: EditorialEntry, locale: EditorialLocale): string | null {
  return locale === 'zh' ? entry.seoDescriptionZh || entry.seoDescription : entry.seoDescription
}

export function editorialTranscriptForLocale(entry: EditorialEntry, locale: EditorialLocale): string | null {
  return locale === 'zh' ? entry.transcriptMarkdownZh || null : entry.transcriptMarkdown
}

export function editorialShowNotesForLocale(entry: EditorialEntry, locale: EditorialLocale): string | null {
  return locale === 'zh' ? entry.showNotesMarkdownZh || null : entry.showNotesMarkdown
}

export function editorialHasChineseCardContent(entry: EditorialEntry): boolean {
  return Boolean(entry.titleZh || entry.summaryZh)
}

export function editorialHasChinesePageContent(entry: EditorialEntry): boolean {
  const hasChineseReadingLayer = Boolean(
    entry.bodyMarkdownZh || entry.transcriptMarkdownZh || entry.showNotesMarkdownZh
  )

  if (isAudioFirstEditorialType(entry.editorialType) || entry.audioUrl) {
    return Boolean(entry.titleZh && entry.summaryZh && hasChineseReadingLayer)
  }

  return Boolean(entry.titleZh && entry.summaryZh && entry.bodyMarkdownZh)
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
    case 'editorial':
      return { label: 'Read Mendpress', href: '/mendpress/editorial' }
    case 'essay':
      return { label: 'Request Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true }
    case 'conversation':
      return { label: 'Subscribe to Bayview Notes', href: '/newsletter' }
    case 'interview':
      return { label: 'Start a Conversation', href: GALLERY_VIEWING_REQUEST_MAILTO, external: true }
    case 'audio_essay':
      return { label: 'Listen on Mendpress', href: entry.path }
    case 'podcast_episode':
      return { label: 'Listen on Mendpress', href: entry.path }
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
    case 'editorial':
      return [
        { label: 'Mendpress', href: '/mendpress' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'essay':
      return [
        { label: 'Subscribe', href: '/newsletter' },
        { label: 'Gallery', href: GALLERY_EXTERNAL.archive, external: true },
      ]
    case 'conversation':
      return [
        { label: 'Dialogue', href: '/mendpress/dialogue' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'interview':
      return [
        { label: 'Dialogue', href: '/mendpress/dialogue' },
        { label: 'Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true },
      ]
    case 'audio_essay':
      return [
        { label: 'Editorial', href: '/mendpress/editorial' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'podcast_episode':
      return [
        { label: 'Dialogue', href: '/mendpress/dialogue' },
        { label: 'Subscribe', href: '/newsletter' },
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

export function formatEditorialDate(value: string | null, locale: EditorialLocale = 'en'): string {
  if (!value) return 'Draft'
  return new Date(value).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function groupEditorialEntries(
  entries: EditorialEntry[],
  locale: EditorialLocale = 'en'
): EditorialSection[] {
  return MENDPRESS_SECTION_IDS.map((id) => ({
    id,
    label: locale === 'zh' ? MENDPRESS_SECTION_META[id].zhLabel : MENDPRESS_SECTION_META[id].label,
    description:
      locale === 'zh' ? MENDPRESS_SECTION_META[id].zhDescription : MENDPRESS_SECTION_META[id].description,
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
