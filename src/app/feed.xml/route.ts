import { getAllArticles } from "@/lib/articles";

const SITE_URL = "https://richardstpierre.com";

export async function GET() {
  const articles = getAllArticles();

  const itemsXml = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/articles/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${article.slug}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <pubDate>${new Date(article.date + "T12:00:00").toUTCString()}</pubDate>
      <author>richard@polynem.com (${article.author})</author>
      <category>${article.category}</category>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Richard St-Pierre — Essays &amp; Analysis</title>
    <link>${SITE_URL}</link>
    <description>Essays, analysis, and policy reports on digital sovereignty, AI governance, and Canada's national strategy.</description>
    <language>en-ca</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
