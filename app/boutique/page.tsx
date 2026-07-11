"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { useProducts } from "@/lib/use-products"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const SHOP_TABS = [
    { label: "Toute la boutique", value: "all" },
    { label: "Accessoires", value: "accessoires" },
    { label: "Sacs", value: "sacs" },
    { label: "Vêtements", value: "vetements" },
]

export default function BoutiquePage() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("default")
    const { products } = useProducts()

    // Filter products by active tab & search query
    const tabFiltered = products.filter(
        (p) => activeTab === "all" || p.filter === activeTab
    )

    const searchFiltered = tabFiltered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort products
    const sortedProducts = [...searchFiltered].sort((a, b) => {
        if (sortBy === "price-asc") {
            return a.price - b.price
        }
        if (sortBy === "price-desc") {
            return b.price - a.price
        }
        if (sortBy === "rating") {
            return b.rating - a.rating
        }
        return 0 // default
    })

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            {/* Shop Hero */}
            <section className="relative overflow-hidden bg-primary pt-24 pb-14 text-primary-foreground sm:pt-28 lg:pt-32 lg:pb-20">
                <div className="pointer-events-none absolute -left-20 top-20 -z-10 size-72 rounded-full bg-accent/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-terracotta/15 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                            Découvrir
                        </span>
                        <h1 className="mt-3 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Notre Boutique
                        </h1>
                        <p className="mt-4 text-base text-primary-foreground/80 leading-relaxed max-w-lg">
                            Parcourez toutes nos pièces d&apos;exception. Trouvez des vêtements traditionnels, des sacs raffinés bogolan ou des soins corporels naturels de haute qualité.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Catalog Area */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {/* Tabs, Search & Sort Toolbar */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                    {/* Top: Category Tabs */}
                    <Reveal className="flex flex-wrap gap-2">
                        {SHOP_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setActiveTab(tab.value)
                                    setSearchQuery("") // Clear search when switching tabs
                                }}
                                className={cn(
                                    "rounded-full border px-5 py-2 text-sm font-semibold transition-all cursor-pointer",
                                    activeTab === tab.value
                                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                        : "border-border bg-card text-foreground/80 hover:border-accent hover:text-foreground"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </Reveal>

                    {/* Bottom: Search & Sort */}
                    <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Rechercher dans la boutique..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/40"
                            />
                        </div>

                        {/* Sorting Dropdown */}
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="size-4 text-muted-foreground" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Trier les produits par"
                                className="h-10 rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-accent/40"
                            >
                                <option value="default">Tri par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                                <option value="rating">Mieux notés</option>
                            </select>
                        </div>
                    </Reveal>
                </div>

                {/* Grid */}
                <div className="mt-8">
                    {sortedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="font-serif text-xl font-semibold">Aucun article trouvé</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Essayez de modifier vos filtres ou termes de recherche.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product, i) => (
                                <Reveal key={product.id} delay={i * 40} as="article">
                                    <ProductCard product={product} />
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
