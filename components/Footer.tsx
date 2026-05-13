import Link from "next/link";

// Stitch-spec Footer: flat, light surface, single row on desktop:
// STEEZ · SB · HYD wordmark — nav links — copyright. No big stroked word,
// no marquee, no shadows.
const SITE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-stack-md border-t border-outline-variant bg-surface-container-lowest px-margin-mobile py-stack-lg text-on-surface md:flex-row md:px-margin-desktop">
      <div className="font-display text-[28px] font-bold uppercase leading-none tracking-wide text-on-surface md:text-headline-lg">
        STEEZ · SB · HYD
      </div>
      <div className="flex flex-wrap justify-center gap-stack-md">
        {SITE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-[14px] font-bold uppercase tracking-[0.05em] text-secondary transition-all duration-200 hover:text-on-surface hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="text-center font-body text-[14px] text-secondary md:text-right">
        &copy; {new Date().getFullYear()} STEEZ Skateboarding School Hyderabad.
        All rights reserved.
      </div>
    </footer>
  );
}
