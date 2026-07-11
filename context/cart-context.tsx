"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Product, WHATSAPP_NUMBER, formatPrice } from "@/lib/products-data"

export type CartItem = {
    product: Product
    quantity: number
}

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    cartCount: number
    cartTotal: number
    isCartOpen: boolean
    setCartOpen: (open: boolean) => void
    getWhatsAppCartLink: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Lazy initializer: runs once on mount (client-only), avoids setState-in-effect
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return []
        try {
            const saved = localStorage.getItem("mariashop_cart")
            return saved ? (JSON.parse(saved) as CartItem[]) : []
        } catch {
            return []
        }
    })
    const [isCartOpen, setCartOpen] = useState(false)

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("mariashop_cart", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product: Product, quantity = 1) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.product.id === product.id)
            if (existing) {
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prevItems, { product, quantity }]
        })
        setCartOpen(true) // Automatically open the cart sidebar when an item is added
    }

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

    const getWhatsAppCartLink = () => {
        const cleanNumber = WHATSAPP_NUMBER.replace(/\+/g, "").trim()
        const origin = typeof window !== "undefined" ? window.location.origin : ""
        
        let itemsList = ""
        cartItems.forEach((item, index) => {
            const itemTotal = item.product.price * item.quantity
            const productUrl = origin ? `   🔗 Lien : ${origin}/produit/${item.product.id}\n` : ""
            itemsList += `${index + 1}. *${item.product.name}* (x${item.quantity}) - ${formatPrice(itemTotal)}\n${productUrl}`
        })

        const message = `Bonjour Maria Shop, je souhaite finaliser ma commande avec les articles suivants :
 
${itemsList}
*Total de la commande : ${formatPrice(cartTotal)}*

Pouvez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`

        return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setCartOpen,
                getWhatsAppCartLink,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
