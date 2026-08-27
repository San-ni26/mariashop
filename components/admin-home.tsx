"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Sparkles, Trash, Plus, Upload, Check } from "lucide-react"

export function AdminHome() {
    const [homeData, setHomeData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null)

    const fetchHomeData = async () => {
        try {
            const res = await fetch("/api/admin/home")
            if (res.ok) {
                const data = await res.json()
                setHomeData(data)
            }
        } catch (error) {
            console.error("Failed to load home data", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHomeData()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        setMessage(null)
        try {
            const res = await fetch("/api/admin/home", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(homeData),
            })
            if (res.ok) {
                setMessage({ text: "Modifications enregistrées avec succès !", type: "success" })
            } else {
                setMessage({ text: "Erreur lors de l'enregistrement.", type: "error" })
            }
        } catch (error) {
            setMessage({ text: "Erreur lors de l'enregistrement.", type: "error" })
        } finally {
            setSaving(false)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const handleImageUpload = async (file: File, slideIndex: number) => {
        const fd = new FormData()
        fd.append("file", file)
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            if (res.ok) {
                const data = await res.json()
                const newSlides = [...homeData.hero.slides]
                newSlides[slideIndex].src = data.path
                setHomeData({
                    ...homeData,
                    hero: { ...homeData.hero, slides: newSlides }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleBannerUpload = async (file: File, category: string) => {
        const fd = new FormData()
        fd.append("file", file)
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            if (res.ok) {
                const data = await res.json()
                setHomeData((prev: any) => ({
                    ...prev,
                    banners: {
                        ...(prev.banners || {}),
                        [category]: data.path
                    }
                }))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const removeSlide = (index: number) => {
        const newSlides = homeData.hero.slides.filter((_: any, i: number) => i !== index)
        setHomeData({
            ...homeData,
            hero: { ...homeData.hero, slides: newSlides }
        })
    }

    const addSlide = () => {
        setHomeData({
            ...homeData,
            hero: {
                ...homeData.hero,
                slides: [...homeData.hero.slides, { src: "", alt: "Nouvelle image" }]
            }
        })
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
                <div className="admin-spinner" style={{ width: 32, height: 32 }} />
            </div>
        )
    }

    if (!homeData) return <div>Erreur de chargement.</div>

    return (
        <div className="admin-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Configuration de la page d'accueil</h2>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? <div className="admin-spinner" style={{ width: 16, height: 16 }} /> : <Check size={18} />}
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>

            {message && (
                <div style={{
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    backgroundColor: message.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    color: message.type === "success" ? "#16a34a" : "#dc2626",
                    fontWeight: 500,
                }}>
                    {message.text}
                </div>
            )}

            {/* HERO SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Section Hero (Haut de page)
                </h3>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre Ligne 1</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.hero.titleLine1}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, titleLine1: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre Ligne 2 (Accent)</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.hero.titleLine2}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, titleLine2: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Description</label>
                        <textarea
                            className="admin-form-input"
                            rows={3}
                            value={homeData.hero.description}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, description: e.target.value } })}
                        />
                    </div>
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>
                    Images du Carrousel
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {homeData.hero.slides.map((slide: any, i: number) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", border: "1px solid var(--admin-border)", borderRadius: "8px" }}>
                            {slide.src ? (
                                <Image src={slide.src} alt="Slide" width={60} height={60} style={{ borderRadius: "8px", objectFit: "cover" }} />
                            ) : (
                                <div style={{ width: 60, height: 60, borderRadius: "8px", backgroundColor: "var(--admin-border)" }} />
                            )}
                            <div style={{ flex: 1 }}>
                                <label className="admin-btn admin-btn-ghost admin-btn-sm" style={{ display: "inline-flex", cursor: "pointer", marginBottom: "8px" }}>
                                    <Upload size={14} style={{ marginRight: 6 }} /> Changer l'image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], i)
                                        }}
                                    />
                                </label>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    placeholder="Texte alternatif (SEO)"
                                    value={slide.alt}
                                    onChange={(e) => {
                                        const newSlides = [...homeData.hero.slides]
                                        newSlides[i].alt = e.target.value
                                        setHomeData({ ...homeData, hero: { ...homeData.hero, slides: newSlides } })
                                    }}
                                />
                            </div>
                            <button className="admin-btn admin-btn-danger admin-btn-icon" onClick={() => removeSlide(i)}>
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                    <button className="admin-btn admin-btn-ghost" onClick={addSlide}>
                        <Plus size={16} /> Ajouter une image
                    </button>
                </div>
            </div>

            {/* MARQUEE SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Bandeau Défilant (Marquee)
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {homeData.marquee.map((m: string, i: number) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <input
                                type="text"
                                className="admin-form-input"
                                style={{ width: "180px" }}
                                value={m}
                                onChange={(e) => {
                                    const nm = [...homeData.marquee]
                                    nm[i] = e.target.value
                                    setHomeData({ ...homeData, marquee: nm })
                                }}
                            />
                            <button className="admin-btn admin-btn-danger admin-btn-icon admin-btn-sm" onClick={() => {
                                const nm = homeData.marquee.filter((_: any, idx: number) => idx !== i)
                                setHomeData({ ...homeData, marquee: nm })
                            }}>
                                <Trash size={14} />
                            </button>
                        </div>
                    ))}
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => {
                        setHomeData({ ...homeData, marquee: [...homeData.marquee, "Nouveau texte"] })
                    }}>
                        <Plus size={14} />
                    </button>
                </div>

            {/* CATEGORIES SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Catégories (Sous le Hero)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {homeData.categories?.items?.map((cat: any, i: number) => (
                        <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", border: "1px solid var(--admin-border)", borderRadius: "8px" }}>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    placeholder="Nom de la catégorie"
                                    value={cat.name}
                                    onChange={(e) => {
                                        const newItems = [...homeData.categories.items]
                                        newItems[i].name = e.target.value
                                        setHomeData({ ...homeData, categories: { ...homeData.categories, items: newItems } })
                                    }}
                                />
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    placeholder="Description"
                                    value={cat.desc}
                                    onChange={(e) => {
                                        const newItems = [...homeData.categories.items]
                                        newItems[i].desc = e.target.value
                                        setHomeData({ ...homeData, categories: { ...homeData.categories, items: newItems } })
                                    }}
                                />
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    placeholder="Lien (ex: /vetements)"
                                    value={cat.href}
                                    onChange={(e) => {
                                        const newItems = [...homeData.categories.items]
                                        newItems[i].href = e.target.value
                                        setHomeData({ ...homeData, categories: { ...homeData.categories, items: newItems } })
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CATEGORY BANNERS SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Sparkles size={20} className="text-accent" />
                    Section Bannières (Fonds d'écran)
                </h3>
                <p style={{ color: "var(--admin-text-secondary)", fontSize: 14, marginBottom: 20 }}>
                    Modifiez les images de fond (bannières) pour la boutique et les différentes catégories.
                </p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                    {["boutique", "sacs", "accessoires", "vetements"].map((cat) => (
                        <div key={cat} style={{ border: "1px solid var(--admin-border)", borderRadius: 8, padding: 16 }}>
                            <h4 style={{ textTransform: "capitalize", fontWeight: 600, marginBottom: 12 }}>{cat}</h4>
                            {homeData.banners?.[cat] ? (
                                <div style={{ position: "relative", width: "100%", height: 120, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
                                    <Image src={homeData.banners[cat]} alt={`Bannière ${cat}`} fill style={{ objectFit: "cover" }} />
                                </div>
                            ) : (
                                <div style={{ width: "100%", height: 120, borderRadius: 8, backgroundColor: "var(--admin-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "var(--admin-text-secondary)", fontSize: 13, border: "1px dashed var(--admin-border)" }}>
                                    Aucune image
                                </div>
                            )}
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <label className="admin-button" style={{ cursor: "pointer", display: "inline-flex", padding: "6px 12px", fontSize: 13, minWidth: "auto", flex: 1, justifyContent: "center" }}>
                                    <Upload size={14} style={{ marginRight: 6 }} /> {homeData.banners?.[cat] ? "Remplacer" : "Ajouter"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleBannerUpload(e.target.files[0], cat)
                                        }}
                                    />
                                </label>
                                {homeData.banners?.[cat] && (
                                    <button 
                                        className="admin-button" 
                                        style={{ backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", padding: "6px 12px", fontSize: 13, minWidth: "auto" }}
                                        onClick={() => {
                                            setHomeData((prev: any) => ({
                                                ...prev,
                                                banners: { ...prev.banners, [cat]: "" }
                                            }))
                                        }}
                                    >
                                        <Trash size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCTS SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Section Produits en Vedette
                </h3>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Badge (Surtitre)</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.productsSection?.badge || ""}
                            onChange={(e) => setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, badge: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.productsSection?.title || ""}
                            onChange={(e) => setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, title: e.target.value } })}
                        />
                    </div>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>
                    Filtres
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {homeData.productsSection?.filters?.map((f: any, i: number) => (
                        <div key={i} style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                className="admin-form-input"
                                placeholder="Label (ex: Tout)"
                                value={f.label}
                                onChange={(e) => {
                                    const newF = [...homeData.productsSection.filters]
                                    newF[i].label = e.target.value
                                    setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, filters: newF } })
                                }}
                            />
                            <input
                                type="text"
                                className="admin-form-input"
                                placeholder="Valeur (ex: all)"
                                value={f.value}
                                onChange={(e) => {
                                    const newF = [...homeData.productsSection.filters]
                                    newF[i].value = e.target.value
                                    setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, filters: newF } })
                                }}
                            />
                            <button className="admin-btn admin-btn-danger admin-btn-icon" onClick={() => {
                                const newF = homeData.productsSection.filters.filter((_: any, idx: number) => idx !== i)
                                setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, filters: newF } })
                            }}>
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => {
                        const newF = [...(homeData.productsSection?.filters || []), { label: "Nouveau", value: "nouveau" }]
                        setHomeData({ ...homeData, productsSection: { ...homeData.productsSection, filters: newF } })
                    }}>
                        <Plus size={14} /> Ajouter un filtre
                    </button>
                </div>
            </div>

            {/* STORY SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Section Notre Histoire (Story)
                </h3>
                
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    {homeData.story?.imageSrc ? (
                        <Image src={homeData.story.imageSrc} alt="Founder" width={80} height={80} style={{ borderRadius: "8px", objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: 80, height: 80, borderRadius: "8px", backgroundColor: "var(--admin-border)" }} />
                    )}
                    <div>
                        <label className="admin-btn admin-btn-ghost admin-btn-sm" style={{ display: "inline-flex", cursor: "pointer" }}>
                            <Upload size={14} style={{ marginRight: 6 }} /> Changer la photo
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={async (e) => {
                                    if (e.target.files?.[0]) {
                                        const fd = new FormData()
                                        fd.append("file", e.target.files[0])
                                        try {
                                            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
                                            if (res.ok) {
                                                const data = await res.json()
                                                setHomeData({ ...homeData, story: { ...homeData.story, imageSrc: data.path } })
                                            }
                                        } catch (err) {}
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Nom de la fondatrice</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.story?.founderName || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, founderName: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Rôle</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.story?.founderRole || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, founderRole: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Badge (Surtitre)</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.story?.badgeText || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, badgeText: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre Ligne 1</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.story?.titleLine1 || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, titleLine1: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre Ligne 2 (Accent)</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.story?.titleLine2 || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, titleLine2: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Description</label>
                        <textarea
                            className="admin-form-input"
                            rows={4}
                            value={homeData.story?.description || ""}
                            onChange={(e) => setHomeData({ ...homeData, story: { ...homeData.story, description: e.target.value } })}
                        />
                    </div>
                </div>
            </div>

            {/* COLLECTIONS SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Section Collections
                </h3>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Badge (Surtitre)</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.collectionsSection?.badge || ""}
                            onChange={(e) => setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, badge: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.collectionsSection?.title || ""}
                            onChange={(e) => setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, title: e.target.value } })}
                        />
                    </div>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>
                    Blocs Collections
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {homeData.collectionsSection?.items?.map((c: any, i: number) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px", border: "1px solid var(--admin-border)", borderRadius: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                {c.image ? (
                                    <Image src={c.image} alt="Col" width={80} height={80} style={{ borderRadius: "8px", objectFit: "cover" }} />
                                ) : (
                                    <div style={{ width: 80, height: 80, borderRadius: "8px", backgroundColor: "var(--admin-border)" }} />
                                )}
                                <div>
                                    <label className="admin-btn admin-btn-ghost admin-btn-sm" style={{ display: "inline-flex", cursor: "pointer" }}>
                                        <Upload size={14} style={{ marginRight: 6 }} /> Changer l'image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={async (e) => {
                                                if (e.target.files?.[0]) {
                                                    const fd = new FormData()
                                                    fd.append("file", e.target.files[0])
                                                    try {
                                                        const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
                                                        if (res.ok) {
                                                            const data = await res.json()
                                                            const newItems = [...homeData.collectionsSection.items]
                                                            newItems[i].image = data.path
                                                            setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, items: newItems } })
                                                        }
                                                    } catch (err) {}
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Titre</label>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    value={c.title}
                                    onChange={(e) => {
                                        const newItems = [...homeData.collectionsSection.items]
                                        newItems[i].title = e.target.value
                                        setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, items: newItems } })
                                    }}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Sous-titre</label>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    value={c.subtitle}
                                    onChange={(e) => {
                                        const newItems = [...homeData.collectionsSection.items]
                                        newItems[i].subtitle = e.target.value
                                        setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, items: newItems } })
                                    }}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Lien (ex: /sacs)</label>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    value={c.href}
                                    onChange={(e) => {
                                        const newItems = [...homeData.collectionsSection.items]
                                        newItems[i].href = e.target.value
                                        setHomeData({ ...homeData, collectionsSection: { ...homeData.collectionsSection, items: newItems } })
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER SECTION */}
            <div className="admin-stat-card" style={{ display: "block", marginBottom: "24px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "8px" }}>
                    Section Pied de page (Footer)
                </h3>
                
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Newsletter & Promo</h4>
                <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <input
                        type="checkbox"
                        checked={homeData.footer?.newsletter?.active ?? true}
                        onChange={(e) => setHomeData({
                            ...homeData,
                            footer: {
                                ...homeData.footer,
                                newsletter: { ...homeData.footer?.newsletter, active: e.target.checked }
                            }
                        })}
                    />
                    <label className="admin-form-label" style={{ marginBottom: 0 }}>Activer la section Newsletter</label>
                </div>
                
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Titre Promo</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.footer?.newsletter?.title || ""}
                            onChange={(e) => setHomeData({
                                ...homeData,
                                footer: {
                                    ...homeData.footer,
                                    newsletter: { ...homeData.footer?.newsletter, title: e.target.value }
                                }
                            })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Description Newsletter</label>
                        <textarea
                            className="admin-form-input"
                            rows={2}
                            value={homeData.footer?.newsletter?.description || ""}
                            onChange={(e) => setHomeData({
                                ...homeData,
                                footer: {
                                    ...homeData.footer,
                                    newsletter: { ...homeData.footer?.newsletter, description: e.target.value }
                                }
                            })}
                        />
                    </div>
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>Réseaux Sociaux (Laisser vide pour masquer)</h4>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    {["facebook", "instagram", "tiktok", "snapchat", "whatsapp"].map((platform) => (
                        <div key={platform} className="admin-form-group">
                            <label className="admin-form-label capitalize">{platform}</label>
                            <input
                                type="text"
                                className="admin-form-input"
                                placeholder={`Lien ${platform}`}
                                value={homeData.footer?.socials?.[platform] || ""}
                                onChange={(e) => setHomeData({
                                    ...homeData,
                                    footer: {
                                        ...homeData.footer,
                                        socials: { ...homeData.footer?.socials, [platform]: e.target.value }
                                    }
                                })}
                            />
                        </div>
                    ))}
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>Informations Générales</h4>
                <div className="admin-form-group">
                    <label className="admin-form-label">Description (sous le logo)</label>
                    <textarea
                        className="admin-form-input"
                        rows={2}
                        value={homeData.footer?.description || ""}
                        onChange={(e) => setHomeData({ ...homeData, footer: { ...homeData.footer, description: e.target.value } })}
                    />
                </div>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Copyright</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.footer?.copyright || ""}
                            onChange={(e) => setHomeData({ ...homeData, footer: { ...homeData.footer, copyright: e.target.value } })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Texte du bas</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={homeData.footer?.bottomText || ""}
                            onChange={(e) => setHomeData({ ...homeData, footer: { ...homeData.footer, bottomText: e.target.value } })}
                        />
                    </div>
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "12px" }}>Colonnes de Liens</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {homeData.footer?.columns?.map((col: any, colIndex: number) => (
                        <div key={colIndex} style={{ padding: "16px", border: "1px solid var(--admin-border)", borderRadius: "8px" }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Titre de la colonne</label>
                                <input
                                    type="text"
                                    className="admin-form-input"
                                    value={col.title}
                                    onChange={(e) => {
                                        const newCols = [...homeData.footer.columns];
                                        newCols[colIndex].title = e.target.value;
                                        setHomeData({ ...homeData, footer: { ...homeData.footer, columns: newCols } })
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "12px" }}>
                                <label className="admin-form-label">Liens</label>
                                {col.links.map((link: any, linkIndex: number) => (
                                    <div key={linkIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                        <input
                                            type="text"
                                            className="admin-form-input"
                                            placeholder="Label"
                                            value={link.label}
                                            onChange={(e) => {
                                                const newCols = [...homeData.footer.columns];
                                                newCols[colIndex].links[linkIndex].label = e.target.value;
                                                setHomeData({ ...homeData, footer: { ...homeData.footer, columns: newCols } })
                                            }}
                                        />
                                        <input
                                            type="text"
                                            className="admin-form-input"
                                            placeholder="URL"
                                            value={link.href}
                                            onChange={(e) => {
                                                const newCols = [...homeData.footer.columns];
                                                newCols[colIndex].links[linkIndex].href = e.target.value;
                                                setHomeData({ ...homeData, footer: { ...homeData.footer, columns: newCols } })
                                            }}
                                        />
                                        <button className="admin-btn admin-btn-danger admin-btn-icon" onClick={() => {
                                            const newCols = [...homeData.footer.columns];
                                            newCols[colIndex].links = newCols[colIndex].links.filter((_: any, idx: number) => idx !== linkIndex);
                                            setHomeData({ ...homeData, footer: { ...homeData.footer, columns: newCols } })
                                        }}>
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => {
                                    const newCols = [...homeData.footer.columns];
                                    newCols[colIndex].links.push({ label: "Nouveau lien", href: "#" });
                                    setHomeData({ ...homeData, footer: { ...homeData.footer, columns: newCols } })
                                }}>
                                    <Plus size={14} /> Ajouter un lien
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", paddingBottom: "48px" }}>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                    style={{ padding: "12px 24px", fontSize: "16px" }}
                >
                    {saving ? <div className="admin-spinner" style={{ width: 16, height: 16 }} /> : <Check size={18} />}
                    {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
            </div>
        </div>
    )
}
