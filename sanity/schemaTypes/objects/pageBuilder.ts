import { defineArrayMember, defineType } from "sanity";

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Sections",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "statPillars" }),
    defineArrayMember({ type: "threeTracks" }),
    defineArrayMember({ type: "readinessGap" }),
    defineArrayMember({ type: "situations" }),
    defineArrayMember({ type: "assessmentPromo" }),
    defineArrayMember({ type: "processSteps" }),
    defineArrayMember({ type: "approach" }),
    defineArrayMember({ type: "fitSection" }),
    defineArrayMember({ type: "segmentsSection" }),
    defineArrayMember({ type: "rhythmSection" }),
    defineArrayMember({ type: "aiSection" }),
    defineArrayMember({ type: "teamSection" }),
    defineArrayMember({ type: "contactSection" }),
    defineArrayMember({ type: "textSection" }),
    defineArrayMember({ type: "servicesSection" }),
    defineArrayMember({ type: "ctaSection" }),
  ],
});
