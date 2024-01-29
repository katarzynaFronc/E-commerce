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
  }, [clearCart, customerDetails]);

  if (!customerDetails) {
    return (
      <>
        <p>No checkout session found</p>
      </>
    );
  }
  return (
    <>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">Order Successful!</h1>
      <h3 className="mt-8 text-2xl leading-7">
        Thank you, <span className="font-extrabold">{customerDetails.name}</span>!
      </h3>
      <p className="mt-8">
        Check your purchase email {customerDetails.email}
        <span className="mx-1 font-extrabold text-indigo-500">Email</span> for your invoice.
      </p>
    </>
  );
}
