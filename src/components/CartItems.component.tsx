"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { CartItemsEmpty } from "./CartItemsEmpty.component";
import { urlForImage } from "../../sanity/lib/image";
import { Button, Form, InputGroup, ListGroup, Toast, ToastContainer } from "react-bootstrap";
import { Product } from "use-shopping-cart/core";
import { useState } from "react";

export const Cartitems = () => {
  const { cartDetails, removeItem, setItemQuantity } = useShoppingCart();
  const cartItems = Object.entries(cartDetails!).map(([_, product]) => product);
  const [removed, setRemoved] = useState(false);
  const [removedProductName, setRemovedProductName] = useState("");

  const removeCartItem = (product: Product) => {
    removeItem(product._id);
    setRemovedProductName(product.name);
    setRemoved(true);
  };

  if (cartItems.length === 0) return <CartItemsEmpty />;

  return (
    <ListGroup className="m-0 p-0">
      {cartItems.map((product, productIdx) => (
        <ListGroup.Item key={"product._id"} className="d-flex justify-content-between pb-3">
          <div>
            <Image src={urlForImage(product.images[0]).url()} alt={`Main ${product.name} image`} width={100} height={150} className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg" />
          </div>
          <div className="d-flex flex-column align-items-end">
            <Link href={`/product/${product.slug}`} className="text-sm text-decoration-none">
              {product.name}
            </Link>
            <p>
              {" "}
              {formatCurrencyString({
                currency: product.currency,
                value: product.price,
              })}
            </p>
            <InputGroup style={{ width: "50%" }}>
              <Form.Control id={`quantity-${productIdx}`} name={`quantity-${productIdx}`} placeholder="quantity" type="number" min="1" value={product.quantity} onChange={(event) => setItemQuantity(product._id, Number(event.target.value))} />
              <Button onClick={() => removeCartItem(product)} variant="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </Button>
            </InputGroup>
          </div>
        </ListGroup.Item>
      ))}
      <ToastContainer position="bottom-end">
        <Toast onClose={() => setRemoved(false)} show={removed} delay={3000} autohide bg="danger">
          <Toast.Header>
            <strong className="me-auto">{removedProductName}</strong>
          </Toast.Header>
          <Toast.Body>Product removed from cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </ListGroup>
  );
};
