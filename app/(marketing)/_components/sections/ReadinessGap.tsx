import { SectionShell, Sources } from "./SectionShell";
import type { Section } from "./types";

export function ReadinessGap(props: Section<"readinessGap">) {
  const { heading, currentLabel, currentTitle, goalLabel, goalTitle, rows, currentImpact, goalImpact } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="ink">
      <div className="problem-panel">
        <h3 className="gap-title">{heading}</h3>
        <div className="cmp">
          <div className="cmp-colhead">
            <div className="cmp-col bad">
              <span className="cmp-ico x" aria-hidden="true">
                ✕
              </span>
              <div>
                <div className="cmp-k">{currentLabel}</div>
                <div className="cmp-t">{currentTitle}</div>
              </div>
            </div>
            <div className="cmp-mid" />
            <div className="cmp-col good">
              <span className="cmp-ico check" aria-hidden="true">
                ✓
              </span>
              <div>
                <div className="cmp-k">{goalLabel}</div>
                <div className="cmp-t">{goalTitle}</div>
              </div>
            </div>
          </div>
          {rows?.map((row) => (
            <div key={row._key} className="cmp-row">
              <div className="cmp-cell bad">
                <strong>{row.currentTitle}</strong>
                {row.currentText && <p>{row.currentText}</p>}
              </div>
              <div className="cmp-arrow" aria-hidden="true">
                →
              </div>
              <div className="cmp-cell good">
                <strong>{row.goalTitle}</strong>
                {row.goalText && <p>{row.goalText}</p>}
              </div>
            </div>
          ))}
          {(currentImpact || goalImpact) && (
            <div className="cmp-impact">
              <div className="impact bad">{currentImpact}</div>
              <div className="cmp-mid" />
              <div className="impact good">{goalImpact}</div>
            </div>
          )}
        </div>

        {(props.calloutFigure || props.valueRange || props.movers?.length) && (
          <div className="gap-callout">
            {(props.calloutFigure || props.calloutText) && (
              <div className="lead-stat">
                {props.calloutFigure && <div className="figure">{props.calloutFigure}</div>}
                {props.calloutText && <p>{props.calloutText}</p>}
              </div>
            )}
            <ValueRangeChart range={props.valueRange} />
            {props.movers?.length ? (
              <figure className="viz-fig">
                {props.moversHeading && <h4>{props.moversHeading}</h4>}
                {props.moversIntro && <p className="movers-intro">{props.moversIntro}</p>}
                <MoversChart movers={props.movers} />
                {props.moversCaption && <figcaption>{props.moversCaption}</figcaption>}
              </figure>
            ) : null}
          </div>
        )}
      </div>
      <Sources text={props.sources} />
    </SectionShell>
  );
}

function millions(n: number) {
  return `$${Number.isInteger(n) ? n : n.toFixed(1)}M`;
}

