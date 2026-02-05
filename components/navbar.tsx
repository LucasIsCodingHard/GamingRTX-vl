"use client"

import React from "react"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function Navbar({
  onSearchChange,
  onLoginOpen,
  searchValue,
}: {
  onSearchChange: (value: string) => void
  onLoginOpen: () => void
  searchValue: string
}) {
  const { totalItems, setIsOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange]
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Navegacion principal">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="gamingRTX - Inicio">
          <Image
            src="/images/logo-gamingrtx.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-lg"
            loading="eager"
          />
          <span className="font-display text-xl font-bold tracking-wide text-foreground">
            gaming<span className="text-primary">RTX</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {[
            { label: "Inicio", href: "#inicio" },
            { label: "Productos", href: "#productos" },
            { label: "Arma tu PC", href: "#arma-tu-pc" },
            { label: "Vende tu Hardware", href: "#vende" },
            { label: "Contacto", href: "#contacto" },
          ].map((link) =>
            link.label === "Arma tu PC" ? (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
              >
                <Cpu className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-primary"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar productos..."
              value={searchValue}
              onChange={handleSearchChange}
              className="h-9 w-48 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary lg:w-64"
              aria-label="Buscar productos"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onLoginOpen}
            className="text-muted-foreground hover:text-primary"
            aria-label="Iniciar sesion"
          >
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="relative text-muted-foreground hover:text-primary"
            aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} productos` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          <div className="relative mb-3 mt-3 sm:hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar productos..."
              value={searchValue}
              onChange={handleSearchChange}
              className="h-9 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Buscar productos"
            />
          </div>
          <ul className="flex flex-col gap-1" role="list">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Productos", href: "#productos" },
              { label: "Vende tu Hardware", href: "#vende" },
              { label: "Contacto", href: "#contacto" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#arma-tu-pc"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-primary/10"
              >
                <Cpu className="h-4 w-4" aria-hidden="true" />
                Arma tu PC
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
