"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronRight, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "500+", label: "PCs vendidas" },
  { value: "100%", label: "Garantia" },
  { value: "24hs", label: "Envio express" },
]

export function HeroSection({ onBuilderOpen }: { onBuilderOpen: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Use requestAnimationFrame to batch the paint
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const show = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"

  return (
    <section id="inicio" className="relative overflow-hidden" aria-label="Hero principal">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-gaming-pc.jpg"
          alt="PC Gaming de alta gama con iluminacion RGB"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:py-28 md:py-36 lg:py-44">
        <span
          className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-[opacity,transform] duration-500 ${show}`}
        >
          Envios a todo el pais
        </span>

        <h1
          className={`max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl transition-[opacity,transform] duration-500 delay-75 ${show}`}
        >
          <span className="text-balance">
            Tu proxima <span className="text-primary">PC Gaming</span> te espera
          </span>
        </h1>

        <p
          className={`mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg transition-[opacity,transform] duration-500 delay-150 ${show}`}
        >
          PCs armadas de alto rendimiento y componentes gaming nuevos y usados. Los mejores precios del mercado con garantia.
        </p>

        <div
          className={`mt-6 flex flex-wrap gap-3 sm:mt-8 transition-[opacity,transform] duration-500 delay-200 ${show}`}
        >
          <Button asChild size="lg" className="gap-2 font-semibold">
            <a href="#productos">
              Ver Productos
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-primary/40 bg-primary/10 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onBuilderOpen}
          >
            <Cpu className="h-4 w-4" aria-hidden="true" />
            Arma tu PC
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold border-border text-foreground hover:bg-secondary bg-transparent">
            <a href="#vende">Vende tu Hardware</a>
          </Button>
        </div>

        <dl
          className={`mt-8 flex flex-wrap gap-8 sm:mt-10 transition-[opacity,transform] duration-500 delay-300 ${show}`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-primary">{stat.value}</dd>
              <dd className="text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
