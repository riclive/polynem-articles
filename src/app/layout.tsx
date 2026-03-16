import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://richardstpierre.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Richard St-Pierre — Essays & Analysis",
    template: "%s | Richard St-Pierre",
  },
  description:
    "Essays, analysis, and policy reports on digital sovereignty, AI governance, and Canada's national strategy by Richard St-Pierre.",
  authors: [{ name: "Richard St-Pierre" }],
  creator: "Richard St-Pierre",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Richard St-Pierre",
    title: "Richard St-Pierre — Essays & Analysis",
    description:
      "On digital sovereignty, AI governance, and Canada's path to technological autonomy.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard St-Pierre — Essays & Analysis",
    description:
      "On digital sovereignty, AI governance, and Canada's path to technological autonomy.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
