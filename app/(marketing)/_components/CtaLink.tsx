import { stegaClean } from "next-sanity";
import Link from "next/link";
import type { CallToAction } from "@/sanity/types";

export function CtaLink({
  cta,
  variant = "primary",
}: {
  cta: CallToAction | null | undefined;
  variant?: "primary" | "secondary";
}) {
  if (!cta?.href || !cta.label) return null;
  const href = stegaClean(cta.href);
  const className = `button button-${variant}`;
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {cta.label}
    </Link>
  ) : (
    <a href={href} className={className}>
      {cta.label}
    </a>
  );
}
