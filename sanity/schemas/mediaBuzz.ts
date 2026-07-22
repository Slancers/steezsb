import { defineField, defineType } from "sanity";

export const mediaBuzz = defineType({
  name: "mediaBuzz",
  title: "Media Buzz",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "headline", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "publication", title: "Publication", type: "string", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 4 }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "sourceUrl", title: "Original article URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Published date (newest first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "headline", publication: "publication", date: "publishedAt", media: "coverImage" },
    prepare: ({ title, publication, date, media }) => ({ title, subtitle: `${publication ?? "Publication"} · ${date ? new Date(date).toLocaleDateString("en-IN") : "Draft"}`, media }),
  },
});
