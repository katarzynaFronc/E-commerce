"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SanityProduct } from "../../config/inventory";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Link from "next/link";

interface Props {
  product: SanityProduct;
}

export const ProductInfo = ({ product }: Props) => {
  const { addItem, incrementItem, cartDetails } = useShoppingCart();
  const [show, setShow] = useState(false);

  const isInCart = !!cartDetails?.[product._id];

  function addToCart() {
    const item = {
      ...product,
    };
    isInCart ? incrementItem(item._id) : addItem(item);
  }

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
      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={() => {
              addToCart(), setShow(true);
            }}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
            Add to cart
          </Button>
        </div>
        <ToastContainer position="bottom-end">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">{product.name}</strong>
              <Link href="/cart">
                <Button>Open cart</Button>
              </Link>
            </Toast.Header>
            <Toast.Body>The product has been added to your cart</Toast.Body>
          </Toast>
        </ToastContainer>
      </form>
    </div>
  );
};
