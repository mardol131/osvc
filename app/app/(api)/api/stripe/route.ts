import Stripe from "stripe";
import {
  createAccount,
  createPassword,
  createSubscribe,
  updateRecord,
} from "../../../_functions/backend";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const sig = request.headers.get("stripe-signature")!;

  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const data = event.data.object;

        if (data.mode !== "subscription") break;
        if (data.payment_status !== "paid") break;
        if (!data.metadata) {
          throw new Error("Missing subscribe metadata");
        }

        if (data.metadata.productKind === "general_subscription") {
          const stripeSubscriptionId =
            typeof data.subscription === "string"
              ? data.subscription
              : data.subscription?.id;

          if (!stripeSubscriptionId) {
            throw new Error("Missing subscription ID");
          }

          const subscription =
            await stripe.subscriptions.retrieve(stripeSubscriptionId);

          if (!subscription.metadata) {
            throw new Error("Missing subscription metadata");
          }

          const customer =
            typeof subscription.customer === "string"
              ? subscription.customer
              : subscription.customer.id;

          let accountId = subscription.metadata.accountId;
          let subscriptionId = subscription.metadata.cmsSubscribeId;

          await updateRecord({
            collectionSlug: "accounts",
            recordId: accountId,
            apiKey: process.env.CMS_API_KEY,
            body: {
              stripe: {
                customerId: customer,
              },
            },
          });

          await updateRecord({
            collectionSlug: "subscribes",
            recordId: subscriptionId,
            apiKey: process.env.CMS_API_KEY,
            body: {
              active: true,
              stripeSubscribeId: stripeSubscriptionId,
              promocodeAlreadySent: true,
            },
          });
        }

        break;
      }

      case "customer.subscription.deleted": {
        const data = event.data.object;

        if (!data.metadata) {
          throw new Error("Missing subscribe metadata");
        }

        await updateRecord({
          collectionSlug: "subscribes",
          recordId: data.metadata.cmsSubscribeId,
          apiKey: process.env.CMS_API_KEY,
          body: {
            active: false,
          },
        });

        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(`Error processing event: ${err}`);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
