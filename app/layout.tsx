import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pedro Brandão",
  description: "Personal professional website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} antialiased`}
      >
        {children}
        <footer className="w-full py-6 mt-12 border-t border-indigo-900 text-center text-md text-indigo-300">
          <p>Pedro Brandão © {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
