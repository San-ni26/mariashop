"use client"

import { useEffect, useState } from "react"
import { Clock, ChevronDown, Calendar, PhoneCall, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BusinessHoursBadgeProps {
  variant?: "header" | "hero" | "card" | "banner"
  className?: string
}

const SCHEDULE = [
  { day: "Lundi", hours: "08:30 - 19:30", isOpenDay: true, openMin: 8 * 60 + 30, closeMin: 19 * 60 + 30 },
  { day: "Mardi", hours: "08:30 - 19:30", isOpenDay: true, openMin: 8 * 60 + 30, closeMin: 19 * 60 + 30 },
  { day: "Mercredi", hours: "08:30 - 19:30", isOpenDay: true, openMin: 8 * 60 + 30, closeMin: 19 * 60 + 30 },
  { day: "Jeudi", hours: "08:30 - 19:30", isOpenDay: true, openMin: 8 * 60 + 30, closeMin: 19 * 60 + 30 },
  { day: "Vendredi", hours: "08:30 - 19:30", isOpenDay: true, openMin: 8 * 60 + 30, closeMin: 19 * 60 + 30 },
  { day: "Samedi", hours: "09:00 - 19:00", isOpenDay: true, openMin: 9 * 60, closeMin: 19 * 60 },
  { day: "Dimanche", hours: "Fermé", isOpenDay: false, openMin: 0, closeMin: 0 },
]

export function BusinessHoursBadge({ variant = "header", className }: BusinessHoursBadgeProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1)
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkStatus = () => {
      const now = new Date()
      // get day index: 0 = Sun, 1 = Mon, ...
      const jsDay = now.getDay()
      // translate to our array index (0 = Mon, 6 = Sun)
      const index = jsDay === 0 ? 6 : jsDay - 1
      setCurrentDayIndex(index)

      const currentMin = now.getHours() * 60 + now.getMinutes()
      const todaySched = SCHEDULE[index]

      if (todaySched && todaySched.isOpenDay) {
        if (currentMin >= todaySched.openMin && currentMin < todaySched.closeMin) {
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      } else {
        setIsOpen(false)
      }
    }

    checkStatus()
    const timer = setInterval(checkStatus, 60000)
    return () => clearInterval(timer)
  }, [])

  if (variant === "banner") {
    return (
      <div className={cn("bg-primary text-primary-foreground text-xs py-1.5 px-4", className)}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <Clock className="size-3.5 text-accent animate-pulse" />
            <span>
              <strong>Heures de travail :</strong> Lun - Sam : 08h30 - 19h30 | Dim : Fermé
            </span>
          </div>
          {mounted && (
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    isOpen ? "bg-emerald-400" : "bg-amber-400"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex size-2 rounded-full",
                    isOpen ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
              </span>
              <span className="font-semibold">{isOpen ? "Ouvert actuellement" : "Fermé actuellement"}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Clock className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Horaires d&apos;ouverture</h3>
              <p className="text-xs text-muted-foreground">Heures de travail ouvrables</p>
            </div>
          </div>
          {mounted && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border",
                isOpen
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full animate-pulse",
                  isOpen ? "bg-emerald-500" : "bg-amber-500"
                )}
              />
              {isOpen ? "Ouvert" : "Fermé"}
            </span>
          )}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {SCHEDULE.map((item, idx) => {
            const isToday = mounted && currentDayIndex === idx
            return (
              <div
                key={item.day}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-1.5 transition-colors",
                  isToday
                    ? "bg-accent/15 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <span className="flex items-center gap-2">
                  {item.day}
                  {isToday && (
                    <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] uppercase font-bold text-accent">
                      Aujourd&apos;hui
                    </span>
                  )}
                </span>
                <span className={item.isOpenDay ? "text-foreground font-medium" : "text-muted-foreground italic"}>
                  {item.hours}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 p-3 text-xs">
          <span className="flex items-center gap-2 text-muted-foreground">
            <PhoneCall className="size-4 text-accent" />
            Service client disponible aux heures d&apos;ouverture
          </span>
        </div>
      </div>
    )
  }

  // Header / Default compact dropdown badge
  return (
    <div className={cn("relative inline-block", className)}>
      <button
        onClick={() => setShowPopover((prev) => !prev)}
        onMouseEnter={() => setShowPopover(true)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-accent hover:bg-card shadow-sm cursor-pointer"
        )}
        aria-expanded={showPopover}
        aria-label="Voir les heures de travail ouvrables"
      >
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-accent transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline text-muted-foreground">Horaires :</span>
          <span className="font-semibold text-foreground">Lun-Sam 8h30-19h30</span>
        </span>

        {mounted && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold border",
              isOpen
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full animate-pulse",
                isOpen ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
            {isOpen ? "Ouvert" : "Fermé"}
          </span>
        )}

        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            showPopover && "rotate-180"
          )}
        />
      </button>

      {/* Popover detailed schedule */}
      {showPopover && (
        <div
          onMouseLeave={() => setShowPopover(false)}
          className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 z-50 w-72 origin-top-right rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Heures de travail
              </span>
            </div>
            {mounted && (
              <span
                className={cn(
                  "flex items-center gap-1 text-[11px] font-semibold",
                  isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                )}
              >
                {isOpen ? (
                  <>
                    <CheckCircle2 className="size-3.5" /> En service
                  </>
                ) : (
                  <>
                    <XCircle className="size-3.5" /> Fermé
                  </>
                )}
              </span>
            )}
          </div>

          <div className="mt-3 space-y-1 text-xs">
            {SCHEDULE.map((item, idx) => {
              const isToday = mounted && currentDayIndex === idx
              return (
                <div
                  key={item.day}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1 transition-colors",
                    isToday
                      ? "bg-accent/15 font-bold text-foreground"
                      : "text-muted-foreground hover:bg-secondary/40"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {item.day}
                    {isToday && (
                      <span className="rounded bg-accent/20 px-1 py-0.2 text-[9px] text-accent">
                        Auj.
                      </span>
                    )}
                  </span>
                  <span className={item.isOpenDay ? "font-medium text-foreground" : "italic text-muted-foreground"}>
                    {item.hours}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground text-center">
            📞 Service client disponible durant les heures ouvrables
          </div>
        </div>
      )}
    </div>
  )
}
