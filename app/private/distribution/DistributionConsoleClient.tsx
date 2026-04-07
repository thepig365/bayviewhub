'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { distributionShareResultStatusLabel } from '@/lib/distribution/result-status'
import { buildDistributionSharePacks } from '@/lib/distribution/share-packs'
import { DISTRIBUTION_LOCAL_QR_NOTE, distributionQrDataUrl } from '@/lib/distribution/local-qr'
import { buildTrackedDistributionUrl, defaultDistributionUtmFields } from '@/lib/distribution/utm'
import type {
  DistributionAnalysisResult,
  DistributionHistoryItem,
  DistributionManualMetrics,
  DistributionPlatform,
  DistributionShareActionRecord,
  DistributionShareActionResultRecord,
  DistributionShareMode,
  DistributionSharePack,
  DistributionShareResultStatus,
  DistributionUtmFields,
} from '@/lib/distribution/types'

const PLATFORMS: DistributionPlatform[] = ['linkedin', 'facebook', 'email', 'wechat', 'xiaohongshu', 'reddit', 'substack']

type AnalyzeResponse =
  | {
      ok: true
      analysis: DistributionAnalysisResult
    }
  | {
      ok: false
      error: string
    }

type LogResponse =
  | {
      ok: true
      action: DistributionShareActionRecord
    }
  | {
      ok: false
      error: string
    }

type ResultResponse =
  | {
      ok: true
      result: DistributionShareActionResultRecord
    }
  | {
      ok: false
      error: string
    }

type HistoryFormState = {
  status: DistributionShareResultStatus
  externalPostUrl: string
  externalPostNotes: string
  likes: string
  comments: string
  shares: string
  opens: string
  subscribers: string
}

function platformLabel(platform: DistributionPlatform) {
  switch (platform) {
    case 'linkedin':
      return 'LinkedIn'
    case 'facebook':
      return 'Facebook'
    case 'email':
      return 'Email'
    case 'wechat':
      return 'WeChat'
    case 'xiaohongshu':
      return 'Xiaohongshu'
    case 'reddit':
      return 'Reddit'
    case 'substack':
      return 'Substack'
  }
}

function initUtmMap(analysis: DistributionAnalysisResult): Record<DistributionPlatform, DistributionUtmFields> {
  return {
    linkedin: defaultDistributionUtmFields('linkedin', analysis.pageType),
    facebook: defaultDistributionUtmFields('facebook', analysis.pageType),
    email: defaultDistributionUtmFields('email', analysis.pageType),
    wechat: defaultDistributionUtmFields('wechat', analysis.pageType),
    xiaohongshu: defaultDistributionUtmFields('xiaohongshu', analysis.pageType),
    reddit: defaultDistributionUtmFields('reddit', analysis.pageType),
    substack: defaultDistributionUtmFields('substack', analysis.pageType),
  }
}

function createHistoryFormState(result: DistributionShareActionResultRecord | null): HistoryFormState {
  const metrics = result?.manualMetrics || {}
  return {
    status: result?.status || 'drafted',
    externalPostUrl: result?.externalPostUrl || '',
    externalPostNotes: result?.externalPostNotes || '',
    likes: stringifyMetric(metrics.likes),
    comments: stringifyMetric(metrics.comments),
    shares: stringifyMetric(metrics.shares),
    opens: stringifyMetric(metrics.opens),
    subscribers: stringifyMetric(metrics.subscribers),
  }
}

function initHistoryFormMap(items: DistributionHistoryItem[]): Record<string, HistoryFormState> {
  return Object.fromEntries(items.map((item) => [item.action.id, createHistoryFormState(item.result)]))
}

function stringifyMetric(value: number | undefined): string {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : ''
}

function metricsFromFormState(form: HistoryFormState): DistributionManualMetrics {
  const next: DistributionManualMetrics = {}
  for (const key of ['likes', 'comments', 'shares', 'opens', 'subscribers'] as const) {
    const raw = form[key].trim()
    if (!raw) continue
    const value = Number(raw)
    if (Number.isFinite(value) && value >= 0) next[key] = Math.round(value)
  }
  return next
}

