import Link from "next/link";

import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan your visit to WallRide Park",
  description: "Opening hours, entry, rentals and what to know before your WallRide Park session in Hyderabad.",
  path: "/practice",
});

const ESSENTIALS = [
  ["Hours", "3:00 pm-9:00 pm", "Closed Wednesdays"],
  ["Entry", "₹250 per hour", "Confirm current rates before visiting"],
  ["Rental skateboard", "₹150 per hour", "Availability can change"],
  ["Good to bring", "Comfortable clothes", "Closed shoes and your own gear where possible"],
];

export default function PracticePage() {
  return (
    <>
      <PageHero
        eyebrow="Plan your visit"
        title="Make a day of it."
        image={{ src: "/wallride/pump-track.jpeg", alt: "WallRide Park pump track" }}
      />

      <section className="wr-section wr-section-muted">
        <div className="container">
          <h2 className="wr-section-heading">Everything you need before you roll in.</h2>
          <div className="wr-info-grid mt-12">
            {ESSENTIALS.map(([label, value, note]) => (
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
          <h2 className="wr-section-heading">Park, water, toilets, greenery, and room to breathe.</h2>
          <p className="wr-section-copy mt-7">
            WallRide is set in a nature-filled setting in Peeran Cheruvu, off Chevella Road. It’s pet friendly and built for spending time at the park, not just passing through.
          </p>
          <div className="wr-cta-group">
            <WhatsAppCTA intent="practice" size="lg" className="wr-button-primary">Check today’s details</WhatsAppCTA>
            <Button asChild size="lg" className="wr-button-outline"><Link href="/contact">Get directions</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
