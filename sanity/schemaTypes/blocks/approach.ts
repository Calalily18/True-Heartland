import { BulbFilledIcon } from "@sanity/icons/BulbFilled";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionLayoutFields } from "../objects/shared";

// "Why we're different": what clients get, then the Growth × Capacity map and its four zones.
export const approach = defineType({
  name: "approach",
  title: "Approach and Growth × Capacity map",
  type: "object",
  icon: BulbFilledIcon,
  groups: [
    { name: "content", title: "Approach", default: true },
    { name: "map", title: "Map" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "blockContent", group: "content" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({
      name: "differentiators",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "titledText" })],
    }),
    defineField({ name: "mapHeading", type: "string", group: "map" }),
    defineField({ name: "mapIntro", type: "text", rows: 4, group: "map" }),
    defineField({ name: "zoneLead", type: "string", group: "map" }),
    defineField({
      name: "zones",
      type: "array",
      group: "map",
      description: "Exactly four, in this order: high growth / low capacity, high growth / high capacity, low growth / low capacity, low growth / high capacity.",
      validation: (rule) => rule.length(4),
      of: [
        defineArrayMember({
          name: "zone",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "subtitle", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } },
        }),
      ],
    }),
    defineField({ name: "mapCaption", type: "string", group: "map" }),
    defineField({ name: "mapClosing", type: "text", rows: 2, group: "map" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper" },
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Untitled", subtitle: "Approach", media }),
  },
});
