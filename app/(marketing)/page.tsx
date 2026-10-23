import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "./_components/PageBuilder";
import { buildMetadata } from "./_lib/metadata";

const HOME_TAGS = ["homePage", "service"];

export async function generateMetadata(): Promise<Metadata> {
  const home = await sanityFetch({ query: HOME_PAGE_QUERY, tags: HOME_TAGS, stega: false });
  return buildMetadata({ seo: home?.seo });
}

export default async function HomePage() {
  const home = await sanityFetch({ query: HOME_PAGE_QUERY, tags: HOME_TAGS });

  if (!home?.sections?.length) {
    // Shown until the home page is published in Sanity.
    return (
      <section className="section hero">
        <div className="container">
          <h1 className="hero-heading">True Heartland Consulting</h1>
          <p className="lead">The full site is on its way.</p>
        </div>
      </section>
    );
  }

  return <PageBuilder sections={home.sections} />;
}
