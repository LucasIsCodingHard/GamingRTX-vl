import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

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
