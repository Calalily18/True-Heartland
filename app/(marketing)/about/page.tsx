import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { RichText } from "../_components/RichText";
import { buildMetadata } from "../_lib/metadata";

const ABOUT_TAGS = ["aboutPage"];

export async function generateMetadata(): Promise<Metadata> {
  const about = await sanityFetch({ query: ABOUT_PAGE_QUERY, tags: ABOUT_TAGS, stega: false });
  return buildMetadata({ title: about?.title, seo: about?.seo });
}

export default async function AboutPage() {
  const about = await sanityFetch({ query: ABOUT_PAGE_QUERY, tags: ABOUT_TAGS });
  if (!about) notFound();

  return (
    <article className="section">
      <div className="container">
        <h1>{about.title}</h1>
        {about.intro && <p className="lead">{about.intro}</p>}
        <RichText value={about.body} />
      </div>
    </article>
  );
}
