"use client";

import { useState } from "react";
import Button from "@/app/_components/atoms/Button";
import { ActivityGroup } from "@/app/_data/businessActivities";
import { FiCheckCircle, FiPlus } from "react-icons/fi";
import AddActivityModal from "./add-activity-modal";
import { useParams } from "next/navigation";
import { set } from "date-fns";

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
  const params = useParams();

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
    const isTermsChecked = formData.get("terms");
    const activityGroupId = selectedGroup?.id;
    if (!formData.get("terms")) {
      setIsSubmitting(false);
      return;
    }

    if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
      console.error("NENI URL");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/add-item-into-subscription-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activityGroupPriceId: selectedGroup?.priceId,
            terms: isTermsChecked,
            subscribeId:
              typeof subscribeId === "string" ? subscribeId : subscribeId.id,
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
    <div
      id="subscription-management"
      className="w-full mx-auto mt-16 pt-12 border-t border-zinc-200"
    >
      <h3 className="text-primary mb-6">Správa předplatného</h3>

      {/* Aktivní skupiny */}
      {activeGroups.length > 0 && (
        <div className="mb-8">
          <p className="text-textP text-sm md:text-base mb-4">
            Aktivní předměty podnikání:
          </p>
          <div className="space-y-3">
            {activeGroups.map((group) => (
              <div
                key={group.id}
                className="bg-secondary/5 rounded-xl p-5 md:p-6 border-l-4 border-secondary"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiCheckCircle className="text-secondary text-xl shrink-0" />
                  <h4 className="text-primary">{group.name}</h4>
                </div>
                <p className="text-textP text-sm md:text-base leading-relaxed">
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Neaktivní skupiny */}
      {inactiveGroups.length > 0 && (
        <div>
          <p className="text-textP text-sm mb-3">
            Další předměty podnikání k dokoupení:
          </p>
          <div className="space-y-2">
            {inactiveGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg p-4 border border-zinc-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="text-primary">{group.name}</h5>
                    <p className="text-textP text-sm">{group.description}</p>
                  </div>
                  <div className="flex items-center max-md:justify-between gap-3 sm:gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-semibold text-primary">
                        {group.price} Kč/rok
                      </p>
                    </div>
                    <Button
                      text="Dokoupit"
                      onClick={() => handleOpenModal(group)}
                      variant="gold"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
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
