import { ShareIcon } from "@sanity/icons/Share";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

// The three overlapping readiness tracks, drawn as a Venn diagram from the track titles.
export const threeTracks = defineType({
  name: "threeTracks",
  title: "Three tracks (Venn)",
  type: "object",
  icon: ShareIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "tracks",
      type: "array",
      group: "content",
      description: "Exactly three, in track order. Track 1 sits top left, track 2 at the bottom, track 3 top right.",
      validation: (rule) => rule.length(3),
      of: [
        defineArrayMember({
          name: "track",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "centerLabel",
      type: "string",
      description: "The words in the middle where all three circles overlap.",
      group: "content",
    }),
    defineField({ name: "overlapHeading", type: "string", group: "content" }),
    defineField({ name: "overlapBody", type: "blockContent", group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "ink" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Three tracks" }),
  },
});
