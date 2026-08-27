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

export function Story({ data }: { data?: any }) {
    const perks = data?.perks || PERKS

    return (
        <section id="story" className="bg-primary text-primary-foreground">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
                <Reveal className="relative">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
                        <Image
                            src={data?.imageSrc || "/images/Maria-photo.png"}
                            alt="L'univers Maria Shop : beauté et artisanat africain"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-4 rounded-2xl bg-accent px-6 py-5 text-accent-foreground shadow-xl sm:-right-6">
                        <p className="font-serif text-3xl font-bold">{data?.founderName || "Mariam Dembélé"}</p>
                        <p className="text-xs font-semibold uppercase tracking-wide">{data?.founderRole || "Fondatrice Maria shop"}</p>
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                        {data?.badgeText || "Notre histoire"}
                    </span>
                    <h2 className="mt-3 font-sans text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
                        {data?.titleLine1 || "La beauté africaine,"}
                        <span className="block font-serif font-medium italic text-accent">
                            {data?.titleLine2 || "une fierté à partager"}
                        </span>
                    </h2>
                    <div className="mt-5 max-w-lg text-pretty leading-relaxed text-primary-foreground/80 whitespace-pre-wrap">
                        {(() => {
                            const desc = data?.description || "Chez Maria Shop, chaque produit raconte une histoire. Des perruques aux cosmétiques, en passant par nos accessoires aux motifs bogolan, nous célébrons l'élégance et la richesse du continent avec des pièces choisies pour vous sublimer au quotidien.";
                            const keywords = ["Maria Shop", "2018", "Bogolan", "Indigo", "Ensemble, valorisons notre culture."];
                            const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const regex = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
                            const parts = desc.split(regex);
                            
                            return parts.map((part: string, i: number) => {
                                const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
                                return isKeyword ? <strong key={i} className="font-bold text-accent">{part}</strong> : <span key={i}>{part}</span>;
                            });
                        })()}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {perks.map((perk: any) => {
                            // If it's a dynamic icon, we'd need a mapping. We'll fallback to HeartHandshake or whatever is hardcoded
                            const IconComponent = typeof perk.icon === 'string' ? HeartHandshake : perk.icon
                            return (
                                <div
                                    key={perk.title}
                                    className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4"
                                >
                                    <IconComponent className="size-6 text-accent" />
                                    <p className="mt-3 font-semibold">{perk.title}</p>
                                    <p className="text-sm text-primary-foreground/70">{perk.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
