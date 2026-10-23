import { CtaLink } from "../CtaLink";
import { SectionShell } from "./SectionShell";
import type { Section } from "./types";
import { US_OUTLINE_PATH } from "./usOutline";

const STAR = "M0.0,-15.0 L3.7,-5.1 L14.3,-4.6 L6.0,1.9 L8.8,12.1 L0.0,6.3 L-8.8,12.1 L-6.0,1.9 L-14.3,-4.6 L-3.7,-5.1 Z";

// Stars mark the two offices. The labels come from the first two offices listed in the Studio.
const PINS = [
  { x: 536, y: 239, labelX: 552, labelY: 206 },
  { x: 812, y: 253, labelX: 848, labelY: 306 },
];

export function ContactSection(props: Section<"contactSection">) {
  const { heading, text, email, cta, officesLabel, offices, remoteNote } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper">
      <div className="contact-box">
        <div>
          <h2>{heading}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="contact-links">
          {email && <a href={`mailto:${email}`}>{email}</a>}
          <CtaLink cta={cta} className="" />
        </div>
        <div className="offices-row">
          <figure className="office-map">
            <svg
              viewBox="0 0 975 610"
              role="img"
              aria-label={`Map of the United States with gold stars marking offices${
                offices?.length ? ` in ${offices.join(" and ")}` : ""
              }, and a glowing gold outline around the whole country showing that True Heartland works remotely with clients across the country and internationally`}
            >
              <defs>
                <path id="usOutline" d={US_OUTLINE_PATH} />
                <filter id="mapGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id="starGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <use href="#usOutline" fill="none" stroke="#D9AD52" strokeWidth="9" strokeLinejoin="round" opacity="0.75" filter="url(#mapGlow)" />
              <use href="#usOutline" fill="#262D2A" stroke="#E7C978" strokeWidth="2" strokeLinejoin="round" />
              {PINS.map((pin, i) => (
                <g key={i}>
                  <g transform={`translate(${pin.x},${pin.y})`}>
                    <path d={STAR} transform="scale(1.4)" fill="#E7C978" filter="url(#starGlow)" />
                    <path d={STAR} transform="scale(1.4)" fill="#F0D488" stroke="#B4903D" strokeWidth="1" />
                  </g>
                  {offices?.[i] && (
                    <text x={pin.labelX} y={pin.labelY} textAnchor="end" fontSize="28" fontWeight="500" fill="#F7F4E9" style={{ fontFamily: "var(--sans)" }}>
                      {offices[i]}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </figure>
          <div className="office-list">
            {offices?.length ? (
              <div className="office">
                {officesLabel && <div className="office-label">{officesLabel}</div>}
                <div className="office-place">
                  {offices.map((o, i) => (
                    <div key={i}>{o}</div>
                  ))}
                </div>
              </div>
            ) : null}
            {remoteNote && (
              <div className="office">
                <div className="office-place">{remoteNote}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
