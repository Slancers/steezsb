import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "refCode",
      title: "Ref code",
      type: "string",
      description: "6-char code embedded in the WhatsApp message for attribution",
      readOnly: true,
    }),
    defineField({
      name: "sourcePage",
      type: "string",
      description: "Page the lead originated from, e.g. /classes",
    }),
    defineField({
      name: "intent",
      type: "string",
      options: {
        list: [
          { title: "Class inquiry", value: "class" },
          { title: "Practice / bowl", value: "practice" },
          { title: "Kit / shop", value: "kit" },
          { title: "General", value: "general" },
          { title: "Direct (manual entry)", value: "direct" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "createdAt", type: "datetime" }),
    defineField({ name: "userAgent", type: "text", rows: 2 }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Converted", value: "converted" },
          { title: "Lost", value: "lost" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({ name: "contactedAt", type: "datetime" }),
    defineField({ name: "convertedAt", type: "datetime" }),
    defineField({ name: "notes", type: "text", rows: 4 }),
    defineField({
      name: "student",
      type: "reference",
      to: [{ type: "student" }],
      description: "Linked student record once converted",
    }),
  ],
  orderings: [
    {
      title: "Created (newest first)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      refCode: "refCode",
      intent: "intent",
      status: "status",
      sourcePage: "sourcePage",
    },
    prepare: ({ refCode, intent, status, sourcePage }) => ({
      title: `${refCode ?? "—"} · ${intent ?? "?"}`,
      subtitle: `${status ?? "new"} · ${sourcePage ?? "?"}`,
    }),
  },
});
