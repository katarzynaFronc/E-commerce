"use client";

import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export const CartSummary = () => {
  const { formattedTotalPrice, totalPrice, cartDetails, cartCount, redirectToCheckout } = useShoppingCart();
  const [isLoading, setLoading] = useState(false);
  const isDisabled = isLoading || cartCount! === 0;
  const shippingAmount = cartCount! > 0 ? 1000 : 0;
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

  return (
    <>
      <form action="/api/checkout/route" method="POST"></form>
      <div className="border rounded-3 p-3">
        <p className="fs-5 fw-bold text-center">Order summary</p>
        <dl>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt className="fs-6">Subtotal</dt>
            <dd className="ms-4 fw-bold">{formattedTotalPrice}</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt className="fs-6">Shipping estimate</dt>
            <dd className="ms-4 fw-bold">{formatCurrencyString({ value: shippingAmount, currency: "PLN" })}</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt className="fs-6">Order total</dt>
            <dd className="ms-4 fw-bold">{formatCurrencyString({ value: totalAmoumt, currency: "PLN" })}</dd>
          </div>
        </dl>

        <Button onClick={onCheckout} style={{ width: "100%" }} disabled={isDisabled} className="checkoutBtn">
          {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}

          {isLoading ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </>
  );
};
