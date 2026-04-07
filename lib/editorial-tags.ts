import type { EditorialType } from '@/lib/editorial'

export const EDITORIAL_TAG_MIN_RECOMMENDED = 2
export const EDITORIAL_TAG_MAX = 5

export const EDITORIAL_TAG_GROUPS = [
  {
    id: 'primary',
    label: 'Primary tags',
    tags: [
      '内在生活',
      '在场',
      '真实经验',
      '自我修复',
      '注意力',
      '慢生活',
      '连接与共同体',
      '人与自然',
      '艺术与生活',
      '当代生活反思',
    ],
  },
  {
    id: 'system',
    label: 'System tags',
    tags: ['内在安顿', '自我疏离', '感知恢复', '关系修复', '身体与感官', '时间与节奏', '经验深化'],
  },
  {
    id: 'context',
    label: 'Context tags',
    tags: ['艺术体验', '音乐现场', '花园与自然', '食物与共享', '工作坊', '空间与氛围', '共同在场'],
  },
  {
    id: 'editorial',
    label: 'Editorial tags',
    tags: ['编辑部文章', '思想写作', '公共对话', '视觉叙事', '现场记录', '文化观察'],
  },
] as const

export const EDITORIAL_TAGS = EDITORIAL_TAG_GROUPS.flatMap((group) => group.tags)
export type EditorialTag = (typeof EDITORIAL_TAGS)[number]

const EDITORIAL_TAG_SET = new Set<string>(EDITORIAL_TAGS)

function coerceEditorialTagInput(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

export function isEditorialTag(value: unknown): value is EditorialTag {
  return typeof value === 'string' && EDITORIAL_TAG_SET.has(value)
}

export function sanitizeCuratedEditorialTags(value: unknown): EditorialTag[] {
  return Array.from(
    new Set(coerceEditorialTagInput(value).filter((item): item is EditorialTag => isEditorialTag(item)))
  )
}

export function validateEditorialTagsInput(value: unknown): {
  tags: EditorialTag[]
  error: string | null
} {
  const raw = coerceEditorialTagInput(value)
  const invalid = raw.filter((item) => !isEditorialTag(item))
  if (invalid.length) {
    return {
      tags: sanitizeCuratedEditorialTags(raw),
      error: 'Tags must come from the curated Mendpress tag list only.',
    }
  }

  const tags = sanitizeCuratedEditorialTags(raw)
  if (tags.length > EDITORIAL_TAG_MAX) {
    return {
      tags,
      error: `Select no more than ${EDITORIAL_TAG_MAX} tags.`,
    }
  }

  return { tags, error: null }
}

export function suggestedEditorialTagsForType(type: EditorialType): EditorialTag[] {
  switch (type) {
    case 'editorial':
    case 'essay':
    case 'audio_essay':
      return ['内在生活', '在场', '真实经验', '思想写作']
    case 'conversation':
    case 'interview':
    case 'profile':
    case 'podcast_episode':
      return ['公共对话', '连接与共同体', '共同在场']
    case 'visual_essay':
    case 'photo_story':
    case 'artwork_reading':
      return ['视觉叙事', '艺术与生活', '感知恢复']
    case 'programme_note':
    case 'invitation':
    case 'report':
    case 'event_notice':
      return ['现场记录', '艺术体验', '连接与共同体']
    default:
      return ['内在生活', '在场']
  }
}

export function topEditorialTags(tags: string[], limit = 3): EditorialTag[] {
  return sanitizeCuratedEditorialTags(tags).slice(0, limit)
}
