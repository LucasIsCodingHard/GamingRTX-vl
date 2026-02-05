"use client"

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "./product-card"

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-background/80 animate-fade-in"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-foreground">Carrito</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
              <p className="font-semibold text-foreground">Tu carrito esta vacio</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-border bg-secondary/50 p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {/* Use native img for small thumbnails - avoids Next/Image overhead */}
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold leading-snug text-foreground">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-xs text-primary">{formatPrice(product.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-border text-foreground bg-transparent"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-7 text-center text-sm font-medium text-foreground">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-border text-foreground bg-transparent"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Eliminar ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-xl font-bold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Button className="w-full font-semibold" size="lg">
              Finalizar Compra
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="mt-2 w-full text-muted-foreground hover:text-destructive"
            >
              Vaciar carrito
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
