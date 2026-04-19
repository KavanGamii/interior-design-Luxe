import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getConfig } from "@/lib/db";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FooterUnveil } from "@/components/layout/FooterUnveil";
import { Preloader } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  title: "Luxe Interiors | Luxury Interior Design Studio",
  description: "Exquisite architectural spaces crafted with quiet luxury and timeless elegance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased cursor-none`}
    >
      <body className="font-sans bg-cream text-charcoal min-h-screen selection:bg-accent-gold/30 selection:text-charcoal transition-colors duration-500">
        <CustomCursor />
        <Preloader />
        <SmoothScroll>
          <FooterUnveil footer={<Footer config={config} />}>
            <Navbar config={config} />
            <main className="flex-grow">{children}</main>
          </FooterUnveil>
        </SmoothScroll>
      </body>
    </html>
  );
}
