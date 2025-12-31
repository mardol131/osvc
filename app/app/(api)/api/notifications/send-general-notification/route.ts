import { BusinessActivity } from "@/app/_data/businessActivities";
import {
  GeneralNotificationMessages,
  getCollection,
  Notification,
} from "@/app/_functions/backend";
import {
  createGeneralNotificationEmail,
  sendEmail,
} from "@/app/_functions/notifications";
import { subscribe } from "diagnostics_channel";

export type Subscribe = {
  id: string;
  email: string;
  activityGroups: BusinessActivity[];
  phone: string;
  phonePrefix: string;
  terms: boolean;
  active: boolean;
};

const ActivityGroupNames = {
  general: "Obecné",
  it_services: "IT služby",
  culture_sport: "Kultura, sport a zábava",
  consulting: "Poradenství a odborné služby",
  education: "Vzdělávání a školení",
  marketing: "Marketing, kreativa a média",
};

export type CustomMessage = {
  heading: string;
  notifications: Notification[];
};

export async function POST(request: Request) {
  const {
    messages,
    password,
  }: { messages: GeneralNotificationMessages; password: string } =
    await request.json();

  if (password !== process.env.GENERAL_API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const subscribes: Subscribe[] = await getCollection(
      "subscribes",
      process.env.CMS_API_KEY
    );

    subscribes.forEach(async (subscribe: Subscribe) => {
      try {
        if (!subscribe.email) {
          console.warn(
            `Skipping subscribe with ID ${subscribe.id} due to missing email`
          );
          return;
        }

        const email = subscribe.email;

        const customMessages: CustomMessage[] = [];

        for (const [groupKey, groupMessages] of Object.entries(messages)) {
          const isGeneralGroup = groupKey === "general";
          const isSubscribedToGroup = subscribe.activityGroups.some((group) => {
            return group.slug === groupKey;
          });
          if (isGeneralGroup || isSubscribedToGroup) {
            customMessages.push({
              heading:
                ActivityGroupNames[
                  groupKey as keyof typeof ActivityGroupNames
                ] || "Neznámá skupina",
              notifications: groupMessages,
            });
          }
        }

        const emailBody = await createGeneralNotificationEmail(customMessages);

        const response = await sendEmail(
          "OSVČ365 <info@osvc365.cz>",
          [email],
          "Měsíční přehled změn",
          emailBody
        );
      } catch (error) {
        console.error(
          `Error sending notification to ${subscribe.email}:`,
          error
        );
      }
    });
  } catch (error) {
    console.error("Error fetching subscribes:", error);
    return new Response("Error fetching subscribes", { status: 500 });
  }
}
