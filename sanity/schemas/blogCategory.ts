import { defineField, defineType } from "sanity";

// Blog category — single-select on each post. Drives URL hierarchy
// (/blog/category/<slug>) and topical clustering for SEO. Different from
// `tags` which are free-form labels.
export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Category",
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
      name: "description",
      type: "text",
      rows: 3,
      description:
        "1-2 sentences. Renders on the category index page and feeds the category meta description.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers display first.",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
