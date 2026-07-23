import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events at WallRide Park",
  description: "Jams, contests, workshops and community sessions at WallRide Park in Hyderabad.",
  path: "/events",
});

const EVENT_INFO = [
  ["Core details", "Event name and one-sentence description", "Date, start time and venue"],
  ["Rider categories", "Disciplines, age groups and skill categories", "Schedule, rules and required safety gear"],
  ["Registration", "Entry fee, registration link and deadline", "Prizes, partners and contact person"],
  ["Event media", "Poster, photos and results after the event", "Everything needed to share the event clearly"],
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events and culture"
        title="What’s dropping next."
        description="Contests, jams, workshops and community sessions for riders and the people who back them."
      />

      <section className="wr-section wr-section-accent">
        <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <h2 className="wr-section-heading">Details are being confirmed.</h2>
          <div className="space-y-3 text-lg leading-8 text-black/75">
            <p><strong>Event:</strong> Hamza to confirm</p>
            <p><strong>Date and time:</strong> Hamza to confirm</p>
            <p><strong>Registration:</strong> Hamza to confirm</p>
            <WhatsAppCTA intent="general" size="lg" className="wr-button-light mt-5">Register or ask on WhatsApp</WhatsAppCTA>
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-muted">
        <div className="container">
          <h2 className="wr-section-heading">The park comes alive when the community gets together.</h2>
          <p className="wr-section-copy mt-7">
            WallRide has hosted pump-track racing, BMX and skateboarding competitions, beginner workshops and community jams. Past highlights include Red Bull Pump Track events, Red Bull Feel the Wheel, RevJam and community-led workshops.
          </p>
          <div className="wr-info-grid mt-12">
            {EVENT_INFO.map(([title, first, second]) => (
              <article key={title} className="wr-info-card">
                <strong>{title}</strong>
                <p>{first}<br />{second}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-deep">
        <div className="container">
          <h2 className="wr-section-heading">No upcoming event has been announced yet.</h2>
          <p className="wr-section-copy mt-6">Follow WallRide or message us to hear what is coming next.</p>
          <div className="wr-cta-group">
            <Button asChild size="lg" className="wr-button-light"><a href="https://instagram.com/wallrideparkhyd" target="_blank" rel="noopener noreferrer">Follow @wallrideparkhyd ↗</a></Button>
            <WhatsAppCTA intent="general" size="lg" className="wr-button-primary">WhatsApp WallRide</WhatsAppCTA>
          </div>
        </div>
      </section>
    </>
  );
}
