import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subheading", type: "text", rows: 3 }),
    defineField({ name: "primaryCta", title: "Primary button", type: "callToAction" }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "callToAction" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Hero" }),
  },
});
