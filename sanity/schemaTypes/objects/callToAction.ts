import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "A page on this site such as /about, or a full https:// address.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          return /^(\/|https:\/\/|mailto:)/.test(value) || "Start with /, https:// or mailto:";
        }),
    }),
  ],
});
