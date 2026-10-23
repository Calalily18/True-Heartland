import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

// Singleton: one document with the fixed ID "homePage" (see sanity/structure.ts).
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Internal name; the hero heading is what visitors see.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "sections", type: "pageBuilder" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
