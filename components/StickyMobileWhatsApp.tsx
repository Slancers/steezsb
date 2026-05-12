import { MessageCircle } from "lucide-react";

import { WhatsAppCTA } from "@/components/WhatsAppCTA";

// Fixed-position WhatsApp button visible only on mobile (md:hidden).
// Functional — wired to the same /api/lead attribution flow as every
// other WhatsApp CTA. PRD: preserve through the design pass.
export function StickyMobileWhatsApp() {
  return (
    <div className="fixed bottom-4 right-4 z-40 md:hidden">
      <WhatsAppCTA intent="general" size="lg" className="shadow-lg">
        <MessageCircle className="mr-1 h-5 w-5" />
        WhatsApp
      </WhatsAppCTA>
    </div>
  );
}
