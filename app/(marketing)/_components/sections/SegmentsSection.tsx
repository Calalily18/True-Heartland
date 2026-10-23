import { SectionHead, SectionShell } from "./SectionShell";
import { SegmentsMap } from "./SegmentsMap";
import type { Section } from "./types";

export function SegmentsSection(props: Section<"segmentsSection">) {
  const { kicker, heading, intro, centerLabel, services } = props;
  const segments = (services ?? []).map((s) => ({
    _id: s._id,
    title: s.title,
    shortTitle: s.shortTitle,
    slug: s.slug,
    friction: s.friction,
    fix: s.fix,
  }));
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper">
      <SectionHead kicker={kicker} heading={heading} intro={intro} />
      <SegmentsMap segments={segments} centerLabel={centerLabel || "Readiness"} />
    </SectionShell>
  );
}
