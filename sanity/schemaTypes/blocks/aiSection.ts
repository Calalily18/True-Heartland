import { SparklesIcon } from "@sanity/icons/Sparkles";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  headingField,
  kickerField,
  sectionGroups,
  sectionLayoutFields,
  sourcesField,
} from "../objects/shared";

export const aiSection = defineType({
  name: "aiSection",
  title: "AI readiness",
  type: "object",
  icon: SparklesIcon,
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
          name: "aiPillar",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", description: 'For example "Pillar 1".' }),
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "stats", type: "array", of: [defineArrayMember({ type: "stat" })] }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        }),
      ],
    }),
    sourcesField,
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "AI readiness" }),
  },
});
