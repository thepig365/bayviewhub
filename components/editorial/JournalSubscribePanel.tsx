import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'

type Props = {
  compact?: boolean
  locale?: SiteLocale
  eyebrow?: string
  title?: string
  body?: string
  ctaLabel?: string
  secondaryLabel?: string
}

export function JournalSubscribePanel({
  compact = false,
  locale = 'en',
  eyebrow = locale === 'zh' ? 'Bayview Notes' : 'Bayview Notes',
  title = locale === 'zh' ? '订阅 Bayview Notes' : 'Subscribe to Bayview Notes',
  body =
    locale === 'zh'
      ? '接收精选 Mendpress 文章、邀请函与庄园更新。有真正值得分享的内容时，我们才发送。'
      : 'Receive selected Mendpress pieces, invitations, and estate notes when there is something worth sharing.',
  ctaLabel = locale === 'zh' ? '进入通讯页' : 'Go to Newsletter',
  secondaryLabel = locale === 'zh' ? '浏览 Mendpress' : 'Explore Mendpress',
}: Props) {
  return (
    <section className="rounded-3xl border border-border bg-natural-50 p-6 md:p-8 dark:border-border dark:bg-surface">
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className={`mt-3 font-serif font-semibold text-fg ${compact ? 'text-2xl' : 'text-3xl'}`}>
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-[1.02rem] leading-8 text-muted md:text-base md:leading-7">
        {body}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button href={localizedHref('/newsletter', locale)} variant="accent">
          {ctaLabel}
        </Button>
        <Link href={localizedHref('/mendpress', locale)} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
