# Art Work for Private Walls 页面 Brief（中文）

## 1. 页面定位

**Art Work for Private Walls** 是 BayviewHub Private Viewing / Passport programme 的一个**独立公共层**。

它不是主 curated archive，也不是公开 marketplace，而是一个公开可见、但仍由 BayviewHub 中介和规则约束的展示层，用来承接：

- host 选择公开的作品
- Bayview staff / admin 选择公开的作品
- 未来可能被进一步考虑进入 online curation 或 future in-person programming 的作品

---

## 2. 这个页面是什么，不是什么

### 它是
- Private Viewing Network 的公共展示层
- enquiry-first 的公共作品页
- host works / private wall works 的独立公共入口
- BayviewHub 在线画廊的 narrative extension
- 从 private record 走向 public visibility 的过渡层

### 它不是
- 主 `/archive` curated collection
- 面向所有人的 open-access home tour programme
- marketplace
- 普通 submit board
- 自动等于被 Bayview curated 的页面

---

## 3. 三层显示系统

### Layer 1 — Private Record Only
- 路径：`/passport/record/[token]`
- selective sharing only
- 不公开索引
- 图片走 private bucket + signed URL
- 不出现在公开 listing 页

### Layer 2 — Public Private Walls
- 路径：`/art-work-for-private-walls`
- 公开显示通过该 programme 可见的作品
- 这些作品可以由 host 选择公开，或由 Bayview staff/admin 公开
- 仍然 enquiry-first
- 仍然不等于主 curated archive

### Layer 3 — Main Curated Archive
- 路径：`/archive` 及主 artwork detail pages
- 只包含明确进入 Bayview 主 curated collection 的作品
- 与 Private Walls 层严格区分

---

## 4. 页面核心信息

这页必须明确告诉访客：

1. 这些作品是通过 Private Viewing Network / Private Walls programme 被公开展示的
2. 它们不一定属于 BayviewHub 主 curated archive
3. BayviewHub 仍然是 enquiry 和 viewing relationship 的中介者
4. 作品公开不代表自动销售、自动展览、自动 representation

---

## 5. 页面文案方向

### 页面标题
**Art Work for Private Walls**

### 建议副标题
A public-facing selection of works made visible through BayviewHub’s Private Viewing Network.

### 建议说明段
These works may be publicly shared by their hosts or presented by BayviewHub through this programme. This page is distinct from the main curated collection and remains enquiry-first.

### 语气要求
- calm
- elegant
- selective
- enquiry-first
- not hypey
- not marketplace language
- not startup/SaaS language

---

## 6. 页面信息架构建议

### Section 1 — Hero
- 标题：Art Work for Private Walls
- 副标题：说明这是 Private Viewing Network 的公共层
- CTA：Enquire / Learn How It Works

### Section 2 — What This Page Is
解释这是一个独立公共层，不等于主 curated archive

### Section 3 — How These Works Become Visible
解释作品如何从：
private record → public private walls → main curated archive（如果后续被选择）

### Section 4 — Works Grid
展示作品列表

### Section 5 — BayviewHub Mediation / Rules
说明：
- enquiry-first
- by arrangement
- Bayview mediates all interest
- host details not disclosed
- not every work enters main archive

### Section 6 — Closing CTA
- Register a Work
- Enquire via Bayview

---

## 7. 列表卡片该显示什么

每张卡片建议显示：

- 作品主图
- 标题
- 艺术家
- medium / dimensions
- 简短 note
- 标签：
  - Private Walls
  - By Request
  - QR Available（如适用）
- CTA：
  - View Work
  - Enquire via Bayview

### 不应显示
- host name
- host email
- host phone
- exact private address
- 私人接待信息

---

## 8. 详情页建议

建议为 Public Private Walls 作品增加**独立详情页**，而不是只停留在 grid。

### 详情页可显示
- artwork image
- title
- artist
- medium / dimensions
- short note
- public/private walls label
- enquiry CTA
- QR / record relationship（如适合）
- 说明该作品通过 Private Walls programme 公开可见，但不同于主 curated archive

### 不显示
- host personal details
- precise location

---

## 9. QR 与 record 的关系

QR 不建议在 listing grid 中大面积出现，否则会显得杂乱。

### 更好的做法
- grid 上只显示小 badge / icon（如适用）
- QR 放在 detail page 中
- QR 可以继续指向 record layer 或受控 detail layer
- 不要让 QR 破坏页面气质

---

## 10. Host 与 Bayview 的公开控制逻辑

### Host 侧
Host 可以选择：
- keep private only
- public on Art Work for Private Walls
- express Bayview consideration interest

### Bayview staff/admin 侧
必须能：
- 查看所有 host works
- 查看内部 host 信息
- 审核 current visibility
- publish / unpublish 到 Public Private Walls
- later promote to main curated archive if appropriate
- hide / withdraw

---

## 11. 最小数据逻辑建议

建议存在单独的可见性层，例如：

- `PRIVATE_ONLY`
- `PUBLIC_PRIVATE_WALLS`
- `PUBLIC_CURATED_ARCHIVE`

如有需要，再补充：
- `hostPublicOptIn`
- `publishedAt`
- `publishedBy`
- `publicSlug`

但第一版不必过度复杂化。

---

## 12. 与主 gallery 的关系

### 主 gallery 继续负责
- curated collection
- archive
- protocol
- submit
- main public artwork pages

### Art Work for Private Walls 负责
- programme public layer
- host/public works 公共展示
- narrative bridge between private record and public visibility
- intake funnel for Bayview consideration

### 关键边界
**Public Private Walls works 不能默认并入主 curated archive。**

---

## 13. MVP 第一版该做什么

### 要做
- 新公共页面 `/art-work-for-private-walls`
- 公开作品 grid
- enquiry-first CTA
- 与主 archive 分层
- admin/staff 可管理发布状态
- host 作品公开后可进入此页面

### 先不要做太多
- 不要把所有 private records 自动公开
- 不要把它做成 marketplace
- 不要在主 archive 和 private walls 之间模糊边界
- 不要做成开放式 social listing

---

## 14. 一句话总结

**Art Work for Private Walls 是 BayviewHub Private Viewing Network 的独立公共层：**
让某些 host/public works 被看见，但又不把 BayviewHub 主 curated archive 的门槛稀释掉。
