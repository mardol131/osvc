import Stripe from "stripe";
import { createSubscribe } from "../../../_functions/backend";

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

        if (!data.parent?.subscription_details?.metadata) {
          throw new Error("Missing subscribe metadata");
        }

        console.log("META", data.parent.subscription_details.metadata);

        const stripeSubscribeId =
          typeof data.parent.subscription_details.subscription === "string"
            ? data.parent.subscription_details.subscription
            : data.parent.subscription_details.subscription.id;

        await createSubscribe({
          email: data.parent.subscription_details.metadata.email,
          phone: data.parent.subscription_details.metadata.phone,
          phonePrefix: data.parent.subscription_details.metadata.phonePrefix,
          activityGroups: JSON.parse(
            data.parent.subscription_details.metadata.activityGroups
          ),
          terms: JSON.parse(data.parent.subscription_details.metadata.terms),
          active: true,
          promotionCode:
            data.parent.subscription_details.metadata.promotionCode,
          stripeSubscribeId: stripeSubscribeId,
        });

        const nameArray = data.customer_name?.split(" ") || [];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ecomail/subscribe`!,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameArray[0],
              surname: nameArray[nameArray.length - 1],
              email: data.customer_email,
              phone: data.customer_phone,
            }),
          }
        );

        await response.json();
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
