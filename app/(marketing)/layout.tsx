import Link from "next/link";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { DraftModeTools } from "./_components/DraftModeTools";
import "../globals.css";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch({ query: SETTINGS_QUERY, tags: ["siteSettings"] });
  const siteName = settings?.title || "True Heartland Consulting";

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="site-name">
            {siteName}
          </Link>
          {settings?.navigation?.length ? (
            <nav aria-label="Main">
              <ul className="nav-list">
                {settings.navigation.map((item) => (
                  <li key={item._key}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container">
          {settings?.footerText && <p>{settings.footerText}</p>}
          {settings?.contactEmail && (
            <p>
              <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
            </p>
          )}
          <p className="fine-print">© {siteName}</p>
        </div>
      </footer>
      <Suspense fallback={null}>
        <DraftModeTools />
      </Suspense>
    </>
  );
}
