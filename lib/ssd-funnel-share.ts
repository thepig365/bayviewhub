/**
 * Mailto + share copy for SSD funnel pages (used with ShareStrip).
 * URLs are built with SITE_CONFIG.url + path at render time.
 */
export const SSD_FUNNEL_SHARE = {
  '/backyard-small-second-home': {
    subject: 'Backyard Small Second Home — Bayview Hub',
    intro:
      'Sharing Bayview Hub’s Victorian Backyard Small Second Home (SSD) hub — overview, programme pages, and feasibility check.',
  },
  '/backyard-small-second-home/approach': {
    subject: 'Why this SSD pathway — Bayview Hub',
    intro: 'Sharing Bayview Hub’s page on why we lead with Victorian SSD rules and planning clarity.',
  },
  '/backyard-small-second-home/is-this-for-you': {
    subject: 'Is this SSD pathway for you? — Bayview Hub',
    intro: 'Sharing Bayview Hub’s fit check for the Victorian Backyard Small Second Home framework.',
  },
  '/backyard-small-second-home/victoria-rules': {
    subject: 'Victorian SSD rules — Bayview Hub',
    intro: 'Sharing Bayview Hub’s plain-English summary of Victorian Small Second Dwelling hard lines — verify on your title.',
  },
  '/backyard-small-second-home/cost-rent-roi': {
    subject: 'SSD cost and context — Bayview Hub',
    intro: 'Sharing Bayview Hub’s indicative Victorian SSD cost tiers and rental context (not a quote).',
  },
  '/backyard-small-second-home/granny-flat-victoria': {
    subject: 'Granny flat / SSD Victoria — Bayview Hub',
    intro: 'Sharing Bayview Hub’s page mapping “granny flat” searches to the Victorian SSD framework.',
  },
  '/backyard-small-second-home/mornington-peninsula': {
    subject: 'SSD Mornington Peninsula — Bayview Hub',
    intro: 'Sharing Bayview Hub’s Mornington Peninsula context for small second dwellings — overlays and site review.',
  },
  '/backyard-small-second-home/feasibility-check': {
    subject: 'SSD feasibility check — Bayview Hub',
    intro: 'Sharing Bayview Hub’s interactive Victorian SSD feasibility checklist and optional written response.',
  },
  '/zh/backyard-small-second-home/approach': {
    subject: '为何采用 SSD 路径 — Bayview Hub',
    intro:
      '分享 Bayview Hub 关于为何先做维州后院第二小住宅法规与报批路径解释的页面。',
  },
  '/zh/backyard-small-second-home/is-this-for-you': {
    subject: '这条路径适合你吗 — Bayview Hub',
    intro: '分享 Bayview Hub 帮助你判断维州后院第二小住宅框架是否匹配的筛选页。',
  },
  '/zh/backyard-small-second-home/victoria-rules': {
    subject: '维州 SSD 规则 — Bayview Hub',
    intro: '分享 Bayview Hub 用中文概括的维多利亚州小型第二住宅硬指标摘要，请在你的产权证上核实。',
  },
  '/zh/backyard-small-second-home/cost-rent-roi': {
    subject: 'SSD 成本与市场语境 — Bayview Hub',
    intro: '分享 Bayview Hub 的维州后院第二小住宅建造成本区间与租金语境提示（不构成报价）。',
  },
  '/zh/backyard-small-second-home/granny-flat-victoria': {
    subject: '维州祖母房 / SSD — Bayview Hub',
    intro: '分享 Bayview Hub 将「祖母房」搜索对应到维州小型第二住宅框架的说明。',
  },
  '/zh/backyard-small-second-home/mornington-peninsula': {
    subject: '莫宁顿半岛 SSD 语境 — Bayview Hub',
    intro: '分享 Bayview Hub 关于莫宁顿半岛小型第二住宅覆盖层与场地审查的语境说明。',
  },
  '/zh/backyard-small-second-home/feasibility-check': {
    subject: 'SSD 可行性检查 — Bayview Hub',
    intro: '分享 Bayview Hub 的维州后院第二小住宅互动检查表与可选书面可行性回复。',
  },
} as const

export type SsdFunnelSharePath = keyof typeof SSD_FUNNEL_SHARE
