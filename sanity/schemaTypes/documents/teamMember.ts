import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
  });

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string" }),
    imageWithAlt("photo", "Headshot"),
    defineField({ name: "bio", type: "blockContent" }),
    imageWithAlt("personalPhoto", "Personal photo"),
    defineField({ name: "personalText", title: "Personal note", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number", initialValue: 100, description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
