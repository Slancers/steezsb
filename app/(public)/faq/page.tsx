import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Arrow, StarBurst, WhatsAppIcon } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { getFaqs } from "@/sanity/queries";
import type { Faq } from "@/types/sanity";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Common questions about STEEZ classes, bowl practice, kit, and getting started in Hyderabad.",
  path: "/faq",
});

const FALLBACK_FAQS = [
  {
    q: "I've never skated. Can I just show up?",
    a: "Yes. Book a Saturday morning beginner group on WhatsApp. We'll have a helmet, pads, and a loaner board ready. You'll be on a board in 10 minutes.",
  },
  {
    q: "How old should my kid be?",
    a: "We start kids from age 7. Below 7 is usually too early — they don't yet have the balance and they tire fast. But ping Hari, he's seen exceptions.",
  },
  {
    q: "Is it safe?",
    a: "Falling is a part of skating. We minimize the chance — helmets and pads always, drills before tricks, beginner zones away from the bowl. But we don't pretend you'll never fall.",
  },
  {
    q: "Do I need to buy a board to start?",
    a: "No. First session is free-loaner. After that, if you're going to keep coming, we'll help you set up an entry-level complete (~₹4,200). We won't push expensive stuff.",
  },
  {
    q: "Can I just rent the bowl by the hour?",
    a: "Yes — that's our Practice option. ₹200/hr walk-in, ₹3,200/month unlimited. Bring your own board, or rent one for ₹100.",
  },
  {
    q: "Where exactly is the bowl?",
    a: "Banjara Hills, Hyderabad. We don't pin the exact address publicly to keep walk-ins manageable — WhatsApp Hari and he'll share the maps link.",
  },
  {
    q: "What if it rains?",
    a: "Bowl's outdoor. Wet bowl = closed bowl. If we cancel a class due to rain, you get a free re-book. Practice slots are refunded.",
  },
  {
    q: "Can I film / take photos?",
    a: "Outside the bowl, yes. Inside the bowl, no — too easy to trip on. We can film your runs from the deck if you ask.",
  },
  {
    q: "Do you do birthday parties or group bookings?",
    a: "Yes — minimum 4 skaters, 2 hours, includes coach. Ping Hari with a date and we'll figure it out.",
  },
  {
    q: "Are women / girls welcome?",
    a: "Of course. About 40% of our students are women and girls. Saturday morning groups are usually women-heavy.",
  },
];

export default async function FaqPage() {
  const sanityFaqs = await getFaqs();
  const items =
    sanityFaqs.length > 0
      ? sanityFaqs.map((f: Faq) => ({ q: f.question, a: f.answer }))
      : FALLBACK_FAQS;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd
        data={faqPageJsonLd(
          items.map((it, idx) => ({
            _id: `fallback-${idx}`,
            question: it.q,
            answer: it.a,
          }))
        )}
      />

      <PageHero
        eyebrow="[ faq ]"
        lines={[
          { text: "STUFF", treatment: "outlined" },
          { text: "YOU MIGHT" },
          { text: "ASK.", treatment: "red-shadow" },
        ]}
        subtitle="If your question isn't here, ask Hari on WhatsApp. He replies fast. He also replies honestly."
      />

      <div className="pt-12 md:pt-16">
        <Marquee variant="dark" reverse>
          <StarBurst className="text-steeze-red" /> Q · A · Q · A · Q · A{" "}
          <StarBurst className="text-steeze-lime" /> Q · A · Q · A · Q · A{" "}
          <StarBurst className="text-steeze-blue" /> Q · A · Q · A · Q · A{" "}
          <StarBurst className="text-steeze-red" /> Q · A · Q · A · Q · A
        </Marquee>
      </div>

      <section className="container py-16 md:py-20">
        <FAQAccordion items={items} />
      </section>

      {/* Still curious CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="grid items-end gap-8 border-t-[1.5px] border-ink py-14 md:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow-zine">[ STILL CURIOUS ]</div>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-6xl lg:text-7xl">
                ask hari
                <br />
                directly.
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-ink-soft">
                WhatsApp is the fastest. Phone calls work too. Email exists but
                it&apos;s slower than both.
              </p>
            </div>
            <WhatsAppCTA intent="general" className="btn-zine btn-zine--red">
              <WhatsAppIcon size={18} /> WhatsApp Hari <Arrow size={16} />
            </WhatsAppCTA>
          </div>
        </Reveal>
      </section>
    </>
  );
}
