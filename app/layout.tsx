import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquariuums",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <header className="w-full border-b border-white/6 py-3 px-6">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-white font-semibold">
              Aquarium
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-white/80 hover:text-white">
                Home
              </Link>
              <Link href="/login" className="text-white/80 hover:text-white">
                Login
              </Link>
              <Link href="/cadastro" className="text-white/80 hover:text-white">
                Cadastro
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
