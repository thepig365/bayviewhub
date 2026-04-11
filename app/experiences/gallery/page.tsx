'use client'

import React, { useRef, useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'
import { TrackedTelLink } from '@/components/analytics/TrackedTelLink'
import { getAttribution, track } from '@/lib/analytics'

const galleryEoiFieldClass = `${CONTRAST_FORM_CONTROL_CLASS} text-lg focus:ring-accent dark:focus:ring-accent`

export default function GalleryPage() {
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
          page_section: 'experiences_gallery',
          page_path: '/experiences/gallery',
          ...attr,
        })
        track('form_submit', {
          form_id: 'gallery_founding_curator_eoi',
          page_section: 'experiences_gallery',
          page_path: '/experiences/gallery',
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
    <div className="min-h-screen bg-bg">
      {/* Hero: Split Screen */}
      <section className="min-h-[80vh] flex">
        <div className="hidden md:flex w-1/2 bg-border items-center justify-center">
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/gallery-artwork.jpg" 
              alt="Gallery artwork" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 py-20">
          <div className="max-w-lg">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">Founding Partnership</p>
            
            <h1 className="text-fg text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              A Gallery Inside A Living Destination
            </h1>
            
            <p className="text-muted italic text-3xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              — Not a White Cube in Isolation.
            </p>
            
            <p className="text-muted mb-10 text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8', maxWidth: '650px' }}>
              Build a contemporary gallery within Bayview Hub&apos;s 30-acre estate — with dining, wine, music, gardens, and 50k+ annual visitors already in motion.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#inquiry" className="px-6 py-3 border border-border text-fg text-base tracking-wide uppercase hover:bg-accent hover:text-white hover:border-accent transition-all">
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Grid: 3 Columns */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-border">
            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">The Space</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                Beyond The White Cube
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                A gallery integrated into a living destination. Art encountered in context — not sterile isolation.
              </p>
            </div>

            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">The Ecosystem</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                50k+ Annual Visitors
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                Restaurant, cellar door, gardens, live music. The audience arrives for hospitality — you curate what they discover.
              </p>
            </div>

            <div className="bg-bg p-10">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">The Partnership</p>
              <h3 className="text-fg text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                Founding Terms
              </h3>
              <p className="text-muted text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                No commercial rent. Full creative autonomy. Revenue share or equity hybrid negotiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 text-center">Next Step</p>
            <h2 className="text-fg text-4xl mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              Inquire About Partnership
            </h2>
            <p className="text-subtle text-center mb-8 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              Serious inquiries only.
            </p>

            {status === 'success' ? (
              <div className="border border-border p-8 text-center">
                <div className="text-accent text-4xl mb-4">✓</div>
                <h3 className="text-fg text-xl mb-2">Inquiry Received</h3>
                <p className="text-subtle">We'll reach out if aligned.</p>
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
                    page_section: 'experiences_gallery',
                    page_path: '/experiences/gallery',
                    ...attr,
                  })
                }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-muted text-base mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={galleryEoiFieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-muted text-base mb-2">Email *</label>
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
                  <label className="block text-muted text-base mb-2">Background *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    placeholder="Curation, gallery, or relevant experience"
                    className={galleryEoiFieldClass}
                  />
                </div>

                <div>
                  <label className="block text-muted text-base mb-2">Vision *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    placeholder="What would you build here?"
                    className={galleryEoiFieldClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 border border-border text-fg text-base tracking-wide uppercase hover:bg-accent hover:text-white hover:border-accent transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                </button>

                {status === 'error' && (
                  <p className="text-muted text-center text-base">
                    Error. Email: {SITE_CONFIG.email}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 border-t border-border text-center">
        <p className="text-muted mb-2">Prefer direct conversation?</p>
        <p className="text-fg">
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-accent transition-colors">{SITE_CONFIG.email}</a>
          {' · '}
          <TrackedTelLink href={`tel:${SITE_CONFIG.phone}`} pageSection="experiences_gallery" className="hover:text-accent transition-colors">
            {SITE_CONFIG.phone}
          </TrackedTelLink>
        </p>
      </section>
    </div>
  )
}
