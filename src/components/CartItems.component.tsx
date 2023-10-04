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
            <Image src={urlForImage(product.images[0]).url()} alt={`Main ${product.name} image`} width={150} height={200} className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg" />
          </div>
          <div className="d-flex flex-column align-items-end">
            <Link href={`/products/${product.slug}`} className="text-sm text-decoration-none">
              {product.name}
            </Link>
            <p>
              {" "}
              {formatCurrencyString({
                currency: product.currency,
                value: product.price,
              })}
            </p>
            <InputGroup>
              <Form.Control id={`quantity-${productIdx}`} name={`quantity-${productIdx}`} placeholder="quantity" type="number" min="1" value={product.quantity} onChange={(event) => setItemQuantity(product._id, Number(event.target.value))} />
            </InputGroup>
            <Button onClick={() => removeCartItem(product)}>Remove</Button>
          </div>
        </ListGroup.Item>
      ))}
      <ToastContainer position="bottom-end">
        <Toast onClose={() => setRemoved(false)} show={removed} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">{removedProductName}</strong>
          </Toast.Header>
          <Toast.Body>The product has been removed from your cart</Toast.Body>
        </Toast>
      </ToastContainer>
    </ListGroup>
  );
};
