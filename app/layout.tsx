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
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-x-0 -top-24 h-[480px] c-bg-gradient-hero blur-3xl opacity-70 dark:opacity-80" />

          <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full c-bg-conic-orbit opacity-30 blur-2xl" />

          <div className="absolute -bottom-24 inset-x-0 h-[380px] bg-gradient-to-t from-emerald-500/15 via-cyan-400/10 to-transparent blur-3xl" />

          <div className="c-aurora" />
        </div>

        <div className="mx-auto max-w-6xl px-4">{children}</div>
      </body>
    </html>
  );
}
