import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { ThemeProvider } from "next-themes";
import { HeroFireflies } from "@/components/fireflies";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "University of Nigeria Debating Society // The Spartans",
    template: "%s | University of Nigeria Debating Society",
  },
  description: "Home of intellectual discourse, forensic excellence, and competitive speech. We forge analytical thinkers and public advocates commanding global tournament circuits.",
  keywords: [
    "UNDS", 
    "University of Nigeria Debating Society", 
    "The Spartans", 
    "Debate Union Nigeria", 
    "British Parliamentary Debate"
  ],
  authors: [{ name: "UNDS Executive Council" }],
  creator: "UNDS Technical team",
  publisher: "University of Nigeria Debating Society",
  metadataBase: new URL("https://unds.org"), // Replace with your final Vercel or custom domain

  // Open Graph (Facebook, WhatsApp, LinkedIn, Discord previews)
  openGraph: {
    title: "Welcome to University of Nigeria Debating Society",
    description: "The proving ground for the sharpest minds. Discover competitive forensics excellence and intellectual discourse.",
    url: "https://unds.org",
    siteName: "University of Nigeria Debating Society",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/logo.png", // Place an elegant, dark-forest/academic banner image in your public folder
        width: 1200,
        height: 630,
          alt: "University of Nigeria Debating Society - The Spartans",
        },
      ],
  },

  // Twitter Cards (X Previews)
  twitter: {
    card: "summary_large_image",
    title: "University of Nigeria Debating Society // Home of the Spartans",
    description: "Forge analytical clarity, master forensic speech, and compete on international debating circuits.",
    images: ["/logo.png"],
  },

  // Robots & Crawlers instructions
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Browser icons configuration
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${ebGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="relative flex-1">
            <HeroFireflies />
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
