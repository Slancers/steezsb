import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "WallRide Park FAQ", description: "Answers about visiting, classes, equipment and starting at WallRide Park.", path: "/faq" });

const FAQS = [
  ["What are WallRide’s opening hours?", "The park is open from 3:00 pm to 9:00 pm and is closed on Wednesdays. Classes run in the mornings."],
  ["Do I need experience to start?", "No. WallRide welcomes first-timers and progressing riders. Message us with the rider’s age, discipline and experience so we can point you to the right session."],
  ["What can I ride at WallRide?", "WallRide has skateboarding, BMX and pump track spaces. Rentals include boards, bikes and scooters, subject to availability."],
  ["How much is entry?", "The current listed entry price is ₹250 per hour. Rates and rental availability can change, so confirm before visiting."],
  ["What should I bring?", "Wear comfortable clothes and closed shoes. Bring your own BMX bike or skateboard and safety gear where possible."],
  ["Where is the park?", "WallRide Park is in Peeran Cheruvu, Hyderabad, off Chevella Road."],
];

export default function FaqPage() {
  return <><section className="wr-page-hero wr-purple"><div className="container"><p className="wr-eyebrow mb-5 text-black/60">Good to know</p><h1 className="wr-display max-w-4xl text-7xl leading-[0.88] tracking-[-0.07em] text-black md:text-[9rem]">Before you roll in.</h1></div></section><section className="wr-section wr-paper"><div className="container grid gap-12 md:grid-cols-[0.6fr_1.4fr]"><div><p className="wr-eyebrow text-purple-700">Questions / answers</p><h2 className="wr-display mt-5 text-4xl leading-[0.95] tracking-[-0.04em] text-zinc-950">Still unsure? That’s what we’re here for.</h2><WhatsAppCTA intent="general" className="wr-button-dark mt-8">Ask WallRide</WhatsAppCTA></div><div className="divide-y divide-zinc-900/15">{FAQS.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl font-bold text-zinc-950"><span>{question}</span><span className="text-2xl font-normal text-purple-700 transition group-open:rotate-45">＋</span></summary><p className="max-w-2xl pt-4 text-base leading-7 text-zinc-600">{answer}</p></details>)}</div></div></section></>;
}
