import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { AuthProvider } from "@/hooks/use-auth";
import { LogoutButton } from "@/components/logout-button";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquarium",
  description: "Meu aquário",
  icons: {
    icon: "/Aquarium.png",
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
        <AuthProvider>
          <header className="w-full border-b border-white/6 py-3 px-6">
            <nav className="max-w-6xl mx-auto flex items-center">
              <Link href="/" className="text-white font-semibold">
                Aquarium
              </Link>
              <LogoutButton />
            </nav>
          </header>
          <main className="max-w-6xl mx-auto">{children}</main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
