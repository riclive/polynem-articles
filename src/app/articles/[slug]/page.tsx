import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getArticleBySlug,
  getArticleSlugs,
  getAdjacentArticles,
  formatDate,
} from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryBadge from "@/components/CategoryBadge";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleNav from "@/components/ArticleNav";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <ReadingProgress />
      <JsonLd article={article} />
      <Navbar />

      <main
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Article header */}
        <header
          className="fade-in-up"
          style={{ paddingTop: "64px", paddingBottom: "40px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
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

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              maxWidth: "720px",
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
              maxWidth: "620px",
              marginBottom: "24px",
              fontStyle: "italic",
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
              paddingBottom: "32px",
              borderBottom: "1px solid var(--color-border)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ fontWeight: 500, color: "var(--color-text-primary)" }}
            >
              {article.author}
            </span>
            {article.coAuthor && (
              <>
                <span style={{ opacity: 0.4 }}>&amp;</span>
                <span
                  style={{
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {article.coAuthor}
                </span>
              </>
            )}
            <span style={{ opacity: 0.4 }}>&middot;</span>
            <span>{formatDate(article.date)}</span>
            <span style={{ opacity: 0.4 }}>&middot;</span>
            <span>{article.readTime}</span>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    color: "var(--color-text-muted)",
                    background: "var(--color-border-subtle)",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article body */}
        <div className="article-prose fade-in-up-delay-1">
          <MDXRemote source={article.content} />
        </div>

        {/* Previous / Next navigation */}
        <ArticleNav prev={prev} next={next} />

        {/* Back link */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            &larr; Back to all essays
          </a>
        </div>

        <Footer />
      </main>
    </div>
  );
}
