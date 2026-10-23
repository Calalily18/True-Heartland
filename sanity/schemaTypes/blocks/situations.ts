import { SplitVerticalIcon } from "@sanity/icons/SplitVertical";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  headingField,
  kickerField,
  sectionGroups,
  sectionLayoutFields,
  sourcesField,
} from "../objects/shared";

// "Readiness doesn't mean you're selling": numbered situation cards leading to one target.
export const situations = defineType({
  name: "situations",
  title: "Situations",
  type: "object",
  icon: SplitVerticalIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "text", rows: 4, group: "content" }),
    defineField({
      name: "items",
      type: "array",
      group: "content",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          name: "situation",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 4 }),
            defineField({ name: "statValue", title: "Stat (optional)", type: "string" }),
            defineField({ name: "statText", title: "Stat text", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "statValue" } },
        }),
      ],
    }),
    defineField({ name: "targetLabel", type: "string", group: "content" }),
    defineField({ name: "targetTitle", type: "string", group: "content" }),
    sourcesField,
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper2" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Situations" }),
  },
});
