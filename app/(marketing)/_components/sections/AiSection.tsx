import { Blocks } from "../RichText";
import { SectionShell, Sources } from "./SectionShell";
import type { Section } from "./types";

const PILLAR_COLORS = ["#C79A3E", "#B4573A", "#6B7A3A"];

export function AiSection(props: Section<"aiSection">) {
  const { kicker, heading, intro, pillarsHeading, pillars, sources } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper">
      <div className="ai-head">
        <div className="section-head">
          {kicker && <div className="kicker">{kicker}</div>}
          <h2>{heading}</h2>
          <Blocks value={intro} className="rich" />
        </div>
      </div>
      {pillarsHeading && <h3 className="ai-reality">{pillarsHeading}</h3>}
      {pillars?.length ? (
        <div className="ai-pillars">
          {pillars.map((p, i) => (
            <div key={p._key} className="ai-pillar" style={{ "--pc": PILLAR_COLORS[i % 3] } as React.CSSProperties}>
              {p.label && <div className="ai-chart-k">{p.label}</div>}
              <h4>{p.title}</h4>
              {p.stats?.map((s) => (
                <div key={s._key} className="ai-stat">
                  <div className="ai-n">{s.value}</div>
                  <div className="ai-t">{s.text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <Sources text={sources} light />
    </SectionShell>
  );
}
