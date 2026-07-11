"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"

const NAV_LINKS = [
    { label: "Boutique", href: "/boutique" },
    { label: "Accessoires", href: "/accessoires" },
    { label: "Sacs", href: "/sacs" },
    { label: "Vêtements", href: "/vetements" },
    { label: "À propos", href: "/#story" },
]

export function SiteHeader() {
    const { cartCount, setCartOpen } = useCart()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/90 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-md"
                    : "bg-transparent",
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <a href="/" className="relative z-10 flex items-center" aria-label="Maria Shop, accueil">
                    <Image
                        src="/images/maria-shop-logo.png"
                        alt="Maria Shop"
                        width={200}
                        height={56}
                        priority
                        className="h-9 w-auto sm:h-11"
                    />
                </a>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:flex"
                        aria-label="Rechercher"
                    >
                        <Search className="size-5" />
                    </button>
                    <button
                        className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:flex"
                        aria-label="Mon compte"
                    >
                        <User className="size-5" />
                    </button>
                    <button
                        onClick={() => setCartOpen(true)}
                        className="relative flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
                        aria-label={mounted ? `Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}` : "Panier"}
                    >
                        <ShoppingBag className="size-5" />
                        {mounted && cartCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground animate-in zoom-in duration-200">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
                        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    "lg:hidden",
                    open ? "pointer-events-auto" : "pointer-events-none",
                )}
            >
                <div
                    className={cn(
                        "fixed inset-x-0 top-[64px] z-40 origin-top border-t border-border bg-background transition-all duration-300 sm:top-[72px]",
                        open ? "opacity-100 translate-y-0" : "-translate-y-4 opacity-0",
                    )}
                >
                    <nav className="flex flex-col px-4 py-4 sm:px-6" aria-label="Navigation mobile">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="border-b border-border/60 py-4 font-serif text-2xl text-foreground transition-colors hover:text-accent"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/boutique"
                            onClick={() => setOpen(false)}
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                        >
                            Découvrir la boutique
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
