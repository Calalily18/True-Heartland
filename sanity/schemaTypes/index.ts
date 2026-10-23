import { ctaSection } from "./blocks/ctaSection";
import { hero } from "./blocks/hero";
import { servicesSection } from "./blocks/servicesSection";
import { textSection } from "./blocks/textSection";
import { aboutPage } from "./documents/aboutPage";
import { homePage } from "./documents/homePage";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { pageBuilder } from "./objects/pageBuilder";
import { seo } from "./objects/seo";

// No client names or financial figures belong in this schema; client data lives in Supabase.
export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  service,
  post,
  pageBuilder,
  hero,
  textSection,
  servicesSection,
  ctaSection,
  blockContent,
  callToAction,
  seo,
];

export const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage"]);
