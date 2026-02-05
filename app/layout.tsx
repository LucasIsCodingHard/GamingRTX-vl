import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Rajdhani } from 'next/font/google'

import './globals.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const _rajdhani = Rajdhani({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-rajdhani' })

export const metadata: Metadata = {
  title: 'gamingRTX - PCs Armadas y Componentes Gaming',
  description: 'Tienda de PCs armadas y componentes gaming nuevos y usados. Compramos y vendemos hardware.',
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
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
