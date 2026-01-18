import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backyard Second Home Feasibility Checklist (Victoria) | Zoning, Overlays, Access, Services",
  description: "Check feasibility before you pay for design: a quick self-check plus follow-up review of zoning, overlays, access, and services for Victoria sites.",
  alternates: {
    canonical: "https://www.bayviewhub.me/backyard-second-home/feasibility-checklist",
  },
  openGraph: {
    title: "Backyard Second Home Feasibility Checklist (Victoria)",
    description: "Check feasibility before you pay for design: a quick self-check plus follow-up review of zoning, overlays, access, and services for Victoria sites.",
    url: "https://www.bayviewhub.me/backyard-second-home/feasibility-checklist",
    siteName: "Bayview Hub",
    type: "website",
  },
};

// FAQ data for JSON-LD (SSR)
const faqData = [
  {
    question: "Do I need a permit for a backyard second home in Victoria?",
    answer: "Often yes. Zoning, overlays, and servicing can trigger planning and building requirements depending on your site."
  },
  {
    question: "What usually kills feasibility for a backyard second home?",
    answer: "Tight access, steep slopes, major overlays, and expensive service upgrades are common deal-breakers."
  },
  {
    question: "Can I design it for family now and long-term rental later?",
    answer: "Yes, this is common. Designing with rental compliance in mind from the start makes transitioning straightforward."
  },
  {
    question: "What is a backyard second home in Victoria?",
    answer: "A self-contained dwelling on the same lot as an existing home. It can be attached or detached and must meet planning and building requirements."
  },
  {
    question: "What happens if my site is not feasible?",
    answer: "We tell you early and explain why. You receive a clear summary of constraints and any potential workarounds."
  },
  {
    question: "What do you check after I submit?",
    answer: "Zoning, overlays, access constraints, services likely to impact cost, common design blockers, and approval pathway risk level."
  }
];

// JSON-LD structured data (SSR)
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Backyard Second Home Feasibility Checklist",
    "description": "A quick self-check plus follow-up review of zoning, overlays, access, and services for Victoria sites.",
    "areaServed": {
      "@type": "State",
      "name": "Victoria",
      "containedInPlace": {
        "@type": "Country",
        "name": "Australia"
      }
    },
    "provider": {
      "@type": "Organization",
      "name": "Bayview Hub",
      "url": "https://www.bayviewhub.me"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bayview Hub",
    "url": "https://www.bayviewhub.me"
  }
];

export default function FeasibilityChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
