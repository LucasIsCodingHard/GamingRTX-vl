"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  MessageCircle,
  X,
  Send,
  Cpu,
  TicketCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

function getMessageText(
  parts: { type: string; text?: string }[] | undefined
): string {
  if (!parts || !Array.isArray(parts)) return ""
  return parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof p.text === "string"
    )
    .map((p) => p.text)
    .join("")
}

type WidgetView = "chat" | "ticket"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<WidgetView>("chat")
  const [input, setInput] = useState("")
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return
      sendMessage({ text: input })
      setInput("")
    },
    [input, isLoading, sendMessage]
  )

  const handleTicketSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      // In production this would call an API
      setTicketSubmitted(true)
      setTimeout(() => {
        setTicketSubmitted(false)
        setTicketForm({ name: "", email: "", subject: "", message: "" })
        setView("chat")
      }, 3000)
    },
    []
  )

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl ${
          isOpen ? "rotate-0" : ""
        }`}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
            <div className="flex items-center gap-2.5">
              {view === "ticket" && (
                <button
                  type="button"
                  onClick={() => setView("chat")}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Volver al chat"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                {view === "chat" ? (
                  <Cpu className="h-4 w-4 text-primary" />
                ) : (
                  <TicketCheck className="h-4 w-4 text-primary" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {view === "chat" ? "Asistente PC" : "Soporte"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {view === "chat"
                    ? "Te ayudo a armar tu PC"
                    : "Crear ticket de soporte"}
                </p>
              </div>
            </div>
            {view === "chat" && (
              <button
                type="button"
                onClick={() => setView("ticket")}
                className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Crear ticket de soporte"
              >
                <TicketCheck className="h-3 w-3" />
                Soporte
              </button>
            )}
          </div>

          {view === "chat" ? (
            <>
              {/* Messages area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4"
              >
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Cpu className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Hola! Soy tu asistente
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Preguntame sobre armado de PCs, compatibilidad de componentes o recomendaciones.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {[
                        "PC gamer por $800.000",
                        "RTX 4060 vs 3070 Ti usada",
                        "AM5 o LGA1700?",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => {
                            sendMessage({ text: suggestion })
                          }}
                          className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {messages.map((message) => {
                    const text = getMessageText(
                      message.parts as { type: string; text?: string }[]
                    )
                    if (!text) return null
                    const isUser = message.role === "user"
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            isUser
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-secondary text-foreground rounded-bl-md"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{text}</p>
                        </div>
                      </div>
                    )
                  })}
                  {isLoading &&
                    messages.length > 0 &&
                    messages[messages.length - 1].role === "user" && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-3.5 py-2.5 rounded-bl-md">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground">
                            Pensando...
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Input area */}
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 border-t border-border bg-background px-3 py-2.5"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={isLoading}
                  aria-label="Mensaje al asistente"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </>
          ) : (
            /* Ticket / Support form */
            <div className="flex-1 overflow-y-auto p-4">
              {ticketSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <TicketCheck className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Ticket enviado
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Te contactaremos a la brevedad por email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">
                    Si el asistente no pudo resolver tu consulta, crea un ticket y nuestro equipo te contactara.
                  </p>
                  <div>
                    <label
                      htmlFor="ticket-name"
                      className="mb-1 block text-xs font-medium text-foreground"
                    >
                      Nombre
                    </label>
                    <input
                      id="ticket-name"
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) =>
                        setTicketForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ticket-email"
                      className="mb-1 block text-xs font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="ticket-email"
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) =>
                        setTicketForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ticket-subject"
                      className="mb-1 block text-xs font-medium text-foreground"
                    >
                      Asunto
                    </label>
                    <input
                      id="ticket-subject"
                      type="text"
                      required
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm((f) => ({
                          ...f,
                          subject: e.target.value,
                        }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Asunto del ticket"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ticket-message"
                      className="mb-1 block text-xs font-medium text-foreground"
                    >
                      Descripcion
                    </label>
                    <textarea
                      id="ticket-message"
                      required
                      value={ticketForm.message}
                      onChange={(e) =>
                        setTicketForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe tu consulta o problema..."
                    />
                  </div>
                  <Button type="submit" size="sm" className="w-full gap-1.5 font-semibold">
                    <TicketCheck className="h-3.5 w-3.5" />
                    Enviar Ticket
                  </Button>
                  <div className="text-center">
                    <a
                      href="#contacto"
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-primary"
                    >
                      O contactanos directamente
                    </a>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
