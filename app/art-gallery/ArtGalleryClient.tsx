'use client'

import React, { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GALLERY_EXTERNAL, SITE_CONFIG } from '@/lib/constants'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'
import { TrackedOutboundConversionLink } from '@/components/analytics/TrackedOutboundConversionLink'
import { TrackedTelLink } from '@/components/analytics/TrackedTelLink'
import { getAttribution, track } from '@/lib/analytics'
import { localizedHref } from '@/lib/language-routing'

const galleryEoiFieldClass = `${CONTRAST_FORM_CONTROL_CLASS} text-lg focus:ring-accent dark:focus:ring-accent`

type Locale = 'en' | 'zh'

const COPY: Record<
  Locale,
  {
    imgAlt: string
    heroEyebrow: string
    heroTitle: string
    heroSub: string
    heroBodyLead: string
    heroVisitors: string
    heroEvidenceNote: string
    visitGallery: string
    inquireNow: string
    spaceEyebrow: string
    spaceTitle: string
    spaceDesc: string
    ecoEyebrow: string
    ecoVisitors: string
    ecoVisitorsNote: string
    ecoDesc: string
    partnerEyebrow: string
    partnerTitle: string
    partnerDesc: string
    artistsEyebrow: string
    artistsTitle: string
    artistsDesc: string
    submitCuration: string
    exhibitionEnquiry: string
    nextEyebrow: string
    formTitle: string
    seriousOnly: string
    successTitle: string
    successDesc: string
    nameLbl: string
    emailLbl: string
    backgroundLbl: string
    visionLbl: string
    backgroundPlaceholder: string
    visionPlaceholder: string
    submitting: string
    submitBtn: string
    errorEmail: string
    footerPrefer: string
  }
