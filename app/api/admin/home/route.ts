import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "home.json")

export async function GET() {
    try {
        const fileData = await fs.readFile(DATA_FILE, "utf-8")
        const data = JSON.parse(fileData)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error reading home data:", error)
        return NextResponse.json({ error: "Failed to read home data" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json()
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error saving home data:", error)
        return NextResponse.json({ error: "Failed to save home data" }, { status: 500 })
    }
}
