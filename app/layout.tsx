import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Smartflow Trading | Gold, BTC & Forex Systematic Education",
  description:
    "Learn market-flow structure, follow educational setups, study risk-management guides, and run backtests inside the interactive sandbox.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen dark:bg-gray-950 bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
