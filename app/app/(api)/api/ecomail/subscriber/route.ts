const url = "https://api2.ecomailapp.cz/lists/2/subscribe";

export type SubscriberBody = {
  name?: string;
  surname?: string;
  email: string;
  phone: string;
};

export async function POST(request: Request) {
  // Parse the request body
  const body: SubscriberBody = await request.json();
  const { name, surname, email, phone } = body;

  try {
    const response = await fetch(url, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        key: process.env.ECOMAIL_API_KEY || "",
      },
      body: JSON.stringify({
        subscriber_data: {
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          source: "PAYMENT",
        },
        trigger_autoresponders: false,
        update_existing: false,
        resubscribe: false,
      }),
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
