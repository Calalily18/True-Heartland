import { Blocks } from "../RichText";
import { SectionShell } from "./SectionShell";
import type { Section } from "./types";

const PILLAR_COLORS = ["#C79A3E", "#6B7A3A", "#33475A"];

export function RhythmSection(props: Section<"rhythmSection">) {
  const { kicker, heading, intro, pillarsHeading, pillars, sprintHeading, sprintText } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper2">
      <div className="section-head">
        {kicker && <div className="kicker">{kicker}</div>}
        <h2>{heading}</h2>
        <Blocks value={intro} className="rich" />
      </div>
      {pillarsHeading && <h3 className="pc-head">{pillarsHeading}</h3>}
      {pillars?.length ? (
        <div className="pillar-cards">
          {pillars.map((p, i) => (
            <div key={p._key} className="pillar-card" style={{ "--pc": PILLAR_COLORS[i % 3] } as React.CSSProperties}>
              {p.tag && <div className="pc-tag">{p.tag}</div>}
              <h3>{p.title}</h3>
              {p.text && <p>{p.text}</p>}
            </div>
          ))}
        </div>
      ) : null}
      {(sprintHeading || sprintText) && (
        <>
          <div className="sprint">
            {sprintHeading && <h3>{sprintHeading}</h3>}
            {sprintText && <p>{sprintText}</p>}
          </div>
          <figure className="viz-fig viz-card viz-wide">
            <SprintChart />
          </figure>
        </>
      )}
    </SectionShell>
  );
}

// Illustrative 12 weeks: a working session every week, team meetings as needed, metrics always live.
function SprintChart() {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const wx = (w: number) => 205 + (w - 1) * 46;
  const teamWeeks = [2, 4, 5, 8, 10, 11];
  return (
    <svg
      viewBox="0 0 760 180"
      role="img"
      aria-label="Illustration of a twelve week engagement. A working session with the owner happens every week, meetings directly with team members happen as needed, and a metrics view stays live throughout."
    >
      {weeks.map((w) => (
        <g key={w}>
          <line x1={wx(w)} y1="18" x2={wx(w)} y2="138" stroke="var(--line)" strokeWidth="1" />
          <text x={wx(w)} y="162" textAnchor="middle" fontSize="12" style={{ fill: "var(--ink-soft)" }}>
            {w}
          </text>
        </g>
      ))}
      <text x="0" y="47" fontSize="14" style={{ fill: "var(--ink)" }}>
        Working sessions
      </text>
      <text x="0" y="87" fontSize="14" style={{ fill: "var(--ink)" }}>
        Team meetings, as needed
      </text>
      <text x="0" y="127" fontSize="14" style={{ fill: "var(--ink)" }}>
        Metrics you can see
      </text>
      {weeks.map((w) => (
        <circle key={w} cx={wx(w)} cy="42" r="9" fill="var(--barn)" />
      ))}
      {teamWeeks.map((w) => (
        <circle key={w} cx={wx(w)} cy="82" r="7" fill="var(--steel)" />
      ))}
      <rect x={wx(2)} y="118" width={wx(12) - wx(2)} height="12" rx="6" fill="var(--wheat)" opacity="0.85" />
      <text x="0" y="162" fontSize="12" style={{ fill: "var(--ink-soft)" }}>
        Week
      </text>
    </svg>
  );
}
