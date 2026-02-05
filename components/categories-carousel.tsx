"use client"

import { useRef, useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Tv,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryItems = [
  { label: "PCs Armadas", icon: Layers, color: "from-primary/20 to-primary/5" },
  { label: "Placas de Video", icon: Monitor, color: "from-primary/20 to-primary/5" },
  { label: "Procesadores", icon: Cpu, color: "from-primary/20 to-primary/5" },
  { label: "Motherboards", icon: CircuitBoard, color: "from-primary/20 to-primary/5" },
  { label: "Memorias RAM", icon: MemoryStick, color: "from-primary/20 to-primary/5" },
  { label: "Almacenamiento", icon: HardDrive, color: "from-primary/20 to-primary/5" },
  { label: "Fuentes", icon: Zap, color: "from-primary/20 to-primary/5" },
  { label: "Gabinetes", icon: Box, color: "from-primary/20 to-primary/5" },
  { label: "Monitores", icon: Tv, color: "from-primary/20 to-primary/5" },
]

export function CategoriesCarousel({
  onCategorySelect,
  activeCategory,
}: {
  onCategorySelect: (category: string) => void
  activeCategory: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener("scroll", checkScroll, { passive: true })
    return () => el?.removeEventListener("scroll", checkScroll)
  }, [])

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" })
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      {/* Arrows */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute -left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-card text-foreground shadow-lg md:flex bg-transparent"
          aria-label="Scroll izquierda"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute -right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-card text-foreground shadow-lg md:flex bg-transparent"
          aria-label="Scroll derecha"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-3 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Categorias de productos"
      >
        {/* All */}
        <button
          role="tab"
          aria-selected={activeCategory === "Todos"}
          onClick={() => onCategorySelect("Todos")}
          className={`flex shrink-0 flex-col items-center gap-2 rounded-xl border px-5 py-4 transition-all ${
            activeCategory === "Todos"
              ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <Layers className="h-6 w-6" />
          <span className="text-xs font-semibold">Todos</span>
        </button>

        {categoryItems.map((cat, i) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.label
          return (
            <button
              key={cat.label}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategorySelect(cat.label)}
              className={`flex shrink-0 flex-col items-center gap-2 rounded-xl border px-5 py-4 transition-all ${
                isActive
                  ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Icon className="h-6 w-6" />
              <span className="whitespace-nowrap text-xs font-semibold">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
