#!/usr/bin/env node
/**
 * Google Cloud Translation — Basic API (v2) helper for zh-CN refresh.
 *
 * Setup:
 * 1. In Google Cloud Console: enable “Cloud Translation API”.
 * 2. Create an API key (restrict to Translation API + your IPs if possible).
 * 3. Add to .env.local (never commit):
 *    GOOGLE_CLOUD_TRANSLATE_API_KEY=your_key_here
 *
 * Usage:
 *   node scripts/google-translate-ssd-cli.mjs batch < file-with-one-english-line-per-record.txt > out.zh.txt
 *   node scripts/google-translate-ssd-cli.mjs one "English sentence here"
 *
 * Notes:
 * - This script does NOT rewrite TSX; it only returns translated text blocks.
 *   Wiring strings back into JSX (paths, localizedHref, metadata) needs a guarded pass / human QA.
 */

import fs from 'node:fs'
import path from 'node:path'

const ENV_PATH = path.join(process.cwd(), '.env.local')

function loadEnvLocal() {
  try {
    const raw = fs.readFileSync(ENV_PATH, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const k = trimmed.slice(0, eq).trim()
      let v = trimmed.slice(eq + 1).trim()
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1)
      }
      if (!(k in process.env)) process.env[k] = v
    }
  } catch {
    // missing .env.local is fine
  }
}

loadEnvLocal()

const API_KEY =
  process.env.GOOGLE_CLOUD_TRANSLATE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY

const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2'

/** Google returns HTML entities in some modes; normalize common apostrophe. */
function decodeGoogleText(s) {
  return String(s || '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

/**
 * Translate many segments in batches (avoid huge single payloads).
 */
async function translateBatch(segments, { source = 'en', target = 'zh-CN', format = 'text' } = {}) {
  const out = []
  const BATCH = 100
  for (let i = 0; i < segments.length; i += BATCH) {
    const chunk = segments.slice(i, i + BATCH)
    const url = `${ENDPOINT}?key=${encodeURIComponent(API_KEY)}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: chunk,
        source,
        target,
        format,
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      const errMsg = json.error?.message || json.error?.errors?.[0]?.message || JSON.stringify(json)
      throw new Error(`Translation API HTTP ${res.status}: ${errMsg}`)
    }
    const tr = json?.data?.translations
    if (!Array.isArray(tr)) throw new Error(`Unexpected API response: ${JSON.stringify(json).slice(0, 800)}`)
    for (const row of tr) out.push(decodeGoogleText(row.translatedText))
  }
  return out
}

async function main() {
  const mode = process.argv[2] || 'help'
  const one = process.argv.slice(3).join(' ').trim()

  if (!API_KEY && mode !== 'help') {
    console.error(
      'Missing GOOGLE_CLOUD_TRANSLATE_API_KEY (optionally GOOGLE_TRANSLATE_API_KEY).\nAdd it to .env.local — see scripts/google-translate-ssd-cli.mjs header.',
    )
    process.exit(1)
  }

  if (mode === 'one') {
    if (!one) {
      console.error('Usage: node scripts/google-translate-ssd-cli.mjs one "English text..."')
      process.exit(1)
    }
    const [out] = await translateBatch([one])
    console.log(out)
    return
  }

  if (mode === 'batch') {
    const stdin = fs.readFileSync(0, 'utf8')
    const lines = stdin.split('\n').map((s) => s.trimEnd()).filter((line) => line.length > 0)
    const translated = await translateBatch(lines)
    for (const t of translated) console.log(t)
    return
  }

  console.log(`SSD / Bayview zh helper

Commands:
  one "text"           translate a single English string → stdout (zh-CN)
  batch                read stdin one English segment per non-empty line → stdout (zh-CN)

Env:
  GOOGLE_CLOUD_TRANSLATE_API_KEY   preferred
  GOOGLE_TRANSLATE_API_KEY       alias
`)

  process.exit(0)
}

main().catch((e) => {
  console.error(e?.message || e)
  process.exit(1)
})
