"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPageZh() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-20 md:py-28 bg-background min-h-[70vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6"
              data-testid="text-thank-you-title"
            >
              感谢你提交问询
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              我们已收到可行性资料，约在 48 小时内给出第一层书面阅读——该回复并非 Council 批文。
            </p>

            <Link
              href="/zh/backyard-small-second-home"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-colors"
              data-testid="button-back-ssd-hub"
            >
              返回 SSD 中文入口
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
