import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { MapPin, Clock, Phone, Mail, Car, Train } from 'lucide-react'
import { SITE_CONFIG, SITE_HOURS } from '@/lib/constants'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: '到访信息',
  description:
    '规划你前往 Bayview Hub 的行程：地址、开放时间、交通方式、附近目的地，以及庄园访问的实用信息。',
  path: '/zh/visit',
})

export default function ChineseVisitPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="bg-gradient-to-br from-primary-50 to-natural-50 py-20 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-accent">到访 Bayview Hub</p>
            <h1 className="mt-4 text-5xl font-serif font-bold text-fg md:text-6xl">规划你的到访</h1>
            <p className="mt-6 text-xl leading-relaxed text-muted">
              这里整理了前往 Bayview Hub 所需的主要信息，包括地址、开放时间、交通方式，以及在 Mornington Peninsula 周边可顺路安排的目的地。
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-serif font-bold text-fg">联系与位置</h2>
              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
                  <div>
                    <h3 className="font-bold text-fg">地址</h3>
                    <p className="mt-1 text-muted">{SITE_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
                  <div>
                    <h3 className="font-bold text-fg">电话</h3>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="mt-1 text-primary-700 hover:underline dark:text-primary-300">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
                  <div>
                    <h3 className="font-bold text-fg">邮箱</h3>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="mt-1 text-primary-700 hover:underline dark:text-primary-300">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-fg">开放时间</h2>
              <div className="mt-6 rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
                <div className="space-y-4">
                  {SITE_HOURS.schedule.map((item, index) => (
                    <div
                      key={item.days}
                      className={`flex items-center justify-between py-2 ${index < SITE_HOURS.schedule.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <span className="font-medium text-fg">{item.days}</span>
                      <span className="text-muted">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="flex items-start text-base text-muted">
                    <Clock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                    {SITE_HOURS.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-natural-50 py-20 dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-4xl font-serif font-bold text-fg">怎么到这里</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:border dark:border-border dark:bg-surface">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary-100 p-3 dark:bg-surface">
                    <Car className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-fg">自驾</h3>
                </div>
                <ul className="space-y-3 text-muted">
                  <li>90 分钟左右可从墨尔本 CBD 抵达。</li>
                  <li>距离 Peninsula Hot Springs 约 15 分钟。</li>
                  <li>现场可停车。</li>
                  <li>提供无障碍停车位。</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:border dark:border-border dark:bg-surface">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary-100 p-3 dark:bg-surface">
                    <Train className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-fg">公共交通</h3>
                </div>
                <ul className="space-y-3 text-muted">
                  <li>Bayview Hub 位于 Mornington Peninsula 的 Main Ridge 区域。</li>
                  <li>可结合出租车或 Uber 完成最后一段行程。</li>
                  <li>最近的主要城镇是 Rosebud。</li>
                  <li>建议出发前先规划好墨尔本往返路线。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif font-bold text-fg">周边可以顺路安排什么</h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              你可以把 Bayview Hub 放进一个更完整的 Peninsula 行程里，例如温泉、海岸步道、海滩、花园、酒庄与周边小镇。
              这一页先提供中文访问信息，具体目的地仍以英文原站和外部链接为主。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href="https://www.google.com/maps/dir/?api=1&destination=365+Purves+Road,+Main+Ridge,+Victoria+3928,+Australia"
                variant="primary"
                size="lg"
                external
              >
                导航到 Bayview Hub
              </Button>
              <Button href={localizedHref('/cellar-door', 'zh')} variant="outline" size="lg">
                查看 Cellar Door
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
