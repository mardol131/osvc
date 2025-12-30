import OrderPageClient from "./_components/OrderPageClient";
import { getPublicCollection } from "@/app/(api)/functions";

export default async function Page() {
  // Zde můžeš přidat server-side data fetching
  // const data = await fetch('...')

  try {
    const response = await getPublicCollection("activity-groups");
    console.log("Fetched activity groups:", response);
    return <OrderPageClient activitiesGroups={response} />;
  } catch (error) {
    console.error("Error fetching activity groups:", error);
  }
}
