import { CategoryTemplate } from "@/components/category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sacs Bogolan & Pochettes Chic — Maria Shop",
    description: "Découvrez notre collection de sacs à main, pochettes et sacs de voyage ornés de motifs bogolan artisanaux chez Maria Shop.",
}

export default function SacsPage() {
    return (
        <CategoryTemplate
            categoryName="Sacs"
            categoryTitle="Sacs & Pochettes"
            categoryDesc="Sublimez votre allure avec notre collection de maroquinerie d'exception. Sacs tissés, pochettes de soirée et sacs à dos alliant cuir vegan robuste et authentique bogolan fait main."
            filterValue="sacs"
        />
    )
}
