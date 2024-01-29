import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import "../assets/sass/style.css";
import { siteConfig } from "../../config/site";
import { ProductGrid } from "@/components/ProductGrid.component";
import { SanityProduct } from "../../config/inventory";
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
  const { date = "desc", price, size, category, themes, search } = searchParams;

  const priceOrder = searchParams.price ? `| order(price ${searchParams.price})` : "";
  const dateOrder = searchParams.date ? `| order(_createdAt ${searchParams.date})` : "";
  const order = `${priceOrder}${dateOrder}`;

  const productFilter = `_type == "product"`;
  const categoryFilter = category ? `&& "${category}" in categories` : "";
  const sizeFilter = size ? `&& "${size}" in sizes` : "";
  const themeFilter = themes ? `&& "${themes}" in themes` : "";
  const searchFilter = search ? `&& name match "${search}"` : "";
  const filter = `*[${productFilter}${categoryFilter}${sizeFilter}${themeFilter}${searchFilter}]`;

  const products = await client.fetch<SanityProduct[]>(groq`${filter} ${order} {
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

  products.forEach((product) => console.log("id: ", product._id));

  return (
    <div>
      <div className="px-4 pt-20 mt-4 text-center">
        <h1 className="fs-1 fw-bolder">{siteConfig.name}</h1>
        <p className="fs-4 mx-auto mt-4 mb-4 lh-base">{siteConfig.description}</p>
      </div>
      <div>
        <main className="mx-auto w-75 max-w-6xl px-6">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between items-center border-b border-gray-200 pb-2 pt-24 dark:border-gray-800  border-bottom">
            <p className="fs-5 mb-3 mb-md-0">
              {" "}
              {products.length} product{products.length === 1 ? "" : "s"}
            </p>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="container pt-4">
            <div className="row gap-3">
              <div className="col-md-4 col-lg-3">
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
