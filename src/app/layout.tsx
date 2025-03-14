import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoshan Mumberson",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-white dark:bg-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="py-20 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          {children}
        </div>
      </body>
    </html>
  );
}
