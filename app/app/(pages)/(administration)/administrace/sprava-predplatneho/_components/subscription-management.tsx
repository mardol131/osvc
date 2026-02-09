"use client";

import { useState, useRef, useEffect } from "react";
import { ActivityGroup } from "@/app/_data/businessActivities";
import AddActivityModal from "./add-activity-modal";
import ActiveActivityCard from "./active-activity-card";
import InactiveActivityCard from "./inactive-activity-card";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { updateRecord } from "@/app/_functions/backend";
import Button from "@/app/_components/atoms/Button";

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
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [email, setEmail] = useState(subscribe.email);
  const [phone, setPhone] = useState(subscribe.phone);
  const [phonePrefix, setPhonePrefix] = useState(subscribe.phonePrefix);
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zavřít dropdown při kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value.replace(/\D/g, "").slice(0, 9);
    setPhone(value);
  };

  const handleSaveContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingContact(true);

    if (!phone || phone.length !== 9) {
      alert("Zadejte platné telefonní číslo.");
      setIsSavingContact(false);
      return;
    }

    if (!phonePrefix) {
      alert("Zadejte platný telefonní prefix.");
      setIsSavingContact(false);
      return;
    }

    try {
      const response = await updateRecord({
        collectionSlug: "subscribes",
        recordId: subscribe.id,
        body: {
          email: email,
          phone: phone,
          phonePrefix: phonePrefix,
        },
      });

      if (!response.id) {
        throw new Error("Nepodařilo se aktualizovat kontaktní údaje");
      }

      setIsEditingContact(false);
      router.refresh();
    } catch (error) {
      console.error("Chyba při ukládání kontaktních údajů:", error);
    } finally {
      setIsSavingContact(false);
    }
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
      console.error("Chyba při odesílání požadavku:", error);
    }

    handleCloseModal();
  };

  return (
    <div className="rounded-xl border w-full p-10 bg-white border-zinc-100 shadow-md">
      <div className="w-full flex flex-col gap-10 mx-auto">
        <div className=" flex items-center max-md:flex-col max-md:items-start max-md:gap-0 gap-10 border-b-2 pb-3 border-zinc-100">
          <h4>Předplatné č. {index + 1}</h4>
          <p>Vytvořeno {format(new Date(subscribe.createdAt), "d. M. yyyy")}</p>
        </div>

        {/* Kontaktní údaje */}
        <div className="mb-10 md:mb-15">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h5 className="text-primary mb-1">Kontaktní údaje</h5>
              <p className="text-sm text-zinc-600">
                Email a telefonní číslo pro komunikaci
              </p>
            </div>
            <button
              onClick={() => setIsEditingContact(!isEditingContact)}
              className="text-secondary hover:text-secondary/80 font-semibold text-sm transition-colors"
            >
              {isEditingContact ? "Zrušit" : "Upravit"}
            </button>
          </div>

          {isEditingContact ? (
            <form
              onSubmit={handleSaveContact}
              className="bg-zinc-50 rounded-lg p-6 border border-zinc-100"
            >
              <div className="flex flex-col gap-5">
                {/* Email - editovatelné */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 w-full rounded-lg border bg-white border-zinc-300 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
                    required
                  />
                </div>

                {/* Telefonní číslo */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Telefon
                  </label>
                  <div className="flex gap-2">
                    {/* Custom Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-20 shrink-0 rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300 cursor-pointer bg-white flex items-center justify-between"
                      >
                        <p>+{phonePrefix}</p>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-20 bg-white border-2 border-zinc-300 rounded-lg shadow-lg z-10 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => {
                              setPhonePrefix("420");
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                              phonePrefix === "420"
                                ? "bg-secondary/10 text-secondary"
                                : "text-zinc-800"
                            }`}
                          >
                            +420
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPhonePrefix("421");
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                              phonePrefix === "421"
                                ? "bg-secondary/10 text-secondary"
                                : "text-zinc-800"
                            }`}
                          >
                            +421
                          </button>
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onInput={handlePhoneInput}
                      className="flex-1 min-w-0 rounded-lg border bg-white border-zinc-300 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
                      placeholder="123456789"
                      maxLength={9}
                      minLength={9}
                      pattern="[0-9]{9}"
                      required
                    />
                  </div>
                </div>

                {/* Tlačítka */}
                <div className="flex gap-3 pt-2">
                  <Button
                    text={isSavingContact ? "Ukládám..." : "Uložit"}
                    htmlType="submit"
                  />
                  <Button
                    text="Zrušit"
                    onClick={() => setIsEditingContact(false)}
                    variant="plain"
                    htmlType="button"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">E-mail</p>
                  <p>{subscribe.email}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Telefonní číslo</p>
                  <p>
                    + {subscribe.phonePrefix}
                    {subscribe.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
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
