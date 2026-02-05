"use client"

import { useState } from "react"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCatalog } from "@/components/product-catalog"
import { CartDrawer } from "@/components/cart-drawer"
import { LoginModal } from "@/components/login-modal"
import { SellSection } from "@/components/sell-section"
import { SiteFooter } from "@/components/site-footer"
import { PcBuilder } from "@/components/pc-builder"
import { ChatWidget } from "@/components/chat-widget"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onLoginOpen={() => setLoginOpen(true)}
        />
        <main className="flex-1">
          <HeroSection />
          <ProductCatalog searchQuery={searchQuery} />
          <PcBuilder />
          <SellSection />
        </main>
        <SiteFooter />
        <CartDrawer />
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <ChatWidget />
      </div>
    </CartProvider>
  )
}
