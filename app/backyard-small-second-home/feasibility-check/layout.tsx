import type { Metadata } from "next";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { LAST_UPDATED } from "@/lib/seo";

export const metadata: Metadata = {
  title: "SSD Logic Engine | Path to Approval Matrix — Victoria 2026",
  description: "Determine your SSD approval pathway: Green Lane (no planning permit), VicSmart (10-day), or standard process. Victorian VC253/VC282 compliance tool.",
  alternates: {
    canonical: "https://www.bayviewhub.me/backyard-small-second-home/feasibility-check",
  },
  openGraph: {
    title: "SSD Logic Engine | Path to Approval Matrix — Victoria 2026",
    description: "Determine your SSD approval pathway: Green Lane (no planning permit), VicSmart (10-day), or standard process.",
    url: "https://www.bayviewhub.me/backyard-small-second-home/feasibility-check",
    siteName: "Bayview Hub",
    type: "website",
  },
  keywords: [
    "SSD Victoria",
    "Small Second Dwelling",
    "Clause 54.03",
    "Deemed-to-Comply",
    "VicSmart",
    "VC253",
    "VC282",
    "Victorian planning",
    "60 sqm dwelling",
    "no planning permit",
  ],
};

// FAQ data for JSON-LD
const faqData = [
  {
    question: "What is the Green Lane pathway for SSDs in Victoria?",
    answer: "Green Lane means your SSD meets all Deemed-to-Comply criteria under Clause 54.03: ≤60sqm, behind front wall, no gas, 25sqm POS retained, compliant setbacks, no triggered overlays. No planning permit required. Proceed directly to building permit."
  },
  {
    question: "What triggers VicSmart instead of Green Lane?",
    answer: "VicSmart applies when your SSD is otherwise compliant but triggers minor overlays (Heritage, Flood, etc.) or requires minor setback variations. Council must decide within 10 business days under VC282. No neighbor notification required."
  },
  {
    question: "What puts an SSD project in the Red Zone?",
    answer: "GFA exceeding 60 sqm or front-yard siting immediately disqualifies SSD pathway. Expect standard planning permit: 12-18 months, neighbor notification, potential objections, VCAT risk."
  },
  {
    question: "What are the VC253/VC282 hard constraints for SSDs?",
    answer: "Maximum 60 sqm GFA, siting behind front wall line, all-electric (no reticulated gas), no subdivision from main lot, main dwelling retains 25 sqm private open space."
  },
  {
    question: "Is building permit still required for Green Lane SSDs?",
    answer: "Yes. Building permit is always mandatory for structural safety, energy compliance, and NCC requirements. Green Lane bypasses planning permit, not building permit."
  },
  {
    question: "Can I subdivide an SSD from my property?",
    answer: "No. Under VC253/VC282, SSDs cannot be subdivided from the main lot. Subdivision intent disqualifies you from the SSD framework entirely."
  }
];

// JSON-LD structured data - Victorian SSD Regulatory Expert
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
    "@type": "ProfessionalService",
    "name": "Victorian SSD Regulatory Compliance Service",
    "description": "Small Second Dwelling feasibility assessment and Path to Approval determination under Victorian Planning Provisions VC253/VC282. Green Lane, VicSmart, and standard pathway analysis. Clause 54.03 Deemed-to-Comply specialist.",
    "serviceType": [
      "SSD Feasibility Assessment",
      "Path to Approval Analysis",
      "Clause 54.03 Compliance",
      "VicSmart Pathway Provider"
    ],
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
      "description": "48-hour feasibility assessment with Path to Approval determination"
    },
    "knowsAbout": [
      "Victorian Planning Provisions",
      "Clause 54.03 Deemed-to-Comply",
      "VC253 Small Second Dwelling regulations",
      "VC282 VicSmart expedited pathway",
      "Residential development Victoria"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SSD Path to Approval Engine",
    "description": "Interactive tool to determine Victorian SSD approval pathway: Green Lane (no planning permit), VicSmart (10-day approval), or Red Zone (standard planning process).",
    "applicationCategory": "Planning Tool",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AUD"
    }
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
      {/* Answer Capsule - above the fold */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <AnswerCapsule
            definition="Automated Deemed-to-Comply validation and Path to Approval engine. Determines Green Lane (no planning permit), VicSmart (10-day), or Red Zone (standard planning)."
            facts={[
              "Green Lane: full compliance → no planning permit. Proceed to building permit.",
              "VicSmart: minor overlays or variations → 10-day council decision.",
              "Red Zone: GFA >60sqm or front-yard siting → standard planning process.",
              "VC253/VC282 hard constraints: 60sqm max, behind front wall, all-electric, no subdivision.",
            ]}
            sources={[
              { label: "DTP SSD Guidelines", href: "https://www.planning.vic.gov.au/guides-and-resources/guides/small-second-dwellings" },
              { label: "Backyard Small Second Home Hub", href: "https://www.bayviewhub.me/backyard-small-second-home" },
              { label: "Victoria Rules", href: "https://www.bayviewhub.me/backyard-small-second-home/victoria-rules" },
              { label: "Cost & ROI", href: "https://www.bayviewhub.me/backyard-small-second-home/cost-rent-roi" },
            ]}
            lastUpdated={LAST_UPDATED}
          />
        </div>
      </div>
      {children}
    </>
  );
}
