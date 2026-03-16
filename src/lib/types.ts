export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: ArticleCategory;
  author: string;
  publication: string;
  summary: string;
  readTime: string;
  featured?: boolean;
  coAuthor?: string;
  image?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export type ArticleCategory =
  | "Policy"
  | "Opinion"
  | "Analysis"
  | "Technology"
  | "Security"
  | "Strategy";

export const CATEGORIES: ArticleCategory[] = [
  "Policy",
  "Opinion",
  "Analysis",
  "Technology",
  "Security",
  "Strategy",
];

export const CATEGORY_COLORS: Record<
  ArticleCategory,
  { bg: string; text: string; border: string }
> = {
  Policy: { bg: "rgba(0,82,55,0.08)", text: "#005237", border: "rgba(0,82,55,0.18)" },
  Opinion: { bg: "rgba(142,55,0,0.08)", text: "#8E3700", border: "rgba(142,55,0,0.18)" },
  Analysis: { bg: "rgba(0,51,120,0.08)", text: "#003378", border: "rgba(0,51,120,0.18)" },
  Technology: { bg: "rgba(88,0,120,0.08)", text: "#580078", border: "rgba(88,0,120,0.18)" },
  Security: { bg: "rgba(120,0,20,0.08)", text: "#780014", border: "rgba(120,0,20,0.18)" },
  Strategy: { bg: "rgba(50,50,0,0.08)", text: "#3a3a00", border: "rgba(50,50,0,0.18)" },
};
