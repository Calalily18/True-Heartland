import Link from "next/link";
import { CtaLink } from "./CtaLink";
import { RichText } from "./RichText";
import { AiSection } from "./sections/AiSection";
import { Approach } from "./sections/Approach";
import { AssessmentPromo } from "./sections/AssessmentPromo";
import { ContactSection } from "./sections/ContactSection";
import { FitSection } from "./sections/FitSection";
import { Hero } from "./sections/Hero";
import { ProcessSteps } from "./sections/ProcessSteps";
import { ReadinessGap } from "./sections/ReadinessGap";
import { RhythmSection } from "./sections/RhythmSection";
import { SegmentsSection } from "./sections/SegmentsSection";
import { Situations } from "./sections/Situations";
import { StatPillars } from "./sections/StatPillars";
import { TeamSection } from "./sections/TeamSection";
import { ThreeTracks } from "./sections/ThreeTracks";
import type { Section, Sections } from "./sections/types";

// The first hero on a page gets the h1; every other section heading is an h2.
export function PageBuilder({ sections }: { sections: Sections }) {
  const firstHeroKey = sections.find((s) => s._type === "hero")?._key;
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} {...section} isPageTitle={section._key === firstHeroKey} />;
          case "statPillars":
            return <StatPillars key={section._key} {...section} />;
          case "threeTracks":
            return <ThreeTracks key={section._key} {...section} />;
          case "readinessGap":
            return <ReadinessGap key={section._key} {...section} />;
          case "situations":
            return <Situations key={section._key} {...section} />;
          case "assessmentPromo":
            return <AssessmentPromo key={section._key} {...section} />;
          case "processSteps":
            return <ProcessSteps key={section._key} {...section} />;
          case "approach":
            return <Approach key={section._key} {...section} />;
          case "fitSection":
            return <FitSection key={section._key} {...section} />;
          case "segmentsSection":
            return <SegmentsSection key={section._key} {...section} />;
          case "rhythmSection":
            return <RhythmSection key={section._key} {...section} />;
          case "aiSection":
            return <AiSection key={section._key} {...section} />;
          case "teamSection":
            return <TeamSection key={section._key} {...section} />;
          case "contactSection":
            return <ContactSection key={section._key} {...section} />;
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
