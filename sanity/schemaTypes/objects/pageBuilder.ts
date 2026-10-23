import { defineArrayMember, defineType } from "sanity";

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Sections",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "textSection" }),
    defineArrayMember({ type: "servicesSection" }),
    defineArrayMember({ type: "ctaSection" }),
  ],
});
