import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

// Singleton: one document with the fixed ID "aboutPage" (see sanity/structure.ts).
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
