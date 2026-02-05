"use client"

import { useRef, useState, useEffect, useCallback } from "react"
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
  { label: "PCs Armadas", Icon: Monitor },
  { label: "Placas de Video", Icon: Monitor },
  { label: "Procesadores", Icon: Cpu },
  { label: "Motherboards", Icon: CircuitBoard },
  { label: "Memorias RAM", Icon: MemoryStick },
  { label: "Almacenamiento", Icon: HardDrive },
  { label: "Fuentes", Icon: Zap },
  { label: "Gabinetes", Icon: Box },
  { label: "Monitores", Icon: Tv },
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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    return () => el.removeEventListener("scroll", checkScroll)
  }, [checkScroll])

  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" })
  }, [])

  const baseClass = "flex shrink-0 flex-col items-center gap-2 rounded-xl border px-5 py-3.5 transition-colors duration-150"
  const activeClass = "border-primary bg-primary/10 text-primary"
  const inactiveClass = "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute -left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-card text-foreground shadow-lg md:flex"
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
          className="absolute -right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-card text-foreground shadow-lg md:flex"
          aria-label="Scroll derecha"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-3 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Categorias de productos"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "Todos"}
          onClick={() => onCategorySelect("Todos")}
          className={`${baseClass} ${activeCategory === "Todos" ? activeClass : inactiveClass}`}
        >
          <Layers className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Todos</span>
        </button>

        {categoryItems.map((cat) => {
          const isActive = activeCategory === cat.label
          return (
            <button
              type="button"
              key={cat.label}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategorySelect(cat.label)}
              className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
              <cat.Icon className="h-5 w-5" aria-hidden="true" />
              <span className="whitespace-nowrap text-xs font-semibold">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
