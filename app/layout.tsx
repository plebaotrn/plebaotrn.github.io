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
    "Software Developer and UX Designer specialising in web application development, UI/UX design, and human-centred digital experiences. Based in Melbourne, Australia.",
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
          <div className="flex min-h-screen flex-col page-enter">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
