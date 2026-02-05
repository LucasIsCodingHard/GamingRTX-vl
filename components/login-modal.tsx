"use client"

import { useState, useCallback } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toggleMode = useCallback(() => setIsRegister((v) => !v), [])
  const togglePassword = useCallback(() => setShowPassword((v) => !v), [])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-scale-in sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={isRegister ? "Registro" : "Iniciar sesion"}
          onClick={(e) => e.stopPropagation()}
        >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {isRegister ? "Crear Cuenta" : "Iniciar Sesion"}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {isRegister
                ? "Registrate para comprar y vender"
                : "Accede a tu cuenta gamingRTX"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onClose() }}
          className="space-y-4"
        >
          {isRegister && (
            <div>
              <label htmlFor="login-name" className="mb-1.5 block text-sm font-medium text-foreground">
                Nombre completo
              </label>
              <input
                id="login-name"
                type="text"
                placeholder="Tu nombre"
                autoComplete="name"
                className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-foreground">
              Contrasena
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contrasena"
                autoComplete={isRegister ? "new-password" : "current-password"}
                className="h-10 w-full rounded-lg border border-border bg-secondary px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full font-semibold" size="lg">
            {isRegister ? "Crear Cuenta" : "Iniciar Sesion"}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary"
          >
            {isRegister
              ? "Ya tenes cuenta? Inicia sesion"
              : "No tenes cuenta? Registrate"}
          </button>
        </div>
        </div>
      </div>
    </>
  )
}
