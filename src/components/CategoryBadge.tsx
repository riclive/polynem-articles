import type { ArticleCategory } from "@/lib/types";

interface CategoryBadgeProps {
  category: ArticleCategory;
}

// Use CSS variables so dark mode works automatically
const CATEGORY_CSS_MAP: Record<
  ArticleCategory,
  { bg: string; text: string; border: string }
> = {
  Policy: {
    bg: "var(--color-cat-policy-bg)",
    text: "var(--color-cat-policy-text)",
    border: "var(--color-cat-policy-border)",
  },
  Opinion: {
    bg: "var(--color-cat-opinion-bg)",
    text: "var(--color-cat-opinion-text)",
    border: "var(--color-cat-opinion-border)",
  },
  Analysis: {
    bg: "var(--color-cat-analysis-bg)",
    text: "var(--color-cat-analysis-text)",
    border: "var(--color-cat-analysis-border)",
  },
  Technology: {
    bg: "var(--color-cat-technology-bg)",
    text: "var(--color-cat-technology-text)",
    border: "var(--color-cat-technology-border)",
  },
  Security: {
    bg: "var(--color-cat-security-bg)",
    text: "var(--color-cat-security-text)",
    border: "var(--color-cat-security-border)",
  },
  Strategy: {
    bg: "var(--color-cat-strategy-bg)",
    text: "var(--color-cat-strategy-text)",
    border: "var(--color-cat-strategy-border)",
  },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_CSS_MAP[category] || {
    bg: "var(--color-border-subtle)",
    text: "var(--color-text-secondary)",
    border: "var(--color-border)",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        fontSize: "10.5px",
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: colors.text,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "3px",
      }}
    >
      {category}
    </span>
  );
}
