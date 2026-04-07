import { buildShareMailto, facebookShareUrl, linkedInShareUrl } from '@/lib/share-links'
import { distributionQrUrl } from '@/lib/distribution/qr'
import { buildTrackedDistributionUrl, defaultDistributionUtmFields, normalizeDistributionUtmFields } from '@/lib/distribution/utm'
import type {
  DistributionAnalysisResult,
  DistributionPlatform,
  DistributionRecommendationStatus,
  DistributionSharePack,
  DistributionUtmFields,
} from '@/lib/distribution/types'

type SharePackBuilderInput = {
  analysis: DistributionAnalysisResult
  platform: DistributionPlatform
  utmOverride?: Partial<DistributionUtmFields> | null
}

type CopyLocale = 'en' | 'zh'

function containsChinese(value: string | null | undefined): boolean {
  return Boolean(value && /[\u3400-\u9fff]/.test(value))
}

function containsLatin(value: string | null | undefined): boolean {
  return Boolean(value && /[A-Za-z]/.test(value))
}

function shortText(value: string, max = 280): string {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, Math.max(0, max - 3)).trimEnd()}...`
}

function cleanTitle(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/\s+\|\s+Bayview Hub(?: [^|]+)?$/i, '')
    .replace(/\s+—\s+Bayview Hub$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function firstNonEmpty(values: Array<string | null | undefined>): string | null {
  for (const value of values) {
    if (value && value.trim()) return value.trim()
  }
  return null
}

function firstMatching(values: Array<string | null | undefined>, predicate: (value: string) => boolean): string | null {
  for (const value of values) {
    if (value && value.trim() && predicate(value.trim())) return value.trim()
  }
  return null
}

function descriptorLabel(pageType: DistributionAnalysisResult['pageType'], locale: CopyLocale): string {
  switch (pageType) {
    case 'editorial_article':
      return locale === 'zh' ? '主编文章' : 'editorial article'
    case 'dialogue_article':
      return locale === 'zh' ? '对话文章' : 'dialogue piece'
    case 'visual_narrative':
      return locale === 'zh' ? '视觉叙事' : 'visual narrative'
    case 'report_article':
      return locale === 'zh' ? '报告文章' : 'report'
    case 'gallery_landing':
      return locale === 'zh' ? '画廊页面' : 'gallery page'
    case 'gallery_protocol':
      return locale === 'zh' ? '画廊协议页' : 'gallery protocol page'
    case 'ssd_landing':
      return locale === 'zh' ? 'SSD 指南' : 'SSD guide'
    case 'campaign_landing':
      return locale === 'zh' ? '活动页面' : 'campaign page'
    case 'hub_page':
      return locale === 'zh' ? '站点页面' : 'hub page'
    default:
      return locale === 'zh' ? '页面' : 'page'
  }
}

function recommendationStatus(
  analysis: DistributionAnalysisResult,
  platform: DistributionPlatform
): DistributionRecommendationStatus {
  if (analysis.recommendedPlatforms.slice(0, 3).includes(platform)) return 'recommended'
  if (analysis.recommendedPlatforms.includes(platform)) return 'use_with_care'
  return 'not_primary'
}

function recommendationLabel(status: DistributionRecommendationStatus): string {
  switch (status) {
    case 'recommended':
      return 'Recommended'
    case 'use_with_care':
      return 'Use with care'
    default:
      return 'Not primary'
  }
}

function chinesePack(title: string, body: string, trackedUrl: string): string {
  return [title.trim(), body.trim(), trackedUrl].filter(Boolean).join('\n\n')
}

function preferredTitle(analysis: DistributionAnalysisResult, locale: CopyLocale): string {
  const htmlTitle = cleanTitle(analysis.metadata.title)
  const ogTitle = cleanTitle(analysis.metadata.ogTitle)
  const twitterTitle = cleanTitle(analysis.metadata.twitterTitle)
  const h1 = cleanTitle(analysis.metadata.h1)

  if (locale === 'zh') {
    const chineseTitle = firstMatching([h1, ogTitle, twitterTitle, htmlTitle], (value) => containsChinese(value))
    if (chineseTitle) return chineseTitle
    const fallback = firstNonEmpty([h1, ogTitle, twitterTitle, htmlTitle]) || 'Bayview Hub'
    return containsChinese(fallback) ? fallback : `《${fallback}》`
  }

  return (
    firstMatching([ogTitle, twitterTitle, h1, htmlTitle], (value) => !containsChinese(value) || containsLatin(value)) ||
    firstNonEmpty([ogTitle, twitterTitle, h1, htmlTitle]) ||
    'Bayview Hub'
  )
}

function zhDescriptionFallback(analysis: DistributionAnalysisResult): string {
  const descriptor = descriptorLabel(analysis.pageType, 'zh')
  switch (analysis.pageType) {
    case 'ssd_landing':
      return '这是一页来自 Bayview Hub 的 SSD 指南，适合先打开原页查看规则、路径与下一步。'
    case 'gallery_landing':
    case 'gallery_protocol':
      return `这是一页来自 Bayview Hub 的${descriptor}，适合先打开原页了解其策展与访问方式。`
    default:
      return `这是一页来自 Bayview Hub 的${descriptor}，可先打开原页，再决定如何转发。`
  }
}

function enDescriptionFallback(analysis: DistributionAnalysisResult): string {
  const descriptor = descriptorLabel(analysis.pageType, 'en')
  switch (analysis.pageType) {
    case 'ssd_landing':
      return 'A Bayview Hub SSD guide worth opening in full before sharing onward.'
    case 'gallery_landing':
    case 'gallery_protocol':
      return `A Bayview Hub ${descriptor} worth opening in full before sharing onward.`
    default:
      return `A Bayview Hub ${descriptor} worth reviewing via the tracked link below.`
  }
}

function preferredDescription(analysis: DistributionAnalysisResult, locale: CopyLocale): string {
  const candidates = [analysis.metadata.ogDescription, analysis.metadata.twitterDescription, analysis.metadata.metaDescription]

  if (locale === 'zh') {
    const chinese = firstMatching(candidates, (value) => containsChinese(value))
    if (!chinese) return zhDescriptionFallback(analysis)
    const segments = chinese
      .split(/(?<=[。！？.!?])\s+/)
      .map((segment) => segment.trim())
      .filter(Boolean)
    const localizedSegments = segments.filter((segment) => containsChinese(segment))
    return localizedSegments.length ? localizedSegments.join(' ') : chinese
  }

  return (
    firstMatching(candidates, (value) => !containsChinese(value) || containsLatin(value)) ||
    firstNonEmpty(candidates) ||
    enDescriptionFallback(analysis)
  )
}

function copyLocaleForPlatform(platform: DistributionPlatform, pageLocale: DistributionAnalysisResult['locale']): CopyLocale {
  if (platform === 'wechat' || platform === 'xiaohongshu') return 'zh'
  return pageLocale
}

function zhLeadTitleForChinesePlatforms(analysis: DistributionAnalysisResult): string {
  const title = preferredTitle(analysis, 'zh')
  if (containsChinese(title)) return title
  const normalized = cleanTitle(title).replace(/^《+/, '').replace(/》+$/, '')
  return `《${normalized}》`
}

function linkedInBody(analysis: DistributionAnalysisResult, title: string, description: string, trackedUrl: string, locale: CopyLocale): string {
  if (locale === 'zh') {
    return shortText(`来自 Bayview Hub 的一页内容：${description} 链接：${trackedUrl}`, 320)
  }
  return shortText(`${description} Read more: ${trackedUrl}`, 320)
}

function emailBody(analysis: DistributionAnalysisResult, description: string, trackedUrl: string, locale: CopyLocale): string {
  if (locale === 'zh') {
    return shortText(`转你一页来自 Bayview Hub 的内容：${description}\n\n打开链接：${trackedUrl}`, 360)
  }
  return shortText(`Sharing this page from Bayview Hub.\n\n${description}\n\nOpen here: ${trackedUrl}`, 360)
}

function wechatBody(analysis: DistributionAnalysisResult, trackedUrl: string): { title: string; body: string; pack: string } {
  const title = zhLeadTitleForChinesePlatforms(analysis)
  const descriptor = descriptorLabel(analysis.pageType, 'zh')
  const description = preferredDescription(analysis, 'zh')
  const body = containsChinese(description)
    ? shortText(`${description} 适合先扫码打开原页，再带入微信聊天或朋友圈。`, 150)
    : shortText(`Bayview Hub 的一页${descriptor}：${title}。建议先扫码打开原页，再决定是否转发到微信。`, 150)
  return {
    title,
    body,
    pack: chinesePack(title, body, trackedUrl),
  }
}

function xiaohongshuBody(analysis: DistributionAnalysisResult, trackedUrl: string): { title: string; body: string; pack: string } {
  const title = zhLeadTitleForChinesePlatforms(analysis)
  const descriptor = descriptorLabel(analysis.pageType, 'zh')
  const description = preferredDescription(analysis, 'zh')
  const body = containsChinese(description)
    ? shortText(`${description} 更适合先扫码打开，再整理成一则简短笔记说明。`, 130)
    : shortText(`先存这页 Bayview Hub 的${descriptor}：${title}。建议扫码打开原页后，再整理成一则简短笔记。`, 130)
  return {
    title,
    body,
    pack: chinesePack(title, body, trackedUrl),
  }
}

function redditTitleVariants(analysis: DistributionAnalysisResult, title: string, description: string, locale: CopyLocale): string[] {
  const descriptor = descriptorLabel(analysis.pageType, locale)
  if (locale === 'zh') {
    return [
      shortText(title, 140),
      shortText(`这页${descriptor}的 framing 你会买账吗？`, 140),
      shortText(`关于「${title}」的一页内容，值得讨论的点在哪里？`, 140),
    ]
  }

  switch (analysis.pageType) {
    case 'gallery_landing':
      return [
        shortText(title, 140),
        shortText(`Would a private-wall viewing network like this actually work?`, 140),
        shortText(`Private viewing as a curatorial model: ${title}`, 140),
      ]
    case 'ssd_landing':
      return [
        shortText(title, 140),
        shortText(`Is a rules-first SSD guide more useful than a design-first pitch?`, 140),
        shortText(`Victorian SSD guide: ${cleanTitle(title)}`, 140),
      ]
    default:
      return [
        shortText(title, 140),
        shortText(`How does this framing land for you: ${cleanTitle(title)}?`, 140),
        shortText(`${cleanTitle(title)}: substantial editorial framing or project branding?`, 140),
      ]
  }
}

function redditDiscussionBody(analysis: DistributionAnalysisResult, locale: CopyLocale): string {
  if (locale === 'zh') {
    switch (analysis.pageType) {
      case 'gallery_landing':
        return '把这页当作一个策展模型来讨论，而不是单纯转发。它提出的是“私人墙面 + 受控观看关系”的路径，这种方式在你看来成立吗？'
      case 'ssd_landing':
        return '把这页当作讨论起点，而不是推广页。它试图用“规则优先”的方式解释 Victorian SSD，你觉得这种公共表达更有用吗？'
      default:
        return '把这页当作讨论起点，而不是推广页。你会觉得它的 framing 是扎实的，还是过度自我说明？'
    }
  }

  switch (analysis.pageType) {
    case 'gallery_landing':
      return 'Posting this for discussion rather than promotion. The page proposes a mediated private-wall viewing network instead of a public marketplace. Does that feel workable as a curatorial model?'
    case 'ssd_landing':
      return 'Posting this as a discussion prompt, not a promo. The page frames Victorian SSD as a rules-first public guide rather than a sales funnel. Is that actually the more useful approach?'
    default:
      return 'Posting this as a discussion prompt rather than promotion. The page is trying to make a broader argument, not just announce itself. Does the framing feel substantive to you?'
  }
}

function substackIntro(analysis: DistributionAnalysisResult, description: string, trackedUrl: string, locale: CopyLocale): string {
  const descriptor = descriptorLabel(analysis.pageType, locale)
  if (locale === 'zh') {
    return shortText(`这周想分享 Bayview Hub 的一页${descriptor}。与其把它当成社交平台文案，不如把它当成一段可继续展开的编辑入口：${description} 原页链接：${trackedUrl}`, 460)
  }
  return shortText(`One page worth carrying into a newsletter this week from Bayview Hub: ${descriptor} framing with a clearer editorial shape than a standard social post. ${description} Read the full page here: ${trackedUrl}`, 460)
}

function redditUrl(trackedUrl: string, title: string): string {
  const params = new URLSearchParams()
  params.set('url', trackedUrl)
  params.set('title', title)
  return `https://www.reddit.com/submit?${params.toString()}`
}

