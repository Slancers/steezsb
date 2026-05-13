import Link from "next/link";

import { Arrow, StarBurst, WhatsAppIcon } from "@/components/icons/zine";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata = {
  title: "Street's closed — page not found",
  description: "This page doesn't exist at STEEZ. Try the home page.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="eyebrow-zine mb-6">[ 404 · NOT FOUND ]</div>

      <h1 className="font-display break-words font-bold uppercase leading-[0.85] -tracking-[0.05em]">
        <span
          className="block text-[clamp(72px,16vw,220px)]"
          style={{ textShadow: "6px 6px 0 #FF2D2D" }}
        >
          STREET&apos;S
        </span>
        <span
          className="block text-[clamp(72px,16vw,220px)] text-transparent"
          style={{ WebkitTextStroke: "2px #0E0D0B" }}
        >
          CLOSED.
        </span>
      </h1>

      <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
        <StarBurst size={20} className="text-steeze-red" />
        <span>This page never existed.</span>
        <StarBurst size={20} className="text-steeze-blue" />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-zine">
          Back to STEEZ <Arrow size={14} />
        </Link>
        <WhatsAppCTA intent="general" className="btn-zine btn-zine--ghost">
          <WhatsAppIcon size={14} /> WhatsApp Hari
        </WhatsAppCTA>
      </div>
    </main>
  );
}
