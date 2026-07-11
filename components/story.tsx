import Image from "next/image"
import { Leaf, Truck, ShieldCheck, HeartHandshake } from "lucide-react"
import { Reveal } from "@/components/reveal"

const PERKS = [
    /* floating card 
    { icon: Leaf, title: "Naturel", desc: "Ingrédients & matières authentiques" },
    { icon: Truck, title: "Livraison 48h", desc: "Partout, expédition rapide" },
    { icon: ShieldCheck, title: "Paiement sûr", desc: "Transactions 100% sécurisées" },*/
    { icon: HeartHandshake, title: "Fait avec amour", desc: "Sélection artisanale soignée" },
]

export function Story() {
    return (
        <section id="story" className="bg-primary text-primary-foreground">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
                <Reveal className="relative">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
                        <Image
                            src="/images/Maria-photo.png"
                            alt="L'univers Maria Shop : beauté et artisanat africain"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-4 rounded-2xl bg-accent px-6 py-5 text-accent-foreground shadow-xl sm:-right-6">
                        <p className="font-serif text-3xl font-bold">Mariam Dembélé</p>
                        <p className="text-xs font-semibold uppercase tracking-wide">Fondatrice Maria shop</p>
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                        Notre histoire
                    </span>
                    <h2 className="mt-3 font-sans text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
                        La beauté africaine,
                        <span className="block font-serif font-medium italic text-accent">
                            une fierté à partager
                        </span>
                    </h2>
                    <p className="mt-5 max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
                        Chez Maria Shop, chaque produit raconte une histoire. Des perruques aux
                        cosmétiques, en passant par nos accessoires aux motifs bogolan, nous
                        célébrons l&apos;élégance et la richesse du continent avec des pièces choisies
                        pour vous sublimer au quotidien.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {PERKS.map((perk) => (
                            <div
                                key={perk.title}
                                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4"
                            >
                                <perk.icon className="size-6 text-accent" />
                                <p className="mt-3 font-semibold">{perk.title}</p>
                                <p className="text-sm text-primary-foreground/70">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
