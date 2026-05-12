import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CountUp } from "@/components/effects/CountUp";
import { Marquee } from "@/components/effects/Marquee";
import { RotatingText } from "@/components/effects/RotatingText";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import {
  getFeaturedTestimonials,
  getMediaItems,
  getSiteSettings,
} from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "STEEZE Skateboarding — Skateboarding Classes in Hyderabad",
  description:
    "Skateboarding classes, hourly bowl practice, and gear for kids and adults in Hyderabad. Coached by Hari.",
  path: "/",
});

const HERO_LINES = [
  "Skate Hyderabad",
  "Learn the Right Way",
  "Find Your Crew",
  "Book a Session",
];

const MARQUEE_ITEMS = [
  "STEEZE",
  "Hyderabad",
  "Skateboarding",
  "Bowl",
  "Classes",
  "Community",
];

const STATS = [
  { value: 50, suffix: "+", label: "Students" },
  { value: 1, suffix: "", label: "Bowl" },
  { value: 100, suffix: "%", label: "Stoke" },
];

const OFFERS = [
  {
    title: "Classes",
    desc: "1-on-1 and group coaching, beginner to skilled.",
    href: "/classes",
  },
  {
    title: "Practice",
    desc: "Hourly bowl access for independent skaters.",
    href: "/practice",
  },
  {
    title: "Kit",
    desc: "Everything a new skater needs to start.",
    href: "/shop",
  },
];

export default async function HomePage() {
  const [settings, testimonials, mediaItems] = await Promise.all([
    getSiteSettings(),
    getFeaturedTestimonials(),
    getMediaItems(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container py-20 md:py-32 lg:py-40">
          <SectionReveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Hyderabad · India
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[10rem] md:leading-[0.85]">
              Steeze
              <br />
              <span className="text-primary">Skate</span>boarding
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.25} className="mt-10 md:mt-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="font-display text-2xl uppercase leading-tight tracking-wide text-foreground/90 md:text-4xl">
                <RotatingText items={HERO_LINES} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <WhatsAppCTA
                  intent="class"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  WhatsApp for class info
                </WhatsAppCTA>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-foreground/40 hover:bg-foreground hover:text-background"
                >
                  <Link href="/classes">See classes</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Marquee */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* Stats */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <SectionReveal>
            <p className="mb-12 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              By the numbers
            </p>
          </SectionReveal>
          <div className="grid gap-12 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="space-y-3">
                  <div className="font-display text-7xl leading-none md:text-9xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Offers */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <SectionReveal className="mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              What we offer
            </p>
            <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
              Three ways<br />to start
            </h2>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {OFFERS.map((offer, i) => (
              <SectionReveal key={offer.href} delay={i * 0.1}>
                <Link
                  href={offer.href}
                  className="group relative flex h-full flex-col justify-between rounded-lg border border-border bg-card p-8 transition-colors hover:border-primary"
                >
                  <div>
                    <h3 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
                      {offer.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {offer.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-12 h-6 w-6 text-foreground/60 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      {settings?.about?.bio ? (
        <section className="border-b border-border py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-12 md:grid-cols-3">
              {settings.about.photo ? (
                <SectionReveal className="md:col-span-1">
                  <Image
                    src={urlFor(settings.about.photo).width(600).height(720).url()}
                    alt="Hari, coach at STEEZE"
                    width={600}
                    height={720}
                    className="aspect-[5/6] w-full rounded-lg object-cover grayscale"
                  />
                </SectionReveal>
              ) : null}
              <SectionReveal delay={0.1} className="space-y-6 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                  About Hari
                </p>
                <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
                  The <span className="text-primary">coach</span>
                </h2>
                <p className="whitespace-pre-line text-lg text-muted-foreground">
                  {settings.about.bio}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="px-0 text-foreground hover:text-primary"
                >
                  <Link href="/about">Read more →</Link>
                </Button>
              </SectionReveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* Marquee */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* Gallery */}
      {mediaItems.length > 0 ? (
        <section className="border-b border-border py-20 md:py-28">
          <div className="container">
            <SectionReveal className="mb-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                In motion
              </p>
              <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
                Gallery
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {mediaItems.slice(0, 8).map((item, i) =>
                item.image ? (
                  <SectionReveal key={item._id} delay={i * 0.05}>
                    <Image
                      src={urlFor(item.image).width(500).height(500).url()}
                      alt={item.caption || item.image.alt || "STEEZE"}
                      width={500}
                      height={500}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  </SectionReveal>
                ) : null
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section className="border-b border-border py-20 md:py-28">
          <div className="container">
            <SectionReveal className="mb-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                The crew says
              </p>
              <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
                Word of <span className="text-primary">mouth</span>
              </h2>
            </SectionReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <SectionReveal key={t._id} delay={i * 0.1}>
                  <div className="flex h-full flex-col gap-6 rounded-lg border border-border bg-card p-8">
                    <p className="text-lg leading-snug">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-auto text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      — {t.parentName ?? t.studentName ?? "Parent"}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="py-24 md:py-36">
        <div className="container">
          <SectionReveal>
            <div className="rounded-xl border border-border bg-card p-10 text-center md:p-20">
              <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
                Ready to <span className="text-primary">roll?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-prose text-lg text-muted-foreground">
                WhatsApp Hari directly. No forms, no friction.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsAppCTA
                  intent="general"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  WhatsApp Hari
                </WhatsAppCTA>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-foreground/40 hover:bg-foreground hover:text-background"
                >
                  <Link href="/contact">Contact details</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
