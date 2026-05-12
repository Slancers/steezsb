import { defineField, defineType } from "sanity";

export const practiceTier = defineType({
  name: "practiceTier",
  title: "Practice Tier",
  type: "document",
  fields: [
    defineField({
      name: "durationHours",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "priceINR",
      title: "Price (INR)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
  orderings: [
    {
      title: "Duration",
      name: "durationAsc",
      by: [{ field: "durationHours", direction: "asc" }],
    },
  ],
  preview: {
    select: { hours: "durationHours", price: "priceINR" },
    prepare: ({ hours, price }) => ({
      title: `${hours} hour${hours === 1 ? "" : "s"}`,
      subtitle: `₹${price?.toLocaleString("en-IN") ?? "—"}`,
    }),
  },
});
