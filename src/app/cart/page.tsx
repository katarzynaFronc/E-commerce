import { Cartitems } from "@/components/CartItems.component";
import { CartSummary } from "@/components/CartSummary.component";

export default function Page() {
  return (
    <>
      <main className="d-flex flex-column align-items-center mt-4">
        <h3 className="mb-4">Shopping Cart</h3>
        <div>
          <h4>Items in your shopping cart</h4>
          <div className="d-md-flex">
            <Cartitems />
            <CartSummary />
          </div>
        </div>
      </main>
    </>
  );
}
