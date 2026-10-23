"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Segment = {
  _id: string;
  title: string;
  shortTitle: string | null;
  slug: string;
  friction: string | null;
  fix: string | null;
};

const COLORS = ["#C79A3E", "#6B7A3A", "#B4573A", "#33475A", "#8A5A83", "#2F7F79", "#4F8FBF"];
const C = 210;
const OUTER = 168;
const INNER = 64;
const NODE = 126;
const GAP_DEG = 1.2;

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))].map((v) => v.toFixed(1));

// One ring segment per service, the first centered at the top, going clockwise.
function wedgePath(i: number, n: number) {
  const mid = -90 + (i * 360) / n;
  const half = 180 / n - GAP_DEG;
  const [ox1, oy1] = pt(OUTER, mid - half);
  const [ox2, oy2] = pt(OUTER, mid + half);
  const [ix2, iy2] = pt(INNER, mid + half);
  const [ix1, iy1] = pt(INNER, mid - half);
  return `M${ox1},${oy1} A${OUTER},${OUTER} 0 0 1 ${ox2},${oy2} L${ix2},${iy2} A${INNER},${INNER} 0 0 0 ${ix1},${iy1} Z`;
}

type Line = { x1: number; y1: number; x2: number; y2: number };

export function SegmentsMap({ segments, centerLabel }: { segments: Segment[]; centerLabel: string }) {
  // Stable across renders, so drawing the lines (which sets state) doesn't retrigger itself.
  const items = useMemo(() => segments.slice(0, 7), [segments]);
  const n = items.length;
  const [lit, setLit] = useState<number | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Connector lines from each wedge to its card, on wide screens only (as in the original page).
  const draw = useCallback(() => {
    const map = mapRef.current;
    if (!map || window.innerWidth <= 1000) return setLines([]);
    const mr = map.getBoundingClientRect();
    const next: Line[] = [];
    items.forEach((_, i) => {
      const node = nodeRefs.current[i];
      const card = cardRefs.current[i];
      if (!node || !card) return;
      const nr = node.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const nx = nr.left + nr.width / 2 - mr.left;
      const ny = nr.top + nr.height / 2 - mr.top;
      const cl = cr.left - mr.left;
      const ct = cr.top - mr.top;
      const clampY = Math.min(Math.max(ny, ct + 24), ct + cr.height - 24);
      if (i === 0) next.push({ x1: nx, y1: ny, x2: Math.min(Math.max(nx, cl + 30), cl + cr.width - 30), y2: ct + cr.height });
      else if (cl + cr.width / 2 < mr.width / 2) next.push({ x1: nx, y1: ny, x2: cl + cr.width, y2: clampY });
      else next.push({ x1: nx, y1: ny, x2: cl, y2: clampY });
    });
    setLines(next);
  }, [items]);

  useEffect(() => {
    draw();
    window.addEventListener("resize", draw);
    document.fonts?.ready.then(draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  if (n === 0) return null;
  const on = (i: number) => () => setLit(i);
  const off = () => setLit(null);

  return (
    <div className="seg-map" ref={mapRef}>
      {items.map((seg, i) => (
        <div
          key={seg._id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`seg c${i + 1}${lit === i ? " lit" : ""}`}
          style={{ "--sc": COLORS[i] } as React.CSSProperties}
          onMouseEnter={on(i)}
          onMouseLeave={off}
        >
          <div className="seg-h">
            <span className="seg-n">{i + 1}</span>
            <h3>
              <Link href={`/services/${seg.slug}`}>{seg.title}</Link>
            </h3>
          </div>
          {seg.friction && (
            <p>
              <span className="seg-k">The friction</span>
              {seg.friction}
            </p>
          )}
          {seg.fix && (
            <p>
              <span className="seg-k fix">The fix</span>
              {seg.fix}
            </p>
          )}
        </div>
      ))}
      <figure className="viz-fig seg-fig">
        <svg
          viewBox="0 0 420 420"
          role="img"
          aria-label={`A pie wheel of the ${n} business segments we work on: ${items
            .map((s) => s.shortTitle || s.title)
            .join(", ")}, all around one center labeled ${centerLabel}.`}
        >
          {items.map((seg, i) => {
            const [nx, ny] = pt(NODE, -90 + (i * 360) / n);
            return (
              <g key={seg._id}>
                <path
                  className={`wedge${lit === i ? " lit" : ""}`}
                  d={wedgePath(i, n)}
                  fill={COLORS[i]}
                  onMouseEnter={on(i)}
                  onMouseLeave={off}
                >
                  <title>{seg.shortTitle || seg.title}</title>
                </path>
                <circle
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  cx={nx}
                  cy={ny}
                  r="2"
                  fill="none"
                />
              </g>
            );
          })}
          <circle cx={C} cy={C} r="60" fill="#6B7A3A" />
          <circle cx={C} cy={C} r="66" fill="none" stroke="var(--paper)" strokeWidth="4" opacity="0.9" />
          <text x={C} y={C + 5} textAnchor="middle" fontSize="15" style={{ fill: "#F7F4E9", fontFamily: "var(--serif)" }}>
            {centerLabel}
          </text>
        </svg>
      </figure>
      {lines.length > 0 && (
        <svg className="seg-links" aria-hidden="true">
          {lines.map((l, i) => (
            <g key={i}>
              <path
                className={`seg-line${lit === i ? " lit" : ""}`}
                d={`M${l.x1},${l.y1} L${l.x2},${l.y2}`}
                fill="none"
                stroke={COLORS[i]}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
              <circle cx={l.x2} cy={l.y2} r={lit === i ? 6 : 4} fill={COLORS[i]} />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
