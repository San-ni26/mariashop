import { type NextRequest } from "next/server"
import { readProducts, writeProducts } from "@/lib/products-store"

export const dynamic = "force-dynamic"

// GET — List all products
export async function GET() {
    const products = readProducts()
    return Response.json(products)
}

// POST — Add a new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const products = readProducts()

        // Generate a unique ID from the name
        const baseId = (body.name || "produit")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")

        // Make sure the ID is unique
        let id = baseId
        let counter = 1
        while (products.some((p) => p.id === id)) {
            id = `${baseId}-${counter}`
            counter++
        }

        const newProduct = {
            id,
            name: body.name || "",
            category: body.category || "",
            price: Number(body.price) || 0,
            oldPrice: body.oldPrice ? Number(body.oldPrice) : undefined,
            rating: Number(body.rating) || 5,
            image: body.image || "/images/product-bag.png",
            tag: body.tag || undefined,
            filter: body.filter || "",
            gender: body.gender || undefined,
            description: body.description || "",
            features: body.features || [],
        }

        products.push(newProduct)
        writeProducts(products)

        return Response.json(newProduct, { status: 201 })
    } catch (error) {
        return Response.json(
            { error: "Erreur lors de l'ajout du produit" },
            { status: 400 }
        )
    }
}
