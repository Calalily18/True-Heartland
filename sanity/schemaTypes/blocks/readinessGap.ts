import { ArrowRightIcon } from "@sanity/icons/ArrowRight";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, sectionLayoutFields, sourcesField } from "../objects/shared";

// "What the Readiness Gap actually costs": a before/after comparison, a headline figure,
// and two charts drawn from the numbers below.
export const readinessGap = defineType({
  name: "readinessGap",
  title: "Readiness gap",
  type: "object",
  icon: ArrowRightIcon,
  groups: [
    { name: "content", title: "Comparison", default: true },
    { name: "value", title: "Value charts" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    headingField,
    defineField({ name: "currentLabel", type: "string", initialValue: "The Current Reality", group: "content" }),
    defineField({ name: "currentTitle", type: "string", group: "content" }),
    defineField({ name: "goalLabel", type: "string", initialValue: "The Goal", group: "content" }),
    defineField({ name: "goalTitle", type: "string", group: "content" }),
    defineField({
      name: "rows",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "gapRow",
          type: "object",
          fields: [
            defineField({ name: "currentTitle", title: "Today: title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "currentText", title: "Today: text", type: "text", rows: 2 }),
            defineField({ name: "goalTitle", title: "Goal: title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "goalText", title: "Goal: text", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "currentTitle", subtitle: "goalTitle" },
            prepare: ({ title, subtitle }) => ({ title: `${title} → ${subtitle}` }),
          },
        }),
      ],
    }),
    defineField({ name: "currentImpact", title: "Today: bottom line", type: "text", rows: 2, group: "content" }),
    defineField({ name: "goalImpact", title: "Goal: bottom line", type: "text", rows: 2, group: "content" }),

    defineField({ name: "calloutFigure", title: "Headline figure", type: "string", description: 'For example "$1.5M+".', group: "value" }),
    defineField({ name: "calloutText", title: "Headline figure text", type: "text", rows: 4, group: "value" }),
    defineField({
      name: "valueRange",
      title: "Value range chart",
      type: "object",
      group: "value",
      description: "Values are in millions of dollars.",
      fields: [
        defineField({ name: "readyLabel", type: "string", initialValue: "Runs without the owner" }),
        defineField({ name: "dependentLabel", type: "string", initialValue: "Fully owner-dependent" }),
        defineField({ name: "low", title: "Range low ($M)", type: "number", validation: (rule) => rule.min(0) }),
        defineField({ name: "high", title: "Range high ($M)", type: "number", validation: (rule) => rule.min(0) }),
        defineField({ name: "discount", title: "Owner-dependence discount ($M)", type: "number", validation: (rule) => rule.min(0) }),
        defineField({ name: "discountLabel", type: "string", description: 'Shown on the arrow, for example "−$1.5M+".' }),
      ],
    }),
    defineField({ name: "moversHeading", type: "string", group: "value" }),
    defineField({ name: "moversIntro", type: "text", rows: 3, group: "value" }),
    defineField({
      name: "movers",
      title: "What moves the multiple",
      type: "array",
      group: "value",
      description: "Each bar spans from the low to the high change in turns of multiple, between −2 and +2.",
      of: [
        defineArrayMember({
          name: "mover",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "from", title: "From (turns)", type: "number", validation: (rule) => rule.required().min(-2).max(2) }),
            defineField({ name: "to", title: "To (turns)", type: "number", validation: (rule) => rule.required().min(-2).max(2) }),
            defineField({ name: "valueLabel", type: "string", description: 'For example "−$2M to −$4M".' }),
          ],
          preview: { select: { title: "label", subtitle: "valueLabel" } },
        }),
      ],
    }),
    defineField({ name: "moversCaption", type: "text", rows: 3, group: "value" }),
    { ...sourcesField, group: "content" },
    ...sectionLayoutFields,
  ],
  initialValue: { background: "ink" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Readiness gap" }),
  },
});
