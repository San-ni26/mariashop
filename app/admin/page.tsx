"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product, ProductGender } from "@/lib/products-data"

// ============================================================
// Icons (inline SVG for no extra deps)
// ============================================================
const Icons = {
    Dashboard: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    Package: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" />
        </svg>
    ),
    ShoppingBag: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    ),
    Sparkles: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    ),
    Plus: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    ),
    Pencil: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
    ),
    Trash: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    ),
    Search: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    X: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Upload: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    AlertCircle: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    Star: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    StarEmpty: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    ExternalLink: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    ),
    Menu: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    ),
    BarChart: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
        </svg>
    ),
    Tag: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" />
        </svg>
    ),
    Gem: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" />
        </svg>
    ),
}

// ============================================================
// Helper
// ============================================================
function formatPrice(price: number): string {
    return price.toLocaleString("fr-FR") + " FCFA"
}

type ToastType = "success" | "error"
interface Toast {
    id: number
    message: string
    type: ToastType
}

// ============================================================
// Default empty product form
// ============================================================
const EMPTY_FORM: Omit<Product, "id"> & { id?: string } = {
    name: "",
    category: "Accessoires",
    price: 0,
    oldPrice: undefined,
    rating: 5,
    image: "",
    tag: "",
    filter: "accessoires",
    gender: undefined,
    description: "",
    features: [],
}

const CATEGORY_OPTIONS = [
    { label: "Accessoires", filter: "accessoires" },
    { label: "Sacs", filter: "sacs" },
    { label: "Vêtements", filter: "vetements" },
]

const GENDER_OPTIONS: { label: string; value: ProductGender | "" }[] = [
    { label: "Aucun", value: "" },
    { label: "Unisexe", value: "unisexe" },
    { label: "Femme", value: "femme" },
    { label: "Homme", value: "homme" },
]

