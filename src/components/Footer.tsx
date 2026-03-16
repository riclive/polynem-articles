import NewsletterCTA from "./NewsletterCTA";

export default function Footer() {
  return (
    <>
      <NewsletterCTA />
      <footer
        style={{
          marginTop: "32px",
          padding: "32px 0",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-muted)",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span>&copy; {new Date().getFullYear()} Polynem Inc.</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a
            href="/feed.xml"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            RSS
          </a>
          <span>richard@polynem.com</span>
        </div>
      </footer>
    </>
  );
}
