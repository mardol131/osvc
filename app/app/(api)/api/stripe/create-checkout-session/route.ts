import {
  createDraftSubscribe,
  createSubscribe,
} from "@/app/_functions/backend";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();

  const priceMap: { [key: string]: string } = {
    general: process.env.STRIPE_MAIN_SERVICE_PRICE_ID!,
    it_services: process.env.STRIPE_IT_SERVICES_PRICE_ID!,
    trading: process.env.STRIPE_TRADING_PRICE_ID!,
    hospitality: process.env.STRIPE_HOSPITALITY_PRICE_ID!,
    real_estate: process.env.STRIPE_REAL_ESTATE_PRICE_ID!,
    consulting: process.env.STRIPE_CONSULTING_PRICE_ID!,
    marketing: process.env.STRIPE_MARKETING_PRICE_ID!,
    education: process.env.STRIPE_EDUCATION_PRICE_ID!,
    culture_sport: process.env.STRIPE_CULTURE_SPORT_PRICE_ID!,
  };

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

  const items = body.activityGroups.map((item: { slug: string }) => {
    const priceId = priceMap[item.slug];
    return {
      quantity: 1,
      price: priceId,
    };
  });

  console.log(items);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dekujeme`,
      line_items: [
        {
          quantity: 1,
          price: priceMap.general,
        },
        ...items,
      ],
      mode: "subscription",
      customer_email: body.email,
      subscription_data: {
        metadata: {
          email: body.email,
          phone: body.phone,
          phonePrefix: body.phonePrefix,
          activityGroups: JSON.stringify(
            body.activityGroups.map((item: { id: string }) => item.id)
          ),
          terms: body.terms,
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
