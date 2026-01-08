import { ActivityGroup } from "@/app/_data/businessActivities";
import {
  createDraftSubscribe,
  createSubscribe,
} from "@/app/_functions/backend";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();

  console.log(body);

  if (
    !("activityGroups" in body) ||
    !("email" in body) ||
    !("phone" in body) ||
    !("phonePrefix" in body) ||
    !("terms" in body)
  ) {
    return new Response(
      JSON.stringify({ error: "Missing items in request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  console.log(body);

  const items = body.activityGroups.map((group: ActivityGroup) => {
    const priceId = group.priceId;
    return {
      quantity: 1,
      price: priceId,
    };
  });

  console.log(items);

  try {
    const promotionCode = await stripe.promotionCodes.create({
      max_redemptions: 1,
      promotion: {
        type: "coupon",
        coupon: process.env.STRIPE_COUPON_ID,
      },
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dekujeme`,
      line_items: items,
      mode: "subscription",
      customer_email: body.email,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          email: body.email,
          phone: body.phone,
          phonePrefix: body.phonePrefix,
          activityGroups: JSON.stringify(
            body.activityGroups.map((item: { id: string }) => item.id)
          ),
          terms: body.terms,
          promotionCode: promotionCode.code,
        },
      },
    });

    return new Response(
      JSON.stringify({ result: "success", checkoutUrl: session.url }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(`Error processing event: ${err}`);
  }
  return new Response(
    JSON.stringify({ error: "Unable to create checkout session" }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}
