"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/icons/zine";
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

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-sand/85 backdrop-blur-md"
          : "border-b border-transparent bg-sand/60 backdrop-blur"
      }`}
    >
      <div className="container flex items-center gap-8 py-3.5">
        <Link href="/" className="flex shrink-0 items-baseline gap-2.5">
          <span className="font-display text-[22px] font-semibold leading-none -tracking-[0.02em] text-ink">
            STEEZ
          </span>
          <span className="inline-block h-2 w-2 translate-y-0.5 rounded-full bg-terracotta" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/55">
            sb·hyd
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  isActive ? "text-terracotta" : "text-ink/80 hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 bottom-1 h-px origin-left bg-terracotta transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <WhatsAppCTA
            intent="general"
            className="btn-zine btn-zine--red hidden md:inline-flex"
          >
            <WhatsAppIcon size={14} /> WhatsApp Hari
          </WhatsAppCTA>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-sand/80 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-ink/10 bg-sand"
            >
              <nav className="mt-10 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display text-3xl font-medium -tracking-[0.02em] text-ink transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6">
                  <WhatsAppCTA
                    intent="general"
                    className="btn-zine btn-zine--red w-full justify-center"
                  >
                    <WhatsAppIcon size={14} /> WhatsApp Hari
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
