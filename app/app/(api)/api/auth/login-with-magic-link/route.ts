export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `${process.env.CMS_URL}/api/accounts/send-magic-link-email?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send magic link email" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to send magic link email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
