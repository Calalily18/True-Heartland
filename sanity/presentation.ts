import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Where each document appears on the site, for the Presentation tool's "Used on" links.
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    aboutPage: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "About", href: "/about" }] }),
    }),
    service: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: `/services/${doc?.slug}` },
          { title: "Services", href: "/services" },
        ],
      }),
    }),
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: `/blog/${doc?.slug}` },
          { title: "Blog", href: "/blog" },
        ],
      }),
    }),
  },
};
