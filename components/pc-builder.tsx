"use client"

import React, { useState, useMemo, useCallback } from "react"
import {
  Cpu,
  CircuitBoard,
  Monitor,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Check,
  ChevronRight,
  ShoppingCart,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import {
  type BuilderSlot,
  type BuildSelection,
  type BuilderComponent,
  slotLabels,
  slotOrder,
  getCompatibleComponents,
  estimateWattage,
  getTotalPrice,
} from "@/lib/pc-builder-data"

const slotIcons: Record<BuilderSlot, React.ElementType> = {
  cpu: Cpu,
  motherboard: CircuitBoard,
  gpu: Monitor,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Zap,
  case: Box,
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price)
}

export function PcBuilder() {
  const [selection, setSelection] = useState<BuildSelection>({})
  const [activeSlot, setActiveSlot] = useState<BuilderSlot | null>(null)
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  const totalPrice = getTotalPrice(selection)
  const wattage = estimateWattage(selection)
  const selectedCount = Object.keys(selection).length
  const isComplete = selectedCount === slotOrder.length

  const compatibleList = useMemo(() => {
    if (!activeSlot) return []
    return getCompatibleComponents(activeSlot, selection)
  }, [activeSlot, selection])

  const handleSelect = useCallback((component: BuilderComponent) => {
    setSelection((prev) => ({ ...prev, [component.slot]: component }))
    setActiveSlot(null)
  }, [])

  const handleRemove = useCallback((slot: BuilderSlot) => {
    setSelection((prev) => {
      const next = { ...prev }
      delete next[slot]
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setSelection({})
    setActiveSlot(null)
    setAddedToCart(false)
  }, [])

  const handleAddAllToCart = useCallback(() => {
    for (const comp of Object.values(selection)) {
      if (comp) {
        addToCart({
          id: Math.random() * 100000,
          name: comp.name,
          category: slotLabels[comp.slot],
          price: comp.price,
          condition: comp.condition,
          image: comp.image,
          specs: comp.specs,
        })
      }
    }
    setAddedToCart(true)
  }, [selection, addToCart])

  return (
    <section id="arma-tu-pc" className="border-t border-border bg-card" aria-label="Armador de PC">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Cpu className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Arma tu PC
            </h2>
            <p className="text-sm text-muted-foreground">
              Selecciona componentes compatibles y arma tu PC ideal
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Active slot picker (component selection view) */}
        {activeSlot ? (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSlot(null)}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Elegir {slotLabels[activeSlot]}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {compatibleList.length} opciones compatibles
                </p>
              </div>
            </div>

            {compatibleList.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-secondary/30 py-20 text-center">
                <AlertTriangle className="mb-3 h-10 w-10 text-amber-400" aria-hidden="true" />
                <p className="font-semibold text-foreground">No hay opciones compatibles</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cambia otros componentes para ver opciones disponibles
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {compatibleList.map((comp) => {
                  const isSelected = selection[comp.slot]?.id === comp.id
                  return (
                    <button
                      type="button"
                      key={comp.id}
                      onClick={() => handleSelect(comp)}
                      className={`flex flex-col rounded-xl border p-3 text-left transition-[border-color,background-color] duration-150 sm:p-4 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/60"
                      }`}
                    >
                      <div className="relative mb-2.5 aspect-[3/2] overflow-hidden rounded-lg bg-secondary">
                        <img
                          src={comp.image || "/placeholder.svg"}
                          alt={comp.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" aria-hidden="true" />
                          </div>
                        )}
                        <span
                          className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-semibold ${
                            comp.condition === "nuevo"
                              ? "bg-foreground/90 text-background"
                              : "bg-amber-500 text-background"
                          }`}
                        >
                          {comp.condition === "nuevo" ? "Nuevo" : "Usado"}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-foreground">{comp.name}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {comp.specs.map((s) => (
                          <span
                            key={s}
                            className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="mt-auto pt-2.5 font-display text-lg font-bold text-primary">
                        {formatPrice(comp.price)}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          /* Main builder view: slot list + summary */
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Slot list */}
            <div className="flex-1">
              <div className="grid gap-2.5">
                {slotOrder.map((slot) => {
                  const Icon = slotIcons[slot]
                  const selected = selection[slot]
                  return (
                    <div
                      key={slot}
                      className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3 transition-[border-color] duration-150 hover:border-primary/30 sm:gap-4 sm:p-4"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                          selected ? "bg-primary/20" : "bg-secondary"
                        }`}
                      >
                        {selected ? (
                          <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                        ) : (
                          <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {slotLabels[slot]}
                        </p>
                        {selected ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {selected.name}
                            </p>
                            <span
                              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                selected.condition === "nuevo"
                                  ? "bg-foreground/10 text-foreground"
                                  : "bg-amber-500/20 text-amber-400"
                              }`}
                            >
                              {selected.condition === "nuevo" ? "Nuevo" : "Usado"}
                            </span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Sin seleccionar</p>
                        )}
                      </div>
                      {selected && (
                        <p className="hidden text-sm font-bold text-primary sm:block">
                          {formatPrice(selected.price)}
                        </p>
                      )}
                      <div className="flex shrink-0 gap-1">
                        {selected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(slot)}
                            className="hidden text-xs text-muted-foreground hover:text-destructive sm:flex"
                          >
                            Quitar
                          </Button>
                        )}
                        <Button
                          variant={selected ? "outline" : "default"}
                          size="sm"
                          onClick={() => setActiveSlot(slot)}
                          className={`gap-1 ${selected ? "border-border bg-transparent text-foreground" : ""}`}
                        >
                          {selected ? "Cambiar" : "Elegir"}
                          <ChevronRight className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="rounded-2xl border border-border bg-background p-5 sm:p-6 lg:w-80 xl:w-96 lg:sticky lg:top-24 lg:self-start">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">Resumen</h3>
              {selectedCount > 0 ? (
                <div className="space-y-2.5">
                  {slotOrder.map((slot) => {
                    const comp = selection[slot]
                    if (!comp) return null
                    return (
                      <div key={slot} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{slotLabels[slot]}</span>
                        <span className="font-medium text-foreground">
                          {formatPrice(comp.price)}
                        </span>
                      </div>
                    )
                  })}

                  <div className="border-t border-border pt-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Consumo estimado</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Zap className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        {wattage}W
                      </span>
                    </div>
                  </div>

                  {selection.psu && wattage > (selection.psu.wattage ?? 0) * 0.8 && (
                    <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5" role="alert">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                      <p className="text-xs text-amber-300">
                        La fuente podria ser justa. Considera una de mayor potencia.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-border pt-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-foreground">Total</span>
                      <span className="font-display text-xl font-bold text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    {addedToCart ? (
                      <div className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-3 text-sm font-semibold text-primary">
                        <Check className="h-4 w-4" />
                        Agregado al carrito
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full gap-2 font-semibold"
                        disabled={!isComplete}
                        onClick={handleAddAllToCart}
                      >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        {isComplete
                          ? "Agregar todo al carrito"
                          : `Faltan ${slotOrder.length - selectedCount}`}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="gap-1.5 text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Box className="mb-3 h-10 w-10 text-muted-foreground/30" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    Selecciona componentes para ver el resumen
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
