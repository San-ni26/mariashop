import { type NextRequest } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return Response.json({ error: "Aucun fichier fourni" }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
        if (!allowedTypes.includes(file.type)) {
            return Response.json(
                { error: "Type de fichier non supporté. Utilisez JPG, PNG, WebP, GIF ou SVG." },
                { status: 400 }
            )
        }

        // Generate a safe filename
        const ext = file.name.split(".").pop() || "png"
        const safeName = file.name
            .replace(/\.[^/.]+$/, "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        const timestamp = Date.now()
        const filename = `${safeName}-${timestamp}.${ext}`

        // Write to public/images
        const uploadDir = path.join(process.cwd(), "public", "images")
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = path.join(uploadDir, filename)
        fs.writeFileSync(filePath, buffer)

        return Response.json({
            path: `/images/${filename}`,
            filename,
        })
    } catch (error) {
        return Response.json(
            { error: "Erreur lors de l'upload" },
            { status: 500 }
        )
    }
}
