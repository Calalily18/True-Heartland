import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Blocks } from "../RichText";
import { SectionShell } from "./SectionShell";
import type { Section } from "./types";

// Zones in grid order: top left, top right, bottom left, bottom right.
const ZONES = [
  { area: "z-tl", color: "#B4573A" },
  { area: "z-tr", color: "#6B7A3A" },
  { area: "z-bl", color: "#8A8574" },
  { area: "z-br", color: "#33475A" },
];

export function Approach(props: Section<"approach">) {
  const { kicker, heading, intro, image, differentiators, zones } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper">
      <div className="head-with-photo">
        <div className="section-head">
          {kicker && <div className="kicker">{kicker}</div>}
          <h2>{heading}</h2>
          <Blocks value={intro} className="rich" />
        </div>
        {image?.asset && (
          <div className="head-photo">
            <Image
              src={urlFor(image).width(960).height(720).fit("crop").url()}
              alt={image.alt}
              width={960}
              height={720}
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
        )}
      </div>

      {differentiators?.length ? (
        <div className="approach-list diff-grid">
          {differentiators.map((item) => (
            <div key={item._key} className="diff-item">
              <h3>{item.title}</h3>
              {item.text && <p>{item.text}</p>}
            </div>
          ))}
        </div>
      ) : null}

      {props.mapHeading && (
        <div className="quad-wrap">
          <div className="quad-head">
            <h3>{props.mapHeading}</h3>
            {props.mapIntro && <p>{props.mapIntro}</p>}
            {props.zoneLead && <p className="zone-lead">{props.zoneLead}</p>}
          </div>
          <div className="quad-map">
            {zones?.slice(0, 4).map((zone, i) => (
              <div
                key={zone._key}
                className={`zone ${ZONES[i].area}`}
                style={{ "--zc": ZONES[i].color } as React.CSSProperties}
              >
                <h4>{zone.title}</h4>
                {zone.subtitle && <div className="zsub">{zone.subtitle}</div>}
                {zone.text && <p>{zone.text}</p>}
              </div>
            ))}
            <figure className="viz-fig quad-fig">
              <QuadrantArt />
              {props.mapCaption && <figcaption>{props.mapCaption}</figcaption>}
            </figure>
          </div>
          {props.mapClosing && <p className="zone-close">{props.mapClosing}</p>}
        </div>
      )}
    </SectionShell>
  );
}

// A sample Growth × Capacity map: a business moving from the Danger zone toward Leverage.
function QuadrantArt() {
  return (
    <svg
      viewBox="0 0 320 270"
      role="img"
      aria-label="Sample Growth by Capacity map with four zones: Burnout, Leverage, Danger, and Stagnant. A sample business starts in the Danger zone, with low growth and low capacity. An arrow points up and to the right into the Leverage zone, the target, as growth and capacity both improve."
    >
      <rect x="50" y="20" width="220" height="220" fill="none" stroke="var(--line)" />
      <line x1="160" y1="20" x2="160" y2="240" stroke="var(--line)" strokeDasharray="3,3" />
      <line x1="50" y1="130" x2="270" y2="130" stroke="var(--line)" strokeDasharray="3,3" />
      <rect x="50" y="20" width="110" height="110" fill="#B4573A" opacity="0.30" />
      <rect x="160" y="20" width="110" height="110" fill="#6B7A3A" opacity="0.32" />
      <rect x="50" y="130" width="110" height="110" fill="#8A8574" opacity="0.30" />
      <rect x="160" y="130" width="110" height="110" fill="#33475A" opacity="0.30" />
      <text x="58" y="36" fontSize="10" fontWeight="600" style={{ fill: "var(--ink)" }}>
        BURNOUT
      </text>
      <text x="262" y="36" textAnchor="end" fontSize="10" fontWeight="600" style={{ fill: "var(--ink)" }}>
        LEVERAGE
      </text>
      <text x="262" y="49" textAnchor="end" fontSize="9" style={{ fill: "var(--ink-soft)" }}>
        The target
      </text>
      <text x="58" y="232" fontSize="10" style={{ fill: "var(--ink-soft)" }}>
        DANGER
      </text>
      <text x="262" y="232" textAnchor="end" fontSize="10" style={{ fill: "var(--ink-soft)" }}>
        STAGNANT
      </text>
      <text x="160" y="262" textAnchor="middle" fontSize="11" style={{ fill: "var(--ink-soft)" }}>
        Capacity →
      </text>
      <text x="16" y="130" textAnchor="middle" fontSize="11" style={{ fill: "var(--ink-soft)" }} transform="rotate(-90 16 130)">
        Growth →
      </text>
      <circle cx="108" cy="188" r="7" fill="var(--barn)" />
      <circle cx="108" cy="188" r="12" fill="none" stroke="var(--barn)" strokeWidth="1.5" opacity="0.5" />
      <line x1="119.6" y1="177.0" x2="214.6" y2="86.5" stroke="#6B7A3A" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="220.1,92.3 221.9,79.7 209.1,80.7" fill="#6B7A3A" />
      <circle cx="232" cy="70" r="7" fill="none" stroke="#6B7A3A" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}
