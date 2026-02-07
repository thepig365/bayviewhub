"use client";

import { useState, useEffect } from "react";
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
  Share2,
  Zap,
  FileText,
  Shield,
  ExternalLink,
} from "lucide-react";

// Path to Approval Types
type ApprovalPath = "green" | "vicsmart" | "red" | null;

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
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-base text-foreground pr-6 group-hover:text-primary transition-colors">
          {question}
        </span>
        {answer && (
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        )}
      </button>
      {isOpen && answer && (
        <div className="pb-5 text-muted-foreground leading-relaxed pr-12 text-sm">
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
      className="flex items-start gap-3 cursor-pointer group py-1"
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
            ? "bg-primary border-primary"
            : "border-border group-hover:border-primary/60"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className="text-sm text-foreground leading-relaxed">{label}</span>
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

  const handleInputChange = (field: keyof FeasibilityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.suburb.trim()) {
      setFormError("Suburb or address required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        setFormError(result.error || "Submission failed. Retry or email directly.");
        setIsSubmitting(false);
      }
    } catch {
      setFormError("Network error. Check connection and retry.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border/60 rounded-xl p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="suburb" className="text-sm font-medium">
              Suburb/Address (VIC) <span className="text-destructive">*</span>
            </label>
            <input
              id="suburb"
              name="suburb"
              placeholder="Enter suburb or address"
              value={formData.suburb}
              onChange={(e) => {
                handleInputChange("suburb", e.target.value);
                if (formError) setFormError("");
              }}
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                formError ? "border-destructive" : "border-input"
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lotSize" className="text-sm font-medium">
              Lot Size (sqm)
            </label>
            <input
              id="lotSize"
              name="lotSize"
              placeholder="e.g. 600"
              value={formData.lotSize}
              onChange={(e) => handleInputChange("lotSize", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0400 000 000"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="slope" className="text-sm font-medium">
              Site Slope
            </label>
            <select
              id="slope"
              value={formData.slope}
              onChange={(e) => handleInputChange("slope", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select</option>
              <option value="flat">Flat</option>
              <option value="mild">Mild</option>
              <option value="steep">Steep</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="access" className="text-sm font-medium">
              Site Access
            </label>
            <select
              id="access"
              value={formData.access}
              onChange={(e) => handleInputChange("access", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select</option>
              <option value="narrow">Narrow</option>
              <option value="ok">OK</option>
              <option value="wide">Wide</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="intention" className="text-sm font-medium">
              Primary Use
            </label>
            <select
              id="intention"
              value={formData.intention}
              onChange={(e) => handleInputChange("intention", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select</option>
              <option value="family">Multi-generational</option>
              <option value="rental">Rental income</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="readyToProceed" className="text-sm font-medium">
              Timeline
            </label>
            <select
              id="readyToProceed"
              value={formData.readyToProceed}
              onChange={(e) => handleInputChange("readyToProceed", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select</option>
              <option value="yes">Within 6 months</option>
              <option value="no">6-12 months</option>
              <option value="not-sure">Exploring</option>
            </select>
          </div>
        </div>

        {formError && (
          <p className="text-sm text-destructive font-medium">{formError}</p>
        )}

        {/* Honeypot field - hidden from humans */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 w-full md:w-auto disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Submit for Assessment"}
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}

// Logic Engine Component
function PathToApprovalEngine() {
  const [gfa, setGfa] = useState<string>("");
  const [siting, setSiting] = useState<string>("");
  const [overlays, setOverlays] = useState<string>("");
  const [setbacks, setSetbacks] = useState<string>("");
  const [result, setResult] = useState<ApprovalPath>(null);

  useEffect(() => {
    calculatePath();
  }, [gfa, siting, overlays, setbacks]);

  const calculatePath = () => {
    // Red Zone: Non-compliant
    if (gfa === "over60" || siting === "front") {
      setResult("red");
      return;
    }

    // Need all inputs
    if (!gfa || !siting) {
      setResult(null);
      return;
    }

    // Green Lane: Full compliance
    if (gfa === "under60" && siting === "behind" && overlays === "none" && setbacks === "compliant") {
      setResult("green");
      return;
    }

    // VicSmart: Partial compliance with overlays or minor variations
    if (gfa === "under60" && siting === "behind") {
      if (overlays === "some" || setbacks === "minor") {
        setResult("vicsmart");
        return;
      }
      // Default to green if no overlays specified but otherwise compliant
      if (!overlays || !setbacks) {
        setResult(null);
        return;
      }
      setResult("green");
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <h3 className="text-lg font-bold text-foreground">Path to Approval Engine</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Input your site parameters. The engine determines your approval pathway.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* GFA Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Proposed GFA (Gross Floor Area)</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGfa("under60")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                gfa === "under60"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              ≤ 60 sqm
            </button>
            <button
              onClick={() => setGfa("over60")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                gfa === "over60"
                  ? "bg-destructive text-white border-destructive"
                  : "bg-background border-border hover:border-destructive/50"
              }`}
            >
              &gt; 60 sqm
            </button>
          </div>
        </div>

        {/* Siting Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Proposed Siting</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSiting("behind")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                siting === "behind"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              Behind Front Wall
            </button>
            <button
              onClick={() => setSiting("front")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                siting === "front"
                  ? "bg-destructive text-white border-destructive"
                  : "bg-background border-border hover:border-destructive/50"
              }`}
            >
              Front Yard
            </button>
          </div>
        </div>

        {/* Overlays Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Planning Overlays (Heritage, Flood, etc.)</label>
          <div className="flex gap-3">
            <button
              onClick={() => setOverlays("none")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                overlays === "none"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              None
            </button>
            <button
              onClick={() => setOverlays("some")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                overlays === "some"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-background border-border hover:border-amber-500/50"
              }`}
            >
              Some Present
            </button>
          </div>
        </div>

        {/* Setbacks Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Clause 54.03 Setbacks</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSetbacks("compliant")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                setbacks === "compliant"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              Compliant
            </button>
            <button
              onClick={() => setSetbacks("minor")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                setbacks === "minor"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-background border-border hover:border-amber-500/50"
              }`}
            >
              Minor Variation
            </button>
          </div>
        </div>
      </div>

      {/* Result Output */}
      {result && (
        <div className={`p-6 border-t ${
          result === "green" ? "bg-emerald-50 dark:bg-emerald-950/30" :
          result === "vicsmart" ? "bg-amber-50 dark:bg-amber-950/30" :
          "bg-red-50 dark:bg-red-950/30"
        }`}>
          {result === "green" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">GREEN LANE: No Planning Permit</h4>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500">100% Compliant</p>
                </div>
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Result: Site meets Deemed-to-Comply criteria under Clause 54.03. <strong>No Planning Permit required.</strong> Proceed directly to Building Permit application with a registered building surveyor.
              </p>
            </div>
          )}

          {result === "vicsmart" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-700 dark:text-amber-400">VICSMART FAST TRACK: 10-Day Approval</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-500">VC282 Expedited Pathway</p>
                </div>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Result: Site is SSD-eligible but triggers overlay or requires minor setback variation. <strong>VicSmart pathway applies.</strong> Council must decide within 10 business days. No neighbor notification required. Reference: VC282 Fast-Track provisions.
              </p>
            </div>
          )}

          {result === "red" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-red-700 dark:text-red-400">RED ZONE: Non-SSD Project</h4>
                  <p className="text-sm text-red-600 dark:text-red-500">Outside Framework</p>
                </div>
              </div>
              <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                Result: Project falls outside the Small Second Dwelling framework. <strong>Expect 12-18 months in Planning</strong> with standard permit process. Neighbor notification, potential objections, and VCAT risk. Consider engaging a traditional developer or reducing scope to comply with SSD requirements.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Permit Explainer Component
function PermitExplainer() {
  const [activeTab, setActiveTab] = useState<"planning" | "building">("planning");

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <h3 className="text-lg font-bold text-foreground">Do I Need a Permit?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Understanding the difference between Planning Permit and Building Permit.
        </p>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("planning")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "planning"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Planning Permit
        </button>
        <button
          onClick={() => setActiveTab("building")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "building"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Building Permit
        </button>
      </div>

      <div className="p-6">
        {activeTab === "planning" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Planning Permit</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Assesses land use, neighborhood impact, overlays. Required when you <em>don&apos;t</em> meet Deemed-to-Comply criteria.
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4">
              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                <strong>SSD Advantage:</strong> If your SSD meets Clause 54.03 criteria (≤60sqm, behind front wall, no gas, 25sqm POS retained), planning permit is <strong>bypassed entirely</strong>. That is the value proposition.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>VicSmart Alternative:</strong> If overlays are present but SSD otherwise compliant, VicSmart expedites approval to 10 business days with no neighbor notification.
              </p>
            </div>
          </div>
        )}

        {activeTab === "building" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Building Permit</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Assesses structural safety, energy compliance, bushfire (BAL), NCC requirements. <strong>Always mandatory</strong> for any dwelling.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Process:</strong> Engage a Registered Building Surveyor (RBS). Submit working drawings, engineering, energy report. Surveyor issues permit. Inspections during build. Certificate of Occupancy on completion.
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Timeline:</strong> Building permit typically 2-4 weeks once documentation complete. No council discretion — surveyor assesses against code. If compliant, permit issued.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeasibilityChecklistPage() {
  const [checklist, setChecklist] = useState({
    gfa60: false,
    siting: false,
    electric: false,
    noSubdivision: false,
    pos25: false,
    access: false,
    services: false,
    slope: false,
  });

  const [shareMessage, setShareMessage] = useState("");

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToForm = () => {
    document.getElementById("feasibility-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEngine = () => {
    document.getElementById("logic-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = async () => {
    const shareData = {
      title: "SSD Feasibility Logic Engine — Victoria 2026",
      text: "Determine your approval pathway: Green Lane (no permit), VicSmart (10-day), or standard planning.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Shared");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage("Link copied");
      }
      setTimeout(() => setShareMessage(""), 3000);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(shareData.url);
          setShareMessage("Link copied");
          setTimeout(() => setShareMessage(""), 3000);
        } catch {
          setShareMessage("Could not share");
          setTimeout(() => setShareMessage(""), 3000);
        }
      }
    }
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalChecks = Object.keys(checklist).length;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-mono text-neutral-500 mb-6 uppercase tracking-widest">
            Victorian SSD Logic Engine · VC253/VC282 · 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            SSD Feasibility Checklist
            <span className="block text-neutral-400 text-2xl md:text-3xl mt-2">Path to Approval Matrix</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-4 leading-relaxed max-w-3xl">
            This tool determines your approval pathway. Green Lane bypasses planning entirely. 
            VicSmart delivers 10-day council decision. Red Zone means standard permit process.
          </p>
          <p className="text-neutral-500 mb-8">
            We navigate the constraints. You get certainty.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToEngine}
              className="inline-flex items-center gap-2 bg-white text-neutral-900 hover:bg-neutral-100 h-10 px-6 rounded-md text-sm font-medium"
            >
              Run Path to Approval Engine
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 border border-neutral-600 text-white hover:bg-neutral-800 h-10 px-6 rounded-md text-sm font-medium"
            >
              Submit for Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Framework Summary */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            VC253/VC282 Hard Constraints
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Max GFA", value: "60 sqm", icon: Home },
              { label: "Siting", value: "Behind front wall", icon: Target },
              { label: "Utilities", value: "All-electric", icon: Zap },
              { label: "Title", value: "No subdivision", icon: FileText },
              { label: "Main POS", value: "25 sqm min", icon: Shield },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium text-foreground">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logic Engine */}
      <section id="logic-engine" className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Path to Approval Engine
            </h2>
            <p className="text-muted-foreground">
              Input your site parameters. The engine outputs your approval pathway.
            </p>
          </div>
          <PathToApprovalEngine />
        </div>
      </section>

      {/* Permit Explainer */}
      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <PermitExplainer />
        </div>
      </section>

      {/* SSD Compliance Checklist */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              SSD Compliance Self-Check
            </h2>
            <p className="text-muted-foreground">
              Verify your site against the framework. {checkedCount}/{totalChecks} confirmed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Regulatory Compliance
              </h3>
              <div className="space-y-3">
                <ChecklistItem
                  label="Proposed GFA ≤ 60 sqm"
                  checked={checklist.gfa60}
                  onChange={() => toggleCheck("gfa60")}
                />
                <ChecklistItem
                  label="Siting behind front wall line of main dwelling"
                  checked={checklist.siting}
                  onChange={() => toggleCheck("siting")}
                />
                <ChecklistItem
                  label="All-electric design (no reticulated gas)"
                  checked={checklist.electric}
                  onChange={() => toggleCheck("electric")}
                />
                <ChecklistItem
                  label="No intention to subdivide"
                  checked={checklist.noSubdivision}
                  onChange={() => toggleCheck("noSubdivision")}
                />
                <ChecklistItem
                  label="Main dwelling retains 25 sqm POS"
                  checked={checklist.pos25}
                  onChange={() => toggleCheck("pos25")}
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Site Buildability
              </h3>
              <div className="space-y-3">
                <ChecklistItem
                  label="Adequate construction access"
                  checked={checklist.access}
                  onChange={() => toggleCheck("access")}
                />
                <ChecklistItem
                  label="Services feasible (power, water, sewer)"
                  checked={checklist.services}
                  onChange={() => toggleCheck("services")}
                />
                <ChecklistItem
                  label="Slope manageable or budget for siteworks"
                  checked={checklist.slope}
                  onChange={() => toggleCheck("slope")}
                />
              </div>
            </div>
          </div>

          {checkedCount === totalChecks && (
            <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                All compliance criteria confirmed. Site appears eligible for Green Lane (no planning permit).
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Risk Factors */}
      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <AlertTriangle className="w-10 h-10 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Feasibility Blockers
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "GFA requirement exceeds 60 sqm",
              "Front-yard siting requirement",
              "Access constraints with no workable solution",
              "Critical easements in buildable zone",
              "Steep slope requiring major excavation/retaining",
              "Service upgrades exceeding budget tolerance",
              "Heritage or flood overlays requiring extensive assessment",
            ].map((risk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/15 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Tiers */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Cost Tiers (Indicative)
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "Tier 1", title: "Compliant & Compact", desc: "Practical finishes. Minimal complexity. Budget-optimized.", Icon: Lightbulb },
              { tier: "Tier 2", title: "Rental-Ready", desc: "Better fit-out, durability, thermal comfort.", Icon: Building },
              { tier: "Tier 3", title: "Architectural", desc: "Higher spec. Complex siteworks. Custom detailing.", Icon: Sparkles },
            ].map((item, idx) => {
              const Icon = item.Icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">{item.tier}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Process Timeline
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "Feasibility assessment (48 hours)",
              "Path to Approval determination",
              "Scope lock + cost estimate",
              "Design documentation",
              "Building permit (2-4 weeks)",
              "Construction + handover",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-card border border-border rounded-lg py-3 px-4">
                  <span className="text-foreground text-sm">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="feasibility-form" className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Submit for Feasibility Assessment
            </h2>
            <p className="text-muted-foreground">
              48-hour response. Path to Approval determination included.
            </p>
          </div>
          <FeasibilityForm />

          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted/50"
            >
              <Share2 className="w-4 h-4" />
              Share this tool
            </button>
            {shareMessage && <span className="text-sm text-primary">{shareMessage}</span>}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            FAQ
          </h2>
          <div className="divide-y divide-border/50">
            <FAQItem
              question="What is the Green Lane pathway?"
              answer="If your SSD meets all Deemed-to-Comply criteria under Clause 54.03 (≤60sqm, behind front wall, no gas, 25sqm POS for main house, compliant setbacks, no triggered overlays), no planning permit is required. Proceed directly to building permit. Council cannot refuse."
            />
            <FAQItem
              question="What triggers VicSmart instead of Green Lane?"
              answer="If you have minor overlay triggers (Heritage, Flood, etc.) or require minor setback variations but otherwise comply with SSD requirements, VicSmart fast-track applies. Council must decide within 10 business days. No neighbor notification. Reference: VC282."
            />
            <FAQItem
              question="What puts me in the Red Zone?"
              answer="GFA exceeding 60 sqm or front-yard siting requirement immediately disqualifies SSD pathway. Expect standard planning permit process: 12-18 months, neighbor notification, potential objections, VCAT risk. Consider reducing scope or engaging traditional developer."
            />
            <FAQItem
              question="Is building permit still required for Green Lane?"
              answer="Yes. Building permit is always mandatory. It assesses structural safety, energy compliance, NCC requirements. The Green Lane advantage is bypassing planning permit — not building permit."
            />
            <FAQItem
              question="Can I subdivide an SSD?"
              answer="No. Under VC253/VC282, SSDs cannot be subdivided from the main lot. The dwelling must remain on the same title as the main dwelling. Subdivision intent disqualifies you from the framework."
            />
          </div>
        </div>
      </section>

      {/* GEO Footer */}
      <section className="py-10 bg-neutral-100 dark:bg-neutral-800 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Victorian SSD Regulatory Compliance Service
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Registered VicSmart Pathway Provider · Clause 54.03 Specialist
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            <a
              href="https://www.planning.vic.gov.au/guides-and-resources/guides/small-second-dwellings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              DTP SSD Guidelines
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>VC253/VC282 Compliant</span>
            <span>·</span>
            <span>Victoria Planning Provisions</span>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
            This tool provides regulatory guidance and does not constitute legal or planning advice.
            Engage qualified professionals for site-specific determinations.
          </p>
        </div>
      </section>
    </main>
  );
}
