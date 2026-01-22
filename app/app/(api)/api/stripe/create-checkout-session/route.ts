import { ActivityGroup } from "@/app/_data/businessActivities";
import { productKind } from "@/app/_data/productKind";

import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();

  if (
    (!("activityGroups" in body) && body.activityGroups.length === 0) ||
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
      },
    );
  }

  const items = body.activityGroups.map((group: ActivityGroup) => {
    const priceId = group.priceId;
    return {
      quantity: 1,
      price: priceId,
    };
  });

  let productKindType = productKind.general_subscription;

  if (
    body.activityGroups.some((group: ActivityGroup) => group.slug !== "general")
  ) {
    productKindType = productKind.activity_group_addon;
  }

  try {
    const promotionCode = await stripe.promotionCodes.create({
      max_redemptions: 1,
      promotion: {
        type: "coupon",
        coupon: process.env.STRIPE_GIFT_COUPON_ID,
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
            body.activityGroups.map((item: { id: string }) => item.id),
          ),
          terms: body.terms,
          marketing: body.marketing || false,
          promotionCode: promotionCode.code,
          productKind: productKindType,
        },
      },
    });

    return new Response(
      JSON.stringify({ result: "success", checkoutUrl: session.url }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Unable to create checkout session: ${err}` }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
