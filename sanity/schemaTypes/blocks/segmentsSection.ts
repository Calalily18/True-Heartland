import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";
import { headingField, kickerField, sectionGroups, sectionLayoutFields } from "../objects/shared";

// "Seven core segments": the wheel and cards are built from the Services documents, in their
// display order, so each segment's friction and fix is edited once on its Service.
export const segmentsSection = defineType({
  name: "segmentsSection",
  title: "Service segments wheel",
  type: "object",
  icon: CaseIcon,
  groups: sectionGroups,
  fields: [
    kickerField,
    headingField,
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      description: "The segments themselves come from Services, in their display order.",
      group: "content",
    }),
    defineField({ name: "centerLabel", type: "string", initialValue: "Readiness", group: "content" }),
    ...sectionLayoutFields,
  ],
  initialValue: { background: "paper" },
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Untitled", subtitle: "Service segments wheel" }),
  },
});
