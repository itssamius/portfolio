import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Samuel Abera — Senior Full Stack Developer",
  description: "Senior full-stack developer in Toronto building e-commerce, apps, and products with React, Rails, and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
