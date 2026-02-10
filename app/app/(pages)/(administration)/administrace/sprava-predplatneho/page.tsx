import SubscriptionManagement from "@/app/(pages)/(administration)/administrace/sprava-predplatneho/_components/subscription-management";
import GeneralSettings from "@/app/(pages)/(administration)/administrace/sprava-predplatneho/_components/general-settings";
import LoadErrorState from "@/app/(pages)/(access)/[accessId]/_components/LoadErrorState";
import UserSectionWrapper from "@/app/_components/blocks/user-section-wrapper";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import EmailLoginModal from "@/app/_components/molecules/email-login-modal";
import { getCollection } from "@/app/_functions/backend";
import { Lightbulb } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stringify } from "qs-esm";
import UserLoginScreen from "./_components/user-login-screen";

export const metadata = {
  title: "Správa předplatného",
  description:
    "Spravujte své předměty podnikání a přizpůsobte své předplatné podle vašich potřeb.",
};

export default async function SubscriptionManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  // Získej subscribe data
  let subscribes: any[] = [];
  const cookiesStore = await cookies();
  const { email: queryEmail } = await searchParams;

  try {
    subscribes = await getCollection({
      collectionSlug: "subscribes",
      authToken: cookiesStore.get("payload-token")?.value,
    });
  } catch (error: any) {
    if (error.status === 401 || error.status === 403) {
      return (
        <>
          <UserLoginScreen queryEmail={queryEmail} />
        </>
      );
    }
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
  } catch (error) {}

  // Rozdělení ActivityGroups na aktivní a neaktivní

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50">
      <UserSectionWrapper levelTwo={{ className: "items-center pt-20" }}>
        {/* Hlavička */}
        <HeadingCenter
          subheading="Správa předplatného"
          heading="Spravujte své předměty podnikání"
          text="Přehled aktivních předmětů podnikání a možnost dokoupení dalších podle vašich potřeb."
        />
      </UserSectionWrapper>
      <div className="flex flex-col w-full gap-10">
        <UserSectionWrapper>
          {/* Info box o přidávání/odebírání předmětů */}
          <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
            <div className="flex gap-4">
              {" "}
              <div className="w-15 h-15 shrink-0 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                <Lightbulb strokeWidth={1.5} size={30} />
              </div>
              <div className="shrink-0"></div>
              <div>
                <h4 className="text-lg font-bebas text-primary mb-3">
                  Notifikace na telefonu a počítači
                </h4>
                <p className="text-textP leading-relaxed">
                  V tuto chvíli desíláme notifikace pouze přes email a SMS.
                  Pracujeme ale na možnosti zapnutí notifikací i přímo v
                  prohlížeči a na mobilu. Jakmile bude tato funkce dostupná,
                  dáme Vám vědět.
                </p>
              </div>
            </div>
          </div>
        </UserSectionWrapper>
        {/* Obecná nastavení */}
        {/* <UserSectionWrapper>
          <GeneralSettings />
        </UserSectionWrapper> */}
        {/* Správa předplatného */}
        <UserSectionWrapper>
          <div className="w-full flex flex-col gap-10 pb-20">
            {subscribes.map((subscribe, index) => (
              <SubscriptionManagement
                index={index}
                key={subscribe.id}
                allActivityGroups={allActivityGroups}
                subscribe={subscribe}
              />
            ))}
          </div>
        </UserSectionWrapper>
      </div>
    </div>
  );
}
