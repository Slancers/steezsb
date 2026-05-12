import { NextResponse } from "next/server";

import { logError } from "@/lib/observability";
import { rateLimit } from "@/lib/rate-limit";
import { newLeadIds } from "@/lib/refcode";
import { buildWhatsAppUrl, type LeadIntent } from "@/lib/whatsapp";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

const ALLOWED_INTENTS = new Set<LeadIntent>([
  "class",
  "practice",
  "kit",
  "general",
]);

type LeadRequestBody = {
  sourcePage?: unknown;
  intent?: unknown;
  timestamp?: unknown;
  userAgent?: unknown;
};

type LeadResponseBody = {
  leadId: string | null;
  refCode: string | null;
  whatsappUrl: string;
};

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "local";
}

export async function POST(req: Request) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  const ip = getClientIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body: LeadRequestBody;
  try {
    body = (await req.json()) as LeadRequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const sourcePage = typeof body.sourcePage === "string" ? body.sourcePage : "";
  const intent = body.intent as LeadIntent;
  if (!sourcePage || !ALLOWED_INTENTS.has(intent)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { id, refCode } = newLeadIds();
  const createdAt =
    typeof body.timestamp === "string" ? body.timestamp : new Date().toISOString();
  const userAgent =
    typeof body.userAgent === "string"
      ? body.userAgent
      : (req.headers.get("user-agent") ?? "");

  // Attempt the Sanity write. Per PRD edge case: if it fails, still return
  // a WhatsApp URL (without refCode) so the user isn't blocked. Log to
  // observability so the failure is visible.
  let leadId: string | null = null;
  let returnedRefCode: string | null = null;
  try {
    const doc = await writeClient.create({
      _id: id,
      _type: "lead",
      refCode,
      sourcePage,
      intent,
      createdAt,
      userAgent,
      status: "new",
    });
    leadId = doc._id;
    returnedRefCode = refCode;
  } catch (err) {
    logError(err, { route: "/api/lead", intent, sourcePage });
  }

  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    intent,
    returnedRefCode
  );

  const response: LeadResponseBody = {
    leadId,
    refCode: returnedRefCode,
    whatsappUrl,
  };
  return NextResponse.json(response);
}
