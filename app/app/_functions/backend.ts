export async function createDraftSubscribe(activityGroups: string[]) {
  const response = await fetch(`${process.env.CMS_URL}/api/draft-subscribes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
    },
    body: JSON.stringify({
      activityGroups: activityGroups,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }
  return response.json();
}

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
  customerId,
}: {
  email: string;
  phone: string;
  phonePrefix: string;
  activityGroups: string[];
  terms: boolean;
  marketing?: boolean;
  active?: boolean;
  promotionCode?: string;
  stripeSubscribeId: string;
  customerId?: string;
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
      customerId: customerId ? customerId : undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }
  const data = await response.json();
  return data.doc;
}

export async function getCollection({
  collectionSlug,
  apiKey,
  query,
  cache,
  depth,
}: {
  collectionSlug:
    | "activity-groups"
    | "subscribes"
    | "monthly-notifications"
    | "accesses";
  apiKey?: string;
  query?: string;
  cache?: RequestCache;
  depth?: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}${
      query ? `?${query}` : ""
    }${depth ? `&depth=${depth}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey ? `users API-Key ${apiKey}` : "",
      },
      cache: cache,
    },
  );

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
  recordId,
  apiKey,
  query,
  depth,
}: {
  collectionSlug: "subscribes" | "monthly-notifications" | "accesses";
  recordId: string;
  apiKey?: string;
  query?: string;
  depth?: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}/${recordId}${
      query ? `?${query}` : ""
    }${depth ? `&depth=${depth}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey ? `users API-Key ${apiKey}` : "",
      },
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

export async function updateRecord({
  collectionSlug,
  recordId,
  apiKey,
  body,
}: {
  collectionSlug: "subscribes" | "monthly-notifications" | "accesses";
  recordId: string;
  apiKey?: string;
  body: Record<string, any>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}/${recordId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey ? `users API-Key ${apiKey}` : "",
      },
      body: JSON.stringify(body),
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

export async function login(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
