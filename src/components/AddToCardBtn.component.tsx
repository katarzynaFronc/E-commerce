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
      <div className="mt-4 d-flex">
        <Button
          type="button"
          onClick={() => {
            addToCart(), setShow(true);
          }}
          className="addToCartBtn w-100 d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <span> Add to cart</span>
        </Button>
      </div>
      <ToastContainer position="bottom-end">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">{product.name}</strong>
            <Link href="/cart">
              <Button className="openCart">Open cart</Button>
            </Link>
          </Toast.Header>
          <Toast.Body>Product added to cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </form>
  );
};
