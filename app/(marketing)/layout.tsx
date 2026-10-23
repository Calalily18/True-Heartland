import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { CtaLink } from "./_components/CtaLink";
import { DraftModeTools } from "./_components/DraftModeTools";
import "../globals.css";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [settings, year] = await Promise.all([
    sanityFetch({ query: SETTINGS_QUERY, tags: ["siteSettings"] }),
    currentYear(),
  ]);
  const siteName = settings?.title || "True Heartland Consulting";
  // "True Heartland Consulting" shows its last word in the accent color.
  const nameWords = siteName.split(" ");
  const lastWord = nameWords.length > 1 ? nameWords.pop() : null;

  return (
    <>
      <header className="site">
        <nav className="wrap site-nav" aria-label="Main">
          <Link href="/" className="brand">
            {nameWords.join(" ")} {lastWord && <span>{lastWord}</span>}
          </Link>
          <ul className="nav-links">
            {settings?.navigation?.map((item) => (
              <li key={item._key}>
                <CtaLink cta={item} className="" />
              </li>
            ))}
            {settings?.headerCta && (
              <li>
                <CtaLink cta={settings.headerCta} className="nav-cta" />
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-foot">
        <div className="wrap foot-inner">
          <div>{settings?.footerText || siteName}</div>
          <div>© {year}</div>
        </div>
      </footer>
      <Suspense fallback={null}>
        <DraftModeTools />
      </Suspense>
    </>
  );
}
