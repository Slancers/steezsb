import { defineField, defineType } from "sanity";

export const student = defineType({
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "parentName", type: "string" }),
    defineField({
      name: "enrolledProgram",
      type: "reference",
      to: [{ type: "coachingProgram" }],
    }),
    defineField({ name: "enrolledAt", type: "date" }),
    defineField({
      name: "attributedLead",
      type: "reference",
      to: [{ type: "lead" }],
      description: "Set this when converting a lead into a paying student",
    }),
    defineField({
      name: "paid",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "feeBilledToHari",
      title: "Per-student fee billed to Hari",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Enrolled (newest first)",
      name: "enrolledAtDesc",
      by: [{ field: "enrolledAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      parent: "parentName",
      paid: "paid",
      billed: "feeBilledToHari",
    },
    prepare: ({ name, parent, paid, billed }) => ({
      title: name,
      subtitle: `${parent ? `Parent: ${parent} · ` : ""}${
        paid ? "paid" : "unpaid"
      }${billed ? " · billed" : ""}`,
    }),
  },
});
