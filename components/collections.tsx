import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const COLLECTIONS = [
    {
        title: "Mode & Vêtements Bogolan",
        subtitle: "Châles, kimonos et boubous authentiques",
        image: "/images/product-clothing.png",
        span: "lg:col-span-7",
        href: "/accessoires",
    },
    {
        title: "Sacs & Pochettes",
        subtitle: "L'artisanat africain sublimé",
        image: "/images/collection-accessories.png",
        span: "lg:col-span-5",
        href: "/sacs",
    },
]

export function Collections() {
    return (
        <section id="collections" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="mb-10 max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                    Nos collections
                </span>
                <h2 className="mt-2 font-sans text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                    Des univers pensés pour vous
                </h2>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-12">
                {COLLECTIONS.map((c, i) => (
                    <Reveal key={c.title} delay={i * 120} className={c.span}>
                        <a
                            href={c.href}
                            className="group relative flex aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[16/12]"
                        >
                            <Image
                                src={c.image || "/placeholder.svg"}
                                alt={c.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
                            <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-4 p-6 text-primary-foreground sm:p-8">
                                <div>
                                    <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                                    <p className="mt-1 text-sm text-primary-foreground/80">{c.subtitle}</p>
                                </div>
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
                                    <ArrowUpRight className="size-5" />
                                </span>
                            </div>
                        </a>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
