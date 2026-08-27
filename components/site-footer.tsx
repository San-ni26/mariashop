"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    facebook: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    tiktok: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/><path d="M15 8a4 4 0 1 0-4-4"/></svg>,
    snapchat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M12 2c3 0 5 2.5 5 5.5v.5h2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1a3 3 0 0 1-2 2h-1c-.5 0-1 .5-1 1v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1c0-.5-.5-1-1-1h-1a3 3 0 0 1-2-2h-1a1 1 0 0 1-1-1 1 1 0 0 1 1-1h2v-.5C7 4.5 9 2 12 2z"/></svg>,
    whatsapp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
}

export function SiteFooter() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [footerData, setFooterData] = useState<any>(null)

    useEffect(() => {
        fetch("/api/admin/home")
            .then((res) => res.json())
            .then((data) => {
                if (data?.footer) {
                    setFooterData(data.footer)
                }
            })
            .catch(console.error)
    }, [])

    const newsletterActive = footerData?.newsletter?.active ?? true
    const newsletterTitle = footerData?.newsletter?.title || "-10% sur votre première commande"
    const newsletterDesc = footerData?.newsletter?.description || "Rejoignez la communauté Maria Shop et recevez nos nouveautés en avant-première."
    
    const description = footerData?.description || "La beauté à l'africaine. Perruques, accessoires et vêtements inspirés du bogolan pour révéler votre éclat."
    const copyright = footerData?.copyright || "Maria Shop. Tous droits réservés."
    const bottomText = footerData?.bottomText || "Fait avec passion pour la beauté africaine."

    const socials = footerData?.socials || {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        tiktok: "https://tiktok.com",
        snapchat: "https://snapchat.com",
        whatsapp: "https://wa.me/"
    }

    const columns = footerData?.columns || [
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

    return (
        <footer className="bg-background">
            {/* Newsletter */}
            {newsletterActive && (
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <Reveal className="relative overflow-hidden rounded-3xl bg-accent px-6 py-12 text-accent-foreground sm:px-12">
                        <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-primary/10 blur-2xl" />
                        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-md">
                                <h2 className="font-sans text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                                    {newsletterTitle}
                                </h2>
                                <p className="mt-3 text-accent-foreground/80">
                                    {newsletterDesc}
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
            )}

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
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {Object.entries(socials).map(([platform, url]) => {
                                if (!url || typeof url !== "string") return null;
                                const icon = SOCIAL_ICONS[platform.toLowerCase()];
                                if (!icon) return null;

                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Rejoignez-nous sur ${platform}`}
                                        className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {icon}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {columns.map((col: any) => (
                        <div key={col.title}>
                            <h3 className="font-semibold">{col.title}</h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                {col.links.map((link: any, i: number) => (
                                    <li key={i}>
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
                        <p>© {new Date().getFullYear()} {copyright}</p>
                        <p>{bottomText}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
