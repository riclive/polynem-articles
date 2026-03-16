"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "16px",
          }}
        >
          Error
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            marginBottom: "12px",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-bg)",
            background: "var(--color-accent)",
            border: "none",
            padding: "10px 24px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
