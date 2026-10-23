import { OlistIcon } from "@sanity/icons/Olist";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

const stepIcons = [
  { title: "Checklist", value: "checklist" },
  { title: "Phone call", value: "phone" },
  { title: "Magnifying glass", value: "search" },
  { title: "Document", value: "document" },
  { title: "Fork in the path", value: "fork" },
];

// "How it works": a numbered timeline. One step can carry a sample Growth & Readiness Blueprint.
export const processSteps = defineType({
  name: "processSteps",
  title: "Process steps",
  type: "object",
  icon: OlistIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "text", rows: 4, group: "content" }),
    defineField({
      name: "steps",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "processStep",
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", options: { list: stepIcons } }),
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 4 }),
            defineField({
              name: "sample",
              title: "Sample Blueprint (optional)",
              type: "object",
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "tag", type: "string", initialValue: "SAMPLE" }),
                defineField({ name: "preparedFor", type: "string" }),
                defineField({
                  name: "priorities",
                  type: "array",
                  description: "Each priority is a bar on the four-quarter plan. Quarters run from 0 (start of Q1) to 4 (end of Q4).",
                  of: [
                    defineArrayMember({
                      name: "priority",
                      type: "object",
                      fields: [
                        defineField({ name: "text", title: "Priority", type: "string", validation: (rule) => rule.required() }),
                        defineField({ name: "shortLabel", title: "Chart label", type: "string" }),
                        defineField({ name: "start", title: "Starts at quarter", type: "number", validation: (rule) => rule.min(0).max(4) }),
                        defineField({ name: "end", title: "Ends at quarter", type: "number", validation: (rule) => rule.min(0).max(4) }),
                      ],
                      preview: { select: { title: "text", subtitle: "shortLabel" } },
                    }),
                  ],
                }),
                defineField({ name: "caption", type: "text", rows: 2 }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Process steps" }),
  },
});
