import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip;
}

function isRateLimited(req: NextRequest): boolean {
  const key = getRateLimitKey(req);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  return false;
}

async function sendResendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  return res.ok;
}

function sanitizeString(value: unknown, maxLength: number = 500): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, maxLength);
}

function sanitizeOptionalString(value: unknown, maxLength: number = 200): string | null {
  if (value === null || value === undefined) return null;
  return sanitizeString(value, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(req)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.website) {
      console.log("[Feasibility] Honeypot triggered");
      return NextResponse.json({ ok: true });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
      return NextResponse.json(
        { ok: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

    const {
      suburb_or_address,
      lot_size,
      slope,
      access,
      intention,
      budget_range,
      ready_in_6_months,
      email,
      phone,
      page,
      user_agent,
    } = body;

    const sanitizedSuburb = sanitizeString(suburb_or_address, 200);
    if (!sanitizedSuburb || sanitizedSuburb.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Suburb or address is required (min 2 characters)" },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeOptionalString(email, 254);
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizeOptionalString(phone, 20);
    if (sanitizedPhone && !/^[\d\s+()-]{6,20}$/.test(sanitizedPhone)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone format" },
        { status: 400 }
      );
    }

    const leadData = {
      suburb_or_address: sanitizedSuburb,
      lot_size: sanitizeOptionalString(lot_size, 50),
      slope: sanitizeOptionalString(slope, 50),
      access: sanitizeOptionalString(access, 50),
      intention: sanitizeOptionalString(intention, 50),
      budget_range: sanitizeOptionalString(budget_range, 50),
      ready_in_6_months: sanitizeOptionalString(ready_in_6_months, 10),
      email: sanitizedEmail,
      phone: sanitizedPhone,
      page: sanitizeOptionalString(page, 200),
      user_agent: sanitizeOptionalString(user_agent, 500),
    };

    const { error } = await supabase.from("feasibility_leads").insert(leadData);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    // Send notification email to admin after successful DB insert
    const notifyEmail = "leonzh@bayviewestate.com.au";
    const timestamp = new Date().toISOString();
    
    try {
      await sendResendEmail({
        to: notifyEmail,
        subject: `[SSD] ${sanitizedSuburb} — ${leadData.intention || "Not specified"}`,
        replyTo: sanitizedEmail || undefined,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; line-height:1.6; max-width:600px;">
            <h2 style="color:#1a365d;">New SSD Feasibility Request</h2>
            
            <table style="width:100%; border-collapse:collapse; margin:20px 0;">
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold; width:140px;">Timestamp</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${timestamp}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Location</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${sanitizedSuburb}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Lot Size</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.lot_size || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Slope</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.slope || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Access</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.access || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Intention</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.intention || "Not specified"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Budget Range</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.budget_range || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Ready in 6 months</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${leadData.ready_in_6_months || "Not specified"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${sanitizedEmail || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${sanitizedPhone || "Not provided"}</td></tr>
            </table>

            <p style="color:#718096; font-size:12px; margin-top:24px;">Summary: ${leadData.intention || "SSD"} inquiry for ${sanitizedSuburb}, ${leadData.ready_in_6_months === "yes" ? "ready within 6 months" : "timeline flexible"}</p>
          </div>
        `,
      });
    } catch (e) {
      console.warn("[Feasibility] Admin email failed", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feasibility endpoint error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
