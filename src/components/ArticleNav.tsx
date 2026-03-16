import Link from "next/link";
import type { Article } from "@/lib/types";

interface ArticleNavProps {
  prev: Article | null;
  next: Article | null;
}

export default function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
        gap: "24px",
        marginTop: "48px",
        paddingTop: "32px",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {prev && (
        <Link
          href={`/articles/${prev.slug}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            padding: "16px",
            borderRadius: "6px",
            border: "1px solid var(--color-border)",
            transition: "border-color 0.2s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              display: "block",
              marginBottom: "6px",
            }}
          >
            &larr; Previous
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
            }}
          >
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/articles/${next.slug}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            padding: "16px",
            borderRadius: "6px",
            border: "1px solid var(--color-border)",
            textAlign: "right",
            transition: "border-color 0.2s ease",
            gridColumn: prev ? "auto" : "1",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Next &rarr;
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
            }}
          >
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
