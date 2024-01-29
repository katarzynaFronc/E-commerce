"use client";
import { SanityProduct } from "../../config/inventory";
import { ProductCard } from "./ProductCard.component";

interface Props {
  products: SanityProduct[];
}

export const ProductGrid = ({ products }: Props) => {
  if (products?.length === 0) {
    return <h2>No products found</h2>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
