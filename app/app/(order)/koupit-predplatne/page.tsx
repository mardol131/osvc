import OrderPageClient from "./_components/OrderPageClient";
import { getCollection } from "@/app/_functions/backend";

export default async function Page() {
  // Zde můžeš přidat server-side data fetching
  // const data = await fetch('...')

  try {
    const response = await getCollection("activity-groups");
    console.log("Fetched activity groups:", response);
    return <OrderPageClient activitiesGroups={response} />;
  } catch (error) {
    console.error("Error fetching activity groups:", error);
  }
}
