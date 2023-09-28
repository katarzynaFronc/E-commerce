"use client";

import { Button, Toast } from "react-bootstrap";
import { SanityProduct } from "../../config/inventory";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

interface Props {
  product: SanityProduct;
}

export const ProductInfo = ({ product }: Props) => {
  const { addItem, incrementItem, cartDetails } = useShoppingCart();

  const isInCart = !!cartDetails?.[product._id];

  function addToCart() {
    const item = {
      ...product,
    };
    isInCart ? incrementItem(item._id) : addItem(item);
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold ">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Themes: {product.themes}</h2>
        <p className="text-3xl tracking-tight" suppressHydrationWarning>
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}
        </p>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{product.sizes}</strong>
        </p>
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button type="button" onClick={() => addToCart()} className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
};
