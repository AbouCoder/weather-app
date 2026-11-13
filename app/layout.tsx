import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Effects } from "./components/icons/Effects";
import { TemperatureToggle } from "./components/TemperatureToggle";
import { TemperatureUnitProvider } from "./context/TemperatureUnitContext";
import { applySavedTemperatureUnitScript } from "./lib/temperature";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Check the weather for cities around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The font variable sits on <html>, where the page font is resolved
      className={inter.variable}
      data-temperature-unit="celsius"
      // The inline script below may change the unit before React hydrates
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: applySavedTemperatureUnitScript }}
        />
      </head>
      <body
        className="antialiased bg-linear-to-b from-slate-900 to-slate-950 text-foreground"
      >
        <Effects />
        <TemperatureUnitProvider>
          <header className="fixed top-0 left-0 w-full z-10 bg-header backdrop-blur-sm">
            <div className="max-w-xl mx-auto py-8 px-6 flex justify-between items-center">
              <h1 className="text-base font-semibold text-muted-foreground hover:text-foreground text-shadow-sm">
                <Link href="/">Weather</Link>
              </h1>
              <TemperatureToggle />
            </div>
          </header>
          <main className="min-h-screen">{children}</main>
        </TemperatureUnitProvider>
      </body>
    </html>
  );
}
