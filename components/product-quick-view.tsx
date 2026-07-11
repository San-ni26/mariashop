"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { X, Star, MessageCircle, ShoppingBag, Check } from "lucide-react"
import { Product, formatPrice, getWhatsAppSingleOrderLink } from "@/lib/products-data"
import { useCart } from "@/context/cart-context"

interface ProductQuickViewProps {
    product: Product
    isOpen: boolean
    onClose: () => void
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    const { addToCart } = useCart()
    const [added, setAdded] = React.useState(false)

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleKeyDown)
        }
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleAddToCart = () => {
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-300 sm:my-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground/80 shadow-sm backdrop-blur transition-all hover:bg-secondary hover:text-foreground"
                    aria-label="Fermer"
                >
                    <X className="size-5" />
                </button>

                <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                    {/* Left: Product Image */}
                    <div className="relative aspect-square w-full bg-secondary md:col-span-6 md:h-full">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                        {product.tag && (
                            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-sm">
                                {product.tag}
                            </span>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col p-6 sm:p-8 md:col-span-6 md:pl-2">
                        <div className="flex-1">
                            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                                {product.category}
                            </span>
                            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground">
                                {product.name}
                            </h2>

                            {/* Rating */}
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex items-center text-accent">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`size-4 ${i < product.rating ? "fill-current" : "text-border"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">({product.rating}.0 avis)</span>
                            </div>

                            {/* Price */}
                            <div className="mt-5 flex items-baseline gap-3">
                                <span className="text-3xl font-extrabold text-foreground">
                                    {formatPrice(product.price)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-lg text-muted-foreground line-through">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                                {product.description}
                            </p>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                                        Détails du produit
                                    </h4>
                                    <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-0.5 text-accent">✦</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={handleAddToCart}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
                            >
                                {added ? (
                                    <>
                                        <Check className="size-4 text-emerald-500" />
                                        Ajouté !
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="size-4" />
                                        Ajouter au panier
                                    </>
                                )}
                            </button>
                            <a
                                href={getWhatsAppSingleOrderLink(
                                    product.name,
                                    product.price,
                                    product.gender,
                                    typeof window !== "undefined"
                                        ? `${window.location.origin}/produit/${product.id}`
                                        : undefined,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 shadow-lg shadow-emerald-600/15"
                            >
                                <MessageCircle className="size-4 fill-current" />
                                Commander sur WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
