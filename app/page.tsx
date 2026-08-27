import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Products } from "@/components/products"
import { Collections } from "@/components/collections"
import { Story } from "@/components/story"
import { SiteFooter } from "@/components/site-footer"

import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export default function Page() {
  const homeDataPath = path.join(process.cwd(), "data", "home.json")
  let homeData = null
  try {
      homeData = JSON.parse(fs.readFileSync(homeDataPath, "utf-8"))
  } catch (err) {
      console.error("Failed to load home data", err)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero data={homeData?.hero} />
        <Categories data={homeData?.categories} />
        <Products data={homeData?.productsSection} />
        <Collections data={homeData?.collectionsSection} />
        <Story data={homeData?.story} />
      </main>
      <SiteFooter />
    </div>
  )
}
