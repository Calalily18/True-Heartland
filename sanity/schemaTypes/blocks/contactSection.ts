import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, sectionGroups, sectionLayoutFields } from "../objects/shared";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact",
  type: "object",
  icon: EnvelopeIcon,
  groups: sectionGroups,
  fields: [
    headingField,
    defineField({ name: "text", type: "text", rows: 2, group: "content" }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.email(),
      group: "content",
    }),
    defineField({ name: "cta", title: "Booking link", type: "callToAction", group: "content" }),
    defineField({ name: "officesLabel", type: "string", initialValue: "Offices", group: "content" }),
    defineField({
      name: "offices",
      type: "array",
      description: "The map shows stars for West Des Moines, IA and Hagerstown, MD.",
      of: [defineArrayMember({ type: "string" })],
      group: "content",
    }),
    defineField({ name: "remoteNote", type: "string", group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Contact" }),
  },
});
