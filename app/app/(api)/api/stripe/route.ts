import Stripe from "stripe";
import {
  createSubscribe,
  getCollection,
  getSingleRecord,
  updateRecord,
} from "../../../_functions/backend";
import { get } from "http";

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
          const subscriptionId =
            typeof data.subscription === "string"
              ? data.subscription
              : data.subscription?.id;

          if (!subscriptionId) {
            throw new Error("Missing subscription ID");
          }

          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          if (!subscription.metadata) {
            throw new Error("Missing subscription metadata");
          }

          const customer = !subscription.customer
            ? undefined
            : typeof subscription.customer === "string"
              ? subscription.customer
              : subscription.customer.id;

          const subscriptionResponse = await createSubscribe({
            email: subscription.metadata.email,
            phone: subscription.metadata.phone,
            phonePrefix: subscription.metadata.phonePrefix,
            activityGroups: JSON.parse(subscription.metadata.activityGroups),
            terms: JSON.parse(subscription.metadata.terms),
            marketing: JSON.parse(subscription.metadata.marketing),
            active: true,
            promotionCode: subscription.metadata.promotionCode,
            stripeSubscribeId: subscription.id,
            customerId: customer,
          });

          await stripe.subscriptions.update(subscription.id, {
            metadata: {
              cmsSubscribeId: subscriptionResponse.id,
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
  }
  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
