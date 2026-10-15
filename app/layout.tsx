import { getSiteContent } from "../lib/content";
import { ContentProvider } from "../lib/content-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return { title: content.values.site_title, description: content.values.site_description };
}

export const dynamic = "force-dynamic";
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><ContentProvider content={content}>{children}</ContentProvider></body>
    </html>
  );
}
