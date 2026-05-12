import { FaqEngagementTracker } from "@/components/analytics/FaqEngagementTracker";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { getFaqs } from "@/sanity/queries";
import type { Faq } from "@/types/sanity";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Common questions about skateboarding classes, practice, gear, and getting started at STEEZE in Hyderabad.",
  path: "/faq",
});

const CATEGORY_LABELS: Record<
  NonNullable<Faq["category"]>,
  string
> = {
  classes: "Classes",
  practice: "Practice",
  gear: "Gear",
  general: "General",
};

const CATEGORY_ORDER: NonNullable<Faq["category"]>[] = [
  "classes",
  "practice",
  "gear",
  "general",
];

function groupByCategory(faqs: Faq[]) {
  const groups = new Map<NonNullable<Faq["category"]>, Faq[]>();
  for (const faq of faqs) {
    const cat = (faq.category ?? "general") as NonNullable<Faq["category"]>;
    const bucket = groups.get(cat) ?? [];
    bucket.push(faq);
    groups.set(cat, bucket);
  }
  return groups;
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const grouped = groupByCategory(faqs);

  return (
    <>
      <FaqEngagementTracker />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="text-lg text-muted-foreground">
            The questions parents and skaters ask most. Can&apos;t find your
            answer? WhatsApp Hari directly.
          </p>
        </div>
      </section>

      <section className="container pb-12">
        {faqs.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            FAQs will appear here once added in Sanity Studio.
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-12">
            {CATEGORY_ORDER.map((category) => {
              const items = grouped.get(category);
              if (!items || items.length === 0) return null;
              return (
                <div key={category}>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <dl className="space-y-6">
                    {items.map((faq) => (
                      <div key={faq._id} className="border-b pb-6">
                        <dt className="text-lg font-semibold">
                          {faq.question}
                        </dt>
                        <dd className="mt-2 whitespace-pre-line text-muted-foreground">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-xl bg-muted p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Still have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
            WhatsApp Hari directly — he&apos;s the fastest way to a real
            answer.
          </p>
          <div className="mt-6">
            <WhatsAppCTA intent="general" size="lg">
              WhatsApp Hari
            </WhatsAppCTA>
          </div>
        </div>
      </section>
    </>
  );
}
