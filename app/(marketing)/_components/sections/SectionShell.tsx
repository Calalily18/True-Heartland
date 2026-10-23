import { stegaClean } from "next-sanity";

type Background = "paper" | "paper2" | "ink";

// Every home-page section: an optional anchor for menu links and one of three backgrounds.
export function SectionShell({
  anchorId,
  background,
  fallback,
  className,
  children,
}: {
  anchorId?: string | null;
  background?: string | null;
  fallback: Background;
  className?: string;
  children: React.ReactNode;
}) {
  const bg = (stegaClean(background) as Background | undefined) || fallback;
  const id = stegaClean(anchorId) || undefined;
  return (
    <section id={id} className={["sec", `sec-${bg}`, className].filter(Boolean).join(" ")}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  heading,
  intro,
  children,
}: {
  kicker?: string | null;
  heading?: string | null;
  intro?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      {kicker && <div className="kicker">{kicker}</div>}
      {heading && <h2>{heading}</h2>}
      {intro && <p>{intro}</p>}
      {children}
    </div>
  );
}

export function Sources({ text, light }: { text?: string | null; light?: boolean }) {
  if (!text) return null;
  return <div className={light ? "section-sources light" : "section-sources"}>{text}</div>;
}

// Splits a label into lines of at most `max` characters, for text inside SVG shapes.
export function wrapWords(text: string, max: number) {
  const lines: string[] = [];
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= max) lines[lines.length - 1] = last + " " + word;
    else lines.push(word);
  }
  return lines;
}
