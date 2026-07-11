import type { Metadata } from "next"
import "./admin.css"

export const metadata: Metadata = {
    title: "Admin — Maria Shop",
    description: "Interface d'administration Maria Shop",
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="admin-layout">
            {children}
        </div>
    )
}
