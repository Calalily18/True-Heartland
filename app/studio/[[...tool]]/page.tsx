import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Sets a mobile viewport and keeps search engines from indexing the Studio.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
