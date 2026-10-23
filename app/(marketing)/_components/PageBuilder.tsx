import Link from "next/link";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";
import { CtaLink } from "./CtaLink";
import { RichText } from "./RichText";

type Sections = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>["sections"]>;
type Section<T extends Sections[number]["_type"]> = Extract<Sections[number], { _type: T }>;

// The first hero on a page gets the h1; every other section heading is an h2.
export function PageBuilder({ sections }: { sections: Sections }) {
  const firstHeroKey = sections.find((s) => s._type === "hero")?._key;
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} {...section} isPageTitle={section._key === firstHeroKey} />;
          case "textSection":
            return <TextSection key={section._key} {...section} />;
          case "servicesSection":
            return <ServicesSection key={section._key} {...section} />;
          case "ctaSection":
            return <CtaSection key={section._key} {...section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function Hero({ heading, subheading, primaryCta, secondaryCta, isPageTitle }: Section<"hero"> & { isPageTitle: boolean }) {
  const Heading = isPageTitle ? "h1" : "h2";
  return (
    <section className="section hero">
      <div className="container">
        <Heading className="hero-heading">{heading}</Heading>
        {subheading && <p className="lead">{subheading}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="actions">
            <CtaLink cta={primaryCta} />
            <CtaLink cta={secondaryCta} variant="secondary" />
          </div>
        )}
      </div>
    </section>
  );
}

function TextSection({ eyebrow, heading, body }: Section<"textSection">) {
  return (
    <section className="section">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {heading && <h2>{heading}</h2>}
        <RichText value={body} />
      </div>
    </section>
  );
}

function ServicesSection({ heading, intro, services }: Section<"servicesSection">) {
  return (
    <section className="section section-alt">
      <div className="container">
        {heading && <h2>{heading}</h2>}
        {intro && <p className="lead">{intro}</p>}
        {services?.length ? (
          <ul className="card-grid">
            {services.map((service) => (
              <li key={service._id} className="card">
                <h3>
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function CtaSection({ heading, body, cta }: Section<"ctaSection">) {
  return (
    <section className="section cta-section">
      <div className="container">
        <h2>{heading}</h2>
        {body && <p className="lead">{body}</p>}
        <div className="actions">
          <CtaLink cta={cta} />
        </div>
      </div>
    </section>
  );
}
