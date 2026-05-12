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
import { breadcrumbJsonLd, buildMetadata, courseJsonLd } from "@/lib/seo";
import { getAllLocations, getCoachingPrograms } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "Skateboarding Classes in Hyderabad",
  description:
    "1-on-1 and group skateboarding coaching for kids and adults in Hyderabad. Structured programs, transparent pricing.",
  path: "/classes",
});

export default async function ClassesPage() {
  const [programs, locations] = await Promise.all([
    getCoachingPrograms(),
    getAllLocations(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Classes", path: "/classes" },
        ])}
      />
      {programs.map((program) => (
        <JsonLd key={program._id} data={courseJsonLd(program)} />
      ))}

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Skateboarding classes in Hyderabad
          </h1>
          <p className="text-lg text-muted-foreground">
            Structured coaching with Hari. 1-on-1 if you want focused
            attention, group classes if you want a regular squad. Beginners
            welcome — gear can be discussed on WhatsApp.
          </p>
        </div>
      </section>

      <section className="container pb-12">
        {programs.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Program pricing will appear here once added in Sanity Studio.
            <div className="mt-4">
              <WhatsAppCTA intent="class">WhatsApp for class info</WhatsAppCTA>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <Card key={program._id} className="flex flex-col">
                <CardHeader>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {program.type === "1on1" ? "1-on-1" : "Group"}
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.sessionCount}{" "}
                    {pluralize(program.sessionCount, "session")} ·{" "}
                    {program.sessionDurationMinutes} min each · up to{" "}
                    {program.maxStudents}{" "}
                    {pluralize(program.maxStudents, "student")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="text-3xl font-bold">
                    {formatINR(program.priceINR)}
                  </div>
                  {program.description ? (
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>
                  ) : null}
                  {program.learnings && program.learnings.length > 0 ? (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold">
                        What students learn
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {program.learnings.map((line, i) => (
                          <li key={i}>• {line}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
                <CardFooter>
                  <WhatsAppCTA intent="class" className="w-full">
                    WhatsApp about this program
                  </WhatsAppCTA>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {locations.length > 0 ? (
        <section className="container py-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Where classes happen
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {locations.map((loc) => (
              <li key={loc._id}>
                <strong className="text-foreground">{loc.name}</strong>
                {loc.address ? ` — ${loc.address}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="container py-12 md:py-16">
        <div className="rounded-xl bg-muted p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Not sure which program fits?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
            WhatsApp Hari — he&apos;ll help match the program to age, level, and
            schedule.
          </p>
          <div className="mt-6">
            <WhatsAppCTA intent="class" size="lg">
              WhatsApp Hari about classes
            </WhatsAppCTA>
          </div>
        </div>
      </section>

    </>
  );
}
