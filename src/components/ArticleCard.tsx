import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article
      style={{
        padding: "28px 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Link
        href={`/articles/${article.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <CategoryBadge category={article.category} />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {article.publication}
          </span>
        </div>

        <h3
          className="article-card-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 24px)",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            marginBottom: "14px",
            maxWidth: "620px",
          }}
        >
          {article.summary}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontFamily: "var(--font-ui)",
            fontSize: "12.5px",
            color: "var(--color-text-muted)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>
            {article.author}
          </span>
          <span style={{ opacity: 0.35 }}>&middot;</span>
          <span>{formatDate(article.date)}</span>
          <span style={{ opacity: 0.35 }}>&middot;</span>
          <span>{article.readTime}</span>
        </div>
      </Link>
    </article>
  );
}
