"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/products-data"
import { PRODUCTS } from "@/lib/products-data"

/**
 * Hook qui charge les produits depuis l'API (fichier JSON).
 * Affiche immédiatement les produits statiques comme fallback,
 * puis les remplace par les produits dynamiques dès que l'API répond.
 */
export function useProducts() {
    const [products, setProducts] = useState<Product[]>(PRODUCTS)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function fetchProducts() {
            try {
                const res = await fetch("/api/admin/products")
                if (res.ok && !cancelled) {
                    const data = await res.json()
                    if (Array.isArray(data) && data.length > 0) {
                        setProducts(data)
                    }
                }
            } catch {
                // Fallback silencieux — on garde PRODUCTS statiques
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchProducts()
        return () => { cancelled = true }
    }, [])

    return { products, loading }
}
