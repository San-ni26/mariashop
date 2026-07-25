import type { Metadata } from "next"
import { readProducts } from "@/lib/products-store"
import { formatPrice } from "@/lib/products-data"
import { ProductClientView } from "./product-client"

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const products = readProducts()
    const product = products.find((p) => p.id === id)

    if (!product) {
        return {
            title: "Article introuvable | Maria Shop",
            description: "Cet article n'existe pas ou n'est plus disponible.",
        }
    }

    const formattedPrice = formatPrice(product.price)
    const title = `${product.name} - ${formattedPrice} | Maria Shop`
    const description = product.description
        ? `${product.description} — Prix : ${formattedPrice}`
        : `Découvrez ${product.name} au prix de ${formattedPrice} sur Maria Shop.`

    const image = product.image || "/images/logo_maria.png"

    return {
        title,
        description,
        openGraph: {
            title: `${product.name} • ${formattedPrice}`,
            description,
            images: [
                {
                    url: image,
                    alt: product.name,
                },
            ],
            type: "article",
            siteName: "Maria Shop",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} • ${formattedPrice}`,
            description,
            images: [image],
        },
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params
    const products = readProducts()
    const product = products.find((p) => p.id === id) || null

    return <ProductClientView product={product} />
}