export function buildDistributionSharePack({
  analysis,
  platform,
  utmOverride,
}: SharePackBuilderInput): DistributionSharePack {
  const fallbackUtm = defaultDistributionUtmFields(platform, analysis.pageType)
  const utm = normalizeDistributionUtmFields(utmOverride, fallbackUtm)
  const trackedUrl = buildTrackedDistributionUrl(analysis.normalizedUrl, utm)
  const locale = copyLocaleForPlatform(platform, analysis.locale)
  const title = preferredTitle(analysis, locale)
  const description = preferredDescription(analysis, locale)
  const status = recommendationStatus(analysis, platform)
  const statusLabel = recommendationLabel(status)

  switch (platform) {
    case 'linkedin':
      return {
        platform,
        platformLabel: 'LinkedIn',
        recommendationStatus: status,
        suggestedTitle: shortText(title, 110),
        suggestedBody: linkedInBody(analysis, title, description, trackedUrl, locale),
        ctaNote:
          locale === 'zh'
            ? '保持专业、克制、可信，不要把 LinkedIn 写成朋友圈感叹。'
            : 'Keep it serious, credible, and restrained. Let the page metadata carry the weight.',
        postingNote:
          locale === 'zh'
            ? `${statusLabel}. 更适合对外公开、职业关系或机构语境。`
            : `${statusLabel}. Best for a professional/public-facing share rather than an informal note.`,
        trackedUrl,
        copyMode: 'copy_text',
        openActionUrl: linkedInShareUrl(trackedUrl),
      }
    case 'facebook':
      return {
        platform,
        platformLabel: 'Facebook',
        recommendationStatus: status,
        suggestedTitle: shortText(title, 110),
        suggestedBody: shortText(`${description}\n\n${trackedUrl}`, 380),
        ctaNote: 'Keep the copy human and readable. Avoid stacking too many context clauses.',
        postingNote: `${statusLabel}. Best for pages with a visual or place-based angle.`,
        trackedUrl,
        copyMode: 'copy_text',
        openActionUrl: facebookShareUrl(trackedUrl),
      }
    case 'email':
      return {
        platform,
        platformLabel: 'Email',
        recommendationStatus: status,
        suggestedTitle: shortText(title, 120),
        suggestedBody: emailBody(analysis, description, trackedUrl, locale),
        ctaNote:
          locale === 'zh'
            ? '把它当成一封简短转发邮件，不要写成社交平台长帖。'
            : 'Use this as a short email handoff, not as a pasted social post.',
        postingNote:
          locale === 'zh'
            ? `${statusLabel}. 主题行尽量贴近标题，正文保持短。`
            : `${statusLabel}. Keep the subject close to the title and the intro tight.`,
        trackedUrl,
        copyMode: 'copy_email_pack',
        openActionUrl: buildShareMailto({
          subject: shortText(title, 120),
          intro: shortText(description, 220),
          url: trackedUrl,
        }),
      }
    case 'wechat': {
      const wechatPack = wechatBody(analysis, trackedUrl)
      return {
        platform,
        platformLabel: 'WeChat',
        recommendationStatus: status,
        suggestedTitle: wechatPack.title,
        suggestedBody: wechatPack.body,
        ctaNote: '先扫码打开原页，再决定是否带入微信聊天、群聊或朋友圈。',
        postingNote: `${statusLabel}. 当前采用的是二维码 handoff，不是直接分享到微信。`,
        trackedUrl,
        copyMode: 'copy_wechat_pack',
        qrUrl: distributionQrUrl(trackedUrl),
        chineseCopyPack: wechatPack.pack,
      }
    }
    case 'xiaohongshu': {
      const xiaohongshuPack = xiaohongshuBody(analysis, trackedUrl)
      return {
        platform,
        platformLabel: 'Xiaohongshu',
        recommendationStatus: status,
        suggestedTitle: xiaohongshuPack.title,
        suggestedBody: xiaohongshuPack.body,
        ctaNote: '把它写成一则简短笔记说明，而不是硬推或夸张口吻。',
        postingNote: `${statusLabel}. 更适合“先扫码打开，再整理成一则短笔记”的 handoff。`,
        trackedUrl,
        copyMode: 'copy_xiaohongshu_pack',
        qrUrl: distributionQrUrl(trackedUrl),
        chineseCopyPack: xiaohongshuPack.pack,
      }
    }
    case 'reddit': {
      const titleVariants = redditTitleVariants(analysis, title, description, locale)
      return {
        platform,
        platformLabel: 'Reddit',
        recommendationStatus: status,
        suggestedTitle: titleVariants[0],
        suggestedBody: shortText(redditDiscussionBody(analysis, locale), 320),
        ctaNote:
          locale === 'zh'
            ? '把它当成讨论提示，而不是品牌转发。'
            : 'Frame this as a discussion prompt, not as “please read our page”.',
        postingNote:
          locale === 'zh'
            ? `${statusLabel}. 只有当它真的能引出讨论时才值得发。`
            : `${statusLabel}. Best only when the page can anchor an actual discussion thread.`,
        trackedUrl,
        copyMode: 'copy_text',
        openActionUrl: redditUrl(trackedUrl, titleVariants[0]),
        titleVariants,
      }
    }
    case 'substack':
      return {
        platform,
        platformLabel: 'Substack',
        recommendationStatus: status,
        suggestedTitle: shortText(title, 120),
        suggestedBody: shortText(description, 260),
        ctaNote:
          locale === 'zh'
            ? '把它当作 newsletter 的导语入口，不要沿用 LinkedIn 式句法。'
            : 'Treat this as newsletter framing, not a pasted social caption.',
        postingNote:
          locale === 'zh'
            ? `${statusLabel}. 更适合带一个简短导语、再放原页链接。`
            : `${statusLabel}. Strongest when the page anchors a short editorial introduction.`,
        trackedUrl,
        copyMode: 'copy_text',
        subtitle: shortText(description, 160),
        introParagraph: substackIntro(analysis, description, trackedUrl, locale),
      }
  }
}

export function buildDistributionSharePacks(
  analysis: DistributionAnalysisResult,
  utmByPlatform: Partial<Record<DistributionPlatform, Partial<DistributionUtmFields>>>
): DistributionSharePack[] {
  return (['linkedin', 'facebook', 'email', 'wechat', 'xiaohongshu', 'reddit', 'substack'] as const).map((platform) =>
    buildDistributionSharePack({
      analysis,
      platform,
      utmOverride: utmByPlatform[platform],
    })
  )
}
