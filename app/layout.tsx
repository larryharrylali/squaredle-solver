import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.squaredlesolver.co'),
  title: "Squaredle Solver - Instant Answers & Word Finder | Free Online",
  description: "Educational Squaredle solver with instant word definitions. Solve puzzles, learn vocabulary, and see word meanings. Fast algorithms find every word with visual paths and dictionary lookup.",
  keywords: "squaredle solver, squaredle cheat, squaredle help, squaredle answers, educational squaredle, word definitions, vocabulary builder, squaredle with meanings, learn words",
  authors: [{ name: "Squaredle Solver Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Squaredle Solver - Instant Answers & Word Finder",
    description: "Solve any Squaredle puzzle instantly with visual path animations. 100% free, works on all devices.",
    url: "https://www.squaredlesolver.co",
    siteName: "Squaredle Solver",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Squaredle Solver - Find every word instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squaredle Solver - Instant Answers & Word Finder",
    description: "Solve any Squaredle puzzle instantly with visual path animations.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.squaredlesolver.co",
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Squaredle Solver",
              "description": "Free online Squaredle puzzle solver with visual path animations",
              "url": "https://squaredlesolver.co",
              "applicationCategory": "Game",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Instant word finding",
                "Visual path animations", 
                "Interactive word definitions",
                "Vocabulary learning tool",
                "Mobile responsive design",
                "Comprehensive word database"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-slate-50 text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
