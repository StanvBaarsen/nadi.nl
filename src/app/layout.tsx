import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NADI - Nationaal Agentschap voor Disruptieve Innovatie",
  description: "Een voorstel voor een Nederlandse ARPA-organisatie.",
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph tags */}
        <meta property="og:title" content="NADI - Nationaal Agentschap voor Disruptieve Innovatie" />
        <meta property="og:description" content="Een voorstel voor een Nederlandse ARPA-organisatie." />
        <meta property="og:image" content="/cover-image.png" />
        <meta property="og:image:alt" content="NADI Cover Image" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:logo" content="/favicon-96x96.png" />
        <meta property="og:url" content="https://nadi.nl/" />
        <meta property="og:type" content="website" />
        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NADI - Nationaal Agentschap voor Disruptieve Innovatie" />
        <meta name="twitter:description" content="Een voorstel voor een Nederlandse ARPA-organisatie." />
        <meta name="twitter:image" content="/cover-image.png" />
        <meta name="twitter:image:alt" content="NADI Cover Image" />
        {/* General description fallback */}
        <meta name="description" content="Een voorstel voor een Nederlandse ARPA-organisatie." />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
