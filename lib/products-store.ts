import fs from "fs"
import path from "path"
import type { Product } from "@/lib/products-data"

const DATA_FILE = path.join(process.cwd(), "data", "products.json")

export function readProducts(): Product[] {
    try {
        const raw = fs.readFileSync(DATA_FILE, "utf-8")
        return JSON.parse(raw)
    } catch {
        return []
    }
}

export function writeProducts(products: Product[]): void {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8")
}
