import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundMusic } from "@/components/background-music"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Pham Le Bao Tran — Software Developer",
  description:
    "Software Developer specialising in web application development and UI/UX design. Based in Melbourne, Australia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="light">
          <BackgroundMusic />
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
