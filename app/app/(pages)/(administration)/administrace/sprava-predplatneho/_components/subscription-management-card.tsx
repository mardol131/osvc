"use client";

import { ActivityGroup } from "@/app/_data/businessActivities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddActivityModal from "./add-activity-modal";
import ContactInformation from "./contact-information";
import NotificationPreferences from "./notification-preferences";

import { format } from "date-fns";
import ActivityCard from "./activity-card";

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export type Subscribe = {
  id: string;
  email: string;
  phone: string;
  phonePrefix: string;
  activityGroups: (string | ActivityGroup)[];
  notificationSettings: NotificationSettings;
  terms: boolean;
  marketing: boolean;
  active: boolean;
  stripeSubscribeId?: string;
  promocodeAlreadySent?: boolean;
  promotionCode?: string;
  createdAt: string;
};

interface SubscriptionManagementCardProps {
  index: number;
  subscribe: Subscribe;
  allActivityGroups: ActivityGroup[];
}

export default function SubscriptionManagementCard({
  index,
  allActivityGroups,
  subscribe: originalSubscribe,
}: SubscriptionManagementCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup | null>(
    null,
  );
  const [subscribe, setSubscribe] = useState(originalSubscribe);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPriceThatWillBePaid, setFinalPriceThatWillBePaid] = useState<
    number | null
  >(null);
  const [activityGroupCanBeAdded, setActivityGroupCanBeAdded] = useState(false);

  const userActivityGroupIds = subscribe.activityGroups?.map((group: any) =>
    typeof group === "string" ? group : group.id,
  );

  const generalGroup = allActivityGroups.find(
    (group: any) => group.slug === "general",
  );

  const activeGroups = allActivityGroups.filter(
    (group: any) =>
      userActivityGroupIds?.includes(group.id) && group.slug !== "general",
  );

  const inactiveGroups = allActivityGroups.filter(
    (group: any) => !userActivityGroupIds?.includes(group.id),
  );

  const handleOpenModal = async (group: ActivityGroup) => {
    setSelectedGroup(group);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/add-item-into-subscription-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activityGroupPriceId: group.priceId,
            subscribeId:
              typeof subscribe.id === "string" ? subscribe.id : subscribe.id,
          }),
        },
      );

      const data = await response.json();

      if (!data.data.finalPriceThatWillBePaid) {
        throw new Error("Chyba při získávání náhledu faktury");
      }

      setFinalPriceThatWillBePaid(data.data.finalPriceThatWillBePaid / 100);
      setActivityGroupCanBeAdded(true);
    } catch (error) {
      console.error("Chyba při odesílání požadavku:");
      setActivityGroupCanBeAdded(false);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
    setIsSubmitting(false);
    setActivityGroupCanBeAdded(false);
  };

  const handleConfirmPurchase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const termsChecked = formData.get("terms");
    const paymentConsentChecked = formData.get("paymentConsent");
    const activityGroupId = selectedGroup?.id;

    if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/add-item-into-subscription-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activityGroupPriceId: selectedGroup?.priceId,
            terms: termsChecked,
            paymentConsent: paymentConsentChecked,
            subscribeId: subscribe.id,
            activityGroupId: activityGroupId,
          }),
        },
      );
    } catch (error) {
      console.log(error);
    }

    if (!selectedGroup) {
      window.location.reload();
      return;
    }
    setSubscribe((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        activityGroups: [...prev.activityGroups, selectedGroup],
      };
    });
    handleCloseModal();
  };

  return (
    <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
      <div className="w-full flex flex-col gap-6 mx-auto">
        <div className=" flex items-center max-md:flex-col max-md:items-start max-md:gap-0 gap-10 border-b-2 pb-3 border-zinc-100">
          <h4>Předplatné č. {index + 1}</h4>
          <p>Vytvořeno {format(new Date(subscribe.createdAt), "d. M. yyyy")}</p>
        </div>

        {/* Kontaktní údaje */}
        <ManagementSection>
          <ContactInformation
            subscribeId={subscribe.id}
            initialEmail={subscribe.email}
            initialPhone={subscribe.phone}
            initialPhonePrefix={subscribe.phonePrefix}
          />
        </ManagementSection>

        {/* Nastavení notifikací */}
        <ManagementSection>
          <NotificationPreferences
            subscribeId={subscribe.id}
            emailPreference={subscribe.notificationSettings.emailNotifications}
            smsPreference={subscribe.notificationSettings.smsNotifications}
            pushNotifications={subscribe.notificationSettings.pushNotifications}
          />
        </ManagementSection>

        {/* Aktivní skupiny */}
        <ManagementSection>
          {/* {generalGroup && (
            <>
              {" "}
              <div className="mb-8">
                <h5 className="text-primary mb-1">Základní předplatné</h5>
                <p>
                  Tuto základní službu nelze pozastavit bez zrušení celého
                  předplatného.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <ActivityCard key={generalGroup.id} group={generalGroup} />
              </div>
            </>
          )} */}
          {activeGroups.length > 0 && (
            <>
              <div className="mb-8">
                <h5 className="text-primary mb-1">
                  Aktivní předměty podnikání
                </h5>
                <p>
                  Níže vidíte všechny předměty podnikání, které jsou aktuálně
                  součástí vašeho předplatného. Pokud potřebujete přidat další,
                  můžete tak učinit kliknutím na tlačítko "Dokoupit" u
                  neaktivních předmětů. Pokud chcete některý z aktivních
                  předmětů odebrat, kontaktujte nás na email{" "}
                  <span className="text-secondary">info@osvc365.cz</span>. V
                  tuto chvíli pracujeme na tom, aby byla tato možnost
                  automatická.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {activeGroups.map((group) => (
                  <ActivityCard key={group.id} group={group} />
                ))}
              </div>
            </>
          )}
          {inactiveGroups.length > 0 && (
            <>
              <div className="mb-8 mt-10">
                <h5 className="text-primary mb-1">
                  Další předměty k dokoupení
                </h5>
                <p>Rozšiřte své předplatné o další předměty podnikání</p>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {inactiveGroups.map((group) => (
                  <ActivityCard
                    key={group.id}
                    group={group}
                    onClick={handleOpenModal}
                  />
                ))}
              </div>
            </>
          )}
        </ManagementSection>

        {/* Modal pro dokoupení */}
        <AddActivityModal
          canBeAdded={activityGroupCanBeAdded}
          group={selectedGroup}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleConfirmPurchase}
          isSubmitting={isSubmitting}
          finalPriceThatWillBePaid={finalPriceThatWillBePaid}
        />

        {/* Zrušit předplatné */}
        <ManagementSection>
          <div className="mb-6">
            <h3 className="text-2xl font-bebas text-primary mb-2">
              Zrušit předplatné
            </h3>
            <p className="text-textP">
              Pokud chcete zrušit své předplatné, můžete to provést v našem
              Stripe účtu. Změny se projeví okamžitě.
            </p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_SUB_ACCOUNT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Zrušit předplatné
          </a>
        </ManagementSection>
      </div>
    </div>
  );
}

function ManagementSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 md:mb-10 p-8 max-md:p-4 border-2 border-zinc-100 rounded-xl">
      {children}
    </div>
  );
}
