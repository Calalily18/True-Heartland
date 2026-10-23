import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";

// Site styles load in app/(marketing)/layout.tsx so they never reach the Studio at /studio.

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Heartland Consulting",
  description:
    "Exit and growth readiness for owners of small and mid-sized businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
