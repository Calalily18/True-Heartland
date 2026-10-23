import { SectionHead, SectionShell, Sources } from "./SectionShell";
import type { Section } from "./types";

export function Situations(props: Section<"situations">) {
  const { kicker, heading, intro, items, targetLabel, targetTitle, sources } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper2">
      <SectionHead kicker={kicker} heading={heading} intro={intro} />
      {items?.length ? (
        <div className="situations">
          {items.map((item, i) => (
            <div key={item._key} className="sit">
              <div className="sit-n" aria-hidden="true">
                {i + 1}
              </div>
              <h3>{item.title}</h3>
              {item.text && <p>{item.text}</p>}
              {item.statValue && (
                <div className="sit-foot">
                  <span className="sit-stat">{item.statValue}</span>
                  {item.statText && <span className="sit-cap">{item.statText}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
      {(targetLabel || targetTitle) && (
        <div className="sit-target">
          <div className="sit-target-dot" />
          <div>
            {targetLabel && <div className="sit-target-k">{targetLabel}</div>}
            {targetTitle && <div className="sit-target-t">{targetTitle}</div>}
          </div>
        </div>
      )}
      <Sources text={sources} light />
    </SectionShell>
  );
}
