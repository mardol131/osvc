export async function POST(req: Request) {
  try {
    const subscription = await req.json();

    // Validace VAPID klíče
    if (!process.env.NEXT_PUBLIC_VAPID_KEY) {
      return Response.json(
        { error: "VAPID klíč není nakonfigurován" },
        { status: 500 },
      );
    }

    // // Uložení subscription do Payload CMS
    const cmsResponse = await fetch(
      `${process.env.CMS_URL}/api/push-subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CMS_API_KEY}`,
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        }),
      },
    );

    if (!cmsResponse.ok) {
      const errorData = await cmsResponse.json();
      return Response.json(
        { error: "Chyba při ukládání subscripce" },
        { status: cmsResponse.status },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Interní chyba serveru" }, { status: 500 });
  }
}
