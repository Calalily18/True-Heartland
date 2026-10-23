import { LineIcon } from "./Icons";
import { SectionHead, SectionShell } from "./SectionShell";
import type { Section } from "./types";

type Sample = NonNullable<NonNullable<Section<"processSteps">["steps"]>[number]["sample"]>;

export function ProcessSteps(props: Section<"processSteps">) {
  const { kicker, heading, intro, steps } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper">
      <SectionHead kicker={kicker} heading={heading} intro={intro} />
      {steps?.length ? (
        <div className="timeline">
          {steps.map((step, i) => (
            <div key={step._key} className="timeline-step">
              <div className="timeline-marker">
                <LineIcon name={step.icon} />
              </div>
              <div className="timeline-content">
                <h3>
                  {i + 1}. {step.title}
                </h3>
                {step.text && <p>{step.text}</p>}
                {step.sample?.priorities?.length ? <BlueprintSample sample={step.sample} /> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </SectionShell>
  );
}

// A sample Growth & Readiness Blueprint: the priorities, then a four-quarter plan drawn from them.
function BlueprintSample({ sample }: { sample: Sample }) {
  const priorities = sample.priorities ?? [];
  const height = 32 + priorities.length * 28;
  const qx = (q: number) => 132 + q * 80;
  const summary = priorities
    .map((p) => `${p.shortLabel || p.text}: quarter ${p.start ?? 0} to ${p.end ?? 4}`)
    .join(". ");
  return (
    <figure className="viz-fig bp-fig">
      <div className="bp-card">
        <div className="bp-head">
          <span className="bp-title">{sample.title}</span>
          {sample.tag && <span className="bp-tag">{sample.tag}</span>}
        </div>
        {sample.preparedFor && <div className="bp-sub">Prepared for: {sample.preparedFor}</div>}
        <div className="bp-label">Top priorities</div>
        <ol className="bp-list">
          {priorities.map((p) => (
            <li key={p._key}>{p.text}</li>
          ))}
        </ol>
        <div className="bp-label">Sequencing over four quarters</div>
        <svg viewBox={`0 0 460 ${height}`} role="img" aria-label={`Sample four-quarter plan. ${summary}.`}>
          {[0, 1, 2, 3].map((q) => (
            <g key={q}>
              <text x={qx(q) + 40} y="14" textAnchor="middle" fontSize="11" fontWeight="600" style={{ fill: "var(--barn)" }}>
                Q{q + 1}
              </text>
              <line x1={qx(q)} y1="22" x2={qx(q)} y2={height - 4} stroke="var(--line)" />
            </g>
          ))}
          <line x1={qx(4)} y1="22" x2={qx(4)} y2={height - 4} stroke="var(--line)" />
          {priorities.map((p, i) => {
            const cy = 39 + i * 28;
            const start = Math.max(0, Math.min(4, p.start ?? 0));
            const end = Math.max(start, Math.min(4, p.end ?? 4));
            return (
              <g key={p._key}>
                <circle cx="10" cy={cy} r="8" fill="var(--barn)" />
                <text x="10" y={cy + 4} textAnchor="middle" fontSize="10" style={{ fill: "#F7F4E9" }}>
                  {i + 1}
                </text>
                <text x="26" y={cy + 4} fontSize="11" style={{ fill: "var(--ink)" }}>
                  {p.shortLabel || p.text}
                </text>
                <rect x={qx(start) + 3} y={cy - 7} width={Math.max(8, (end - start) * 80 - 6)} height="14" rx="7" fill="var(--wheat)" />
              </g>
            );
          })}
        </svg>
      </div>
      {sample.caption && <figcaption>{sample.caption}</figcaption>}
    </figure>
  );
}
