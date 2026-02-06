export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");
  const redirectUrl = searchParams.get("redirectUrl");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const fetchUrlParams = new URLSearchParams({
      email,
      ...(redirectUrl ? { redirectUrl: redirectUrl } : {}),
    });

    console.log("fetchUrlParams in API route:", fetchUrlParams.toString());
    const response = await fetch(
      `${process.env.CMS_URL}/api/accounts/send-magic-link-email?${fetchUrlParams.toString()}`,
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
