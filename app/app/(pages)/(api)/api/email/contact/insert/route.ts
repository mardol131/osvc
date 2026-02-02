export async function POST(request: Request) {
  const body = await request.json();

  if (!body.email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${process.env.BREVO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email: body.email,
        listIds: [3],
        updateEnabled: true,
      }),
    });

    console.log("Brevo response status:", response);
  } catch {
    return new Response(JSON.stringify({ error: "Failed to add contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ result: "success" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
