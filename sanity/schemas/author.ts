import { defineField, defineType } from "sanity";

// Author document — drives bylines, Person JSON-LD, and E-E-A-T signals
// on blog posts. Each post references one primary `author` (and optionally
// a `reviewedBy` for E-E-A-T cross-validation).
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. 'Founder', 'Head Coach', 'Contributing Writer'",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
      description:
        "1-3 sentences. Used as the author byline blurb and in Person JSON-LD.",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "credentials",
      title: "Credentials / Authority signals",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        "Short phrases that establish authority. e.g. 'Coaching since 2019', '500+ students taught'. Used for E-E-A-T.",
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
        defineField({ name: "website", type: "url" }),
      ],
    }),
    defineField({ name: "email", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
