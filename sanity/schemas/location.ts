import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["bowl", "skatepark"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "address", type: "text", rows: 2 }),
    defineField({
      name: "geo",
      type: "object",
      fields: [
        defineField({ name: "lat", type: "number" }),
        defineField({ name: "lng", type: "number" }),
      ],
    }),
    defineField({
      name: "photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
    defineField({
      name: "isPrimary",
      title: "Primary location",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", type: "type", isPrimary: "isPrimary" },
    prepare: ({ title, type, isPrimary }) => ({
      title,
      subtitle: `${type}${isPrimary ? " · primary" : ""}`,
    }),
  },
});
