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

/**
 * Minimal Resend HTTP API helper — shared by feasibility, SSD campaign alerts, and cron digests.
 */
export async function sendResendEmail(opts: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  bcc?: string | string[]
}): Promise<boolean> {
  const apiKey = serverEnv('RESEND_API_KEY')
  const from = serverEnv('RESEND_FROM')
  if (!apiKey || !from) {
    console.warn('[resend] skipped: missing env', {
      has_RESEND_API_KEY: Boolean(serverEnv('RESEND_API_KEY')),
      has_RESEND_FROM: Boolean(serverEnv('RESEND_FROM')),
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
      from,
      to,
      subject: opts.subject,
      html: opts.html,
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
