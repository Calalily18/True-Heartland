import { CtaLink } from "../CtaLink";
import { SectionShell, Sources } from "./SectionShell";
import type { Section } from "./types";

export function Hero(props: Section<"hero"> & { isPageTitle: boolean }) {
  const { heading, subheading, primaryCta, secondaryCta, stats, sources, isPageTitle } = props;
  const Heading = isPageTitle ? "h1" : "h2";
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper" className="hero">
      <div className="hero-grid">
        <div>
          <Heading>{heading}</Heading>
          {subheading && <p className="lede">{subheading}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="hero-ctas">
              <CtaLink cta={primaryCta} className="btn-primary" />
              <CtaLink cta={secondaryCta} className="btn-secondary" />
            </div>
          )}
        </div>
        <div>
          <HeroArt />
          {stats?.length ? (
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat._key} className="hero-stat">
                  <span className="num">{stat.value}</span>
                  <span className="text">{stat.text}</span>
                </div>
              ))}
            </div>
          ) : null}
          <Sources text={sources} light />
        </div>
      </div>
    </SectionShell>
  );
}

// A hiker with a map, looking past false summits to the true summit catching first light.
function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of a small hiker with a map, seen from behind, standing in the shadow of several false summits and looking toward the true summit catching the first light higher in the distance"
    >
      <defs>
        <linearGradient id="summitGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--wheat)" />
          <stop offset="100%" stopColor="var(--barn)" />
        </linearGradient>
        <radialGradient id="summitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--wheat)" stopOpacity="0.38" />
          <stop offset="100%" stopColor="var(--wheat)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="272" cy="92" rx="110" ry="95" fill="url(#summitGlow)" />
      <path
        d="M215,200 C226,189 236,151 251,121 C259,105 263,71 272,49 C276,41 281,54 286,70 C296,101 301,151 311,181 C316,190 319,196 320,200 Z"
        fill="url(#summitGrad)"
      />
      <line x1="272" y1="49" x2="272" y2="28" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path d="M272,28 L291,34.5 L272,41 Z" fill="var(--ink)" />
      <line x1="0" y1="200.5" x2="320" y2="200.5" stroke="var(--line)" strokeWidth="1.5" />
      <path
        d="M0,200 C16,203 27,159 52,148 C71,140 82,173 103,166 C127,157 141,99 166,104 C186,108 197,159 217,164 C227,167 233,184 236,200 Z"
        fill="var(--steel)"
        opacity="0.7"
      />
      <ellipse cx="34" cy="204" rx="10" ry="2.2" fill="var(--ink-soft)" opacity="0.18" />
      <g transform="translate(34,170.7) scale(0.5)">
        <path d="M-2,31 L-3,45 L-4.0,58" stroke="var(--ink)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M-7.0,58.6 L-1.5,58.6" stroke="var(--ink)" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M2,31 L3,45 L3.0,58" stroke="var(--ink)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M1.5,58.6 L7.5,58.6" stroke="var(--ink)" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M-6.500,13 Q-6.500,10.800 -3.500,10.400 L3.500,10.400 Q6.500,10.800 6.500,13 L5.800,32 L-5.800,32 Z" fill="var(--ink)" />
        <ellipse cx="0.5" cy="5" rx="3.8" ry="4.4" fill="var(--ink)" />
        <rect x="-1.6" y="8" width="3.4" height="4" rx="1.2" fill="var(--ink)" />
        <ellipse cx="0.5" cy="2.3" rx="8" ry="1.8" fill="var(--ink)" />
        <path d="M-3.6,2.3 Q-3.6,-3.2 0.5,-3.2 Q4.6,-3.2 4.6,2.3 Z" fill="var(--ink)" />
        <path d="M6,13.500 L10,22 L5,27" stroke="var(--ink)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M-6,13.500 L-8,23 L-8,31" stroke="var(--ink)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M-14,28 L-6.500,27 L-6,39 L-13.500,40 Z" fill="#F7F4E9" stroke="var(--ink)" strokeWidth="1" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
