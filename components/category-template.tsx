"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { ProductGender } from "@/lib/products-data"
import { useProducts } from "@/lib/use-products"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

interface CategoryTemplateProps {
    categoryName: string
    categoryTitle: string
    categoryDesc: string
    filterValue: string
    /** Pass true to show Unisexe / Femme gender filter tabs (for Collections page) */
    showGenderFilter?: boolean
}

export function CategoryTemplate({
    categoryName,
    categoryTitle,
    categoryDesc,
    filterValue,
    showGenderFilter = false,
}: CategoryTemplateProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("default")
    const [genderFilter, setGenderFilter] = useState<"all" | ProductGender>("all")
    const [visibleCount, setVisibleCount] = useState(12)
    const { products } = useProducts()

    // Filter products by category
    const categoryProducts = products.filter((p) => p.filter === filterValue)

    // Filter products by gender (only when applicable)
    const genderFiltered = showGenderFilter && genderFilter !== "all"
        ? categoryProducts.filter((p) => p.gender === genderFilter)
        : categoryProducts

    // Filter products by search query
    const searchFiltered = genderFiltered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort products
    const sortedProducts = [...searchFiltered].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price
        if (sortBy === "price-desc") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
    })

    const genderTabs: { label: string; value: "all" | ProductGender }[] = [
        { label: "Tous", value: "all" },
        { label: "⚥ Unisexe", value: "unisexe" },
        { label: "♀ Femme", value: "femme" },
        { label: "♂ Homme", value: "homme" },
    ]

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            {/* Category Hero Header */}
            <section className="relative overflow-hidden bg-primary pt-24 pb-14 text-primary-foreground sm:pt-28 lg:pt-32 lg:pb-20">
                <div className="pointer-events-none absolute -left-20 top-20 -z-10 size-72 rounded-full bg-accent/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-terracotta/15 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                            Boutique / {categoryName}
                        </span>
                        <h1 className="mt-3 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            {categoryTitle}
                        </h1>
                        <p className="mt-4 text-base text-primary-foreground/80 leading-relaxed max-w-lg">
                            {categoryDesc}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* Gender Filter Tabs (Collections only) */}
                {showGenderFilter && (
                    <Reveal className="mb-6 flex flex-wrap gap-2">
                        {genderTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setGenderFilter(tab.value)
                                    setVisibleCount(12)
                                }}
                                className={cn(
                                    "rounded-full border px-5 py-2 text-sm font-semibold transition-all cursor-pointer",
                                    genderFilter === tab.value
                                        ? tab.value === "femme"
                                            ? "border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-500/15"
                                            : tab.value === "unisexe"
                                            ? "border-sky-600 bg-sky-600 text-white shadow-md shadow-sky-600/15"
                                            : tab.value === "homme"
                                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/15"
                                            : "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                        : "border-border bg-card text-foreground/80 hover:border-accent hover:text-foreground"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <span className="ml-2 self-center text-xs text-muted-foreground">
                            {sortedProducts.length} article{sortedProducts.length > 1 ? "s" : ""}
                        </span>
                    </Reveal>
                )}

                {/* Search and Sort Bar */}
                <Reveal className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher un article..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setVisibleCount(12)
                            }}
                            className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/40"
                        />
                    </div>

                    {/* Sorting Select */}
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="size-4 text-muted-foreground" />
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value)
                                setVisibleCount(12)
                            }}
                            aria-label="Trier par"
                            className="h-10 rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-accent/40"
                        >
                            <option value="default">Tri par défaut</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="rating">Mieux notés</option>
                        </select>
                    </div>
                </Reveal>

                {/* Products Grid */}
                <div className="mt-8">
                    {sortedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="font-serif text-xl font-semibold">Aucun article trouvé</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Essayez de modifier vos termes de recherche ou de changer les filtres.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {sortedProducts.slice(0, visibleCount).map((product, i) => (
                                    <Reveal key={product.id} delay={(i % 12) * 50} as="article">
                                        <ProductCard product={product} priority={i < 4} />
                                    </Reveal>
                                ))}
                            </div>
                            
                            {visibleCount < sortedProducts.length && (
                                <Reveal className="mt-12 flex justify-center">
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + 12)}
                                        className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold transition-all hover:border-accent hover:text-accent shadow-sm cursor-pointer"
                                    >
                                        Voir plus d&apos;articles
                                    </button>
                                </Reveal>
                            )}
                        </>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
