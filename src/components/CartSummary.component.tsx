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
