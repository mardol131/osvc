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

export async function createSubscribe(
  email: string,
  phone: string,
  phonePrefix: string,
  activityGroups: string[],
  terms: boolean,
  active?: boolean
) {
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
      active: active ? "true" : "false",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }
  return response.json();
}

export async function activateSusbscribe(subscribeId: string) {
  const response = await fetch(
    `${process.env.CMS_URL}/api/subscribes/${subscribeId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
      },
      body: JSON.stringify({
        active: true,
      }),
    }
  );

  return response.json();
}

export async function getCollection(
  collectionSlug: "activity-groups" | "subscribes" | "monthly-notifications",
  apiKey?: string,
  query?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey ? `users API-Key ${apiKey}` : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch collection ${collectionSlug}: ${response.statusText}`
    );
  }
  return response.json().then((data) => data.docs);
}

export async function getSingleRecord(
  collectionSlug: "subscribes" | "monthly-notifications" | "accesses",
  recordId: string,
  apiKey?: string,
  query?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/${collectionSlug}/${recordId}${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey ? `users API-Key ${apiKey}` : "",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch record ${recordId} from collection ${collectionSlug}: ${response.statusText}`
    );
  }
  return response.json();
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
    }
  );
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  return response.json();
}
