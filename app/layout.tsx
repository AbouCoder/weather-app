import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { WeatherIconDefs } from "@/components/icons/WeatherIconDefs";
import { PageContainer } from "@/components/shared/PageContainer";
import { TemperatureUnitToggle } from "@/components/temperature/TemperatureUnitToggle";
import { TemperatureUnitProvider } from "@/context/TemperatureUnitContext";
import { applySavedTemperatureUnitScript } from "@/lib/temperature";

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
        <WeatherIconDefs />
        <TemperatureUnitProvider>
          <header className="fixed top-0 left-0 w-full z-10 bg-header backdrop-blur-sm">
            <PageContainer className="py-8 flex justify-between items-center">
              {/* The app name is a plain link; each page has its own <h1> */}
              <Link
                href="/"
                className="text-base font-semibold text-muted-foreground hover:text-foreground text-shadow-sm"
              >
                Weather
              </Link>
              <TemperatureUnitToggle />
            </PageContainer>
          </header>
          <main className="min-h-screen">{children}</main>
        </TemperatureUnitProvider>
        <Toaster />
      </body>
    </html>
  );
}
