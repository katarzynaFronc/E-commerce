import { groq } from "next-sanity";
import { SanityProduct } from "../../../../config/inventory";
import { client } from "../../../../sanity/lib/client";
import { ProductGallery } from "@/components/ProductGallery. component";
import { ProductInfo } from "@/components/ProductInfo.component";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const product = await client.fetch<SanityProduct>(groq`*[_type == "product" && slug.current == "${params.slug}"][0]{
    _id,
    _createdAt,
    "id": _id,
    name,
    sku,
    images,
    price,
    currency,
    sizes,
    categories,
    themes,
    "slug": slug.current
  }`);

  return (
    <main className="d-flex justify-content-center mb-3">
      <div className="d-flex flex-column flex-md-row justify-content-center mt-5">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}
