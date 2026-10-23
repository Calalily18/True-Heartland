import { stegaClean } from "next-sanity";

// Line icons from Ryan's design, picked by name in the Studio.
const paths: Record<string, React.ReactNode> = {
  gauge: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <line x1="12" y1="16" x2="15.5" y2="10.5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  trend: (
    <>
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M15 7h5v5" />
    </>
  ),
  envelope: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </>
  ),
  checklist: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <path d="M8 11l2 2 4-4" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </>
  ),
  phone: (
    <path d="M6 3.5c1 0 2.2.3 2.6 1.2l.9 2c.3.7.1 1.5-.4 2l-1 1c.7 1.8 2.2 3.3 4 4l1-1c.5-.5 1.3-.7 2-.4l2 .9c.9.4 1.2 1.6 1.2 2.6 0 1.7-1.4 3.2-3.1 3-6-.7-10.7-5.4-11.4-11.4C3.3 5.9 4.3 3.5 6 3.5z" />
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.3" y1="15.3" x2="20.5" y2="20.5" />
      <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
      <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
    </>
  ),
  document: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </>
  ),
  fork: (
    <>
      <line x1="12" y1="21" x2="12" y2="13" />
      <path d="M12 13L6 5" />
      <path d="M12 13L18 5" />
      <circle cx="6" cy="4" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="4" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
};

export function LineIcon({ name }: { name?: string | null }) {
  const icon = paths[stegaClean(name) || ""];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
