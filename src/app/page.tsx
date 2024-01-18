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

export default async function Home({ searchParams }: Props) {
  console.log(searchParams);

  const priceOrder = searchParams.price ? `| order(price ${searchParams.price})` : "";
  const dateOrder = searchParams.date ? `| order(_createdAt ${searchParams.date})` : "";
  const order = `${priceOrder}${dateOrder}`;

  const products = await client.fetch<SanityProduct[]>(groq`*[_type == "product"] ${order} {
    _id,
    _createdAt,
    name,
    sku,
    images,
    currency,
    price,
    description,
    themes,
    "slug": slug.current
  }`);

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
