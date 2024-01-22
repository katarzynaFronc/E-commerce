"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "use-shopping-cart";
import { SanityProduct } from "../../config/inventory";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Link from "next/link";

interface Props {
  product: SanityProduct;
}

export const AddToCardBtn = ({ product }: Props) => {
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
    <form className="mt-6">
      <div className="mt-4 flex">
        <Button
          type="button"
          onClick={() => {
            addToCart(), setShow(true);
          }}
          className="addToCartBtn w-100">
          Add to cart
        </Button>
      </div>
      <ToastContainer position="bottom-end">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="info">
          <Toast.Header>
            <strong className="me-auto">{product.name}</strong>
            <Link href="/cart">
              <Button>Open cart</Button>
            </Link>
          </Toast.Header>
          <Toast.Body>Product added to cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </form>
  );
};
