const url = "https://api2.ecomailapp.cz/lists/3/subscribe";

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { email } = body;

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
          email: email,
          source: "NEWS",
        },
        trigger_autoresponders: false,
        update_existing: false,
        resubscribe: false,
      }),
    });

    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }

  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
