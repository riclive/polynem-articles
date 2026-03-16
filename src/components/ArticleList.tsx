"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";
import FeaturedArticle from "./FeaturedArticle";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCat =
      activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          borderBottom: "1px solid var(--color-border)",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Featured article */}
      {featured && <FeaturedArticle article={featured} />}

      {/* Article list */}
      <div>
        {rest.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            fontFamily: "var(--font-ui)",
            color: "var(--color-text-muted)",
            fontSize: "14px",
          }}
        >
          No articles match your search.
        </div>
      )}
    </>
  );
}
