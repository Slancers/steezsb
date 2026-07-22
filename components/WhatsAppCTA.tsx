"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { pushEvent } from "@/lib/analytics";
import type { LeadIntent } from "@/lib/whatsapp";

type Props = Omit<ButtonProps, "onClick"> & {
  intent: LeadIntent;
  children: React.ReactNode;
};

// Wraps a shadcn Button with the full WhatsApp attribution flow:
// click → POST /api/lead → open wa.me URL with ref code prefilled.
// On API failure, falls back to opening a plain wa.me link so the
// visitor is never blocked (PRD Section 7, edge cases).
export function WhatsAppCTA({ intent, children, ...buttonProps }: Props) {
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
      // Fall back to a plain wa.me URL with no ref code so the user can
      // still reach WallRide. The lead just won't be attributed.
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
      window.open(
        `https://wa.me/${number}`,
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Button {...buttonProps} onClick={handleClick} disabled={pending}>
      {children}
    </Button>
  );
}
