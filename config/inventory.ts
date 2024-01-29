import { Image } from "sanity";
import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";

interface InventoryProduct {
  id: string;
  name: string;
  image: string;
  images: string[];
  categories: string[];
  sizes: string[];
  colors: string[];
  price: number;
  currency: string;
  description: string;
  sku: string;
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  themes: string[];
  _id: string;
  _createdAt: string;
  name: string;
  sku: string;
  images: Image[];
  currency: string;
  price: number;
  slug: string;
}

export const inventory = await client.fetch<SanityProduct[]>(groq`*[_type == "product"]{
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
