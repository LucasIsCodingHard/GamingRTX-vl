"use client"

import React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import {
  X,
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

export function PcBuilder({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [selection, setSelection] = useState<BuildSelection>({})
  const [activeSlot, setActiveSlot] = useState<BuilderSlot | null>(null)
  const { addToCart } = useCart()

  const totalPrice = getTotalPrice(selection)
  const wattage = estimateWattage(selection)
  const selectedCount = Object.keys(selection).length
  const isComplete = selectedCount === slotOrder.length

  const compatibleList = useMemo(() => {
    if (!activeSlot) return []
    return getCompatibleComponents(activeSlot, selection)
  }, [activeSlot, selection])

  function handleSelect(component: BuilderComponent) {
    setSelection((prev) => ({ ...prev, [component.slot]: component }))
    setActiveSlot(null)
  }

  function handleRemove(slot: BuilderSlot) {
    setSelection((prev) => {
      const next = { ...prev }
      delete next[slot]
      return next
    })
  }

  function handleReset() {
    setSelection({})
    setActiveSlot(null)
  }

  function handleAddAllToCart() {
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
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in md:inset-8 lg:inset-12"
        role="dialog"
        aria-label="Armador de PC"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            {activeSlot ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveSlot(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {activeSlot ? `Elegir ${slotLabels[activeSlot]}` : "Arma tu PC"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {activeSlot
                  ? `${compatibleList.length} opciones compatibles`
                  : `${selectedCount}/${slotOrder.length} componentes seleccionados`}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {!activeSlot ? (
            <>
              {/* Slot list */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid gap-3">
                  {slotOrder.map((slot, i) => {
                    const Icon = slotIcons[slot]
                    const selected = selection[slot]
                    return (
                      <div
                        key={slot}
                        className="flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 opacity-0 animate-fade-in-up transition-all hover:border-primary/30"
                        style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            selected ? "bg-primary/20" : "bg-secondary"
                          }`}
                        >
                          {selected ? (
                            <Check className="h-5 w-5 text-primary" />
                          ) : (
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {slotLabels[slot]}
                          </p>
                          {selected ? (
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground">
                                {selected.name}
                              </p>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                  selected.condition === "nuevo"
                                    ? "bg-foreground/10 text-foreground"
                                    : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {selected.condition === "nuevo" ? "Nuevo" : "Usado"}
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Sin seleccionar
                            </p>
                          )}
                        </div>
                        {selected && (
                          <p className="text-sm font-bold text-primary">
                            {formatPrice(selected.price)}
                          </p>
                        )}
                        <div className="flex gap-1">
                          {selected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemove(slot)}
                              className="text-xs text-muted-foreground hover:text-destructive"
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
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Summary sidebar */}
              <div className="border-t border-border bg-background p-6 lg:w-80 lg:border-l lg:border-t-0">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                  Resumen
                </h3>

                {selectedCount > 0 ? (
                  <div className="space-y-3">
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

                    <div className="border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Consumo estimado</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                          <Zap className="h-3.5 w-3.5 text-amber-400" />
                          {wattage}W
                        </span>
                      </div>
                    </div>

                    {selection.psu && wattage > (selection.psu.wattage ?? 0) * 0.8 && (
                      <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <p className="text-xs text-amber-300">
                          La fuente podria ser justa para esta configuracion. Considera una de mayor potencia.
                        </p>
                      </div>
                    )}

                    <div className="border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-foreground">Total</span>
                        <span className="font-display text-xl font-bold text-primary">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        size="lg"
                        className="w-full gap-2 font-semibold"
                        disabled={!isComplete}
                        onClick={handleAddAllToCart}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {isComplete ? "Agregar todo al carrito" : `Faltan ${slotOrder.length - selectedCount} componentes`}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Reiniciar configuracion
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Box className="mb-3 h-10 w-10 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      Selecciona componentes para ver el resumen de tu build
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Component picker */
            <div className="flex-1 overflow-y-auto p-6">
              {compatibleList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <AlertTriangle className="mb-3 h-10 w-10 text-amber-400" />
                  <p className="font-semibold text-foreground">
                    No hay opciones compatibles
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cambia otros componentes de tu build para ver opciones disponibles
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {compatibleList.map((comp, i) => {
                    const isSelected = selection[comp.slot]?.id === comp.id
                    return (
                      <button
                        key={comp.id}
                        onClick={() => handleSelect(comp)}
                        className={`flex flex-col rounded-xl border p-4 text-left opacity-0 animate-fade-in-up transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/60"
                        }`}
                        style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
                      >
                        <div className="relative mb-3 aspect-[3/2] overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={comp.image || "/placeholder.svg"}
                            alt={comp.name}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <Check className="h-3.5 w-3.5 text-primary-foreground" />
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
                        <p className="mt-auto pt-3 font-display text-lg font-bold text-primary">
                          {formatPrice(comp.price)}
                        </p>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
