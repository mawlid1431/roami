import type { Metadata } from "next";
import { displayFontUrl, sceneAssets } from "@/data/scene";
import "./globals.css";
import "./styles/cinema.css";
import "./styles/home-sections.css";
import "./styles/scroll-exit.css";
import "./styles/places.css";
import "./styles/plan.css";

export const metadata: Metadata = {
  title: "ROAMI | Your world. Your journey.",
  description: "A cinematic three-screen scroll story for Mostar city. Explore with ROAMI.",
  icons: { icon: "data:," },
  openGraph: {
    title: "ROAMI | Your world. Your journey.",
    description: "A stone arch, emerald water, and one unforgettable crossing. Discover Mostar with ROAMI.",
    type: "website",
    images: [{ url: sceneAssets.sky, alt: "Mostar, Bosnia and Herzegovina" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://raft-blast-61784561.figma.site" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preload" href={displayFontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
