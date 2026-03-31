/**
 * Read server env at request time. Dynamic key avoids Next/Webpack inlining
 * `process.env.FOO` as undefined when vars were added only in Vercel (post-build).
 */
function serverEnv(name: string): string | undefined {
  const v = process.env[name]
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t.length ? t : undefined
}

/** Optional `from` for transactional auto-replies (e.g. partners applicant). Verified in Resend like `RESEND_FROM`. */
export function resendApplicantNoreplyFrom(): string | undefined {
  return serverEnv('RESEND_FROM_NOREPLY')
}

/**
 * Minimal Resend HTTP API helper — shared by feasibility, SSD campaign alerts, and cron digests.
 */
export async function sendResendEmail(opts: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  bcc?: string | string[]
  /** When set (e.g. noreply@), overrides `RESEND_FROM` for this send only. Must be a verified sender in Resend. */
  from?: string
}): Promise<boolean> {
  const apiKey = serverEnv('RESEND_API_KEY')
  const from = serverEnv('RESEND_FROM')
  const fromResolved = (opts.from && opts.from.trim()) || from
  if (!apiKey || !fromResolved) {
    console.warn('[resend] skipped: missing env', {
      has_RESEND_API_KEY: Boolean(serverEnv('RESEND_API_KEY')),
      has_RESEND_FROM: Boolean(from),
      used_from_override: Boolean(opts.from?.trim()),
    })
    return false
  }

  const to = Array.isArray(opts.to) ? opts.to : [opts.to]
  const bcc = opts.bcc
    ? Array.isArray(opts.bcc)
      ? opts.bcc
      : [opts.bcc]
    : undefined

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromResolved,
      to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.text ? { text: opts.text } : {}),
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      ...(bcc?.length ? { bcc } : {}),
    }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.text()).slice(0, 800)
    } catch {
      detail = '(could not read body)'
    }
    console.warn('[resend] API error', { status: res.status, detail })
  }

  return res.ok
}
