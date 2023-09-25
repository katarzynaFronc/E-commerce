"use client";

import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { siteConfig } from "../../config/site";
import { ProductGrid } from "@/components/ProductGrid.component";
import { SanityProduct } from "../../config/inventory";
import { useEffect, useState } from "react";
import { ProductSort } from "@/components/ProductSort.component";

export default function Home() {
  const [products, setProducts] = useState<SanityProduct[]>([]);

  useEffect(() => {
    client
      .fetch<SanityProduct[]>(
        groq`*[_type == "product"] {
    _id,
    _createdAt,
    name,
    sku,
    images,
    currency,
    price,
    "slug": slug.current
}`
      )
      .then((data: SanityProduct[]) => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {" "}
              {products.length} product{products.length === 1 ? "" : "s"}
            </h1>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div>
              <div className="hidden lg:block">{/* Product filters */}</div>
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
