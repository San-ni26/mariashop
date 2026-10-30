"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react"

const HERO_SLIDES = [
    {
        src: "/images/article5-2.jpg",
        alt: "Collection Article 5 - Maria Shop élégance africaine",
    },
    {
        src: "/images/article5-3.jpg",
        alt: "Collection Article 5 - Style et raffinement bogolan",
    },
    {
        src: "/images/article5-4.jpg",
        alt: "Collection Article 5 - Beauté africaine Maria Shop",
    },
    {
        src: "/images/article5-5.jpg",
        alt: "Collection Article 5 - Pièce d'exception bogolan",
    },
    {
        src: "/images/article5-6.jpg",
        alt: "Collection Article 5 - Élégance et authenticité",
    },
    {
        src: "/images/article5-7.jpg",
        alt: "Collection Article 5 - Mode africaine contemporaine",
    },
    {
        src: "/images/article5-8.jpg",
        alt: "Collection Article 5 - Création Maria Shop",
    },
    {
        src: "/images/article5-9.jpg",
        alt: "Collection Article 5 - Maria Shop nouveauté",
    },
    {
        src: "/images/article5-10.jpg",
        alt: "Collection Article 5 - Maria Shop collection exclusive",
    },
]

export function Hero({ data }: { data?: any }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const slides = data?.slides || HERO_SLIDES

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }, [slides.length])

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 4000)
        return () => clearInterval(timer)
    }, [nextSlide])

    return (
        <section id="top" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
            {/* soft decorative accents */}
            <div className="pointer-events-none absolute -left-24 top-40 -z-10 size-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-terracotta/15 blur-3xl" />

            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24">
                {/* Copy (en 2ème position sur mobile, 1ère sur desktop lg) */}
                <div className="order-2 lg:order-1 lg:col-span-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
                        <Sparkles className="size-3.5 text-accent" />
                        {data?.badgeText || "La Beauté à l'Africaine"}
                    </span>

                    <h1 className="mt-6 font-sans text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                        {data?.titleLine1 || "Révélez votre"}
                        <span className="mt-1 block font-serif text-4xl font-medium italic text-accent sm:text-5xl lg:text-6xl">
                            {data?.titleLine2 || "éclat naturel"}
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {data?.description || "Vêtements, sacs, accessoires inspirés du bogolan. Maria Shop célèbre l'élégance africaine, une pièce d'exception à la fois."}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href={data?.buttonLink || "/boutique"}
                            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                            {data?.buttonText || "Explorer la boutique"}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <div>
                            <div className="flex items-center gap-1 text-accent">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="size-4 fill-current" />
                                ))}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{data?.stats?.[0]?.value || "+2 400"} {data?.stats?.[0]?.label || "clientes satisfaites"}</p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                            <p className="text-2xl font-bold">{data?.stats?.[1]?.value || "150+"}</p>
                            <p className="text-xs text-muted-foreground">{data?.stats?.[1]?.label || "Références disponibles"}</p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                            <p className="text-2xl font-bold">{data?.stats?.[2]?.value || "- 24h"}</p>
                            <p className="text-xs text-muted-foreground">{data?.stats?.[2]?.label || "Livraison à Bamako"}</p>
                        </div>
                    </div>
                </div>

                {/* Carrousel d'images (en 1ère position sur mobile, 2ème sur desktop lg) */}
                <div className="order-1 lg:order-2 relative lg:col-span-6">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        <div className="absolute -right-4 -top-4 -z-10 hidden size-full rounded-[2rem] border-2 border-accent/40 sm:block" />
                        
                        <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                            {slides.map((slide: any, idx: number) => (
                                <div
                                    key={slide.src + idx}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                        idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                    }`}
                                >
                                    {slide.src ? (
                                        <Image
                                            src={slide.src}
                                            alt={slide.alt || "Slide"}
                                            fill
                                            priority={idx === 0}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary" />
                                    )}
                                </div>
                            ))}

                            {/* Flèches de navigation */}
                            <button
                                onClick={prevSlide}
                                aria-label="Image précédente"
                                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-md transition-all hover:bg-background/90 opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Image suivante"
                                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-md transition-all hover:bg-background/90 opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                                <ChevronRight className="size-5" />
                            </button>

                            {/* Indicateurs de défilement (puces) */}
                            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/40 px-3 py-1.5 backdrop-blur-md">
                                {slides.map((_: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        aria-label={`Aller à l'image ${idx + 1}`}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === currentIndex ? "w-6 bg-accent" : "w-2 bg-foreground/40 hover:bg-foreground/70"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* floating card */}
                        <div className="animate-float absolute -left-3 bottom-8 z-30 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-8">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                {data?.floatingCard?.badge || "Nouveauté"}
                            </p>
                            <p className="mt-1 font-serif text-lg font-semibold">{data?.floatingCard?.title || "Collection Bogolan"}</p>
                            <p className="text-sm text-accent">{data?.floatingCard?.price || "À partir de 20.000F"}</p>
                        </div>

                        {/* decorative badge */}
                        <div className="animate-spin-slow absolute -right-2 top-6 z-30 flex size-20 items-center justify-center rounded-full bg-primary text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-primary-foreground sm:size-24 sm:text-xs">
                            {data?.decorativeBadge || "Maria • Shop • 100% •"}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

