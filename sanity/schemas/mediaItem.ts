import { defineField, defineType } from "sanity";

export const mediaItem = defineType({
  name: "mediaItem",
  title: "Media Item",
  type: "document",
  fields: [
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Optional YouTube / Instagram / external video link",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first in the gallery",
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
    select: { title: "caption", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Media item", media }),
  },
});
