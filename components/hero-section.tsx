import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-gaming-pc.jpg"
          alt="PC Gaming de alta gama con iluminacion RGB"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 md:py-36 lg:py-44">
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Envios a todo el pais
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          <span className="text-balance">Tu proxima PC Gaming te espera</span>
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          PCs armadas de alto rendimiento y componentes gaming nuevos y usados. Los mejores precios del mercado con garantia.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="gap-2 font-semibold">
            <a href="#productos">
              Ver Productos
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold border-border text-foreground hover:bg-secondary hover:text-foreground bg-transparent">
            <a href="#vende">Vende tu Hardware</a>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap gap-8">
          {[
            { value: "500+", label: "PCs vendidas" },
            { value: "100%", label: "Garantia" },
            { value: "24hs", label: "Envio express" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
