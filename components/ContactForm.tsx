"use client";

import { useState } from "react";

import { Arrow } from "@/components/icons/zine";
import { pushEvent } from "@/lib/analytics";
import type { LeadIntent } from "@/lib/whatsapp";

const GOALS: { id: "classes" | "practice" | "kit" | "other"; label: string }[] = [
  { id: "classes", label: "Classes" },
  { id: "practice", label: "Bowl practice" },
  { id: "kit", label: "Kit / setup" },
  { id: "other", label: "Other" },
];

const GOAL_TO_INTENT: Record<
  "classes" | "practice" | "kit" | "other",
  LeadIntent
> = {
  classes: "class",
  practice: "practice",
  kit: "kit",
  other: "general",
};

// Contact form — visual matches the design exactly, but submit is wired
// into the real lead-capture flow:
//   POST /api/lead → write Sanity doc with mapped intent → open WhatsApp
//   with a prefilled message containing the form data + ref code.
// On API failure, opens a plain wa.me link as a fallback (PRD Section 7).
export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    goal: "classes" as "classes" | "practice" | "kit" | "other",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || pending) return;
    setPending(true);

    const intent = GOAL_TO_INTENT[form.goal];
    pushEvent("whatsapp_click", {
      intent,
      sourcePage: "/contact",
      via: "form",
    });

    const buildPrefill = (refCode?: string | null) => {
      const lines = [
        `Hi! I'm ${form.name}.`,
        `Phone: ${form.phone}`,
        `Interested in: ${GOALS.find((g) => g.id === form.goal)?.label}`,
        form.message ? `Note: ${form.message}` : null,
        refCode ? `[ref: ${refCode}]` : null,
      ].filter(Boolean);
      return lines.join("\n");
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: "/contact",
          intent,
          timestamp: new Date().toISOString(),
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      if (!res.ok) throw new Error("lead_api_failed");
      const data = (await res.json()) as {
        leadId: string | null;
        refCode: string | null;
        whatsappUrl: string;
      };
      pushEvent("lead_created", {
        intent,
        sourcePage: "/contact",
        refCode: data.refCode,
        via: "form",
      });
      // Replace the API's generic intent message with our form-aware version.
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
      const customUrl = `https://wa.me/${number}?text=${encodeURIComponent(
        buildPrefill(data.refCode)
      )}`;
      window.open(customUrl, "_blank", "noopener,noreferrer");
    } catch {
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(buildPrefill(null))}`,
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setPending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 border-[1.5px] border-ink bg-paper md:grid-cols-2"
    >
      <label className="flex flex-col border-b border-ink/20 p-6 md:border-r">
        <span className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
          [ 01 / NAME ]
        </span>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="What do we call you?"
          required
          className="w-full border-b-[1.5px] border-ink bg-transparent py-2 font-mono text-base font-medium text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-steeze-red"
        />
      </label>

      <label className="flex flex-col border-b border-ink/20 p-6">
        <span className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
          [ 02 / PHONE ]
        </span>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 ..."
          required
          className="w-full border-b-[1.5px] border-ink bg-transparent py-2 font-mono text-base font-medium text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-steeze-red"
        />
      </label>

      <div className="flex flex-col border-b border-ink/20 p-6 md:col-span-2">
        <span className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
          [ 03 / WHAT FOR ]
        </span>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((opt) => {
            const isOn = form.goal === opt.id;
            return (
              <label key={opt.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="goal"
                  value={opt.id}
                  checked={isOn}
                  onChange={() => setForm({ ...form, goal: opt.id })}
                  className="sr-only"
                />
                <span
                  className={`inline-block border-[1.5px] border-ink px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                    isOn
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink hover:bg-paper-deep"
                  }`}
                >
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col border-b border-ink/20 p-6 md:col-span-2">
        <span className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
          [ 04 / ANYTHING ELSE ]
        </span>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          placeholder="optional — skill level, days that work, kid's age, etc."
          className="w-full resize-none border-b-[1.5px] border-ink bg-transparent py-2 font-mono text-base font-medium text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-steeze-red"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-paper-deep p-6 md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-zine btn-zine--red"
        >
          {sent
            ? "✓ Sent — Hari will text back"
            : pending
              ? "Sending…"
              : "Send message"}{" "}
          <Arrow size={14} />
        </button>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
          or, faster →{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-steeze-red"
          >
            whatsapp hari
          </a>
        </span>
      </div>
    </form>
  );
}
