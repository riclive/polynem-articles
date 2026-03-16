import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <Navbar />
      <main
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
          paddingTop: "120px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "16px",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            marginBottom: "32px",
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-accent)",
            textDecoration: "none",
          }}
        >
          &larr; Back to essays
        </Link>
      </main>
    </div>
  );
}
