import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-5xl font-serif font-bold text-natural-900 mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-natural-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Introduction
            </h2>
            <p className="text-natural-700 leading-relaxed">
              Bayview Hub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Information We Collect
            </h2>
            <h3 className="text-xl font-bold text-natural-800 mb-3">Personal Information</h3>
            <p className="text-natural-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-natural-700 space-y-2">
              <li>Make a booking or reservation</li>
              <li>Subscribe to our newsletter</li>
              <li>Apply for partnership or employment</li>
              <li>Contact us with inquiries</li>
              <li>Subscribe to our gardens program</li>
            </ul>
            
            <h3 className="text-xl font-bold text-natural-800 mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-natural-700 mb-4">
              We automatically collect certain information when you visit our website, including:
            </p>
            <ul className="list-disc pl-6 text-natural-700 space-y-2">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-natural-700 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To process bookings and subscriptions</li>
              <li>To send you newsletters and marketing communications (with your consent)</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-natural-700 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-natural-700 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for transaction processing</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Your Rights
            </h2>
            <p className="text-natural-700 mb-4">
              Under Australian Privacy Principles, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-natural-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-natural-700">
              We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
              Contact Us
            </h2>
            <p className="text-natural-700">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-natural-700 mt-4">
              Email: hello@bayviewhub.com.au<br />
              Phone: +61 (0)X XXXX XXXX
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

