import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Fullstack Starter - GIS, AI & Automation Boilerplate",
  description: "A production-ready full-stack starter with Next.js 15, TypeScript, TailwindCSS, Supabase auth, Leaflet maps, OpenAI integration, and n8n webhooks.",
  keywords: ["Next.js", "TypeScript", "Supabase", "Leaflet", "OpenAI", "n8n", "GIS", "Dashboard"],
  authors: [{ name: "NextFS Starter" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
