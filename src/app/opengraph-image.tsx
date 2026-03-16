import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Richard St-Pierre — Essays & Analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf8f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#005237",
            marginBottom: 24,
          }}
        >
          Essays & Analysis
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1a1714",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Digital Sovereignty, National Strategy & the AI Frontier
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#4a4640",
            marginTop: "auto",
          }}
        >
          Richard St-Pierre
        </div>
      </div>
    ),
    { ...size }
  );
}
