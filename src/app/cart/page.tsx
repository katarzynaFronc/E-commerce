import { Cartitems } from "@/components/CartItems.component";
import { CartSummary } from "@/components/CartSummary.component";

export default function Page() {
  return (
    <>
      <main className="d-flex flex-column align-items-center mt-4">
        <p className="mb-5 fs-1 fw-bolder">Shopping Cart</p>
        <div>
          <p className="fs-4 fw-bold mb-3">Items in your shopping cart:</p>
          <div className="d-md-flex">
            <Cartitems />
            <CartSummary />
          </div>
        </div>
      </main>
    </>
  );
}
