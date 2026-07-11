import { type NextRequest } from "next/server"
import { readProducts, writeProducts } from "@/lib/products-store"

export const dynamic = "force-dynamic"

// PUT — Update a product by ID
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const products = readProducts()

        const index = products.findIndex((p) => p.id === id)
        if (index === -1) {
            return Response.json(
                { error: "Produit non trouvé" },
                { status: 404 }
            )
        }

        // Update fields, keeping existing values as fallback
        const existing = products[index]
        products[index] = {
            ...existing,
            name: body.name ?? existing.name,
            category: body.category ?? existing.category,
            price: body.price !== undefined ? Number(body.price) : existing.price,
            oldPrice: body.oldPrice !== undefined
                ? (body.oldPrice ? Number(body.oldPrice) : undefined)
                : existing.oldPrice,
            rating: body.rating !== undefined ? Number(body.rating) : existing.rating,
            image: body.image ?? existing.image,
            tag: body.tag !== undefined ? (body.tag || undefined) : existing.tag,
            filter: body.filter ?? existing.filter,
            gender: body.gender !== undefined ? (body.gender || undefined) : existing.gender,
            description: body.description ?? existing.description,
            features: body.features ?? existing.features,
        }

        writeProducts(products)
        return Response.json(products[index])
    } catch (error) {
        return Response.json(
            { error: "Erreur lors de la mise à jour" },
            { status: 400 }
        )
    }
}

// DELETE — Remove a product by ID
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const products = readProducts()

        const index = products.findIndex((p) => p.id === id)
        if (index === -1) {
            return Response.json(
                { error: "Produit non trouvé" },
                { status: 404 }
            )
        }

        const deleted = products.splice(index, 1)[0]
        writeProducts(products)

        return Response.json({ message: "Produit supprimé", product: deleted })
    } catch (error) {
        return Response.json(
            { error: "Erreur lors de la suppression" },
            { status: 400 }
        )
    }
}
