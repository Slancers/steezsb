"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/classes", label: "Classes" },
  { href: "/practice", label: "Practice" },
  { href: "/shop", label: "Kit" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Stitch-spec Nav: 80px tall, light surface, terracotta active state,
// terracotta WHATSAPP CTA, flat with single-line outline-variant divider.
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-display text-headline-lg uppercase tracking-tight text-on-surface">
          STEEZ
        </span>
        <span aria-hidden className="inline-block h-2 w-2 bg-[#C4622D]" />
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
          sb·hyd
        </span>
      </Link>

      <div className="hidden items-center gap-gutter md:flex">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 font-body text-[14px] font-bold uppercase tracking-[0.05em] transition-colors duration-200 ${
                isActive
                  ? "border-b-2 border-[#C4622D] text-[#C4622D]"
                  : "text-on-surface-variant hover:text-[#C4622D]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <WhatsAppCTA
          intent="general"
          className="hidden md:inline-flex items-center justify-center bg-[#C4622D] px-6 py-3 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-opacity hover:opacity-90"
        >
          WhatsApp Us
        </WhatsAppCTA>

        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center text-on-surface md:hidden"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 border-l border-outline-variant bg-surface"
          >
            <nav className="mt-10 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-3xl uppercase text-on-surface transition-colors hover:text-[#C4622D]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6">
                <WhatsAppCTA
                  intent="general"
                  className="btn-zine btn-zine--red w-full"
                >
                  WhatsApp Hari
                </WhatsAppCTA>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
