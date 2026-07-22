import type { StructureResolver } from "sanity/structure";

// Studio sidebar:
// - Site Settings as a singleton entry
// - Public content
// - Private (leads, students) grouped under a folder for clarity
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("coachingProgram").title("Coaching Programs"),
      S.documentTypeListItem("practiceTier").title("Practice Tiers"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("location").title("Locations"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("mediaItem").title("Media"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("mediaBuzz").title("Media Buzz"),
      S.divider(),
      S.listItem()
        .title("Private")
        .child(
          S.list()
            .title("Private")
            .items([
              S.documentTypeListItem("lead").title("Leads"),
              S.documentTypeListItem("student").title("Students"),
            ])
        ),
    ]);
