import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSD Feasibility Checklist (Victoria 2026) | Small Second Dwelling Compliance Tool",
  description: "Check your site against Victorian SSD Deemed-to-Comply criteria (Clause 54.03) before paying for design. 60 sqm max, no subdivision, all-electric.",
  alternates: {
    canonical: "https://www.bayviewhub.me/backyard-second-home/feasibility-checklist",
  },
  openGraph: {
    title: "SSD Feasibility Checklist (Victoria 2026)",
    description: "Small Second Dwelling compliance tool: check feasibility against Clause 54.03 Deemed-to-Comply criteria before you pay for design.",
    url: "https://www.bayviewhub.me/backyard-second-home/feasibility-checklist",
    siteName: "Bayview Hub",
    type: "website",
  },
};

// FAQ data for JSON-LD (SSR) - SSD focused
const faqData = [
  {
    question: "What is a Small Second Dwelling (SSD) in Victoria?",
    answer: "An SSD is a self-contained dwelling of up to 60 sqm built on the same lot as an existing house. Under Clause 54.03 of the Victorian Planning Provisions, SSDs meeting specific criteria qualify for 'Deemed-to-Comply' status — meaning no planning permit is required."
  },
  {
    question: "What are the key SSD requirements in Victoria?",
    answer: "Maximum 60 sqm floor area, must be behind the front wall line of the main dwelling, cannot connect to reticulated gas (all-electric required), cannot be subdivided from the main lot, and main dwelling must retain at least 25 sqm of private open space."
  },
  {
    question: "Do I need a planning permit for an SSD?",
    answer: "If your SSD meets all Deemed-to-Comply criteria under Clause 54.03, no planning permit is required. You proceed directly to building permit with a registered building surveyor."
  },
  {
    question: "Can I subdivide an SSD from my property?",
    answer: "No. An SSD cannot be subdivided from the main lot. It must remain on the same title as the main dwelling."
  },
  {
    question: "What kills SSD feasibility?",
    answer: "Common blockers include inadequate site access, easements in the buildable area, steep slopes, insufficient lot size to meet siting and POS requirements, and restrictive planning overlays."
  },
  {
    question: "What happens if my site doesn't meet Deemed-to-Comply criteria?",
    answer: "You may still be able to build, but you'll need a planning permit. This adds time and uncertainty. We'll tell you early if your site doesn't meet the criteria."
  }
];

// JSON-LD structured data (SSR) - SSD focused
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
    "name": "Victorian Small Second Dwelling (SSD) Feasibility Service",
    "description": "Professional feasibility assessment for Small Second Dwellings (SSDs) in Victoria, Australia. Compliance check against Clause 54.03 Deemed-to-Comply criteria. 60 sqm maximum, no subdivision, all-electric design.",
    "serviceType": "Small Second Dwelling Feasibility Assessment",
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
      "url": "https://www.bayviewhub.me",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      }
    },
    "offers": {
      "@type": "Offer",
      "description": "48-hour professional feasibility report for SSD compliance"
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
