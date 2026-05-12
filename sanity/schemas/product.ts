import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
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
      name: "priceINR",
      title: "Price (INR)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "includes",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", price: "priceINR", image: "images.0" },
    prepare: ({ title, price, image }) => ({
      title,
      subtitle: `₹${price?.toLocaleString("en-IN") ?? "—"}`,
      media: image,
    }),
  },
});
