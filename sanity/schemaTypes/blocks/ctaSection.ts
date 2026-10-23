import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { defineField, defineType } from "sanity";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "Call-to-action section",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "cta",
      title: "Button",
      type: "callToAction",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Call to action" }),
  },
});
