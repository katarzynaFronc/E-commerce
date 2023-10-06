"use client";

import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export const CartSummary = () => {
  const { formattedTotalPrice, totalPrice, cartDetails, cartCount, redirectToCheckout } = useShoppingCart();
  const [isLoading, setLoading] = useState(false);
  const isDisabled = isLoading || cartCount! === 0;
  const shippingAmount = cartCount! > 0 ? 500 : 0;
  const totalAmoumt = totalPrice! + shippingAmount;

  async function onCheckout() {
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(cartDetails),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result = await redirectToCheckout(data.id);
    if (result?.error) {
      console.error(result);
    }
    setLoading(false);
  }

  // async function onCheckout() {
  //   setLoading(true);
  //   const response = await fetch("/api/checkout", {
  //     method: "POST",
  //     body: JSON.stringify(cartDetails),
  //   });
  //   const responseData = await response.text();
  //   if (responseData) {
  //     const data = JSON.parse(responseData);
  //   } else {
  //     console.error("Empty response from server");
  //   }
  //   setLoading(false);
  // }

  return (
    <>
      <form action="/api/checkout/route" method="POST"></form>
      <div className="border rounded-3 p-4">
        <h5>Order summary</h5>
        <dl>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Subtotal</dt>
            <dd className="m-0">{formattedTotalPrice}</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Shipping estimate</dt>

            <dd className="m-0">{formatCurrencyString({ value: shippingAmount, currency: "PLN" })}</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Order total</dt>
            <dd className="m-0">{formatCurrencyString({ value: totalAmoumt, currency: "PLN" })}</dd>
          </div>
        </dl>

        <Button onClick={onCheckout} style={{ width: "100%" }} disabled={isDisabled}>
          {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}

          {isLoading ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </>
  );
};
