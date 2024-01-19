"use client";
import { Header } from "@/components/Header.component";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/sass/style.css";

import { CartProvider } from "use-shopping-cart";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;

  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <html>
        <body className={poppins.className}>
          <CartProvider cartMode="checkout-session" stripe={stripeKey} currency="PLN" shouldPersist={true}>
            <Header />
            {children}
          </CartProvider>
        </body>
      </html>
    </html>
  );
}
