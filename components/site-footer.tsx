"use client"

import { useState } from "react"
import Image from "next/image"
import { AtSign, MessageCircle, Mail, ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"

const FOOTER_COLS = [
    {
        title: "Boutique",
        links: [
            { label: "Boutique complète", href: "/boutique" },
            { label: "Accessoires", href: "/accessoires" },
            { label: "Sacs & Pochettes", href: "/sacs" },
            { label: "Vêtements", href: "/vetements" },
        ],
    },
    {
        title: "Aide",
        links: [
            { label: "Livraison", href: "/#story" },
            { label: "Retours", href: "/#story" },
            { label: "Suivi de commande", href: "/#story" },
            { label: "Contact", href: "/#story" },
            { label: "FAQ", href: "/#story" },
        ],
    },
    {
        title: "Maria Shop",
        links: [
            { label: "Notre histoire", href: "/#story" },
            { label: "Sacs & Maroquinerie", href: "/sacs" },
            { label: "Blog beauté", href: "/" },
            { label: "Programme fidélité", href: "/" },
        ],
    },
]

export function SiteFooter() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    return (
        <footer className="bg-background">
            {/* Newsletter */}
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <Reveal className="relative overflow-hidden rounded-3xl bg-accent px-6 py-12 text-accent-foreground sm:px-12">
                    <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-primary/10 blur-2xl" />
                    <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-md">
                            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                                -10% sur votre première commande
                            </h2>
                            <p className="mt-3 text-accent-foreground/80">
                                Rejoignez la communauté Maria Shop et recevez nos nouveautés en avant-première.
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (email) setSent(true)
                             }}
                            className="w-full max-w-md"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary/50" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Votre adresse email"
                                        aria-label="Adresse email"
                                        className="h-12 w-full rounded-full border border-primary/20 bg-background py-3.5 pl-12 pr-4 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                                >
                                    {sent ? (
                                        <>
                                            <Check className="size-4" /> Inscrit !
                                        </>
                                    ) : (
                                        <>
                                            Je m&apos;inscris <ArrowRight className="size-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </Reveal>
            </div>

            {/* Main footer */}
            <div className="border-t border-border">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
                    <div>
                        <Image
                            src="/images/LOGO-01.png"
                            alt="Maria Shop"
                            width={200}
                            height={56}
                            className="h-11 w-auto logo-theme-light"
                        />
                        <Image
                            src="/images/LOGO-02.png"
                            alt="Maria Shop"
                            width={200}
                            height={56}
                            className="h-11 w-auto logo-theme-dark"
                        />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                            La beauté à l&apos;africaine. Perruques, accessoires et vêtements inspirés
                            du bogolan pour révéler votre éclat.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {[AtSign, MessageCircle, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label="Réseau social Maria Shop"
                                    className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Icon className="size-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {FOOTER_COLS.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-semibold">{col.title}</h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-muted-foreground transition-colors hover:text-accent"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
                        <p>© {new Date().getFullYear()} Maria Shop. Tous droits réservés.</p>
                        <p>Fait avec passion pour la beauté africaine.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
