import { ImageResponse } from "next/og";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";

export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

const CATEGORY_COLORS: Record<string, string> = {
  Policy: "#005237",
  Opinion: "#8E3700",
  Analysis: "#003378",
  Technology: "#580078",
  Security: "#780014",
  Strategy: "#3a3a00",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title || "Article";
  const category = article?.category || "Essay";
  const author = article?.author || "Richard St-Pierre";
  const publication = article?.publication || "";
  const accentColor = CATEGORY_COLORS[category] || "#005237";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#faf8f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: accentColor,
                background: `${accentColor}14`,
                padding: "6px 16px",
                borderRadius: "4px",
                border: `1px solid ${accentColor}30`,
              }}
            >
              {category}
            </div>
            {publication && (
              <div
                style={{
                  fontSize: 14,
                  color: "#8a8478",
                  letterSpacing: "0.04em",
                }}
              >
                {publication}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 42 : 52,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#1a1714",
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#4a4640",
            }}
          >
            {author}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#8a8478",
              letterSpacing: "0.02em",
            }}
          >
            richardstpierre.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
