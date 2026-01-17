"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Clock,
  Users,
  Home,
  DollarSign,
  ArrowRight,
  Truck,
  Target,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Building,
  Sparkles,
} from "lucide-react";

interface FAQItemProps {
  question: string;
  answer?: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={() => answer && setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        data-testid={`faq-toggle-${question.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
      >
        <span className="font-medium text-base md:text-lg text-foreground pr-6 group-hover:text-primary transition-colors">
          {question}
        </span>
        {answer && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        )}
      </button>
      {isOpen && answer && (
        <div className="pb-6 text-muted-foreground leading-relaxed pl-0 pr-12">
          {answer}
        </div>
      )}
    </div>
  );
}

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function ChecklistItem({ label, checked, onChange }: ChecklistItemProps) {
  return (
    <div
      className="flex items-start gap-3.5 cursor-pointer group py-1"
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
    >
      <div
        className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked
            ? "bg-primary border-primary shadow-sm"
            : "border-border group-hover:border-primary/60"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className="text-sm md:text-base text-foreground leading-relaxed">
        {label}
      </span>
    </div>
  );
}

interface FeasibilityFormData {
  phone: string;
  email: string;
  suburb: string;
  lotSize: string;
  slope: string;
  access: string;
  intention: string;
  budget: string;
  readyToProceed: string;
  website: string;
}

function FeasibilityForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FeasibilityFormData>({
    phone: "",
    email: "",
    suburb: "",
    lotSize: "",
    slope: "",
    access: "",
    intention: "",
    budget: "",
    readyToProceed: "",
    website: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof FeasibilityFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.suburb.trim()) {
      setFormError("Suburb or address is required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const payload = {
      suburb_or_address: formData.suburb.trim(),
      lot_size: formData.lotSize || null,
      slope: formData.slope || null,
      access: formData.access || null,
      intention: formData.intention || null,
      budget_range: formData.budget || null,
      ready_in_6_months: formData.readyToProceed || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      page: "/backyard-second-home/feasibility-checklist",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      website: formData.website,
    };

    try {
      const response = await fetch("/api/feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        router.push("/backyard-second-home/feasibility-checklist/thank-you");
      } else {
        setFormError(result.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setFormError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border/60 rounded-xl p-6 md:p-10 shadow-sm">
      <p className="text-sm text-muted-foreground mb-8 p-4 bg-muted/40 rounded-lg border border-border/40">
        Prefer not to use email? Copy the details and text us, or we can follow
        up by phone.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2.5">
            <label htmlFor="suburb" className="text-sm font-medium">
              Suburb (or Address) <span className="text-destructive">*</span>
            </label>
            <input
              id="suburb"
              name="suburb"
              placeholder="Enter suburb or full address"
              value={formData.suburb}
              onChange={(e) => {
                handleInputChange("suburb", e.target.value);
                if (formError) setFormError("");
              }}
              className={`flex h-11 w-full rounded-md border bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                formError ? "border-destructive" : "border-input"
              }`}
              data-testid="input-suburb"
            />
            {formError && (
              <p className="text-sm text-destructive" data-testid="text-form-error">
                {formError}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <label htmlFor="lotSize" className="text-sm font-medium">
              Approx lot size (m²)
            </label>
            <input
              id="lotSize"
              name="lotSize"
              placeholder="e.g. 600"
              value={formData.lotSize}
              onChange={(e) => handleInputChange("lotSize", e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="input-lot-size"
            />
          </div>

          <div className="space-y-2.5">
            <label htmlFor="slope" className="text-sm font-medium">
              Slope
            </label>
            <select
              id="slope"
              value={formData.slope}
              onChange={(e) => handleInputChange("slope", e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="select-slope"
            >
              <option value="">Select slope type</option>
              <option value="flat">Flat</option>
              <option value="mild">Mild</option>
              <option value="steep">Steep</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>

          <div className="space-y-2.5">
            <label htmlFor="access" className="text-sm font-medium">
              Access
            </label>
            <select
              id="access"
              value={formData.access}
              onChange={(e) => handleInputChange("access", e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="select-access"
            >
              <option value="">Select access type</option>
              <option value="narrow">Narrow</option>
              <option value="ok">OK</option>
              <option value="wide">Wide</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>

          <div className="space-y-2.5">
            <label htmlFor="intention" className="text-sm font-medium">
              Primary intention
            </label>
            <select
              id="intention"
              value={formData.intention}
              onChange={(e) => handleInputChange("intention", e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="select-intention"
            >
              <option value="">Select primary intention</option>
              <option value="family">Family living</option>
              <option value="rental">Long-term rental</option>
              <option value="both">Both (family now, rental later)</option>
            </select>
          </div>

          <div className="space-y-2.5">
            <label htmlFor="budget" className="text-sm font-medium">
              Budget range
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="select-budget"
            >
              <option value="">Select budget range</option>
              <option value="not-sure">Not sure yet</option>
              <option value="150-250">$150k–$250k</option>
              <option value="250-400">$250k–$400k</option>
              <option value="400+">$400k+</option>
            </select>
          </div>

          <div className="space-y-2.5 md:col-span-2">
            <label htmlFor="readyToProceed" className="text-sm font-medium">
              Ready to proceed within 6 months?
            </label>
            <select
              id="readyToProceed"
              value={formData.readyToProceed}
              onChange={(e) =>
                handleInputChange("readyToProceed", e.target.value)
              }
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              data-testid="select-ready"
            >
              <option value="">Select your timeline</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not-sure">Not sure</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <p className="text-sm text-muted-foreground mb-6">
            By submitting, you agree we can contact you about your feasibility
            request.
          </p>

          {formError && (
            <p
              className="text-sm text-destructive font-medium mb-4"
              data-testid="text-form-error-message"
            >
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full md:w-auto min-w-[200px] disabled:pointer-events-none disabled:opacity-50 transition-colors"
            data-testid="button-submit-form"
          >
            {isSubmitting ? "Sending..." : "Send my details"}
            {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function FeasibilityChecklistPage() {
  const [checklist, setChecklist] = useState({
    access: false,
    easements: false,
    backyard: false,
    slope: false,
    power: false,
    stormwater: false,
    privacy: false,
    approvals: false,
  });

  const [outcome, setOutcome] = useState<string>("");

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToForm = () => {
    document
      .getElementById("feasibility-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToChecklist = () => {
    document
      .getElementById("quick-check")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm mb-10 border border-white/10">
            <CheckCircle2 className="w-4 h-4" />
            <span>No sales pressure. Honest feasibility assessment.</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-tight"
            data-testid="text-hero-title"
          >
            Backyard Second Home Feasibility Checklist (Victoria)
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed font-light">
            Build a second compliant home on the land you already own — for
            multi-generational living or long-term rental.
          </p>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-6 font-light">
            Start with feasibility and cost control before you spend serious
            money.
          </p>

          <p className="text-sm text-white/60 mb-12 max-w-xl mx-auto">
            If it's not feasible (or not financially sensible), we'll tell you
            early — and explain why.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-white text-stone-900 hover:bg-white/90 h-11 px-8 transition-colors"
              data-testid="button-primary-cta"
            >
              Get a 48-hour Feasibility Reply
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={scrollToChecklist}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-white/40 text-white hover:bg-white/10 h-11 px-8 transition-colors"
              data-testid="button-secondary-cta"
            >
              Start the 2-minute Checklist
            </button>
          </div>
        </div>
      </section>

      {/* Quick Answers (GEO) */}
      <section className="py-16 md:py-20 bg-background border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
            Quick Answers (Victoria, 2026)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">Do I need a permit?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Often yes. Zoning, overlays, access, and servicing can trigger planning and building requirements.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">What usually kills feasibility?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tight access, steep slope, major overlays, and expensive service upgrades are common deal-breakers.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">Typical timeline?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Feasibility → design → approvals → build. The checklist helps identify delays early.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">Rough cost range?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Costs vary by site and spec. We provide a conservative range after reviewing your answers.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 md:col-span-2">
              <h3 className="font-semibold text-foreground mb-2">What info do you need from me?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Suburb/address plus a few basics (lot size, slope, access) is enough to start.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            We review zoning/overlays and council controls after you submit — then reply with the next step.
          </p>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20 md:py-28 bg-background border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight"
            data-testid="text-section-why"
          >
            Why this matters
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A backyard second home can be a practical response to housing
            pressure — but only if you start with constraints and reality:
            access, easements, slope, services, approvals, and the cost drivers
            that blow budgets up.
          </p>
        </div>
      </section>

      {/* Quick Self-Check */}
      <section
        id="quick-check"
        className="py-20 md:py-28 bg-muted/30 border-b border-border/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight"
              data-testid="text-section-checklist"
            >
              2-Minute Quick Self-Check (Go / Maybe / No)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tick what you know. If you're unsure, that's normal — the form
              below is designed to fill the gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Access & Buildability */}
            <div className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-row items-center gap-4 p-6 pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Access & Buildability</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <ChecklistItem
                  label="Practical construction access (or a workable access plan)"
                  checked={checklist.access}
                  onChange={() => toggleCheck("access")}
                />
                <ChecklistItem
                  label="No obvious easements blocking the build zone"
                  checked={checklist.easements}
                  onChange={() => toggleCheck("easements")}
                />
                <ChecklistItem
                  label="Usable backyard area for a compact dwelling + outdoor space"
                  checked={checklist.backyard}
                  onChange={() => toggleCheck("backyard")}
                />
                <ChecklistItem
                  label="Slope is flat/mild or you accept extra site-works cost"
                  checked={checklist.slope}
                  onChange={() => toggleCheck("slope")}
                />
              </div>
            </div>

            {/* Services */}
            <div className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-row items-center gap-4 p-6 pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Services</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <ChecklistItem
                  label="Power / water / sewer are feasible (or you accept upgrades)"
                  checked={checklist.power}
                  onChange={() => toggleCheck("power")}
                />
                <ChecklistItem
                  label="Stormwater can be managed without extreme engineering"
                  checked={checklist.stormwater}
                  onChange={() => toggleCheck("stormwater")}
                />
              </div>
            </div>

            {/* Neighbour & Planning Reality */}
            <div className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-row items-center gap-4 p-6 pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">
                  Neighbour & Planning Reality
                </h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <ChecklistItem
                  label="Open to privacy-led design (setbacks, screening, window control)"
                  checked={checklist.privacy}
                  onChange={() => toggleCheck("privacy")}
                />
                <ChecklistItem
                  label="Accept that approvals may require drawings / reports"
                  checked={checklist.approvals}
                  onChange={() => toggleCheck("approvals")}
                />
              </div>
            </div>

            {/* Your Outcome */}
            <div className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-row items-center gap-4 p-6 pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Your outcome</h3>
              </div>
              <div
                className="p-6 pt-0 space-y-3"
                role="radiogroup"
                aria-label="Your outcome"
              >
                {[
                  { value: "family", label: "Family living (parents / adult kids)" },
                  { value: "rental", label: "Long-term rental income" },
                  { value: "both", label: "Both (family now, rental later)" },
                ].map((option) => (
                  <div
                    key={option.value}
                    role="radio"
                    aria-checked={outcome === option.value}
                    tabIndex={0}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setOutcome(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setOutcome(option.value);
                      }
                    }}
                    data-testid={`radio-outcome-${option.value}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        outcome === option.value
                          ? "border-primary bg-primary"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-primary"
                      }`}
                    >
                      {outcome === option.value && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <span className="text-foreground">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk List */}
      <section className="py-20 md:py-28 bg-background border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-2xl mb-6">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
              data-testid="text-section-risks"
            >
              The "No / Risk" List — what kills feasibility or blows budgets
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "Access constraints with no workable plan",
              "Critical easements in the only buildable location",
              "Steep slope / poor soil requiring heavy excavation + retaining",
              "Service upgrades that push cost beyond your comfort zone",
              "Planning constraints that shrink envelope or trigger redesign loops",
            ].map((risk, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-destructive/5 border border-destructive/15 rounded-xl"
              >
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Buckets */}
      <section className="py-20 md:py-28 bg-muted/30 border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-6">
              <DollarSign className="w-7 h-7 text-primary" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5"
              data-testid="text-section-cost"
            >
              Cost buckets (ballpark)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't sell "cheap builds". We focus on predictable cost
              control. Your feasibility reply includes a range and the top 3
              drivers on your site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                tier: "Tier 1",
                title: "Smart & Simple",
                description:
                  "Compact, compliant, practical finishes. Minimal complexity.",
                Icon: Lightbulb,
              },
              {
                tier: "Tier 2",
                title: "Comfortable & Rental-ready",
                description:
                  "Better fit-out, durability, storage, thermal comfort.",
                Icon: Building,
              },
              {
                tier: "Tier 3",
                title: "Premium & Architectural",
                description:
                  "Higher spec, complex site works, custom detailing.",
                Icon: Sparkles,
              },
            ].map((tier, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow text-center"
                data-testid={`card-tier-${index + 1}`}
              >
                <div className="p-6 pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                      <tier.Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                    {tier.tier}
                  </div>
                  <h3 className="text-xl font-bold">{tier.title}</h3>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-background border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-6">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
              data-testid="text-section-timeline"
            >
              Timeline (what actually happens)
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/60 hidden md:block" />

            <div className="space-y-4">
              {[
                "Constraints scan",
                "2–3 feasible concept pathways",
                "Ballpark cost range + scope lock",
                "Approval strategy aligned to your site",
                "Drawings + only necessary reports",
                "Build prep (quotes / contracts / services planning)",
                "Build + handover",
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-5 md:gap-6">
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 rounded-xl border border-border/50 bg-card shadow-sm">
                    <div className="py-4 px-5 md:px-6">
                      <p className="text-base md:text-lg text-foreground">
                        {step}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Role */}
      <section className="py-20 md:py-28 bg-muted/30 border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-6">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6"
            data-testid="text-section-role"
          >
            Our role (Project Manager + Build Partner)
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We reduce risk by managing the pathway end-to-end: feasibility-first
            decisions, approvals strategy alignment, coordination across
            design/consultants/build delivery, and guardrails to prevent
            blowouts.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section
        id="feasibility-form"
        className="py-20 md:py-28 bg-background border-b border-border/30"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6"
              data-testid="text-form-heading"
            >
              Get a 48-hour Feasibility Reply
            </h2>

            <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                go/no-go feasibility view
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                key constraints
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                ballpark cost range
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                main cost drivers
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                recommended next step
              </span>
            </div>
          </div>

          <FeasibilityForm />
        </div>
      </section>

      {/* Next Links */}
      <section className="py-10 md:py-12 bg-muted/30 border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">
            Explore More
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/backyard-second-home/cost-victoria-2026"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors"
              data-testid="link-cost"
            >
              Cost Victoria 2026
            </Link>
            <Link
              href="/backyard-second-home/permit-pathway-victoria"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors"
              data-testid="link-permit"
            >
              Permit Pathway Victoria
            </Link>
            <Link
              href="/backyard-second-home/rental-income"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors"
              data-testid="link-rental"
            >
              Rental Income
            </Link>
            <Link
              href="/backyard-second-home/mornington-peninsula"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors"
              data-testid="link-mornington"
            >
              Mornington Peninsula
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
              data-testid="text-section-faq"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-border/50">
            <FAQItem
              question="How does a backyard second home improve housing affordability for families?"
              answer="A backyard second home lets you create additional living space on land you already own, avoiding the cost of purchasing a new property. It provides affordable housing options for extended family members or generates rental income to offset mortgage costs."
            />
            <FAQItem
              question="Can I design it for family now and long-term rental later?"
              answer="Yes, this is one of the most common approaches. We design with rental compliance in mind from the start, so when your family situation changes, transitioning to a rental is straightforward without requiring additional modifications."
            />
            <FAQItem
              question="Why is long-term rental demand still strong?"
              answer="Victoria's rental vacancy rates remain historically low, and population growth continues to outpace housing supply. A well-designed, compliant secondary dwelling in a good location attracts quality long-term tenants."
            />
            <FAQItem
              question="What design choices reduce running costs and improve rental resilience?"
              answer="Key factors include good thermal performance (insulation, orientation, glazing), efficient fixtures, durable materials that minimize maintenance, and flexible layouts that appeal to a broad tenant market."
            />
            <FAQItem
              question="What are the top feasibility blockers that change cost dramatically?"
              answer="The biggest cost escalators are poor access requiring crane delivery or manual handling, steep slopes requiring retaining walls and complex foundations, service upgrades (especially sewer connections), and restrictive overlays that limit design options."
            />
            <FAQItem
              question='What is a "backyard second home" in Victoria?'
              answer="In Victoria, a backyard second home (also called a secondary dwelling, granny flat, or dependent person's unit) is a self-contained dwelling on the same lot as an existing home. It can be attached or detached and must meet specific planning and building requirements."
            />
            <FAQItem
              question="Can I use it for family now and long-term rental later?"
              answer="Yes, many homeowners build for family use initially and transition to rental income when circumstances change. The key is ensuring your design and approvals support both uses from the outset."
            />
            <FAQItem
              question="What are the biggest feasibility blockers?"
              answer="Common blockers include inadequate site access for construction, easements in the buildable area, steep slopes or poor soil conditions, insufficient lot size, and restrictive planning overlays that limit what can be built."
            />
            <FAQItem
              question="What happens if my site is not feasible?"
              answer="We'll tell you early and explain exactly why. You'll receive a clear summary of the constraints and whether there are any workarounds. This saves you from spending money on designs or applications that won't succeed."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
