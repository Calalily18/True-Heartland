import { DashboardIcon } from "@sanity/icons/Dashboard";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

export const assessmentPromo = defineType({
  name: "assessmentPromo",
  title: "Assessment invitation",
  type: "object",
  icon: DashboardIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "text", rows: 4, group: "content" }),
    defineField({ name: "resultsHeading", type: "string", group: "content" }),
    defineField({
      name: "results",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "resultItem",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: [
                  { title: "Gauge", value: "gauge" },
                  { title: "Target", value: "target" },
                  { title: "Rising line", value: "trend" },
                  { title: "Envelope", value: "envelope" },
                ],
              },
            }),
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        }),
      ],
    }),
    defineField({ name: "calloutHeading", type: "string", group: "content" }),
    defineField({ name: "calloutBody", type: "blockContent", group: "content" }),
    defineField({ name: "cta", title: "Button", type: "callToAction", group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "ink" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Assessment invitation" }),
  },
});
