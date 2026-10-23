import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "../_lib/metadata";
import { formatDate } from "../_lib/format";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title: "Blog" });
}

export default async function BlogPage() {
  const posts = await sanityFetch({ query: POSTS_QUERY, tags: ["post"] });

  return (
    <section className="section">
      <div className="container">
        <h1>Blog</h1>
        {posts.length ? (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post._id}>
                <h2 className="card-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="meta">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </p>
                {post.excerpt && <p>{post.excerpt}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="lead">No posts yet.</p>
        )}
      </div>
    </section>
  );
}
