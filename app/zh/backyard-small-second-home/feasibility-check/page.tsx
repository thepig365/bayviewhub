"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SsdFeasibilityCampaignAnalytics,
  trackFeasibilityFormSubmitSuccess,
} from "@/components/ssd/SsdFeasibilityCampaignAnalytics";
import { SsdPageShare } from "@/components/ssd/SsdPageShare";
import {
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Clock,
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
  Zap,
  FileText,
  Shield,
  ExternalLink,
} from "lucide-react";

const ZH_FEASIBILITY_PAGE = "/zh/backyard-small-second-home/feasibility-check";

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
        <div className="pb-5 text-muted-foreground leading-relaxed pr-12 text-base">
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
      <span className="text-base text-foreground leading-relaxed">{label}</span>
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
      setFormError("请填写维州 suburb 或街道地址");
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
      page: ZH_FEASIBILITY_PAGE,
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
        trackFeasibilityFormSubmitSuccess();
        router.push("/zh/backyard-small-second-home/feasibility-check/thank-you");
      } else {
        setFormError(result.error || "提交失败。请稍后重试或直接发邮件。");
        setIsSubmitting(false);
      }
    } catch {
      setFormError("网络错误，请检查连接后重试。");
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
            <label htmlFor="suburb" className="text-base font-medium">
              区县 / 地址（维州）<span className="text-destructive">*</span>
            </label>
            <input
              id="suburb"
              name="suburb"
              placeholder="填写 suburb 或街道号"
              value={formData.suburb}
              onChange={(e) => {
                handleInputChange("suburb", e.target.value);
                if (formError) setFormError("");
              }}
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                formError ? "border-destructive" : "border-input"
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lotSize" className="text-base font-medium">
              地块面积（㎡）
            </label>
            <input
              id="lotSize"
              name="lotSize"
              placeholder="例如 600"
              value={formData.lotSize}
              onChange={(e) => handleInputChange("lotSize", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-base font-medium">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-base font-medium">
              电话
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0400 000 000"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="slope" className="text-base font-medium">
              坡度
            </label>
            <select
              id="slope"
              value={formData.slope}
              onChange={(e) => handleInputChange("slope", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">请选择</option>
              <option value="flat">平坦</option>
              <option value="mild">缓坡</option>
              <option value="steep">陡坡</option>
              <option value="unsure">不确定</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="access" className="text-base font-medium">
              施工通道
            </label>
            <select
              id="access"
              value={formData.access}
              onChange={(e) => handleInputChange("access", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">请选择</option>
              <option value="narrow">狭窄</option>
              <option value="ok">一般</option>
              <option value="wide">宽敞</option>
              <option value="unsure">不确定</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="intention" className="text-base font-medium">
              主要用途
            </label>
            <select
              id="intention"
              value={formData.intention}
              onChange={(e) => handleInputChange("intention", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">请选择</option>
              <option value="family">多代同住</option>
              <option value="rental">租金收益</option>
              <option value="both">两者兼顾</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="readyToProceed" className="text-base font-medium">
              时间节点
            </label>
            <select
              id="readyToProceed"
              value={formData.readyToProceed}
              onChange={(e) => handleInputChange("readyToProceed", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">请选择</option>
              <option value="yes">6 个月内动土</option>
              <option value="no">6–12 个月</option>
              <option value="not-sure">仍在了解阶段</option>
            </select>
          </div>
        </div>

        {formError && (
          <p className="text-base text-destructive font-medium">{formError}</p>
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
          className="inline-flex items-center justify-center gap-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 w-full md:w-auto disabled:opacity-50"
        >
          {isSubmitting ? "提交中…" : "提交可行性评估"}
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
        <h3 className="text-lg font-bold text-foreground">报批路径推演</h3>
        <p className="text-base text-muted-foreground mt-1">
          填入场地参数；工具会提示更可能接近 Green Lane、VicSmart，还是标准规划。
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* GFA Input */}
        <div className="space-y-2">
          <label className="text-base font-medium">拟建建面（GFA）</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGfa("under60")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                gfa === "under60"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              ≤ 60 ㎡
            </button>
            <button
              onClick={() => setGfa("over60")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                gfa === "over60"
                  ? "bg-destructive text-white border-destructive"
                  : "bg-background border-border hover:border-destructive/50"
              }`}
            >
              &gt; 60 ㎡
            </button>
          </div>
        </div>

        {/* Siting Input */}
        <div className="space-y-2">
          <label className="text-base font-medium">拟建坐落</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSiting("behind")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                siting === "behind"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              主房前墙后方
            </button>
            <button
              onClick={() => setSiting("front")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                siting === "front"
                  ? "bg-destructive text-white border-destructive"
                  : "bg-background border-border hover:border-destructive/50"
              }`}
            >
              前院临街
            </button>
          </div>
        </div>

        {/* Overlays Input */}
        <div className="space-y-2">
          <label className="text-base font-medium">规划覆盖层（遗迹、洪水等）</label>
          <div className="flex gap-3">
            <button
              onClick={() => setOverlays("none")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                overlays === "none"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              无
            </button>
            <button
              onClick={() => setOverlays("some")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                overlays === "some"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-background border-border hover:border-amber-500/50"
              }`}
            >
              有影响
            </button>
          </div>
        </div>

        {/* Setbacks Input */}
        <div className="space-y-2">
          <label className="text-base font-medium">Clause 54.03 退线</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSetbacks("compliant")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                setbacks === "compliant"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              满足
            </button>
            <button
              onClick={() => setSetbacks("minor")}
              className={`flex-1 px-4 py-2.5 rounded-lg border text-base font-medium transition-all ${
                setbacks === "minor"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-background border-border hover:border-amber-500/50"
              }`}
            >
              轻微不达标
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
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">绿灯：通常不需规划许可</h4>
                  <p className="text-base text-emerald-600 dark:text-emerald-500">完全满足判定合规要件</p>
                </div>
              </div>
              <p className="text-base text-emerald-800 dark:text-emerald-300 leading-relaxed">
                结论：宗地符合 Clause 54.03 「认定合规」模型。<strong>通常无需规划许可证。</strong>
                请携注册建筑勘测师直接进入建房许可路径。
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
                  <h4 className="font-bold text-amber-700 dark:text-amber-400">VicSmart 快车道：十个工作日量级</h4>
                  <p className="text-base text-amber-600 dark:text-amber-500">VC282 加速审批语境</p>
                </div>
              </div>
              <p className="text-base text-amber-800 dark:text-amber-300 leading-relaxed">
                结论：仍属 SSD eligible，但被图层触动或仅需轻微退让调整。<strong>适用 VicSmart。</strong>
                Council 须在 10 个工作日内做决定；不要求邻居通告。请以 VC282 文本为准核验。
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
                  <h4 className="font-bold text-red-700 dark:text-red-400">红色语境：跳出 SSD</h4>
                  <p className="text-base text-red-600 dark:text-red-500">不在小型第二住宅框架之内</p>
                </div>
              </div>
              <p className="text-base text-red-800 dark:text-red-300 leading-relaxed">
                结论：方案落在 SSD 之外。<strong>可能要经历 12–18 个月的常规规划语境</strong>，含邻里告知、异议与潜在的 VCAT 风险。
                若仍想走 SSD，需压缩体量或重做坐落方案。
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
        <h3 className="text-lg font-bold text-foreground">我需要哪种许可？</h3>
        <p className="text-base text-muted-foreground mt-1">
          简述规划许可（Planning）与建房许可（Building）的差别。
        </p>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("planning")}
          className={`flex-1 px-4 py-3 text-base font-medium transition-colors ${
            activeTab === "planning"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          规划许可
        </button>
        <button
          onClick={() => setActiveTab("building")}
          className={`flex-1 px-4 py-3 text-base font-medium transition-colors ${
            activeTab === "building"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          建房许可
        </button>
      </div>

      <div className="p-6">
        {activeTab === "planning" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Planning 规划许可</h4>
                <p className="text-base text-muted-foreground mt-1">
                  评估土地利用、街坊影响与各图层。<em>不满足</em>「认定合规」时通常需要递交。
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4">
              <p className="text-base text-emerald-800 dark:text-emerald-300">
                <strong>SSD 优势：</strong>
                若满足 Clause 54.03（建面≤60㎡、主房前墙后方、不接燃气且主宅保有 25㎡ POS 等），
                理论上可<strong>完全绕过规划路径</strong>——这是规则带来的确定性。
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
              <p className="text-base text-amber-800 dark:text-amber-300">
                <strong>VicSmart：</strong>
                若仍属 SSD compliant 但图层需要快速评估，可走 VicSmart——常见叙事是 10 个工作日决策且无需邻里通告。
              </p>
            </div>
          </div>
        )}

        {activeTab === "building" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Building 建房许可</h4>
                <p className="text-base text-muted-foreground mt-1">
                  核验结构安全、能耗、林区火灾（BAL）以及 NCC 要求——对任何居所<strong>始终强制</strong>。
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-base text-muted-foreground">
                <strong>流程：</strong>
                委任注册建筑勘测师（RBS），提交施工图、结构与能耗报告；许可颁发后按计划施工并取得入住证明。
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-base text-foreground">
                <strong>时间感：</strong>
                全套图纸齐备后建房许可往往在 2–4 周内由勘测师核发；Council 不具裁量否决权，只要对上规范即可发证。
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

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToForm = () => {
    document.getElementById("feasibility-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEngine = () => {
    document.getElementById("logic-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalChecks = Object.keys(checklist).length;

  return (
    <SsdFeasibilityCampaignAnalytics>
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-background py-8 md:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">如何使用本页</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            先回答路径推演问题，读懂不同结果通常意味着什么，再勾选自检清单；
            若需要书面第一层阅读，可在约 48 小时内提交表单——任何互动结果都不能取代 Council 或律师意见。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={scrollToEngine}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-900 px-6 text-base font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              先做路径推演
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-base font-medium text-foreground hover:bg-muted/50"
            >
              跳到表单
            </button>
          </div>
        </div>
      </section>

      {/* Framework Summary */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            VC253 / VC282 硬约束提要
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "建面上限", value: "≤60 ㎡", icon: Home },
              { label: "坐落", value: "主房前墙后方", icon: Target },
              { label: "能源", value: "全屋电气化", icon: Zap },
              { label: "产权", value: "不可分拆测绘", icon: FileText },
              { label: "主宅 POS", value: "不少于 25 ㎡", icon: Shield },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="text-base font-medium text-foreground">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logic Engine */}
      <section id="logic-engine" className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">路径推演问题</h2>
            <p className="text-base text-muted-foreground">
              所选答案更接近 Green Lane、VicSmart 还是退回标准规划——仍需回到产权证逐项核实。
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
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">自检清单（快扫）</h2>
            <p className="text-base text-muted-foreground">
              勾选你已有把握的点。已完成 {checkedCount}/{totalChecks} 项。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                合规要点
              </h3>
              <div className="space-y-3">
                <ChecklistItem
                  label="拟建 GFA ≤ 60 ㎡"
                  checked={checklist.gfa60}
                  onChange={() => toggleCheck("gfa60")}
                />
                <ChecklistItem
                  label="坐落位于主房前墙线的后方一侧"
                  checked={checklist.siting}
                  onChange={() => toggleCheck("siting")}
                />
                <ChecklistItem
                  label="方案为全屋电气（无片区配送煤气）"
                  checked={checklist.electric}
                  onChange={() => toggleCheck("electric")}
                />
                <ChecklistItem
                  label="无意图把第二居所单独测绘出售"
                  checked={checklist.noSubdivision}
                  onChange={() => toggleCheck("noSubdivision")}
                />
                <ChecklistItem
                  label="主宅仍留有 25 ㎡ POS"
                  checked={checklist.pos25}
                  onChange={() => toggleCheck("pos25")}
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                场地可建性
              </h3>
              <div className="space-y-3">
                <ChecklistItem
                  label="施工通道可满足基本吊装与运输"
                  checked={checklist.access}
                  onChange={() => toggleCheck("access")}
                />
                <ChecklistItem
                  label="电力 / 给水 / 排污服务条件现实可行"
                  checked={checklist.services}
                  onChange={() => toggleCheck("services")}
                />
                <ChecklistItem
                  label="坡度在预算内或通过场地平整可化解"
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
                所有自检项勾选完成——从纸本角度看更接近 Green Lane（通常无需规划许可）。
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
              常见卡点
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "建面需求超过 60 ㎡",
              "必须把第二居所放在前院临街",
              "施工通道无解或不可行",
              "可建区内存在关键地役权",
              "陡坡意味着大规模挖填 / 挡土",
              "配套服务升级超出预算承受",
              "遗迹或洪水图层需要深度论证",
            ].map((risk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/15 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-base">{risk}</span>
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
              示意造价梯度
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "层级 1", title: "紧凑合规", desc: "务实饰面；复杂度克制；成本控制优先。", Icon: Lightbulb },
              { tier: "层级 2", title: "适合出租耐久", desc: "更好热工表现、耐久饰面与日常使用体验。", Icon: Building },
              { tier: "层级 3", title: "高设计含量", desc: "更高饰面规格；场地工程复杂；细部定制程度高。", Icon: Sparkles },
            ].map((item, idx) => {
              const Icon = item.Icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-sm font-medium text-primary uppercase tracking-wider mb-1">{item.tier}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground">{item.desc}</p>
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
              过程时间轴（示意）
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "可行性第一层阅读（约 48 小时）",
              "报批路径推演结论",
              "任务书锁定 + 成本区间",
              "设计成果包",
              "建房许可（约 2–4 周）",
              "施工与交付",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-base font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-card border border-border rounded-lg py-3 px-4">
                  <span className="text-foreground text-base">{step}</span>
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
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              申请书面第一层可行性阅读
            </h2>
            <p className="text-base text-muted-foreground">
              约在 48 小时内回复；内容为基于你资料的报批路径语境阅读——并非 Council 批文。
            </p>
          </div>
          <FeasibilityForm />

          <SsdPageShare path="/zh/backyard-small-second-home/feasibility-check" className="mt-10" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            <Link href="/zh/backyard-small-second-home" className="font-medium text-accent underline-offset-4 hover:underline">
              查看 SSD 中文总览
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/backyard-small-second-home/victoria-rules" className="underline-offset-4 hover:underline">
              维州 SSD 规则
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/backyard-small-second-home/cost-rent-roi" className="underline-offset-4 hover:underline">
              成本与租金语境
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <Link href="/zh/visit" className="underline-offset-4 hover:underline">
              到访庄园
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            常见问题
          </h2>
          <div className="divide-y divide-border/50">
            <FAQItem
              question='什么是 Green Lane？'
              answer="当你的 SSD 同时满足 Clause 54.03 全部「认定合规」测试（建面≤60㎡、坐落主房前墙后方、不接燃气、主宅留有 25㎡ POS、退线合规且未触动需规划图层等），理论上无需 planning permit——直奔建房 permit。Council 不能像常规 discretionary 那般否决。"
            />
            <FAQItem
              question="什么情况会改用 VicSmart 而不是 Green Lane？"
              answer="若仍属 SSD-compliant，但图层带来轻微触动或退让需要微调，可走 VicSmart：Council 通常须在 10 个工作日内决定，且无邻里通告义务。请参阅 VC282 条文核实。"
            />
            <FAQItem
              question="红色语境通常由什么触发？"
              answer="建面超过 60㎡ 或坚持前院临街主展示位，会直接跳出 SSD——回到标准规划语境，可能需要 12–18 个月、含邻里沟通、异议甚至 VCAT 风险；要么收窄方案回到 SSD。"
            />
            <FAQItem
              question="绿灯语境还需要建房 permit 吗？"
              answer="需要。建房 permit 永久强制；Green Lane 仅指可以绕过 Planning，而不是绕过结构与能耗合规。"
            />
            <FAQItem
              question="SSD 可以再测绘分拆出售吗？"
              answer="不行。VC253/VC282 要求第二居所停在主宅同一 title；分拆意图会直接失去 SSD 资格。"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mx-auto mb-4 max-w-xl text-sm text-muted-foreground">
            仍需背景材料？可先打开 SSD 中文总览、规则页或成本语境，再回到本表单。
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/zh/backyard-small-second-home"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              查看 SSD 中文总览
            </Link>
            <Link
              href="/zh/backyard-small-second-home/victoria-rules"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              维州 SSD 规则
            </Link>
            <Link
              href="/zh/backyard-small-second-home/cost-rent-roi"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              成本与租金语境
            </Link>
          </div>
        </div>
      </section>

      {/* GEO Footer */}
      <section className="py-10 bg-neutral-100 dark:bg-neutral-800 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-base font-medium text-muted mb-1">
              维多利亚州 SSD 法规合规语境服务
            </p>
            <p className="text-sm text-muted">
              VicSmart 快车道语境 · Clause 54.03 Specialist
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted mb-4">
            <a
              href="https://www.planning.vic.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline hover:text-fg"
            >
              州规划局 SSD 指南
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>VC253 / VC282 语境</span>
            <span>·</span>
            <span>Victoria Planning Provisions</span>
          </div>
          <p className="text-sm text-muted text-center">
            本工具提供法规语境参考，不构成法律或规划意见书；宗地结论请由专业顾问出具。
          </p>
        </div>
      </section>
    </main>
    </SsdFeasibilityCampaignAnalytics>
  );
}
