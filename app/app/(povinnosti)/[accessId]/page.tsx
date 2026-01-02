import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import NotificationGroup from "./_components/NotificationGroup";
import { FiCheckCircle } from "react-icons/fi";
import { BusinessActivity } from "@/app/_data/businessActivities";
import { getSingleRecord } from "@/app/_functions/backend";

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
      <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white flex items-start justify-center">
        <SectionWrapper>
          <p className="text-red-600 text-xl text-center">
            Došlo k chybě při načítání vašich povinností. Zkuste to prosím znovu
            později.
          </p>
        </SectionWrapper>
      </div>
    );
  }

  if (!access) {
    return (
      <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white flex items-start justify-center">
        <SectionWrapper>
          <p className="text-red-600 text-xl text-center">
            Došlo k chybě při načítání vašich povinností. Zkuste to prosím znovu
            později.
          </p>
        </SectionWrapper>
      </div>
    );
  }

  // Přizpůsobení notifikací podle aktivit uživatele

  const customActivityGroups = access?.activityGroups;

  const notificationsData = access?.monthlyNotification;

  const customNotifications: CustomMessage[] = [];

  customNotifications.push({
    heading: "Obecné novinky a povinnosti",
    notifications: notificationsData.data.general,
  });

  customActivityGroups?.forEach((group) => {
    const groupNotifications =
      notificationsData?.data[group.slug as keyof NotificationGroups] || [];
    customNotifications.push({
      heading: group.name,
      notifications: groupNotifications,
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
      <SectionWrapper
        levelOne={{ className: "pt-32 pb-20" }}
        levelTwo={{ className: "items-center" }}
      >
        {/* Hlavička */}
        <HeadingCenter
          subheading="Měsíční přehled"
          heading={
            <>
              Vaše povinnosti pro měsíc
              <br />
              {monthLabel} {yearLabel}
            </>
          }
          text="Přehled informací, termínů a změn pro živnostníky a vaše předměty podnikání."
        />

        {/* Shrnutí */}
        {totalNotifications > 0 ? (
          <div className="w-full mx-auto mb-12">
            <div className="bg-linear-to-br from-secondary/10 to-tertiary/10 rounded-2xl p-8 max-lg:p-4 border-2 border-secondary/20 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <FiCheckCircle className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary mb-2">
                    {totalNotifications}{" "}
                    {totalNotifications === 1
                      ? "novou informaci"
                      : totalNotifications < 5
                      ? "nové informace"
                      : "nových informací"}
                  </h4>
                  <p className="text-textP text-lg leading-relaxed">
                    Níže najdete přehled všech důležitých změn a termínů pro
                    nadcházející období.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mx-auto mb-12">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 max-lg:p-4 border-2 border-green-200 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <FiCheckCircle className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary mb-2">Žádné nové informace</h4>
                  <p className="text-textP text-lg leading-relaxed">
                    V tomto měsíci pro vás nemáme žádné nové informace ani
                    termíny. Vše je v pořádku!
                  </p>
                </div>
              </div>
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
