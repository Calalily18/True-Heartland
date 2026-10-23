// Placeholder home page. Page copy moves to Sanity in the content-model step.
export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "48rem",
        margin: "0 auto",
        padding: "6rem 1rem",
      }}
    >
      <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}>
        You built it. Let&apos;s figure out what&apos;s next.
      </h1>
      <p style={{ marginTop: "1.25rem", color: "var(--ink-soft)" }}>
        True Heartland Consulting. The full site is on its way.
      </p>
    </main>
  );
}
