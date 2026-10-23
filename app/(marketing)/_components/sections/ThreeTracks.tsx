import { Blocks } from "../RichText";
import { SectionShell, wrapWords } from "./SectionShell";
import type { Section } from "./types";

// Track 1 sits top left, track 2 at the bottom, track 3 top right, as in the original design.
const TRACK_STYLE = [
  { area: "t-biz", color: "#D9AD52" },
  { area: "t-per", color: "#D9714F" },
  { area: "t-fin", color: "#8FB6D6" },
];

export function ThreeTracks(props: Section<"threeTracks">) {
  const { kicker, heading, intro, tracks = [], centerLabel, overlapHeading, overlapBody } = props;
  const [left, bottom, right] = [tracks?.[0], tracks?.[1], tracks?.[2]];
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="ink">
      <div className="problem-panel">
        <div className="venn-head">
          {kicker && <div className="kicker">{kicker}</div>}
          <h3>{heading}</h3>
          {intro && <p>{intro}</p>}
        </div>
        <div className="venn-map">
          <figure className="venn-fig">
            <svg
              viewBox="0 0 420 390"
              role="img"
              aria-label={`Venn diagram of three overlapping circles: ${[left?.title, right?.title, bottom?.title]
                .filter(Boolean)
                .join(", ")}. The area where all three overlap is labeled ${centerLabel || "the overlap"}.`}
            >
              <circle cx="150" cy="138" r="108" fill="var(--wheat)" fillOpacity="0.30" stroke="var(--wheat)" strokeWidth="1.5" />
              <circle cx="270" cy="138" r="108" fill="var(--steel)" fillOpacity="0.45" stroke="var(--steel)" strokeWidth="1.5" />
              <circle cx="210" cy="244" r="108" fill="var(--barn)" fillOpacity="0.45" stroke="var(--barn)" strokeWidth="1.5" />
              <circle cx="210" cy="176" r="40" fill="#6B7A3A" />
              <g textAnchor="middle" fill="var(--paper)" fontSize="18" style={{ fontFamily: "var(--serif)" }}>
                <TwoLines text={left?.title} x={100} y={112} />
                <TwoLines text={right?.title} x={320} y={112} />
                {bottom?.title && (
                  <text x="210" y="290">
                    {bottom.title}
                  </text>
                )}
              </g>
              {centerLabel && (
                <g textAnchor="middle" fill="#F7F4E9" fontWeight="500" fontSize="11.5" style={{ fontFamily: "var(--serif)" }}>
                  {wrapWords(centerLabel, 9)
                    .slice(0, 3)
                    .map((line, i, all) => (
                      <text key={i} x="210" y={179 - (all.length - 1) * 7 + i * 14}>
                        {line}
                      </text>
                    ))}
                </g>
              )}
            </svg>
          </figure>
          {tracks?.slice(0, 3).map((track, i) => (
            <div
              key={track._key}
              className={`track ${TRACK_STYLE[i].area}`}
              style={{ "--tc": TRACK_STYLE[i].color } as React.CSSProperties}
            >
              <div className="tn">Track {i + 1}</div>
              <h4>{track.title}</h4>
              {track.text && <p>{track.text}</p>}
            </div>
          ))}
        </div>
        {(overlapHeading || overlapBody) && (
          <div className="venn-overlap">
            {overlapHeading && <h3>{overlapHeading}</h3>}
            <Blocks value={overlapBody} />
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// "Business Readiness" becomes "Business" over "Readiness" inside a circle.
function TwoLines({ text, x, y }: { text?: string | null; x: number; y: number }) {
  if (!text) return null;
  const [first, ...rest] = text.split(" ");
  return (
    <>
      <text x={x} y={rest.length ? y : y + 11}>
        {first}
      </text>
      {rest.length > 0 && (
        <text x={x} y={y + 22}>
          {rest.join(" ")}
        </text>
      )}
    </>
  );
}
