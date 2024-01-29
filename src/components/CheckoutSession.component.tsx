"use client";

import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface Props {
  customerDetails: Stripe.Checkout.Session.CustomerDetails | null;
}

export function CheckoutSession({ customerDetails }: Props) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    if (customerDetails) {
      clearCart();
    }
  }, [customerDetails]);

  if (!customerDetails) {
    return (
      <>
        <p>No checkout session found</p>
      </>
    );
  }
  return (
    <>
      <p className="mb-5 mt-4 fs-1 fw-bolder custom-color">Order Successful!</p>
      <p className="mt-4 fs-4">
        Thank you, <span className="fw-bold">{customerDetails.name}</span>!
      </p>
      <p className="mt-4 fs-6">
        Check your purchase email
        <span className="custom-color"> {customerDetails.email}</span> for your invoice.
      </p>
    </>
  );
}
