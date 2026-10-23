import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { RichText } from "../../_components/RichText";
import { formatDate } from "../../_lib/format";
import { buildMetadata } from "../../_lib/metadata";

// Cache Components needs at least one param at build time; the placeholder renders a 404.
const PLACEHOLDER = "__none__";

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(POST_SLUGS_QUERY);
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`],
    stega: false,
  });
  return buildMetadata({
    title: post?.title,
    seo: { title: post?.seo?.title, description: post?.seo?.description || post?.excerpt },
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();

  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`],
  });
  if (!post) notFound();

  return (
    <article className="section">
      <div className="container">
        <h1>{post.title}</h1>
        <p className="meta">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        {post.coverImage?.asset && (
          <Image
            className="cover-image"
            src={urlFor(post.coverImage).width(1200).height(630).url()}
            alt={post.coverImage.alt}
            width={1200}
            height={630}
            priority
          />
        )}
        <RichText value={post.body} />
      </div>
    </article>
  );
}
