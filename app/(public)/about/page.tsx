import Link from "next/link";

import { AboutMotionGraphic } from "@/components/public/AboutMotionGraphic";
import { CampaignImage } from "@/components/public/CampaignImage";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About WallRide Park",
  description: "The story behind WallRide Park: Hyderabad’s home for BMX, skateboarding and alternative culture.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <JsonLd data={organizationJsonLd(null)} />
      <section className="wr-about-hero">
        <div className="container wr-about-hero-grid">
          <div className="wr-about-hero-copy">
            <p className="wr-eyebrow" data-reveal>The WallRide story</p>
            <h1 className="wr-about-hero-title" data-reveal>
              Built because Hyderabad needed a place to ride.
            </h1>
            <p className="wr-about-hero-lead" data-reveal>
              A safe and engaging environment supporting alternative culture, built for beginners, progressing riders and the community around them.
            </p>
          </div>
          <div className="wr-about-hero-visual" data-reveal>
            <CampaignImage
              src="/wallride/classes.jpeg"
              alt="Riders learning together at WallRide Park"
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
              className="wr-about-hero-media"
            />
            <p className="wr-about-hero-caption">A place to start. A place to keep going.</p>
            <AboutMotionGraphic className="wr-about-hero-motion" />
          </div>
        </div>
      </section>

      <section className="wr-about-rail" aria-label="WallRide story markers">
        <div className="container wr-about-rail-grid">
          <div><strong>2017</strong><span>The idea became a park</span></div>
          <div><strong>Hyderabad</strong><span>Built for the local scene</span></div>
          <div><strong>Everyone</strong><span>First tries through bigger lines</span></div>
        </div>
      </section>

      <section className="wr-section wr-about-origin">
        <div className="container wr-about-origin-grid">
          <p className="wr-about-origin-word" aria-hidden="true" data-reveal>Need</p>
          <div className="wr-about-origin-copy" data-reveal>
            <h2 className="wr-section-heading">Before the park, there was a gap.</h2>
            <p className="wr-section-copy mt-8">
              Riders in Hyderabad had the passion but not the infrastructure. Hamza saw skate culture growing across India while the city still had no place built for it.
            </p>
            <p className="wr-section-copy mt-5">
              WallRide started as a personal passion project and became something bigger: a real home for people who wanted to learn, ride and meet.
            </p>
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-muted wr-about-timeline">
        <div className="container">
          <div className="wr-about-timeline-intro" data-reveal>
            <h2 className="wr-section-heading">One idea became a place to ride.</h2>
            <p className="wr-section-copy mt-7">
              The park grew by bringing the right people together, from international track builders to the riders and families who made it their own.
            </p>
          </div>
          <div className="wr-about-timeline-list">
            <article className="wr-about-milestone" data-reveal>
              <p className="wr-about-milestone-year">Before WallRide</p>
              <h3>Passion without a home.</h3>
              <p>Hyderabad had riders, energy and a growing scene. It needed somewhere that could hold all three.</p>
            </article>
            <article className="wr-about-milestone" data-reveal>
              <p className="wr-about-milestone-year">The build</p>
              <h3>International craft. Local belief.</h3>
              <p>Velosolutions brought Swiss pump-track expertise, while the skate terrain was shaped by builders from Bangalore.</p>
            </article>
            <article className="wr-about-milestone" data-reveal>
              <p className="wr-about-milestone-year">Since 2017</p>
              <h3>A park became a community.</h3>
              <p>First-time riders, regular crews, coaches, families and athletes continue to give WallRide its energy.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="wr-section wr-about-build">
        <div className="container wr-about-build-grid">
          <CampaignImage
            src="/wallride/pump-track.jpeg"
            alt="Young riders moving through the WallRide pump track"
            sizes="(min-width: 768px) 48vw, 100vw"
            className="wr-about-build-media"
          />
          <div className="wr-about-build-copy" data-reveal>
            <p className="wr-eyebrow">International track. Local scene.</p>
            <h2 className="wr-section-heading mt-5">Built for Hyderabad. Made to a world-class standard.</h2>
            <p className="wr-section-copy mt-8">
              WallRide brought together India’s first asphalt pump track with skate terrain designed for progression. The result is a place that feels serious enough for athletes and welcoming enough for a first session.
            </p>
            <AboutMotionGraphic className="wr-about-build-motion" />
          </div>
        </div>
      </section>

      <section className="wr-section wr-about-manifesto">
        <div className="container">
          <p className="wr-about-manifesto-title" data-reveal>More than a park.</p>
          <p className="wr-about-manifesto-copy" data-reveal>
            WallRide exists to give action sports a real home in Hyderabad: a place where beginners feel welcome, experienced riders can progress, and the next generation can see BMX and skateboarding as more than a hobby.
          </p>
          <p className="wr-about-manifesto-line" data-reveal>Ride. Learn. Progress. Together.</p>
        </div>
      </section>

      <section className="wr-section wr-section-accent wr-about-cta">
        <div className="container">
          <h2 className="wr-section-heading" data-reveal>Come see what Hyderabad has been building.</h2>
          <div className="wr-cta-group" data-reveal>
            <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">Message WallRide</WhatsAppCTA>
            <Button asChild size="lg" className="wr-button-outline"><Link href="/contact">Plan your visit</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
