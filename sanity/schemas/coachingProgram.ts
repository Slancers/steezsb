import { defineField, defineType } from "sanity";

export const coachingProgram = defineType({
  name: "coachingProgram",
  title: "Coaching Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["1on1", "group"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceINR",
      title: "Price (INR)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "sessionCount",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "sessionDurationMinutes",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "maxStudents",
      type: "number",
      description: "1 for 1-on-1, 10 for group",
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "learnings",
      title: "What students learn",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", price: "priceINR", type: "type" },
    prepare: ({ title, price, type }) => ({
      title,
      subtitle: `${type} · ₹${price?.toLocaleString("en-IN") ?? "—"}`,
    }),
  },
});
