"use client";

import React, { useState } from "react";
import { SanityProduct } from "../../config/inventory";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { AddToCardBtn } from "./AddToCardBtn.component";

interface Props {
  product: SanityProduct;
}

export const ProductInfo = ({ product }: Props) => {
  const { cartDetails } = useShoppingCart();

  const isInCart = !!cartDetails?.[product._id];

  return (
    <div className="px-md-4">
      <h3 className="text-3xl font-bold ">{product.name}</h3>
      <div className="mt-3">
        <p className="text-3xl tracking-tight" suppressHydrationWarning>
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}
        </p>
        <div className="">
          Themes:
          {product.themes.map((theme: string) => (
            <p key={theme} className="p-0 m-0">
              {theme}
            </p>
          ))}
        </div>

        <p className="pt-3">
          Size: <strong>{product.sizes}</strong>
        </p>
      </div>
      <AddToCardBtn product={product} />
    </div>
  );
};
