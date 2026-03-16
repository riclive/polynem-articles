export default function NewsletterCTA() {
  return (
    <section
      style={{
        marginTop: "64px",
        padding: "36px 32px",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: "8px",
        }}
      >
        Stay informed
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
          maxWidth: "440px",
          margin: "0 auto 20px",
        }}
      >
        New essays on digital sovereignty, AI governance, and national strategy
        delivered when published.
      </p>
      <a
        href="mailto:richard@polynem.com?subject=Subscribe%20to%20essays"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--color-bg)",
          background: "var(--color-accent)",
          padding: "10px 28px",
          borderRadius: "4px",
          textDecoration: "none",
          transition: "background 0.2s ease",
        }}
      >
        Subscribe via email
      </a>
    </section>
  );
}
