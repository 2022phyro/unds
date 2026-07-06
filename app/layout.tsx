import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";


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
  title: "UNDS Debating Union",
  description: "Forward-facing site for the UNDS Debating Union.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${ebGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
