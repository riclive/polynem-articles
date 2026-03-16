import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;

  // Auto-calculate read time if not provided
  if (!frontmatter.readTime) {
    const stats = readingTime(content);
    frontmatter.readTime = stats.text;
  }

  return {
    slug,
    content,
    ...frontmatter,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return getAllArticles().find((article) => article.featured);
}

export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const articles = getAllArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };

  // Articles are sorted newest-first, so:
  // "prev" = older article (higher index) — the one before in chronological reading
  // "next" = newer article (lower index) — the one after
  return {
    prev: index < articles.length - 1 ? articles[index + 1] : null,
    next: index > 0 ? articles[index - 1] : null,
  };
}

// Re-export formatDate from utils for backward compatibility in server components
export { formatDate } from "./utils";
