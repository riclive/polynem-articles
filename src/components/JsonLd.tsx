import type { Article } from "@/lib/types";

interface JsonLdProps {
  article: Article;
}

export default function JsonLd({ article }: JsonLdProps) {
  const SITE_URL = "https://richardstpierre.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Person",
      name: article.author,
      url: `${SITE_URL}/about`,
    },
    ...(article.coAuthor && {
      contributor: {
        "@type": "Person",
        name: article.coAuthor,
      },
    }),
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "Polynem Inc.",
      url: SITE_URL,
    },
    url: `${SITE_URL}/articles/${article.slug}`,
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
    articleSection: article.category,
    ...(article.publication && {
      isPartOf: {
        "@type": "PublicationIssue",
        name: article.publication,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
