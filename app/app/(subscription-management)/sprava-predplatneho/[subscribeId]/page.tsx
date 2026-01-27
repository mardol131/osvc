import SubscriptionManagement from "@/app/(subscription-management)/sprava-predplatneho/[subscribeId]/_components/subscription-management";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import { getCollection } from "@/app/_functions/backend";
import { notFound } from "next/navigation";
import { stringify } from "qs-esm";

export default async function SubscriptionManagementPage({
  params,
}: {
  params: Promise<{ subscribeId: string }>;
}) {
  const { subscribeId } = await params;

  // Získej subscribe data
  let subscribes: any[] = [];

  const query = stringify(
    {
      where: {
        subscribeId: {
          equals: subscribeId,
        },
        active: { equals: "true" },
      },
    },
    { encodeValuesOnly: true },
  );
  try {
    subscribes = await getCollection({
      collectionSlug: "subscribes",
      apiKey: process.env.CMS_API_KEY,
      depth: 1,
      query,
    });
  } catch (error) {
    return notFound();
  }

  if (subscribes.length === 0) {
    return notFound();
  }

  // Načtení všech dostupných ActivityGroups
  let allActivityGroups = [];
  try {
    allActivityGroups = await getCollection({
      collectionSlug: "activity-groups",
      apiKey: process.env.CMS_API_KEY,
      query: stringify(
        {
          where: {
            active: {
              equals: "true",
            },
          },
        },
        { encodeValuesOnly: true },
      ),
    });
  } catch (error) {
    console.error("Failed to load activity groups:", error);
  }

  // Rozdělení ActivityGroups na aktivní a neaktivní
  const userActivityGroupIds = subscribes[0].activityGroups?.map(
    (group: any) => (typeof group === "string" ? group : group.id),
  );

  const activeGroups = allActivityGroups.filter((group: any) =>
    userActivityGroupIds?.includes(group.id),
  );

  const inactiveGroups = allActivityGroups.filter(
    (group: any) => !userActivityGroupIds?.includes(group.id),
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white">
      <SectionWrapper levelTwo={{ className: "items-center" }}>
        {/* Hlavička */}
        <HeadingCenter
          subheading="Správa předplatného"
          heading="Spravujte své předměty podnikání"
          text="Přehled aktivních předmětů podnikání a možnost dokoupení dalších podle vašich potřeb."
        />

        {/* Správa předplatného */}
        <SubscriptionManagement
          activeGroups={activeGroups}
          inactiveGroups={inactiveGroups}
          subscribeId={subscribes[0].id}
        />
      </SectionWrapper>
    </div>
  );
}
