import { stripe } from "../../../lib/stripe";
import { CheckoutSession } from "../../components/CheckoutSession.component";
import { Button } from "react-bootstrap";

interface Props {
  searchParams: {
    session_id?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const sessionId = searchParams?.session_id ?? "";
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
  const customerDetails = checkoutSession?.customer_details;

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <CheckoutSession customerDetails={customerDetails} />
        <div className="mt-4  d-flex align-items-center justify-content-center">
          <a href="/">
            <Button className="goBackBtn me-2" type="submit">
              Go back home
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}
