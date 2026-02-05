"use client"

import Image from "next/image"
import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart()

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card opacity-0 animate-fade-in-up transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="gap-1.5 font-semibold"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar al carrito
          </Button>
        </div>
        <div className="absolute left-2 top-2 flex gap-1.5">
          {product.badge && (
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
              {product.badge}
            </span>
          )}
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
              product.condition === "nuevo"
                ? "bg-foreground/90 text-background"
                : "bg-amber-500 text-background"
            }`}
          >
            {product.condition === "nuevo" ? "Nuevo" : "Usado"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
          {product.category}
        </p>
        <h3 className="mb-2 text-sm font-bold leading-snug text-foreground lg:text-base">
          {product.name}
        </h3>

        <ul className="mb-4 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 3).map((spec) => (
            <li
              key={spec}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="font-display text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="gap-1.5 font-semibold transition-transform hover:scale-105"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export { formatPrice }
