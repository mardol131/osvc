import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import NotificationGroup from "./_components/NotificationGroup";
import LoadErrorState from "./_components/LoadErrorState";
import { FiCheckCircle } from "react-icons/fi";
import { BusinessActivity } from "@/app/_data/businessActivities";
import { getSingleRecord } from "@/app/_functions/backend";
import { redirect } from "next/navigation";

export type CustomMessage = {
  heading: string;
  notifications: Notification[];
};

export type Notification = {
  text: string;
  mobileText?: string;
  description?: string;
  date?: Date;
  link?: string;
};

export type NotificationGroups = {
  general: Notification[];
  it_services: Notification[];
  consulting: Notification[];
  marketing: Notification[];
  education: Notification[];
  culture_sport: Notification[];
};

export type MonthlyNotification = {
  data: NotificationGroups;
  month?: string;
  year?: string;
};

export default async function page({
  params,
}: {
  params: Promise<{ accessId: string }>;
}) {
  const { accessId } = await params;

  let access:
    | {
        createdAt: Date;
        updatedAt: Date;
        activityGroups: BusinessActivity[];
        monthlyNotification: MonthlyNotification;
      }
    | undefined = undefined;

  try {
    access = await getSingleRecord(
      "accesses",
      accessId,
      process.env.CMS_API_KEY,
      "sort=-createdAt&limit=1"
    );
  } catch (error) {
    return (
      <LoadErrorState
        title="Zobrazit informace"
        message="Klikněte na tlačítko níže pro načtení vašich informací."
      />
    );
  }

  if (!access) {
    return (
      <LoadErrorState
        title="Nepodařilo se načíst data"
        message="Odkaz může být neplatný nebo vypršel. Zkuste prosím načíst stránku znovu."
      />
    );
  }

  // Přizpůsobení notifikací podle aktivit uživatele

  const customActivityGroups = access?.activityGroups;

  const notificationsData = access?.monthlyNotification;

  console.log(access);

  const customNotifications: CustomMessage[] = [];

  customNotifications.push({
    heading: "Obecné novinky a povinnosti",
    notifications: notificationsData?.data?.general ?? [],
  });

  customActivityGroups?.forEach((group) => {
    const groupNotifications =
      notificationsData?.data?.[group.slug as keyof NotificationGroups] ?? [];
    customNotifications.push({
      heading: group.name,
      notifications: groupNotifications ?? [],
    });
  });

  // Další data

  const totalNotifications = customNotifications.reduce(
    (sum, group) => sum + group.notifications.length,
    0
  );
  const monthLabel = access.monthlyNotification?.month || "";
  const yearLabel = access.monthlyNotification?.year || "";

  // Seřazení skupin podle počtu notifikací sestupně

  customNotifications.sort(
    (a, b) => b.notifications.length - a.notifications.length
  );

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
        {totalNotifications > 0 ? (
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
