import { ActivityGroup } from "@/app/_data/businessActivities";
import { productKind } from "@/app/_data/productKind";
import {
  createAccount,
  createPassword,
  createSubscribe,
  getCollection,
} from "@/app/_functions/backend";
import { generateAlphanumericId } from "@/app/_functions/generateAlphanumericId";
import { stringify } from "qs-esm";

import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();

  if (
    !("activityGroups" in body) ||
    body.activityGroups.length === 0 ||
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

  if (body.terms !== true) {
    throw new Error("Failed to create password for new account");
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

    const query = stringify(
      {
        where: {
          email: {
            equals: body.email,
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const userAccounts = await getCollection({
      collectionSlug: "accounts",
      query: query,
      apiKey: process.env.CMS_API_KEY,
    });

    let accountId: string | undefined = userAccounts[0]?.id;

    if (!userAccounts[0]) {
      const password = generateAlphanumericId(12);

      let passwordDoc;
      try {
        passwordDoc = await createPassword({ password });
      } catch (err) {
        throw new Error(`Failed to create password: ${err}`);
      }

      console.log("passwordDoc", passwordDoc);

      if (!passwordDoc?.id) {
        throw new Error("Failed to create password for new account");
      }

      const newAccount = await createAccount({
        email: body.email,
        password: password,
        passwordRelation: passwordDoc.id,
        terms: body.terms,
        marketing: body.marketing || false,
      });

      console.log("newAccount", newAccount);

      accountId = newAccount.id;
    }

    if (!accountId) {
      throw new Error("Account ID is undefined");
    }

    const subscriptionResponse = await createSubscribe({
      email: body.email,
      phone: body.phone,
      phonePrefix: body.phonePrefix,
      activityGroups: body.activityGroups.map(
        (item: { id: string }) => item.id,
      ),
      terms: body.terms,
      marketing: body.marketing || false,
      active: false,
      promotionCode: promotionCode.code,
      account: accountId,
    });

    if (!subscriptionResponse?.id) {
      throw new Error("Failed to create subscribe");
    }

    console.log("subscriptionResponse", subscriptionResponse);

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dekujeme`,
      line_items: items,
      customer: userAccounts[0]?.stripe.customerId || undefined,
      mode: "subscription",
      customer_email: userAccounts[0]?.stripe.customerId
        ? undefined
        : body.email,
      allow_promotion_codes: true,
      metadata: {
        productKind: productKindType,
      },
      subscription_data: {
        metadata: {
          email: body.email,
          phone: body.phone,
          phonePrefix: body.phonePrefix,
          activityGroups: JSON.stringify(
            body.activityGroups.map((item: { id: string }) => item.id),
          ),
          cmsSubscribeId: subscriptionResponse.id,
          terms: body.terms,
          marketing: body.marketing || false,
          promotionCode: promotionCode.code,
          accountId: accountId || "",
        },
      },
    });

    return new Response(
      JSON.stringify({ result: "success", checkoutUrl: session.url }),
      {
        status: 200,
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
