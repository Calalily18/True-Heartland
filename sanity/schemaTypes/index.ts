import { aiSection } from "./blocks/aiSection";
import { approach } from "./blocks/approach";
import { assessmentPromo } from "./blocks/assessmentPromo";
import { contactSection } from "./blocks/contactSection";
import { ctaSection } from "./blocks/ctaSection";
import { fitSection } from "./blocks/fitSection";
import { hero } from "./blocks/hero";
import { processSteps } from "./blocks/processSteps";
import { readinessGap } from "./blocks/readinessGap";
import { rhythmSection } from "./blocks/rhythmSection";
import { segmentsSection } from "./blocks/segmentsSection";
import { servicesSection } from "./blocks/servicesSection";
import { situations } from "./blocks/situations";
import { statPillars } from "./blocks/statPillars";
import { teamSection } from "./blocks/teamSection";
import { textSection } from "./blocks/textSection";
import { threeTracks } from "./blocks/threeTracks";
import { aboutPage } from "./documents/aboutPage";
import { homePage } from "./documents/homePage";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { teamMember } from "./documents/teamMember";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { pageBuilder } from "./objects/pageBuilder";
import { seo } from "./objects/seo";
import { stat, titledText } from "./objects/shared";

// No client names or financial figures belong in this schema; client data lives in Supabase.
export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  service,
  teamMember,
  post,
  pageBuilder,
  hero,
  statPillars,
  threeTracks,
  readinessGap,
  situations,
  assessmentPromo,
  processSteps,
  approach,
  fitSection,
  segmentsSection,
  rhythmSection,
  aiSection,
  teamSection,
  contactSection,
  textSection,
  servicesSection,
  ctaSection,
  blockContent,
  callToAction,
  seo,
  stat,
  titledText,
];

export const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage"]);