// Two bars on a dollar scale: the business that runs without its owner, and the same
// business shifted left by the owner-dependence discount.
function ValueRangeChart({ range }: { range: Section<"readinessGap">["valueRange"] }) {
  const low = range?.low;
  const high = range?.high;
  if (low == null || high == null || high <= low) return null;
  const discount = Math.min(range?.discount ?? 0, low);

  const max = Math.max(10, Math.ceil(high / 2) * 2);
  const x = (m: number) => 30 + (m / max) * 640;
  const ticks = Array.from({ length: max / 2 + 1 }, (_, i) => i * 2);
  const width = x(high) - x(low);
  const shiftedX = x(low - discount);
  const labelX = Math.min(366, shiftedX - 16);

  return (
    <figure className="viz-fig">
      <svg
        viewBox="0 0 770 184"
        role="img"
        aria-label={`Two range bars on a value scale. A business that runs without its owner sells for ${millions(low)} to ${millions(high)}. The same business, fully owner-dependent, can lose ${millions(discount)} or more of that value.`}
      >
        <defs>
          <linearGradient id="goldBar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B4903D" />
            <stop offset="100%" stopColor="#E7C978" />
          </linearGradient>
        </defs>
        <line x1="30" y1="148" x2="670" y2="148" stroke="#5A5340" strokeWidth="1" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1="146" x2={x(t)} y2="152" stroke="#8C8470" strokeWidth="1" />
            <text x={x(t)} y="170" textAnchor="middle" fontSize="12" fill="#B9B29A">
              {millions(t)}
            </text>
          </g>
        ))}
        <text x={labelX} y="48" textAnchor="end" fontSize="14" fill="#E7E0CC">
          {range?.readyLabel}
        </text>
        <rect x={x(low)} y="30" width={width} height="26" rx="5" fill="url(#goldBar)" />
        <text x={x(high) + 8} y="48" fontSize="14" fill="#E7C978">
          {millions(low)}–{millions(high)}
        </text>
        <text x={labelX} y="118" textAnchor="end" fontSize="14" fill="#E7E0CC">
          {range?.dependentLabel}
        </text>
        <rect x={shiftedX} y="100" width={width} height="26" rx="5" fill="none" stroke="#C9A452" strokeWidth="1.6" strokeDasharray="4 3" />
        {discount > 0 && (
          <>
            <line x1={x(low)} y1="58" x2={x(low)} y2="98" stroke="#8C8470" strokeWidth="1" strokeDasharray="2 3" />
            <line x1={x(low)} y1="78" x2={shiftedX + 4} y2="78" stroke="#E7C978" strokeWidth="1.6" />
            <path d={`M${shiftedX + 4},73 L${shiftedX - 3},78 L${shiftedX + 4},83 Z`} fill="#E7C978" />
            <text x={(x(low) + shiftedX) / 2} y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="#E7C978">
              {range?.discountLabel}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}

// Bars on a scale of -2 to +2 turns of multiple: red for what lowers it, gold for what raises it.
function MoversChart({ movers }: { movers: NonNullable<Section<"readinessGap">["movers"]> }) {
  const x = (turns: number) => 450 + turns * 100;
  const bottom = 20 + movers.length * 44;
  const description = movers
    .map((m) => `${m.label}: ${m.from} to ${m.to} turns${m.valueLabel ? ` (${m.valueLabel})` : ""}`)
    .join(". ");
  return (
    <svg viewBox={`0 0 900 ${bottom + 54}`} role="img" aria-label={`Typical effect on a business's valuation multiple, in turns. ${description}.`}>
      <defs>
        <linearGradient id="goldBar2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B4903D" />
          <stop offset="100%" stopColor="#E7C978" />
        </linearGradient>
      </defs>
      {[-2, -1, 0, 1, 2].map((t) => (
        <g key={t}>
          <line x1={x(t)} y1="14" x2={x(t)} y2={bottom} stroke={t === 0 ? "#8C8470" : "#3D3018"} strokeWidth="1" />
          <text x={x(t)} y={bottom + 20} textAnchor="middle" fontSize="12" fill="#B9B29A">
            {t > 0 ? `+${t}` : t < 0 ? `−${-t}` : "0"}
          </text>
        </g>
      ))}
      <text x="450" y={bottom + 44} textAnchor="middle" fontSize="12" fill="#B9B29A">
        turns of multiple
      </text>
      {movers.map((m, i) => {
        const y = 26 + i * 44;
        const lo = Math.min(m.from, m.to);
        const hi = Math.max(m.from, m.to);
        return (
          <g key={m._key}>
            <text x="232" y={y + 17} textAnchor="end" fontSize="15" fill="#E7E0CC">
              {m.label}
            </text>
            <rect x={x(lo)} y={y} width={Math.max(4, (hi - lo) * 100)} height="24" rx="5" fill={hi <= 0 ? "#B5533C" : "url(#goldBar2)"} />
            {m.valueLabel && (
              <text x="674" y={y + 17} fontSize="15" fontWeight="600" fill="#E7C978">
                {m.valueLabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
