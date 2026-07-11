"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MessageCircle, ShoppingBag, Check, Share2 } from "lucide-react"
import { useProducts } from "@/lib/use-products"
import { useCart } from "@/context/cart-context"
import { formatPrice, getWhatsAppSingleOrderLink } from "@/lib/products-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"
import React from "react"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const { products } = useProducts()
    const { addToCart } = useCart()
    const [added, setAdded] = React.useState(false)
    const [shared, setShared] = React.useState(false)

    const productId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""
    const product = products.find((p) => p.id === productId)

    const handleAddToCart = () => {
        if (!product) return
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            await navigator.share({ title: product?.name, url })
        } else {
            await navigator.clipboard.writeText(url)
            setShared(true)
            setTimeout(() => setShared(false), 2000)
        }
    }

    // Loading state — products may not be fetched yet
    if (products.length > 0 && !product) {
        return (
            <div className="min-h-screen bg-background">
                <SiteHeader />
                <main className="mx-auto max-w-4xl px-4 py-32 text-center">
                    <p className="font-serif text-2xl font-bold">Produit introuvable</p>
                    <p className="mt-2 text-muted-foreground">Ce produit n&apos;existe pas ou a été supprimé.</p>
                    <Link href="/boutique" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                        Retour à la boutique
                    </Link>
                </main>
                <SiteFooter />
            </div>
        )
    }

    if (!product) {
        // Still loading
        return (
            <div className="min-h-screen bg-background">
                <SiteHeader />
                <main className="flex min-h-[60vh] items-center justify-center">
                    <div className="size-10 animate-spin rounded-full border-4 border-border border-t-accent" />
                </main>
                <SiteFooter />
            </div>
        )
    }

    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const productUrl = mounted && typeof window !== "undefined" ? window.location.href : ""
    const whatsappUrl = getWhatsAppSingleOrderLink(product.name, product.price, product.gender, productUrl)

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
                    <span>/</span>
                    <Link href="/boutique" className="hover:text-foreground transition-colors">Boutique</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Retour
                </button>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left — Image */}
                    <div className="relative overflow-hidden rounded-3xl bg-secondary aspect-square">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                        {product.tag && (
                            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow">
                                {product.tag}
                            </span>
                        )}
                        {product.gender && (
                            <span className={cn(
                                "absolute left-4 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow",
                                product.tag ? "top-14" : "top-4",
                                product.gender === "femme"
                                    ? "bg-pink-500/90 text-white"
                                    : "bg-sky-600/90 text-white"
                            )}>
                                {product.gender === "femme" ? "♀ Femme" : "⚥ Unisexe"}
                            </span>
                        )}
                    </div>

                    {/* Right — Details */}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent">
                            {product.category}
                        </span>
                        <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex items-center text-accent">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`size-4 ${i < product.rating ? "fill-current" : "text-border"}`} />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.rating}.0 / 5)</span>
                        </div>

                        {/* Price */}
                        <div className="mt-6 flex items-baseline gap-3 border-t border-border pt-6">
                            <span className="text-4xl font-extrabold text-foreground">
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
                                <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                                    Détails du produit
                                </h2>
                                <ul className="mt-3 space-y-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="mt-0.5 text-accent font-bold">✦</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={handleAddToCart}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card py-4 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
                            >
                                {added ? (
                                    <><Check className="size-4 text-emerald-500" /> Ajouté au panier !</>
                                ) : (
                                    <><ShoppingBag className="size-4" /> Ajouter au panier</>
                                )}
                            </button>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                            >
                                <MessageCircle className="size-4 fill-current" />
                                Commander sur WhatsApp
                            </a>
                        </div>

                        {/* Share */}
                        <button
                            onClick={handleShare}
                            className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Share2 className="size-3.5" />
                            {shared ? "Lien copié !" : "Partager ce produit"}
                        </button>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
