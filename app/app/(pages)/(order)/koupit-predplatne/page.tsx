import { notFound } from "next/navigation";
import OrderPageClient from "./_components/OrderPageClient";
import { getCollection } from "@/app/_functions/backend";
import { stringify } from "qs-esm";

export const metadata = {
  title: "OSVČ365: Koupit předplatné",
  description:
    "Zabezpečte si klidné podnikání s OSVČ365. Koupit předplatné a nechte nás hlídat vaše podnikatelské povinnosti.",
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