function packText(pack: DistributionSharePack): string {
  if (pack.platform === 'substack') {
    return [pack.newsletterSubject, pack.suggestedTitle, pack.subtitle, pack.introParagraph, pack.trackedUrl].filter(Boolean).join('\n\n')
  }
  if (pack.platform === 'reddit' && pack.titleVariants?.length) {
    return [pack.titleVariants[0], pack.suggestedBody, pack.suitabilityNote, pack.trackedUrl].filter(Boolean).join('\n\n')
  }
  if (pack.platform === 'wechat') {
    return pack.wechatVariants?.map((variant) => `${variant.label}\n${variant.text}`).join('\n\n') || pack.chineseCopyPack || pack.trackedUrl
  }
  if (pack.platform === 'xiaohongshu') {
    return [
      pack.noteTitleSuggestion || pack.suggestedTitle,
      pack.suggestedBody,
      pack.visualAngleNote,
      pack.tagSuggestions?.length ? `建议标签：${pack.tagSuggestions.join(' / ')}` : null,
      pack.trackedUrl,
    ]
      .filter(Boolean)
      .join('\n\n')
  }
  if (pack.platform === 'email') {
    return [pack.emailSubject || pack.suggestedTitle, pack.emailIntro || pack.suggestedBody, pack.trackedUrl].filter(Boolean).join('\n\n')
  }
  return [pack.suggestedTitle, pack.suggestedBody, pack.trackedUrl].filter(Boolean).join('\n\n')
}

function recommendationTone(status: DistributionSharePack['recommendationStatus']) {
  switch (status) {
    case 'recommended':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    case 'use_with_care':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
    default:
      return 'border-border bg-natural-100 text-fg/80 dark:border-white/10 dark:bg-white/5 dark:text-white/70'
  }
}

function historyStatusTone(status: DistributionShareResultStatus | null) {
  switch (status) {
    case 'posted':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    case 'cancelled':
      return 'border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300'
    case 'drafted':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
    default:
      return 'border-border bg-natural-100 text-fg/80 dark:border-white/10 dark:bg-white/5 dark:text-white/70'
  }
}

function titleFieldLabel(pack: DistributionSharePack) {
  if (pack.platform === 'email') return 'Subject'
  if (pack.platform === 'xiaohongshu') return 'Short title suggestion'
  return 'Suggested title'
}

function bodyFieldLabel(pack: DistributionSharePack) {
  switch (pack.platform) {
    case 'email':
      return 'Short email intro'
    case 'wechat':
      return 'Primary WeChat handoff copy'
    case 'xiaohongshu':
      return 'Xiaohongshu note draft'
    case 'reddit':
      return 'Discussion framing'
    default:
      return 'Suggested body copy'
  }
}

function formatDateTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

