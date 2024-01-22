"use client";
import Link from "next/link";
import { SanityProduct } from "../../config/inventory";
import { urlForImage } from "../../sanity/lib/image";
import { formatCurrencyString } from "use-shopping-cart";
import { AddToCardBtn } from "./AddToCardBtn.component";

interface Props {
  product: SanityProduct;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="col-md-6 col-xl-4 col-xxl-3 gy-3 m-0 p-2" key={product._id}>
      <Link key={product._id} href={`/product/${product.slug}`} className="text-decoration-none text-reset">
        <picture className="">
          <img src={urlForImage(product.images[0]).url()} className="card-img-top" alt={product.name} />
        </picture>
        <div className="pt-2">
          <h5 className="text-center">{product.name}</h5>
          <p className="text-center">
            {" "}
            {formatCurrencyString({
              currency: product.currency,
              value: product.price,
            })}
          </p>
        </div>
      </Link>
    </div>
  );
};
