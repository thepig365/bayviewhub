"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
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
              Thank you for your enquiry
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              We've received your feasibility request and will get back to you
              within 48 hours with our initial assessment.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-colors"
              data-testid="button-back-home"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
