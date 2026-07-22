export type LeadIntent = "class" | "practice" | "kit" | "general";

const MESSAGE_BY_INTENT: Record<LeadIntent, string> = {
  class:
    "Hi! I'm interested in classes at WallRide Park.",
  practice:
    "Hi! I'd like to plan a session at WallRide Park.",
  kit: "Hi! I'm interested in WallRide Park shop items.",
  general: "Hi! I have a question about WallRide Park.",
};

// Build the wa.me deep link with an intent-templated prefilled message.
// refCode is appended as [ref: xxxxxx] so WallRide can match the inbound
// WhatsApp message to the Sanity lead doc. Per PRD edge cases, if the
// Sanity write failed there's no refCode and the message goes out plain.
export function buildWhatsAppUrl(
  whatsappNumber: string,
  intent: LeadIntent,
  refCode?: string | null
): string {
  const base = MESSAGE_BY_INTENT[intent];
  const message = refCode ? `${base} [ref: ${refCode}]` : base;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
