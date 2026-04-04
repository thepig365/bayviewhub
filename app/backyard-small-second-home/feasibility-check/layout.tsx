import type { Metadata } from "next";
import Link from "next/link";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { SsdPageHero } from "@/components/ssd/SsdPageHero";
import { SsdPageShare } from "@/components/ssd/SsdPageShare";
import { SITE_CONFIG } from "@/lib/constants";
import { LAST_UPDATED } from "@/lib/seo";

const SSD_FEASIBILITY_PATH = "/backyard-small-second-home/feasibility-check" as const;
const feasibilityCanonical = `${SITE_CONFIG.url}${SSD_FEASIBILITY_PATH}`;

export const metadata: Metadata = {
  title: {
    absolute: "SSD Feasibility Check | Victorian Pathway Tool | Bayview Hub",
  },
  description:
    "Interactive Victorian Small Second Dwelling check: see whether your answers suggest Green Lane, VicSmart, or standard planning — optional written response.",
  alternates: {
    canonical: feasibilityCanonical,
  },
  openGraph: {
    title: "SSD feasibility check | Bayview Hub",
    description:
      "Interactive checklist for Victorian SSD pathways — Green Lane, VicSmart, or standard planning. Optional written feasibility pass.",
    url: feasibilityCanonical,
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
    answer:
      "Green Lane means your SSD meets all Deemed-to-Comply criteria under Clause 54.03: ≤60sqm, behind front wall, no gas, 25sqm POS retained, compliant setbacks, no triggered overlays. No planning permit required. Proceed directly to building permit.",
  },
  {
    question: "What triggers VicSmart instead of Green Lane?",
    answer:
      "VicSmart applies when your SSD is otherwise compliant but triggers minor overlays (Heritage, Flood, etc.) or requires minor setback variations. Council must decide within 10 business days under VC282. No neighbor notification required.",
  },
  {
    question: "What puts an SSD project in the Red Zone?",
    answer:
      "GFA exceeding 60 sqm or front-yard siting immediately disqualifies SSD pathway. Expect standard planning permit: 12-18 months, neighbor notification, potential objections, VCAT risk.",
  },
  {
    question: "What are the VC253/VC282 hard constraints for SSDs?",
    answer:
      "Maximum 60 sqm GFA, siting behind front wall line, all-electric (no reticulated gas), no subdivision from main lot, main dwelling retains 25 sqm private open space.",
  },
  {
    question: "Is building permit still required for Green Lane SSDs?",
    answer:
      "Yes. Building permit is always mandatory for structural safety, energy compliance, and NCC requirements. Green Lane bypasses planning permit, not building permit.",
  },
  {
    question: "Can I subdivide an SSD from my property?",
    answer:
      "No. Under VC253/VC282, SSDs cannot be subdivided from the main lot. Subdivision intent disqualifies you from the SSD framework entirely.",
  },
];

function buildFeasibilityJsonLd(baseUrl: string) {
  const pageUrl = `${baseUrl}${SSD_FEASIBILITY_PATH}`;
  const ogImage = `${baseUrl}/og-second-home.png`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "LocalBusiness"],
      name: "Victorian SSD Regulatory Compliance Service",
      url: pageUrl,
      image: ogImage,
      description:
        "Small Second Dwelling feasibility assessment and Path to Approval determination under Victorian Planning Provisions VC253/VC282. Green Lane, VicSmart, and standard pathway analysis. Clause 54.03 Deemed-to-Comply specialist.",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "365 Purves Road",
        addressLocality: "Main Ridge",
        addressRegion: "VIC",
        postalCode: "3928",
        addressCountry: "AU",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Victoria, Australia",
      },
      makesOffer: {
        "@type": "Offer",
        description: "48-hour feasibility assessment with Path to Approval determination",
        price: "0",
        priceCurrency: "AUD",
      },
      knowsAbout: [
        "Victorian Planning Provisions",
        "Clause 54.03 Deemed-to-Comply",
        "VC253 Small Second Dwelling regulations",
        "VC282 VicSmart expedited pathway",
        "Residential development Victoria",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SSD Path to Approval Engine",
      description:
        "Interactive tool to determine Victorian SSD approval pathway: Green Lane (no planning permit), VicSmart (10-day approval), or Red Zone (standard planning process).",
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AUD",
      },
    },
  ];
}

export default function FeasibilityChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildFeasibilityJsonLd(SITE_CONFIG.url);
  const base = SITE_CONFIG.url;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SsdPageHero
        title="SSD feasibility check"
        explainer="Work through the checklist to see which pathway your answers suggest — Green Lane, VicSmart, or standard planning. Then submit the form if you want a written feasibility pass (about 48 hours)."
        primaryHref="/backyard-small-second-home/feasibility-check#feasibility-form"
        primaryLabel="Jump to submission form"
        secondaryHref="/backyard-small-second-home"
        secondaryLabel="See the full SSD overview"
      />
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <AnswerCapsule
            definition="Interactive screen — not a council decision. It maps your answers to the usual SSD pathways so you know what to verify next."
            facts={[
              "Green Lane pattern: all Deemed-to-Comply tests met → often no planning permit; building permit still required.",
              "VicSmart pattern: small overlay or variation issues → faster council route when it applies.",
              "Outside SSD hard lines (size, siting, title) → expect standard planning — this tool flags that early.",
            ]}
            sources={[
              { label: "DTP Planning Portal", href: "https://www.planning.vic.gov.au/" },
              { label: "See the full SSD overview", href: `${base}/backyard-small-second-home` },
              { label: "Understand Victoria rules", href: `${base}/backyard-small-second-home/victoria-rules` },
              { label: "Explore likely costs", href: `${base}/backyard-small-second-home/cost-rent-roi` },
            ]}
            lastUpdated={LAST_UPDATED}
          />
          <SsdPageShare path="/backyard-small-second-home/feasibility-check" className="mt-8" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted">
            <Link href="/backyard-small-second-home" className="font-medium text-accent underline-offset-4 hover:underline">
              See the full SSD overview
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/backyard-small-second-home/victoria-rules" className="underline-offset-4 hover:underline">
              Understand Victoria rules
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/backyard-small-second-home/cost-rent-roi" className="underline-offset-4 hover:underline">
              Explore likely costs
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/visit" className="underline-offset-4 hover:underline">
              Visit the estate
            </Link>
          </p>
        </div>
      </div>
      {children}
    </>
  );
}
