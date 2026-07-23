import Link from "next/link";

import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visit WallRide Park",
  description: "Find WallRide Park in Peeran Cheruvu, Hyderabad. Message us for current timings, rentals and directions.",
  path: "/contact",
});

const QUESTIONS = [
  ["Can complete beginners visit?", "Yes. Ask WallRide about the right class or session before coming."],
  ["Are classes available for children and adults?", "WallRide has historically coached different ages and experience levels. Confirm the current schedule directly."],
  ["Can I rent equipment?", "Rental availability changes. Message WallRide before visiting."],
];

const VISIT_INFO = [
  ["3:00 pm-9:00 pm", "Hours and entry", "Closed Wednesdays. Entry is ₹250 per hour."],
  ["₹150 per hour", "Rental skateboard", "Availability changes. Message before visiting."],
  ["@wallrideparkhyd", "Instagram", "WhatsApp and phone details are being confirmed."],
  ["Peeran Cheruvu", "Google Maps", "The map link is being confirmed. Message WallRide for directions."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit and contact"
        title="Plan your session."
        description="WallRide Park is located in Peeran Cheruvu, Hyderabad, off Chevella Road."
      />

      <section className="wr-section wr-section-muted">
        <div className="container grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div>
            <h2 className="wr-section-heading">Ask before you ride.</h2>
            <p className="wr-section-copy mt-7">
              Wear comfortable clothes and closed shoes. Bring your own BMX bike or skateboard unless WallRide has confirmed rental availability. Check the current safety-gear requirements before your session.
            </p>
            <div className="wr-cta-group">
              <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">WhatsApp WallRide</WhatsAppCTA>
              <Button asChild size="lg" className="wr-button-outline"><Link href="/practice">Plan your visit</Link></Button>
            </div>
          </div>
          <div className="wr-info-grid">
            {VISIT_INFO.map(([value, label, note]) => (
              <article key={label} className="wr-info-card">
                <strong>{value}</strong>
                <p><span className="font-semibold text-[#17171b]">{label}.</span> {note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-deep">
        <div className="container">
          <h2 className="wr-section-heading">Quick answers before you come.</h2>
          <div className="mt-12 max-w-4xl border-t border-black/15">
            {QUESTIONS.map(([question, answer]) => (
              <article key={question} className="grid gap-3 border-b border-black/15 py-7 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                <h3 className="wr-display text-2xl text-[#17171b] md:text-3xl">{question}</h3>
                <p className="leading-7 text-black/65">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
