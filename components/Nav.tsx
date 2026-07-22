import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  return (
    <header className="wr-nav">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" aria-label="WallRide Park home" className="flex shrink-0 items-center">
          <Image
            src="/wallride/logo.png"
            alt="WallRide Park"
            width={720}
            height={480}
            priority
            className="h-12 w-20 object-contain object-center mix-blend-multiply md:h-14 md:w-24"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="wr-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppCTA intent="general" size="sm" className="wr-nav-cta hidden sm:inline-flex">
            WhatsApp
          </WhatsAppCTA>
          <Sheet>
            <SheetTrigger aria-label="Open menu" className="wr-menu-button lg:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-zinc-950 text-white">
              <nav className="mt-10 flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="wr-display text-3xl" >
                    {link.label}
                  </Link>
                ))}
                <WhatsAppCTA intent="general" className="wr-button-primary mt-5 w-full">
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
