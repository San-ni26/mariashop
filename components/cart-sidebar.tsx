"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, Trash2, Minus, Plus, MessageCircle, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/products-data"
import { cn } from "@/lib/utils"

export function CartSidebar() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setCartOpen,
        getWhatsAppCartLink,
    } = useCart()

    const sidebarRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setCartOpen(false)
        }
        if (isCartOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleKeyDown)
        }
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isCartOpen, setCartOpen])

    return (
        <div
            className={cn(
                "fixed inset-0 z-110 transition-opacity duration-300",
                isCartOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={() => setCartOpen(false)}
            />

            {/* Sidebar Container */}
            <div
                ref={sidebarRef}
                className={cn(
                    "absolute inset-y-0 right-0 z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-md",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-5 sm:px-6">
                    <div className="flex items-center gap-2.5">
                        <ShoppingBag className="size-5 text-accent" />
                        <h2 className="font-serif text-xl font-semibold">Mon Panier</h2>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold">
                            {mounted ? cartCount : 0}
                        </span>
                    </div>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label="Fermer le panier"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {!mounted || cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                                <ShoppingBag className="size-8" />
                            </span>
                            <h3 className="mt-4 font-serif text-lg font-semibold">Votre panier est vide</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Découvrez nos perruques, accessoires et vêtements pour le remplir.
                            </p>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                Continuer les achats
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-start gap-4 border-b border-border/40 pb-4"
                                >
                                    {/* Item Thumbnail */}
                                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                                        <Image
                                            src={item.product.image || "/placeholder.svg"}
                                            alt={item.product.name}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Item Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                                            {item.product.category}
                                        </p>
                                        <h4 className="mt-0.5 truncate font-medium text-sm text-foreground">
                                            {item.product.name}
                                        </h4>
                                        <p className="mt-1 text-sm font-bold">
                                            {formatPrice(item.product.price)}
                                        </p>

                                        {/* Quantity & Actions */}
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="flex size-6 items-center justify-center rounded text-foreground/75 hover:bg-secondary hover:text-foreground"
                                                    aria-label="Diminuer la quantité"
                                                >
                                                    <Minus className="size-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="flex size-6 items-center justify-center rounded text-foreground/75 hover:bg-secondary hover:text-foreground"
                                                    aria-label="Augmenter la quantité"
                                                >
                                                    <Plus className="size-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                aria-label="Supprimer l'article"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                {mounted && cartItems.length > 0 && (
                    <div className="border-t border-border px-4 py-6 sm:px-6 bg-secondary/20">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Sous-total</span>
                            <span className="text-xl font-extrabold text-foreground">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            La commande sera envoyée sur WhatsApp pour validation finale et livraison.
                        </p>

                        <div className="mt-5 space-y-2">
                            <a
                                href={getWhatsAppCartLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-600/15"
                            >
                                <MessageCircle className="size-4 fill-current" />
                                Commander sur WhatsApp
                            </a>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                            >
                                Continuer les achats
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
