import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

export const teamSection = defineType({
  name: "teamSection",
  title: "Team",
  type: "object",
  icon: UsersIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({
      name: "members",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] })],
      validation: (rule) => rule.unique(),
    }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper2" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Team" }),
  },
});
