import localFont from "next/font/local";
import "./globals.css";

// Self-hosted fonts (no request to Google at runtime, preloaded, no layout shift).
const russo = localFont({
  src: "../node_modules/@fontsource/russo-one/files/russo-one-latin-400-normal.woff2",
  variable: "--f-display",
  display: "swap",
});
const rajdhani = localFont({
  src: [
    { path: "../node_modules/@fontsource/rajdhani/files/rajdhani-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/rajdhani/files/rajdhani-latin-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/rajdhani/files/rajdhani-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--f-ui",
  display: "swap",
});
const barlow = localFont({
  src: [
    { path: "../node_modules/@fontsource/barlow/files/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/barlow/files/barlow-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--f-body",
  display: "swap",
});
const kaushan = localFont({
  src: "../node_modules/@fontsource/kaushan-script/files/kaushan-script-latin-400-normal.woff2",
  variable: "--f-script",
  display: "swap",
});

export const metadata = {
  title: "Junior Technovia 2026 · National Level Robotic & Innovation Challenge · EIT Faridabad",
  description:
    "Junior Technovia 2026 — a national level robotic and innovation challenge for Grade 9–12 at Echelon Institute of Technology, Faridabad on 20 & 21 November 2026. Eight events, ₹2,00,000 prize pool, ₹100 per student.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Junior Technovia 2026",
    description: "Idea · Innovation · Impact — 20 & 21 Nov 2026 · EIT Faridabad · Grade 9–12",
    images: ["/logos/jt-logo.webp"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${russo.variable} ${rajdhani.variable} ${barlow.variable} ${kaushan.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
