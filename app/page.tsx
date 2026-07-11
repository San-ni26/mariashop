import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Products } from "@/components/products"
import { Collections } from "@/components/collections"
import { Story } from "@/components/story"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Collections />
        <Story />
      </main>
      <SiteFooter />
    </div>
  )
}
