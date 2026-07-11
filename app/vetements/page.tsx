import { CategoryTemplate } from "@/components/category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Vêtements & Collections — Maria Shop",
    description: "Découvrez notre collection de vêtements artisanaux de Maria Shop. Des créations uniques inspirées du riche héritage africain.",
}

export default function VetementsPage() {
    return (
        <CategoryTemplate
            categoryName="Vêtements"
            categoryTitle="Vêtements & Collections"
            categoryDesc="Découvrez notre collection de vêtements artisanaux de Maria Shop. Des créations uniques inspirées du riche héritage africain."
            filterValue="vetements"
        />
    )
}
