import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { localizedHref } from '@/lib/language-routing'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: `Therapeutic Arts Workshops 中文 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 的艺术与修复性工作坊中文页：说明它为何存在、会发生什么、适合谁，以及如何进一步了解庄园体验。',
  path: '/zh/workshops',
})

const workshopItems = [
  ['表达性绘画', '通过色彩、质地与直觉性痕迹，进入更安静、更有感受力的创作状态。'],
  ['陶土与在场', '把手部触感、材料经验与稳定的节奏结合在一起。'],
  ['自然观察与书写', '在庄园与花园环境里，以画、写、记录的方式重新连接外部世界。'],
]

export default function ChineseWorkshopsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-accent">工作坊</p>
            <h1 className="mt-4 text-4xl font-serif font-bold text-fg md:text-5xl">艺术与修复性工作坊</h1>
            <p className="mt-8 text-xl leading-relaxed text-muted">
              这不是临床治疗服务，而是在 Bayview Hub 提供的一种更安静、更有支持性的创作时间。
              我们把表达性艺术、材料经验与场所感结合起来，让人重新慢下来、重新连接、重新感受。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-natural-50 py-16 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-fg">为什么要有这类工作坊</h2>
            <p className="mt-6 leading-8 text-muted">
              创作可以是修复性的，不是把艺术当成表现压力，也不是把每一次参与都变成成果导向。
              在 Bayview Hub，我们更关心的是：人是否能在一个安全、安静、不被催促的环境里，重新与材料、身体、土地和他人发生关系。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-fg">会发生什么</h2>
            <div className="mt-8 space-y-6">
              {workshopItems.map(([title, description]) => (
                <div key={title} className="rounded-xl bg-natural-50 p-6 dark:bg-surface/50">
                  <h3 className="font-bold text-fg">{title}</h3>
                  <p className="mt-2 text-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-natural-50 py-16 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-fg">适合谁</h2>
            <ul className="mt-8 space-y-4 text-muted">
              <li>适合想要有创作出口，但不想承受“表现”压力的人。</li>
              <li>适合希望慢下来、动手、重新校准节奏的人。</li>
              <li>适合家庭或照护者与孩子一起拥有共享创作时间。</li>
            </ul>
            <p className="mt-8 text-sm leading-7 text-subtle">
              这些工作坊属于修复性创作实践，不应被理解为医疗或临床治疗服务。如遇心理危机，请联系 Lifeline、Beyond Blue 或当地紧急服务。
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl text-muted">工作坊将按季节与项目节奏推出。你也可以先从 Bayview Hub 的整体体验和到访信息开始了解。</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={localizedHref('/experiences', 'zh')} variant="primary" size="lg">
                浏览体验
              </Button>
              <Button href={localizedHref('/visit', 'zh')} variant="outline" size="lg">
                规划到访
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
