import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    title,
    description,
    navigation[]{ _key, label, href },
    contactEmail,
    footerText
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    _id,
    title,
    seo,
    sections[]{
      _key,
      _type,
      _type == "hero" => { heading, subheading, primaryCta, secondaryCta },
      _type == "textSection" => { eyebrow, heading, body },
      _type == "servicesSection" => {
        heading,
        intro,
        "services": select(
          count(services) > 0 => services[]->{ _id, title, "slug": slug.current, summary },
          *[_type == "service" && defined(slug.current)] | order(order asc, title asc){
            _id, title, "slug": slug.current, summary
          }
        )
      },
      _type == "ctaSection" => { heading, body, cta }
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0]{ _id, title, intro, body, seo }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc, title asc){
    _id, title, "slug": slug.current, summary
  }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, summary, body, seo
  }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){
    _id, title, "slug": slug.current, publishedAt, excerpt
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, publishedAt, excerpt, coverImage, body, seo
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