> = {
  en: {
    imgAlt: 'Gallery artwork',
    heroEyebrow: 'Founding Partnership',
    heroTitle: 'A Gallery Inside A Living Destination',
    heroSub: '— Not a White Cube in Isolation.',
    heroBodyLead:
      "Build a contemporary gallery within Bayview Hub's 30-acre estate — with dining, wine, music, gardens, and ",
    heroVisitors: 'estimated 50k+ annual visitors',
    heroEvidenceNote: ' (see Evidence) already in motion.',
    visitGallery: 'Visit Gallery',
    inquireNow: 'Inquire Now',
    spaceEyebrow: 'The Space',
    spaceTitle: 'Beyond The White Cube',
    spaceDesc: 'A gallery integrated into a living destination. Art encountered in context — not sterile isolation.',
    ecoEyebrow: 'The Ecosystem',
    ecoVisitors: 'Estimated 50k+ Annual Visitors',
    ecoVisitorsNote: '(see Evidence)',
    ecoDesc:
      'Restaurant, cellar door, gardens, live music. The audience arrives for hospitality — you curate what they discover.',
    partnerEyebrow: 'The Partnership',
    partnerTitle: 'Founding Terms',
    partnerDesc:
      'No commercial rent. Full creative autonomy. Revenue share or equity hybrid negotiable.',
    artistsEyebrow: 'Physical Gallery',
    artistsTitle: 'For Artists & Galleries',
    artistsDesc:
      "Submit your work for curatorial review. Selected artists are invited to exhibit at Bayview Hub's physical gallery. Sales are handled in-person during exhibitions and private viewings.",
    submitCuration: 'Submit for Curation',
    exhibitionEnquiry: 'Exhibition Enquiry',
    nextEyebrow: 'Next Step',
    formTitle: 'Inquire About Partnership',
    seriousOnly: 'Serious inquiries only.',
    successTitle: 'Inquiry Received',
    successDesc: "We'll reach out if aligned.",
    nameLbl: 'Name *',
    emailLbl: 'Email *',
    backgroundLbl: 'Background *',
    visionLbl: 'Vision *',
    backgroundPlaceholder: 'Curation, gallery, or relevant experience',
    visionPlaceholder: 'What would you build here?',
    submitting: 'Submitting...',
    submitBtn: 'Submit Inquiry',
    errorEmail: 'Error. Email:',
    footerPrefer: 'Prefer direct conversation?',
  },
  zh: {
    imgAlt: '美术馆作品配图',
    heroEyebrow: '创始合作关系',
    heroTitle: '把美术馆放进一个真正生活着的度假目的地',
    heroSub: '——不是孤零零的白盒子。',
    heroBodyLead:
      '在 Bayview Hub 占地约三十英亩的庄园环境里建设一座当代美术馆——这里有餐饮、酒窖、园艺、音乐，以及 ',
    heroVisitors: '预计每年访客达 5 万以上',
    heroEvidenceNote: '（见客流量证据页）等资源已在运转。',
    visitGallery: '访问线上展厅',
    inquireNow: '立即咨询合作',
    spaceEyebrow: '空间叙事',
    spaceTitle: '超越白盒子',
    spaceDesc: '美术馆嵌入复合型目的地——艺术在语境里被遇见，而不是被关在无菌空间里。',
    ecoEyebrow: '客群与生态',
    ecoVisitors: '预计每年访客 5 万+',
    ecoVisitorsNote: '（详见证据页）',
    ecoDesc:
      '餐厅、酒窖、园艺、现场音乐——人们为餐饮与到访而来，你选择他们在这里看见什么样的艺术。',
    partnerEyebrow: '合作方式',
    partnerTitle: '创始条款概要',
    partnerDesc:
      '无商业地产式固定租金；创作自主度高；收益分成或类股权安排的混合条款可商谈。',
    artistsEyebrow: '线下实体展厅',
    artistsTitle: '致艺术家与画廊伙伴',
    artistsDesc:
      '提交作品以供策展甄选。入围艺术家可受邀于 Bayview Hub 线下空间展出；销售在展览期间与私密观展场景中完成。',
    submitCuration: '提交策展审阅',
    exhibitionEnquiry: '展览与合作垂询',
    nextEyebrow: '下一步',
    formTitle: '合作意向咨询',
    seriousOnly: '仅限认真、可推进的合作沟通。',
    successTitle: '已收到意向',
    successDesc: '如方向契合，我们会联系你。',
    nameLbl: '姓名 *',
    emailLbl: '邮箱 *',
    backgroundLbl: '背景 *',
    visionLbl: '设想 *',
    backgroundPlaceholder: '策展、画廊或相关经验',
    visionPlaceholder: '你在此想建立什么样的项目？',
    submitting: '提交中…',
    submitBtn: '提交咨询',
    errorEmail: '提交出错。可发邮件至',
    footerPrefer: '更想直接沟通？',
  },
}

