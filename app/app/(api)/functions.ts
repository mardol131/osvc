export async function createCustomer(
  email: string,
  phone: string,
  serviceGroups: string[]
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/collections/customers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYLOAD_SECRET}`,
      },
      body: JSON.stringify({
        email,
        phone,
        serviceGroups,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }
  return response.json();
}
