import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { readToken } from "@/sanity/lib/token";

// Called by the Studio's Presentation tool. next-sanity checks a one-time secret
// that the Studio writes to the dataset, so only signed-in editors can turn drafts on.
const { GET: enableDraftMode } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});

export async function GET(request: Request) {
  if (!readToken) {
    return new Response("Draft Mode is not configured", { status: 500 });
  }
  return enableDraftMode(request);
}
