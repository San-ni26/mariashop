import Image from "next/image"
import { ArrowRight, Sparkles, Star } from "lucide-react"

export function Hero() {
    return (
        <section id="top" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
            {/* soft decorative accents */}
            <div className="pointer-events-none absolute -left-24 top-40 -z-10 size-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-terracotta/15 blur-3xl" />

            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24">
                {/* Copy */}
                <div className="lg:col-span-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
                        <Sparkles className="size-3.5 text-accent" />
                        La Beauté à l&apos;Africaine
                    </span>

                    <h1 className="mt-6 font-sans text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                        Révélez votre
                        <span className="mt-1 block font-serif text-4xl font-medium italic text-accent sm:text-5xl lg:text-6xl">
                            éclat naturel
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Vêtements, sacs, accessoires inspirés du bogolan.
                        Maria Shop célèbre l&apos;élégance africaine, une pièce d&apos;exception à la fois.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="/boutique"
                            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                            Explorer la boutique
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        {/* Image 
                        <a
                            href="/sacs"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                        >
                            Voir les sacs
                        </a>*/}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <div>
                            <div className="flex items-center gap-1 text-accent">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="size-4 fill-current" />
                                ))}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">+2 400 clientes satisfaites</p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                            <p className="text-2xl font-bold">150+</p>
                            <p className="text-xs text-muted-foreground">Références disponibles</p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                            <p className="text-2xl font-bold">- 24h</p>
                            <p className="text-xs text-muted-foreground">Livraison à Bamako</p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="relative lg:col-span-6">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        <div className="absolute -right-4 -top-4 -z-10 hidden size-full rounded-[2rem] border-2 border-accent/40 sm:block" />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                            <Image
                                src="/images/02.jpeg"
                                alt="Femme africaine élégante mettant en valeur une perruque Maria Shop"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        {/* floating card */}
                        <div className="animate-float absolute -left-3 bottom-8 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-8">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Nouveauté
                            </p>
                            <p className="mt-1 font-serif text-lg font-semibold">Collection Bogolan</p>
                            <p className="text-sm text-accent">À partir de 20.000F</p>
                        </div>

                        {/* decorative badge */}
                        <div className="animate-spin-slow absolute -right-2 top-6 flex size-20 items-center justify-center rounded-full bg-primary text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-primary-foreground sm:size-24 sm:text-xs">
                            Maria • Shop • 100% •
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="border-y border-border bg-primary py-3 text-primary-foreground">
                <div className="flex overflow-hidden">
                    <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
                        {MARQUEE.concat(MARQUEE).map((item, i) => (
                            <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium uppercase tracking-widest">
                                <span className="text-accent">✦</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const MARQUEE = [
    "Vêtements uniques",
    "Livraison 48h",
    "Cosmétiques naturels",
    "Style africain",
    "Paiement sécurisé",
    "Accessoires bogolan",
]
