import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craftex — Modern Web & Apps",
  description: "Craftex ile modern web uygulamaları.",
  metadataBase: new URL("https://craftex.com.tr"),
  openGraph: {
    title: "Craftex",
    url: "https://craftex.com.tr",
    siteName: "Craftex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        <div className="mx-auto max-w-6xl px-4">{children}</div>
      </body>
    </html>
  );
}
