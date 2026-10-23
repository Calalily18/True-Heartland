import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Sanity webhook target. Configure the webhook with:
//   Filter:     _type in ["siteSettings", "homePage", "aboutPage", "service", "post"]
//   Projection: { _type, "slug": slug.current }
//   Secret:     the same value as SANITY_REVALIDATE_SECRET
// Do not weaken the signature check: anything other than a verified signature is rejected.

type WebhookPayload = { _type?: string; slug?: string | null };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Revalidation is not configured", { status: 500 });
  }

  try {
    // The third argument waits for Sanity's CDN to catch up before pages re-fetch.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true);
    if (isValidSignature !== true) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing _type", { status: 400 });
    }

    const tags = [body._type];
    if (body.slug) tags.push(`${body._type}:${body.slug}`);
    for (const tag of tags) revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: tags });
  } catch (error) {
    console.error("Revalidation failed", error);
    return new Response("Revalidation failed", { status: 500 });
  }
}
