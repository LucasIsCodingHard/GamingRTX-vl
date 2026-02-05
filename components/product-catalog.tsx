"use client"

import { useState, useMemo, useCallback } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { ProductCard } from "./product-card"
import { CategoriesCarousel } from "./categories-carousel"

type Condition = "todos" | "nuevo" | "usado"
type Sort = "default" | "price-asc" | "price-desc"

const conditionOptions = [
  ["todos", "Todos"],
  ["nuevo", "Nuevos"],
  ["usado", "Usados"],
] as const

export function ProductCatalog({ searchQuery }: { searchQuery: string }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [condition, setCondition] = useState<Condition>("todos")
  const [sortBy, setSortBy] = useState<Sort>("default")

  const filtered = useMemo(() => {
    let result = products

    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (condition !== "todos") {
      result = result.filter((p) => p.condition === condition)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q))
      )
    }
    if (sortBy !== "default") {
      result = [...result].sort((a, b) =>
        sortBy === "price-asc" ? a.price - b.price : b.price - a.price
      )
    }
    return result
  }, [selectedCategory, condition, searchQuery, sortBy])

  const handleReset = useCallback(() => {
    setSelectedCategory("Todos")
    setCondition("todos")
  }, [])

  return (
    <section id="productos" className="py-12 sm:py-16" aria-label="Catalogo de productos">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Nuestros Productos
        </h2>
        <p className="mt-2 text-muted-foreground">
          Encontra el hardware perfecto para tu setup
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <CategoriesCarousel
          onCategorySelect={setSelectedCategory}
          activeCategory={selectedCategory}
        />
      </div>

      <div className="mx-auto mt-5 max-w-7xl px-4">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>

          <div className="flex gap-1 rounded-lg bg-secondary p-1" role="radiogroup" aria-label="Filtrar por condicion">
            {conditionOptions.map(([val, label]) => (
              <button
                key={val}
                type="button"
                role="radio"
                aria-checked={condition === val}
                onClick={() => setCondition(val as Condition)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  condition === val
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as Sort)}
            className="ml-auto rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Ordenar productos"
          >
            <option value="default">Relevancia</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>

          <span className="text-xs text-muted-foreground" aria-live="polite">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-7xl px-4">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
            <p className="text-lg font-semibold text-foreground">No se encontraron productos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta con otros filtros o busca algo diferente
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-border bg-transparent text-foreground"
              onClick={handleReset}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
