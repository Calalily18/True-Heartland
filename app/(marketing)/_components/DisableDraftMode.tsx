"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

// Shown when previewing drafts outside the Studio, so editors can return to the published site.
export function DisableDraftMode() {
  // null while still detecting; true inside the Studio's Presentation tool.
  if (useIsPresentationTool() !== false) return null;

  return (
    <a href="/api/draft-mode/disable" className="draft-banner">
      Previewing drafts. Exit preview
    </a>
  );
}
