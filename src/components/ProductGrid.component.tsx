"use client";
import { SanityProduct } from "../../config/inventory";
import { urlForImage } from "../../sanity/lib/image";
import { formatCurrencyString } from "use-shopping-cart";

interface Props {
  products: SanityProduct[];
}

export const ProductGrid = ({ products }: Props) => {
  if (products?.length === 0) {
    return <h2>No products found</h2>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-sm-between gap-3">
      {products.map((product) => (
        <div key={product._id}>
          <div className="card" style={{ width: 225, height: 450 }}>
            <img src={urlForImage(product.images[0]).url()} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text" suppressHydrationWarning>
                {" "}
                {formatCurrencyString({
                  currency: product.currency,
                  value: product.price,
                })}
              </p>
              <a href="#" className="btn btn-primary">
                Add to cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
