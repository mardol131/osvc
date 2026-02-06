"use client";

import { useState } from "react";
import { ActivityGroup } from "@/app/_data/businessActivities";
import AddActivityModal from "./add-activity-modal";
import ActiveActivityCard from "./active-activity-card";
import InactiveActivityCard from "./inactive-activity-card";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export type Subscribe = {
  id: string;
  email: string;
  phone: string;
  phonePrefix: string;
  activityGroups: (string | ActivityGroup)[];
  terms: boolean;
  marketing: boolean;
  active: boolean;
  stripeSubscribeId?: string;
  promocodeAlreadySent?: boolean;
  promotionCode?: string;
  createdAt: string;
};

interface SubscriptionManagementProps {
  index: number;
  subscribe: Subscribe;
  allActivityGroups: ActivityGroup[];
}

export default function SubscriptionManagement({
  index,
  allActivityGroups,
  subscribe,
}: SubscriptionManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPriceThatWillBePaid, setFinalPriceThatWillBePaid] = useState<
    number | null
  >(null);

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

  const router = useRouter();

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
    } catch (error) {
      console.error("Chyba při odesílání požadavku:");
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
    setIsSubmitting(false);

    router.refresh();
  };

  const handleConfirmPurchase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const termsChecked = formData.get("terms");
    const paymentConsentChecked = formData.get("paymentConsent");
    const activityGroupId = selectedGroup?.id;

    if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
      console.error("NENI URL");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
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
      console.error("Chyba při odesílání požadavku:");
    }

    console.log("POTVRZENO");

    handleCloseModal();
  };

  return (
    <div className="rounded-xl border w-full p-10 bg-white border-zinc-100 shadow-md">
      <div id="subscription-management" className="w-full mx-auto">
        <div className="mb-10 flex items-center max-md:flex-col max-md:items-start max-md:gap-0 gap-10 border-b-2 pb-3 border-zinc-100">
          <h4>Předplatné č. {index + 1}</h4>
          <p>Vytvořeno {format(new Date(subscribe.createdAt), "d. M. yyyy")}</p>
        </div>

        {/* Základní předplatné */}
        {generalGroup && (
          <div className="mb-10 md:mb-15">
            <div className="mb-8">
              <h5 className="text-primary mb-1">Základní předplatné</h5>
              <p>
                Tyto základní služby nelze pozastavit bez zrušení celého
                předplatného.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <ActiveActivityCard key={generalGroup.id} group={generalGroup} />
            </div>
          </div>
        )}

        {/* Aktivní skupiny */}
        {activeGroups.length > 0 && (
          <div className="mb-10 md:mb-15">
            <div className="mb-8">
              <h5 className="text-primary mb-1">Aktivní předměty podnikání</h5>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              {activeGroups.map((group) => (
                <ActiveActivityCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}

        {/* Neaktivní skupiny */}
        {inactiveGroups.length > 0 && (
          <div className="mb-10 md:mb-15">
            <div className="mb-8">
              <h5 className="text-primary mb-1">Další předměty k dokoupení</h5>
              <p className="text-textP text-sm md:text-base">
                Rozšiřte své předplatné o další předměty podnikání
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              {inactiveGroups.map((group) => (
                <InactiveActivityCard
                  key={group.id}
                  group={group}
                  onAddClick={handleOpenModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal pro dokoupení */}
        <AddActivityModal
          group={selectedGroup}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleConfirmPurchase}
          isSubmitting={isSubmitting}
          finalPriceThatWillBePaid={finalPriceThatWillBePaid}
        />

        {/* Zrušit předplatné */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
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
        </div>
      </div>
    </div>
  );
}
