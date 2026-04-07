'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { buildDistributionSharePacks } from '@/lib/distribution/share-packs'
import { buildTrackedDistributionUrl, defaultDistributionUtmFields } from '@/lib/distribution/utm'
import type {
  DistributionAnalysisResult,
  DistributionPlatform,
  DistributionShareMode,
  DistributionSharePack,
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

function packText(pack: DistributionSharePack): string {
  if (pack.platform === 'substack') {
    return [pack.suggestedTitle, pack.subtitle, pack.introParagraph, pack.trackedUrl].filter(Boolean).join('\n\n')
  }
  if (pack.platform === 'reddit' && pack.titleVariants?.length) {
    return [pack.titleVariants[0], pack.suggestedBody, pack.trackedUrl].filter(Boolean).join('\n\n')
  }
  if ((pack.platform === 'wechat' || pack.platform === 'xiaohongshu') && pack.chineseCopyPack) {
    return pack.chineseCopyPack
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

function titleFieldLabel(pack: DistributionSharePack) {
  if (pack.platform === 'email') return 'Subject'
  return 'Suggested title'
}

function bodyFieldLabel(pack: DistributionSharePack) {
  switch (pack.platform) {
    case 'email':
      return 'Short email intro'
    case 'wechat':
      return 'WeChat handoff copy'
    case 'xiaohongshu':
      return 'Xiaohongshu note copy'
    case 'reddit':
      return 'Discussion framing'
    default:
      return 'Suggested body copy'
  }
}

export function DistributionConsoleClient() {
  const [urlInput, setUrlInput] = useState('')
  const [analysis, setAnalysis] = useState<DistributionAnalysisResult | null>(null)
  const [utmByPlatform, setUtmByPlatform] = useState<Record<DistributionPlatform, DistributionUtmFields> | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<DistributionPlatform>('linkedin')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

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
      await fetch('/api/private/distribution/log', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // Logging is best-effort only in the MVP console.
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
                <p className="mt-3 text-sm text-fg/80 dark:text-white/75">No extraction warnings. Metadata shape is usable for the MVP share flow.</p>
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
                    <SummaryField label={titleFieldLabel(pack)} value={pack.suggestedTitle} />
                    {pack.titleVariants?.length ? <SummaryField label="Title variants" value={pack.titleVariants.join('\n')} /> : null}
                    {pack.subtitle ? <SummaryField label="Subtitle / dek" value={pack.subtitle} /> : null}
                    {pack.introParagraph ? <SummaryField label="Intro paragraph" value={pack.introParagraph} /> : null}
                    <SummaryField label={bodyFieldLabel(pack)} value={pack.suggestedBody} />
                    <SummaryField label="Posting note" value={pack.postingNote} />
                    <SummaryField label="Tracked URL" value={pack.trackedUrl} mono />
                    {pack.chineseCopyPack ? <SummaryField label="Chinese copy pack" value={pack.chineseCopyPack} /> : null}
                    {pack.qrUrl ? (
                      <div className="rounded-2xl border border-border bg-white p-4 dark:border-white/10 dark:bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pack.qrUrl} alt={`${pack.platformLabel} QR`} width={220} height={220} className="h-[220px] w-[220px]" />
                        <p className="mt-3 text-[12px] leading-5 text-fg/68">
                          MVP note: this QR image is generated through a third-party QR service for internal review.
                        </p>
                      </div>
                    ) : null}
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
