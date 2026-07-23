import { PageHero } from "@/components/public/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WallRide Park FAQ",
  description: "Answers about visiting, classes, equipment and starting at WallRide Park.",
  path: "/faq",
});

const FAQS = [
  ["What are WallRide’s opening hours?", "The park is open from 3:00 pm to 9:00 pm and is closed on Wednesdays. Classes run in the mornings."],
  ["Do I need experience to start?", "No. WallRide welcomes first-timers and progressing riders. Message us with the rider’s age, discipline and experience so we can point you to the right session."],
  ["What can I ride at WallRide?", "WallRide has skateboarding, BMX and pump track spaces. Rentals include boards, bikes and scooters, subject to availability."],
  ["How much is entry?", "The current listed entry price is ₹250 per hour. Rates and rental availability can change, so confirm before visiting."],
  ["What should I bring?", "Wear comfortable clothes and closed shoes. Bring your own BMX bike or skateboard and safety gear where possible."],
  ["Where is the park?", "WallRide Park is in Peeran Cheruvu, Hyderabad, off Chevella Road."],
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Good to know" title="Before you roll in." />
      <section className="wr-section wr-section-muted">
        <div className="container grid gap-12 md:grid-cols-[0.55fr_1.45fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="wr-section-heading text-[clamp(2.5rem,4.5vw,4.5rem)]">Still unsure? That’s what we’re here for.</h2>
          </div>
          <div>
            <div className="wr-faq-list">
              {FAQS.map(([question, answer]) => (
                <details key={question} className="wr-faq-item group">
                  <summary className="wr-faq-summary">
                    <span>{question}</span>
                    <span aria-hidden="true" className="text-2xl font-normal text-[#7138d3] transition-transform group-open:rotate-45">＋</span>
                  </summary>
                  <p className="wr-faq-answer">{answer}</p>
                </details>
              ))}
            </div>
            <div className="wr-cta-group">
              <WhatsAppCTA intent="general" className="wr-button-primary">Ask WallRide</WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
