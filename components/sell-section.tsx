"use client"

import Image from "next/image"
import { Upload, DollarSign, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Upload,
    title: "Publica tu producto",
    description: "Subi fotos y detalles de tu componente. Es rapido y sencillo.",
  },
  {
    icon: DollarSign,
    title: "Recibis una oferta",
    description: "Nuestro equipo evalua y te hace una oferta justa en 24 horas.",
  },
  {
    icon: Truck,
    title: "Envio o retiro",
    description: "Coordinamos el envio o podes acercarte a nuestro local.",
  },
  {
    icon: ShieldCheck,
    title: "Cobras al instante",
    description: "Transferencia inmediata una vez recibido y verificado el producto.",
  },
]

export function SellSection() {
  return (
    <section id="vende" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/sell-components.jpg"
              alt="Componentes de PC listos para vender"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
                Compramos tu hardware usado
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Vende tu hardware
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Tus componentes usados valen plata</span>
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Renova tu setup y recupera parte de tu inversion. Aceptamos placas de video, procesadores, memorias, motherboards y mas. Proceso simple, transparente y seguro.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="mt-8 font-semibold">
              Quiero vender mi hardware
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
