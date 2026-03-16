import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-bg-nav)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        padding: "0 24px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--nav-height)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Richard St-Pierre
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--color-text-primary)",
              textDecoration: "none",
            }}
          >
            Essays
          </Link>
          <Link
            href="/about"
            style={{
              color: "var(--color-text-tertiary)",
              textDecoration: "none",
            }}
          >
            About
          </Link>
          <a
            href="mailto:richard@polynem.com"
            style={{
              color: "var(--color-text-tertiary)",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
          <a
            href="/feed.xml"
            title="RSS Feed"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6.18" cy="17.82" r="2.18" />
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
