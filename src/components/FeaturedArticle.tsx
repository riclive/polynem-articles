import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article
      style={{
        padding: "40px 0",
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
            marginBottom: "18px",
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

        <h2
          className="article-card-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "var(--color-text-primary)",
            marginBottom: "14px",
          }}
        >
          {article.title}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
            maxWidth: "680px",
            marginBottom: "18px",
          }}
        >
          {article.summary}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            color: "var(--color-text-muted)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>
            {article.author}
          </span>
          <span style={{ opacity: 0.4 }}>&middot;</span>
          <span>{formatDate(article.date)}</span>
          <span style={{ opacity: 0.4 }}>&middot;</span>
          <span>{article.readTime}</span>
        </div>
      </Link>
    </article>
  );
}