// ============================================================
// Main Admin Page Component
// ============================================================
export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filterCategory, setFilterCategory] = useState("")
    const [filterGender, setFilterGender] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 20
    const [toasts, setToasts] = useState<Toast[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit">("add")
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    // Delete confirmation
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
    const [deleting, setDeleting] = useState(false)

    // Image upload
    const [imagePreview, setImagePreview] = useState<string>("")
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Toast counter
    const toastIdRef = useRef(0)

    // ---- Toast ----
    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = ++toastIdRef.current
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }, [])

    // ---- Fetch products ----
    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/products")
            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            }
        } catch (err) {
            showToast("Erreur de chargement des produits", "error")
        } finally {
            setLoading(false)
        }
    }, [showToast])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    // ---- Filtered products ----
    const filtered = products.filter((p) => {
        const matchSearch =
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase())
        const matchCategory = !filterCategory || p.filter === filterCategory
        const matchGender = !filterGender || p.gender === filterGender
        return matchSearch && matchCategory && matchGender
    })

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const paginatedProducts = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // ---- Stats ----
    const stats = {
        total: products.length,
        accessoires: products.filter((p) => p.filter === "accessoires").length,
        sacs: products.filter((p) => p.filter === "sacs").length,
        vetements: products.filter((p) => p.filter === "vetements").length,
        avgPrice: products.length
            ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
            : 0,
    }

    // ---- Open modal ----
    const openAddModal = () => {
        setModalMode("add")
        setFormData({ ...EMPTY_FORM, features: [] })
        setEditingId(null)
        setImagePreview("")
        setModalOpen(true)
    }

    const openEditModal = (product: Product) => {
        setModalMode("edit")
        setFormData({
            ...product,
            features: product.features ? [...product.features] : [],
        })
        setEditingId(product.id)
        setImagePreview(product.image)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingId(null)
        setImagePreview("")
    }

    // ---- Image upload ----
    const handleImageUpload = async (file: File) => {
        setUploading(true)
        try {
            const fd = new FormData()
            fd.append("file", file)
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            if (res.ok) {
                const data = await res.json()
                setFormData((prev) => ({ ...prev, image: data.path }))
                setImagePreview(data.path)
                showToast("Image uploadée avec succès")
            } else {
                const err = await res.json()
                showToast(err.error || "Erreur d'upload", "error")
            }
        } catch {
            showToast("Erreur d'upload", "error")
        } finally {
            setUploading(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handleImageUpload(file)
    }

    // ---- Save (add/edit) ----
    const handleSave = async () => {
        if (!formData.name.trim()) {
            showToast("Le nom du produit est requis", "error")
            return
        }
        if (!formData.price || formData.price <= 0) {
            showToast("Le prix doit être supérieur à 0", "error")
            return
        }

        setSaving(true)
        try {
            const url = modalMode === "edit"
                ? `/api/admin/products/${editingId}`
                : "/api/admin/products"
            const method = modalMode === "edit" ? "PUT" : "POST"

            const body = {
                ...formData,
                price: Number(formData.price),
                oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
                rating: Number(formData.rating),
                tag: formData.tag || undefined,
                gender: formData.gender || undefined,
                features: (formData.features || []).filter((f) => f.trim()),
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (res.ok) {
                showToast(
                    modalMode === "edit"
                        ? `"${formData.name}" mis à jour`
                        : `"${formData.name}" ajouté`
                )
                closeModal()
                fetchProducts()
            } else {
                const err = await res.json()
                showToast(err.error || "Erreur", "error")
            }
        } catch {
            showToast("Erreur de sauvegarde", "error")
        } finally {
            setSaving(false)
        }
    }

    // ---- Delete ----
    const openDeleteConfirm = (product: Product) => {
        setDeletingProduct(product)
        setDeleteConfirmOpen(true)
    }

    const handleDelete = async () => {
        if (!deletingProduct) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/products/${deletingProduct.id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                showToast(`"${deletingProduct.name}" supprimé`)
                setDeleteConfirmOpen(false)
                setDeletingProduct(null)
                fetchProducts()
            } else {
                showToast("Erreur de suppression", "error")
            }
        } catch {
            showToast("Erreur de suppression", "error")
        } finally {
            setDeleting(false)
        }
    }

    // ---- Feature management ----
    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...(prev.features || []), ""],
        }))
    }

    const updateFeature = (index: number, value: string) => {
        setFormData((prev) => {
            const features = [...(prev.features || [])]
            features[index] = value
            return { ...prev, features }
        })
    }

    const removeFeature = (index: number) => {
        setFormData((prev) => {
            const features = [...(prev.features || [])]
            features.splice(index, 1)
            return { ...prev, features }
        })
    }

    // ---- Category change syncs filter ----
    const handleCategoryChange = (category: string) => {
        const opt = CATEGORY_OPTIONS.find((c) => c.label === category)
        setFormData((prev) => ({
            ...prev,
            category,
            filter: opt?.filter || prev.filter,
        }))
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <>
            {/* Sidebar */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay open"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-sidebar-logo">
                    <div className="admin-sidebar-logo-icon">M</div>
                    <div className="admin-sidebar-logo-text">
                        <span>Maria Shop</span>
                        <span>Administration</span>
                    </div>
                </div>
                <nav className="admin-sidebar-nav">
                    <button className="admin-nav-item active">
                        <Icons.Dashboard />
                        Tableau de bord
                    </button>
                    <button className="admin-nav-item" onClick={openAddModal}>
                        <Icons.Plus />
                        Ajouter un produit
                    </button>
                </nav>
                <div className="admin-sidebar-footer">
                    <Link href="/" target="_blank">
                        <Icons.ExternalLink />
                        Voir le site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Top Bar */}
                <header className="admin-topbar">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                            className="admin-mobile-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Menu"
                        >
                            <Icons.Menu />
                        </button>
                        <h1>Gestion des Produits</h1>
                    </div>
                    <div className="admin-topbar-actions">
                        <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
                            <Icons.Plus />
                            Nouveau produit
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {/* Stats */}
                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon accent">
                                <Icons.Package />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-label">Total Produits</span>
                                <span className="admin-stat-value">{stats.total}</span>
                            </div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon info">
                                <Icons.ShoppingBag />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-label">Accessoires</span>
                                <span className="admin-stat-value">{stats.accessoires}</span>
                            </div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon warning">
                                <Icons.Gem />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-label">Sacs</span>
                                <span className="admin-stat-value">{stats.sacs}</span>
                            </div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon success">
                                <Icons.Sparkles />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-label">Vêtements</span>
                                <span className="admin-stat-value">{stats.vetements}</span>
                            </div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon accent">
                                <Icons.BarChart />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-label">Prix Moyen</span>
                                <span className="admin-stat-value" style={{ fontSize: "18px" }}>
                                    {formatPrice(stats.avgPrice)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="admin-toolbar">
                        <div className="admin-search">
                            <Icons.Search />
                            <input
                                id="admin-search-input"
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>
                        <select
                            id="admin-filter-category"
                            className="admin-filter-select"
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(e.target.value)
                                setCurrentPage(1)
                            }}
                        >
                            <option value="">Toutes catégories</option>
                            <option value="accessoires">Accessoires</option>
                            <option value="sacs">Sacs</option>
                            <option value="vetements">Vêtements</option>
                        </select>
                        <select
                            id="admin-filter-gender"
                            className="admin-filter-select"
                            value={filterGender}
                            onChange={(e) => {
                                setFilterGender(e.target.value)
                                setCurrentPage(1)
                            }}
                        >
                            <option value="">Tous genres</option>
                            <option value="unisexe">Unisexe</option>
                            <option value="femme">Femme</option>
                            <option value="homme">Homme</option>
                        </select>
                        <span style={{ fontSize: "12px", color: "var(--admin-text-dim)", marginLeft: "auto" }}>
                            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {/* Products Table */}
                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
                            <div className="admin-spinner" style={{ width: 32, height: 32 }} />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="admin-empty">
                            <Icons.Package />
                            <p>
                                {search || filterCategory || filterGender
                                    ? "Aucun produit ne correspond à vos filtres"
                                    : "Aucun produit — commencez par en ajouter un !"}
                            </p>
                        </div>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Catégorie</th>
                                        <th>Genre</th>
                                        <th>Prix</th>
                                        <th>Note</th>
                                        <th>Tag</th>
                                        <th style={{ textAlign: "right" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="admin-product-cell">
                                                    <Image
                                                        src={product.image || "/images/product-bag.png"}
                                                        alt={product.name}
                                                        width={44}
                                                        height={44}
                                                        className="admin-product-thumb"
                                                    />
                                                    <div>
                                                        <div className="admin-product-name">{product.name}</div>
                                                        <div className="admin-product-id">{product.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="admin-badge admin-badge-category">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td>
                                                {product.gender ? (
                                                    <span className={`admin-badge admin-badge-gender-${product.gender}`}>
                                                        {product.gender === "femme" ? "♀ Femme" : product.gender === "homme" ? "♂ Homme" : "⚥ Unisexe"}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "var(--admin-text-dim)", fontSize: "12px" }}>—</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="admin-price">{formatPrice(product.price)}</span>
                                                {product.oldPrice && (
                                                    <span className="admin-old-price">{formatPrice(product.oldPrice)}</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-rating">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span key={star} className={`admin-rating-star ${star <= product.rating ? "" : "empty"}`}>
                                                            {star <= product.rating ? <Icons.Star /> : <Icons.StarEmpty />}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                {product.tag ? (
                                                    <span className="admin-badge admin-badge-category">{product.tag}</span>
                                                ) : (
                                                    <span style={{ color: "var(--admin-text-dim)", fontSize: "12px" }}>—</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-actions-cell" style={{ justifyContent: "flex-end" }}>
                                                    <button
                                                        className="admin-btn admin-btn-ghost admin-btn-sm admin-btn-icon"
                                                        onClick={() => openEditModal(product)}
                                                        title="Modifier"
                                                        aria-label={`Modifier ${product.name}`}
                                                    >
                                                        <Icons.Pencil />
                                                    </button>
                                                    <button
                                                        className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                                                        onClick={() => openDeleteConfirm(product)}
                                                        title="Supprimer"
                                                        aria-label={`Supprimer ${product.name}`}
                                                    >
                                                        <Icons.Trash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {totalPages > 1 && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", padding: "16px", borderTop: "1px solid var(--admin-border)" }}>
                                    <button 
                                        className="admin-btn admin-btn-ghost admin-btn-sm" 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        style={currentPage === 1 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                                    >
                                        Précédent
                                    </button>
                                    <span style={{ fontSize: "14px", color: "var(--admin-text-dim)" }}>
                                        Page {currentPage} sur {totalPages}
                                    </span>
                                    <button 
                                        className="admin-btn admin-btn-ghost admin-btn-sm" 
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        style={currentPage === totalPages ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* ============================================================ */}
            {/* ADD / EDIT MODAL */}
            {/* ============================================================ */}
            {modalOpen && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>{modalMode === "edit" ? "Modifier le produit" : "Nouveau produit"}</h2>
                            <button className="admin-modal-close" onClick={closeModal}>
                                <Icons.X />
                            </button>
                        </div>

                        <div className="admin-modal-body">
                            <div className="admin-form-grid">
                                {/* Name */}
                                <div className="admin-form-group admin-form-full">
                                    <label className="admin-form-label" htmlFor="product-name">Nom du produit *</label>
                                    <input
                                        id="product-name"
                                        className="admin-form-input"
                                        type="text"
                                        placeholder="Ex : Sac Bogolan Premium"
                                        value={formData.name}
                                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                    />
                                </div>

                                {/* Category */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-category">Catégorie *</label>
                                    <select
                                        id="product-category"
                                        className="admin-form-select"
                                        value={formData.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                    >
                                        {CATEGORY_OPTIONS.map((c) => (
                                            <option key={c.filter} value={c.label}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Gender */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-gender">Genre</label>
                                    <select
                                        id="product-gender"
                                        className="admin-form-select"
                                        value={formData.gender || ""}
                                        onChange={(e) => setFormData((p) => ({
                                            ...p,
                                            gender: (e.target.value as ProductGender) || undefined,
                                        }))}
                                    >
                                        {GENDER_OPTIONS.map((g) => (
                                            <option key={g.value} value={g.value}>{g.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-price">Prix (FCFA) *</label>
                                    <input
                                        id="product-price"
                                        className="admin-form-input"
                                        type="number"
                                        min="0"
                                        placeholder="Ex : 25000"
                                        value={formData.price || ""}
                                        onChange={(e) => setFormData((p) => ({ ...p, price: Number(e.target.value) }))}
                                    />
                                </div>

                                {/* Old Price */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-old-price">Ancien prix (optionnel)</label>
                                    <input
                                        id="product-old-price"
                                        className="admin-form-input"
                                        type="number"
                                        min="0"
                                        placeholder="Ex : 30000"
                                        value={formData.oldPrice || ""}
                                        onChange={(e) => setFormData((p) => ({
                                            ...p,
                                            oldPrice: e.target.value ? Number(e.target.value) : undefined,
                                        }))}
                                    />
                                </div>

                                {/* Rating */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-rating">Note (1-5)</label>
                                    <select
                                        id="product-rating"
                                        className="admin-form-select"
                                        value={formData.rating}
                                        onChange={(e) => setFormData((p) => ({ ...p, rating: Number(e.target.value) }))}
                                    >
                                        {[5, 4, 3, 2, 1].map((r) => (
                                            <option key={r} value={r}>{"★".repeat(r)}{"☆".repeat(5 - r)} ({r}/5)</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tag */}
                                <div className="admin-form-group">
                                    <label className="admin-form-label" htmlFor="product-tag">Tag / Badge</label>
                                    <input
                                        id="product-tag"
                                        className="admin-form-input"
                                        type="text"
                                        placeholder="Ex : Best-seller, Nouveau"
                                        value={formData.tag || ""}
                                        onChange={(e) => setFormData((p) => ({ ...p, tag: e.target.value }))}
                                    />
                                </div>

                                {/* Description */}
                                <div className="admin-form-group admin-form-full">
                                    <label className="admin-form-label" htmlFor="product-desc">Description</label>
                                    <textarea
                                        id="product-desc"
                                        className="admin-form-textarea"
                                        rows={3}
                                        placeholder="Description du produit..."
                                        value={formData.description}
                                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="admin-form-group admin-form-full">
                                    <label className="admin-form-label">Image du produit</label>
                                    <div
                                        className={`admin-upload-zone ${imagePreview ? "has-image" : ""}`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) handleImageUpload(file)
                                            }}
                                        />
                                        {uploading ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", padding: "10px" }}>
                                                <div className="admin-spinner" />
                                                <span style={{ fontSize: "13px", color: "var(--admin-text-muted)" }}>Upload en cours...</span>
                                            </div>
                                        ) : imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Aperçu"
                                                className="admin-upload-preview"
                                            />
                                        ) : (
                                            <div className="admin-upload-placeholder">
                                                <Icons.Upload />
                                                <p>Glissez une image ou <span>parcourir</span></p>
                                            </div>
                                        )}
                                    </div>
                                    {/* Manual path input */}
                                    <input
                                        className="admin-form-input"
                                        type="text"
                                        placeholder="Ou entrez le chemin : /images/mon-image.png"
                                        value={formData.image}
                                        onChange={(e) => {
                                            setFormData((p) => ({ ...p, image: e.target.value }))
                                            setImagePreview(e.target.value)
                                        }}
                                        style={{ marginTop: "8px" }}
                                    />
                                </div>

                                {/* Features */}
                                <div className="admin-form-group admin-form-full">
                                    <label className="admin-form-label">Caractéristiques</label>
                                    <div className="admin-features-list">
                                        {(formData.features || []).map((feature, idx) => (
                                            <div key={idx} className="admin-feature-row">
                                                <input
                                                    className="admin-form-input"
                                                    type="text"
                                                    placeholder={`Caractéristique ${idx + 1}`}
                                                    value={feature}
                                                    onChange={(e) => updateFeature(idx, e.target.value)}
                                                />
                                                <button
                                                    className="admin-feature-remove"
                                                    onClick={() => removeFeature(idx)}
                                                    type="button"
                                                    aria-label="Retirer"
                                                >
                                                    <Icons.X />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="admin-btn admin-btn-ghost admin-btn-sm admin-feature-add"
                                            onClick={addFeature}
                                            type="button"
                                        >
                                            <Icons.Plus />
                                            Ajouter une caractéristique
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="admin-modal-footer">
                            <button className="admin-btn admin-btn-ghost" onClick={closeModal}>
                                Annuler
                            </button>
                            <button
                                className="admin-btn admin-btn-primary"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <div className="admin-spinner" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Icons.Check />
                                        {modalMode === "edit" ? "Mettre à jour" : "Créer le produit"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================ */}
            {/* DELETE CONFIRMATION */}
            {/* ============================================================ */}
            {deleteConfirmOpen && deletingProduct && (
                <div
                    className="admin-modal-overlay admin-confirm-modal"
                    onClick={(e) => e.target === e.currentTarget && setDeleteConfirmOpen(false)}
                >
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Confirmer la suppression</h2>
                            <button className="admin-modal-close" onClick={() => setDeleteConfirmOpen(false)}>
                                <Icons.X />
                            </button>
                        </div>
                        <div className="admin-modal-body">
                            <p className="admin-confirm-text">
                                Êtes-vous sûr de vouloir supprimer le produit{" "}
                                <span className="admin-confirm-name">&quot;{deletingProduct.name}&quot;</span> ?
                                <br />
                                Cette action est irréversible.
                            </p>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="admin-btn admin-btn-ghost" onClick={() => setDeleteConfirmOpen(false)}>
                                Annuler
                            </button>
                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <>
                                        <div className="admin-spinner" />
                                        Suppression...
                                    </>
                                ) : (
                                    <>
                                        <Icons.Trash />
                                        Supprimer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================ */}
            {/* TOASTS */}
            {/* ============================================================ */}
            <div className="admin-toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`admin-toast admin-toast-${toast.type}`}>
                        {toast.type === "success" ? <Icons.Check /> : <Icons.AlertCircle />}
                        <p>{toast.message}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
