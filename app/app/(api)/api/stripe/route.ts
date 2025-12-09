import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const sig = request.headers.get("stripe-signature")!;

  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded": {
        const data = event.data.object;
        const nameArray = data.customer_name?.split(" ") || [];

        const response = await fetch(
          `${process.env.WEBSITE_URL}/api/ecomail/subscriber`!,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameArray[0],
              surname: nameArray[1],
              email: data.customer_email,
              phone: data.customer_phone,
            }),
          }
        );

        const json = await response.json();

        console.log(json);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(`Error processing event: ${err}`);
  }
  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
