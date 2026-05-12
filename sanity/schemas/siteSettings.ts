import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      description: "E.164 format, no '+' (e.g. 919876543210)",
      validation: (r) => r.required(),
    }),
    defineField({ name: "phoneNumber", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "address",
      type: "object",
      fields: [
        defineField({ name: "line1", type: "string" }),
        defineField({ name: "line2", type: "string" }),
        defineField({ name: "city", type: "string", initialValue: "Hyderabad" }),
        defineField({
          name: "state",
          type: "string",
          initialValue: "Telangana",
        }),
        defineField({ name: "pincode", type: "string" }),
      ],
    }),
    defineField({
      name: "geo",
      title: "Geo (for LocalBusiness schema)",
      type: "object",
      fields: [
        defineField({ name: "lat", type: "number" }),
        defineField({ name: "lng", type: "number" }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
      ],
    }),
    defineField({
      name: "openingHours",
      type: "array",
      of: [{ type: "string" }],
      description: "One per line, e.g. 'Mon-Fri 16:00-19:00'",
    }),
    defineField({
      name: "hero",
      title: "Home Hero",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "subtitle", type: "text", rows: 3 }),
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About / Coach",
      type: "object",
      fields: [
        defineField({ name: "bio", type: "text", rows: 6 }),
        defineField({ name: "philosophy", type: "text", rows: 4 }),
        defineField({
          name: "photo",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
