"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Journal" },
  { href: "/media-buzz", label: "Media" },
  { href: "/practice", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="wr-nav">
      <div className="container flex h-[72px] items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="WallRide Park home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="wr-logo-link"
        >
          <Image
            src="/wallride/logo-mark.png"
            alt="WallRide Park"
            width={1200}
            height={802}
            priority
            className="wr-nav-logo"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="wr-nav-link"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppCTA intent="general" size="sm" className="wr-nav-cta hidden sm:inline-flex">
            WhatsApp
          </WhatsAppCTA>
          <Sheet>
            <SheetTrigger aria-label="Open menu" className="wr-menu-button lg:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,24rem)] border-black/10 bg-[#f7f7f4] px-7 text-[#17171b]">
              <SheetTitle className="sr-only">WallRide navigation</SheetTitle>
              <Image
                src="/wallride/logo-mark.png"
                alt="WallRide Park"
                width={1200}
                height={802}
                className="mt-2 h-20 w-28 object-contain"
              />
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className="wr-mobile-nav-link"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <WhatsAppCTA intent="general" className="wr-button-primary mt-8 w-full">
                  WhatsApp WallRide
                </WhatsAppCTA>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
