import { Reveal } from "@/components/reveal"
import { Crown, Gem, Sparkles, ShoppingBag } from "lucide-react"

const CATEGORIES = [
    { name: "Vêtements", desc: "Kimonos & Collections", icon: Crown, href: "/vetements" },
    { name: "Accessoires", desc: "Bijoux & Turbans", icon: ShoppingBag, href: "/accessoires" },
    { name: "Sacs", desc: "Sacs & Pochettes", icon: Gem, href: "/sacs" },
    { name: "Boutique", desc: "Toutes nos pièces", icon: Sparkles, href: "/boutique" },
]

export function Categories() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CATEGORIES.map((cat, i) => (
                    <Reveal key={cat.name} delay={i * 80}>
                        <a
                            href={cat.href}
                            className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                        >
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <cat.icon className="size-6" />
                            </span>
                            <span>
                                <span className="block font-semibold">{cat.name}</span>
                                <span className="block text-sm text-muted-foreground">{cat.desc}</span>
                            </span>
                        </a>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
