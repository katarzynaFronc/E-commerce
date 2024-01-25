"use client";

import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export const CartSummary = () => {
  const { formattedTotalPrice, totalPrice, cartDetails, cartCount } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || cartCount! === 0;
  const shippingAmount = cartCount! > 0 ? 500 : 0;
  const totalAmoumt = totalPrice! + shippingAmount;

  const onCheckout = () => {};

  return (
    <>
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
