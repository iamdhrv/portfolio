import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhruv Maniya | Terminal",
  description: "Minimal terminal portfolio for Dhruv Maniya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-zinc-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}