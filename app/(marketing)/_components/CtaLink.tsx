import { stegaClean } from "next-sanity";
import Link from "next/link";
type LinkFields = { label?: string | null; href?: string | null };

export function CtaLink({
  cta,
  variant = "primary",
  className,
}: {
  cta: LinkFields | null | undefined;
  variant?: "primary" | "secondary";
  /** Overrides the default button classes. */
  className?: string;
}) {
  if (!cta?.href || !cta.label) return null;
  const href = stegaClean(cta.href);
  const classes = className ?? `button button-${variant}`;
  // In-page anchors and other sites use a plain link; pages on this site use client navigation.
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {cta.label}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {cta.label}
    </a>
  );
}
