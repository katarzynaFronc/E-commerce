"use client";
import { Header } from "@/components/Header.component";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/sass/style.css";

import { CartProvider } from "use-shopping-cart";
import { Footer } from "@/components/Footer.component";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;

  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <html>
        <body>
          <CartProvider cartMode="checkout-session" stripe={stripeKey} currency="PLN" shouldPersist={true}>
            <div className="page-wrapper">
              <Header />
              {children}
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </CartProvider>
        </body>
      </html>
    </html>
  );
}
