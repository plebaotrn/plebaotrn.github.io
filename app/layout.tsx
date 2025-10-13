import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { ClickEffect } from "@/components/click-effect"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "BlogSpace - Modern Blog Platform",
  description: "A beautiful blog with gradient themes and smooth animations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased cursor-none`}>
        <ThemeProvider defaultTheme="light">
          <CustomCursor />
          <ClickEffect />
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
