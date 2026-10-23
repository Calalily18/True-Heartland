import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      description: "Shown in browser tabs and search results. Falls back to the page title.",
      validation: (rule) => rule.max(60).warning("Keep it under 60 characters"),
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Keep it under 160 characters"),
    }),
  ],
});
