// ============================================================
//  MARIA SHOP — Base de données des produits
//
//  ✅ Pour ajouter un nouveau produit :
//     1. Copier un bloc existant dans la section correspondante
//     2. Modifier l'id (unique, en minuscules avec tirets)
//     3. Remplir name, price, image, description, features
//     4. Choisir filter : "sacs" | "accessoires" | "vetements"
//     5. Choisir gender : "unisexe" | "femme" | "homme" | undefined
// ============================================================

export type ProductGender = "unisexe" | "femme" | "homme"

export type Product = {
    id: string           // Identifiant unique
    name: string         // Nom affiché sur le site
    category: string     // Catégorie affichée (ex: "Sacs", "Accessoires")
    price: number        // Prix en FCFA
    oldPrice?: number    // Ancien prix en FCFA (optionnel)
    rating: number       // Note sur 5
    image: string        // Chemin de l'image
    tag?: string         // Badge affiché (ex: "Best-seller", "Nouveau")
    filter: string       // Filtre interne : "sacs" | "accessoires" | "vetements"
    gender?: ProductGender  // "unisexe" | "femme" | "homme"
    description: string  // Description
    features?: string[]  // Liste de caractéristiques
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22376537022"

// ============================================================
//  SECTION ACCESSOIRES (Vêtements & Parures)
// ============================================================
const ACCESSOIRES_PRODUCTS: Product[] = [
    // --- Pièces Unisexe ---
    {
        id: "chale-bogolan",
        name: "Châle Bogolan",
        category: "Accessoires",
        price: 22000,
        rating: 5,
        image: "/images/collection-accessories.png",
        tag: "Unisexe",
        filter: "accessoires",
        gender: "unisexe",
        description: "Grand châle en coton tissé à la main aux motifs bogolan traditionnels. Polyvalent et élégant, il se porte en écharpe, en cape ou en couverture pour homme comme pour femme.",
        features: ["100% coton tissé main", "Motifs bogolan authentiques", "Dimensions : 180 × 80 cm", "Lavable à la main"]
    },
    {
        id: "kimono-bogolan",
        name: "Kimono Bogolan",
        category: "Accessoires",
        price: 35000,
        rating: 5,
        image: "/images/collection-accessories.png",
        tag: "Unisexe",
        filter: "accessoires",
        gender: "unisexe",
        description: "Kimono fluide en lin et coton imprimé bogolan. Léger, confortable et intemporel, il s'adapte aussi bien aux tenues masculines que féminines pour toute occasion.",
        features: ["Mélange lin et coton premium", "Imprimés bogolan exclusifs", "Coupe ample avec ceinture amovible", "Taille unique"]
    },
    {
        id: "capuche-bogolan",
        name: "Capuche Bogolan",
        category: "Accessoires",
        price: 18000,
        rating: 4,
        image: "/images/product-clothing.png",
        tag: "Unisexe",
        filter: "accessoires",
        gender: "unisexe",
        description: "Capuche ample en coton bogolan, alliant le confort du streetwear urbain à l'authenticité des tissus africains. Pour lui comme pour elle.",
        features: ["Coton bogolan authentique", "Coupe oversize tendance", "Doublure intérieure douce", "Style urbain africain"]
    },
    {
        id: "grand-boubou",
        name: "Grand Boubou",
        category: "Accessoires",
        price: 45000,
        oldPrice: 55000,
        rating: 5,
        image: "/images/collection-accessories.png",
        tag: "Prestige",
        filter: "accessoires",
        gender: "unisexe",
        description: "Grand boubou traditionnel en bazin richement brodé à la main. Symbole de prestige et de cérémonie, il s'impose en toute occasion formelle ou festive pour homme et femme.",
        features: ["Bazin de qualité supérieure", "Broderies faites main à l'aiguille", "Coupe ample et majestueuse", "Idéal pour les cérémonies"]
    },

    // --- Pièces Femme ---
    {
        id: "kimono-joliya",
        name: "Kimono JOLIYA",
        category: "Accessoires",
        price: 32000,
        rating: 5,
        image: "/images/product-clothing.png",
        tag: "Femme",
        filter: "accessoires",
        gender: "femme",
        description: "Le Kimono JOLIYA est une création féminine exclusive aux imprimés bogolan raffinés. Sa coupe fluide et sa longueur midi mettent en valeur la silhouette féminine avec élégance.",
        features: ["Tissu satiné ultra-doux", "Imprimés JOLIYA exclusifs Maria Shop", "Ceinture en bogolan assortie", "Coupe féminine élégante"]
    },
    {
        id: "haut-sanouya",
        name: "Haut Sanouya",
        category: "Accessoires",
        price: 15000,
        rating: 5,
        image: "/images/product-clothing.png",
        tag: "Femme",
        filter: "accessoires",
        gender: "femme",
        description: "Le Haut Sanouya est une blouse féminine courte aux détails bogolan en poitrine et aux manches évasées. Une touche de modernité africaine pour le quotidien.",
        features: ["Coton léger et respirant", "Détails brodés bogolan en col", "Manches évasées tendance", "Style moderne et élégant"]
    },
    {
        id: "robe-bogolan",
        name: "Robe Bogolan",
        category: "Accessoires",
        price: 28000,
        oldPrice: 34000,
        rating: 5,
        image: "/images/product-clothing.png",
        tag: "Femme",
        filter: "accessoires",
        gender: "femme",
        description: "Robe mi-longue cintrée en wax hollandais aux imprimés bogolan. Élégante pour les sorties en ville, les cérémonies ou les soirées africaines.",
        features: ["Wax hollandais haut de gamme", "Coupe cintrée valorisant la silhouette", "Fermeture invisible dans le dos", "Finitions soignées"]
    },
    {
        id: "turban-bogolan-eclat",
        name: "Turban Bogolan Éclat",
        category: "Accessoires",
        price: 18000,
        rating: 5,
        image: "/images/product-turban.png",
        tag: "Femme",
        filter: "accessoires",
        gender: "femme",
        description: "Un turban moderne orné de motifs traditionnels Bogolan faits main. Facile à enfiler, il apporte une touche royale et culturelle à toutes vos tenues quotidiennes.",
        features: ["Coton authentique tissé main", "Motifs bogolan traditionnels", "Élastique ajustable à l'arrière", "Facile à enfiler"]
    },
    {
        id: "parure-doree-sahel",
        name: "Parure Dorée Sahel",
        category: "Accessoires",
        price: 28000,
        rating: 4,
        image: "/images/product-jewelry.png",
        tag: "Femme",
        filter: "accessoires",
        gender: "femme",
        description: "Ensemble de bijoux dorés finement ciselés inspirés de l'orfèvrerie sahélienne. Composé d'un collier plastron et de boucles d'oreilles assorties.",
        features: ["Finition plaqué or 18 carats", "Détails martelés à la main", "Hypoallergénique et sans nickel", "Livré avec son écrin"]
    },

    // --- Pièces Homme ---
    {
        id: "tunique-bogolan-homme",
        name: "Tunique Bogolan Homme",
        category: "Accessoires",
        price: 26000,
        rating: 5,
        image: "/images/hero-model.png",
        tag: "Homme",
        filter: "accessoires",
        gender: "homme",
        description: "Tunique cintrée pour homme ornée de motifs bogolan verticaux sur la poitrine. Allie fierté culturelle et élégance moderne.",
        features: ["Coton premium structuré", "Bandes bogolan cousues main", "Col officier moderne", "Idéal pour sorties ou cérémonies"]
    }
]

// ============================================================
//  SECTION SACS
// ============================================================
const SACS_PRODUCTS: Product[] = [
    {
        id: "sac-tisse-bogolan",
        name: "Sac Tissé Bogolan",
        category: "Sacs",
        price: 37000,
        rating: 5,
        image: "/images/product-bag.png",
        tag: "Best-seller",
        filter: "sacs",
        description: "Sac à main structuré en cuir vegan et véritable tissu bogolan fait main. Un accessoire unique alliant modernité urbaine et tradition africaine.",
        features: ["Cuir vegan de haute qualité", "Empiècements en bogolan authentique", "Bandoulière amovible incluse", "Poches intérieures zippées"]
    },
    {
        id: "pochette-bogolan-chic",
        name: "Pochette Bogolan Chic",
        category: "Sacs",
        price: 15000,
        rating: 5,
        image: "/images/product-bag.png",
        tag: "Nouveau",
        filter: "sacs",
        description: "Pochette à main élégante pour vos soirées, mariages ou sorties. Finition en lin avec rabat en authentique bogolan noir et blanc.",
        features: ["Format compact pratique", "Fermoir aimanté sécurisé", "Rabat en bogolan fait main", "Intérieur doublé satin"]
    },
    {
        id: "sac-dos-voyage",
        name: "Sac à Dos Voyage Bogolan",
        category: "Sacs",
        price: 42000,
        rating: 4,
        image: "/images/product-bag.png",
        filter: "sacs",
        description: "Grand sac à dos de voyage robuste alliant toile de coton épaisse, détails en cuir marron et motifs bogolan. Idéal pour les baroudeurs au style unique.",
        features: ["Toile de coton renforcée", "Finitions cuir véritable", "Compartiment PC 15 pouces", "Grande capacité de rangement"]
    }
]

// ============================================================
//  SECTION VÊTEMENTS
// ============================================================
const VETEMENTS_PRODUCTS: Product[] = [
    {
        id: "tshirt-bogolan-classique",
        name: "T-shirt Bogolan Classique",
        category: "Vêtements",
        price: 15000,
        rating: 5,
        image: "/images/product-clothing.png",
        tag: "Nouveau",
        filter: "vetements",
        gender: "unisexe",
        description: "Un t-shirt en coton léger et confortable, orné de magnifiques motifs Bogolan sur la poitrine. Parfait pour un style casual élégant.",
        features: ["100% coton respirant", "Motifs bogolan authentiques", "Coupe unisexe confortable", "Lavable en machine"]
    },
    {
        id: "robe-ete-bogolan",
        name: "Robe d'été Bogolan",
        category: "Vêtements",
        price: 28000,
        rating: 5,
        image: "/images/product-clothing.png",
        tag: "Populaire",
        filter: "vetements",
        gender: "femme",
        description: "Robe d'été légère et fluide avec des motifs Bogolan inspirés de l'artisanat traditionnel. Idéale pour les journées ensoleillées.",
        features: ["Tissu fluide et léger", "Design bogolan moderne", "Ajustable à la taille", "Confort optimal"]
    },
    {
        id: "pagne-bogolan-traditionnel",
        name: "Pagne Bogolan Traditionnel",
        category: "Vêtements",
        price: 18000,
        rating: 4,
        image: "/images/collection-accessories.png",
        tag: "Authentique",
        filter: "vetements",
        gender: "unisexe",
        description: "Véritable pagne traditionnel tissé et teint à la main au Mali. Une pièce unique chargée d'histoire et de culture.",
        features: ["Tissage traditionnel fait main", "Teinture 100% naturelle", "Dimensions standard", "Pièce de collection"]
    }
]

// ============================================================
//  EXPORT GLOBAL
// ============================================================
export const PRODUCTS: Product[] = [
    ...ACCESSOIRES_PRODUCTS,
    ...SACS_PRODUCTS,
    ...VETEMENTS_PRODUCTS,
]

// ============================================================
//  LECTURE DYNAMIQUE DEPUIS LE FICHIER JSON (Serveur uniquement)
// ============================================================
export async function getProductsFromJSON(): Promise<Product[]> {
    // Cette fonction est gardée pour compatibilité.
    // La lecture réelle du JSON se fait dans products-store.ts (API route).
    return PRODUCTS
}

// ============================================================
//  CATÉGORIES DE NAVIGATION
// ============================================================
export const CATEGORIES = [
    { name: "Accessoires", filter: "accessoires", desc: "Vêtements & parures", icon: "ShoppingBag", path: "/accessoires" },
    { name: "Sacs", filter: "sacs", desc: "Sacs & pochettes", icon: "Gem", path: "/sacs" },
    { name: "Vêtements", filter: "vetements", desc: "Kimonos & Collections", icon: "Shirt", path: "/vetements" },
]

// ============================================================
//  UTILITAIRES
// ============================================================
export function formatPrice(price: number): string {
    return price.toLocaleString("fr-FR") + " FCFA"
}

export function getWhatsAppSingleOrderLink(
    productName: string,
    price: number,
    gender?: ProductGender,
    productUrl?: string,
): string {
    const cleanNumber = WHATSAPP_NUMBER.replace(/\+/g, "").trim()
    const genderLabels: Record<string, string> = {
        femme: "femme",
        homme: "homme",
        unisexe: "unisexe",
    }
    const genderNote = gender && genderLabels[gender] ? ` (Modèle ${genderLabels[gender]})` : ""
    const linkLine = productUrl ? `\n🔗 Lien du produit : ${productUrl}` : ""
    const message = `Bonjour Maria Shop, je souhaite commander l'article suivant :
*${productName}*${genderNote} — ${formatPrice(price)}${linkLine}

Pouvez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}
