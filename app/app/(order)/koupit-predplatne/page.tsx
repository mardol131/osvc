import OrderPageClient from "./_components/OrderPageClient";
import { getCollection } from "@/app/_functions/backend";

export default async function Page() {
  try {
    const response = await getCollection({
      collectionSlug: "activity-groups",
    });
    return <OrderPageClient activitiesGroups={response} />;
  } catch (error) {
    return <OrderPageClient activitiesGroups={[]} />;
  }
}
