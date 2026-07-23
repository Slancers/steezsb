import Link from "next/link";

import { CampaignImage } from "@/components/public/CampaignImage";
import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Classes at WallRide Park",
  description: "BMX, skateboarding and pump track classes in Hyderabad for beginners and progressing riders.",
  path: "/classes",
});

const CLASSES = [
  {
    title: "BMX classes",
    label: "Find your flow",
    text: "Learn balance, bike control, pumping, cornering and the foundations needed to ride the track with flow.",
    details: "₹6,000 for 8 classes. Schedule to be confirmed.",
    image: "/wallride/pump-track.jpeg",
  },
  {
    title: "Skateboarding classes",
    label: "Start with balance",
    text: "Start with stance, balance, pushing and stopping before progressing to lines, transitions and tricks.",
    details: "Price and schedule to be confirmed.",
    image: "/wallride/classes.jpeg",
  },
];

export default function ClassesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Classes", path: "/classes" }])} />
      <PageHero
        eyebrow="Classes at WallRide"
        title="Start from zero. Progress from there."
        description="You don’t need experience to begin. Tell us the rider’s age, discipline and level. We’ll help choose the right session."
      />

      {CLASSES.map((item, index) => (
        <section key={item.title} className={`wr-section ${index === 0 ? "wr-section-muted" : "wr-section-deep"}`}>
          <div className="container wr-story-grid">
            <CampaignImage
              src={item.image}
              alt={item.title}
              className={`wr-story-media ${index === 1 ? "md:order-2" : ""}`}
              sizes="(min-width: 768px) 44vw, 100vw"
            />
            <div className={index === 1 ? "md:order-1" : ""}>
              <p className="wr-eyebrow">{item.label}</p>
              <h2 className="wr-section-heading mt-5">{item.title}</h2>
              <p className="wr-section-copy mt-7">{item.text}</p>
              <p className="mt-5 max-w-xl text-sm font-semibold leading-6 text-black/60">
                Suitable for beginners and progressing riders.<br />{item.details}
              </p>
              <div className="wr-cta-group">
                <WhatsAppCTA intent="class" className="wr-button-primary">Ask about {item.title}</WhatsAppCTA>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="wr-section">
        <div className="container">
          <h2 className="wr-section-heading">A better first session starts with the right questions.</h2>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-black/70">
            <p>Tell us the rider’s age, discipline and experience level. We will help you choose the right session and explain what equipment and safety gear to bring.</p>
            <p>Equipment availability and current rental options should be confirmed before visiting.</p>
          </div>
          <div className="wr-cta-group">
            <WhatsAppCTA intent="class" size="lg" className="wr-button-primary">Message WallRide on WhatsApp</WhatsAppCTA>
            <Button asChild size="lg" className="wr-button-outline"><Link href="/contact">Visit the park</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
