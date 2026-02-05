import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Rajdhani } from "next/font/google"

import "./globals.css"

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})
const _rajdhani = Rajdhani({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
})

export const metadata: Metadata = {
  title: "gamingRTX | PCs Armadas y Componentes Gaming - Nuevos y Usados",
  description:
    "Tienda online de PCs armadas y componentes gaming nuevos y usados. Placas de video, procesadores, memorias RAM, motherboards y mas. Arma tu PC con componentes compatibles. Envios a todo el pais.",
  keywords: [
    "pc gamer",
    "pc armadas",
    "componentes gaming",
    "placa de video",
    "rtx",
    "procesadores",
    "memorias ram",
    "motherboard",
    "hardware usado",
    "tienda gaming argentina",
  ],
  openGraph: {
    title: "gamingRTX | PCs Armadas y Componentes Gaming",
    description:
      "PCs armadas de alto rendimiento y componentes gaming nuevos y usados con garantia.",
    type: "website",
    locale: "es_AR",
    siteName: "gamingRTX",
  },
  twitter: {
    card: "summary_large_image",
    title: "gamingRTX | PCs Armadas y Componentes Gaming",
    description:
      "PCs armadas de alto rendimiento y componentes gaming nuevos y usados con garantia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gamingrtx.com",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
