import { BarChartIcon } from "@sanity/icons/BarChart";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  headingField,
  kickerField,
  sectionGroups,
  sectionLayoutFields,
  sourcesField,
} from "../objects/shared";

// "The problem": columns of numbered pillars, each a stack of stats. Pillar colors follow their order.
export const statPillars = defineType({
  name: "statPillars",
  title: "Stat pillars",
  type: "object",
  icon: BarChartIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "text", rows: 4, group: "content" }),
    defineField({
      name: "pillars",
      type: "array",
      group: "content",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          name: "pillar",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "subtitle", type: "string" }),
            defineField({ name: "stats", type: "array", of: [defineArrayMember({ type: "stat" })] }),
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } },
        }),
      ],
    }),
    sourcesField,
    ...sectionLayoutFields,
  ],
  initialValue: { background: "ink" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Stat pillars" }),
  },
});
