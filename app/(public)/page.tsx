import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "WallRide Park — Hyderabad rides here",
  description:
    "BMX, skateboarding and a rider-built park in Hyderabad for first tries, bigger lines and the community in between.",
  path: "/",
});

const FEATURES = [
  {
    number: "01",
    title: "Ride the pump track",
    text: "Build speed through rollers, banked turns and flowing lines on India’s first asphalt pump track.",
    image: "/wallride/pump-track.jpeg",
  },
  {
    number: "02",
    title: "Skate the park",
    text: "Practice balance, transitions, lines and tricks in a space made for progression.",
    image: "/wallride/park-hero.jpeg",
  },
  {
    number: "03",
    title: "Learn with a coach",
    text: "New to BMX or skateboarding? Start with structured guidance and build confidence at your pace.",
    image: "/wallride/classes.jpeg",
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const openingHours = settings?.openingHours?.[0] ?? "Open daily · 3:00 pm—9:00 pm";

  return (
    <>
      <section className="wr-hero">
        <div className="wr-hero-orbit" aria-hidden="true" />
        <div className="container wr-hero-grid relative z-10">
          <div className="wr-reveal">
            <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/65">
              <span className="wr-section-index text-fuchsia-200">Hyderabad · Telangana</span>
              <span className="text-xs font-bold uppercase tracking-[0.14em]">{openingHours}</span>
            </div>
            <p className="wr-eyebrow mb-5 text-fuchsia-200">India’s action-sports home</p>
            <h1 className="wr-display max-w-4xl text-7xl leading-[0.82] tracking-[-0.055em] text-white sm:text-8xl lg:text-[9.5rem]">
              Hyderabad<br /><span className="text-purple-400">rides here.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
              BMX, skateboarding and a rider-built park for first tries, bigger lines and the community in between.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">Plan your visit</WhatsAppCTA>
              <Button asChild size="lg" className="wr-button-light"><Link href="/events">See events</Link></Button>
            </div>
          </div>
          <div className="wr-hero-media wr-reveal wr-reveal-delay">
            <Image src="/wallride/park-hero.jpeg" alt="Riders at WallRide Park in Hyderabad" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="wr-hero-image" />
          </div>
        </div>
      </section>

      <section className="wr-claims" aria-label="WallRide claims">
        <div className="wr-marquee-track">
          {[0, 1].map((copy) => <div key={copy} className="wr-marquee-item" aria-hidden={copy === 1}><span>India’s first asphalt pump track</span><span>✦</span><span>Telangana’s first skate park</span><span>✦</span><span>Built for progression</span><span>✦</span></div>)}
        </div>
      </section>

      <section className="wr-section wr-paper">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <p className="wr-section-index mb-4 text-purple-700">01 / Find your line</p>
            <h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.045em] text-zinc-950 md:text-7xl">
              Come for the ride.
              <br />
              Stay for the people.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              WallRide is a place to learn, ride and progress. Take your first lesson, build flow around the pump track, work on new tricks or meet the people shaping Hyderabad’s action-sports scene.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.number} className="wr-feature group">
                <div className="relative aspect-square overflow-hidden bg-zinc-950">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="wr-photo-contain transition duration-700 group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-5 top-5 bg-purple-500 px-3 py-1 text-xs font-bold tracking-[0.15em] text-black">
                    {feature.number}
                  </span>
                </div>
                <h3 className="wr-display mt-5 text-3xl tracking-[-0.03em] text-zinc-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex justify-center"><Button asChild size="lg" className="wr-button-dark"><Link href="/classes">Explore classes <span aria-hidden>↗</span></Link></Button></div>
        </div>
      </section>

      <section className="wr-stat-rail">
        <div className="container grid sm:grid-cols-3">
          <div className="wr-stat"><p className="wr-stat-value">2017</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em]">WallRide founded</p></div>
          <div className="wr-stat"><p className="wr-stat-value">BMX + Skate</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em]">One rider-built home</p></div>
          <div className="wr-stat"><p className="wr-stat-value">First tries</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em]">Through bigger lines</p></div>
        </div>
      </section>

      <section className="wr-story">
        <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-20">
          <div className="wr-photo-frame relative aspect-square">
            <Image
              src="/wallride/community.jpeg"
              alt="The WallRide community together at the park"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="wr-photo-contain"
            />
          </div>
          <div className="max-w-xl text-white">
            <p className="wr-section-index mb-5 text-fuchsia-200">02 / Built by a rider, for riders</p>
            <h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
              Hyderabad needed a place to ride.
            </h2>
            <p className="mt-7 text-lg leading-8 text-white/70">
              WallRide began because Hyderabad needed a real place for people to ride, learn and meet. In 2017, BMX rider Hamza Khan turned that need into a park—and a community.
            </p>
            <Button asChild className="wr-button-primary mt-8" size="lg">
              <Link href="/about">Our story <span aria-hidden>↗</span></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wr-section wr-purple">
        <div className="container grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="wr-section-index mb-4 text-black/60">03 / Next up at WallRide</p>
            <h2 className="wr-display max-w-3xl text-5xl leading-[0.95] tracking-[-0.045em] text-black md:text-7xl">
              Contests, jams, workshops and community sessions.
            </h2>
          </div>
          <Button asChild size="lg" className="wr-button-dark">
            <Link href="/events">View events <span aria-hidden>↗</span></Link>
          </Button>
        </div>
      </section>

      <section className="wr-section wr-paper">
        <div className="container text-center">
          <p className="wr-eyebrow mb-4 text-purple-700">Ready to ride?</p>
          <h2 className="wr-display mx-auto max-w-4xl text-6xl leading-[0.9] tracking-[-0.06em] text-zinc-950 md:text-8xl">
            Make your way to WallRide.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-zinc-600">
            Check today’s timings, plan your session or message us before you come.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppCTA intent="general" size="lg" className="wr-button-dark">
              WhatsApp WallRide
            </WhatsAppCTA>
            <Button asChild variant="outline" size="lg" className="wr-button-outline">
              <Link href="/contact">Get directions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