export function ArtGalleryClient({ locale = 'en' }: { locale?: Locale }) {
  const pathname = usePathname() || (locale === 'zh' ? '/zh/art-gallery/founding-partners' : '/art-gallery/founding-partners')
  const t = COPY[locale]
  const evidenceHref = localizedHref('/evidence/visitor-traffic', locale)

  const formStarted = useRef(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    background: '',
    vision: '',
    structure: '',
    availability: '',
    neverShow: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/eoi-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          background: formData.background,
          vision: formData.vision,
          experience: formData.structure,
        }),
      })

      const data = await res.json()

      if (data.ok) {
        const sp =
          typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
        const attr = getAttribution(sp)
        track('partner_eoi_submit', {
          form_id: 'gallery_founding_curator_eoi',
          page_section: 'art_gallery_founding_partners',
          page_path: pathname,
          ...attr,
        })
        track('form_submit', {
          form_id: 'gallery_founding_curator_eoi',
          page_section: 'art_gallery_founding_partners',
          page_path: pathname,
          outcome: 'success',
          ...attr,
        })
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          linkedin: '',
          background: '',
          vision: '',
          structure: '',
          availability: '',
          neverShow: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="min-h-[80vh] flex">
        <div className="hidden md:flex w-1/2 bg-neutral-800 items-center justify-center">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="/images/gallery-artwork.jpg"
              alt={t.imgAlt}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 py-20">
          <div className="max-w-lg">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">{t.heroEyebrow}</p>

            <h1
              className="text-fg text-5xl md:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}
            >
              {t.heroTitle}
            </h1>

            <p className="text-muted italic text-3xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t.heroSub}
            </p>

            <p
              className="text-muted mb-10 text-lg"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8', maxWidth: '650px' }}
            >
              {t.heroBodyLead}
              <a href={evidenceHref} className="text-accent hover:underline">
                {t.heroVisitors}
              </a>
              {t.heroEvidenceNote}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://gallery.bayviewhub.me"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-white text-sm tracking-wide uppercase hover:bg-accent-hover transition-all"
              >
                {t.visitGallery}
              </a>
              <a
                href="#inquiry"
                className="px-6 py-3 border border-border text-fg text-sm tracking-wide uppercase hover:bg-accent hover:text-white hover:border-accent transition-all"
              >
                {t.inquireNow}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-border">
            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">{t.spaceEyebrow}</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                {t.spaceTitle}
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                {t.spaceDesc}
              </p>
            </div>

            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">{t.ecoEyebrow}</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                <a href={evidenceHref} className="text-accent hover:underline">
                  {t.ecoVisitors}
                </a>{' '}
                {t.ecoVisitorsNote}
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                {t.ecoDesc}
              </p>
            </div>

            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">{t.partnerEyebrow}</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                {t.partnerTitle}
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                {t.partnerDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">{t.artistsEyebrow}</p>
            <h2 className="text-fg text-4xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              {t.artistsTitle}
            </h2>
            <p className="text-muted text-lg mb-8" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
              {t.artistsDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedOutboundConversionLink
                href={`${GALLERY_EXTERNAL.base}/portal/submit`}
                eventName="artist_submission_start"
                pageSection="art_gallery_founding_partners"
                className="px-6 py-3 bg-accent text-white text-sm tracking-wide uppercase hover:bg-accent-hover transition-all"
              >
                {t.submitCuration}
              </TrackedOutboundConversionLink>
              <a
                href="#inquiry"
                className="px-6 py-3 border border-border text-fg text-sm tracking-wide uppercase hover:bg-accent hover:text-white hover:border-accent transition-all"
              >
                {t.exhibitionEnquiry}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="inquiry" className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 text-center">{t.nextEyebrow}</p>
            <h2 className="text-fg text-4xl mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              {t.formTitle}
            </h2>
            <p className="text-subtle text-center mb-8 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              {t.seriousOnly}
            </p>

            {status === 'success' ? (
              <div className="border border-border p-8 text-center">
                <div className="text-accent text-4xl mb-4">✓</div>
                <h3 className="text-fg text-xl mb-2">{t.successTitle}</h3>
                <p className="text-subtle">{t.successDesc}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocusCapture={() => {
                  if (formStarted.current) return
                  formStarted.current = true
                  const sp =
                    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
                  const attr = getAttribution(sp)
                  track('form_start', {
                    form_id: 'gallery_founding_curator_eoi',
                    page_section: 'art_gallery_founding_partners',
                    page_path: pathname,
                    ...attr,
                  })
                }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-muted text-sm mb-2">{t.nameLbl}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={galleryEoiFieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-muted text-sm mb-2">{t.emailLbl}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={galleryEoiFieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">{t.backgroundLbl}</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    placeholder={t.backgroundPlaceholder}
                    className={galleryEoiFieldClass}
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">{t.visionLbl}</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    placeholder={t.visionPlaceholder}
                    className={galleryEoiFieldClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 border border-border text-fg text-base tracking-wide uppercase hover:bg-accent hover:text-white hover:border-accent transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? t.submitting : t.submitBtn}
                </button>

                {status === 'error' && (
                  <p className="text-muted text-center text-sm">
                    {t.errorEmail} {SITE_CONFIG.email}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border text-center">
        <p className="text-muted mb-2">{t.footerPrefer}</p>
        <p className="text-fg">
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-accent transition-colors">
            {SITE_CONFIG.email}
          </a>
          {' · '}
          <TrackedTelLink href={`tel:${SITE_CONFIG.phone}`} pageSection="art_gallery_founding_partners" className="hover:text-accent transition-colors">
            {SITE_CONFIG.phone}
          </TrackedTelLink>
        </p>
      </section>
    </>
  )
}
