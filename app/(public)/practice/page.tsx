import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { formatINR, pluralize } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import {
  getPracticeTiers,
  getPrimaryLocation,
  getSiteSettings,
} from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "Bowl Practice in Hyderabad",
  description:
    "Hourly bowl access for independent skaters in Hyderabad. Transparent pricing per hour.",
  path: "/practice",
});

export default async function PracticePage() {
  const [tiers, location, settings] = await Promise.all([
    getPracticeTiers(),
    getPrimaryLocation(),
    getSiteSettings(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice", path: "/practice" },
        ])}
      />

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Hourly bowl practice
          </h1>
          <p className="text-lg text-muted-foreground">
            Hyderabad skaters can book practice time at the STEEZE bowl by the
            hour. Bring your own board or rent one — discuss on WhatsApp.
          </p>
        </div>
      </section>

      <section className="container pb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Pricing</h2>
        {tiers.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Practice pricing will appear here once added in Sanity Studio.
            <div className="mt-4">
              <WhatsAppCTA intent="practice">
                WhatsApp about practice time
              </WhatsAppCTA>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card key={tier._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    {tier.durationHours}{" "}
                    {pluralize(tier.durationHours, "hour")}
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {formatINR(tier.priceINR)}
                  </CardDescription>
                </CardHeader>
                {tier.description ? (
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </CardContent>
                ) : null}
                <CardFooter>
                  <WhatsAppCTA intent="practice" className="w-full">
                    Book {tier.durationHours}{" "}
                    {pluralize(tier.durationHours, "hr")}
                  </WhatsAppCTA>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {location?.photos && location.photos.length > 0 ? (
        <section className="container py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">The bowl</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {location.photos.slice(0, 6).map((photo, i) => (
              <Image
                key={i}
                src={urlFor(photo).width(600).height(400).url()}
                alt={photo.alt ?? location.name}
                width={600}
                height={400}
                className="aspect-[3/2] rounded-lg object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}

      {settings?.openingHours && settings.openingHours.length > 0 ? (
        <section className="container py-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Hours</h2>
          <ul className="space-y-1 text-muted-foreground">
            {settings.openingHours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="container py-12 md:py-16">
        <div className="rounded-xl bg-muted p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Pick a time
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
            WhatsApp Hari with the day and duration that work for you.
          </p>
          <div className="mt-6">
            <WhatsAppCTA intent="practice" size="lg">
              WhatsApp to book practice
            </WhatsAppCTA>
          </div>
        </div>
      </section>
    </>
  );
}
