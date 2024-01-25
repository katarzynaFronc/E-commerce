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
      <p className="fs-5 fw-bold mt-2 mb-4">{product.name}</p>
      <div className="mt-3">
        <p className="mb-4 custom-color" suppressHydrationWarning>
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}
        </p>
        <div className="d-flex mb-4">
          <p className="fw-bold">Themes: </p>
          {product.themes.map((theme: string, i: number) => (
            <>
              {i > 0 && ", "}
              <p key={theme} className="ms-2">
                {theme}
              </p>
            </>
          ))}
        </div>
        <div className="d-flex">
          <p className="fw-bold">Size:</p>
          <p>{product.sizes}</p>
        </div>
      </div>
      <AddToCardBtn product={product} />
    </div>
  );
};
