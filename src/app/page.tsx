import { getAllArticles } from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleList from "@/components/ArticleList";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <Navbar />

      <main
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <header
          className="fade-in-up"
          style={{ paddingTop: "64px", paddingBottom: "20px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11.5px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "14px",
            }}
          >
            Essays &amp; Analysis
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 50px)",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "var(--color-text-primary)",
              marginBottom: "18px",
              letterSpacing: "-0.02em",
            }}
          >
            Digital Sovereignty,
            <br />
            National Strategy
            <br />
            &amp; the AI Frontier
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "var(--color-text-secondary)",
              maxWidth: "560px",
            }}
          >
            On the thinkers, technologies and policy frameworks shaping
            Canada&apos;s path to digital autonomy in an era of geopolitical
            realignment.
          </p>
        </header>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, var(--color-text-primary) 0%, var(--color-text-primary) 30%, transparent 100%)",
            margin: "8px 0 0 0",
          }}
        />

        {/* Article listing with filters */}
        <ArticleList articles={articles} />

        <Footer />
      </main>
    </div>
  );
}
