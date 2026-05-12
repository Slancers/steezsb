import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/classes", label: "Classes" },
  { href: "/practice", label: "Practice" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          aria-label="STEEZE Skateboarding home"
          className="flex shrink-0 items-center"
        >
          <span className="font-display text-2xl uppercase leading-none tracking-widest md:text-3xl">
            Stee<span className="text-primary">z</span>e
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppCTA
            intent="general"
            size="sm"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            WhatsApp
          </WhatsAppCTA>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-border bg-background"
            >
              <nav className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display text-2xl uppercase tracking-widest text-foreground/90 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6">
                  <WhatsAppCTA
                    intent="general"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    WhatsApp Hari
                  </WhatsAppCTA>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
