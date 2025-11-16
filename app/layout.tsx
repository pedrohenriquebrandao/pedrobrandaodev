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
          <div className="flex justify-center gap-5 text-indigo-300">
            {/* GitHub */}
            <a
              href="https://github.com/pedrohenriquebrandao"
              target="_blank"
              className="hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.55-3.87-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.74.08-.73.08-.73 1.17.08 1.78 1.2 1.78 1.2 1.04 1.8 2.73 1.28 3.4.98.1-.76.41-1.28.74-1.57-2.55-.29-5.23-1.29-5.23-5.76 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.2a10.8 10.8 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.51 3.17-1.2 3.17-1.2.63 1.59.23 2.76.11 3.05.75.81 1.2 1.85 1.2 3.12 0 4.49-2.69 5.46-5.25 5.75.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/pedrohenriquebrandao/"
              target="_blank"
              className="hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zm7 0h3.7v1.64h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.6 4.7 5.98V21h-4v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.22V21h-4z" />
              </svg>
            </a>
          </div>
          <p className="mb-3 mt-3">Pedro Brandão © {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
