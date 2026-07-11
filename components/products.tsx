"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { useProducts } from "@/lib/use-products"
import { ProductCard } from "@/components/product-card"

const FILTERS = [
    { label: "Tout", value: "all" },
    { label: "Perruques", value: "perruques" },
    { label: "Accessoires", value: "accessoires" },
    { label: "Vêtements", value: "vetements" },
    { label: "Collections", value: "collections" },
]

export function Products() {
    const [active, setActive] = useState("all")
    const { products } = useProducts()

    // Filter products shown on the homepage
    const shown = products.filter((p) => active === "all" || p.filter === active)

    return (
        <section id="produits" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                        Nos articles
                    </span>
                    <h2 className="mt-2 font-sans text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                        Les pièces en vedette
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setActive(f.value)}
                            className={cn(
                                "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                                active === f.value
                                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                    : "border-border bg-card text-foreground/80 hover:border-accent hover:text-foreground",
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {shown.slice(0, 8).map((product, i) => (
                    <Reveal as="article" key={product.id} delay={i * 60}>
                        <ProductCard product={product} />
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
