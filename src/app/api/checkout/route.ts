import { NextResponse } from "next/server";
import { validateCartItems } from "use-shopping-cart/utilities";
import { stripe } from "../../../../lib/stripe";
import { inventory } from "../../../../config/inventory";

export async function POST(request: Request) {
  const cartDetails = await request.json();
  console.log(inventory, cartDetails);

  let lineItems;
  try {
    lineItems = validateCartItems(inventory, cartDetails);
  } catch (error) {
    console.error("Error validating cart items: ", error);
    throw error;
  }

  const origin = request.headers.get("origin");
  console.log(`Request received from origin: ${origin}`);
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["PL"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1OdwVpGMAfiodSdk5bddz56S",
      },
    ],
    billing_address_collection: "auto",
    success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    currency: "pln",
  });
  return NextResponse.json(session);
}
