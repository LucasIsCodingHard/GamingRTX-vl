"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/products"
import { ProductCard } from "./product-card"

export function ProductCatalog({ searchQuery }: { searchQuery: string }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [condition, setCondition] = useState<"todos" | "nuevo" | "usado">("todos")
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

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

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price)

    return result
  }, [selectedCategory, condition, searchQuery, sortBy])

  return (
    <section id="productos" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Nuestros Productos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} disponible
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border text-foreground md:hidden bg-transparent"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar filters */}
        <aside
          className={`shrink-0 lg:w-56 ${showFilters ? "block" : "hidden"} lg:block`}
        >
          <div className="space-y-6 rounded-xl border border-border bg-card p-4">
            {/* Categories */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categorias
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estado
              </h3>
              <div className="flex flex-col gap-1">
                {([
                  ["todos", "Todos"],
                  ["nuevo", "Nuevos"],
                  ["usado", "Usados"],
                ] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setCondition(val)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      condition === val
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ordenar por
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Relevancia</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
