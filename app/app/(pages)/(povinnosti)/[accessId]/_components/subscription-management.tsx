"use client";

import { useState } from "react";
import { ActivityGroup } from "@/app/_data/businessActivities";
import AddActivityModal from "../../../(administration)/administrace/sprava-predplatneho/_components/add-activity-modal";
import ActiveActivityCard from "../../../(administration)/administrace/sprava-predplatneho/_components/active-activity-card";
import InactiveActivityCard from "../../../(administration)/administrace/sprava-predplatneho/_components/inactive-activity-card";

interface SubscriptionManagementProps {
  activeGroups: ActivityGroup[];
  inactiveGroups: ActivityGroup[];
  subscribeId: string | { id: string };
}

export default function SubscriptionManagement({
  activeGroups,
  inactiveGroups,
  subscribeId,
}: SubscriptionManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPriceThatWillBePaid, setFinalPriceThatWillBePaid] = useState<
    number | null
  >(null);

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
              typeof subscribeId === "string" ? subscribeId : subscribeId.id,
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
            subscribeId:
              typeof subscribeId === "string" ? subscribeId : subscribeId.id,
            activityGroupId: activityGroupId,
          }),
        },
      );
    } catch (error) {
      console.error("Chyba při odesílání požadavku:");
    }

    console.log("POTVRZENO");

    // handleCloseModal();
  };

  return (
    <div
      id="subscription-management"
      className="w-full mx-auto mt-16 pt-12 border-t border-zinc-200"
    >
      {/* Aktivní skupiny */}
      {activeGroups.length > 0 && (
        <div className="mb-10 md:mb-12">
          <div className="mb-4">
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
        <div className="mb-10 md:mb-12">
          <div className="mb-4">
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
    </div>
  );
}
