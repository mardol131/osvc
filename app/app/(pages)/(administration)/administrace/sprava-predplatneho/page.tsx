import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import UserSectionWrapper from "@/app/_components/blocks/user-section-wrapper";
import { getCollection } from "@/app/_functions/backend";
import { Lightbulb } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { stringify } from "qs-esm";
import UserLoginScreen from "./_components/user-login-screen";
import SubscriptionManagementCard from "@/app/(pages)/(administration)/administrace/sprava-predplatneho/_components/subscription-management-card";
import SubscriptionManagement from "./_components/subscription-management";

export const metadata = {
  title: "Správa předplatného",
  description:
    "Spravujte své předměty podnikání a přizpůsobte své předplatné podle vašich potřeb.",
};

export default async function SubscriptionManagementPage() {
  let allActivityGroups: any[] = [];
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
  } catch (error) {}
  return <SubscriptionManagement allActivityGroups={allActivityGroups} />;
}
