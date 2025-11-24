import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vidriería - Soluciones en Vidrio",
  description: "Tu vidriería de confianza para todo tipo de productos en vidrio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <Navbar />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
