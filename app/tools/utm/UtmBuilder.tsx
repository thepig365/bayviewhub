'use client'

import React, { useMemo, useState } from 'react'

type UtmState = {
  baseUrl: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

const INITIAL: UtmState = {
  baseUrl: 'https://www.bayviewhub.me/partners/edible-gardens',
  utm_source: 'linkedin',
  utm_medium: 'post',
  utm_campaign: 'founding_partner',
  utm_content: 'post1',
  utm_term: '',
}

export function UtmBuilder() {
  const [state, setState] = useState<UtmState>(INITIAL)
  const [copied, setCopied] = useState(false)

  const url = useMemo(() => {
    const u = new URL(state.baseUrl)
    ;(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const).forEach((k) => {
      const v = state[k]
      if (v) u.searchParams.set(k, v)
    })
    return u.toString()
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Base URL"
          value={state.baseUrl}
          onChange={(v) => setState({ ...state, baseUrl: v })}
          placeholder="https://www.bayviewhub.me/partners/edible-gardens"
        />
        <Field label="utm_source" value={state.utm_source} onChange={(v) => setState({ ...state, utm_source: v })} />
        <Field label="utm_medium" value={state.utm_medium} onChange={(v) => setState({ ...state, utm_medium: v })} />
        <Field
          label="utm_campaign"
          value={state.utm_campaign}
          onChange={(v) => setState({ ...state, utm_campaign: v })}
        />
        <Field
          label="utm_content"
          value={state.utm_content}
          onChange={(v) => setState({ ...state, utm_content: v })}
        />
        <Field label="utm_term" value={state.utm_term} onChange={(v) => setState({ ...state, utm_term: v })} />
      </div>

      <div className="rounded-2xl p-6 bg-white shadow-lg border border-natural-200 dark:bg-primary-900/60 dark:border-primary-700">
        <p className="text-sm font-medium text-natural-700 dark:text-natural-200">Trackable link</p>
        <div className="mt-2 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            readOnly
            value={url}
            className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50"
          />
          <button
            type="button"
            onClick={copy}
            className="px-5 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="mt-3 text-xs text-natural-600 dark:text-natural-300">
          Tip: keep `utm_campaign` consistent across a campaign, and change `utm_content` per post/ad creative.
        </p>
      </div>
    </div>
  )
}

function Field(props: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-natural-700 mb-2 dark:text-natural-200">{props.label}</label>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-natural-300 bg-white text-natural-900 placeholder:text-natural-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-700 dark:bg-primary-900/40 dark:text-natural-50 dark:placeholder:text-natural-300 dark:focus:ring-primary-300"
      />
    </div>
  )
}


