import { type SupabaseClient } from '@supabase/supabase-js'
import {
  SITE_CONFIG,
} from '@/lib/constants'
import {
  sanitizeCuratedEditorialTags,
  validateEditorialTagsInput,
} from '@/lib/editorial-tags'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const EDITORIAL_TYPES = [
  'editorial',
  'essay',
  'audio_essay',
  'conversation',
  'interview',
  'profile',
  'podcast_episode',
  'visual_essay',
  'photo_story',
  'artwork_reading',
  'programme_note',
  'invitation',
  'report',
  'event_notice',
] as const

export const LEGACY_EDITORIAL_TYPE_ALIASES = {
  field_note: 'visual_essay',
  project_brief: 'programme_note',
  dispatch: 'report',
} as const

export const EDITORIAL_DESK_TYPES = [
  'editorial',
  'essay',
  'audio_essay',
  'conversation',
  'interview',
  'profile',
  'podcast_episode',
  'visual_essay',
  'photo_story',
  'artwork_reading',
  'programme_note',
  'invitation',
  'report',
  'event_notice',
] as const

export const AUDIO_FIRST_EDITORIAL_TYPES = ['audio_essay', 'podcast_episode'] as const
export const WRITTEN_EDITORIAL_TYPES = [
  'editorial',
  'essay',
  'conversation',
  'interview',
  'profile',
  'visual_essay',
  'photo_story',
  'artwork_reading',
  'programme_note',
  'invitation',
  'report',
  'event_notice',
] as const

export const EDITORIAL_STATUSES = ['draft', 'published', 'archived'] as const

export type EditorialType = (typeof EDITORIAL_TYPES)[number]
export type LegacyEditorialType = keyof typeof LEGACY_EDITORIAL_TYPE_ALIASES
export type EditorialStatus = (typeof EDITORIAL_STATUSES)[number]
export type EditorialStatusFilter = EditorialStatus | 'all'
export type EditorialMode = 'written' | 'audio' | 'hybrid'
export type EditorialLocale = 'en' | 'zh'
export const MENDPRESS_SECTION_IDS = ['editorial', 'dialogue', 'visual_narrative', 'programme'] as const
export type MendpressSectionId = (typeof MENDPRESS_SECTION_IDS)[number]

const EDITORIAL_LOCALE_HERO_IMAGE_OVERRIDES: Partial<Record<string, Partial<Record<EditorialLocale, string>>>> = {
  'from-mend-to-mendpress-to-bayview-hub': {
    en: '/images/mendpress/from-mend-to-mendpress-to-bayview-hub-en.png',
    zh: '/images/mendpress/from-mend-to-mendpress-to-bayview-hub-cn.png',
  },
  'in-the-age-of-ai-learning-again-how-to-see-hear-and-be-present': {
    en: '/images/mendpress/in-the-age-of-ai-presence-cover-en.png',
    zh: '/images/mendpress/in-the-age-of-ai-presence-cover-cn.png',
  },
}

