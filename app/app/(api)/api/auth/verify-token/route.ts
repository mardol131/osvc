import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const redirectUrl = searchParams.get("redirectUrl");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!token) {
    return new Response(JSON.stringify({ error: "Token is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/accounts/verify-token?email=${email}&token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send magic link email" }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await res.json();

    const cookiesStore = await cookies();

    cookiesStore.set({
      name: "payload-token",
      value: data.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NEXT_PUBLIC_IS_TEST_ENV === "true" ? false : true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL(redirectUrl || "/", request.url));
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to send magic link email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
