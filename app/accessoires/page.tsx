import { CategoryTemplate } from "@/components/category-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Accessoires & Bijoux — Maria Shop",
    description: "Sacs tissés bogolan, turbans et bijoux artisanaux de Maria Shop. Des créations uniques inspirées du riche artisanat d'Afrique.",
}

export default function AccessoiresPage() {
    return (
        <CategoryTemplate
            categoryName="Accessoires"
            categoryTitle="Accessoires & Bijoux"
            categoryDesc="Révélez votre style avec notre sélection de vêtements et parures artisanales. Filtrez par genre pour trouver vos pièces idéales."
            filterValue="accessoires"
            showGenderFilter={true}
        />
    )
}
