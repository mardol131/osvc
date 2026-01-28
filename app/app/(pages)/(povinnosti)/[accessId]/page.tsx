import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import { ActivityGroup } from "@/app/_data/businessActivities";
import { getCollection } from "@/app/_functions/backend";
import { FiCheckCircle } from "react-icons/fi";
import LoadErrorState from "./_components/LoadErrorState";
import NotificationGroup from "./_components/NotificationGroup";
import { notFound } from "next/navigation";

import EditSubscription from "./_components/EditSubscription";

export type CustomMessage = {
  heading: string;
  notifications: Notification[];
  order?: number;
  slug: string;
};

export type Notification = {
  text: string;
  mobileText?: string;
  description?: string;
  date?: Date;
  link?: string;
  activityGroups: ActivityGroup[];
};

export type MonthlyNotification = {
  notifications: Notification[];
  month?: string;
  year?: string;
};

export default async function page({
  params,
}: {
  params: Promise<{ accessId: string }>;
}) {
  const { accessId } = await params;

  let accessResponse:
    | {
        createdAt: Date;
        updatedAt: Date;
        activityGroups: ActivityGroup[];
        subscribe: string | { id: string };
        subscribeId: string;
        monthlyNotification: MonthlyNotification;
      }[]
    | undefined = undefined;

  try {
    accessResponse = await getCollection({
      collectionSlug: "accesses",
      apiKey: process.env.CMS_API_KEY,
      query: `where[accessId][equals]=${accessId}`,
      depth: 0,
    });
  } catch (error) {
    return notFound();
  }

  if (!accessResponse || accessResponse.length === 0) {
    return (
      <LoadErrorState
        title="Nepodařilo se načíst data"
        message="Odkaz může být neplatný nebo vypršel. Zkuste prosím načíst stránku znovu, případně nás kontaktujte."
      />
    );
  }

  // Načtení všech dostupných ActivityGroups
  let allActivityGroups: ActivityGroup[] = [];
  try {
    allActivityGroups = await getCollection({
      collectionSlug: "activity-groups",
      apiKey: process.env.CMS_API_KEY,
    });
  } catch (error) {
    console.error("Failed to load activity groups:", error);
  }

  // Přizpůsobení notifikací podle aktivit uživatele

  const access = accessResponse[0];

  const customActivityGroups = access?.activityGroups;

  const notificationsData = access?.monthlyNotification.notifications;

  const customNotifications: CustomMessage[] = [];

  customActivityGroups?.forEach((group) => {
    const groupNotifications =
      notificationsData?.filter((notification) =>
        notification.activityGroups.some((ag) =>
          typeof group === "string" ? ag.id === group : ag.id === group.id,
        ),
      ) ?? [];

    customNotifications.push({
      heading: group.name,
      notifications: groupNotifications,
      order: group.order,
      slug: group.slug,
    });
  });

  // Další data

  const totalNotifications = customNotifications.reduce(
    (sum, group) => sum + group.notifications.length,
    0,
  );
  const monthLabel = access.monthlyNotification?.month || "";
  const yearLabel = access.monthlyNotification?.year || "";

  // Seřazení skupin podle počtu notifikací sestupně

  customNotifications.sort((a, b) => {
    if (a.slug === "general") return -1;
    if (b.slug === "general") return 1;
    return b.notifications.length - a.notifications.length;
  });

  // Získej subscribe ID pro EditSubscription
  const subscribeId = access.subscribeId;

  console.log(access);

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white">
      <SectionWrapper levelTwo={{ className: "items-center" }}>
        {/* Hlavička */}
        <HeadingCenter
          subheading="Měsíční přehled"
          heading={
            <>
              Povinnosti a novinky pro další měsíc
              <br />
              {monthLabel} {yearLabel}
            </>
          }
          text="Přehled informací, termínů a změn pro živnostníky a vaše předměty podnikání."
        />

        {/* Shrnutí */}
        <EditSubscription
          activeGroups={customActivityGroups || []}
          subscribeId={subscribeId}
        />
        {totalNotifications > 0 ? (
          <>
            <div className="w-full mx-auto mb-8 md:mb-10">
              <div className="bg-secondary/5 rounded-xl p-5 md:p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-2">
                  <FiCheckCircle className="text-secondary text-xl shrink-0" />
                  <h4 className="text-primary">
                    {totalNotifications}{" "}
                    {totalNotifications === 1
                      ? "nová informace"
                      : totalNotifications < 5
                        ? "nové informace"
                        : "nových informací"}
                  </h4>
                </div>
                <p className="text-textP text-sm md:text-base leading-relaxed">
                  Přehled důležitých změn a termínů pro váš balíček v
                  nadcházejícím období
                </p>
              </div>
            </div>
            {/* Upravit předplatné */}
          </>
        ) : (
          <div className="w-full mx-auto mb-8 md:mb-10">
            <div className="bg-green-50 rounded-xl p-5 md:p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-2">
                <FiCheckCircle className="text-green-600 text-xl shrink-0" />
                <h4 className="text-primary">Žádné nové informace</h4>
              </div>
              <p className="text-textP text-sm md:text-base leading-relaxed">
                V tomto měsíci nemáme žádné nové informace. Vše je v pořádku!
              </p>
            </div>
          </div>
        )}

        {/* Seznam notifikací podle skupin */}
        <div className="w-full mx-auto">
          {customNotifications.map(({ heading, notifications }) => (
            <NotificationGroup
              key={heading}
              heading={heading}
              notifications={notifications}
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
