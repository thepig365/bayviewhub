import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { localizedHref } from '@/lib/language-routing'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: `Edible Gardens 中文 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 可食花园中文页：介绍正在筹备中的订阅式花园项目、家庭参与方式，以及如何通过中文入口留下关注。',
  path: '/zh/edible-gardens',
})

export default function ChineseEdibleGardensPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="bg-gradient-to-br from-primary-50 to-natural-50 py-20 md:py-28 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">筹备中</p>
            <h1 className="text-4xl font-serif font-bold text-fg md:text-5xl">可食花园</h1>
            <p className="mt-6 text-xl leading-relaxed text-muted">
              Bayview Hub 正在筹备一个以订阅、家庭参与和季节性收成为基础的可食花园项目。
              这不是单纯卖菜，而是把种植、照护、食物与场所经验重新连在一起。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">我们在构建什么</h2>
              <p className="mt-3 leading-8 text-muted">围绕花园订阅、季节性收成、家庭友好活动日与现场体验，形成一个稳定而有人味的项目。</p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">为什么重要</h2>
              <p className="mt-3 leading-8 text-muted">它让食物重新和土地、季节、关系与日常生活发生连接，而不只是成为一个消费终点。</p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">适合谁</h2>
              <p className="mt-3 leading-8 text-muted">适合家庭、重视食物来源的人、喜欢花园实践的人，也适合想和孩子一起参与更真实节奏的人。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-serif font-bold text-fg">留下你的关注</h2>
              <p className="mt-4 text-muted">如果你想在项目开放时第一时间收到消息，可以通过这里进入 Bayview Notes。</p>
            </div>
            <div className="rounded-2xl bg-white p-8 dark:border dark:border-border dark:bg-surface">
              <NewsletterForm />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={localizedHref('/partners/edible-gardens', 'zh')} variant="primary" size="lg">
                查看合作路径
              </Button>
              <Button href={localizedHref('/visit', 'zh')} variant="outline" size="lg">
                了解庄园到访
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
