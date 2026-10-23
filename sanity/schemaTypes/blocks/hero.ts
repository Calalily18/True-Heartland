import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionGroups, sectionLayoutFields, sourcesField } from "../objects/shared";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: StarIcon,
  groups: sectionGroups,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({ name: "subheading", type: "text", rows: 4, group: "content" }),
    defineField({ name: "primaryCta", title: "Primary button", type: "callToAction", group: "content" }),
    defineField({ name: "secondaryCta", title: "Secondary link", type: "callToAction", group: "content" }),
    defineField({
      name: "stats",
      type: "array",
      description: "Shown beside the illustration. The first number is gold, the second red.",
      of: [defineArrayMember({ type: "stat" })],
      validation: (rule) => rule.max(3),
      group: "content",
    }),
    sourcesField,
    ...sectionLayoutFields,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Hero" }),
  },
});
