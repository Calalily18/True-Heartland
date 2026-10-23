import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "./DisableDraftMode";

// Rendered inside <Suspense> by the layout, because reading Draft Mode is per-request.
export async function DraftModeTools() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <>
      <DisableDraftMode />
      <VisualEditing />
    </>
  );
}
