import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICE_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { RichText } from "../../_components/RichText";
import { buildMetadata } from "../../_lib/metadata";

// Cache Components needs at least one param at build time; the placeholder renders a 404.
const PLACEHOLDER = "__none__";

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(SERVICE_SLUGS_QUERY);
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    tags: ["service", `service:${slug}`],
    stega: false,
  });
  return buildMetadata({ title: service?.title, seo: service?.seo });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();

  const service = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    tags: ["service", `service:${slug}`],
  });
  if (!service) notFound();

  return (
    <article className="section">
      <div className="container">
        <h1>{service.title}</h1>
        <p className="lead">{service.summary}</p>
        <RichText value={service.body} />
      </div>
    </article>
  );
}
