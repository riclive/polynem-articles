"use client";

import { CATEGORIES, type ArticleCategory } from "@/lib/types";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const allCategories = ["All", ...CATEGORIES];

  return (
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12.5px",
            fontWeight: active === cat ? 600 : 400,
            padding: "6px 14px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: active === cat ? "var(--color-text-primary)" : "transparent",
            color: active === cat ? "var(--color-bg)" : "var(--color-text-tertiary)",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
