import axios from "axios";

export async function createSubscribe({
  email,
  phone,
  phonePrefix,
  activityGroups,
  terms,
  marketing,
  active,
  promotionCode,
  stripeSubscribeId,
  account,
}: {
  email: string;
  phone: string;
  phonePrefix: string;
  activityGroups: string[];
  terms: boolean;
  marketing?: boolean;
  active?: boolean;
  promotionCode?: string;
  stripeSubscribeId?: string;
  account: string;
}) {
  const response = await fetch(`${process.env.CMS_URL}/api/subscribes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    body: JSON.stringify({
      email: email,
      phone: phone,
      phonePrefix: phonePrefix,
      activityGroups: activityGroups,
      terms: terms ? "true" : "false",
      marketing: marketing ? "true" : "false",
      active: active ? "true" : "false",
      promotionCode: promotionCode ? promotionCode : undefined,
      stripeSubscribeId: stripeSubscribeId,
      account: account,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }
  return data.doc;
}

export async function createPassword({ password }: { password: string }) {
  const response = await fetch(`${process.env.CMS_URL}/api/passwords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    body: JSON.stringify({
      password: password,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create password: ${response.statusText}`);
  }
  return data.doc;
}

export async function createAccount({
  email,
  password,
  passwordRelation,
  stripeCustomerId,
  terms,
  marketing,
}: {
  email: string;
  password: string;
  passwordRelation: string;
  stripeCustomerId?: string;
  terms?: boolean;
  marketing?: boolean;
}) {
  const response = await fetch(`${process.env.CMS_URL}/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      passwordRelation: passwordRelation,
      stripe: {
        customerId: stripeCustomerId,
      },
      terms: terms ? "true" : "false",
      marketing: marketing ? "true" : "false",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create account: ${response.statusText}`);
  }
  return data.doc;
}

export async function createStripeCheckoutSession({
  subscriptionEmail,
  orderEmail,
  phone,
  phonePrefix,
  activityGroups,
  terms,
  marketing,
}: {
  subscriptionEmail: string;
  orderEmail: string;
  phone: string;
  phonePrefix: string;
  activityGroups: { id: string; priceId: string; slug: string }[];
  terms: boolean;
  marketing?: boolean;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionEmail: subscriptionEmail,
        orderEmail: orderEmail,
        phone: phone,
        phonePrefix: phonePrefix,
        activityGroups: activityGroups,
        terms: terms,
        marketing: marketing,
      }),
    },
  );
  if (!response.ok) {
    throw new Error("Chyba při vytváření platební relace");
  }
  const data = await response.json();
  return data.checkoutUrl;
}

export async function requestPasswordReset({
  email,
  redirectUrl,
}: {
  email: string;
  redirectUrl?: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts/forgot-password?redirectUrl=${redirectUrl || ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );
  if (!response.ok) {
    throw new Error("Chyba při odesílání žádosti o reset hesla");
  }
  return true;
}

export async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    },
  );
  if (!response.ok) {
    throw new Error("Chyba při resetování hesla");
  }
  return true;
}

// general endpoints

export async function updateRecord({
  collectionSlug,
  recordId,
  apiKey,
  authToken,
  body,
}: {
  collectionSlug:
    | "subscribes"
    | "monthly-notifications"
    | "accesses"
    | "accounts";
  recordId: string;
  apiKey?: string;
  authToken?: string;
  body: Record<string, any>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}/${recordId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey
          ? `users API-Key ${apiKey}`
          : authToken
            ? `Bearer ${authToken}`
            : "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch record ${recordId} from collection ${collectionSlug}: ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data.doc;
}

export async function getCollection({
  collectionSlug,
  authToken,
  apiKey,
  query,
  cache,
  depth,
}: {
  collectionSlug:
    | "activity-groups"
    | "subscribes"
    | "monthly-notifications"
    | "accesses"
    | "accounts";
  apiKey?: string;
  authToken?: string;
  query?: string;
  cache?: RequestCache;
  depth?: number;
}): Promise<any[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}${
      query ? `?${query}` : ""
    }${depth ? `&depth=${depth}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey
          ? `Bearer ${apiKey}`
          : authToken
            ? `Bearer ${authToken}`
            : "",
      },
      cache: cache,
      credentials: "include",
    },
  );

  if (response.status === 401 || response.status === 403) {
    const error: any = new Error("Unauthorized");
    error.status = response.status;
    throw error;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch collection ${collectionSlug}: ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data.docs;
}

export async function getSingleRecord({
  collectionSlug,
  authToken,
  recordId,
  apiKey,
  query,
  depth,
}: {
  collectionSlug: "subscribes" | "monthly-notifications" | "accesses";
  recordId: string;
  apiKey?: string;
  authToken?: string;
  query?: string;
  depth?: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}/${recordId}?${
      query ? `${query}` : ""
    }${depth ? `&depth=${depth}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey
          ? `Bearer ${apiKey}`
          : authToken
            ? `Bearer ${authToken}`
            : "",
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch record ${recordId} from collection ${collectionSlug}: ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data;
}

export async function login(email: string, password: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  return response.data;
}

export async function logout() {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts/logout`,
    {},
    {
      withCredentials: true,
    },
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error(`Logout failed: ${response.statusText}`);
  }
  return response.data;
}
