import type { Metadata } from "next";
import Link from "next/link";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { SsdPageHero } from "@/components/ssd/SsdPageHero";
import { SsdPageShare } from "@/components/ssd/SsdPageShare";
import { SITE_CONFIG } from "@/lib/constants";
import { LAST_UPDATED } from "@/lib/seo";

const ZH_SSD_FEASIBILITY = "/zh/backyard-small-second-home/feasibility-check" as const;
const feasibilityCanonical = `${SITE_CONFIG.url}${ZH_SSD_FEASIBILITY}`;

const capsuleHeadings = {
  quickAnswer: "要点速览",
  sources: "参考与来源",
  lastUpdatedPrefix: "最近更新：",
};

export const metadata: Metadata = {
  title: {
    absolute: "SSD 可行性检查 | 维州路径互动工具 | Bayview Hub",
  },
  description:
    "互动式维州小型第二住宅语境：根据你的回答判断更接近 Green Lane、VicSmart，还是标准规划；可选约 48 小时书面第一层阅读。",
  alternates: {
    canonical: feasibilityCanonical,
  },
  openGraph: {
    title: "SSD 可行性检查 | Bayview Hub",
    description:
      "维州后院第二小住宅互动检查表——Green Lane、VicSmart 或标准规划的语境提示，可选书面可行性回复。",
    url: feasibilityCanonical,
    siteName: "Bayview Hub",
    type: "website",
  },
  keywords: [
    "SSD Victoria",
    "小型第二住宅",
    "Clause 54.03",
    "认定合规",
    "VicSmart",
    "VC253",
    "VC282",
    "Victorian planning",
    "60 sqm dwelling",
  ],
};

const faqDataZh = [
  {
    question: "维州 SSD 的 Green Lane 指什么？",
    answer:
      "指你的 SSD 同时满足 Clause 54.03「认定合规」：建面≤60㎡、主房前墙后方、不接燃气、25㎡ POS 留存、退线合规且无触发规划图层等——通常无需 planning permit，直接进入建房 permit。",
  },
  {
    question: "哪些情况会改用 VicSmart？",
    answer:
      "SSD 仍 compliant，但图层或轻微退让需要快速 Council 评估时，可走 VicSmart：Council 常在 10 个工作日内决定，且通常无邻里通告义务。",
  },
  {
    question: "什么会把我推出 SSD？",
    answer:
      "建面超过 60㎡ 或必须坚持前院临街主展示位会直接失去 SSD——回到标准 planning，可能经历 12–18 个月流程。",
  },
  {
    question: "VC253 / VC282 的硬线是什么？",
    answer:
      "建面 60㎡ 上限、坐落主房前墙后方、全屋电气、不可把 SSD 从主宅 title 分拆测绘、主宅保留 25㎡ 私人对外开放空间。",
  },
  {
    question: "Green Lane 仍需建房 permit 吗？",
    answer:
      "是的。建房 permit 永久强制，用于结构、能耗、NCC 等复核；Green Lane 仅指可绕过 planning permit。",
  },
  {
    question: "可以把 SSD 分拆出售吗？",
    answer:
      "不行。VC253/VC282 禁止把 SSD 单独测绘成可售地块；有此意图即跳出框架。",
  },
];

function buildFeasibilityJsonLdZh(baseUrl: string) {
  const pageUrl = `${baseUrl}${ZH_SSD_FEASIBILITY}`;
  const ogImage = `${baseUrl}/og-second-home.png`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqDataZh.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "LocalBusiness"],
      name: "维多利亚州 SSD 报批语境服务",
      url: pageUrl,
      image: ogImage,
      description:
        "在 VC253 / VC282 语境下提供小型第二住宅可行性阅读与报批路径解释，覆盖 Green Lane、VicSmart 与标准规划语境。",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "365 Purves Road",
        addressLocality: "Main Ridge",
        addressRegion: "VIC",
        postalCode: "3928",
        addressCountry: "AU",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Victoria, Australia",
      },
      makesOffer: {
        "@type": "Offer",
        description: "可选 48 小时内书面第一层可行性阅读（非 Council 批文）",
        price: "0",
        priceCurrency: "AUD",
      },
      knowsAbout: [
        "Victorian Planning Provisions",
        "Clause 54.03",
        "VC253",
        "VC282 VicSmart",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SSD 报批路径互动工具",
      description:
        "根据输入判断更接近 Green Lane（免 planning）、VicSmart 快速语境，或红色标准规划语境。",
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AUD",
      },
    },
  ];
}

export default function FeasibilityChecklistLayoutZh({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildFeasibilityJsonLdZh(SITE_CONFIG.url);
  const base = SITE_CONFIG.url;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SsdPageHero
        title="SSD 可行性检查"
        explainer="先走清单与推演，看看你更接近 Green Lane、VicSmart 还是退回标准 planning；若想获得书面第一层阅读，再提交表单（约 48 小时）。"
        primaryHref={`${ZH_SSD_FEASIBILITY}#feasibility-form`}
        primaryLabel="跳到表单"
        secondaryHref="/zh/backyard-small-second-home"
        secondaryLabel="查看 SSD 中文总览"
      />
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <AnswerCapsule
            headings={capsuleHeadings}
            definition="这是帮助你理解语境的互动屏，不等于 Council 的书面决定；只是把回答映射成常见报批路径，方便你决定要核实什么。"
            facts={[
              "Green Lane 叙事：判定合规齐备 → 常可绕过 planning permit，但仍需建房 permit。",
              "VicSmart 叙事：存在轻微图层或退让议题 → Council 可走加速语境（若条文适用）。",
              "若跳出体量或坐落红线 → 需回到常规 planning——工具会提早提示这一点。",
            ]}
            sources={[
              { label: "维多利亚州规划门户网站", href: "https://www.planning.vic.gov.au/" },
              { label: "SSD 中文总览", href: `${base}/zh/backyard-small-second-home` },
              { label: "维州 SSD 规则", href: `${base}/zh/backyard-small-second-home/victoria-rules` },
              { label: "成本与租金语境", href: `${base}/zh/backyard-small-second-home/cost-rent-roi` },
            ]}
            lastUpdated={LAST_UPDATED}
          />
          <SsdPageShare path="/zh/backyard-small-second-home/feasibility-check" className="mt-8" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted">
            <Link href="/zh/backyard-small-second-home" className="font-medium text-accent underline-offset-4 hover:underline">
              查看 SSD 中文总览
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/backyard-small-second-home/victoria-rules" className="underline-offset-4 hover:underline">
              维州 SSD 规则
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/backyard-small-second-home/cost-rent-roi" className="underline-offset-4 hover:underline">
              成本与租金语境
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/visit" className="underline-offset-4 hover:underline">
              到访庄园
            </Link>
          </p>
        </div>
      </div>
      {children}
    </>
  );
}
