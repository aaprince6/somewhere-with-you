import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Somewhere With You — Every Moment Feels Better With You",
  description:
    "Enter a little world of golden sunsets, beautiful moments, and romantic music. Somewhere With You.",
  keywords: ["romantic", "sunset", "couple", "cinematic", "love", "music"],
  authors: [{ name: "Somewhere With You" }],
  openGraph: {
    type: "website",
    siteName: "Somewhere With You",
    title: "Somewhere With You — Every Moment Feels Better With You",
    description:
      "Enter a little world of golden sunsets, beautiful moments, and romantic music. Somewhere With You.",
    images: [
      {
        url: "/images/meadow-couple-sunset.webp",
        width: 1200,
        height: 630,
        alt: "A couple from behind standing in a golden sunset meadow — Somewhere With You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somewhere With You — Every Moment Feels Better With You",
    description:
      "Enter a little world of golden sunsets, beautiful moments, and romantic music.",
    images: ["/images/meadow-couple-sunset.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#101A14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      {/* Early connection to YouTube origins — cuts first-play latency since
          the IFrame API + stream + thumbnails all come from here. React 19
          hoists these <link> tags into <head>. */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <body className="min-h-screen bg-[#101A14] text-[#F5EBDD] antialiased">
        {children}
      </body>
    </html>
  );
}
