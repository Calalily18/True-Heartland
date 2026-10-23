import { TextIcon } from "@sanity/icons/Text";
import { defineField, defineType } from "sanity";

export const textSection = defineType({
  name: "textSection",
  title: "Text section",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({ name: "eyebrow", type: "string", description: "Short label above the heading." }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Text section" }),
  },
});