export function DistributionConsoleClient({ initialHistory }: { initialHistory: DistributionHistoryItem[] }) {
  const [urlInput, setUrlInput] = useState('')
  const [analysis, setAnalysis] = useState<DistributionAnalysisResult | null>(null)
  const [utmByPlatform, setUtmByPlatform] = useState<Record<DistributionPlatform, DistributionUtmFields> | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<DistributionPlatform>('linkedin')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [historyItems, setHistoryItems] = useState<DistributionHistoryItem[]>(initialHistory)
  const [historyForms, setHistoryForms] = useState<Record<string, HistoryFormState>>(() => initHistoryFormMap(initialHistory))
  const [savingHistoryId, setSavingHistoryId] = useState<string | null>(null)
  const [historyFeedback, setHistoryFeedback] = useState<Record<string, string>>({})

  const sharePacks = useMemo(() => {
    if (!analysis || !utmByPlatform) return []
    return buildDistributionSharePacks(analysis, utmByPlatform)
  }, [analysis, utmByPlatform])

  const selectedUtm = analysis && utmByPlatform ? utmByPlatform[selectedPlatform] : null
  const selectedTrackedUrl =
    analysis && selectedUtm ? buildTrackedDistributionUrl(analysis.normalizedUrl, selectedUtm) : ''

  async function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsAnalyzing(true)
    setError(null)
    try {
      const response = await fetch('/api/private/distribution/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      })
      const data = (await response.json()) as AnalyzeResponse
      if (!response.ok || !data.ok) {
        throw new Error(data.ok ? 'Analyze failed.' : data.error)
      }
      setAnalysis(data.analysis)
      setUtmByPlatform(initUtmMap(data.analysis))
      setSelectedPlatform(data.analysis.recommendedPlatforms[0] || 'linkedin')
    } catch (err) {
      setAnalysis(null)
      setUtmByPlatform(null)
      setError(err instanceof Error ? err.message : 'Analyze failed.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  function updateUtmField(field: keyof DistributionUtmFields, value: string) {
    setUtmByPlatform((current) => {
      if (!current) return current
      return {
        ...current,
        [selectedPlatform]: {
          ...current[selectedPlatform],
          [field]: value,
        },
      }
    })
  }

  function updateHistoryForm(actionId: string, patch: Partial<HistoryFormState>) {
    setHistoryForms((current) => ({
      ...current,
      [actionId]: {
        ...(current[actionId] || createHistoryFormState(null)),
        ...patch,
      },
    }))
  }

  function prependHistoryAction(action: DistributionShareActionRecord) {
    setHistoryItems((current) => {
      const existing = current.find((item) => item.action.id === action.id)
      if (existing) {
        return current.map((item) => (item.action.id === action.id ? { ...item, action } : item))
      }
      return [{ action, result: null }, ...current].slice(0, 18)
    })
    setHistoryForms((current) => ({
      ...current,
      [action.id]: current[action.id] || createHistoryFormState(null),
    }))
  }

  function mergeSavedResult(result: DistributionShareActionResultRecord) {
    setHistoryItems((current) =>
      current.map((item) => (item.action.id === result.shareActionId ? { ...item, result } : item))
    )
    setHistoryForms((current) => ({
      ...current,
      [result.shareActionId]: createHistoryFormState(result),
    }))
  }

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2200)
    } catch {
      setCopiedKey(null)
    }
  }

  async function logAction(platform: DistributionPlatform, shareMode: DistributionShareMode, shareTextVariant?: string) {
    if (!analysis || !utmByPlatform) return
    const utm = utmByPlatform[platform]
    const payload = {
      url: buildTrackedDistributionUrl(analysis.normalizedUrl, utm),
      canonicalUrl: analysis.metadata.canonical || analysis.normalizedUrl,
      hostname: analysis.hostname,
      pathname: analysis.pathname,
      pageType: analysis.pageType,
      pageLocale: analysis.locale,
      platform,
      shareMode,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      shareTextVariant: shareTextVariant || null,
      metadataSnapshot: {
        ...analysis.metadata,
        warnings: analysis.warnings,
        recommendedPlatforms: analysis.recommendedPlatforms,
      },
    }
    try {
      const response = await fetch('/api/private/distribution/log', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as LogResponse
      if (response.ok && data.ok) {
        prependHistoryAction(data.action)
      }
    } catch {
      // Logging stays best-effort. Share actions should still succeed even if history append fails.
    }
  }

  async function copyPackText(pack: DistributionSharePack) {
    const text = packText(pack)
    await copyText(text, `${pack.platform}-text`)
    await logAction(pack.platform, pack.copyMode, text)
  }

  async function copyPackUrl(pack: DistributionSharePack) {
    await copyText(pack.trackedUrl, `${pack.platform}-url`)
    await logAction(pack.platform, 'copy_url', pack.trackedUrl)
  }

  async function openPlatform(pack: DistributionSharePack) {
    if (!pack.openActionUrl) return
    await logAction(pack.platform, 'open_platform', pack.openActionUrl)
    window.open(pack.openActionUrl, '_blank', 'noopener,noreferrer')
  }

  async function saveResult(item: DistributionHistoryItem) {
    const form = historyForms[item.action.id] || createHistoryFormState(item.result)
    setSavingHistoryId(item.action.id)
    setHistoryFeedback((current) => ({ ...current, [item.action.id]: '' }))
    try {
      const response = await fetch('/api/private/distribution/results', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          shareActionId: item.action.id,
          platform: item.action.platform,
          status: form.status,
          externalPostUrl: form.externalPostUrl,
          externalPostNotes: form.externalPostNotes,
          manualMetrics: metricsFromFormState(form),
        }),
      })
      const data = (await response.json()) as ResultResponse
      if (!response.ok || !data.ok) {
        throw new Error(data.ok ? 'Save failed.' : data.error)
      }
      mergeSavedResult(data.result)
      setHistoryFeedback((current) => ({ ...current, [item.action.id]: 'Saved.' }))
    } catch (err) {
      setHistoryFeedback((current) => ({
        ...current,
        [item.action.id]: err instanceof Error ? err.message : 'Save failed.',
      }))
    } finally {
      setSavingHistoryId(null)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-accent dark:border-border dark:bg-surface dark:text-white'
  const sectionClass = 'rounded-[1.75rem] border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface'

  return (
    <div className="space-y-6">
      <section className={sectionClass}>
        <div className="flex flex-wrap items-end gap-4">
          <form onSubmit={handleAnalyze} className="flex-1">
            <label className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Bayview URL</label>
            <div className="mt-3 flex flex-col gap-3 md:flex-row">
              <input
                value={urlInput}
                onChange={(event) => setUrlInput(event.target.value)}
                placeholder="https://www.bayviewhub.me/mendpress/from-mend-to-mendpress-to-bayview-hub"
                className={inputClass}
              />
              <Button type="submit" variant="accent" className="min-w-[180px]" disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze URL'}
              </Button>
            </div>
          </form>
        </div>
        <p className="mt-3 text-sm text-muted">
          Allowed hostnames only: <code>bayviewhub.me</code>, <code>www.bayviewhub.me</code>, <code>gallery.bayviewhub.me</code>.
        </p>
        {error ? (
          <div className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}
      </section>

      {analysis ? (
        <>
          <section className={sectionClass}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Page intelligence summary</p>
                <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">Deterministic page readout</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.recommendedPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[12px] tracking-[0.08em] text-accent"
                  >
                    {platformLabel(platform)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SummaryField label="Normalized URL" value={analysis.normalizedUrl} mono />
              <SummaryField label="Hostname" value={analysis.hostname} mono />
              <SummaryField label="Pathname" value={analysis.pathname} mono />
              <SummaryField label="Locale" value={analysis.locale} />
              <SummaryField label="Detected page type" value={analysis.pageType} mono />
              <SummaryField label="HTML lang" value={analysis.metadata.htmlLang || '—'} mono />
              <SummaryField label="Title" value={analysis.metadata.title || '—'} />
              <SummaryField label="Meta description" value={analysis.metadata.metaDescription || '—'} />
              <SummaryField label="Canonical" value={analysis.metadata.canonical || '—'} mono />
              <SummaryField label="og:title" value={analysis.metadata.ogTitle || '—'} />
              <SummaryField label="og:description" value={analysis.metadata.ogDescription || '—'} />
              <SummaryField label="og:image" value={analysis.metadata.ogImage || '—'} mono />
              <SummaryField label="H1" value={analysis.metadata.h1 || '—'} />
              <SummaryField label="JSON-LD types" value={analysis.metadata.jsonLdTypes.join(', ') || '—'} mono />
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-natural-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Warnings</p>
              {analysis.warnings.length ? (
                <ul className="mt-3 space-y-2 text-sm text-fg/80 dark:text-white/75">
                  {analysis.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-fg/80 dark:text-white/75">No extraction warnings. Metadata shape is usable for the distribution flow.</p>
              )}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">UTM builder</p>
                <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">Tracked URL controls</h2>
              </div>
              <select
                value={selectedPlatform}
                onChange={(event) => setSelectedPlatform(event.target.value as DistributionPlatform)}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-fg outline-none dark:border-border dark:bg-surface dark:text-white"
              >
                {PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platformLabel(platform)}
                  </option>
                ))}
              </select>
            </div>

            {selectedUtm ? (
              <>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <EditableField label="utm_source" value={selectedUtm.utm_source} onChange={(value) => updateUtmField('utm_source', value)} />
                  <EditableField label="utm_medium" value={selectedUtm.utm_medium} onChange={(value) => updateUtmField('utm_medium', value)} />
                  <EditableField label="utm_campaign" value={selectedUtm.utm_campaign} onChange={(value) => updateUtmField('utm_campaign', value)} />
                  <EditableField label="utm_content" value={selectedUtm.utm_content} onChange={(value) => updateUtmField('utm_content', value)} />
                </div>
                <div className="mt-6 rounded-2xl border border-border bg-natural-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Final tracked URL</p>
                  <p className="mt-3 break-all font-mono text-[13px] leading-6 text-fg/84 dark:text-white/78">{selectedTrackedUrl}</p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={async () => {
                        await copyText(selectedTrackedUrl, 'utm-builder-url')
                        await logAction(selectedPlatform, 'copy_url', selectedTrackedUrl)
                      }}
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent dark:border-border dark:text-white"
                    >
                      {copiedKey === 'utm-builder-url' ? 'Tracked URL copied' : 'Copy tracked URL'}
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>

          <section className={sectionClass}>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Platform share packs</p>
              <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">Operational posting packs</h2>
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
              {sharePacks.map((pack) => (
                <article key={pack.platform} className="rounded-[1.5rem] border border-border bg-natural-50 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-fg dark:text-white">{pack.platformLabel}</h3>
                      <p className="mt-1 text-sm text-muted">{pack.ctaNote}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${recommendationTone(pack.recommendationStatus)}`}>
                      {pack.recommendationStatus.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {pack.emailSubject ? <SummaryField label="Subject line" value={pack.emailSubject} /> : null}
                    <SummaryField label={titleFieldLabel(pack)} value={pack.suggestedTitle} />
                    {pack.noteTitleSuggestion && pack.noteTitleSuggestion !== pack.suggestedTitle ? (
                      <SummaryField label="Alternate note title" value={pack.noteTitleSuggestion} />
                    ) : null}
                    {pack.titleVariants?.length ? <SummaryField label="Title variants" value={pack.titleVariants.join('\n')} /> : null}
                    {pack.newsletterSubject ? <SummaryField label="Newsletter subject line" value={pack.newsletterSubject} /> : null}
                    {pack.subtitle ? <SummaryField label="Subtitle / dek" value={pack.subtitle} /> : null}
                    {pack.introParagraph ? <SummaryField label="Intro paragraph" value={pack.introParagraph} /> : null}
                    {pack.emailIntro ? <SummaryField label="Email intro" value={pack.emailIntro} /> : null}
                    <SummaryField label={bodyFieldLabel(pack)} value={pack.suggestedBody} />
                    {pack.wechatVariants?.length ? (
                      <SummaryField
                        label="WeChat variants"
                        value={pack.wechatVariants.map((variant) => `${variant.label}\n${variant.text}`).join('\n\n')}
                      />
                    ) : null}
                    {pack.visualAngleNote ? <SummaryField label="Suitable visual angle" value={pack.visualAngleNote} /> : null}
                    {pack.tagSuggestions?.length ? <SummaryField label="Restrained tag suggestions" value={pack.tagSuggestions.join(' / ')} /> : null}
                    {pack.suitabilityNote ? <SummaryField label="Suitability note" value={pack.suitabilityNote} /> : null}
                    <SummaryField label="Posting note" value={pack.postingNote} />
                    <SummaryField label="Tracked URL" value={pack.trackedUrl} mono />
                    {pack.chineseCopyPack ? <SummaryField label="Chinese copy pack" value={pack.chineseCopyPack} /> : null}
                    {pack.qrValue ? <LocalQrPanel value={pack.qrValue} label={`${pack.platformLabel} QR`} /> : null}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => copyPackText(pack)}
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent dark:border-border dark:text-white"
                    >
                      {copiedKey === `${pack.platform}-text` ? 'Text copied' : 'Copy text'}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyPackUrl(pack)}
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent dark:border-border dark:text-white"
                    >
                      {copiedKey === `${pack.platform}-url` ? 'URL copied' : 'Copy URL'}
                    </button>
                    {pack.openActionUrl ? (
                      <button
                        type="button"
                        onClick={() => openPlatform(pack)}
                        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                      >
                        Open platform
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <section className={sectionClass}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Recent activity</p>
            <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">History and result capture</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Record what happened after a share action: drafted, posted, or cancelled, plus external URL, short notes, and optional manual metrics.
            </p>
          </div>
        </div>

        {historyItems.length ? (
          <div className="mt-6 space-y-4">
            {historyItems.map((item) => {
              const form = historyForms[item.action.id] || createHistoryFormState(item.result)
              const resultStatus = item.result?.status || null
              return (
                <article key={item.action.id} className="rounded-[1.5rem] border border-border bg-natural-50 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                          {platformLabel(item.action.platform)}
                        </span>
                        <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-fg/75 dark:border-white/10 dark:text-white/70">
                          {item.action.shareMode.replace(/_/g, ' ')}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${historyStatusTone(resultStatus)}`}>
                          {resultStatus ? distributionShareResultStatusLabel(resultStatus) : 'No result yet'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-fg dark:text-white">{item.action.pathname}</p>
                        <p className="mt-1 text-sm text-muted">
                          {item.action.pageType} • {formatDateTime(item.action.createdAt)}
                        </p>
                      </div>
                    </div>
                    {item.result?.externalPostUrl ? (
                      <a
                        href={item.result.externalPostUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-border px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent dark:border-border dark:text-white"
                      >
                        Open external post
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryField label="Tracked URL" value={item.action.url} mono />
                    <SummaryField label="Canonical URL" value={item.action.canonicalUrl} mono />
                    <SummaryField label="Hostname" value={item.action.hostname} mono />
                    <SummaryField label="Locale" value={item.action.pageLocale} />
                  </div>

                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Status</span>
                      <select
                        value={form.status}
                        onChange={(event) => updateHistoryForm(item.action.id, { status: event.target.value as DistributionShareResultStatus })}
                        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent dark:border-border dark:bg-surface dark:text-white"
                      >
                        <option value="drafted">Drafted</option>
                        <option value="posted">Posted</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </label>
                    <EditableField
                      label="External post URL"
                      value={form.externalPostUrl}
                      onChange={(value) => updateHistoryForm(item.action.id, { externalPostUrl: value })}
                    />
                    <label className="block xl:col-span-2">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Short notes</span>
                      <textarea
                        value={form.externalPostNotes}
                        onChange={(event) => updateHistoryForm(item.action.id, { externalPostNotes: event.target.value })}
                        rows={3}
                        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent dark:border-border dark:bg-surface dark:text-white"
                      />
                    </label>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">Optional manual metrics</p>
                    <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                      <EditableField label="likes" value={form.likes} onChange={(value) => updateHistoryForm(item.action.id, { likes: value })} />
                      <EditableField label="comments" value={form.comments} onChange={(value) => updateHistoryForm(item.action.id, { comments: value })} />
                      <EditableField label="shares" value={form.shares} onChange={(value) => updateHistoryForm(item.action.id, { shares: value })} />
                      <EditableField label="opens" value={form.opens} onChange={(value) => updateHistoryForm(item.action.id, { opens: value })} />
                      <EditableField
                        label="subscribers"
                        value={form.subscribers}
                        onChange={(value) => updateHistoryForm(item.action.id, { subscribers: value })}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => saveResult(item)}
                      disabled={savingHistoryId === item.action.id}
                      className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingHistoryId === item.action.id ? 'Saving...' : 'Save result'}
                    </button>
                    {item.result?.lastCheckedAt ? (
                      <p className="text-sm text-muted">Last updated {formatDateTime(item.result.lastCheckedAt)}</p>
                    ) : null}
                    {historyFeedback[item.action.id] ? (
                      <p className="text-sm text-fg/80 dark:text-white/75">{historyFeedback[item.action.id]}</p>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">No recent share actions yet. Once you copy or open a platform from this console, it will appear here for review.</p>
        )}
      </section>
    </div>
  )
}

function LocalQrPanel({ value, label }: { value: string; label: string }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    distributionQrDataUrl(value)
      .then((dataUrl) => {
        if (alive) setSrc(dataUrl)
      })
      .catch(() => {
        if (alive) setSrc(null)
      })
    return () => {
      alive = false
    }
  }, [value])

  return (
    <div className="rounded-2xl border border-border bg-white p-4 dark:border-white/10 dark:bg-white">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} width={220} height={220} className="h-[220px] w-[220px]" />
      ) : (
        <div className="flex h-[220px] w-[220px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted">
          Generating QR...
        </div>
      )}
      <p className="mt-3 text-[12px] leading-5 text-fg/68">{DISTRIBUTION_LOCAL_QR_NOTE}</p>
    </div>
  )
}

function SummaryField({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-2xl border border-border bg-natural-50 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">{label}</p>
      <p className={`mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-fg dark:text-white ${mono ? 'font-mono text-[13px]' : ''}`}>{value}</p>
    </div>
  )
}

function EditableField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-fg/60 dark:text-white/55">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent dark:border-border dark:bg-surface dark:text-white"
      />
    </label>
  )
}
