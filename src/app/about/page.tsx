import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Richard St-Pierre — Senior Digital Sovereignty Advisor, writer, and strategist.",
};

export default function AboutPage() {
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
        <header
          className="fade-in-up"
          style={{ paddingTop: "64px", paddingBottom: "40px" }}
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
            About
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Richard St-Pierre
          </h1>
        </header>

        <div
          className="article-prose fade-in-up-delay-1"
          style={{ paddingBottom: "40px" }}
        >
          <p>
            Richard St-Pierre is a Senior Digital Sovereignty Advisor at Levio,
            a Canadian consulting firm, where he focuses on defense, government,
            and public sector opportunities spanning digital sovereignty
            strategy, AI policy, quantum technologies, and sovereign cloud
            infrastructure.
          </p>
          <p>
            He is CEO of the Sovereign Data Alliance and has served as Director
            General of EQ1 (Quantum Space 1) and President of C2
            Montr&eacute;al/International. His academic background includes HEC
            Montr&eacute;al, Oxford, and Harvard.
          </p>
          <p>
            His writing explores the intersection of technology, geopolitics, and
            national strategy — with a particular focus on how middle powers like
            Canada can architect coalitions for digital autonomy in an era of
            great-power competition.
          </p>
          <p>
            Richard operates Polynem Inc. and is based in Canada. He can be
            reached at{" "}
            <a href="mailto:richard@polynem.com">richard@polynem.com</a>.
          </p>
        </div>

        <Footer />
      </main>
    </div>
  );
}
