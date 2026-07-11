"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Plus, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Product, formatPrice, getWhatsAppSingleOrderLink } from "@/lib/products-data"
import { useCart } from "@/context/cart-context"
import { ProductQuickView } from "@/components/product-quick-view"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart()
    const [liked, setLiked] = useState(false)
    const [isQuickViewOpen, setQuickViewOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setLiked(!liked)
    }

    return (
        <>
            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                        <span className="absolute left-3 top-3 z-20 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm">
                            {product.tag}
                        </span>
                    )}

                    {/* Gender Badge */}
                    {product.gender && (
                        <span
                            className={cn(
                                "absolute left-3 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm",
                                product.tag ? "top-11" : "top-3",
                                product.gender === "femme"
                                    ? "bg-pink-500/90 text-white"
                                    : "bg-sky-600/90 text-white"
                            )}
                        >
                            {product.gender === "femme" ? "♀ Femme" : "⚥ Unisexe"}
                        </span>
                    )}

                    {/* Favorites Button */}
                    <button
                        onClick={handleLike}
                        aria-label={`Ajouter ${product.name} aux favoris`}
                        className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:text-accent cursor-pointer"
                    >
                        <Heart
                            className={cn(
                                "size-4 transition-colors",
                                liked && "fill-accent text-accent"
                            )}
                        />
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Action Bar — toujours visible sur mobile, hover sur desktop */}
                    <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 transition-all duration-300 sm:translate-y-4 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            aria-label="Ajouter au panier"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background/95 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-secondary cursor-pointer"
                        >
                            <Plus className="size-4" />
                        </button>

                        {/* WhatsApp Order Button */}
                        <a
                            href={getWhatsAppSingleOrderLink(
                                product.name,
                                product.price,
                                product.gender,
                                mounted && typeof window !== "undefined"
                                    ? `${window.location.origin}/produit/${product.id}`
                                    : undefined,
                            )}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 cursor-pointer"
                        >
                            <MessageCircle className="size-3.5 fill-current" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {product.category}
                        </p>
                        <div className="flex items-center gap-1.5">
                            {product.gender && (
                                <span
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                                        product.gender === "femme"
                                            ? "bg-pink-100 text-pink-700"
                                            : "bg-sky-100 text-sky-700"
                                    )}
                                >
                                    {product.gender === "femme" ? "Femme" : "Unisexe"}
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-accent">
                                <Star className="size-3 fill-current" />
                                {product.rating}.0
                            </span>
                        </div>
                    </div>

                    <h3 className="mt-1 flex-1 font-serif text-base font-semibold leading-snug text-foreground">
                        {/* Le lien principal s'étend sur toute la carte via relative article + after:absolute after:inset-0 */}
                        <Link href={`/produit/${product.id}`} className="focus:outline-none after:absolute after:inset-0 after:z-10">
                            {product.name}
                        </Link>
                    </h3>

                    <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-foreground">
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    {/* "Voir le produit" indicator */}
                    <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Voir le produit →
                    </span>
                </div>
            </article>

            {/* Quick View Dialog */}
            <ProductQuickView
                product={product}
                isOpen={isQuickViewOpen}
                onClose={() => setQuickViewOpen(false)}
            />
        </>
    )
}
