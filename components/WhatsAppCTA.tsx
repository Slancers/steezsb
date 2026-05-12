"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import { pushEvent } from "@/lib/analytics";
import type { LeadIntent } from "@/lib/whatsapp";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  intent: LeadIntent;
  children: React.ReactNode;
  // Accepted but ignored — v1 pages still pass `size="lg"` from the old
  // shadcn Button API. They'll get redesigned in a follow-up; until then,
  // accept the prop silently so the build doesn't break.
  size?: "default" | "sm" | "lg" | "icon";
  variant?: string;
};

// Native-button version of the WhatsApp CTA. Accepts full className control
// so each page can apply .btn-zine / .btn-zine--red / custom utilities.
// The lead attribution flow is unchanged:
//   click → POST /api/lead → open wa.me URL with ref code prefilled.
// On API failure, falls back to opening a plain wa.me link so the visitor
// is never blocked (PRD Section 7, edge cases).
export function WhatsAppCTA({
  intent,
  children,
  className,
  onClick: _ignored,
  size: _sizeIgnored,
  variant: _variantIgnored,
  ...rest
}: Props) {
  const pathname = usePathname();
  const [pending, setPending] = React.useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    pushEvent("whatsapp_click", { intent, sourcePage: pathname });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: pathname,
          intent,
          timestamp: new Date().toISOString(),
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      if (!res.ok) throw new Error(`lead_api_${res.status}`);
      const data = (await res.json()) as {
        leadId: string | null;
        refCode: string | null;
        whatsappUrl: string;
      };
      pushEvent("lead_created", {
        intent,
        sourcePage: pathname,
        refCode: data.refCode,
      });
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
      window.open(`https://wa.me/${number}`, "_blank", "noopener,noreferrer");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={pending}
      className={className ?? "btn-zine"}
    >
      {children}
    </button>
  );
}
