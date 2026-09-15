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

export const metadata: Metadata = {
  title: "Pillar Dashboards",
  description:
    "Transform how IGCSE teachers and students track performance with lightning-fast, tailored web portals.",
  icons: {
    icon: "/favicon.png", // Next.js maps files in app/ automatically
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-[#1F2937] selection:bg-[#6B1D2F] selection:text-white">
        {children}
      </body>
    </html>
  );
}
