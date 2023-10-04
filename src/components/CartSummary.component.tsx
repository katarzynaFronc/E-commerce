import { Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const CartSummary = () => {
  return (
    <>
      <div className="border rounded-3 p-4">
        <h5>Order summary</h5>
        <dl>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Subtotal</dt>
            <dd className="m-0">Subtotal Amount</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Shipping estimate</dt>
            <dd className="m-0">Shipping Amount</dd>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <dt>Order total</dt>
            <dd className="m-0">Order Amount</dd>
          </div>
        </dl>

        <Button className="w-full">
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          Loading...
        </Button>
      </div>
    </>
  );
};
