import { CtaLink } from "../CtaLink";
import { Blocks } from "../RichText";
import { LineIcon } from "./Icons";
import { SectionHead, SectionShell } from "./SectionShell";
import type { Section } from "./types";

export function AssessmentPromo(props: Section<"assessmentPromo">) {
  const { kicker, heading, intro, resultsHeading, results, calloutHeading, calloutBody, cta } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="ink">
      <div className="head-with-photo">
        <SectionHead kicker={kicker} heading={heading} intro={intro} />
        <div className="head-photo radar-fig">
          <SampleRadar />
        </div>
      </div>
      {resultsHeading && <h3 className="results-heading">{resultsHeading}</h3>}
      {results?.length ? (
        <div className="approach-list">
          {results.map((item) => (
            <div key={item._key} className="approach-item">
              <div className="approach-icon">
                <LineIcon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              {item.text && <p>{item.text}</p>}
            </div>
          ))}
        </div>
      ) : null}
      {(calloutHeading || calloutBody) && (
        <div className="zero-risk">
          {calloutHeading && <h3>{calloutHeading}</h3>}
          <Blocks value={calloutBody} />
        </div>
      )}
      <CtaLink cta={cta} className="btn-primary" />
    </SectionShell>
  );
}

// A sample result: the assessment's seven categories on one shape.
function SampleRadar() {
  const labelFill = "color-mix(in srgb, var(--paper) 72%, transparent)";
  const points = [
    [160.0, 102.75],
    [209.27, 110.73],
    [231.66, 166.35],
    [175.95, 183.11],
    [125.83, 220.95],
    [103.7, 162.85],
    [127.16, 123.82],
  ];
  const spokes = [
    [160.0, 45.0],
    [242.11, 84.56],
    [262.38, 173.36],
    [205.56, 244.61],
    [114.44, 244.61],
    [57.62, 173.36],
    [77.89, 84.56],
  ];
  const labels: [string, number, number, "middle" | "start" | "end"][] = [
    ["Leadership", 160, 22, "middle"],
    ["Financial", 260, 76, "start"],
    ["Sales", 284, 181, "start"],
    ["Operations", 216, 266, "start"],
    ["People", 104, 266, "end"],
    ["Legal", 36, 181, "end"],
    ["Growth", 60, 76, "end"],
  ];
  return (
    <figure>
      <svg
        viewBox="0 0 320 300"
        role="img"
        aria-label="Sample radar chart showing the seven Readiness Assessment categories plotted on one shape, strong in some areas such as People and Sales, and exposed in others such as Operations and Growth"
      >
        <polygon points="160,45.00 242.11,84.56 262.38,173.36 205.56,244.61 114.44,244.61 57.62,173.36 77.89,84.56" fill="none" stroke="var(--line)" strokeWidth="1" />
        <polygon points="160,97.50 201.06,117.28 211.19,161.68 182.78,197.30 137.22,197.30 108.81,161.68 118.94,117.28" fill="none" stroke="var(--line)" strokeWidth="1" />
        {spokes.map(([x2, y2], i) => (
          <line key={i} x1="160" y1="150" x2={x2} y2={y2} stroke="var(--line)" strokeWidth="1" />
        ))}
        <polygon points={points.map((p) => p.join(",")).join(" ")} fill="var(--wheat)" fillOpacity="0.24" stroke="var(--wheat)" strokeWidth="2" />
        {points.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--wheat)" />
        ))}
        {labels.map(([label, x, y, anchor]) => (
          <text key={label} x={x} y={y} textAnchor={anchor} fontSize="10.5" fill={labelFill}>
            {label}
          </text>
        ))}
      </svg>
      <figcaption>A sample result. Your seven categories land on one shape, strong in some, exposed in others.</figcaption>
    </figure>
  );
}
