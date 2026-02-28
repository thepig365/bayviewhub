import React from 'react'
import { LAST_UPDATED } from '@/lib/seo'
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = genMeta({
  title: 'Terms of Service',
  description:
    'Read Bayview Hub’s terms of service for bookings, participation, subscriptions, liabilities, and acceptable use.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-5xl font-serif font-bold text-fg mb-8">
            Terms of Service
          </h1>
          
          <p className="text-muted mb-8">
            Last updated: {LAST_UPDATED}
          </p>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Agreement to Terms
            </h2>
            <p className="text-muted leading-relaxed">
              By accessing or using Bayview Hub's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Bookings and Reservations
            </h2>
            <h3 className="text-xl font-bold text-fg mb-3">Confirmation</h3>
            <p className="text-muted mb-4">
              All bookings are subject to availability and confirmation. We reserve the right to refuse service or cancel bookings at our discretion.
            </p>
            
            <h3 className="text-xl font-bold text-fg mb-3">Cancellation Policy</h3>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Restaurant: 24 hours notice required</li>
              <li>Workshops: 48 hours notice for refund</li>
              <li>Events: Refer to specific event terms</li>
              <li>Garden subscriptions: Subject to subscription terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Garden Subscriptions
            </h2>
            <h3 className="text-xl font-bold text-fg mb-3">Subscription Terms</h3>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Subscriptions are billed seasonally</li>
              <li>Harvest boxes subject to seasonal availability</li>
              <li>Garden day cancellations due to weather will be rescheduled</li>
              <li>Subscriptions may be paused with 2 weeks notice</li>
              <li>Refunds subject to our refund policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Workshops and Programs
            </h2>
            <h3 className="text-xl font-bold text-fg mb-3">Participation Requirements</h3>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Participants must meet age requirements for specific programs</li>
              <li>Health and safety guidelines must be followed</li>
              <li>Programs are not a substitute for clinical therapy</li>
              <li>Minimum numbers required for programs to proceed</li>
            </ul>

            <h3 className="text-xl font-bold text-fg mb-3">Liability</h3>
            <p className="text-muted">
              Participants engage in workshops at their own risk. We maintain appropriate insurance but are not liable for injuries or losses beyond our legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Intellectual Property
            </h2>
            <p className="text-muted">
              All content on this website, including text, images, logos, and artwork, is the property of Bayview Hub or its licensors and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              User Conduct
            </h2>
            <p className="text-muted mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Use our services for any unlawful purpose</li>
              <li>Interfere with or disrupt our website</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Post or transmit harmful or offensive content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Photography and Media
            </h2>
            <p className="text-muted">
              Events and programs may be photographed or recorded for promotional purposes. By attending, you consent to the use of your image in our marketing materials unless you notify us otherwise.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Limitation of Liability
            </h2>
            <p className="text-muted">
              To the fullest extent permitted by law, Bayview Hub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Changes to Terms
            </h2>
            <p className="text-muted">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Governing Law
            </h2>
            <p className="text-muted">
              These Terms are governed by the laws of Victoria, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Victoria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-fg mb-4">
              Contact Information
            </h2>
            <p className="text-muted">
              For questions about these Terms of Service, please contact:
            </p>
            <p className="text-muted mt-4">
              Bayview Hub<br />
              Email: {SITE_CONFIG.email}<br />
              Phone: {SITE_CONFIG.phone}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

