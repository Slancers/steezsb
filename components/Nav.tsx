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
          ? "border-b border-cream/10 bg-night/95 backdrop-blur-md"
          : "border-b border-transparent bg-night/70 backdrop-blur"
      }`}
    >
      <div className="container flex items-center gap-8 py-4">
        <Link href="/" className="flex shrink-0 items-baseline gap-2.5">
          <span className="font-display text-[26px] font-normal leading-none -tracking-[0.005em] text-cream">
            STEEZ
          </span>
          <span className="inline-block h-2 w-2 translate-y-0.5 bg-steeze-red" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-cream/55">
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
                className={`group relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-steeze-red" : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 bottom-1 h-px origin-left bg-steeze-red transition-transform duration-300 ${
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
            <WhatsAppIcon size={14} /> Book your spot
          </WhatsAppCTA>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center border border-cream/20 bg-night text-cream lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-cream/10 bg-night text-cream"
            >
              <nav className="mt-10 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display text-3xl font-normal uppercase -tracking-[0.005em] text-cream transition-colors hover:text-steeze-red"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6">
                  <WhatsAppCTA
                    intent="general"
                    className="btn-zine btn-zine--red w-full justify-center"
                  >
                    <WhatsAppIcon size={14} /> Book your spot
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
