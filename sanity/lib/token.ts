// Server-only: never import this from a "use client" module.
// A Viewer token, used only for Draft Mode. Unset in CI and local builds, where drafts are off.
export const readToken = process.env.SANITY_API_READ_TOKEN;
