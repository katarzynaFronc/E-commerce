"use client";

import Link from "next/link";
import { Button } from "react-bootstrap";

export const CartItemsEmpty = () => {
  return (
    <div className="d-flex flex-column border rounded-3 p-4">
      <h3>No products added</h3>
      <p>Add products to card</p>
      <Link href="/">
        <Button>Add Product</Button>
      </Link>
    </div>
  );
};
