import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton: one document with the fixed ID "siteSettings" (see sanity/structure.ts).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Default search description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Keep it under 160 characters"),
    }),
    defineField({
      name: "navigation",
      type: "array",
      of: [defineArrayMember({ type: "callToAction", title: "Menu link" })],
    }),
    defineField({
      name: "headerCta",
      title: "Header button",
      type: "callToAction",
      description: 'The highlighted button at the end of the menu, for example "Book a call".',
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({ name: "footerText", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
