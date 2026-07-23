import Image from "next/image";
import Link from "next/link";

import { CampaignImage } from "@/components/public/CampaignImage";
import { ParkMotionGraphic } from "@/components/public/ParkMotionGraphic";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "WallRide Park - Hyderabad rides here",
  description:
    "BMX, skateboarding and a rider-built park in Hyderabad for first tries, bigger lines and the community in between.",
  path: "/",
});

const FEATURES = [
  {
    title: "Ride the pump track",
    text: "Build speed through rollers, banked turns and flowing lines on India’s first asphalt pump track.",
    image: "/wallride/pump-track.jpeg",
  },
  {
    title: "Skate the park",
    text: "Practice balance, transitions, lines and tricks in a space made for progression.",
    image: "/wallride/park-hero.jpeg",
  },
  {
    title: "Learn with a coach",
    text: "New to BMX or skateboarding? Start with structured guidance and build confidence at your pace.",
    image: "/wallride/classes.jpeg",
  },
];

function normalizePunctuation(value: string) {
  return value.replace(/[\u2014\u2013]/g, "-").replace(/ · /g, ", ");
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const openingHours = normalizePunctuation(
    settings?.openingHours?.[0] ?? "Open daily, 3:00 pm-9:00 pm"
  );

  return (
    <>
      <section className="wr-home-hero">
        <Image
          src="/wallride/community.jpeg"
          alt="Riders learning and skating together at WallRide Park"
          fill
          priority
          sizes="100vw"
          className="wr-home-hero-image"
        />
        <div className="wr-home-hero-scrim" />
        <ParkMotionGraphic className="wr-home-motion" />
        <div className="container wr-home-hero-content">
          <div className="wr-home-copy">
            <p className="wr-eyebrow">India’s action-sports home</p>
            <h1 className="wr-home-title">
              <span className="wr-home-city">Hyderabad</span>{" "}
              <span className="wr-home-command">rides here.</span>
            </h1>
            <p className="wr-home-lead">
              BMX, skateboarding and a rider-built park for first tries, bigger lines and the community in between.
            </p>
            <div className="wr-cta-group">
              <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">
                Plan your visit
              </WhatsAppCTA>
              <Button asChild size="lg" className="wr-button-outline">
                <Link href="/events">See events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wr-visit-rail" aria-label="Park essentials">
        <div className="container wr-visit-rail-grid">
          <div className="wr-visit-rail-item">
            <strong>{openingHours}</strong>
            <span>Closed Wednesdays</span>
          </div>
          <div className="wr-visit-rail-item">
            <strong>Peeran Cheruvu, Hyderabad</strong>
            <span>Off Chevella Road</span>
          </div>
          <div className="wr-visit-rail-item">
            <strong>₹250 per hour</strong>
            <span>Confirm current rates before visiting</span>
          </div>
        </div>
      </section>

      <section className="wr-claims" aria-label="WallRide claims">
        <div className="wr-marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="wr-marquee-item" aria-hidden={copy === 1}>
              <span>India’s first asphalt pump track</span>
              <span aria-hidden="true">/</span>
              <span>Telangana’s first skate park</span>
              <span aria-hidden="true">/</span>
              <span>Built for progression</span>
              <span aria-hidden="true">/</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wr-section wr-section-muted">
        <div className="container">
          <div>
            <h2 className="wr-section-heading">Come for the ride. Stay for the people.</h2>
            <p className="wr-section-copy mt-6">
              WallRide is a place to learn, ride and progress. Take your first lesson, build flow around the pump track, work on new tricks or meet the people shaping Hyderabad’s action-sports scene.
            </p>
          </div>

          <div className="wr-feature-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="wr-feature group">
                <CampaignImage
                  src={feature.image}
                  alt={feature.title}
                  className="wr-feature-media"
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
                <div className="wr-feature-copy">
                  <h3 className="wr-feature-title">{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Button asChild size="lg" className="wr-button-outline">
              <Link href="/classes">Explore classes ↗</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wr-section py-0" aria-label="WallRide at a glance">
        <div className="container wr-stat-grid">
          <div className="wr-stat">
            <p className="wr-stat-value">2017</p>
            <p className="wr-stat-label">WallRide founded</p>
          </div>
          <div className="wr-stat">
            <p className="wr-stat-value">BMX + Skate</p>
            <p className="wr-stat-label">One rider-built home</p>
          </div>
          <div className="wr-stat">
            <p className="wr-stat-value">First tries</p>
            <p className="wr-stat-label">Through bigger lines</p>
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-deep">
        <div className="container wr-story-grid">
          <CampaignImage
            src="/wallride/community.jpeg"
            alt="The WallRide community together at the park"
            className="wr-story-media"
            sizes="(min-width: 768px) 42vw, 100vw"
          />
          <div>
            <p className="wr-eyebrow">Built by a rider</p>
            <h2 className="wr-section-heading mt-5">Hyderabad needed a place to ride.</h2>
            <p className="wr-section-copy mt-7">
              WallRide began because Hyderabad needed a real place for people to ride, learn and meet. In 2017, BMX rider Hamza Khan turned that need into a park and a community.
            </p>
            <div className="wr-cta-group">
              <Button asChild size="lg" className="wr-button-light">
                <Link href="/about">Our story ↗</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-accent">
        <div className="container">
          <h2 className="wr-section-heading">Contests, jams, workshops and community sessions.</h2>
          <div className="wr-cta-group">
            <Button asChild size="lg" className="wr-button-light">
              <Link href="/events">View events ↗</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wr-section">
        <div className="container">
          <h2 className="wr-section-heading">Make your way to WallRide.</h2>
          <p className="wr-section-copy mt-6">
            Check today’s timings, plan your session or message us before you come.
          </p>
          <div className="wr-cta-group">
            <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">
              WhatsApp WallRide
            </WhatsAppCTA>
            <Button asChild size="lg" className="wr-button-outline">
              <Link href="/contact">Get directions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
