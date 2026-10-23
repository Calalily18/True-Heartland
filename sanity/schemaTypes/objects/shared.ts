import { defineField, defineType } from "sanity";

// Fields every home-page section shares: where the menu can link to, and which background it sits on.
export const sectionLayoutFields = [
  defineField({
    name: "anchorId",
    title: "Menu link ID",
    type: "string",
    description: 'Lets a menu link jump here, for example "process" for a link to "#process". Lowercase letters and hyphens.',
    validation: (rule) =>
      rule.regex(/^[a-z][a-z0-9-]*$/, { name: "lowercase id" }).warning("Use lowercase letters, numbers and hyphens"),
    group: "layout",
  }),
  defineField({
    name: "background",
    type: "string",
    options: {
      list: [
        { title: "Paper (light)", value: "paper" },
        { title: "Paper, darker band", value: "paper2" },
        { title: "Ink (dark)", value: "ink" },
      ],
      layout: "radio",
    },
    group: "layout",
  }),
];

export const sectionGroups = [
  { name: "content", title: "Content", default: true },
  { name: "layout", title: "Layout" },
];

export const kickerField = defineField({
  name: "kicker",
  type: "string",
  description: "The short label above the heading.",
  group: "content",
});

export const headingField = defineField({
  name: "heading",
  type: "string",
  validation: (rule) => rule.required(),
  group: "content",
});

export const sourcesField = defineField({
  name: "sources",
  type: "text",
  rows: 3,
  description: "Small print citing where the numbers come from.",
  group: "content",
});

// A big number with a sentence explaining it.
export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", description: 'For example "72%" or "$14T".', validation: (rule) => rule.required() }),
    defineField({ name: "text", type: "text", rows: 2, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "value", subtitle: "text" } },
});

// A title with a paragraph, used for cards and list items.
export const titledText = defineType({
  name: "titledText",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});
