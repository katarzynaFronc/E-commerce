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
import { ProductFilter } from "@/components/ProductFilter.component";

interface Props {
  searchParams: {
    date?: string;
    price?: number;
    size?: string;
    category?: string;
    themes?: string;
    search?: string;
  };
}

export default function Home({ searchParams }: Props) {
  const { date, price, category, themes, size, search } = searchParams;
  const priceOrder = price ? `| order(price ${price})` : "";
  const dateOrder = date ? `| order(_createdAt ${date})` : "";
  const order = `${priceOrder}${dateOrder}`;

  const productFilter = `_type == "product"`;
  const categoryFilter = category ? `&& "${category}" in categories` : "";
  const themesFilter = themes ? `&& "${themes}" in themes` : "";
  const sizeFilter = size ? `&& "${size}" in sizes` : "";
  const searchFilter = search ? `&& name match "*${search}*"` : "";

  const filter = `*[${productFilter}${categoryFilter}${themesFilter}${sizeFilter}${searchFilter}]`;

  const [products, setProducts] = useState<SanityProduct[]>([]);

  useEffect(() => {
    client
      .fetch<SanityProduct[]>(
        groq`${filter} ${order} {
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
  }, [filter, order]);

  return (
    <div>
      <div className="px-4 pt-20 mt-4 text-center">
        <h3 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h3>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div>
      <div>
        <main className="mx-auto w-75 max-w-6xl px-6">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between items-center border-b border-gray-200 pb-2 pt-24 dark:border-gray-800  border-bottom">
            <h4 className="text-xl font-bold tracking-tight sm:text-2xl">
              {" "}
              {products.length} product{products.length === 1 ? "" : "s"}
            </h4>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="container pt-4">
            <div className="row gap-3">
              <div className="col-md-3">
                <ProductFilter />
              </div>
              <div className="col">
                <ProductGrid products={products} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
