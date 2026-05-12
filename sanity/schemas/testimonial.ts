import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "studentName", type: "string" }),
    defineField({ name: "parentName", type: "string" }),
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "date", type: "date" }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Featured testimonials surface on the home page",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      student: "studentName",
      parent: "parentName",
      quote: "quote",
      featured: "featured",
      media: "photo",
    },
    prepare: ({ student, parent, quote, featured, media }) => ({
      title: student || parent || "Testimonial",
      subtitle: `${featured ? "★ " : ""}${quote?.slice(0, 60) ?? ""}…`,
      media,
    }),
  },
});
