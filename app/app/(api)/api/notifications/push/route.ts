import { getSingleRecord, updateRecord } from "@/app/_functions/backend";
import { cookies } from "next/headers";

import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const body = await request.json();
  const cookiesStore = await cookies();

  if (
    !("activityGroupPriceId" in body) ||
    !("subscribeId" in body) ||
    !("terms" in body) ||
    !("paymentConsent" in body) ||
    !("activityGroupId" in body)
  ) {
    return new Response(
      JSON.stringify({ error: "Missing items in request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validace souhlasů
  if (!body.terms || !body.paymentConsent) {
    return new Response(
      JSON.stringify({
        error: "Souhlas s podmínkami a okamžitou platbou je povinný",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const subscribe = await getSingleRecord({
      collectionSlug: "subscribes",
      recordId: body.subscribeId,
      authToken: cookiesStore.get("payload-token")?.value,
      depth: 1,
    });

    if (!subscribe) {
      throw new Error("Chyba při přidávání položky do předplatného");
    }

    if (!subscribe.active) {
      throw new Error("Předplatné není aktivní");
    }

    // 2. Zkontroluj, jestli skupina už není v subscription
    const existingActivityGroups = subscribe.activityGroups || [];
    const activityGroupIds = existingActivityGroups.map((ag: any) =>
      typeof ag === "string" ? ag : ag.id,
    );

    if (activityGroupIds.includes(body.activityGroupId)) {
      return new Response(
        JSON.stringify({ error: "Tato skupina již je součástí předplatného" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 3. Získej aktuální subscription ze Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscribe.stripeSubscribeId,
    );

    // 4. Zkontroluj, jestli price již není v subscription items
    const existingPriceIds = stripeSubscription.items.data.map(
      (item) => item.price.id,
    );
    if (existingPriceIds.includes(body.activityGroupPriceId)) {
      return new Response(
        JSON.stringify({ error: "Tato položka již je ve Stripe subscription" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const customerId =
      typeof stripeSubscription.customer === "string"
        ? stripeSubscription.customer
        : stripeSubscription.customer.id;

    // 5. Přidej novou položku do subscription s prorated invoice
    const updatedSubscription = await stripe.subscriptions.update(
      subscribe.stripeSubscribeId,
      {
        items: [{ price: body.activityGroupPriceId }],
        proration_behavior: "create_prorations",
        // Ponech pending invoice pro okamžitou platbu
      },
    );

    // Vytvoř a okamžitě zaplať prorated invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      subscription: updatedSubscription.id,
      auto_advance: false, // Neposílej automaticky
    });

    // 7. Finalizuj a zaplať fakturu okamžitě
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    const paidInvoice = await stripe.invoices.pay(finalizedInvoice.id, {
      payment_method:
        typeof stripeSubscription.default_payment_method === "string"
          ? stripeSubscription.default_payment_method
          : stripeSubscription.default_payment_method?.id,
    });

    // Zkontroluj, jestli platba proběhla úspěšně
    if (paidInvoice.status !== "paid") {
      // Pokud platba selhala, odstraň položku ze subscription
      const itemToRemove = updatedSubscription.items.data.find(
        (item) => item.price.id === body.activityGroupPriceId,
      );

      if (itemToRemove) {
        await stripe.subscriptions.update(subscribe.stripeSubscribeId, {
          items: [{ id: itemToRemove.id, deleted: true }],
          proration_behavior: "none",
        });
      }

      throw new Error("Platba za novou položku selhala");
    }

    // 9. Aktualizuj activityGroups v Payload CMS
    await updateRecord({
      collectionSlug: "subscribes",
      recordId: body.subscribeId,
      body: {
        activityGroups: [...activityGroupIds, body.activityGroupId],
      },
      apiKey: process.env.CMS_API_KEY,
    });

    await stripe.subscriptions.update(subscribe.stripeSubscribeId, {
      metadata: {
        ...stripeSubscription.metadata,
        activityGroups: JSON.stringify([
          ...activityGroupIds,
          body.activityGroupId,
        ]),
      },
    });

    return new Response(
      JSON.stringify({
        result: "success",
        data: {},
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    console.error("Error adding item to subscription:", err);

    return new Response(
      JSON.stringify({
        error: err.message || "Chyba při přidávání položky do předplatného",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
