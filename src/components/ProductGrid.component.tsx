"use client";
import Link from "next/link";
// import Image from "next/image";
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
    <div className="container-fluid">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-6 col-lg-4 col-xxl-3 gy-3" key={product._id}>
            <Link key={product._id} href={`/product/${product.slug}`} className="text-decoration-none text-reset">
              {/* <div className=""> */}
              <picture className="border-3">
                <img src={urlForImage(product.images[0]).url()} className="card-img-top" alt={product.name} />
              </picture>
              <div className="">
                <h5>{product.name}</h5>
                <p>
                  {" "}
                  {formatCurrencyString({
                    currency: product.currency,
                    value: product.price,
                  })}
                </p>
              </div>
              {/* </div> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
