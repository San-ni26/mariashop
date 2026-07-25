"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/products-data"
import { PRODUCTS } from "@/lib/products-data"

/**
 * Algorithme de mélange aléatoire (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

/**
 * Hook qui charge les produits depuis l'API (fichier JSON).
 * Mélange aléatoirement l'ordre des produits à chaque rechargement
 * pour offrir une vitrine dynamique et renouvelée au visiteur.
 */
export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function fetchProducts() {
            try {
                const res = await fetch("/api/admin/products")
                if (res.ok && !cancelled) {
                    const data = await res.json()
                    if (Array.isArray(data)) {
                        setProducts(shuffleArray(data))
                    }
                }
            } catch {
                if (!cancelled) setProducts(shuffleArray(PRODUCTS))
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchProducts()
        return () => { cancelled = true }
    }, [])

    return { products, loading }
}

