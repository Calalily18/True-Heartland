import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

// "How we work": execution pillars and the illustrative 12-week sprint.
export const rhythmSection = defineType({
  name: "rhythmSection",
  title: "How we work",
  type: "object",
  icon: CalendarIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "blockContent", group: "content" }),
    defineField({ name: "pillarsHeading", type: "string", group: "content" }),
    defineField({
      name: "pillars",
      type: "array",
      group: "content",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          name: "rhythmPillar",
          type: "object",
          fields: [
            defineField({ name: "tag", type: "string" }),
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        }),
      ],
    }),
    defineField({ name: "sprintHeading", type: "string", group: "content" }),
    defineField({ name: "sprintText", type: "text", rows: 3, group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper2" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "How we work" }),
  },
});
