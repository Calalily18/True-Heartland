import { Blocks } from "../RichText";
import { SectionShell } from "./SectionShell";
import type { Section } from "./types";

export function FitSection(props: Section<"fitSection">) {
  const { kicker, heading, intro, profileHeading, profileBody, phases, agnosticHeading, agnosticBody } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper2">
      <div className="section-head">
        {kicker && <div className="kicker">{kicker}</div>}
        <h2>{heading}</h2>
        <Blocks value={intro} className="rich" />
      </div>
      {(profileHeading || profileBody) && (
        <div className="fit-profile">
          {profileHeading && <h3>{profileHeading}</h3>}
          <Blocks value={profileBody} />
        </div>
      )}
      <figure className="viz-fig viz-wide" style={{ marginTop: 32 }}>
        <RevenueScale />
      </figure>
      {phases?.length ? (
        <div className="phase-grid">
          {phases.map((phase) => (
            <div key={phase._key} className={phase.highlight ? "phase phase-hot" : "phase"}>
              <div className="phase-k">{phase.label}</div>
              {phase.value && <div className="phase-v">{phase.value}</div>}
              {phase.text && <p>{phase.text}</p>}
            </div>
          ))}
        </div>
      ) : null}
      {(agnosticHeading || agnosticBody) && (
        <div className="fit-agnostic">
          {agnosticHeading && <h3>{agnosticHeading}</h3>}
          <Blocks value={agnosticBody} />
        </div>
      )}
    </SectionShell>
  );
}

// Revenue scale with the $1M to $50M sweet spot highlighted.
function RevenueScale() {
  const ticks: [string, number][] = [
    ["$1M", 200],
    ["$5M", 340],
    ["$10M", 480],
    ["$25M", 640],
    ["$50M", 780],
  ];
  return (
    <svg
      viewBox="0 0 900 140"
      role="img"
      aria-label="A revenue scale from under 1 million to over 50 million dollars. The range from 1 to 50 million is highlighted as the sweet spot, past the early scramble but without a full leadership team yet."
    >
      <line x1="30" y1="78" x2="200" y2="78" stroke="var(--line)" strokeWidth="8" strokeLinecap="round" />
      <line x1="780" y1="78" x2="870" y2="78" stroke="var(--line)" strokeWidth="8" strokeLinecap="round" />
      <rect x="200" y="70" width="580" height="16" rx="8" fill="var(--wheat)" />
      {ticks.map(([label, x]) => (
        <g key={label}>
          <line x1={x} y1="64" x2={x} y2="92" stroke="var(--ink-soft)" strokeWidth="1" />
          <text x={x} y="112" textAnchor="middle" fontSize="14" style={{ fill: "var(--ink)" }}>
            {label}
          </text>
        </g>
      ))}
      <text x="115" y="58" textAnchor="middle" fontSize="13" style={{ fill: "var(--ink-soft)" }}>
        Start-up
      </text>
      <text x="825" y="42" textAnchor="middle" fontSize="13" style={{ fill: "var(--ink-soft)" }}>
        Developed
      </text>
      <text x="825" y="58" textAnchor="middle" fontSize="13" style={{ fill: "var(--ink-soft)" }}>
        leadership team
      </text>
    </svg>
  );
}
