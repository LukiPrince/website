import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MouseProvider } from "@/components/MouseProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Portfolio | Digital Experiences",
  description: "Crafting digital experiences that feel alive - A showcase of interactive design and creative development",
  keywords: ["portfolio", "creative developer", "web design", "interactive", "frontend"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MouseProvider>
            <CustomCursor />
            {children}
          </MouseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
