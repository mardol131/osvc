import { notFound } from "next/navigation";
import OrderPageClient from "./_components/OrderPageClient";
import { getCollection } from "@/app/_functions/backend";
import { stringify } from "qs-esm";

export const metadata = {
  title: "OSVČ365: Koupit předplatné",
  description:
    "Informace o předplatném služby OSVČ365. Přehled možností, výhod a postupu, jak si aktivovat službu pro automatické hlídání podnikatelských povinností a termínů.",
};

export default async function Page() {
  try {
    const response = await getCollection({
      collectionSlug: "activity-groups",
      cache: "no-store",
      query: stringify(
        {
          where: {
            active: {
              equals: "true",
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      ),
    });

    return <OrderPageClient activitiesGroups={response} />;
  } catch (error) {
    return notFound();
  }
}
