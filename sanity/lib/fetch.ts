import type { QueryParams } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { draftMode } from "next/headers";
import { client } from "./client";
import { readToken } from "./token";

/**
 * Fetch from Sanity with Next.js caching.
 *
 * Published reads are cached until the Sanity webhook calls /api/revalidate with a matching tag.
 * Tags are document types (for example "post"), plus "type:slug" for single documents.
 * In Draft Mode, Next.js re-runs this on every request and saves nothing, so drafts are never cached.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
  stega = true,
}: {
  query: QueryString;
  params?: QueryParams;
  tags: string[];
  /** Set to false for anything that ends up in <head>, such as metadata. */
  stega?: boolean;
}) {
  "use cache";

  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode && readToken) {
    return client
      .withConfig({ token: readToken, perspective: "drafts", useCdn: false, stega: { enabled: stega } })
      .fetch(query, params);
  }

  cacheTag(...tags);
  cacheLife("max");
  return client.fetch(query, params);
}
