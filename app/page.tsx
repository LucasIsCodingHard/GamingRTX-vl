"use client"

import { useState, lazy, Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCatalog } from "@/components/product-catalog"
import { CartDrawer } from "@/components/cart-drawer"
import { LoginModal } from "@/components/login-modal"
import { SellSection } from "@/components/sell-section"
import { SiteFooter } from "@/components/site-footer"

const PcBuilder = lazy(() =>
  import("@/components/pc-builder").then((m) => ({ default: m.PcBuilder }))
)

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loginOpen, setLoginOpen] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onLoginOpen={() => setLoginOpen(true)}
          onBuilderOpen={() => setBuilderOpen(true)}
        />
        <main className="flex-1">
          <HeroSection onBuilderOpen={() => setBuilderOpen(true)} />
          <ProductCatalog searchQuery={searchQuery} />
          <SellSection />
        </main>
        <SiteFooter />
        <CartDrawer />
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        {builderOpen && (
          <Suspense fallback={null}>
            <PcBuilder isOpen={builderOpen} onClose={() => setBuilderOpen(false)} />
          </Suspense>
        )}
      </div>
    </CartProvider>
  )
}