export const MENDPRESS_AUDIO_HUB_ROUTE = '/mendpress/listen'
export const MENDPRESS_AUDIO_HUB_PODCAST_THRESHOLD = 3
export const MENDPRESS_AUDIO_HUB_TOTAL_THRESHOLD = 5
export const MENDPRESS_AUDIO_HUB_TYPES = ['podcast_episode', 'audio_essay'] as const

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
  visual_essay: {
    label: 'Visual Essay',
    zhLabel: '视觉随笔',
    pluralLabel: 'Visual Essays',
    zhPluralLabel: '视觉随笔',
    categoryPath: '/mendpress/visual-narrative',
    description: 'Image-led essays shaped by atmosphere, sequence, and visual interpretation.',
    zhDescription: '以图像、氛围、顺序与视觉判断展开的长短篇视觉随笔。',
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
  photo_story: {
    label: 'Photo Story',
    zhLabel: '图像故事',
    pluralLabel: 'Photo Stories',
    zhPluralLabel: '图像故事',
    categoryPath: '/mendpress/visual-narrative',
    description: 'Photographic sequences and visual stories carried through caption, framing, and pace.',
    zhDescription: '通过摄影序列、图像编排与简洁文字展开的图像故事。',
  },
  artwork_reading: {
    label: 'Artwork Reading',
    zhLabel: '作品解读',
    pluralLabel: 'Artwork Readings',
    zhPluralLabel: '作品解读',
    categoryPath: '/mendpress/visual-narrative',
    description: 'Close readings of artworks, installations, and visual details published through Mendpress.',
    zhDescription: '围绕作品、装置与视觉细节展开的近距离阅读文本。',
  },
  programme_note: {
    label: 'Programme Note',
    zhLabel: '项目说明',
    pluralLabel: 'Programme Notes',
    zhPluralLabel: '项目说明',
    categoryPath: '/mendpress/programme',
    description: 'Context-setting notes that frame Bayview Hub programmes, events, and public invitations.',
    zhDescription: '为 Bayview Hub 的项目、活动与公开邀请提供语境的项目说明。',
  },
  invitation: {
    label: 'Invitation',
    zhLabel: '邀请函',
    pluralLabel: 'Invitations',
    zhPluralLabel: '邀请函',
    categoryPath: '/mendpress/programme',
    description: 'Elegant, share-ready pages for exhibitions, dinners, events, and viewings.',
    zhDescription: '面向展览、晚宴、活动与 viewing 的公开邀请型页面。',
  },
  report: {
    label: 'Report',
    zhLabel: '项目报告',
    pluralLabel: 'Reports',
    zhPluralLabel: '项目报告',
    categoryPath: '/mendpress/programme',
    description: 'Reports, summaries, and public records connected to programmes, gatherings, and cultural work.',
    zhDescription: '围绕项目、聚会与文化工作形成的公开报告、总结与记录。',
  },
  event_notice: {
    label: 'Event Notice',
    zhLabel: '活动告示',
    pluralLabel: 'Event Notices',
    zhPluralLabel: '活动告示',
    categoryPath: '/mendpress/programme',
    description: 'Direct public notices for upcoming programmes, events, and time-sensitive announcements.',
    zhDescription: '面向即将发生的 programme、活动与时效性公告的公开告示。',
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

export type EditorialCollectionDiagnostics = {
  entries: EditorialEntry[]
  hadQueryError: boolean
  skippedRowCount: number
  sourceLevel: 'bilingual' | 'audio' | 'base' | 'none'
}

export type EditorialVisibilityReport = {
  slug: string
  status: 'published' | 'not_published' | 'missing'
  publicPath: string
  zhPath: string
}

export type MendpressAudioHubState = {
  isReady: boolean
  featured: EditorialEntry | null
  podcastEpisodes: EditorialEntry[]
  audioEssays: EditorialEntry[]
  podcastEpisodeCount: number
  totalAudioCount: number
}

export type MendpressNextStepCopy = {
  eyebrow: string
  title: string
  body: string
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
  programme: {
    label: 'Programme',
    zhLabel: '项目',
    description: 'Programme notes, invitations, reports, and public-facing notices gathered through Mendpress.',
    zhDescription: '围绕 Mendpress 的 programme note、邀请函、项目报告与公开告示栏目。',
    path: '/mendpress/programme',
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

function canonicalEditorialType(value: unknown): EditorialType | null {
  const raw = trimString(value, 80)
  if (!raw) return null

  if (raw in LEGACY_EDITORIAL_TYPE_ALIASES) {
    return LEGACY_EDITORIAL_TYPE_ALIASES[raw as LegacyEditorialType]
  }

  return EDITORIAL_TYPES.includes(raw as EditorialType) ? (raw as EditorialType) : null
}

function editorialDbTypesForQuery(types: EditorialType[]): string[] {
  const expanded = new Set<string>()

  for (const type of types) {
    expanded.add(type)
    if (type === 'visual_essay') expanded.add('field_note')
    if (type === 'programme_note') expanded.add('project_brief')
    if (type === 'report') expanded.add('dispatch')
  }

  return Array.from(expanded)
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
  return canonicalEditorialType(value) || 'editorial'
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
  switch (type) {
    case 'podcast_episode':
      return 'Podcast Episode = Dialogue.'
    case 'audio_essay':
      return 'Audio Essay = Editorial.'
    case 'interview':
      return 'Interview = Dialogue.'
    case 'essay':
      return 'Essay = Editorial.'
    default:
      return `${editorialTypeLabel(type)} = ${mendpressSectionLabel(type)}.`
  }
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
    case 'programme':
      return 'It frames Bayview Hub’s public programme through notes, invitations, reports, and live notices.'
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
    case 'audio_essay':
      return 'The emphasis is on voice, pacing, and a spoken editorial line rather than a text-only essay.'
    case 'conversation':
      return 'The emphasis is on exchange, method, and a strong human voice carried in public.'
    case 'interview':
      return 'The emphasis is on a clear interview structure, with attention to the subject rather than generic promotion.'
    case 'profile':
      return 'The emphasis is on voice, practice, and the relationship between people and place.'
    case 'podcast_episode':
      return 'The emphasis is on listening first, while still holding the piece inside the Mendpress editorial world.'
    case 'visual_essay':
    case 'photo_story':
    case 'artwork_reading':
      return 'The emphasis is on atmosphere, sequence, and what can only be understood by staying with the image.'
    case 'programme_note':
    case 'invitation':
    case 'report':
    case 'event_notice':
      return 'The emphasis is on what is being convened, and why the invitation matters in public.'
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
    case 'visual_essay':
    case 'photo_story':
    case 'artwork_reading':
      return `${prefix} Prefer an atmospheric landscape, object detail, or image-led sequence opener.`
    case 'programme_note':
    case 'invitation':
    case 'report':
    case 'event_notice':
      return `${prefix} Prefer the event image, invitation artwork, or the clearest programme-facing visual.`
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
    case 'visual_essay':
    case 'photo_story':
    case 'artwork_reading':
      return 'visual_narrative'
    case 'programme_note':
    case 'invitation':
    case 'report':
    case 'event_notice':
      return 'programme'
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

export function editorialPublicPaths(slug: string, type: EditorialType): string[] {
  const sectionPath = mendpressSectionPath(type)
  const articlePath = editorialUrl(slug)
  return [
    '/mendpress',
    '/mendpress/editorial',
    '/mendpress/dialogue',
    '/mendpress/visual-narrative',
    '/mendpress/programme',
    '/mendpress/listen',
    '/zh/mendpress',
    '/zh/mendpress/editorial',
    '/zh/mendpress/dialogue',
    '/zh/mendpress/visual-narrative',
    '/zh/mendpress/programme',
    '/zh/mendpress/listen',
    sectionPath,
    `/zh${sectionPath}`,
    articlePath,
    `/zh${articlePath}`,
  ]
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
  const slug = sanitizeEditorialSlug(row.slug, row.title)
  const bodyMarkdown = sanitizeEditorialBody(row.body_markdown)
  const bodyMarkdownZh = sanitizeEditorialBody(row.body_markdown_zh, 80_000) || null
  const publishedAt = normalizeIsoString(row.published_at)

  return {
    id: row.id,
    slug,
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
    tags: sanitizeCuratedEditorialTags(row.tags),
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
    path: editorialUrl(slug),
    categoryPath: editorialCategoryPath(editorialType),
    readingTimeMinutes: estimateReadingTimeMinutes(
      [row.title, row.summary, bodyMarkdown].filter(Boolean).join(' ')
    ),
  }
}

function safeNormalizeEntry(row: EditorialDbRow, scope: string): EditorialEntry | null {
  try {
    return normalizeEntry(row)
  } catch (error) {
    logEditorialReadError(`${scope} normalize entry`, error)
    return null
  }
}

function safeNormalizeEntries(
  rows: EditorialDbRow[],
  scope: string
): { entries: EditorialEntry[]; skippedRowCount: number } {
  const entries: EditorialEntry[] = []
  let skippedRowCount = 0

  for (const row of rows) {
    const entry = safeNormalizeEntry(row, scope)
    if (entry) {
      entries.push(entry)
    } else {
      skippedRowCount += 1
    }
  }

  return { entries, skippedRowCount }
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

export async function listPublishedEditorialEntriesWithDiagnostics(options?: {
  type?: EditorialType
  types?: EditorialType[]
  limit?: number
  excludeSlug?: string
  strictRecency?: boolean
}): Promise<EditorialCollectionDiagnostics> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    logEditorialReadError('list published entries', 'Supabase server client not configured')
    return {
      entries: [],
      hadQueryError: true,
      skippedRowCount: 0,
      sourceLevel: 'none',
    }
  }

  const runQuery = async (level: 'bilingual' | 'audio' | 'base') => {
    let query = editorialQuery(supabase, level).eq('status', 'published')

    if (!options?.strictRecency) {
      query = query.order('pinned', { ascending: false })
    }

    query = query.order('published_at', { ascending: false }).order('created_at', { ascending: false })

    const normalizedTypes = Array.isArray(options?.types)
      ? Array.from(new Set(options.types.map((type) => sanitizeEditorialType(type))))
      : []

    if (normalizedTypes.length > 0) {
      const dbTypes = editorialDbTypesForQuery(normalizedTypes)
      query = dbTypes.length === 1 ? query.eq('editorial_type', dbTypes[0]) : query.in('editorial_type', dbTypes)
    } else if (options?.type) {
      const dbTypes = editorialDbTypesForQuery([sanitizeEditorialType(options.type)])
      query = dbTypes.length === 1 ? query.eq('editorial_type', dbTypes[0]) : query.in('editorial_type', dbTypes)
    }
    if (options?.excludeSlug) {
      query = query.neq('slug', sanitizeEditorialSlug(options.excludeSlug))
    }
    if (options?.limit) {
      query = query.limit(options.limit)
    }

    return query
  }

  let sourceLevel: 'bilingual' | 'audio' | 'base' | 'none' = 'bilingual'
  let { data, error } = await runQuery('bilingual')
  if (error && editorialMissingColumnError(error)) {
    sourceLevel = 'audio'
    ;({ data, error } = await runQuery('audio'))
  }
  if (error && editorialMissingColumnError(error)) {
    sourceLevel = 'base'
    ;({ data, error } = await runQuery('base'))
  }
  if (error || !data) {
    logEditorialReadError('list published entries', error)
    return {
      entries: [],
      hadQueryError: true,
      skippedRowCount: 0,
      sourceLevel,
    }
  }

  const normalized = safeNormalizeEntries(data as unknown as EditorialDbRow[], 'list published entries')
  return {
    entries: normalized.entries,
    hadQueryError: false,
    skippedRowCount: normalized.skippedRowCount,
    sourceLevel,
  }
}

export async function listPublishedEditorialEntries(options?: {
  type?: EditorialType
  types?: EditorialType[]
  limit?: number
  excludeSlug?: string
  strictRecency?: boolean
}): Promise<EditorialEntry[]> {
  return (await listPublishedEditorialEntriesWithDiagnostics(options)).entries
}

function compareEditorialRecency(a: EditorialEntry, b: EditorialEntry): number {
  if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned)
  return (b.publishedAt || '').localeCompare(a.publishedAt || '')
}

export function isMendpressAudioHubReady(counts: {
  podcastEpisodeCount: number
  totalAudioCount: number
}): boolean {
  return (
    counts.podcastEpisodeCount >= MENDPRESS_AUDIO_HUB_PODCAST_THRESHOLD ||
    counts.totalAudioCount >= MENDPRESS_AUDIO_HUB_TOTAL_THRESHOLD
  )
}

export async function getMendpressAudioHubState(): Promise<MendpressAudioHubState> {
  const [podcastEpisodes, audioEssays] = await Promise.all([
    listPublishedEditorialEntries({
      types: ['podcast_episode'],
      limit: 24,
      strictRecency: true,
    }),
    listPublishedEditorialEntries({
      types: ['audio_essay'],
      limit: 24,
      strictRecency: true,
    }),
  ])

  const featured = [...podcastEpisodes, ...audioEssays].sort(compareEditorialRecency)[0] || null
  const podcastEpisodeCount = podcastEpisodes.length
  const totalAudioCount = podcastEpisodes.length + audioEssays.length

  return {
    isReady: isMendpressAudioHubReady({ podcastEpisodeCount, totalAudioCount }),
    featured,
    podcastEpisodes,
    audioEssays,
    podcastEpisodeCount,
    totalAudioCount,
  }
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

  return safeNormalizeEntry(data as unknown as EditorialDbRow, `get published slug ${slug}`)
}

export async function verifyEditorialPublicVisibility(slug: string): Promise<EditorialVisibilityReport> {
  const publicPath = editorialUrl(slug)
  const zhPath = `/zh${publicPath}`
  const entry = await getPublishedEditorialEntryBySlug(slug)

  if (!entry) {
    return {
      slug,
      status: 'missing',
      publicPath,
      zhPath,
    }
  }

  return {
    slug,
    status: entry.status === 'published' ? 'published' : 'not_published',
    publicPath,
    zhPath,
  }
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

  return safeNormalizeEntry(data as unknown as EditorialDbRow, `get admin entry ${id}`)
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

  return safeNormalizeEntries(data as unknown as EditorialDbRow[], 'list admin entries').entries
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
  const { tags, error: tagError } = validateEditorialTagsInput(body.tags)

  if (!title || !summary) {
    return { payload: null, error: 'Title and summary are required.' }
  }

  if (tagError) {
    return { payload: null, error: tagError }
  }

  if ((editorialMode === 'written' || editorialMode === 'hybrid') && !bodyMarkdown) {
    return { payload: null, error: 'Body is required for written and hybrid pieces.' }
  }

  if (isAudioFirstEditorialType(editorialType) && !audioUrl) {
    return { payload: null, error: 'Audio file or URL is required for audio-first pieces.' }
  }

  if (status === 'published' && isAudioFirstEditorialType(editorialType)) {
    if (!transcriptMarkdown) {
      return { payload: null, error: 'Audio-first pieces need a transcript before publishing.' }
    }
    if (!showNotesMarkdown && !bodyMarkdown) {
      return { payload: null, error: 'Audio-first pieces need show notes or companion text before publishing.' }
    }
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
      tags,
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

export function editorialHeroImageForLocale(entry: EditorialEntry, locale: EditorialLocale): string | null {
  return EDITORIAL_LOCALE_HERO_IMAGE_OVERRIDES[entry.slug]?.[locale] || entry.heroImage
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

export function mendpressNextStepCopy(
  type: EditorialType,
  locale: EditorialLocale = 'en'
): MendpressNextStepCopy {
  const section = mendpressSectionIdForType(type)

  if (locale === 'zh') {
    switch (section) {
      case 'editorial':
        return {
          eyebrow: '接下来',
          title: '继续阅读 Mendpress',
          body: '继续阅读 Editorial，浏览更多 Mendpress，或订阅接下来的新文章。',
        }
      case 'dialogue':
        return {
          eyebrow: '接下来',
          title: '继续阅读 Mendpress',
          body: '继续阅读 Dialogue，浏览更多对话内容，或订阅接下来的新文章。',
        }
      case 'visual_narrative':
        return {
          eyebrow: '接下来',
          title: '继续阅读 Mendpress',
          body: '继续阅读 Visual Narrative，浏览更多以图像为主的作品，或订阅后续发布。',
        }
      case 'programme':
        return {
          eyebrow: '接下来',
          title: '继续了解 Bayview Hub',
          body: '浏览即将到来的 programme，返回 Mendpress，或规划一次到访 Bayview Hub。',
        }
    }
  }

  switch (section) {
    case 'editorial':
      return {
        eyebrow: 'WHERE TO NEXT',
        title: 'Continue with Mendpress',
        body: 'Continue through Editorial, explore more from Mendpress, or subscribe for future pieces.',
      }
    case 'dialogue':
      return {
        eyebrow: 'WHERE TO NEXT',
        title: 'Continue with Mendpress',
        body: 'Continue through Dialogue, explore more conversations, or subscribe for future pieces.',
      }
    case 'visual_narrative':
      return {
        eyebrow: 'WHERE TO NEXT',
        title: 'Continue with Mendpress',
        body: 'Continue through Visual Narrative, explore more image-led pieces, or subscribe for future work.',
      }
    case 'programme':
      return {
        eyebrow: 'WHERE TO NEXT',
        title: 'Continue with Mendpress',
        body: 'Explore upcoming programmes, return to Mendpress, or plan a visit to Bayview Hub.',
      }
  }
}

export function defaultEditorialPrimaryCta(
  entry: EditorialEntry,
  options?: { audioHubReady?: boolean }
): EditorialLink {
  const audioHubReady = Boolean(options?.audioHubReady)

  switch (entry.editorialType) {
    case 'editorial':
    case 'essay':
    case 'audio_essay':
      return { label: 'Continue with Editorial', href: '/mendpress/editorial' }
    case 'conversation':
    case 'interview':
    case 'profile':
      return { label: 'More from Dialogue', href: '/mendpress/dialogue' }
    case 'podcast_episode':
      return audioHubReady
        ? { label: 'Listen on Mendpress', href: MENDPRESS_AUDIO_HUB_ROUTE }
        : { label: 'Listen now', href: '#listen' }
    case 'visual_essay':
    case 'photo_story':
    case 'artwork_reading':
      return { label: 'Explore Visual Narrative', href: '/mendpress/visual-narrative' }
    case 'programme_note':
    case 'invitation':
    case 'report':
    case 'event_notice':
      return { label: 'See what’s on', href: '/events' }
  }
}

export function editorialContextLinks(entry: EditorialEntry): EditorialLink[] {
  switch (mendpressSectionIdForType(entry.editorialType)) {
    case 'editorial':
      return [
        { label: 'Editorial', href: '/mendpress/editorial' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'dialogue':
      return [
        { label: 'Dialogue', href: '/mendpress/dialogue' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'visual_narrative':
      return [
        { label: 'Visual Narrative', href: '/mendpress/visual-narrative' },
        { label: 'Subscribe', href: '/newsletter' },
      ]
    case 'programme':
      return [
        { label: 'Programme', href: '/mendpress/programme' },
        { label: 'Visit', href: '/visit' },
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
  { id: 'programme', label: 'Programme', href: '/mendpress/programme' },
] as const
