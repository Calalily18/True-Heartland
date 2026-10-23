import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../env";

// Published content from the CDN. Draft reads switch on a token and stega in sanityFetch.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { enabled: false, studioUrl },
});
