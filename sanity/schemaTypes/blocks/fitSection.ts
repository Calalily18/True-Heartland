import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

// "Who we work with": the client profile, the revenue sweet spot, and why we're industry-agnostic.
export const fitSection = defineType({
  name: "fitSection",
  title: "Who we work with",
  type: "object",
  icon: UserIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "blockContent", group: "content" }),
    defineField({ name: "profileHeading", type: "string", group: "content" }),
    defineField({ name: "profileBody", type: "blockContent", group: "content" }),
    defineField({
      name: "phases",
      type: "array",
      group: "content",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          name: "phase",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "string", description: 'For example "$1M to $50M".' }),
            defineField({ name: "text", type: "text", rows: 2 }),
            defineField({ name: "highlight", type: "boolean", description: "Highlight this as the sweet spot.", initialValue: false }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({ name: "agnosticHeading", type: "string", group: "content" }),
    defineField({ name: "agnosticBody", type: "blockContent", group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper2" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Who we work with" }),
  },
});
