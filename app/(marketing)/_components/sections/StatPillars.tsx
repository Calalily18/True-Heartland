import { SectionHead, SectionShell, Sources } from "./SectionShell";
import type { Section } from "./types";

export function StatPillars(props: Section<"statPillars">) {
  const { kicker, heading, intro, pillars, sources } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="ink">
      <SectionHead kicker={kicker} heading={heading} intro={intro} />
      {pillars?.length ? (
        <div className="pillars">
          {pillars.map((pillar, i) => (
            <div key={pillar._key} className="pillar">
              <div className="pillar-head">
                <div className="pnum" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{pillar.title}</h3>
                {pillar.subtitle && <div className="psub">{pillar.subtitle}</div>}
              </div>
              {pillar.stats?.map((stat) => (
                <div key={stat._key} className="pstat">
                  <div className="pct">{stat.value}</div>
                  <div className="desc">{stat.text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <Sources text={sources} />
    </SectionShell>
  );
}
