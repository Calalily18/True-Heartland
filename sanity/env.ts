// Public project settings. These are not secrets; the env vars allow pointing at another dataset.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xqr07lou";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Pinned so API behavior only changes when we change this date.
export const apiVersion = "2026-10-23";

export const studioUrl = "/studio";
