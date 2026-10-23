import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

type SeoFields = { title?: string | null; description?: string | null };

// Builds page metadata from a document's SEO fields, falling back to site settings.
// Fetches with stega off so no invisible editing characters reach <head>.
export async function buildMetadata({
  title,
  seo,
}: {
  title?: string | null;
  seo?: SeoFields | null;
}): Promise<Metadata> {
  const settings = await sanityFetch({ query: SETTINGS_QUERY, tags: ["siteSettings"], stega: false });
  const siteName = settings?.title || "True Heartland Consulting";
  const pageTitle = seo?.title || title;
  return {
    title: pageTitle ? `${pageTitle} | ${siteName}` : siteName,
    description: seo?.description || settings?.description || undefined,
  };
}
