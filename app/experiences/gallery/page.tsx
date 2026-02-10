'use client'

import React, { useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'

export default function GalleryPage() {
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
    <div className="min-h-screen bg-[#121212]">
      {/* Hero: Split Screen */}
      <section className="min-h-[80vh] flex">
        <div className="hidden md:flex w-1/2 bg-neutral-800 items-center justify-center">
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
            <p className="text-[#FDFE9A] text-sm tracking-[0.3em] uppercase mb-6">Founding Partnership</p>
            
            <h1 className="text-[#F5F5F0] text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              A Gallery Inside A Living Destination
            </h1>
            
            <p className="text-[#F5F5F0]/70 italic text-3xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              — Not a White Cube in Isolation.
            </p>
            
            <p className="text-[#F5F5F0]/80 mb-10 text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8', maxWidth: '650px' }}>
              Build a contemporary gallery within Bayview Hub&apos;s 30-acre estate — with dining, wine, music, gardens, and 50k+ annual visitors already in motion.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#inquiry" className="px-6 py-3 border border-[#F5F5F0]/40 text-[#F5F5F0] text-sm tracking-wide uppercase hover:bg-[#FDFE9A] hover:text-[#121212] hover:border-[#FDFE9A] transition-all">
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Grid: 3 Columns */}
      <section className="py-16 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-neutral-800">
            <div className="bg-[#121212] p-10">
              <p className="text-[#FDFE9A] text-sm tracking-[0.2em] uppercase mb-4">The Space</p>
              <h3 className="text-[#F5F5F0] text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                Beyond The White Cube
              </h3>
              <p className="text-[#F5F5F0]/70 text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                A gallery integrated into a living destination. Art encountered in context — not sterile isolation.
              </p>
            </div>

            <div className="bg-[#121212] p-10">
              <p className="text-[#FDFE9A] text-sm tracking-[0.2em] uppercase mb-4">The Ecosystem</p>
              <h3 className="text-[#F5F5F0] text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                50k+ Annual Visitors
              </h3>
              <p className="text-[#F5F5F0]/70 text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                Restaurant, cellar door, gardens, live music. The audience arrives for hospitality — you curate what they discover.
              </p>
            </div>

            <div className="bg-[#121212] p-10">
              <p className="text-[#FDFE9A] text-sm tracking-[0.2em] uppercase mb-4">The Partnership</p>
              <h3 className="text-[#F5F5F0] text-3xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
                Founding Terms
              </h3>
              <p className="text-[#F5F5F0]/70 text-lg" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}>
                No commercial rent. Full creative autonomy. Revenue share or equity hybrid negotiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <p className="text-[#FDFE9A] text-sm tracking-[0.3em] uppercase mb-4 text-center">Next Step</p>
            <h2 className="text-[#F5F5F0] text-4xl mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}>
              Inquire About Partnership
            </h2>
            <p className="text-[#F5F5F0]/60 text-center mb-8 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              Serious inquiries only.
            </p>

            {status === 'success' ? (
              <div className="border border-neutral-700 p-8 text-center">
                <div className="text-[#FDFE9A] text-4xl mb-4">✓</div>
                <h3 className="text-[#F5F5F0] text-xl mb-2">Inquiry Received</h3>
                <p className="text-[#F5F5F0]/60">We'll reach out if aligned.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F5F5F0]/80 text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-neutral-700 text-[#F5F5F0] text-lg focus:border-[#FDFE9A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F5F5F0]/80 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-neutral-700 text-[#F5F5F0] text-lg focus:border-[#FDFE9A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#F5F5F0]/80 text-sm mb-2">Background *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    placeholder="Curation, gallery, or relevant experience"
                    className="w-full px-4 py-3 bg-transparent border border-neutral-700 text-[#F5F5F0] text-lg placeholder-neutral-600 focus:border-[#FDFE9A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F5F5F0]/80 text-sm mb-2">Vision *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    placeholder="What would you build here?"
                    className="w-full px-4 py-3 bg-transparent border border-neutral-700 text-[#F5F5F0] text-lg placeholder-neutral-600 focus:border-[#FDFE9A] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 border border-[#F5F5F0]/40 text-[#F5F5F0] text-base tracking-wide uppercase hover:bg-[#FDFE9A] hover:text-[#121212] hover:border-[#FDFE9A] transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                </button>

                {status === 'error' && (
                  <p className="text-neutral-500 text-center text-sm">
                    Error. Email: {SITE_CONFIG.email}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 border-t border-neutral-800 text-center">
        <p className="text-neutral-500 mb-2">Prefer direct conversation?</p>
        <p className="text-[#F5F5F0]">
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#FDFE9A] transition-colors">{SITE_CONFIG.email}</a>
          {' · '}
          <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#FDFE9A] transition-colors">{SITE_CONFIG.phone}</a>
        </p>
      </section>
    </div>
  )
}
