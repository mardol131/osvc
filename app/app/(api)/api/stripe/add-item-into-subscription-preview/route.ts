import { ActivityGroup } from "@/app/_data/businessActivities";
import { productKind } from "@/app/_data/productKind";
import { getCollection, getSingleRecord } from "@/app/_functions/backend";
import { access } from "fs/promises";

import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();

  if (!("activityGroupPriceId" in body) || !("subscribeId" in body)) {
    return new Response(
      JSON.stringify({ error: "Missing items in request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  console.log("BODY", body);

  try {
    const subscribe = await getSingleRecord({
      collectionSlug: "subscribes",
      recordId: body.subscribeId,
      apiKey: process.env.CMS_API_KEY,
    });

    if (!subscribe.stripeSubscribeId) {
      throw new Error("Chyba při přidávání položky do předplatného");
    }

    const subscriptionId = subscribe.stripeSubscribeId;

    const invoicePreview = await stripe.invoices.createPreview({
      subscription: subscriptionId,
      subscription_details: {
        items: [{ price: body.activityGroupPriceId }],
      },
    });

    const addedItem = invoicePreview.lines.data.filter((item) => {
      return !item.pricing?.unit_amount_decimal;
    });

    const finalPriceThatWillBePaid = addedItem.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);

    return new Response(
      JSON.stringify({
        result: "success",
        data: {
          finalPriceThatWillBePaid: finalPriceThatWillBePaid,
        },
      }),
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
